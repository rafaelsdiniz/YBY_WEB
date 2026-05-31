import { useEffect, useState } from "react";
import { Plus, Calculator } from "lucide-react";
import {
  listarLinhas,
  criarLinha,
  atualizarLinha,
  deletarLinha,
  simularSafra,
} from "../services/planoSafra";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { moeda, numero } from "../utils/format";
import { opcoes, rotulo, PROGRAMA_SAFRA } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

const pctTaxa = (fracao) => (fracao == null ? "—" : `${numero(Number(fracao) * 100, 2)}%`);

const vazioLinha = {
  nome: "",
  programa: "RENOVAGRO",
  anoSafra: "2025/2026",
  instituicaoFinanceira: "",
  taxaJurosAa: "",
  tetoFinanciamento: "",
  prazoMeses: "",
  carenciaMeses: "",
  exigePraticaCarbono: false,
  fatorReducaoTco2eHa: "",
  descricao: "",
  ativo: true,
};

export default function PlanoSafraPage() {
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const toast = useToast();
  const confirmar = useConfirm();

  const [linhas, setLinhas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // simulacao
  const [sim, setSim] = useState({ areaHa: "", programa: "", somenteCarbono: false, precoTonelada: "" });
  const [resultado, setResultado] = useState(null);
  const [simulando, setSimulando] = useState(false);

  async function recarregar() {
    try {
      setLinhas(await listarLinhas(false));
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    listarLinhas(false)
      .then(setLinhas)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function simular(e) {
    e.preventDefault();
    if (!sim.areaHa || Number(sim.areaHa) <= 0) {
      toast.info("Informe a área (ha).");
      return;
    }
    setSimulando(true);
    try {
      const r = await simularSafra({
        areaHa: Number(sim.areaHa),
        programa: sim.programa || null,
        somenteCarbono: sim.somenteCarbono,
        precoTonelada: sim.precoTonelada === "" ? null : Number(sim.precoTonelada),
      });
      setResultado(r);
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSimulando(false);
    }
  }

  function novo() {
    setForm({ ...vazioLinha });
  }
  function editar(l) {
    setForm({
      ...l,
      taxaJurosAa: l.taxaJurosAa ?? "",
      tetoFinanciamento: l.tetoFinanciamento ?? "",
      prazoMeses: l.prazoMeses ?? "",
      carenciaMeses: l.carenciaMeses ?? "",
      fatorReducaoTco2eHa: l.fatorReducaoTco2eHa ?? "",
      descricao: l.descricao || "",
    });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!form.nome.trim()) {
      toast.info("Informe o nome da linha.");
      return;
    }
    const dto = {
      nome: form.nome.trim(),
      programa: form.programa,
      anoSafra: form.anoSafra,
      instituicaoFinanceira: form.instituicaoFinanceira || null,
      taxaJurosAa: Number(form.taxaJurosAa),
      tetoFinanciamento: form.tetoFinanciamento === "" ? null : Number(form.tetoFinanciamento),
      prazoMeses: form.prazoMeses === "" ? null : Number(form.prazoMeses),
      carenciaMeses: form.carenciaMeses === "" ? null : Number(form.carenciaMeses),
      exigePraticaCarbono: form.exigePraticaCarbono,
      fatorReducaoTco2eHa: form.fatorReducaoTco2eHa === "" ? null : Number(form.fatorReducaoTco2eHa),
      descricao: form.descricao || null,
      ativo: form.ativo,
    };
    setSalvando(true);
    try {
      if (form.id) {
        await atualizarLinha(form.id, dto);
        toast.sucesso("Linha atualizada.");
      } else {
        await criarLinha(dto);
        toast.sucesso("Linha cadastrada.");
      }
      setForm(null);
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function remover(l) {
    const ok = await confirmar({
      titulo: "Excluir linha?",
      mensagem: `A linha "${l.nome}" será removida.`,
      confirmar: "Excluir",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await deletarLinha(l.id);
      toast.sucesso("Linha excluída.");
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  const colSpan = ehGestor ? 7 : 6;

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Plano Safra 2026</h1>
          <p>Linhas de crédito rural e simulação integrada ao potencial de carbono</p>
        </div>
        {ehGestor && (
          <button type="button" className="admin-novo" onClick={novo}>
            <Plus size={17} strokeWidth={1.75} /> Nova linha
          </button>
        )}
      </header>

      <section className="card">
        <h2 className="grafico-titulo"><Calculator size={17} /> Simulador de financiamento</h2>
        <form onSubmit={simular} className="painel-toolbar">
          <label className="campo estreito">
            <span>Área (ha)</span>
            <input type="number" step="0.01" value={sim.areaHa} onChange={(e) => setSim({ ...sim, areaHa: e.target.value })} />
          </label>
          <label className="campo">
            <span>Programa</span>
            <Select
              value={sim.programa}
              onChange={(v) => setSim({ ...sim, programa: v })}
              placeholder="Todos"
              options={[{ value: "", label: "Todos" }, ...opcoes(PROGRAMA_SAFRA)]}
            />
          </label>
          <label className="campo estreito">
            <span>Preço/t carbono</span>
            <input type="number" step="0.01" placeholder="opcional" value={sim.precoTonelada} onChange={(e) => setSim({ ...sim, precoTonelada: e.target.value })} />
          </label>
          <label className="campo campo--check">
            <input type="checkbox" checked={sim.somenteCarbono} onChange={(e) => setSim({ ...sim, somenteCarbono: e.target.checked })} />
            <span>Só linhas de carbono</span>
          </label>
          <button type="submit" className="painel-acao" disabled={simulando}>
            {simulando ? "Simulando…" : "Simular"}
          </button>
        </form>

        {resultado && (
          <>
            <div className="kpi-grid" style={{ margin: "8px 0 16px" }}>
              <div className="kpi-box">
                <span className="kpi-rotulo">Maior financiável</span>
                <span className="kpi-valor">{moeda(resultado.totalFinanciavel)}</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-rotulo">tCO₂e potencial/ano</span>
                <span className="kpi-valor">{numero(resultado.tco2ePotencialAno)}</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-rotulo">Receita carbono/ano</span>
                <span className="kpi-valor">{moeda(resultado.receitaCarbonoAno)}</span>
              </div>
            </div>
            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Linha</th>
                    <th>Programa</th>
                    <th className="dir">Juros a.a.</th>
                    <th className="dir">Financiável</th>
                    <th className="dir">Juros 1º ano</th>
                    <th className="dir">tCO₂e/ano</th>
                  </tr>
                </thead>
                <tbody>
                  {(resultado.itens || []).map((i) => (
                    <tr key={i.linhaId}>
                      <td className="admin-nome">{i.nome}</td>
                      <td className="admin-mut">{rotulo(PROGRAMA_SAFRA, i.programa)}</td>
                      <td className="dir">{pctTaxa(i.taxaJurosAa)}</td>
                      <td className="dir">{moeda(i.valorFinanciavel)}</td>
                      <td className="dir">{moeda(i.custoJurosAnoUm)}</td>
                      <td className="dir">{i.tco2eAno == null ? "—" : numero(i.tco2eAno)}</td>
                    </tr>
                  ))}
                  {(resultado.itens || []).length === 0 && (
                    <tr><td colSpan={6} className="admin-vazio">Nenhuma linha elegível para os filtros.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="card">
        <h2 className="grafico-titulo">Linhas de crédito</h2>
        {carregando ? (
          <p className="estado">Carregando…</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Linha</th>
                  <th>Programa</th>
                  <th>Ano-safra</th>
                  <th className="dir">Juros a.a.</th>
                  <th className="dir">Teto</th>
                  <th>Carbono</th>
                  {ehGestor && <th className="dir">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {linhas.map((l) => (
                  <tr key={l.id}>
                    <td className="admin-nome">
                      {l.nome}
                      {l.ativo === false && <span className="selo selo--vermelho" style={{ marginLeft: 8 }}>inativa</span>}
                    </td>
                    <td className="admin-mut">{rotulo(PROGRAMA_SAFRA, l.programa)}</td>
                    <td>{l.anoSafra}</td>
                    <td className="dir">{pctTaxa(l.taxaJurosAa)}</td>
                    <td className="dir">{l.tetoFinanciamento == null ? "—" : moeda(l.tetoFinanciamento)}</td>
                    <td>{l.exigePraticaCarbono ? <span className="tag tag--verde">sim</span> : <span className="tag tag--cinza">não</span>}</td>
                    {ehGestor && (
                      <td className="dir admin-acoes-col">
                        <button type="button" className="admin-acao" onClick={() => editar(l)}>Editar</button>
                        <button type="button" className="admin-acao" onClick={() => remover(l)}>Excluir</button>
                      </td>
                    )}
                  </tr>
                ))}
                {linhas.length === 0 && (
                  <tr><td colSpan={colSpan} className="admin-vazio">Nenhuma linha cadastrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {form && (
        <Modal titulo={form.id ? "Editar linha" : "Nova linha de crédito"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Nome</span>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} autoFocus />
              </label>
              <label className="campo">
                <span>Programa</span>
                <Select value={form.programa} onChange={(v) => setForm({ ...form, programa: v })} options={opcoes(PROGRAMA_SAFRA)} />
              </label>
              <label className="campo">
                <span>Ano-safra (AAAA/AAAA)</span>
                <input value={form.anoSafra} onChange={(e) => setForm({ ...form, anoSafra: e.target.value })} placeholder="2025/2026" />
              </label>
              <label className="campo">
                <span>Instituição financeira</span>
                <input value={form.instituicaoFinanceira} onChange={(e) => setForm({ ...form, instituicaoFinanceira: e.target.value })} />
              </label>
              <label className="campo">
                <span>Taxa de juros a.a. (fração, ex.: 0.08)</span>
                <input type="number" step="0.0001" required value={form.taxaJurosAa} onChange={(e) => setForm({ ...form, taxaJurosAa: e.target.value })} />
              </label>
              <label className="campo">
                <span>Teto de financiamento (R$)</span>
                <input type="number" step="0.01" value={form.tetoFinanciamento} onChange={(e) => setForm({ ...form, tetoFinanciamento: e.target.value })} />
              </label>
              <label className="campo">
                <span>Prazo (meses)</span>
                <input type="number" value={form.prazoMeses} onChange={(e) => setForm({ ...form, prazoMeses: e.target.value })} />
              </label>
              <label className="campo">
                <span>Carência (meses)</span>
                <input type="number" value={form.carenciaMeses} onChange={(e) => setForm({ ...form, carenciaMeses: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fator redução tCO₂e/ha</span>
                <input type="number" step="0.0001" value={form.fatorReducaoTco2eHa} onChange={(e) => setForm({ ...form, fatorReducaoTco2eHa: e.target.value })} />
              </label>
              <label className="campo campo--check">
                <input type="checkbox" checked={form.exigePraticaCarbono} onChange={(e) => setForm({ ...form, exigePraticaCarbono: e.target.checked })} />
                <span>Exige prática de baixo carbono</span>
              </label>
              <label className="campo campo--check">
                <input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
                <span>Ativa</span>
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
    </>
  );
}
