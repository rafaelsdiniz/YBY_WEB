import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getMunicipioDetalhe } from "../services/api";
import { tendencia, riscoPreditivo, semaforoBioma } from "../services/inteligencia";
import DetalheMunicipio from "../components/DetalheMunicipio";
import { numero, SEM_DADO } from "../utils/format";
import "./Paineis.css";

const SELO = { verde: "selo--verde", amarelo: "selo--amarelo", vermelho: "selo--vermelho" };
const selo = (v) => <span className={`selo ${SELO[String(v).toLowerCase()] || "selo--neutro"}`}>{v ?? SEM_DADO}</span>;

export default function MunicipioDetalhePage() {
  const { id } = useParams(); // id numerico da API (apiId)
  const navigate = useNavigate();

  // resultados guardados junto do id a que pertencem (evita setState sincrono
  // no effect e estado obsoleto ao navegar entre municipios)
  const [res, setRes] = useState({ id: null, municipio: null, erro: false });
  const [intelRes, setIntelRes] = useState({ id: null, dados: null });

  useEffect(() => {
    let ativo = true;
    getMunicipioDetalhe(id)
      .then((m) => ativo && setRes({ id, municipio: m, erro: false }))
      .catch(() => ativo && setRes({ id, municipio: null, erro: true }));
    // inteligencia do municipio (tolerante a falha individual)
    Promise.all([
      tendencia(id).catch(() => null),
      riscoPreditivo(id).catch(() => null),
      semaforoBioma(id).catch(() => null),
    ]).then(([tend, risco, bioma]) => ativo && setIntelRes({ id, dados: { tend, risco, bioma } }));
    return () => {
      ativo = false;
    };
  }, [id]);

  const pronto = res.id === id;
  const municipio = pronto ? res.municipio : null;
  const erro = pronto ? res.erro : false;
  const intel = intelRes.id === id ? intelRes.dados : null;

  if (!pronto) return <p className="estado">Carregando município...</p>;
  if (erro || !municipio) {
    return (
      <>
        <button type="button" className="painel-acao secundario" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Voltar
        </button>
        <p className="card detalhe-vazio" style={{ marginTop: 16 }}>Município não encontrado.</p>
      </>
    );
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>{municipio.nome}</h1>
          <p>Código IBGE {municipio.codigoIbge} · prioridade {numero(municipio.prioridade)}</p>
        </div>
        <button type="button" className="painel-acao secundario" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Voltar
        </button>
      </header>

      <div className="card">
        <DetalheMunicipio municipio={municipio} />
      </div>

      {intel && (intel.tend || intel.risco || intel.bioma) && (
        <section className="card">
          <h2 className="grafico-titulo">Inteligência do município</h2>
          <div className="kpi-grid">
            {intel.tend && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Tendência do desmatamento</span>
                <span className="kpi-valor">{numero(intel.tend.tendenciaDesmatamento, 1)}%</span>
                <span className="kpi-sub">
                  {intel.tend.statusTendencia} · ajuste {intel.tend.ajusteScore > 0 ? "+" : ""}{intel.tend.ajusteScore}
                </span>
              </div>
            )}
            {intel.risco && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Risco preditivo</span>
                <span className="kpi-valor">{numero(intel.risco.notaRiscoFinal, 1)}/10</span>
                <span className="kpi-sub">{selo(intel.risco.semaforoRisco)}{intel.risco.embargoRecente ? " · embargo recente" : ""}</span>
              </div>
            )}
            {intel.bioma && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Semáforo bioma ({intel.bioma.biomaPrincipal})</span>
                <span className="kpi-valor">{selo(intel.bioma.semaforo)}</span>
                <span className="kpi-sub">{intel.bioma.prodesDesatualizado ? "PRODES desatualizado" : "dados atuais"}</span>
              </div>
            )}
          </div>
          {intel.bioma?.justificativaSemaforo && (
            <p className="painel-just">{intel.bioma.justificativaSemaforo}</p>
          )}
        </section>
      )}
    </>
  );
}
