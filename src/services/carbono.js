// Emissoes de carbono (/api/v1/carbono).
import { http, getToken } from "./http";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

// Municipios com menores emissoes no periodo.
export async function historicoMenores({ dataInicio, dataFim, limite = 20 } = {}) {
  return http.get("/carbono/historico/menores", {
    query: { dataInicio, dataFim, limite },
  });
}

// Baixa o relatorio PDF dos menores emissores (dispara download no navegador).
export async function baixarRelatorioPdf({ dataInicio, dataFim, limite = 20 } = {}) {
  const qs = new URLSearchParams();
  if (dataInicio) qs.append("dataInicio", dataInicio);
  if (dataFim) qs.append("dataFim", dataFim);
  if (limite) qs.append("limite", limite);
  const res = await fetch(
    `${BASE_URL}/carbono/historico/menores/relatorio/pdf?${qs}`,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  if (!res.ok) throw new Error("Falha ao gerar o relatorio PDF.");
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio-carbono.pdf";
  a.click();
  URL.revokeObjectURL(url);
}

// Registro manual de emissao (GESTOR).
export async function registrarEmissao(dto) {
  return http.post("/carbono/registros", dto);
}

// (Re)gera a serie SEEG de emissoes de um ano para todos os municipios (GESTOR).
export async function sincronizarEmissoes(ano) {
  return http.post("/carbono/sincronizar", undefined, { query: { ano } });
}
