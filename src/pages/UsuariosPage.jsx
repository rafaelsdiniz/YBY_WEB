import { useEffect, useMemo, useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { getUsuarios } from "../services/usuarios";
import "./AdminTabela.css";

const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    getUsuarios()
      .then(setUsuarios)
      .finally(() => setCarregando(false));
  }, []);

  const lista = useMemo(
    () =>
      usuarios.filter(
        (u) => norm(u.nome).includes(norm(busca)) || norm(u.email).includes(norm(busca))
      ),
    [usuarios, busca]
  );

  // ativar/inativar local (mock) — vira chamada à API depois
  function alternar(id) {
    setUsuarios((lista) =>
      lista.map((u) => (u.id === id ? { ...u, ativo: !u.ativo } : u))
    );
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Usuários</h1>
          <p>Gerenciamento de usuários e perfis de acesso</p>
        </div>
        <button type="button" className="admin-novo">
          <UserPlus size={18} /> Novo usuário
        </button>
      </header>

      <section className="card">
        <div className="admin-busca">
          <Search size={17} />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
          />
        </div>

        {carregando ? (
          <p className="estado">Carregando usuários...</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th className="dir">Ação</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((u) => (
                  <tr key={u.id}>
                    <td className="admin-nome">
                      <span className="admin-avatar">{u.nome.charAt(0)}</span>
                      {u.nome}
                    </td>
                    <td className="admin-mut">{u.email}</td>
                    <td>
                      <span className={`tag ${u.perfil === "ADMIN" ? "tag--azul" : "tag--cinza"}`}>
                        {u.perfil === "ADMIN" ? "Administrador" : "Servidor"}
                      </span>
                    </td>
                    <td>
                      <span className={`tag ${u.ativo ? "tag--verde" : "tag--vermelho"}`}>
                        {u.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="dir">
                      <button type="button" className="admin-acao" onClick={() => alternar(u.id)}>
                        {u.ativo ? "Inativar" : "Ativar"}
                      </button>
                    </td>
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr>
                    <td colSpan={5} className="admin-vazio">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
