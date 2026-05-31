import { Link } from "react-router-dom";
import "./NaoEncontradaPage.css";

export default function NaoEncontradaPage() {
  return (
    <div className="nf">
      <img src="/logoYBY.png" alt="YBY" className="nf-logo" />
      <span className="nf-codigo">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe ou foi movido.</p>
      <div className="nf-acoes">
        <Link to="/" className="nf-btn">Ir para o início</Link>
        <Link to="/painel" className="nf-btn nf-btn--ghost">Ir para o painel</Link>
      </div>
    </div>
  );
}
