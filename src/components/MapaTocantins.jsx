import { useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import geoTO from "../assets/to-municipios.json";
import SemaforoBadge from "./SemaforoBadge";
import "./MapaTocantins.css";

const CORES = {
  VERDE: "#2E8B3E",
  AMARELO: "#F4B400",
  VERMELHO: "#C62828",
  SEM_DADO: "#D3DDD6",
};

const LEGENDA = [
  { chave: "VERDE", cor: CORES.VERDE, rotulo: "Pode investir" },
  { chave: "AMARELO", cor: CORES.AMARELO, rotulo: "Cuidado" },
  { chave: "VERMELHO", cor: CORES.VERMELHO, rotulo: "Não investir" },
  { chave: "SEM_DADO", cor: CORES.SEM_DADO, rotulo: "Sem dados" },
];

const LARGURA = 600;
const ALTURA = 640;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Escala contínua de prioridade: vermelho (0) → amarelo (50) → verde (100).
const lerp = (a, b, t) => Math.round(a + (b - a) * t);
function corPrioridade(p) {
  const v = clamp(p, 0, 100);
  const [c1, c2, t] =
    v <= 50
      ? [[198, 40, 40], [244, 180, 0], v / 50]
      : [[244, 180, 0], [46, 139, 62], (v - 50) / 50];
  return `rgb(${lerp(c1[0], c2[0], t)},${lerp(c1[1], c2[1], t)},${lerp(c1[2], c2[2], t)})`;
}

export default function MapaTocantins({
  municipios,
  selecionado,
  onSelecionar,
  cabecalho = true,
  tooltipDetalhe = true,
  progresso = null,
}) {
  const wrapRef = useRef(null);
  const [hover, setHover] = useState(null);

  // Recursos extras só no uso interativo (painel). Na landing (pintura por
  // scroll) o mapa segue simples.
  const interativo = progresso == null;
  const [modo, setModo] = useState("semaforo"); // "semaforo" | "prioridade"
  const [filtro, setFiltro] = useState(null); // realça uma categoria do semáforo

  const porId = useMemo(
    () => new Map(municipios.map((m) => [String(m.id), m])),
    [municipios]
  );

  // projeção + formas pré-calculadas (não recalcula a cada hover)
  const { formas, formaPorId, marcadores } = useMemo(() => {
    const path = geoPath(geoMercator().fitSize([LARGURA, ALTURA], geoTO));
    const formas = geoTO.features.map((geo, i) => ({
      id: String(geo.properties.id),
      nome: geo.properties.name,
      d: path(geo),
      centro: path.centroid(geo),
      delay: Math.min(i * 5, 520),
    }));
    // ordem de pintura: de norte (topo) para sul, pelo centroide vertical
    [...formas]
      .sort((a, b) => a.centro[1] - b.centro[1])
      .forEach((f, idx) => {
        f.rank = idx;
      });
    const formaPorId = new Map(formas.map((f) => [f.id, f]));
    return { formas, formaPorId, marcadores: formas };
  }, []);

  // quantos municípios já estão "pintados" conforme o scroll (0..1)
  const pintarAte = progresso == null ? formas.length : progresso * formas.length;
  const pintado = (f) => progresso == null || f.rank <= pintarAte;

  function aoMover(e, forma, dado) {
    const rect = wrapRef.current.getBoundingClientRect();
    setHover({
      id: forma.id,
      nome: forma.nome,
      dado,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  // ---- aparência por município -----------------------------------------
  function preenchimento(f, dado) {
    if (!dado || !pintado(f)) return `url(#g-SEM_DADO)`;
    if (modo === "prioridade" && dado.prioridade != null) {
      return corPrioridade(dado.prioridade);
    }
    return `url(#g-${dado.semaforo})`;
  }

  // categoria do semáforo (inclui SEM_DADO) para o filtro da legenda
  const categoria = (f, dado) =>
    dado && pintado(f) ? dado.semaforo : "SEM_DADO";
  const atenuado = (f, dado) =>
    filtro != null && categoria(f, dado) !== filtro;

  const idDestaque = hover?.id ?? (selecionado ? String(selecionado) : null);
  const formaDestaque = idDestaque ? formaPorId.get(idDestaque) : null;
  const dadoDestaque = idDestaque ? porId.get(idDestaque) : null;

  return (
    <div className="mapa-wrap" ref={wrapRef} onMouseLeave={() => setHover(null)}>
      {cabecalho && (
        <div className="mapa-head">
          <div>
            <h2>Mapa de prioridade</h2>
            <span className="mapa-sub">Tocantins · clique em um município</span>
          </div>

          <div className="mapa-controles">
            {interativo && (
              <div className="mapa-modo" role="group" aria-label="Colorir mapa por">
                <button
                  type="button"
                  className={modo === "semaforo" ? "ativo" : ""}
                  onClick={() => setModo("semaforo")}
                >
                  Semáforo
                </button>
                <button
                  type="button"
                  className={modo === "prioridade" ? "ativo" : ""}
                  onClick={() => setModo("prioridade")}
                >
                  Prioridade
                </button>
              </div>
            )}

            {modo === "prioridade" ? (
              <div className="mapa-escala">
                <span>menor</span>
                <i className="mapa-escala-barra" />
                <span>maior prioridade</span>
              </div>
            ) : (
              <ul className="mapa-legenda">
                {LEGENDA.map((l) => {
                  const ativo = filtro === l.chave;
                  const clic = interativo;
                  return (
                    <li key={l.chave}>
                      <button
                        type="button"
                        className={`mapa-legenda-item${ativo ? " ativo" : ""}${
                          clic ? "" : " mapa-legenda-item--estatico"
                        }`}
                        onClick={
                          clic ? () => setFiltro(ativo ? null : l.chave) : undefined
                        }
                        aria-pressed={clic ? ativo : undefined}
                      >
                        <span
                          className="mapa-legenda-cor"
                          style={{ background: l.cor }}
                        />
                        {l.rotulo}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}

      <svg
        className={progresso == null ? "mapa" : "mapa mapa--pintar"}
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        role="img"
        aria-label="Mapa do Tocantins por prioridade de investimento"
      >
        <defs>
            {Object.entries({
              VERDE: ["#3aa84f", "#236e30"],
              AMARELO: ["#ffc83d", "#d99a00"],
              VERMELHO: ["#e23b3b", "#a81f1f"],
              SEM_DADO: ["#e6ede7", "#cdd8cf"],
            }).map(([nome, [a, b]]) => (
              <linearGradient key={nome} id={`g-${nome}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={a} />
                <stop offset="100%" stopColor={b} />
              </linearGradient>
            ))}
            <filter id="mapa-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(8,30,50,0.5)" />
            </filter>
        </defs>

        {/* camada base */}
        <g>
          {formas.map((f) => {
            const dado = porId.get(f.id);
            return (
              <path
                key={f.id}
                d={f.d}
                fill={preenchimento(f, dado)}
                fillOpacity={atenuado(f, dado) ? 0.12 : 1}
                className={dado ? "mun mun--clic" : "mun"}
                style={{ animationDelay: `${f.delay}ms` }}
                onMouseMove={(e) => aoMover(e, f, dado)}
                onClick={() => dado && onSelecionar(dado.id)}
              />
            );
          })}
        </g>

        {/* marcadores pulsantes nos municípios de risco (vermelho) */}
        <g className="mapa-marcadores">
          {marcadores.map((f) => {
            const dado = porId.get(f.id);
            if (!dado || dado.semaforo !== "VERMELHO" || !pintado(f)) return null;
            if (filtro != null && filtro !== "VERMELHO") return null;
            return (
              <g key={f.id} transform={`translate(${f.centro[0]} ${f.centro[1]})`}>
                <circle className="marcador-pulso" r="6" />
                <circle className="marcador-ponto" r="3.4" />
              </g>
            );
          })}
        </g>

        {/* destaque (hover ou selecionado) por cima, com glow e leve pop */}
        {formaDestaque && (
          <path
            d={formaDestaque.d}
            className="mun-destaque"
            fill={
              modo === "prioridade" && dadoDestaque?.prioridade != null
                ? corPrioridade(dadoDestaque.prioridade)
                : dadoDestaque
                ? CORES[dadoDestaque.semaforo]
                : CORES.SEM_DADO
            }
            filter="url(#mapa-glow)"
          />
        )}
      </svg>

      {hover && (
        <div className="mapa-tip" style={{ left: hover.x, top: hover.y }}>
          <strong>{hover.nome}</strong>
          {tooltipDetalhe &&
            (hover.dado ? (
              <span className="mapa-tip-info">
                <SemaforoBadge semaforo={hover.dado.semaforo} compact />
                Prioridade {hover.dado.prioridade ?? "—"}
              </span>
            ) : (
              <span className="mapa-tip-sem">Sem dados</span>
            ))}
        </div>
      )}
    </div>
  );
}
