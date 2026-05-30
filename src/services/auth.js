// Autenticacao contra a YBY-API (JWT). O login guarda o token e, em seguida,
// busca o perfil completo em /auth/me (o /login devolve apenas token + role).
import { http, setToken, clearToken } from "./http";

// Normaliza o usuario vindo da API para o formato usado pelo app (perfil).
function mapUsuario(dto) {
  return {
    id: dto.id,
    nome: dto.nome,
    email: dto.email,
    perfil: dto.role, // "GESTOR" | "SERVIDOR"
    ativo: dto.ativo,
    primeiroAcessoTrocaSenha: dto.primeiroAcessoTrocaSenha,
  };
}

export async function login(email, senha) {
  if (!email || !senha) throw new Error("Informe e-mail e senha.");
  const resp = await http.post("/auth/login", { email, senha }, { auth: false });
  setToken(resp.accessToken);
  // com o token salvo, obtem nome/email/role completos
  const me = await http.get("/auth/me");
  return mapUsuario(me);
}

export async function me() {
  return mapUsuario(await http.get("/auth/me"));
}

export function logout() {
  clearToken();
}

// Troca a senha do usuario logado (RN: valida a senha atual; resposta 204).
export async function trocarSenha(senhaAtual, novaSenha) {
  if (!senhaAtual) throw new Error("Informe a senha atual.");
  if (!novaSenha) throw new Error("Informe a nova senha.");
  await http.patch("/auth/senha", { senhaAtual, novaSenha });
  return { ok: true };
}

// Recuperacao por e-mail: ainda nao ha endpoint no backend (apenas /auth/login,
// /auth/me e /auth/senha). Mantemos o contrato para a tela nao quebrar; quando
// a API expuser /auth/recuperar e /auth/redefinir, ligar aqui.
export async function solicitarRecuperacao(email) {
  if (!email) throw new Error("Informe seu e-mail.");
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}

export async function redefinirSenha(token, novaSenha) {
  if (!novaSenha) throw new Error("Informe a nova senha.");
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}
