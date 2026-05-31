// Inteligencia / regras de negocio inovadoras (/api/v1/inteligencia).
import { http } from "./http";

// RN-101-A: score de prioridade com tendencia de desmatamento.
export async function tendencia(municipioId, ano) {
  return http.get(`/inteligencia/tendencia/${municipioId}`, { query: { ano } });
}

// RN-103-B: KPI multidimensional (ambiental/social/fiscal) com pesos opcionais.
export async function kpiMultidimensional(municipioId, ano, pesos = {}) {
  const { pesoAmbiental, pesoSocial, pesoFiscal } = pesos;
  return http.get(`/inteligencia/kpi-multidimensional/${municipioId}`, {
    query: { ano, pesoAmbiental, pesoSocial, pesoFiscal },
  });
}

// RN-106-A: semaforo bioma-sensivel (+ freshness RN-600).
export async function semaforoBioma(municipioId) {
  return http.get(`/inteligencia/semaforo-bioma/${municipioId}`);
}

// RN-108-A: risco preditivo com historico.
export async function riscoPreditivo(municipioId) {
  return http.get(`/inteligencia/risco-preditivo/${municipioId}`);
}

// RN-107-A: alerta de desperdicio inteligente (benchmarking).
export async function desperdicioInteligente(ano) {
  return http.get("/inteligencia/desperdicio", { query: { ano } });
}

// RN-500: equidade territorial.
export async function equidade(ano) {
  return http.get("/inteligencia/equidade", { query: { ano } });
}

// RN-200: otimizacao de alocacao de orcamento (GESTOR).
// request: { orcamentoTotal, ano?, estrategia, maxMunicipios?, valorMinimoPorMunicipio? }
export async function simularAlocacao(request) {
  return http.post("/inteligencia/alocacao", request);
}

// RN-300: carbono evitado (emissoes evitadas pela reducao de desmatamento).
export async function carbonoEvitado(municipioId, ano, preco) {
  return http.get(`/inteligencia/carbono-evitado/${municipioId}`, { query: { ano, preco } });
}

// RN-300: projecao de desmatamento (serie historica + projecao futura).
export async function projecaoDesmatamento(municipioId, horizonteAnos) {
  return http.get(`/inteligencia/projecao-desmatamento/${municipioId}`, {
    query: { horizonteAnos },
  });
}

// RN-300: ROI de desmatamento evitado (JREDD+ vs. conversao da area).
export async function roiDesmatamentoEvitado(municipioId, ano, preco, valorAgropecuariaHaAno) {
  return http.get(`/inteligencia/roi-desmatamento-evitado/${municipioId}`, {
    query: { ano, preco, valorAgropecuariaHaAno },
  });
}

// RN-300: recalcula e armazena os snapshots preditivos de todos os municipios (GESTOR).
export async function recalcularInteligencia() {
  return http.post("/inteligencia/recalcular");
}

// Snapshot preditivo armazenado de um municipio (resultado do ultimo recalculo).
export async function projecaoArmazenada(municipioId) {
  return http.get(`/inteligencia/projecao-armazenada/${municipioId}`);
}
