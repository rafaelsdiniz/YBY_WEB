import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import MunicipioSelect from "../components/MunicipioSelect";
import {
  tendencia,
  kpiMultidimensional,
  semaforoBioma,
  riscoPreditivo,
  desperdicioInteligente,
  equidade,
  simularAlocacao,
} from "../services/inteligencia";
import "./AdminTabela.css";
import "./Paineis.css";

const anoAtual = new Date().getFullYear();
const num = (v) => (v == null ? 0 : Number(v));
const moeda = (v) => num(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const SELO = { verde: "selo--verde", amarelo: "selo--amarelo", vermelho: "selo--vermelho" };
const ESTRATEGIAS = [
  { v: "MAXIMO_KPI", r: "Máximo retorno (KPI)" },
  { v: "EQUIDADE_REGIONAL", r: "Equidade regional" },
  { v: "RISCO_MINIMO", r: "Risco mínimo" },
];

function selo(valor) {
  return <span className={`selo ${SELO[String(valor).toLowerCase()] || "selo--neutro"}`}>{valor}</span>;
}

export default function InteligenciaPage() {
  const { usuario } = useAuth();
  const toast = useToast();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [municipio, setMunicipio] = useState(null);
  const [ano, setAno] = useState(anoAtual);
  const [analise, setAnalise] = useState(null); // { tend, kpi, bioma, risco }
  const [carregando, setCarregando] = useState(false);

  const [anoEstado, setAnoEstado] = useState(anoAtual);
  const [desperdicios, setDesperdicios] = useState([]);
  const [equidadeInfo, setEquidadeInfo] = useState(null);

  const [aloc, setAloc] = useState({ orcamentoTotal: "", estrategia: "MAXIMO_KPI", maxMunicipios: "", valorMinimoPorMunicipio: "" });
  const [resultadoAloc, setResultadoAloc] = useState(null);
  const [simulando, setSimulando] = useState(false);

  async function analisarMunicipio() {
    if (!municipio) {
      toast.info("Selecione um município.");
      return;
    }
    setCarregando(true);
    try {
      const [tend, kpi, bioma, risco] = await Promise.all([
        tendencia(municipio.apiId, ano).catch(() => null),
        kpiMultidimensional(municipio.apiId, ano).catch(() => null),
        semaforoBioma(municipio.apiId).catch(() => null),
        riscoPreditivo(municipio.apiId).catch(() => null),
      ]);
      setAnalise({ tend, kpi, bioma, risco });
    } finally {
      setCarregando(false);
    }
  }

  async function analisarEstado() {
    try {
      const [d, eq] = await Promise.all([
        desperdicioInteligente(anoEstado).catch(() => []),
        equidade(anoEstado).catch(() => null),
      ]);
      setDesperdicios(d || []);
      setEquidadeInfo(eq);
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function simular(e) {
    e.preventDefault();
    setSimulando(true);
    try {
      const opc = (v) => (v === "" || v == null ? null : Number(v));
      const res = await simularAlocacao({
        orcamentoTotal: Number(aloc.orcamentoTotal),
        ano: anoEstado,
        estrategia: aloc.estrategia,
        maxMunicipios: opc(aloc.maxMunicipios),
        valorMinimoPorMunicipio: opc(aloc.valorMinimoPorMunicipio),
      });
      setResultadoAloc(res);
      toast.sucesso("Simulação concluída.");
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSimulando(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Inteligência</h1>
        <p>Tendência, risco preditivo, equidade e otimização de alocação</p>
      </header>

      {/* ANÁLISE POR MUNICÍPIO */}
      <section className="card">
        <h2 className="grafico-titulo">Análise por município</h2>
        <div className="painel-toolbar">
          <MunicipioSelect value={municipio?.apiId} onChange={setMunicipio} />
          <label className="campo estreito">
            <span>Ano</span>
            <input type="number" value={ano} onChange={(e) => setAno(+e.target.value)} />
          </label>
          <button type="button" className="painel-acao" onClick={analisarMunicipio} disabled={carregando}>
            {carregando ? "Analisando…" : "Analisar"}
          </button>
        </div>

        {analise && (
          <div className="kpi-grid">
            {analise.tend && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Tendência desmatamento</span>
                <span className="kpi-valor">{num(analise.tend.tendenciaDesmatamento).toFixed(1)}%</span>
                <span className="kpi-sub">{analise.tend.statusTendencia} · ajuste score {analise.tend.ajusteScore > 0 ? "+" : ""}{analise.tend.ajusteScore}</span>
              </div>
            )}
            {analise.kpi && (
              <div className="kpi-box">
                <span className="kpi-rotulo">KPI multidimensional</span>
                <span className="kpi-valor">{num(analise.kpi.kpiFinal).toFixed(1)}</span>
                <span className="kpi-sub">A {num(analise.kpi.dimensaoAmbiental).toFixed(0)} · S {num(analise.kpi.dimensaoSocial).toFixed(0)} · F {num(analise.kpi.dimensaoFiscal).toFixed(0)}</span>
              </div>
            )}
            {analise.bioma && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Semáforo bioma ({analise.bioma.biomaPrincipal})</span>
                <span className="kpi-valor">{selo(analise.bioma.semaforo)}</span>
                <span className="kpi-sub">{analise.bioma.prodesDesatualizado ? "PRODES desatualizado" : "dados atuais"}</span>
              </div>
            )}
            {analise.risco && (
              <div className="kpi-box">
                <span className="kpi-rotulo">Risco preditivo</span>
                <span className="kpi-valor">{num(analise.risco.notaRiscoFinal).toFixed(1)}/10</span>
                <span className="kpi-sub">{selo(analise.risco.semaforoRisco)}{analise.risco.embargoRecente ? " · embargo recente" : ""}</span>
              </div>
            )}
          </div>
        )}
        {analise?.bioma?.justificativaSemaforo && (
          <p className="painel-just">{analise.bioma.justificativaSemaforo}</p>
        )}
        {analise?.risco?.pendencias?.length > 0 && (
          <ul style={{ marginTop: 10 }}>
            {analise.risco.pendencias.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        )}
      </section>

      {/* ANÁLISE ESTADUAL */}
      <section className="card">
        <h2 className="grafico-titulo">Panorama estadual</h2>
        <div className="painel-toolbar">
          <label className="campo estreito">
            <span>Ano</span>
            <input type="number" value={anoEstado} onChange={(e) => setAnoEstado(+e.target.value)} />
          </label>
          <button type="button" className="painel-acao" onClick={analisarEstado}>Consultar</button>
        </div>

        {equidadeInfo && (
          <div className="kpi-grid">
            <div className="kpi-box">
              <span className="kpi-rotulo">Índice de equidade</span>
              <span className="kpi-valor">{num(equidadeInfo.indiceEquidade).toFixed(2)}</span>
              <span className="kpi-sub">{equidadeInfo.concentracaoElevada ? "concentração elevada" : "distribuição equilibrada"}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Investimento médio</span>
              <span className="kpi-valor">{moeda(equidadeInfo.media)}</span>
              <span className="kpi-sub">mediana {moeda(equidadeInfo.mediana)}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Bônus de equidade</span>
              <span className="kpi-valor">+{equidadeInfo.bonusScore}</span>
              <span className="kpi-sub">{equidadeInfo.municipiosComBonus?.length || 0} municípios elegíveis</span>
            </div>
          </div>
        )}

        <h3 style={{ marginTop: 18 }}>Desperdício inteligente (benchmarking)</h3>
        <div className="admin-tabela-wrap">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Município</th>
                <th>Bioma / Porte</th>
                <th className="dir">Custo/resultado</th>
                <th className="dir">Média do grupo</th>
                <th className="dir">Razão</th>
                <th>Nível</th>
              </tr>
            </thead>
            <tbody>
              {desperdicios.map((d) => (
                <tr key={d.municipioId}>
                  <td className="admin-nome">{d.nome}</td>
                  <td className="admin-mut">{d.bioma} · {d.porte}</td>
                  <td className="dir">{num(d.custoPorResultado).toFixed(2)}</td>
                  <td className="dir">{num(d.mediaGrupo).toFixed(2)}</td>
                  <td className="dir">{num(d.razaoSobreMedia).toFixed(2)}x</td>
                  <td>{selo(d.nivelAlerta)}</td>
                </tr>
              ))}
              {desperdicios.length === 0 && (
                <tr><td colSpan={6} className="admin-vazio">Consulte para ver o benchmarking de eficiência.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SIMULADOR DE ALOCAÇÃO (GESTOR) */}
      {ehGestor && (
        <section className="card">
          <h2 className="grafico-titulo">Simulador de alocação de orçamento</h2>
          <form onSubmit={simular}>
            <div className="form-grid">
              <label className="campo">
                <span>Orçamento total (R$)</span>
                <input type="number" step="0.01" required value={aloc.orcamentoTotal} onChange={(e) => setAloc({ ...aloc, orcamentoTotal: e.target.value })} />
              </label>
              <label className="campo">
                <span>Estratégia</span>
                <select value={aloc.estrategia} onChange={(e) => setAloc({ ...aloc, estrategia: e.target.value })}>
                  {ESTRATEGIAS.map((s) => <option key={s.v} value={s.v}>{s.r}</option>)}
                </select>
              </label>
              <label className="campo">
                <span>Máx. municípios</span>
                <input type="number" value={aloc.maxMunicipios} onChange={(e) => setAloc({ ...aloc, maxMunicipios: e.target.value })} />
              </label>
              <label className="campo">
                <span>Valor mínimo por município</span>
                <input type="number" step="0.01" value={aloc.valorMinimoPorMunicipio} onChange={(e) => setAloc({ ...aloc, valorMinimoPorMunicipio: e.target.value })} />
              </label>
            </div>
            <div className="modal-acoes">
              <button type="submit" className="painel-acao" disabled={simulando}>{simulando ? "Simulando…" : "Simular alocação"}</button>
            </div>
          </form>

          {resultadoAloc && (
            <>
              <div className="kpi-grid" style={{ marginTop: 16 }}>
                <div className="kpi-box">
                  <span className="kpi-rotulo">Total alocado</span>
                  <span className="kpi-valor">{moeda(resultadoAloc.totalAlocado)}</span>
                </div>
                <div className="kpi-box">
                  <span className="kpi-rotulo">Retorno esperado</span>
                  <span className="kpi-valor">{moeda(resultadoAloc.retornoEsperadoTotal)}</span>
                </div>
              </div>
              <div className="admin-tabela-wrap" style={{ marginTop: 14 }}>
                <table className="admin-tabela">
                  <thead>
                    <tr>
                      <th>Município</th>
                      <th className="dir">Score</th>
                      <th className="dir">Valor alocado</th>
                      <th className="dir">Retorno esperado</th>
                      <th className="dir">Impacto social</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(resultadoAloc.itens || []).map((it) => (
                      <tr key={it.municipioId}>
                        <td className="admin-nome">{it.nome}</td>
                        <td className="dir">{num(it.scorePrioridade).toFixed(0)}</td>
                        <td className="dir">{moeda(it.valorAlocado)}</td>
                        <td className="dir">{moeda(it.retornoEsperado)}</td>
                        <td className="dir">{num(it.impactoSocialEstimado).toLocaleString("pt-BR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
