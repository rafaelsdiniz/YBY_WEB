// Camada de autenticacao. Hoje mock; troque USE_MOCK para false quando a
// API Spring de login existir. Nenhuma tela muda.
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function login(email, senha) {
  if (USE_MOCK) {
    await delay(400);
    if (!email || !senha) throw new Error("Informe e-mail e senha.");
    // mock: qualquer credencial valida entra
    return { nome: email.split("@")[0], email };
  }
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error("E-mail ou senha inválidos.");
  return res.json();
}
