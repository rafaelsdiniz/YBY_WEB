import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMunicipios, getMunicipioDetalhe } from "../services/api";
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
  const [detalhe, setDetalhe] = useState(null);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  // ao selecionar, busca o detalhe completo (detalhe + KPI + desmatamento + risco).
  // O setState ocorre apenas no callback assincrono; o estado de loading e derivado.
  useEffect(() => {
    if (!selecionado || municipios.length === 0) return;
    const base = municipios.find((m) => m.id === selecionado);
    if (!base) return;
    let ativo = true;
    getMunicipioDetalhe(base.apiId)
      .then((d) => ativo && setDetalhe(d))
      .catch(() => ativo && setDetalhe(base));
    return () => {
      ativo = false;
    };
  }, [selecionado, municipios]);

  // detalhe so vale se for o do municipio atualmente selecionado
  const detalheAtivo = detalhe && detalhe.id === selecionado ? detalhe : null;
  const carregandoDetalhe = Boolean(selecionado) && !detalheAtivo;

  if (carregando) {
    return <p className="estado">Carregando dados do Tocantins...</p>;
  }

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
          {carregandoDetalhe ? (
            <p className="card detalhe-vazio">Carregando detalhes do município...</p>
          ) : detalheAtivo ? (
            <section className="card">
              <DetalheMunicipio municipio={detalheAtivo} />
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
