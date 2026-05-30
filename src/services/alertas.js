// Alertas (/api/v1/alertas).
import { http } from "./http";

// Municipios com desperdicio no ano (RN-107).
export async function desperdicio(ano, limite = 10) {
  return http.get("/alertas/desperdicio", { query: { ano, limite } });
}

// Analise de risco de um municipio (RN-108/109).
export async function risco(municipioId) {
  return http.get(`/alertas/risco/${municipioId}`);
}

// Cadastro/atualizacao manual de alerta (GESTOR).
export async function salvarAlerta(dto) {
  return http.post("/alertas", dto);
}
