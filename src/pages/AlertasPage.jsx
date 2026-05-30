import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import MunicipioSelect from "../components/MunicipioSelect";
import Select from "../components/Select";
import { desperdicio, risco, salvarAlerta } from "../services/alertas";
import "./AdminTabela.css";
import "./Paineis.css";

const anoAtual = new Date().getFullYear();
const num = (v) => (v == null ? 0 : Number(v));
const SELO = { verde: "selo--verde", amarelo: "selo--amarelo", vermelho: "selo--vermelho" };
const TIPOS = ["EMBARGO", "SOBREPOSICAO", "CAR_IRREGULAR", "MANUAL"];
const GRAVIDADES = ["BAIXA", "MEDIA", "ALTA"];

export default function AlertasPage() {
  const { usuario } = useAuth();
  const toast = useToast();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [ano, setAno] = useState(anoAtual);
  const [limite, setLimite] = useState(10);
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [municipio, setMunicipio] = useState(null);
  const [riscoInfo, setRiscoInfo] = useState(null);

  const [form, setForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  async function consultarDesperdicio() {
    setCarregando(true);
    try {
      setLista(await desperdicio(ano, limite));
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function consultarRisco(m) {
    setMunicipio(m);
    setRiscoInfo(null);
    if (!m) return;
    try {
      setRiscoInfo(await risco(m.apiId));
    } catch (err) {
      toast.erro(err.message);
    }
  }

  function novoAlerta() {
    setForm({
      tipo: "MANUAL",
      gravidade: "MEDIA",
      descricao: "",
      acaoRecomendada: "",
      dataAlerta: new Date().toISOString().slice(0, 10),
      ativo: true,
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
      await salvarAlerta({ municipioId: municipio.apiId, ...form });
      toast.sucesso("Alerta registrado.");
      setForm(null);
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Alertas</h1>
          <p>Desperdício de gasto, risco de prontidão e alertas manuais</p>
        </div>
        {ehGestor && (
          <button type="button" className="painel-acao" onClick={novoAlerta}>
            Novo alerta
          </button>
        )}
      </header>

      <section className="card">
        <h2 className="grafico-titulo">Alerta de desperdício</h2>
        <div className="painel-toolbar">
          <label className="campo estreito">
            <span>Ano</span>
            <input type="number" value={ano} onChange={(e) => setAno(+e.target.value)} />
          </label>
          <label className="campo estreito">
            <span>Limite</span>
            <input type="number" value={limite} onChange={(e) => setLimite(+e.target.value)} />
          </label>
          <button type="button" className="painel-acao" onClick={consultarDesperdicio} disabled={carregando}>
            {carregando ? "Consultando…" : "Consultar"}
          </button>
        </div>
        <div className="admin-tabela-wrap">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Gravidade</th>
                <th>Descrição</th>
                <th>Ação recomendada</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((a, i) => (
                <tr key={a.id ?? i}>
                  <td>{a.tipo}</td>
                  <td>{a.gravidade}</td>
                  <td className="admin-mut">{a.descricao}</td>
                  <td className="admin-mut">{a.acaoRecomendada}</td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr><td colSpan={4} className="admin-vazio">Consulte para listar os alertas de desperdício.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 className="grafico-titulo">Análise de risco</h2>
        <div className="painel-toolbar">
          <MunicipioSelect value={municipio?.apiId} onChange={consultarRisco} />
        </div>
        {riscoInfo ? (
          <>
            <div className="kpi-grid">
              <div className="kpi-box">
                <span className="kpi-rotulo">Nota de risco</span>
                <span className="kpi-valor">{num(riscoInfo.notaRisco).toFixed(1)}/10</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-rotulo">Semáforo</span>
                <span className="kpi-valor">
                  <span className={`selo ${SELO[String(riscoInfo.semaforo).toLowerCase()] || "selo--neutro"}`}>
                    {riscoInfo.semaforo}
                  </span>
                </span>
              </div>
            </div>
            <div className="painel-meta">Pendências:</div>
            {riscoInfo.pendencias?.length ? (
              <ul>
                {riscoInfo.pendencias.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            ) : (
              <p className="painel-vazio">Nenhuma pendência registrada.</p>
            )}
          </>
        ) : (
          <p className="painel-vazio">Selecione um município para ver o risco.</p>
        )}
      </section>

      {form && (
        <section className="card">
          <h2 className="grafico-titulo">Novo alerta — {municipio?.nome ?? "selecione um município"}</h2>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <label className="campo">
                <span>Tipo</span>
                <Select
                  value={form.tipo}
                  onChange={(v) => setForm({ ...form, tipo: v })}
                  options={TIPOS.map((t) => ({ value: t, label: t }))}
                />
              </label>
              <label className="campo">
                <span>Gravidade</span>
                <Select
                  value={form.gravidade}
                  onChange={(v) => setForm({ ...form, gravidade: v })}
                  options={GRAVIDADES.map((g) => ({ value: g, label: g }))}
                />
              </label>
              <label className="campo">
                <span>Data do alerta</span>
                <input type="date" value={form.dataAlerta} onChange={(e) => setForm({ ...form, dataAlerta: e.target.value })} />
              </label>
              <label className="campo">
                <span>Descrição</span>
                <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
              </label>
              <label className="campo">
                <span>Ação recomendada</span>
                <input value={form.acaoRecomendada} onChange={(e) => setForm({ ...form, acaoRecomendada: e.target.value })} />
              </label>
              <label className="campo">
                <span>Ativo</span>
                <Select
                  value={form.ativo ? "1" : "0"}
                  onChange={(v) => setForm({ ...form, ativo: v === "1" })}
                  options={[
                    { value: "1", label: "Sim" },
                    { value: "0", label: "Não" },
                  ]}
                />
              </label>
            </div>
            <div className="modal-acoes">
              <button type="button" className="painel-acao secundario" onClick={() => setForm(null)}>Cancelar</button>
              <button type="submit" className="painel-acao" disabled={salvando}>{salvando ? "Salvando…" : "Salvar alerta"}</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
