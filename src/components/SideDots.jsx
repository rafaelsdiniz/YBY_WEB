import { useEffect, useState } from "react";
import "./SideDots.css";

const SECOES = [
  { id: "topo", rotulo: "Início" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "mapa", rotulo: "Mapa" },
  { id: "natureza", rotulo: "Natureza" },
  { id: "impactos", rotulo: "Impactos" },
  { id: "mudancas", rotulo: "Mudanças" },
  { id: "como-funciona", rotulo: "Como funciona" },
  { id: "iniciativa", rotulo: "Iniciativa" },
];

export default function SideDots() {
  const [ativo, setAtivo] = useState("topo");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAtivo(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECOES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="side-dots" aria-label="Navegação por seções">
      {SECOES.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={s.id === ativo ? "ativo" : ""}
          aria-label={s.rotulo}
          aria-current={s.id === ativo ? "true" : undefined}
        >
          <span className="side-dots-tip">{s.rotulo}</span>
        </a>
      ))}
    </nav>
  );
}
