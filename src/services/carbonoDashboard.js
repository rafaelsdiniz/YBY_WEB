// Painel executivo consolidado de carbono (/api/v1/carbono/dashboard).
// Reune projecao financeira, projetos JREDD+, potencial do Plano Safra e mercado
// comprador em uma unica chamada. Leitura: GESTOR e SERVIDOR.
import { http } from "./http";

export async function painelCarbono(ano) {
  return http.get("/carbono/dashboard", { query: { ano } });
}
