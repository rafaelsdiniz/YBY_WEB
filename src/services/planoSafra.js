// Plano Safra 2026 (/api/v1/plano-safra): linhas de credito rural (RenovAgro/ABC+,
// Pronaf) e simulacao de financiamento integrada ao potencial de carbono.
// Leitura/simulacao: GESTOR e SERVIDOR. Cadastro/edicao das linhas: GESTOR.
import { http } from "./http";

export async function listarLinhas(somenteAtivas = true) {
  return http.get("/plano-safra/linhas", { query: { somenteAtivas } });
}

export async function buscarLinha(id) {
  return http.get(`/plano-safra/linhas/${id}`);
}

// Simula financiamento para uma area: { areaHa, programa?, somenteCarbono, precoTonelada? }
export async function simularSafra(req) {
  return http.post("/plano-safra/simulacao", req);
}

export async function criarLinha(dto) {
  return http.post("/plano-safra/linhas", dto);
}

export async function atualizarLinha(id, dto) {
  return http.put(`/plano-safra/linhas/${id}`, dto);
}

export async function deletarLinha(id) {
  return http.del(`/plano-safra/linhas/${id}`);
}
