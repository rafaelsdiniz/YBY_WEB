import { useEffect, useState } from "react";
import { getMunicipios } from "../services/api";
import ResumoEstado from "../components/ResumoEstado";
import MapaTocantins from "../components/MapaTocantins";
import GraficoPrioridade from "../components/GraficoPrioridade";
import GraficoSemaforo from "../components/GraficoSemaforo";
import GraficoDistribuicao from "../components/GraficoDistribuicao";
import RankingMunicipios from "../components/RankingMunicipios";

export default function DashboardPage() {
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return <p className="estado">Carregando dados do Tocantins...</p>;
  }

  return (
    <>
      <header className="page-header">
        <h1>Painel de monitoramento ambiental</h1>
        <p>Situação ambiental do Tocantins · passe o mouse no mapa para ver os indicadores</p>
      </header>

      <ResumoEstado municipios={municipios} />

      <div className="app-grid">
        <div className="painel-col">
          <section className="card">
            <MapaTocantins municipios={municipios} selecionado={null} />
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
            <GraficoDistribuicao municipios={municipios} />
          </section>
          <section className="card">
            <RankingMunicipios municipios={municipios} selecionado={null} />
          </section>
        </aside>
      </div>
    </>
  );
}
