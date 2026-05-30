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
