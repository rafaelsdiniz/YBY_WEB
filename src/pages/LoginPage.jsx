import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

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
      await entrar(email || "demo@tocantins.gov.br", senha || "demo");
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={aoEnviar}>
        <h1 className="auth-titulo">Acessar o sistema</h1>
        <p className="auth-sub">Entre com suas credenciais institucionais.</p>

        {erro && <div className="auth-erro" role="alert">{erro}</div>}

        <label className="auth-campo">
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@tocantins.gov.br"
            autoComplete="email"
          />
        </label>

        <label className="auth-campo">
          <span>Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        <div className="auth-extra">
          <Link to="/esqueci-senha">Esqueci minha senha</Link>
        </div>

        <button type="submit" className="auth-btn" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <Link to="/painel" className="auth-explorar">
          Explorar o sistema sem login →
        </Link>
      </form>
    </AuthLayout>
  );
}
