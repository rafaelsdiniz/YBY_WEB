// Geoportal SEPLAN-TO (/api/v1/geoportal): catalogo de camadas territoriais,
// consulta direta ao GeoServer (WFS) e sugestao de areas para estudo de carbono.
// Leitura: GESTOR e SERVIDOR.
import { http } from "./http";

// Catalogo curado das camadas uteis para estudo de carbono.
export async function camadasGeoportal() {
  return http.get("/geoportal/camadas");
}

// Consulta direta a uma camada do GeoServer (WFS GetFeature).
// typeName obrigatorio; cqlFilter e maxFeatures opcionais.
export async function dadosCamada({ typeName, cqlFilter, maxFeatures = 100 }) {
  return http.get("/geoportal/camadas/dados", {
    query: { typeName, cqlFilter, maxFeatures },
  });
}

// Sugestao inteligente de areas prioritarias para estudo de carbono.
export async function sugestoesAreasCarbono(limite = 10) {
  return http.get("/geoportal/areas-carbono/sugestoes", { query: { limite } });
}
