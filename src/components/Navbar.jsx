import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const LINKS = [
  { to: "/painel", rotulo: "Painel" },
  { to: "/municipios", rotulo: "Municípios" },
  { to: "/relatorios", rotulo: "Relatórios" },
  { to: "/sobre", rotulo: "Sobre" },
];

export default function Navbar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  function aoSair() {
    sair();
    navigate("/login", { replace: true });
  }

  return (
    <header className="nav-wrap">
      {/* faixa institucional com as cores do Tocantins */}
      <div className="nav-faixa" aria-hidden="true" />

      <nav className="navbar">
        <Link to="/painel" className="nav-brand">
          <img src="/logoYBY.png" alt="YBY" className="nav-logo-img" />
        </Link>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  isActive ? "nav-link ativo" : "nav-link"
                }
              >
                {l.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        {usuario ? (
          <div className="nav-usuario">
            <span className="nav-avatar" aria-hidden="true">
              {usuario.nome.charAt(0).toUpperCase()}
            </span>
            <span className="nav-nome">{usuario.nome}</span>
            <button type="button" className="nav-sair" onClick={aoSair}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/" className="nav-entrar">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}
