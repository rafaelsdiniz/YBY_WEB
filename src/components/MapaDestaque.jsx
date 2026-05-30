import { useEffect, useRef, useState } from "react";
import { getMunicipios } from "../services/api";
import MapaTocantins from "./MapaTocantins";

const semMovimento = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Mapa interativo da landing: carrega os dados, mantém a seleção e calcula o
// progresso de "pintura" conforme a seção entra na tela (scroll-linked).
export default function MapaDestaque() {
  const ref = useRef(null);
  const [municipios, setMunicipios] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [progresso, setProgresso] = useState(() => (semMovimento() ? 1 : 0));

  useEffect(() => {
    getMunicipios().then(setMunicipios).catch(() => {});
  }, []);

  useEffect(() => {
    if (semMovimento()) return;
    let raf = null;
    const calc = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const inicio = vh * 0.9; // começa a pintar quando o topo chega aqui
      const fim = vh * 0.25; // pintura completa quando o topo passa daqui
      const p = (inicio - rect.top) / (inicio - fim);
      setProgresso(Math.min(1, Math.max(0, p)));
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
    <div ref={ref}>
      <MapaTocantins
        municipios={municipios}
        selecionado={selecionado}
        onSelecionar={setSelecionado}
        cabecalho={false}
        tooltipDetalhe={false}
        progresso={progresso}
      />
    </div>
  );
}
