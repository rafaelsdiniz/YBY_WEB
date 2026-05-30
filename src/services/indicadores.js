// Indicadores e KPI (/api/v1/indicadores).
import { http } from "./http";

// KPI agregado do periodo (gastoPublico, resultadoAmbiental, kpiRetorno).
export async function kpiPeriodo(municipioId, anoInicio, anoFim) {
  return http.get(`/indicadores/${municipioId}/kpi`, {
    query: { anoInicio, anoFim },
  });
}

// Serie anual de indicadores do municipio.
export async function historicoIndicadores(municipioId, anoInicio, anoFim) {
  return http.get(`/indicadores/${municipioId}/historico`, {
    query: { anoInicio, anoFim },
  });
}

// Upsert de indicador anual (GESTOR).
export async function salvarIndicador(dto) {
  return http.post("/indicadores", dto);
}
