import { useState } from "react";
import { Link } from "react-router-dom";
import { solicitarRecuperacao } from "../services/auth";
import "./LoginPage.css";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await solicitarRecuperacao(email);
      setEnviado(true);
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

        {enviado ? (
          <div className="login-form">
            <h1>Verifique seu e-mail</h1>
            <p className="login-sub">
              Se houver uma conta para <strong>{email}</strong>, enviamos um link
              para você redefinir a senha. O link expira em 30 minutos.
            </p>
            <Link to="/" className="login-btn login-btn--link">
              Voltar ao login
            </Link>
          </div>
        ) : (
          <form className="login-form" onSubmit={aoEnviar}>
            <h1>Recuperar senha</h1>
            <p className="login-sub">
              Informe seu e-mail institucional e enviaremos um link para criar uma
              nova senha.
            </p>

            {erro && <div className="login-erro" role="alert">{erro}</div>}

            <label className="login-campo">
              <span>E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@tocantins.gov.br"
                autoComplete="email"
                required
              />
            </label>

            <button type="submit" className="login-btn" disabled={carregando}>
              {carregando ? "Enviando..." : "Enviar link de recuperação"}
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
