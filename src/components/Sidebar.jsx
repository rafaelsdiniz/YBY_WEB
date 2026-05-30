import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPinned,
  FileText,
  Info,
  LogOut,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const LINKS = [
  { to: "/painel", rotulo: "Painel", icone: LayoutDashboard },
  { to: "/municipios", rotulo: "Municípios", icone: MapPinned },
  { to: "/relatorios", rotulo: "Relatórios", icone: FileText },
  { to: "/sobre", rotulo: "Sobre", icone: Info },
];

export default function Sidebar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();

  function aoSair() {
    sair();
    navigate("/", { replace: true });
  }

  return (
    <aside className="sidebar">
      <Link to="/painel" className="sidebar-brand">
        <img src="/logoYBY.png" alt="YBY" />
      </Link>

      <span className="sidebar-secao">Navegação</span>
      <nav className="sidebar-nav">
        {LINKS.map((l) => {
          const Icone = l.icone;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link ativo" : "sidebar-link"
              }
            >
              <Icone size={19} strokeWidth={1.8} />
              <span>{l.rotulo}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-rodape">
        {usuario ? (
          <>
            <span className="sidebar-avatar">
              {usuario.nome.charAt(0).toUpperCase()}
            </span>
            <span className="sidebar-user">
              <strong>{usuario.nome}</strong>
              <small>{usuario.email}</small>
            </span>
            <button
              type="button"
              className="sidebar-icone-btn"
              onClick={aoSair}
              title="Sair"
              aria-label="Sair"
            >
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link to="/" className="sidebar-entrar">
            <LogIn size={18} />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
