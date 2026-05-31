// Endpoints publicos de transparencia (/api/v1/public) - sem autenticacao.
import { http } from "./http";

export async function rankingPublico({ page = 0, size = 50, ordenar = "score", ordem = "desc" } = {}) {
  return http.get("/public/ranking", { auth: false, query: { page, size, ordenar, ordem } });
}

export async function geoJsonPublico(semaforo) {
  return http.get("/public/geojson", { auth: false, query: { semaforo } });
}
