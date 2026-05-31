// Administracao - somente GESTOR (/api/v1/admin).
import { http } from "./http";

// Relatorio executivo consolidado.
export async function gerarRelatorioExecutivo() {
  return http.post("/admin/relatorio");
}

// Sincroniza a lista oficial de municipios via IBGE.
export async function sincronizarMunicipiosIbge(uf) {
  return http.post(`/admin/sync/ibge/municipios`, undefined, { query: { uf } });
}
