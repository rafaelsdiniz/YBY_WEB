import { Link } from "react-router-dom";
import "./AuthLayout.css";

// Shell das telas de autenticação: painel verde da marca + área do formulário.
export default function AuthLayout({ children }) {
  return (
    <div className="auth">
      <aside className="auth-brand">
        <div className="auth-brand-top">
          <Link to="/" className="auth-logo">
            <img src="/logoYBY.png" alt="YBY" />
          </Link>
          <h1 className="auth-brand-titulo">Gestão Ambiental</h1>
          <p className="auth-brand-texto">
            Inteligência de priorização para investimento ambiental no Tocantins.
          </p>
        </div>
        <div className="auth-oficiais">
          <span className="auth-oficiais-label">Uma iniciativa de</span>
          <div className="auth-oficiais-logos">
            <img src="/governotocantins.webp" alt="Governo do Tocantins" />
            <img src="/secretaria.png" alt="Secretaria do Meio Ambiente e Recursos Hídricos" />
          </div>
        </div>
      </aside>

      <main className="auth-form">
        <div className="auth-form-inner">{children}</div>
      </main>
    </div>
  );
}
