import { useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import geoTO from "../assets/to-municipios.json";
import "./MapaTocantins.css";

const CORES = {
  VERDE: "#2E8B3E",
  AMARELO: "#F4B400",
  VERMELHO: "#C62828",
  SEM_DADO: "#D3DDD6",
};

const LARGURA = 600;
const ALTURA = 640;

// Renderiza o choropleth do Tocantins em SVG puro (offline, sem tiles).
// Cruza os dados ao mapa pelo codigo IBGE (geo.properties.id), que e
// inequivoco — diferente do nome, que tem acento/ambiguidade.
export default function MapaTocantins({ municipios, selecionado, onSelecionar }) {
  const porId = useMemo(
    () => new Map(municipios.map((m) => [String(m.id), m])),
    [municipios]
  );

  // Ajusta a projecao para enquadrar o estado inteiro automaticamente.
  const path = useMemo(() => {
    const projection = geoMercator().fitSize([LARGURA, ALTURA], geoTO);
    return geoPath(projection);
  }, []);

  return (
    <svg
      className="mapa"
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      role="img"
      aria-label="Mapa do Tocantins por prioridade de investimento"
    >
      {geoTO.features.map((geo) => {
        const dado = porId.get(String(geo.properties.id));
        const cor = dado ? CORES[dado.semaforo] : CORES.SEM_DADO;
        const ativo = dado && dado.id === selecionado;
        const clicavel = Boolean(dado);
        return (
          <path
            key={geo.properties.id}
            d={path(geo)}
            fill={cor}
            stroke={ativo ? "#073463" : "#FFFFFF"}
            strokeWidth={ativo ? 1.6 : 0.4}
            className={clicavel ? "mun clicavel" : "mun"}
            onClick={() => dado && onSelecionar(dado.id)}
          >
            <title>
              {geo.properties.name}
              {dado ? ` — prioridade ${dado.prioridade}` : " — sem dados"}
            </title>
          </path>
        );
      })}
    </svg>
  );
}
