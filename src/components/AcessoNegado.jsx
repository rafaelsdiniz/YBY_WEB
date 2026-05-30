import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import "./AcessoNegado.css";

// Mostrado dentro do sistema quando o perfil não tem acesso à rota (403).
export default function AcessoNegado() {
  return (
    <div className="negado">
      <span className="negado-icone">
        <ShieldAlert size={34} strokeWidth={1.75} />
      </span>
      <span className="negado-codigo">403</span>
      <h1>Acesso restrito</h1>
      <p>Esta área é exclusiva para administradores do sistema.</p>
      <Link to="/painel" className="negado-btn">Voltar ao painel</Link>
    </div>
  );
}
