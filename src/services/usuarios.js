// Dados de exemplo (mock). Troque USE_MOCK para false quando a API existir.
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const USUARIOS_MOCK = [
  { id: "1", nome: "Ana Souza", email: "ana@tocantins.gov.br", perfil: "ADMIN", ativo: true },
  { id: "2", nome: "Carlos Lima", email: "carlos.servidor@tocantins.gov.br", perfil: "SERVIDOR", ativo: true },
  { id: "3", nome: "Marina Alves", email: "marina.servidor@tocantins.gov.br", perfil: "SERVIDOR", ativo: false },
  { id: "4", nome: "Pedro Rocha", email: "pedro@tocantins.gov.br", perfil: "ADMIN", ativo: true },
  { id: "5", nome: "Júlia Mendes", email: "julia.servidor@tocantins.gov.br", perfil: "SERVIDOR", ativo: true },
];

export async function getUsuarios() {
  if (USE_MOCK) {
    await delay(300);
    return USUARIOS_MOCK;
  }
  const res = await fetch(`${BASE_URL}/usuarios`);
  if (!res.ok) throw new Error("Falha ao carregar usuários");
  return res.json();
}
