import { useEffect, useState, useMemo } from "react";
import { Plus, LineChart, Leaf, Server, DollarSign } from "lucide-react";
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
import { moeda, numero, pct, temValor } from "../utils/format";
import { opcoes, rotulo, CREDITO_STATUS } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

// Créditos de carbono — GET/POST/PUT/DELETE /api/v1/creditos-carbono
// Projeção usa ProjecaoCarbonoDTO v2: preços em USD + BRL, cotação e gráfico.

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

const COR_STATUS = {
  CONCLUIDO:    "selo--verde",
  EM_ANDAMENTO: "selo--amarelo",
  CANCELADO:    "selo--vermelho",
};

function corStatus(status) {
  return COR_STATUS[status] || "selo--neutro";
}

function validarForm(f, municipioId) {
  const erros = {};
  if (!municipioId) erros.municipioId = "Selecione um município";
  if (!f.metaTco2eAno || Number(f.metaTco2eAno) <= 0)
    erros.metaTco2eAno = "Deve ser maior que zero";
  if (!f.precoTonelada || Number(f.precoTonelada) <= 0)
    erros.precoTonelada = "Deve ser maior que zero";
  if (f.taxaCrescimentoPreco !== "" && f.taxaCrescimentoPreco != null &&
      (Number(f.taxaCrescimentoPreco) < 0 || Number(f.taxaCrescimentoPreco) > 1))
    erros.taxaCrescimentoPreco = "Valor entre 0 e 1 (ex: 0.05 = 5% a.a.)";
  if (f.percentualCumprimentoMeta !== "" && f.percentualCumprimentoMeta != null &&
      (Number(f.percentualCumprimentoMeta) < 0 || Number(f.percentualCumprimentoMeta) > 100))
    erros.percentualCumprimentoMeta = "Valor entre 0 e 100";
  if (!f.horizonteAnos || Number(f.horizonteAnos) < 1 || Number(f.horizonteAnos) > 50)
    erros.horizonteAnos = "Entre 1 e 50 anos";
  return erros;
}

export default function CreditosCarbonoPage() {
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const toast = useToast();
  const confirmar = useConfirm();

  const [lista, setLista] = useState([]);
  const [nomes, setNomes] = useState(new Map());
  const [carregando, setCarregando] = useState(true);
  const [erroCarregar, setErroCarregar] = useState(null);

  const [form, setForm] = useState(null);
  const [municipioForm, setMunicipioForm] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [errosForm, setErrosForm] = useState({});

  const [projecao, setProjecao] = useState(null);
  const [carregandoProj, setCarregandoProj] = useState(false);
  // data de referência para cotação USD→BRL na projeção
  const [dataCotacao, setDataCotacao] = useState("");

  const resumo = useMemo(() => {
    if (!lista.length) return null;
    const comPreco = lista.filter((c) => temValor(c.precoTonelada));
    return {
      total: lista.length,
      tco2eTotal: lista.reduce(
        (s, c) => s + (temValor(c.metaTco2eAno) ? Number(c.metaTco2eAno) : 0), 0
      ),
      precoMedio: comPreco.length
        ? comPreco.reduce((s, c) => s + Number(c.precoTonelada), 0) / comPreco.length
        : null,
    };
  }, [lista]);

  async function recarregar() {
    setErroCarregar(null);
    try {
      setLista(await listarCreditos());
    } catch (err) {
      setErroCarregar(err.message);
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    getMunicipios()
      .then((ms) => setNomes(new Map(ms.map((m) => [String(m.apiId), m.nome]))))
      .catch(() => {});
    recarregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nomeMun = (id) => nomes.get(String(id)) || `#${id}`;

  function novo() {
    setMunicipioForm(null);
    setErrosForm({});
    setForm({ ...vazio });
  }

  function editar(c) {
    setMunicipioForm({ apiId: c.municipioId });
    setErrosForm({});
    setForm({ ...c });
  }

  async function salvar(e) {
    e.preventDefault();
    const municipioId = municipioForm?.apiId ?? form.municipioId;
    const erros = validarForm(form, municipioId);
    if (Object.keys(erros).length) {
      setErrosForm(erros);
      toast.info("Corrija os campos destacados.");
      return;
    }
    setErrosForm({});
    const dto = {
      municipioId,
      anoBase: Number(form.anoBase),
      metaTco2eAno: Number(form.metaTco2eAno),
      precoTonelada: Number(form.precoTonelada),
      taxaCrescimentoPreco:
        form.taxaCrescimentoPreco === "" || form.taxaCrescimentoPreco == null
          ? null : Number(form.taxaCrescimentoPreco),
      percentualCumprimentoMeta:
        form.percentualCumprimentoMeta === "" || form.percentualCumprimentoMeta == null
          ? null : Number(form.percentualCumprimentoMeta),
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
      mensagem: `O crédito de ${nomeMun(c.municipioId)} (${c.anoBase}) será removido permanentemente.`,
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
    setCarregandoProj(true);
    try {
      const p = await projecaoCredito(c.id, dataCotacao || undefined);
      setProjecao({ ...p, _nome: nomeMun(c.municipioId), _anoBase: c.anoBase });
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregandoProj(false);
    }
  }

  const colSpan = ehGestor ? 8 : 7;

  return (
    <div className="section-gap">
      <header className="page-header admin-header">
        <div>
          <h1>Créditos de carbono</h1>
          <p>Metas de tCO₂e/ano por município e projeção financeira JREDD+</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <label className="campo estreito" style={{ margin: 0 }}>
            <span>Data cotação USD</span>
            <input
              type="date"
              value={dataCotacao}
              onChange={(e) => setDataCotacao(e.target.value)}
              title="Data para conversão USD→BRL na projeção"
            />
          </label>
          {ehGestor && (
            <button type="button" className="admin-novo" onClick={novo}>
              <Plus size={16} strokeWidth={2} /> Novo crédito
            </button>
          )}
        </div>
      </header>

      {/* Card contextual */}
      <section className="card info-card">
        <div className="info-card-header">
          <Leaf size={18} color="var(--azul)" />
          <h2>O que são Créditos de Carbono no YBY?</h2>
        </div>
        <p className="info-card-body">
          Créditos de carbono representam reduções verificadas de emissões (tCO₂e) pelo
          mecanismo <strong>JREDD+</strong>. Cada registro define a{" "}
          <strong>meta anual de tCO₂e</strong>, o <strong>preço por tonelada em USD</strong>{" "}
          (padrão do mercado voluntário global) e o <strong>horizonte de projeção</strong>.
          O YBY converte os valores para R$ usando a cotação USD/BRL da data informada.
        </p>
        <div className="info-card-api">
          <Server size={11} />
          YBY-API · /api/v1/creditos-carbono
        </div>
      </section>

      {/* KPIs resumo */}
      {resumo && (
        <section className="card">
          <div className="kpi-grid">
            <div className="kpi-box kpi-box--azul">
              <span className="kpi-rotulo">Créditos cadastrados</span>
              <span className="kpi-valor">{numero(resumo.total)}</span>
            </div>
            <div className="kpi-box kpi-box--verde">
              <span className="kpi-rotulo">Meta tCO₂e/ano total</span>
              <span className="kpi-valor">{numero(resumo.tco2eTotal)}</span>
              <span className="kpi-sub">soma de todas as metas</span>
            </div>
            <div className="kpi-box kpi-box--amarelo">
              <span className="kpi-rotulo">Preço médio/tonelada (R$)</span>
              <span className="kpi-valor">{moeda(resumo.precoMedio)}</span>
              <span className="kpi-sub">média dos créditos</span>
            </div>
          </div>
        </section>
      )}

      {/* Tabela */}
      <section className="card">
        {carregando ? (
          <p className="estado">Carregando…</p>
        ) : erroCarregar ? (
          <p className="painel-vazio">Erro: {erroCarregar}</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Município</th>
                  <th>Ano base</th>
                  <th className="dir">Meta tCO₂e/ano</th>
                  <th className="dir">Preço/t (R$)</th>
                  <th className="dir">% Meta</th>
                  <th>Horizonte</th>
                  <th>Status</th>
                  <th className="dir">Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((c) => (
                  <tr key={c.id}>
                    <td className="admin-nome">{nomeMun(c.municipioId)}</td>
                    <td>{c.anoBase}</td>
                    <td className="dir">{numero(c.metaTco2eAno)}</td>
                    <td className="dir">{moeda(c.precoTonelada)}</td>
                    <td className="dir">
                      {temValor(c.percentualCumprimentoMeta) ? pct(c.percentualCumprimentoMeta) : "N/D"}
                    </td>
                    <td>{c.horizonteAnos} anos</td>
                    <td>
                      <span className={`selo ${corStatus(c.status)}`}>
                        {rotulo(CREDITO_STATUS, c.status)}
                      </span>
                    </td>
                    <td className="dir admin-acoes-col">
                      <button
                        type="button"
                        className="admin-acao"
                        onClick={() => verProjecao(c)}
                        disabled={carregandoProj}
                      >
                        <LineChart size={13} /> Projeção
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
                  <tr>
                    <td colSpan={colSpan} className="admin-vazio">
                      Nenhum crédito cadastrado.
                      {ehGestor && ' Use "Novo crédito" para registrar o primeiro.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal formulário */}
      {form && (
        <Modal titulo={form.id ? "Editar crédito" : "Novo crédito"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <div className="campo" style={{ gridColumn: "1 / -1" }}>
                <MunicipioSelect value={municipioForm?.apiId} onChange={setMunicipioForm} />
                {errosForm.municipioId && <span className="campo-erro">{errosForm.municipioId}</span>}
              </div>
              <label className="campo">
                <span>Ano base</span>
                <input type="number" min="2000" max="2100" value={form.anoBase}
                  onChange={(e) => setForm({ ...form, anoBase: e.target.value })} />
              </label>
              <label className="campo">
                <span>Meta tCO₂e/ano</span>
                <input type="number" step="0.01" min="0.01" required value={form.metaTco2eAno}
                  onChange={(e) => setForm({ ...form, metaTco2eAno: e.target.value })} />
                {errosForm.metaTco2eAno && <span className="campo-erro">{errosForm.metaTco2eAno}</span>}
              </label>
              <label className="campo">
                <span>Preço por tonelada (R$)</span>
                <input type="number" step="0.01" min="0.01" required value={form.precoTonelada}
                  onChange={(e) => setForm({ ...form, precoTonelada: e.target.value })} />
                {errosForm.precoTonelada && <span className="campo-erro">{errosForm.precoTonelada}</span>}
              </label>
              <label className="campo">
                <span>Taxa cresc. preço a.a. <em style={{ fontStyle: "normal", opacity: 0.6, fontSize: "0.78rem" }}>ex: 0.05 = 5%</em></span>
                <input type="number" step="0.0001" min="0" max="1" placeholder="opcional"
                  value={form.taxaCrescimentoPreco}
                  onChange={(e) => setForm({ ...form, taxaCrescimentoPreco: e.target.value })} />
                {errosForm.taxaCrescimentoPreco && <span className="campo-erro">{errosForm.taxaCrescimentoPreco}</span>}
              </label>
              <label className="campo">
                <span>% cumprimento da meta <em style={{ fontStyle: "normal", opacity: 0.6, fontSize: "0.78rem" }}>0–100</em></span>
                <input type="number" step="0.01" min="0" max="100" placeholder="opcional"
                  value={form.percentualCumprimentoMeta}
                  onChange={(e) => setForm({ ...form, percentualCumprimentoMeta: e.target.value })} />
                {errosForm.percentualCumprimentoMeta && <span className="campo-erro">{errosForm.percentualCumprimentoMeta}</span>}
              </label>
              <label className="campo">
                <span>Horizonte (anos)</span>
                <input type="number" min="1" max="50" value={form.horizonteAnos}
                  onChange={(e) => setForm({ ...form, horizonteAnos: e.target.value })} />
                {errosForm.horizonteAnos && <span className="campo-erro">{errosForm.horizonteAnos}</span>}
              </label>
              <label className="campo">
                <span>Status</span>
                <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}
                  options={opcoes(CREDITO_STATUS)} />
              </label>
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Descrição</span>
                <input placeholder="Observações (opcional)" value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
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

      {/* Modal projeção — ProjecaoCarbonoDTO v2 (USD + BRL) */}
      {projecao && (
        <Modal
          titulo={`Projeção · ${projecao._nome} (base ${projecao._anoBase})`}
          onFechar={() => setProjecao(null)}
        >
          {/* cotação da API */}
          {projecao.cotacao && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#f0fdf4", borderRadius: 8, padding: "8px 12px",
              marginBottom: 14, fontSize: "0.8rem", color: "#1a3a1e",
            }}>
              <DollarSign size={14} color="#1B4A23" />
              Cotação USD/BRL: <strong>R$ {numero(projecao.cotacao.taxaUsdBrl, 4)}</strong>
              <span style={{ opacity: 0.6, marginLeft: 4 }}>
                ({projecao.cotacao.dataReferencia} · {projecao.cotacao.fonte})
              </span>
            </div>
          )}

          {/* KPIs totais */}
          <div className="kpi-grid" style={{ marginBottom: 16 }}>
            <div className="kpi-box">
              <span className="kpi-rotulo">tCO₂e total projetado</span>
              <span className="kpi-valor">{numero(projecao.tco2eTotal)}</span>
            </div>
            <div className="kpi-box">
              <span className="kpi-rotulo">Receita total (R$)</span>
              <span className="kpi-valor">{moeda(projecao.receitaTotalReais)}</span>
              {temValor(projecao.receitaTotalUsd) && (
                <span className="kpi-sub">USD {numero(projecao.receitaTotalUsd, 0)}</span>
              )}
            </div>
          </div>

          {/* Série anual — usa campos renomeados do ProjecaoAnualDTO v2 */}
          {(projecao.itens || []).length > 0 ? (
            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th className="dir">tCO₂e</th>
                    <th className="dir">Preço/t (USD)</th>
                    <th className="dir">Preço/t (R$)</th>
                    <th className="dir">Receita (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {projecao.itens.map((i) => (
                    <tr key={i.ano}>
                      <td>{i.ano}</td>
                      <td className="dir">{numero(i.toneladasProjetadas)}</td>
                      {/* campos renomeados na v2 do backend */}
                      <td className="dir">
                        {temValor(i.precoToneladaAnoUsd)
                          ? `USD ${numero(i.precoToneladaAnoUsd, 2)}`
                          : "N/D"}
                      </td>
                      <td className="dir">
                        {temValor(i.precoToneladaAnoReais)
                          ? moeda(i.precoToneladaAnoReais)
                          : "N/D"}
                      </td>
                      <td className="dir">{moeda(i.receitaProjetadaReais)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="painel-vazio">Sem dados de projeção anual disponíveis.</p>
          )}
        </Modal>
      )}
    </div>
  );
}
