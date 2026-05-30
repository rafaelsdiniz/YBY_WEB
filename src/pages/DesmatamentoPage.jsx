import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import MunicipioSelect from "../components/MunicipioSelect";
import GraficoDesmatamento from "../components/GraficoDesmatamento";
import {
  resumoDesmatamento,
  historicoDesmatamento,
  importarDesmatamento,
  statusImportacao,
} from "../services/desmatamento";
import "./AdminTabela.css";
import "./Paineis.css";

const anoAtual = new Date().getFullYear();
const num = (v) => (v == null ? 0 : Number(v));
const ha = (v) => `${num(v).toLocaleString("pt-BR", { maximumFractionDigits: 0 })} ha`;

const SELO = { verde: "selo--verde", amarelo: "selo--amarelo", vermelho: "selo--vermelho" };

export default function DesmatamentoPage() {
  const { usuario } = useAuth();
  const toast = useToast();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [ano, setAno] = useState(anoAtual);
  const [resumo, setResumo] = useState(null);
  const [municipio, setMunicipio] = useState(null);
  const [fonte, setFonte] = useState("ALL");
  const [serie, setSerie] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [importando, setImportando] = useState(false);
  const [jobStatus, setJobStatus] = useState(null);

  async function consultarResumo() {
    setCarregando(true);
    try {
      setResumo(await resumoDesmatamento(ano));
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function consultarHistorico(m, f) {
    const mun = m ?? municipio;
    if (!mun) return;
    const serieNova = await historicoDesmatamento(mun.apiId, { fonte: f ?? fonte }).catch(() => []);
    setSerie(serieNova);
  }

  async function importar() {
    setImportando(true);
    setJobStatus(null);
    try {
      const { jobId } = await importarDesmatamento();
      toast.info(`Importação iniciada (job ${jobId}).`);
      // polling simples do status
      const poll = async () => {
        const st = await statusImportacao(jobId);
        setJobStatus(st);
        if (st.status === "PROCESSANDO") {
          setTimeout(poll, 1500);
        } else {
          setImportando(false);
          toast.sucesso(`Importação ${st.status.toLowerCase()} (${st.registrosInseridos ?? 0} registros).`);
        }
      };
      poll();
    } catch (err) {
      setImportando(false);
      toast.erro(err.message);
    }
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Desmatamento</h1>
          <p>Resumo anual (PRODES/DETER) e evolução por município</p>
        </div>
        {ehGestor && (
          <button type="button" className="painel-acao" onClick={importar} disabled={importando}>
            {importando ? "Importando…" : "Importar dados"}
          </button>
        )}
      </header>

      {jobStatus && (
        <p className="painel-meta">
          Job #{jobStatus.jobId}: <strong>{jobStatus.status}</strong>
          {jobStatus.registrosInseridos != null && ` · ${jobStatus.registrosInseridos} registros`}
          {jobStatus.erros?.length ? ` · erros: ${jobStatus.erros.join("; ")}` : ""}
        </p>
      )}

      <section className="card">
        <div className="painel-toolbar">
          <label className="campo estreito">
            <span>Ano</span>
            <input type="number" value={ano} onChange={(e) => setAno(+e.target.value)} />
          </label>
          <button type="button" className="painel-acao" onClick={consultarResumo} disabled={carregando}>
            {carregando ? "Consultando…" : "Ver resumo do ano"}
          </button>
        </div>

        {resumo && (
          <>
            <div className="kpi-grid">
              <div className="kpi-box">
                <span className="kpi-rotulo">Total desmatado em {resumo.ano}</span>
                <span className="kpi-valor">{ha(resumo.totalAreaHa)}</span>
              </div>
            </div>
            <div className="admin-tabela-wrap" style={{ marginTop: 14 }}>
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Bioma</th>
                    <th>Semáforo</th>
                    <th className="dir">Área (ha)</th>
                  </tr>
                </thead>
                <tbody>
                  {(resumo.breakdown || []).map((b, i) => (
                    <tr key={i}>
                      <td>{b.bioma}</td>
                      <td>
                        <span className={`selo ${SELO[String(b.semaforo).toLowerCase()] || "selo--neutro"}`}>
                          {b.semaforo}
                        </span>
                      </td>
                      <td className="dir">{ha(b.areaTotalHa)}</td>
                    </tr>
                  ))}
                  {(resumo.breakdown || []).length === 0 && (
                    <tr><td colSpan={3} className="admin-vazio">Sem breakdown para o ano.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="card">
        <h2 className="grafico-titulo">Histórico por município</h2>
        <div className="painel-toolbar">
          <MunicipioSelect
            value={municipio?.apiId}
            onChange={(m) => {
              setMunicipio(m);
              consultarHistorico(m, fonte);
            }}
          />
          <label className="campo estreito">
            <span>Fonte</span>
            <select
              value={fonte}
              onChange={(e) => {
                setFonte(e.target.value);
                consultarHistorico(municipio, e.target.value);
              }}
            >
              <option value="ALL">Todas</option>
              <option value="PRODES">PRODES</option>
              <option value="DETER">DETER</option>
            </select>
          </label>
        </div>
        {serie.length > 0 ? (
          <GraficoDesmatamento serie={serie} />
        ) : (
          <p className="painel-vazio">Selecione um município para ver a evolução.</p>
        )}
      </section>
    </>
  );
}
