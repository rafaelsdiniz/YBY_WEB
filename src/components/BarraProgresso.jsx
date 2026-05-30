import { useEffect, useState } from "react";
import "./BarraProgresso.css";

// Linha fina no topo que reflete o quanto da página já foi rolado.
export default function BarraProgresso() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = null;
    const calc = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
      raf = null;
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
    <div className="barra-progresso" style={{ width: `${pct}%` }} aria-hidden="true" />
  );
}
