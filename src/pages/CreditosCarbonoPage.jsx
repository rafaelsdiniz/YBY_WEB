import { useEffect, useState } from "react";
import { Plus, LineChart } from "lucide-react";
import {
  listarCreditos,
  criarCredito,
  atualizarCredito,
  deletarCredito,
  projecaoCredito,
} from "../services/creditosCarbono";
import { getMunicipios } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import Modal from "../components/Modal";
import Select from "../components/Select";
import MunicipioSelect from "../components/MunicipioSelect";
import { moeda, numero } from "../utils/format";
import { opcoes, rotulo, CREDITO_STATUS } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

const vazio = {
  municipioId: null,
  anoBase: new Date().getFullYear(),
  metaTco2eAno: "",
  precoTonelada: "",
  taxaCrescimentoPreco: "",
  percentualCumprimentoMeta: "",
  horizonteAnos: 10,
  descricao: "",
  status: "PLANEJADO",
};

export default function CreditosCarbonoPage() {
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const toast = useToast();
  const confirmar = useConfirm();

  const [lista, setLista] = useState([]);
  const [nomes, setNomes] = useState(new Map());
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState(null); // null = fechado
  const [municipioForm, setMunicipioForm] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [projecao, setProjecao] = useState(null);

  async function recarregar() {
    try {
      setLista(await listarCreditos());
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    getMunicipios()
      .then((ms) => setNomes(new Map(ms.map((m) => [String(m.apiId), m.nome]))))
      .catch(() => {});
    listarCreditos()
      .then(setLista)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nomeMun = (id) => nomes.get(String(id)) || `#${id}`;

  function novo() {
    setMunicipioForm(null);
    setForm({ ...vazio });
  }

  function editar(c) {
    setMunicipioForm({ apiId: c.municipioId });
    setForm({ ...c });
  }

  async function salvar(e) {
    e.preventDefault();
    const municipioId = municipioForm?.apiId ?? form.municipioId;
    if (!municipioId) {
      toast.info("Selecione um município.");
      return;
    }
    const dto = {
      municipioId,
      anoBase: Number(form.anoBase),
      metaTco2eAno: Number(form.metaTco2eAno),
      precoTonelada: Number(form.precoTonelada),
      taxaCrescimentoPreco: form.taxaCrescimentoPreco === "" ? null : Number(form.taxaCrescimentoPreco),
      percentualCumprimentoMeta:
        form.percentualCumprimentoMeta === "" ? null : Number(form.percentualCumprimentoMeta),
      horizonteAnos: Number(form.horizonteAnos),
      descricao: form.descricao || null,
      status: form.status,
    };
    setSalvando(true);
    try {
      if (form.id) {
        await atualizarCredito(form.id, dto);
        toast.sucesso("Crédito atualizado.");
      } else {
        await criarCredito(dto);
        toast.sucesso("Crédito cadastrado.");
      }
      setForm(null);
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function remover(c) {
    const ok = await confirmar({
      titulo: "Excluir crédito?",
      mensagem: `O crédito de ${nomeMun(c.municipioId)} (${c.anoBase}) será removido.`,
      confirmar: "Excluir",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await deletarCredito(c.id);
      toast.sucesso("Crédito excluído.");
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function verProjecao(c) {
    try {
      const p = await projecaoCredito(c.id);
      setProjecao({ ...p, _nome: nomeMun(c.municipioId) });
    } catch (err) {
      toast.erro(err.message);
    }
  }

  const colSpan = ehGestor ? 7 : 6;

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Créditos de carbono</h1>
          <p>Metas de tCO₂e/ano por município e projeção financeira (JREDD+)</p>
        </div>
        {ehGestor && (
          <button type="button" className="admin-novo" onClick={novo}>
            <Plus size={17} strokeWidth={1.75} /> Novo crédito
          </button>
        )}
      </header>

      <section className="card">
        {carregando ? (
          <p className="estado">Carregando…</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Município</th>
                  <th>Ano base</th>
                  <th className="dir">Meta tCO₂e/ano</th>
                  <th className="dir">Preço/t</th>
                  <th>Horizonte</th>
                  <th>Status</th>
                  {ehGestor && <th className="dir">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {lista.map((c) => (
                  <tr key={c.id}>
                    <td className="admin-nome">{nomeMun(c.municipioId)}</td>
                    <td>{c.anoBase}</td>
                    <td className="dir">{numero(c.metaTco2eAno)}</td>
                    <td className="dir">{moeda(c.precoTonelada)}</td>
                    <td>{c.horizonteAnos} anos</td>
                    <td><span className="selo selo--neutro">{rotulo(CREDITO_STATUS, c.status)}</span></td>
                    <td className="dir admin-acoes-col">
                      <button type="button" className="admin-acao" onClick={() => verProjecao(c)}>
                        <LineChart size={14} /> Projeção
                      </button>
                      {ehGestor && (
                        <>
                          <button type="button" className="admin-acao" onClick={() => editar(c)}>Editar</button>
                          <button type="button" className="admin-acao" onClick={() => remover(c)}>Excluir</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr><td colSpan={colSpan} className="admin-vazio">Nenhum crédito cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {form && (
        <Modal titulo={form.id ? "Editar crédito" : "Novo crédito"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <MunicipioSelect value={municipioForm?.apiId} onChange={setMunicipioForm} />
              <label className="campo">
                <span>Ano base</span>
                <input type="number" value={form.anoBase} onChange={(e) => setForm({ ...form, anoBase: e.target.value })} />
              </label>
              <label className="campo">
                <span>Meta tCO₂e/ano</span>
                <input type="number" step="0.01" required value={form.metaTco2eAno} onChange={(e) => setForm({ ...form, metaTco2eAno: e.target.value })} />
              </label>
              <label className="campo">
                <span>Preço por tonelada (R$)</span>
                <input type="number" step="0.01" required value={form.precoTonelada} onChange={(e) => setForm({ ...form, precoTonelada: e.target.value })} />
              </label>
              <label className="campo">
                <span>Taxa cresc. preço (a.a.)</span>
                <input type="number" step="0.0001" placeholder="ex.: 0.05" value={form.taxaCrescimentoPreco} onChange={(e) => setForm({ ...form, taxaCrescimentoPreco: e.target.value })} />
              </label>
              <label className="campo">
                <span>% cumprimento da meta</span>
                <input type="number" step="0.01" placeholder="0–100" value={form.percentualCumprimentoMeta} onChange={(e) => setForm({ ...form, percentualCumprimentoMeta: e.target.value })} />
              </label>
              <label className="campo">
                <span>Horizonte (anos)</span>
                <input type="number" min="1" max="50" value={form.horizonteAnos} onChange={(e) => setForm({ ...form, horizonteAnos: e.target.value })} />
              </label>
              <label className="campo">
                <span>Status</span>
                <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={opcoes(CREDITO_STATUS)} />
              </label>
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Descrição</span>
                <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
              </label>
            </div>
            <div className="modal-acoes">
              <button type="button" className="modal-btn modal-btn--cancelar" onClick={() => setForm(null)}>Cancelar</button>
              <button type="submit" className="modal-btn modal-btn--salvar" disabled={salvando}>
                {salvando ? "Salvando…" : "Salvar"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {projecao && (
        <Modal titulo={`Projeção · ${projecao._nome}`} onFechar={() => setProjecao(null)}>
          <div className="kpi-grid" style={{ marginBottom: 16 }}>
            <div className="kpi-box">
              <span className="kpi-rotulo">tCO₂e total</span>
              <span className="kpi-valor">{numero(projecao.tco2eTotal)}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Receita total</span>
              <span className="kpi-valor">{moeda(projecao.receitaTotalReais)}</span>
            </div>
          </div>
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Ano</th>
                  <th className="dir">tCO₂e</th>
                  <th className="dir">Preço/t</th>
                  <th className="dir">Receita</th>
                </tr>
              </thead>
              <tbody>
                {(projecao.itens || []).map((i) => (
                  <tr key={i.ano}>
                    <td>{i.ano}</td>
                    <td className="dir">{numero(i.toneladasProjetadas)}</td>
                    <td className="dir">{moeda(i.precoToneladaAno)}</td>
                    <td className="dir">{moeda(i.receitaProjetadaReais)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </>
  );
}
