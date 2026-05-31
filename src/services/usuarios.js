// Gestao de usuarios - somente GESTOR (/api/v1/admin/usuarios).
import { http } from "./http";

// Normaliza UsuarioDTO da API para o shape da tela (perfil em vez de role).
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

export async function getUsuarios() {
  const page = await http.get("/admin/usuarios", { query: { page: 0, size: 100 } });
  return (page.content || []).map(mapUsuario);
}

// Cria usuario. { nome, email, perfil, senha? }
// senha em branco -> backend gera uma aleatoria.
export async function criarUsuario({ nome, email, perfil, senha }) {
  const dto = await http.post("/admin/usuarios", {
    nome,
    email,
    role: perfil,
    senha: senha ? senha : undefined,
  });
  return mapUsuario(dto);
}

// Atualiza nome/perfil e, opcionalmente, redefine a senha. { nome, perfil, senha? }
export async function atualizarUsuario(id, { nome, perfil, senha }) {
  const dto = await http.put(`/admin/usuarios/${id}`, {
    nome,
    role: perfil,
    senha: senha ? senha : undefined,
  });
  return mapUsuario(dto);
}

// Ativa/inativa usuario.
export async function atualizarStatus(id, ativo) {
  const dto = await http.patch(`/admin/usuarios/${id}/status`, { ativo });
  return mapUsuario(dto);
}

// Exclui usuario.
export async function deletarUsuario(id) {
  return http.del(`/admin/usuarios/${id}`);
}
