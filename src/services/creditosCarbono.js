// Crédito rural de carbono (GET/POST/PUT/DELETE /api/v1/creditos-carbono).
// Leitura: GESTOR e SERVIDOR. Escrita: GESTOR.
import { http } from "./http";

// Lista paginada (size alto para trazer tudo de uma vez no painel).
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

/**
 * Projeção financeira de um crédito específico.
 * Retorna ProjecaoCarbonoDTO com ProjecaoAnualDTO[] (preços em USD + BRL), cotação e gráfico.
 *
 * @param {number} id
 * @param {string} [dataReferenciaCotacao] - data ISO (YYYY-MM-DD) para cotação USD/BRL
 */
export async function projecaoCredito(id, dataReferenciaCotacao) {
  return http.get(`/creditos-carbono/${id}/projecao`, {
    query: { dataReferenciaCotacao },
  });
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
