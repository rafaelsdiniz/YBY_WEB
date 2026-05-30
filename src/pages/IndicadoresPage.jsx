import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import MunicipioSelect from "../components/MunicipioSelect";
import { kpiPeriodo, historicoIndicadores, salvarIndicador } from "../services/indicadores";
import "./AdminTabela.css";
import "./Paineis.css";

const anoAtual = new Date().getFullYear();
const num = (v) => (v == null ? 0 : Number(v));
const moeda = (v) =>
  num(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function IndicadoresPage() {
  const { usuario } = useAuth();
  const toast = useToast();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [municipio, setMunicipio] = useState(null);
  const [anoInicio, setAnoInicio] = useState(anoAtual - 5);
  const [anoFim, setAnoFim] = useState(anoAtual);
  const [kpi, setKpi] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [form, setForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  async function consultar() {
    if (!municipio) {
      toast.info("Selecione um município.");
      return;
    }
    setCarregando(true);
    try {
      const [k, h] = await Promise.all([
        kpiPeriodo(municipio.apiId, anoInicio, anoFim).catch(() => null),
        historicoIndicadores(municipio.apiId, anoInicio, anoFim).catch(() => []),
      ]);
      setKpi(k);
      setHistorico(h || []);
    } finally {
      setCarregando(false);
    }
  }

  function novoIndicador() {
    setForm({
      ano: anoFim,
      gastoPublico: "",
      resultadoAmbiental: "",
      desmatamentoRecenteFactor: "",
      eficienciaGastoFactor: "",
      irregularidadesCarFactor: "",
      areaElegivelFactor: "",
    });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!municipio) {
      toast.info("Selecione um município primeiro.");
      return;
    }
    setSalvando(true);
    try {
      const f = form;
      const opcional = (v) => (v === "" || v == null ? null : Number(v));
      await salvarIndicador({
        municipioId: municipio.apiId,
        ano: Number(f.ano),
        gastoPublico: opcional(f.gastoPublico),
        resultadoAmbiental: opcional(f.resultadoAmbiental),
        desmatamentoRecenteFactor: opcional(f.desmatamentoRecenteFactor),
        eficienciaGastoFactor: opcional(f.eficienciaGastoFactor),
        irregularidadesCarFactor: opcional(f.irregularidadesCarFactor),
        areaElegivelFactor: opcional(f.areaElegivelFactor),
      });
      toast.sucesso("Indicador salvo.");
      setForm(null);
      consultar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Indicadores e KPI</h1>
        <p>Gasto público, resultado ambiental e retorno por R$ investido</p>
      </header>

      <section className="card">
        <div className="painel-toolbar">
          <MunicipioSelect value={municipio?.apiId} onChange={setMunicipio} />
          <label className="campo estreito">
            <span>Ano início</span>
            <input type="number" value={anoInicio} onChange={(e) => setAnoInicio(+e.target.value)} />
          </label>
          <label className="campo estreito">
            <span>Ano fim</span>
            <input type="number" value={anoFim} onChange={(e) => setAnoFim(+e.target.value)} />
          </label>
          <button type="button" className="painel-acao" onClick={consultar} disabled={carregando}>
            {carregando ? "Consultando…" : "Consultar"}
          </button>
          {ehGestor && (
            <button type="button" className="painel-acao secundario" onClick={novoIndicador}>
              Lançar indicador
            </button>
          )}
        </div>

        {kpi && (
          <div className="kpi-grid">
            <div className="kpi-box">
              <span className="kpi-rotulo">Gasto público</span>
              <span className="kpi-valor">{moeda(kpi.gastoPublico)}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Resultado ambiental</span>
              <span className="kpi-valor">{num(kpi.resultadoAmbiental).toLocaleString("pt-BR")}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Retorno por R$</span>
              <span className="kpi-valor">{num(kpi.kpiRetorno).toFixed(2)}</span>
              <span className="kpi-sub">{anoInicio}–{anoFim}</span>
            </div>
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="grafico-titulo">Histórico anual</h2>
        <div className="admin-tabela-wrap">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Ano</th>
                <th className="dir">Gasto público</th>
                <th className="dir">Resultado ambiental</th>
                <th className="dir">Retorno/R$</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((h) => (
                <tr key={h.id ?? h.ano}>
                  <td>{h.ano}</td>
                  <td className="dir admin-mut">{moeda(h.gastoPublico)}</td>
                  <td className="dir">{num(h.resultadoAmbiental).toLocaleString("pt-BR")}</td>
                  <td className="dir">{num(h.kpiRetorno).toFixed(2)}</td>
                </tr>
              ))}
              {historico.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-vazio">
                    Selecione um município e consulte para ver o histórico.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {form && (
        <section className="card">
          <h2 className="grafico-titulo">
            Lançar / atualizar indicador — {municipio?.nome ?? "selecione um município"}
          </h2>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <label className="campo">
                <span>Ano</span>
                <input type="number" value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} />
              </label>
              <label className="campo">
                <span>Gasto público (R$)</span>
                <input type="number" step="0.01" value={form.gastoPublico} onChange={(e) => setForm({ ...form, gastoPublico: e.target.value })} />
              </label>
              <label className="campo">
                <span>Resultado ambiental</span>
                <input type="number" step="0.01" value={form.resultadoAmbiental} onChange={(e) => setForm({ ...form, resultadoAmbiental: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fator desmatamento (0–1)</span>
                <input type="number" step="0.01" min="0" max="1" value={form.desmatamentoRecenteFactor} onChange={(e) => setForm({ ...form, desmatamentoRecenteFactor: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fator eficiência (0–1)</span>
                <input type="number" step="0.01" min="0" max="1" value={form.eficienciaGastoFactor} onChange={(e) => setForm({ ...form, eficienciaGastoFactor: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fator irregularidades CAR (0–1)</span>
                <input type="number" step="0.01" min="0" max="1" value={form.irregularidadesCarFactor} onChange={(e) => setForm({ ...form, irregularidadesCarFactor: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fator área elegível (0–1)</span>
                <input type="number" step="0.01" min="0" max="1" value={form.areaElegivelFactor} onChange={(e) => setForm({ ...form, areaElegivelFactor: e.target.value })} />
              </label>
            </div>
            <div className="modal-acoes">
              <button type="button" className="painel-acao secundario" onClick={() => setForm(null)}>Cancelar</button>
              <button type="submit" className="painel-acao" disabled={salvando}>{salvando ? "Salvando…" : "Salvar indicador"}</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
