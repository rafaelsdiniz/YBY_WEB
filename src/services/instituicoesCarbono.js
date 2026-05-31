// Instituicoes do mercado de credito de carbono (/api/v1/instituicoes-carbono):
// certificadoras, compradoras, marketplaces, fundos. Inclui matching com creditos.
// Leitura/matching: GESTOR e SERVIDOR. Escrita: GESTOR.
import { http } from "./http";

// `tipo` (InstituicaoTipo) e opcional; `somenteAtivas` filtra inativas.
export async function listarInstituicoes({ tipo, somenteAtivas = true } = {}) {
  return http.get("/instituicoes-carbono", { query: { tipo, somenteAtivas } });
}

export async function buscarInstituicao(id) {
  return http.get(`/instituicoes-carbono/${id}`);
}

// Melhores compradores para um credito (ordenados por receita estimada).
export async function matchCompradores(creditoId, somenteJredd = false) {
  return http.get(`/instituicoes-carbono/match/credito/${creditoId}`, {
    query: { somenteJredd },
  });
}

export async function criarInstituicao(dto) {
  return http.post("/instituicoes-carbono", dto);
}

export async function atualizarInstituicao(id, dto) {
  return http.put(`/instituicoes-carbono/${id}`, dto);
}

export async function deletarInstituicao(id) {
  return http.del(`/instituicoes-carbono/${id}`);
}
