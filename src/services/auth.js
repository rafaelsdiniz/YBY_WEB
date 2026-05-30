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

// Solicita o e-mail de recuperação. Por segurança, a resposta é a mesma
// exista ou não o e-mail (não revela se a conta existe).
export async function solicitarRecuperacao(email) {
  if (USE_MOCK) {
    await delay(500);
    if (!email) throw new Error("Informe seu e-mail.");
    return { ok: true };
  }
  const res = await fetch(`${BASE_URL}/auth/recuperar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Não foi possível enviar o e-mail de recuperação.");
  return res.json();
}

// Redefine a senha a partir do token recebido por e-mail.
export async function redefinirSenha(token, novaSenha) {
  if (USE_MOCK) {
    await delay(500);
    if (!novaSenha) throw new Error("Informe a nova senha.");
    return { ok: true };
  }
  const res = await fetch(`${BASE_URL}/auth/redefinir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, senha: novaSenha }),
  });
  if (!res.ok) throw new Error("Token inválido ou expirado.");
  return res.json();
}
