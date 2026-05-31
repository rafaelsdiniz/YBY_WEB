// Painel executivo consolidado de carbono (GET /api/v1/carbono/dashboard).
// Reúne projeção financeira, projetos JREDD+, potencial do Plano Safra e mercado
// comprador em uma única chamada. Leitura: GESTOR e SERVIDOR.
//
// Novos params v2: dataReferenciaCotacao (ISO date) para conversão USD→BRL.
import { http } from "./http";

/**
 * @param {object} opts
 * @param {number|string} [opts.ano]                    - filtra por ano base
 * @param {string}        [opts.dataReferenciaCotacao]  - data ISO (YYYY-MM-DD) para cotação USD/BRL
 */
export async function painelCarbono({ ano, dataReferenciaCotacao } = {}) {
  return http.get("/carbono/dashboard", { query: { ano, dataReferenciaCotacao } });
}
