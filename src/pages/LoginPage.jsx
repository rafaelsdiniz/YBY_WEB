import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { entrar } = useAuth();
  const destino = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await entrar(email, senha);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      {/* painel institucional */}
      <aside className="login-brand">
        <Link to="/" className="login-logo">
          <span className="login-logo-mark">Y</span>
          <span>YBY</span>
        </Link>
        <h2>JREDD+ Intelligence</h2>
        <p>
          Plataforma de priorização de investimento ambiental do Tocantins.
          Decisões baseadas em risco, retorno e conformidade.
        </p>
        <span className="login-faixa" aria-hidden="true" />
      </aside>

      {/* formulario */}
      <main className="login-form-wrap">
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
              required
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
              required
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

          <Link to="/" className="login-voltar">
            ← Voltar ao site
          </Link>
        </form>
      </main>
    </div>
  );
}
