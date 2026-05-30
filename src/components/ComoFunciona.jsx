import { useEffect, useRef, useState } from "react";
import { Database, Target, BarChart3 } from "lucide-react";
import "./ComoFunciona.css";

const PASSOS = [
  {
    icone: Database,
    titulo: "1. Reúne os dados",
    texto: "Desmatamento, conformidade (CAR), gasto público e risco legal em um só lugar.",
  },
  {
    icone: Target,
    titulo: "2. Calcula a prioridade",
    texto: "Um índice único de 0 a 100 e um semáforo apontam onde cada real rende mais.",
  },
  {
    icone: BarChart3,
    titulo: "3. Investe e monitora",
    texto: "Acompanhe a evolução por município e comprove o resultado ao longo do tempo.",
  },
];

// Seção que "trava" na tela (sticky) e ativa os 3 passos conforme o scroll.
export default function ComoFunciona() {
  const ref = useRef(null);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    let raf = null;
    const calc = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const passado = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      const p = total > 0 ? passado / total : 0;
      setAtivo(Math.min(PASSOS.length - 1, Math.floor(p * PASSOS.length)));
    };
    const agendar = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    agendar();
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="como-funciona" className="secao cf" ref={ref}>
      <div className="cf-sticky">
        <div className="secao-inner cf-inner">
          <span className="secao-tag">Como funciona</span>
          <h2>Três passos</h2>
          <span className="secao-linha cf-linha" aria-hidden="true" />

          <div className="cf-passos">
            {PASSOS.map((p, i) => {
              const Icone = p.icone;
              const cls =
                "cf-passo" + (i === ativo ? " ativo" : "") + (i < ativo ? " feito" : "");
              return (
                <article key={p.titulo} className={cls}>
                  <span className="cf-passo-num">{i + 1}</span>
                  <span className="cf-passo-icone">
                    <Icone size={32} strokeWidth={1.5} />
                  </span>
                  <h3>{p.titulo.replace(/^\d+\.\s/, "")}</h3>
                  <p>{p.texto}</p>
                </article>
              );
            })}
          </div>

          <div className="cf-dots" aria-hidden="true">
            {PASSOS.map((p, i) => (
              <span key={p.titulo} className={i === ativo ? "ativo" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
