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

// Recuperacao por e-mail (fluxo "esqueci minha senha"). A resposta e generica
// para nao revelar se o e-mail existe. Como o ambiente nao tem servico de e-mail,
// a API devolve o `token` aqui (em producao iria por e-mail) - repassamos para a
// tela poder seguir o fluxo de redefinicao.
export async function solicitarRecuperacao(email) {
  if (!email) throw new Error("Informe seu e-mail.");
  const resp = await http.post("/auth/esqueci-senha", { email }, { auth: false });
  return { ok: true, mensagem: resp?.mensagem, token: resp?.token, expiraEm: resp?.expiraEm };
}

// Redefine a senha a partir do token recebido. Resposta 204 (sem corpo).
export async function redefinirSenha(token, novaSenha) {
  if (!token) throw new Error("Token de redefinição ausente.");
  if (!novaSenha) throw new Error("Informe a nova senha.");
  await http.post("/auth/redefinir-senha", { token, novaSenha }, { auth: false });
  return { ok: true };
}
