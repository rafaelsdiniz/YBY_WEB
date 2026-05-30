import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMunicipios } from "../services/api";
import ResumoEstado from "../components/ResumoEstado";
import MapaTocantins from "../components/MapaTocantins";
import GraficoPrioridade from "../components/GraficoPrioridade";
import GraficoSemaforo from "../components/GraficoSemaforo";
import RankingMunicipios from "../components/RankingMunicipios";
import DetalheMunicipio from "../components/DetalheMunicipio";

export default function DashboardPage() {
  const location = useLocation();
  const [municipios, setMunicipios] = useState([]);
  // município escolhido na página de Municípios chega via state da navegação
  const [selecionado, setSelecionado] = useState(location.state?.municipioId ?? null);
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
    <>
      <header className="page-header">
        <h1>Painel de priorização</h1>
        <p>Onde investir no Tocantins</p>
      </header>

      <ResumoEstado municipios={municipios} />

      <div className="app-grid">
        <div className="painel-col">
          <section className="card">
            <MapaTocantins
              municipios={municipios}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
            />
          </section>
          <section className="card">
            <GraficoPrioridade municipios={municipios} />
          </section>
        </div>

        <aside className="painel-col">
          <section className="card">
            <GraficoSemaforo municipios={municipios} />
          </section>
          <section className="card">
            <RankingMunicipios
              municipios={municipios}
              selecionado={selecionado}
              onSelecionar={setSelecionado}
            />
          </section>
          {detalhe ? (
            <section className="card">
              <DetalheMunicipio municipio={detalhe} />
            </section>
          ) : (
            <p className="card detalhe-vazio">
              Clique em um município no mapa ou no ranking para ver os detalhes.
            </p>
          )}
        </aside>
      </div>
    </>
  );
}
