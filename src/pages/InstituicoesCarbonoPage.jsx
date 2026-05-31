import { useEffect, useState } from "react";
import { Plus, Link2 } from "lucide-react";
import {
  listarInstituicoes,
  criarInstituicao,
  atualizarInstituicao,
  deletarInstituicao,
  matchCompradores,
} from "../services/instituicoesCarbono";
import { listarCreditos } from "../services/creditosCarbono";
import { getMunicipios } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import Modal from "../components/Modal";
import Select from "../components/Select";
import { numero } from "../utils/format";
import { opcoes, rotulo, INSTITUICAO_TIPO, PADRAO_CERTIFICACAO } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

const vazio = {
  nome: "",
  tipo: "COMPRADORA",
  padraoCertificacao: "",
  pais: "Brasil",
  precoReferenciaTonelada: "",
  moeda: "BRL",
  siteUrl: "",
  apiUrl: "",
  contatoEmail: "",
  compraJredd: false,
  ativo: true,
  observacoes: "",
};

export default function InstituicoesCarbonoPage() {
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const toast = useToast();
  const confirmar = useConfirm();

  const [lista, setLista] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // matching
  const [creditos, setCreditos] = useState([]);
  const [nomes, setNomes] = useState(new Map());
  const [match, setMatch] = useState(null);

  async function recarregar() {
    try {
      setLista(await listarInstituicoes({ tipo: filtroTipo || undefined, somenteAtivas: false }));
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    listarInstituicoes({ tipo: filtroTipo || undefined, somenteAtivas: false })
      .then(setLista)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroTipo]);

  useEffect(() => {
    listarCreditos().then(setCreditos).catch(() => {});
    getMunicipios()
      .then((ms) => setNomes(new Map(ms.map((m) => [String(m.apiId), m.nome]))))
      .catch(() => {});
  }, []);

  const nomeMun = (id) => nomes.get(String(id)) || `#${id}`;

  function novo() {
    setForm({ ...vazio });
  }
  function editar(i) {
    setForm({ ...i, padraoCertificacao: i.padraoCertificacao || "" });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!form.nome.trim()) {
      toast.info("Informe o nome da instituição.");
      return;
    }
    const dto = {
      ...form,
      padraoCertificacao: form.padraoCertificacao || null,
      precoReferenciaTonelada:
        form.precoReferenciaTonelada === "" ? null : Number(form.precoReferenciaTonelada),
      siteUrl: form.siteUrl || null,
      apiUrl: form.apiUrl || null,
      contatoEmail: form.contatoEmail || null,
      observacoes: form.observacoes || null,
    };
    setSalvando(true);
    try {
      if (form.id) {
        await atualizarInstituicao(form.id, dto);
        toast.sucesso("Instituição atualizada.");
      } else {
        await criarInstituicao(dto);
        toast.sucesso("Instituição cadastrada.");
      }
      setForm(null);
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function remover(i) {
    const ok = await confirmar({
      titulo: "Excluir instituição?",
      mensagem: `${i.nome} será removida.`,
      confirmar: "Excluir",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await deletarInstituicao(i.id);
      toast.sucesso("Instituição excluída.");
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function rodarMatch(creditoId) {
    if (!creditoId) return;
    try {
      const r = await matchCompradores(creditoId);
      setMatch(r);
    } catch (err) {
      toast.erro(err.message);
    }
  }

  const colSpan = ehGestor ? 6 : 5;

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Instituições de carbono</h1>
          <p>Certificadoras, compradoras e marketplaces do mercado de crédito</p>
        </div>
        {ehGestor && (
          <button type="button" className="admin-novo" onClick={novo}>
            <Plus size={17} strokeWidth={1.75} /> Nova instituição
          </button>
        )}
      </header>

      <section className="card">
        <div className="painel-toolbar">
          <label className="campo">
            <span>Filtrar por tipo</span>
            <Select
              value={filtroTipo}
              onChange={setFiltroTipo}
              placeholder="Todos os tipos"
              options={[{ value: "", label: "Todos os tipos" }, ...opcoes(INSTITUICAO_TIPO)]}
            />
          </label>
        </div>

        {carregando ? (
          <p className="estado">Carregando…</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Padrão</th>
                  <th className="dir">Preço ref./t</th>
                  <th>JREDD+</th>
                  {ehGestor && <th className="dir">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {lista.map((i) => (
                  <tr key={i.id}>
                    <td className="admin-nome">
                      {i.nome}
                      {i.ativo === false && <span className="selo selo--vermelho" style={{ marginLeft: 8 }}>inativa</span>}
                    </td>
                    <td>{rotulo(INSTITUICAO_TIPO, i.tipo)}</td>
                    <td className="admin-mut">{i.padraoCertificacao ? rotulo(PADRAO_CERTIFICACAO, i.padraoCertificacao) : "N/D"}</td>
                    <td className="dir">
                      {i.precoReferenciaTonelada == null ? "N/D" : `${numero(i.precoReferenciaTonelada, 2)} ${i.moeda || ""}`}
                    </td>
                    <td>{i.compraJredd ? <span className="tag tag--verde">sim</span> : <span className="tag tag--cinza">não</span>}</td>
                    {ehGestor && (
                      <td className="dir admin-acoes-col">
                        <button type="button" className="admin-acao" onClick={() => editar(i)}>Editar</button>
                        <button type="button" className="admin-acao" onClick={() => remover(i)}>Excluir</button>
                      </td>
                    )}
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr><td colSpan={colSpan} className="admin-vazio">Nenhuma instituição encontrada.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="grafico-titulo"><Link2 size={17} /> Matching de compradores</h2>
        <div className="painel-toolbar">
          <label className="campo">
            <span>Crédito de carbono</span>
            <Select
              value={match?.creditoId ?? ""}
              onChange={rodarMatch}
              placeholder="Selecione um crédito…"
              options={creditos.map((c) => ({
                value: c.id,
                label: `${nomeMun(c.municipioId)} · ${c.anoBase} · ${numero(c.metaTco2eAno)} tCO₂e/ano`,
              }))}
            />
          </label>
        </div>

        {match && (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Instituição</th>
                  <th>Tipo</th>
                  <th>Padrão</th>
                  <th className="dir">Preço/t</th>
                  <th className="dir">Receita estimada</th>
                </tr>
              </thead>
              <tbody>
                {(match.compradores || []).map((c) => (
                  <tr key={c.instituicaoId}>
                    <td className="admin-nome">{c.nome}</td>
                    <td className="admin-mut">{rotulo(INSTITUICAO_TIPO, c.tipo)}</td>
                    <td className="admin-mut">{c.padraoCertificacao ? rotulo(PADRAO_CERTIFICACAO, c.padraoCertificacao) : "N/D"}</td>
                    <td className="dir">{numero(c.precoTonelada, 2)} {c.moeda}</td>
                    <td className="dir">{numero(c.receitaEstimada, 2)} {c.moeda}</td>
                  </tr>
                ))}
                {(match.compradores || []).length === 0 && (
                  <tr><td colSpan={5} className="admin-vazio">Nenhum comprador compatível.</td></tr>
                )}
              </tbody>
            </table>
            <p className="painel-meta">
              Total projetado do crédito: {numero(match.tco2eTotal)} tCO₂e · algoritmo {match.versaoAlgoritmo}
            </p>
          </div>
        )}
      </section>

      {form && (
        <Modal titulo={form.id ? "Editar instituição" : "Nova instituição"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Nome</span>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} autoFocus />
              </label>
              <label className="campo">
                <span>Tipo</span>
                <Select value={form.tipo} onChange={(v) => setForm({ ...form, tipo: v })} options={opcoes(INSTITUICAO_TIPO)} />
              </label>
              <label className="campo">
                <span>Padrão de certificação</span>
                <Select
                  value={form.padraoCertificacao}
                  onChange={(v) => setForm({ ...form, padraoCertificacao: v })}
                  placeholder="Nenhum"
                  options={[{ value: "", label: "Nenhum" }, ...opcoes(PADRAO_CERTIFICACAO)]}
                />
              </label>
              <label className="campo">
                <span>País</span>
                <input value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} />
              </label>
              <label className="campo">
                <span>Preço ref./tonelada</span>
                <input type="number" step="0.01" value={form.precoReferenciaTonelada} onChange={(e) => setForm({ ...form, precoReferenciaTonelada: e.target.value })} />
              </label>
              <label className="campo">
                <span>Moeda (3 letras)</span>
                <input maxLength={3} value={form.moeda} onChange={(e) => setForm({ ...form, moeda: e.target.value.toUpperCase() })} />
              </label>
              <label className="campo">
                <span>E-mail de contato</span>
                <input type="email" value={form.contatoEmail} onChange={(e) => setForm({ ...form, contatoEmail: e.target.value })} />
              </label>
              <label className="campo">
                <span>Site</span>
                <input value={form.siteUrl} onChange={(e) => setForm({ ...form, siteUrl: e.target.value })} />
              </label>
              <label className="campo">
                <span>API URL</span>
                <input value={form.apiUrl} onChange={(e) => setForm({ ...form, apiUrl: e.target.value })} />
              </label>
              <label className="campo campo--check">
                <input type="checkbox" checked={form.compraJredd} onChange={(e) => setForm({ ...form, compraJredd: e.target.checked })} />
                <span>Compra crédito JREDD+</span>
              </label>
              <label className="campo campo--check">
                <input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} />
                <span>Ativa</span>
              </label>
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Observações</span>
                <input value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} />
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
