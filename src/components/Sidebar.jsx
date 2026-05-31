import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPinned,
  FileText,
  Info,
  Users,
  LogOut,
  LogIn,
  TrendingUp,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  User,
  Gauge,
  Coins,
  Building2,
  FolderKanban,
  Sprout,
  Map as MapIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const LINKS = [
  { to: "/painel", rotulo: "Painel", icone: LayoutDashboard },
  { to: "/municipios", rotulo: "Municípios", icone: MapPinned },
  { to: "/indicadores", rotulo: "Indicadores", icone: TrendingUp },
  { to: "/inteligencia", rotulo: "Inteligência", icone: BrainCircuit },
  { to: "/relatorios", rotulo: "Relatórios", icone: FileText },
  { to: "/transparencia", rotulo: "Transparência", icone: ShieldCheck },
  { to: "/sobre", rotulo: "Sobre", icone: Info },
];

// Bloco do mercado de credito de carbono / JREDD+ / Plano Safra.
const LINKS_CARBONO = [
  { to: "/carbono/painel", rotulo: "Painel de carbono", icone: Gauge },
  { to: "/carbono", rotulo: "Emissões", icone: Cloud },
  { to: "/creditos-carbono", rotulo: "Créditos", icone: Coins },
  { to: "/instituicoes-carbono", rotulo: "Instituições", icone: Building2 },
  { to: "/projetos", rotulo: "Projetos JREDD+", icone: FolderKanban },
  { to: "/plano-safra", rotulo: "Plano Safra", icone: Sprout },
  { to: "/geoportal", rotulo: "Geoportal", icone: MapIcon },
];

const LINKS_ADMIN = [
  { to: "/usuarios", rotulo: "Usuários", icone: Users },
];

function itemClasse({ isActive }) {
  return isActive ? "sidebar-link ativo" : "sidebar-link";
}

export default function Sidebar() {
  const { usuario, sair } = useAuth();
  const navigate = useNavigate();
  const ehAdmin = usuario?.perfil === "GESTOR";

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
                <Icone size={19} strokeWidth={1.75} />
                <span>{l.rotulo}</span>
              </NavLink>
            );
          })}
        </nav>

        <span className="sidebar-secao sidebar-secao--sep">Carbono &amp; Safra</span>
        <nav className="sidebar-nav">
          {LINKS_CARBONO.map((l) => {
            const Icone = l.icone;
            return (
              <NavLink key={l.to} to={l.to} end={l.to === "/carbono"} className={itemClasse}>
                <Icone size={19} strokeWidth={1.75} />
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
                    <Icone size={19} strokeWidth={1.75} />
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
              <span className={ehAdmin ? "sidebar-avatar admin" : "sidebar-avatar"}>
                <User size={18} strokeWidth={2} />
              </span>
              <span className="sidebar-user">
                <strong className="sidebar-nome">{usuario.nome}</strong>
                <span className="sidebar-meta">
                  <em className={ehAdmin ? "sidebar-perfil admin" : "sidebar-perfil"}>
                    {ehAdmin ? "Gestor" : "Servidor"}
                  </em>
                  <small>{usuario.email}</small>
                </span>
              </span>
            </Link>
            <button
              type="button"
              className="sidebar-icone-btn"
              onClick={aoSair}
              title="Sair"
              aria-label="Sair"
            >
              <LogOut size={17} strokeWidth={1.75} />
            </button>
          </>
        ) : (
          <Link to="/" className="sidebar-entrar">
            <LogIn size={17} strokeWidth={1.75} />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
