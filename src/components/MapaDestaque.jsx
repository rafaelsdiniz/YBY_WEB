import { useEffect, useState } from "react";
import { getMunicipios } from "../services/api";
import MapaTocantins from "./MapaTocantins";

// Mapa interativo para a landing (showcase): carrega os dados e mantém a
// seleção localmente (reaproveita o MapaTocantins do sistema).
export default function MapaDestaque() {
  const [municipios, setMunicipios] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    getMunicipios().then(setMunicipios).catch(() => {});
  }, []);

  return (
    <MapaTocantins
      municipios={municipios}
      selecionado={selecionado}
      onSelecionar={setSelecionado}
      cabecalho={false}
      tooltipDetalhe={false}
    />
  );
}
