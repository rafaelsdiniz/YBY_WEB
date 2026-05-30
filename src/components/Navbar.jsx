import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const LINKS = [
  { to: "/", rotulo: "Painel", exact: true },
  { to: "/municipios", rotulo: "Municípios" },
  { to: "/relatorios", rotulo: "Relatórios" },
  { to: "/sobre", rotulo: "Sobre" },
];

export default function Navbar() {
  return (
    <header className="nav-wrap">
      {/* faixa institucional com as cores do Tocantins */}
      <div className="nav-faixa" aria-hidden="true" />

      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <span className="nav-logo" aria-hidden="true">Y</span>
          <span className="nav-brand-txt">
            <strong>YBY</strong>
            <small>JREDD+ Intelligence</small>
          </span>
        </Link>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.exact}
                className={({ isActive }) =>
                  isActive ? "nav-link ativo" : "nav-link"
                }
              >
                {l.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/login" className="nav-entrar">
          Entrar
        </Link>
      </nav>
    </header>
  );
}
