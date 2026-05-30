import { useEffect, useState } from "react";
import { getMunicipios } from "./services/api";
import MapaTocantins from "./components/MapaTocantins";
import RankingMunicipios from "./components/RankingMunicipios";
import DetalheMunicipio from "./components/DetalheMunicipio";
import Legenda from "./components/Legenda";
import "./App.css";

export default function App() {
  const [municipios, setMunicipios] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p className="estado">Carregando dados do Tocantins...</p>;
  }

  const detalhe = municipios.find((m) => m.id === selecionado);

  return (
    <div className="app">
      <header className="app-header">
        <h1>YBY — JREDD+ Intelligence</h1>
        <p>Onde investir no Tocantins</p>
      </header>

      <div className="app-grid">
        <main className="card">
          <MapaTocantins
            municipios={municipios}
            selecionado={selecionado}
            onSelecionar={setSelecionado}
          />
          <Legenda />
        </main>
        <aside className="card">
          <RankingMunicipios
            municipios={municipios}
            selecionado={selecionado}
            onSelecionar={setSelecionado}
          />
          {detalhe ? (
            <DetalheMunicipio municipio={detalhe} />
          ) : (
            <p className="detalhe-vazio">
              Clique em um município no mapa ou no ranking para ver os detalhes.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
