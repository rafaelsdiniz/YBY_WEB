// Projetos JREDD+ (/api/v1/projetos): projeto + metas + marcos de execucao.
// Leitura: GESTOR e SERVIDOR. Escrita: GESTOR (auditada).
import { http } from "./http";

export async function listarProjetos({ page = 0, size = 100 } = {}) {
  const resp = await http.get("/projetos", { query: { page, size } });
  return resp.content || [];
}

export async function buscarProjeto(id) {
  return http.get(`/projetos/${id}`);
}

export async function criarProjeto(dto) {
  return http.post("/projetos", dto);
}

export async function atualizarProjeto(id, dto) {
  return http.put(`/projetos/${id}`, dto);
}

export async function deletarProjeto(id) {
  return http.del(`/projetos/${id}`);
}

// ---- marcos (etapas) do projeto -----------------------------------------
export async function adicionarMarco(projetoId, dto) {
  return http.post(`/projetos/${projetoId}/marcos`, dto);
}

export async function atualizarMarco(projetoId, marcoId, dto) {
  return http.put(`/projetos/${projetoId}/marcos/${marcoId}`, dto);
}

export async function removerMarco(projetoId, marcoId) {
  return http.del(`/projetos/${projetoId}/marcos/${marcoId}`);
}
