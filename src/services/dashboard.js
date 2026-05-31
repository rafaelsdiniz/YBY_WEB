// Dashboard consolidado do JREDD+ (GET /api/v1/dashboard).
import { http } from "./http";

// Resumo agregado do estado: totais por semáforo, KPIs financeiros/ambientais,
// alertas, focos de queimada, rankings e distribuição por bioma.
export async function resumoDashboard() {
  return http.get("/dashboard/resumo");
}

/**
 * Projeção financeira de crédito de carbono (consolidada ou por município/ano).
 * Retorna ProjecaoCarbonoDTO com itens ProjecaoAnualDTO (USD + BRL), cotação e gráfico.
 *
 * @param {object} opts
 * @param {number} [opts.ano]                     - filtra por ano base
 * @param {number} [opts.municipioId]             - filtra por município
 * @param {string} [opts.dataReferenciaCotacao]   - data ISO (YYYY-MM-DD) para cotação USD/BRL
 */
export async function projecaoCarbono({ ano, municipioId, dataReferenciaCotacao } = {}) {
  return http.get("/dashboard/projecao-carbono", {
    query: { ano, municipioId, dataReferenciaCotacao },
  });
}
