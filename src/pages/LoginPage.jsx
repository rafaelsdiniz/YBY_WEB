import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { entrar } = useAuth();
  const destino = location.state?.from?.pathname || "/painel";
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      // por enquanto: qualquer clique entra (usa demo se vier vazio)
      await entrar(email || "demo@tocantins.gov.br", senha || "demo");
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      {/* fundo: Jalapão (Tocantins) */}
      <video
        className="login-video"
        src="/jalapao.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="login-overlay" aria-hidden="true" />

      <main className="login-card">
        <span className="login-faixa" aria-hidden="true" />

        <div className="login-brand">
          <span className="login-logo-mark">Y</span>
          <div className="login-brand-txt">
            <strong>YBY</strong>
            <small>JREDD+ Intelligence</small>
          </div>
        </div>

        <form className="login-form" onSubmit={aoEnviar}>
          <h1>Acessar o sistema</h1>
          <p className="login-sub">Entre com suas credenciais institucionais.</p>

          {erro && <div className="login-erro" role="alert">{erro}</div>}

          <label className="login-campo">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@tocantins.gov.br"
              autoComplete="email"
            />
          </label>

          <label className="login-campo">
            <span>Senha</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <div className="login-extra">
            <a href="#recuperar" onClick={(e) => e.preventDefault()}>
              Esqueci minha senha
            </a>
          </div>

          <button type="submit" className="login-btn" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <Link to="/painel" className="login-explorar">
            Explorar o sistema sem login →
          </Link>
        </form>
      </main>
    </div>
  );
}
