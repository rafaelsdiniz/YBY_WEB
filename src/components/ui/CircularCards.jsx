/**
 * CircularCards
 * Adaptação do "CircularTestimonials" para o contexto YBY.
 *
 * Diferenças em relação ao original:
 *  - JSX puro (sem TypeScript, sem Tailwind)
 *  - lucide-react no lugar de react-icons
 *  - Painel esquerdo: foto de natureza / cerrado (Unsplash)
 *  - Painel direito: ícone Lucide puro (sem fundo), título, subtítulo,
 *    descrição com animação blur palavra-a-palavra, lista de detalhes
 *  - framer-motion para AnimatePresence + motion
 */
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./CircularCards.css";

/* ── Gap responsivo (mesma fórmula do original) ─────────────────── */
function calcularGap(largura) {
  const minL = 1024, maxL = 1456, minG = 60, maxG = 86;
  if (largura <= minL) return minG;
  if (largura >= maxL) return Math.max(minG, maxG + 0.06 * (largura - maxL));
  return minG + (maxG - minG) * ((largura - minL) / (maxL - minL));
}

/* ── Variantes framer-motion ─────────────────────────────────────── */
const variantesBloco = {
  initial: { opacity: 0, y: 20  },
  animate: { opacity: 1, y: 0   },
  exit:    { opacity: 0, y: -20 },
};

/* ── Componente principal ────────────────────────────────────────── */
export default function CircularCards({ cards, autoplay = true }) {
  const [ativo,     setAtivo]     = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [largura,   setLargura]   = useState(900);

  const containerRef = useRef(null);
  const intervalRef  = useRef(null);

  const total    = useMemo(() => cards.length, [cards]);
  const cardAtivo = useMemo(() => cards[ativo], [ativo, cards]);

  /* Largura responsiva */
  useEffect(() => {
    function onResize() {
      if (containerRef.current) setLargura(containerRef.current.offsetWidth);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Autoplay */
  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(() => {
      setAtivo(prev => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [autoplay, total]);

  /* Teclado */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  irPrev();
      if (e.key === "ArrowRight") irNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo, total]);

  const irPrev = useCallback(() => {
    setAtivo(prev => (prev - 1 + total) % total);
    clearInterval(intervalRef.current);
  }, [total]);

  const irNext = useCallback(() => {
    setAtivo(prev => (prev + 1) % total);
    clearInterval(intervalRef.current);
  }, [total]);

  /* Estilo 3D de cada imagem: center, esquerda (−gap, rotY 15°),
     direita (+gap, rotY −15°), oculto */
  function estiloImagem(index) {
    const gap    = calcularGap(largura);
    const stickUp = gap * 0.8;
    const isAtivo   = index === ativo;
    const isEsq     = (ativo - 1 + total) % total === index;
    const isDir     = (ativo + 1) % total === index;
    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";

    if (isAtivo) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto", transition,
      transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)",
    };
    if (isEsq) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto", transition,
      transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`,
    };
    if (isDir) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto", transition,
      transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`,
    };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition };
  }

  /* O ícone vem como componente Lucide - precisa de var local maiúscula */
  const Icone = cardAtivo?.icone ?? null;

  return (
    <div className="cc-wrapper">
      <div className="cc-grid">

        {/* ── Painel esquerdo: fotos em perspectiva 3D ── */}
        <div className="cc-visuais" ref={containerRef}>
          {cards.map((card, index) => (
            <img
              key={card.id ?? index}
              src={card.imagem}
              alt={card.titulo}
              className="cc-foto"
              style={estiloImagem(index)}
            />
          ))}
        </div>

        {/* ── Painel direito: conteúdo animado ── */}
        <div className="cc-conteudo">
          <AnimatePresence mode="wait">
            <motion.div
              key={ativo}
              variants={variantesBloco}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="cc-texto"
            >
              {/* Ícone Lucide puro - sem fundo, sem borda */}
              {Icone && (
                <span className="cc-icone" aria-hidden="true">
                  <Icone size={34} strokeWidth={1.5} />
                </span>
              )}

              <h3 className="cc-titulo">{cardAtivo.titulo}</h3>
              <p  className="cc-subtitulo">{cardAtivo.subtitulo}</p>

              {/* Descrição: revelação blur palavra a palavra */}
              <motion.p className="cc-descricao">
                {cardAtivo.descricao.split(" ").map((palavra, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)",  opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {palavra}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* Lista de detalhes */}
              {cardAtivo.detalhes?.length > 0 && (
                <ul className="cc-detalhes">
                  {cardAtivo.detalhes.map((d) => (
                    <li key={d} className="cc-detalhe">
                      <span className="cc-check" aria-hidden="true">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Setas de navegação */}
          <div className="cc-setas">
            <button
              className="cc-seta"
              onClick={irPrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              data-hover={hoverPrev ? "true" : undefined}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>
            <button
              className="cc-seta"
              onClick={irNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              data-hover={hoverNext ? "true" : undefined}
              aria-label="Próximo"
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
