// Credito rural de carbono (/api/v1/creditos-carbono).
// Leitura: GESTOR e SERVIDOR. Escrita (criar/editar/excluir): GESTOR.
import { http } from "./http";

// Lista paginada (size alto p/ trazer tudo de uma vez no painel).
export async function listarCreditos({ page = 0, size = 100 } = {}) {
  const resp = await http.get("/creditos-carbono", { query: { page, size } });
  return resp.content || [];
}

export async function buscarCredito(id) {
  return http.get(`/creditos-carbono/${id}`);
}

export async function creditosPorMunicipio(municipioId) {
  return http.get(`/creditos-carbono/municipio/${municipioId}`);
}

// Projecao financeira de um credito especifico (serie anual de tCO2e/receita).
export async function projecaoCredito(id) {
  return http.get(`/creditos-carbono/${id}/projecao`);
}

export async function criarCredito(dto) {
  return http.post("/creditos-carbono", dto);
}

export async function atualizarCredito(id, dto) {
  return http.put(`/creditos-carbono/${id}`, dto);
}

export async function deletarCredito(id) {
  return http.del(`/creditos-carbono/${id}`);
}
