import { useEffect, useMemo, useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { getUsuarios } from "../services/usuarios";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import Modal from "../components/Modal";
import "./AdminTabela.css";

const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

let seqId = 100;

export default function UsuariosPage() {
  const toast = useToast();
  const confirmar = useConfirm();
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [form, setForm] = useState(null); // null = fechado
  const [erroForm, setErroForm] = useState("");

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

  function novo() {
    setErroForm("");
    setForm({ nome: "", email: "", perfil: "SERVIDOR", ativo: true });
  }

  function editar(u) {
    setErroForm("");
    setForm({ ...u });
  }

  function salvar(e) {
    e.preventDefault();
    const nome = form.nome.trim();
    const email = form.email.trim();
    if (!nome || !email) {
      setErroForm("Preencha nome e e-mail.");
      return;
    }
    if (form.id) {
      setUsuarios((l) => l.map((u) => (u.id === form.id ? { ...form, nome, email } : u)));
      toast.sucesso("Usuário atualizado.");
    } else {
      setUsuarios((l) => [...l, { ...form, nome, email, id: String(++seqId) }]);
      toast.sucesso("Usuário criado.");
    }
    setForm(null);
  }

  // ativar/inativar local (mock) — vira chamada à API depois
  async function alternar(u) {
    const inativar = u.ativo;
    const ok = await confirmar({
      titulo: inativar ? "Inativar usuário?" : "Ativar usuário?",
      mensagem: inativar
        ? `${u.nome} perderá o acesso ao sistema.`
        : `${u.nome} voltará a ter acesso ao sistema.`,
      confirmar: inativar ? "Inativar" : "Ativar",
      tipo: inativar ? "perigo" : "ok",
    });
    if (!ok) return;
    setUsuarios((l) => l.map((x) => (x.id === u.id ? { ...x, ativo: !x.ativo } : x)));
    toast.sucesso(`${u.nome} foi ${inativar ? "inativado" : "ativado"}.`);
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Usuários</h1>
          <p>Gerenciamento de usuários e perfis de acesso</p>
        </div>
        <button type="button" className="admin-novo" onClick={novo}>
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
                  <th className="dir">Ações</th>
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
                    <td className="dir admin-acoes-col">
                      <button type="button" className="admin-acao" onClick={() => editar(u)}>
                        Editar
                      </button>
                      <button type="button" className="admin-acao" onClick={() => alternar(u)}>
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

      {form && (
        <Modal titulo={form.id ? "Editar usuário" : "Novo usuário"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            {erroForm && <div className="modal-erro">{erroForm}</div>}
            <label className="campo">
              <span>Nome</span>
              <input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                autoFocus
              />
            </label>
            <label className="campo">
              <span>E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nome@tocantins.gov.br"
              />
            </label>
            <label className="campo">
              <span>Perfil</span>
              <select
                value={form.perfil}
                onChange={(e) => setForm({ ...form, perfil: e.target.value })}
              >
                <option value="SERVIDOR">Servidor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </label>
            <div className="modal-acoes">
              <button type="button" className="modal-btn modal-btn--cancelar" onClick={() => setForm(null)}>
                Cancelar
              </button>
              <button type="submit" className="modal-btn modal-btn--salvar">
                {form.id ? "Salvar" : "Criar usuário"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
