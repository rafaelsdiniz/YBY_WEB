import { useState } from "react";
import { Link } from "react-router-dom";
import { solicitarRecuperacao } from "../services/auth";
import AuthLayout from "../components/AuthLayout";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [token, setToken] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const resp = await solicitarRecuperacao(email);
      // Sem servico de e-mail no ambiente, a API devolve o token aqui para seguir
      // o fluxo de redefinicao direto pela tela.
      setToken(resp?.token || "");
      setEnviado(true);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout>
      {enviado ? (
        <div>
          <h1 className="auth-titulo">Verifique seu e-mail</h1>
          <p className="auth-sub">
            Se houver uma conta para <strong>{email}</strong>, enviamos um link
            para redefinir a senha. O link expira em 30 minutos.
          </p>
          {token && (
            <Link
              to={`/redefinir-senha?token=${encodeURIComponent(token)}`}
              className="auth-btn"
            >
              Redefinir senha agora
            </Link>
          )}
          <Link to="/" className="auth-explorar">
            ← Voltar ao login
          </Link>
        </div>
      ) : (
        <form onSubmit={aoEnviar}>
          <h1 className="auth-titulo">Recuperar senha</h1>
          <p className="auth-sub">
            Informe seu e-mail institucional e enviaremos um link para criar uma
            nova senha.
          </p>

          {erro && <div className="auth-erro" role="alert">{erro}</div>}

          <label className="auth-campo">
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

          <button type="submit" className="auth-btn" disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link de recuperação"}
          </button>

          <Link to="/" className="auth-explorar">
            ← Voltar ao login
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
