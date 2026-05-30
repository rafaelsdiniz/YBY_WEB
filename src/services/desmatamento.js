// Desmatamento (/api/v1/desmatamento).
import { http } from "./http";

const num = (v) => (v == null ? 0 : Number(v));

// Historico bruto da API (DesmatamentoDTO[]), ja adaptado para o grafico
// (serieDesmatamento: [{ ano, valor }]) ordenado por ano.
export async function historicoDesmatamento(municipioId, opts = {}) {
  const { fonte = "ALL", dataInicio, dataFim } = opts;
  const lista = await http.get(`/desmatamento/${municipioId}/historico`, {
    query: { fonte, dataInicio, dataFim },
  });
  // agrega por ano (pode haver varios registros/ano e fontes)
  const porAno = new Map();
  (lista || []).forEach((d) => {
    const ano = Number(String(d.dataReferencia).slice(0, 4));
    porAno.set(ano, (porAno.get(ano) || 0) + num(d.areaHa));
  });
  return [...porAno.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([ano, valor]) => ({ ano, valor: Math.round(valor) }));
}

// Resumo anual (total + breakdown por bioma/semaforo).
export async function resumoDesmatamento(ano) {
  return http.get("/desmatamento/resumo", { query: { ano } });
}

// Importacao assincrona (GESTOR) -> { jobId, status }.
export async function importarDesmatamento() {
  return http.post("/desmatamento/importar");
}

export async function statusImportacao(jobId) {
  return http.get(`/desmatamento/importar/${jobId}/status`);
}
