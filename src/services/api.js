// Camada de dados de municipios. Consome a YBY-API e adapta o contrato da API
// (ranking/detalhe) para o formato que os componentes ja esperam.
//
// Pontos de adaptacao importantes:
// - O mapa cruza por CODIGO IBGE (geo.properties.id). Por isso o `id` exposto aos
//   componentes e o `codigoIbge`; o id numerico da API fica em `apiId` (usado para
//   buscar detalhe/kpi/desmatamento).
// - A API devolve `semaforo` em minusculo no ranking/detalhe; aqui normalizamos
//   para maiusculo (VERDE/AMARELO/VERMELHO), que e o que os componentes usam.
import { http } from "./http";
import { kpiPeriodo } from "./indicadores";
import { historicoDesmatamento } from "./desmatamento";
import { rankingPublico } from "./publico";

// Preserva null (dado ausente) em vez de coagir para 0 - a UI mostra "N/D".
const numOuNull = (v) => (v == null ? null : Number(v));
const upper = (s) => (s ? String(s).toUpperCase() : "SEM_DADO");

// Ranking -> shape de lista usado por mapa, ranking, tabelas e resumo.
function mapRanking(dto) {
  return {
    id: dto.codigoIbge, // chave de cruzamento com o GeoJSON
    apiId: dto.id, // id numerico da API (detalhe/kpi/desmatamento)
    nome: dto.nome,
    codigoIbge: dto.codigoIbge,
    prioridade: dto.scorePrioridade == null ? null : Math.round(Number(dto.scorePrioridade)),
    // sem score => trata como sem-dado no mapa (cinza), ignorando default do back
    semaforo: dto.scorePrioridade == null ? "SEM_DADO" : upper(dto.semaforo),
    retornoPorReal: numOuNull(dto.kpiRetorno),
    areaHa: numOuNull(dto.areaHa),
    // campos nao presentes no ranking: ausentes ate o detalhe trazer
    notaRisco: null,
    conformidade: null,
    gastoPublico: null,
    desperdicio: false,
    reducaoDesmatamento: null,
    pendencias: [],
    serieDesmatamento: [],
  };
}

// Lista paginada de municipios por prioridade (size alto p/ trazer todos no demo).
export async function getMunicipios() {
  const page = await http.get("/municipios/ranking", {
    query: { page: 0, size: 200, ordenar: "score", ordem: "desc" },
  });
  return (page.content || []).map(mapRanking);
}

// Versao publica (sem login) para a landing institucional.
export async function getMunicipiosPublico() {
  const page = await rankingPublico({ page: 0, size: 200, ordenar: "score", ordem: "desc" });
  return (page.content || []).map(mapRanking);
}

// GeoJSON servido pela API (opcionalmente filtrado por semaforo).
export async function getGeoJson(semaforo) {
  return http.get("/municipios/geojson", { query: { semaforo } });
}

// Detalhe completo de um municipio, compondo varios endpoints da API no shape
// que o componente DetalheMunicipio espera. `apiId` e o id numerico da API.
export async function getMunicipioDetalhe(apiId) {
  const anoFim = new Date().getFullYear();
  const anoInicio = anoFim - 5;

  const detalhe = await http.get(`/municipios/${apiId}`);

  // chamadas auxiliares toleram falha individual (dado pode nao existir ainda)
  const [kpi, serie] = await Promise.all([
    kpiPeriodo(apiId, anoInicio, anoFim).catch(() => null),
    historicoDesmatamento(apiId).catch(() => []),
  ]);

  return {
    id: detalhe.codigoIbge,
    apiId: detalhe.id,
    nome: detalhe.nome,
    codigoIbge: detalhe.codigoIbge,
    prioridade: detalhe.scorePrioridade == null ? null : Math.round(Number(detalhe.scorePrioridade)),
    semaforo: detalhe.scorePrioridade == null ? "SEM_DADO" : upper(detalhe.semaforo),
    notaRisco: numOuNull(detalhe.notaRisco),
    retornoPorReal: numOuNull(detalhe.kpiRetorno ?? kpi?.kpiRetorno),
    gastoPublico: numOuNull(kpi?.gastoPublico),
    conformidade: null, // nao exposto diretamente; reservado p/ quando a API trouxer
    reducaoDesmatamento: null,
    desperdicio: false,
    pendencias: detalhe.pendencias || [],
    serieDesmatamento: serie,
  };
}

// Operacoes de escrita (GESTOR).
export async function criarMunicipio(dto) {
  return http.post("/municipios", dto);
}

export async function atualizarMunicipio(apiId, dto) {
  return http.put(`/municipios/${apiId}`, dto);
}

export async function deletarMunicipio(apiId) {
  return http.del(`/municipios/${apiId}`);
}
