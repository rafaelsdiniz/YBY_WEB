import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, LogOut, LogIn,
  TrendingUp, BrainCircuit, Cloud, User,
  Gauge, Coins, Building2, FolderKanban, Sprout,
  Map as MapIcon, MapPinned,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MenuToggleIcon } from "./MenuToggleIcon";
import "./Sidebar.css";

const LINKS = [
  { to: "/painel",      rotulo: "Painel",       icone: LayoutDashboard },
  { to: "/municipios",  rotulo: "Municípios",    icone: MapPinned },
  { to: "/indicadores", rotulo: "Indicadores",   icone: TrendingUp },
  { to: "/inteligencia",rotulo: "Inteligência",  icone: BrainCircuit },
  { to: "/relatorios",  rotulo: "Relatórios",    icone: FileText },
];

const LINKS_CARBONO = [
  { to: "/carbono/painel",     rotulo: "Painel de carbono", icone: Gauge },
  { to: "/carbono",            rotulo: "Emissões",          icone: Cloud },
  { to: "/creditos-carbono",   rotulo: "Créditos",          icone: Coins },
  { to: "/instituicoes-carbono",rotulo: "Instituições",     icone: Building2 },
  { to: "/projetos",           rotulo: "Projetos JREDD+",   icone: FolderKanban },
  { to: "/plano-safra",        rotulo: "Plano Safra",       icone: Sprout },
  { to: "/geoportal",          rotulo: "Geoportal",         icone: MapIcon },
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
  const [mobileAberto, setMobileAberto] = useState(false);

  function aoSair() {
    sair();
    navigate("/", { replace: true });
  }

  function fecharMobile() {
    setMobileAberto(false);
  }

  return (
    <>
      {/* ── Overlay mobile ──────────────────────────────────── */}
      {mobileAberto && (
        <div
          className="sidebar-overlay"
          onClick={fecharMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar${mobileAberto ? " sidebar--aberta" : ""}`}>
        {/* ── Header: logo + toggle mobile ────────────────── */}
        <div className="sidebar-topo">
          <Link to="/painel" className="sidebar-brand" onClick={fecharMobile}>
            <img src="/logoYBY.png" alt="YBY" />
          </Link>

          {/* Botão toggle — só aparece no mobile */}
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setMobileAberto((v) => !v)}
            aria-label={mobileAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileAberto}
          >
            <MenuToggleIcon
              open={mobileAberto}
              size={26}
              color="currentColor"
              strokeWidth={2.2}
              duration={480}
            />
          </button>
        </div>

        {/* ── Corpo da navegação ──────────────────────────── */}
        <div className="sidebar-corpo">
          <span className="sidebar-secao">Navegação</span>
          <nav className="sidebar-nav">
            {LINKS.map((l) => {
              const Icone = l.icone;
              return (
                <NavLink key={l.to} to={l.to} className={itemClasse} onClick={fecharMobile}>
                  <Icone size={18} strokeWidth={1.8} />
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
                <NavLink key={l.to} to={l.to} end={l.to === "/carbono"} className={itemClasse} onClick={fecharMobile}>
                  <Icone size={18} strokeWidth={1.8} />
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
                    <NavLink key={l.to} to={l.to} className={itemClasse} onClick={fecharMobile}>
                      <Icone size={18} strokeWidth={1.8} />
                      <span>{l.rotulo}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </>
          )}
        </div>

        {/* ── Rodapé: usuário ─────────────────────────────── */}
        <div className="sidebar-rodape">
          {usuario ? (
            <>
              <Link to="/minha-conta" className="sidebar-conta" title="Minha conta" onClick={fecharMobile}>
                <span className={ehAdmin ? "sidebar-avatar admin" : "sidebar-avatar"}>
                  <User size={17} strokeWidth={2} />
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
                <LogOut size={16} strokeWidth={1.75} />
              </button>
            </>
          ) : (
            <Link to="/" className="sidebar-entrar" onClick={fecharMobile}>
              <LogIn size={16} strokeWidth={1.75} />
              <span>Entrar</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
