import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import "./FlipCardGallery.css";

/**
 * Flip Card Gallery
 *
 * Cada card tem frente (ícone + título limpo) e verso (detalhes em verde).
 * Desktop: flip ativado por hover (CSS puro, 60 fps).
 * Mobile:  flip ativado por toque (estado React).
 *
 * @param {{ cards: FlipCardData[] }} props
 *
 * @typedef {Object} FlipCardData
 * @property {number}   id
 * @property {Function} icone      - componente Lucide
 * @property {string}   titulo
 * @property {string}   subtitulo
 * @property {string}   descricao
 * @property {string[]} detalhes
 * @property {string}   [href]
 */
function FlipCard({ card }) {
  const [virado, setVirado] = useState(false);
  const Icone = card.icone;

  function aoClicar() {
    /* Flip por clique só em dispositivos sem hover (touch) */
    if (window.matchMedia("(hover: none)").matches) {
      setVirado((v) => !v);
    }
  }

  return (
    <div
      className={`fc-wrap${virado ? " fc-wrap--virado" : ""}`}
      onClick={aoClicar}
      role="button"
      tabIndex={0}
      aria-label={`${card.titulo} — clique para ver detalhes`}
      onKeyDown={(e) => e.key === "Enter" && aoClicar()}
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

          <span className="fc-dica" aria-hidden="true">
            ↩ ver mais
          </span>
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
    </div>
  );
}

export default function FlipCardGallery({ cards }) {
  return (
    <div className="fc-galeria">
      {cards.map((c) => (
        <FlipCard key={c.id} card={c} />
      ))}
    </div>
  );
}
