import { useEffect, useState } from "react";
import { getMunicipios } from "../services/api";
import { resumoDashboard } from "../services/dashboard";
import { moeda, numero } from "../utils/format";
import ResumoEstado from "../components/ResumoEstado";
import MapaTocantins from "../components/MapaTocantins";
import GraficoPrioridade from "../components/GraficoPrioridade";
import GraficoSemaforo from "../components/GraficoSemaforo";
import GraficoDistribuicao from "../components/GraficoDistribuicao";
import RankingMunicipios from "../components/RankingMunicipios";
import "./Paineis.css";

export default function DashboardPage() {
  const [municipios, setMunicipios] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
    // KPIs agregados do estado (alertas, queimadas, area desmatada) que o
    // ranking sozinho nao fornece. Tolerante a falha: some se indisponivel.
    resumoDashboard()
      .then(setResumo)
      .catch(() => {});
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

      {resumo && (
        <div className="kpi-grid" style={{ marginBottom: 18 }}>
          <div className="kpi-box">
            <span className="kpi-rotulo">Focos de queimada (ano)</span>
            <span className="kpi-valor">{numero(resumo.focosQueimadaAnoCorrente)}</span>
            <span className="kpi-sub">{numero(resumo.focosQueimadaUltimos30Dias)} nos últimos 30 dias</span>
          </div>
          <div className="kpi-box">
            <span className="kpi-rotulo">Área desmatada (12m)</span>
            <span className="kpi-valor">{numero(resumo.totalAreaDesmatadaHa12Meses)} ha</span>
          </div>
          <div className="kpi-box">
            <span className="kpi-rotulo">Resultado ambiental</span>
            <span className="kpi-valor">{moeda(resumo.totalResultadoAmbiental)}</span>
            <span className="kpi-sub">gasto público {moeda(resumo.totalGastoPublicoReais)}</span>
          </div>
        </div>
      )}

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
