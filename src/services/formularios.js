// Dados de exemplo (mock). Troque USE_MOCK para false quando a API existir.
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const FORMULARIOS_MOCK = [
  { id: "1", titulo: "Cadastro de propriedade (CAR)", status: "PUBLICADO", respostas: 128, atualizado: "2026-05-12" },
  { id: "2", titulo: "Vistoria de área embargada", status: "PUBLICADO", respostas: 43, atualizado: "2026-05-20" },
  { id: "3", titulo: "Relato de desmatamento (DETER)", status: "RASCUNHO", respostas: 0, atualizado: "2026-05-28" },
  { id: "4", titulo: "Prestação de contas ambiental", status: "PUBLICADO", respostas: 67, atualizado: "2026-04-30" },
];

export async function getFormularios() {
  if (USE_MOCK) {
    await delay(300);
    return FORMULARIOS_MOCK;
  }
  const res = await fetch(`${BASE_URL}/formularios`);
  if (!res.ok) throw new Error("Falha ao carregar formulários");
  return res.json();
}
