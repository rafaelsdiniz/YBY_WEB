import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import "./FlipCardGallery.css";

function FlipCard({ card, delay, featured }) {
  const [virado, setVirado] = useState(false);
  const Icone = card.icone;

  function aoClicar() {
    if (window.matchMedia("(hover: none)").matches) {
      setVirado((v) => !v);
    }
  }

  return (
    <motion.div
      className={`fc-wrap${virado ? " fc-wrap--virado" : ""}${featured ? " fc-wrap--destaque" : ""}`}
      onClick={aoClicar}
      role="button"
      tabIndex={0}
      aria-label={`${card.titulo} - clique para ver detalhes`}
      onKeyDown={(e) => e.key === "Enter" && aoClicar()}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="fc-inner">

        {/* ── FRENTE ──────────────────────────────────── */}
        <div className="fc-frente" aria-hidden={virado}>
          <span className="fc-frente-icone" aria-hidden="true">
            <Icone size={52} strokeWidth={1.5} />
          </span>

          <div className="fc-frente-rodape">
            <h3 className="fc-titulo">{card.titulo}</h3>
            <p className="fc-subtitulo">{card.subtitulo}</p>
          </div>

          <span className="fc-dica" aria-hidden="true">↩ ver mais</span>
        </div>

        {/* ── VERSO ───────────────────────────────────── */}
        <div className="fc-verso" aria-hidden={!virado}>
          <header className="fc-verso-cabecalho">
            <Icone size={22} strokeWidth={1.5} />
            <h3 className="fc-verso-titulo">{card.titulo}</h3>
          </header>

          <p className="fc-descricao">{card.descricao}</p>

          <ul className="fc-lista">
            {card.detalhes.map((d) => (
              <li key={d}>
                <CheckCircle2 size={14} strokeWidth={1.75} aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>

          {card.href && (
            <a
              href={card.href}
              className="fc-link"
              onClick={(e) => e.stopPropagation()}
            >
              Explorar no painel →
            </a>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default function FlipCardGallery({ cards }) {
  return (
    <div className="fc-galeria">
      {cards.map((c, idx) => (
        <FlipCard key={c.id} card={c} delay={idx * 0.13} featured={idx === 0} />
      ))}
    </div>
  );
}
