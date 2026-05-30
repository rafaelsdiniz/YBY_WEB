import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMunicipios } from "../services/api";
import ResumoEstado from "../components/ResumoEstado";
import MapaTocantins from "../components/MapaTocantins";
import GraficoPrioridade from "../components/GraficoPrioridade";
import GraficoSemaforo from "../components/GraficoSemaforo";
import RankingMunicipios from "../components/RankingMunicipios";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  // clicar no mapa ou no ranking abre a pagina dedicada do municipio.
  // o id recebido e o codigoIbge; resolvemos o apiId pela lista carregada.
  const abrir = useCallback(
    (id) => {
      const m = municipios.find((x) => x.id === id);
      if (m) navigate(`/municipios/${m.apiId}`);
    },
    [municipios, navigate]
  );

  if (carregando) {
    return <p className="estado">Carregando dados do Tocantins...</p>;
  }

  return (
    <>
      <header className="page-header">
        <h1>Painel de priorização</h1>
        <p>Onde investir no Tocantins · clique em um município para ver a página dele</p>
      </header>

      <ResumoEstado municipios={municipios} />

      <div className="app-grid">
        <div className="painel-col">
          <section className="card">
            <MapaTocantins
              municipios={municipios}
              selecionado={null}
              onSelecionar={abrir}
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
              selecionado={null}
              onSelecionar={abrir}
            />
          </section>
        </aside>
      </div>
    </>
  );
}
