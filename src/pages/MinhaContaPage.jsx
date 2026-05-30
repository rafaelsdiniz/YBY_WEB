import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { trocarSenha } from "../services/auth";
import "./MinhaContaPage.css";

export default function MinhaContaPage() {
  const { usuario, atualizar } = useAuth();
  const toast = useToast();

  const [nome, setNome] = useState(usuario?.nome ?? "");

  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!usuario) {
    return (
      <>
        <header className="page-header">
          <h1>Minha conta</h1>
        </header>
        <p className="card detalhe-vazio">
          Faça login para acessar os dados da sua conta. <Link to="/">Entrar</Link>
        </p>
      </>
    );
  }

  const ehAdmin = usuario.perfil === "ADMIN";

  function salvarConta(e) {
    e.preventDefault();
    atualizar({ nome: nome.trim() || usuario.nome });
    toast.sucesso("Dados salvos com sucesso.");
  }

  async function salvarSenha(e) {
    e.preventDefault();
    setErroSenha("");
    if (nova.length < 6) {
      setErroSenha("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (nova !== confirma) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    setCarregando(true);
    try {
      await trocarSenha(atual, nova);
      toast.sucesso("Senha atualizada com sucesso.");
      setAtual("");
      setNova("");
      setConfirma("");
    } catch (err) {
      setErroSenha(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Minha conta</h1>
        <p>Gerencie seus dados de acesso</p>
      </header>

      <div className="conta-grid">
        <section className="card">
          <h2 className="conta-titulo">Dados da conta</h2>
          <p className="conta-sub">Seu nome aparece no sistema; o e-mail é seu login.</p>

          <form onSubmit={salvarConta}>
            <label className="campo">
              <span>Nome</span>
              <input value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <label className="campo">
              <span>E-mail</span>
              <input value={usuario.email} disabled />
            </label>
            <label className="campo">
              <span>Perfil</span>
              <input value={ehAdmin ? "Administrador" : "Servidor"} disabled />
            </label>

            <button type="submit" className="conta-btn">Salvar alterações</button>
          </form>
        </section>

        <section className="card">
          <h2 className="conta-titulo">Segurança</h2>
          <p className="conta-sub">Troque sua senha de acesso periodicamente.</p>

          <form onSubmit={salvarSenha}>
            <label className="campo">
              <span>Senha atual</span>
              <input
                type="password"
                value={atual}
                onChange={(e) => setAtual(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            <label className="campo">
              <span>Nova senha</span>
              <input
                type="password"
                value={nova}
                onChange={(e) => setNova(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            <label className="campo">
              <span>Confirmar nova senha</span>
              <input
                type="password"
                value={confirma}
                onChange={(e) => setConfirma(e.target.value)}
                autoComplete="new-password"
              />
            </label>

            {erroSenha && <div className="msg-erro">{erroSenha}</div>}

            <button type="submit" className="conta-btn" disabled={carregando}>
              {carregando ? "Salvando..." : "Trocar senha"}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
