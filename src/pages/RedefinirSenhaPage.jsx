import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { redefinirSenha } from "../services/auth";
import "./LoginPage.css";

export default function RedefinirSenhaPage() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");
  const [pronto, setPronto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirma) {
      setErro("As senhas não coincidem.");
      return;
    }
    setCarregando(true);
    try {
      await redefinirSenha(token, senha);
      setPronto(true);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <video className="login-video" src="/jalapao.mp4" autoPlay muted loop playsInline aria-hidden="true" />
      <div className="login-overlay" aria-hidden="true" />

      <main className="login-card">
        <span className="login-faixa" aria-hidden="true" />
        <div className="login-brand">
          <img src="/logoYBY.png" alt="YBY — JREDD+ Intelligence" className="login-logo-img" />
        </div>

        {pronto ? (
          <div className="login-form">
            <h1>Senha redefinida</h1>
            <p className="login-sub">
              Sua nova senha foi salva. Você já pode acessar o sistema.
            </p>
            <Link to="/" className="login-btn login-btn--link">
              Ir para o login
            </Link>
          </div>
        ) : (
          <form className="login-form" onSubmit={aoEnviar}>
            <h1>Definir nova senha</h1>
            <p className="login-sub">Crie uma senha para acessar o sistema.</p>

            {erro && <div className="login-erro" role="alert">{erro}</div>}

            <label className="login-campo">
              <span>Nova senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </label>

            <label className="login-campo">
              <span>Confirmar senha</span>
              <input
                type="password"
                value={confirma}
                onChange={(e) => setConfirma(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </label>

            <button type="submit" className="login-btn" disabled={carregando}>
              {carregando ? "Salvando..." : "Salvar nova senha"}
            </button>

            <Link to="/" className="login-explorar">
              ← Voltar ao login
            </Link>
          </form>
        )}
      </main>
    </div>
  );
}
