import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPinned,
  FileText,
  Info,
  Users,
  ClipboardList,
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

const LINKS_ADMIN = [
  { to: "/usuarios", rotulo: "Usuários", icone: Users },
  { to: "/formularios", rotulo: "Formulários", icone: ClipboardList },
];

function itemClasse({ isActive }) {
  return isActive ? "sidebar-link ativo" : "sidebar-link";
}

export default function Sidebar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();
  const ehAdmin = usuario?.perfil === "ADMIN";

  function aoSair() {
    sair();
    navigate("/", { replace: true });
  }

  return (
    <aside className="sidebar">
      <Link to="/painel" className="sidebar-brand">
        <img src="/logoYBY.png" alt="YBY" />
      </Link>

      <div className="sidebar-corpo">
        <span className="sidebar-secao">Navegação</span>
        <nav className="sidebar-nav">
          {LINKS.map((l) => {
            const Icone = l.icone;
            return (
              <NavLink key={l.to} to={l.to} className={itemClasse}>
                <Icone size={19} strokeWidth={1.8} />
                <span>{l.rotulo}</span>
              </NavLink>
            );
          })}
        </nav>

        {ehAdmin && (
          <>
            <span className="sidebar-secao sidebar-secao--sep">Administração</span>
            <nav className="sidebar-nav">
              {LINKS_ADMIN.map((l) => {
                const Icone = l.icone;
                return (
                  <NavLink key={l.to} to={l.to} className={itemClasse}>
                    <Icone size={19} strokeWidth={1.8} />
                    <span>{l.rotulo}</span>
                  </NavLink>
                );
              })}
            </nav>
          </>
        )}
      </div>

      <div className="sidebar-rodape">
        {usuario ? (
          <>
            <Link to="/minha-conta" className="sidebar-conta" title="Minha conta">
              <span className="sidebar-avatar">
                {usuario.nome.charAt(0).toUpperCase()}
              </span>
              <span className="sidebar-user">
                <strong>
                  {usuario.nome}
                  <em className={ehAdmin ? "sidebar-perfil admin" : "sidebar-perfil"}>
                    {ehAdmin ? "Admin" : "Servidor"}
                  </em>
                </strong>
                <small>{usuario.email}</small>
              </span>
            </Link>
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
