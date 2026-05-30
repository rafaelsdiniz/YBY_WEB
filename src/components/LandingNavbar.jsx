import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingNavbar.css";

const SECOES = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#impactos", rotulo: "Impactos" },
  { href: "#mudancas", rotulo: "Mudanças" },
  { href: "#como-funciona", rotulo: "Como funciona" },
];

export default function LandingNavbar() {
  const [solida, setSolida] = useState(false);

  useEffect(() => {
    const aoRolar = () => setSolida(window.scrollY > 40);
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={solida ? "lnav lnav--solida" : "lnav"}>
      <div className="lnav-inner">
        <a href="#topo" className="lnav-brand">
          <span className="lnav-logo">Y</span>
          <span className="lnav-brand-txt">YBY</span>
        </a>

        <nav className="lnav-links">
          {SECOES.map((s) => (
            <a key={s.href} href={s.href}>
              {s.rotulo}
            </a>
          ))}
        </nav>

        <Link to="/login" className="lnav-login">
          Entrar
        </Link>
      </div>
    </header>
  );
}
