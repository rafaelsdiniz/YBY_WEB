// Dashboard consolidado do JREDD+ (/api/v1/dashboard).
import { http } from "./http";

// Resumo agregado do estado: totais por semaforo, KPIs financeiros/ambientais,
// alertas, focos de queimada, rankings e distribuicao por bioma.
export async function resumoDashboard() {
  return http.get("/dashboard/resumo");
}

// Projecao financeira de recebimento de credito de carbono (consolidada).
// `ano` e `municipioId` sao opcionais (consolida tudo quando omitidos).
export async function projecaoCarbono({ ano, municipioId } = {}) {
  return http.get("/dashboard/projecao-carbono", { query: { ano, municipioId } });
}
