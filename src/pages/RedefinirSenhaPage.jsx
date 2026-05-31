import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { redefinirSenha } from "../services/auth";
import AuthLayout from "../components/AuthLayout";

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
    <AuthLayout>
      {pronto ? (
        <div>
          <h1 className="auth-titulo">Senha redefinida</h1>
          <p className="auth-sub">
            Sua nova senha foi salva. Você já pode acessar o sistema.
          </p>
          <Link to="/" className="auth-btn auth-btn--link">
            Ir para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={aoEnviar}>
          <h1 className="auth-titulo">Definir nova senha</h1>
          <p className="auth-sub">Crie uma senha para acessar o sistema.</p>

          {erro && <div className="auth-erro" role="alert">{erro}</div>}

          <label className="auth-campo">
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

          <label className="auth-campo">
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

          <button type="submit" className="auth-btn" disabled={carregando}>
            {carregando ? "Salvando..." : "Salvar nova senha"}
          </button>

          <Link to="/" className="auth-explorar">
            ← Voltar ao login
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
