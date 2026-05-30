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

// Cria usuario (senha inicial aleatoria gerada pelo backend). { nome, email, perfil }
export async function criarUsuario({ nome, email, perfil }) {
  const dto = await http.post("/admin/usuarios", { nome, email, role: perfil });
  return mapUsuario(dto);
}

// Ativa/inativa usuario.
export async function atualizarStatus(id, ativo) {
  const dto = await http.patch(`/admin/usuarios/${id}/status`, { ativo });
  return mapUsuario(dto);
}
