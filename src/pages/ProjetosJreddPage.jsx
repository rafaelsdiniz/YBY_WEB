import { useEffect, useState } from "react";
import { Plus, ListChecks, Trash2 } from "lucide-react";
import {
  listarProjetos,
  criarProjeto,
  atualizarProjeto,
  deletarProjeto,
  adicionarMarco,
  atualizarMarco,
  removerMarco,
  buscarProjeto,
} from "../services/projetos";
import { getMunicipios } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import Modal from "../components/Modal";
import Select from "../components/Select";
import MunicipioSelect from "../components/MunicipioSelect";
import { numero } from "../utils/format";
import { opcoes, rotulo, PROJETO_STATUS, MARCO_STATUS } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

const vazioProjeto = {
  nome: "",
  descricao: "",
  municipioId: null,
  status: "PLANEJADO",
  dataInicio: "",
  dataFimPrevista: "",
  metaTco2e: "",
  orcamentoPrevisto: "",
};

const vazioMarco = {
  titulo: "",
  descricao: "",
  dataPrevista: "",
  dataConclusao: "",
  status: "PENDENTE",
  percentualConclusao: 0,
};

export default function ProjetosJreddPage() {
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const toast = useToast();
  const confirmar = useConfirm();

  const [lista, setLista] = useState([]);
  const [nomes, setNomes] = useState(new Map());
  const [carregando, setCarregando] = useState(true);

  const [form, setForm] = useState(null);
  const [municipioForm, setMunicipioForm] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // gestao de marcos
  const [projetoMarcos, setProjetoMarcos] = useState(null);
  const [marcoForm, setMarcoForm] = useState(null);

  async function recarregar() {
    try {
      setLista(await listarProjetos());
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
    listarProjetos()
      .then(setLista)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nomeMun = (id) => (id == null ? "—" : nomes.get(String(id)) || `#${id}`);

  function novo() {
    setMunicipioForm(null);
    setForm({ ...vazioProjeto });
  }
  function editar(p) {
    setMunicipioForm(p.municipioId ? { apiId: p.municipioId } : null);
    setForm({
      ...p,
      dataInicio: p.dataInicio || "",
      dataFimPrevista: p.dataFimPrevista || "",
      metaTco2e: p.metaTco2e ?? "",
      orcamentoPrevisto: p.orcamentoPrevisto ?? "",
    });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!form.nome.trim()) {
      toast.info("Informe o nome do projeto.");
      return;
    }
    const dto = {
      nome: form.nome.trim(),
      descricao: form.descricao || null,
      municipioId: municipioForm?.apiId ?? form.municipioId ?? null,
      status: form.status,
      dataInicio: form.dataInicio || null,
      dataFimPrevista: form.dataFimPrevista || null,
      metaTco2e: form.metaTco2e === "" ? null : Number(form.metaTco2e),
      orcamentoPrevisto: form.orcamentoPrevisto === "" ? null : Number(form.orcamentoPrevisto),
    };
    setSalvando(true);
    try {
      if (form.id) {
        await atualizarProjeto(form.id, dto);
        toast.sucesso("Projeto atualizado.");
      } else {
        await criarProjeto(dto);
        toast.sucesso("Projeto criado.");
      }
      setForm(null);
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function remover(p) {
    const ok = await confirmar({
      titulo: "Excluir projeto?",
      mensagem: `O projeto "${p.nome}" e seus marcos serão removidos.`,
      confirmar: "Excluir",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await deletarProjeto(p.id);
      toast.sucesso("Projeto excluído.");
      recarregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function abrirMarcos(p) {
    try {
      const completo = await buscarProjeto(p.id);
      setProjetoMarcos(completo);
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function recarregarMarcos(projetoId) {
    const completo = await buscarProjeto(projetoId);
    setProjetoMarcos(completo);
    recarregar();
  }

  async function salvarMarco(e) {
    e.preventDefault();
    if (!marcoForm.titulo.trim()) {
      toast.info("Informe o título do marco.");
      return;
    }
    const dto = {
      titulo: marcoForm.titulo.trim(),
      descricao: marcoForm.descricao || null,
      dataPrevista: marcoForm.dataPrevista || null,
      dataConclusao: marcoForm.dataConclusao || null,
      status: marcoForm.status,
      percentualConclusao: Number(marcoForm.percentualConclusao) || 0,
    };
    try {
      if (marcoForm.id) {
        await atualizarMarco(projetoMarcos.id, marcoForm.id, dto);
        toast.sucesso("Marco atualizado.");
      } else {
        await adicionarMarco(projetoMarcos.id, dto);
        toast.sucesso("Marco adicionado.");
      }
      setMarcoForm(null);
      recarregarMarcos(projetoMarcos.id);
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function removerMarcoEtapa(m) {
    const ok = await confirmar({
      titulo: "Remover marco?",
      mensagem: `"${m.titulo}" será removido do projeto.`,
      confirmar: "Remover",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await removerMarco(projetoMarcos.id, m.id);
      toast.sucesso("Marco removido.");
      recarregarMarcos(projetoMarcos.id);
    } catch (err) {
      toast.erro(err.message);
    }
  }

  const colSpan = ehGestor ? 6 : 5;

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Projetos JREDD+</h1>
          <p>Projetos de redução de emissões com metas, orçamento e marcos</p>
        </div>
        {ehGestor && (
          <button type="button" className="admin-novo" onClick={novo}>
            <Plus size={17} strokeWidth={1.75} /> Novo projeto
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
                  <th>Projeto</th>
                  <th>Município</th>
                  <th>Status</th>
                  <th className="dir">Meta tCO₂e</th>
                  <th className="dir">Conclusão</th>
                  {ehGestor && <th className="dir">Ações</th>}
                </tr>
              </thead>
              <tbody>
                {lista.map((p) => (
                  <tr key={p.id}>
                    <td className="admin-nome">{p.nome}</td>
                    <td className="admin-mut">{nomeMun(p.municipioId)}</td>
                    <td><span className="selo selo--neutro">{rotulo(PROJETO_STATUS, p.status)}</span></td>
                    <td className="dir">{numero(p.metaTco2e)}</td>
                    <td className="dir">{p.percentualConclusaoMedio ?? 0}%</td>
                    <td className="dir admin-acoes-col">
                      <button type="button" className="admin-acao" onClick={() => abrirMarcos(p)}>
                        <ListChecks size={14} /> Marcos
                      </button>
                      {ehGestor && (
                        <>
                          <button type="button" className="admin-acao" onClick={() => editar(p)}>Editar</button>
                          <button type="button" className="admin-acao" onClick={() => remover(p)}>Excluir</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr><td colSpan={colSpan} className="admin-vazio">Nenhum projeto cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {form && (
        <Modal titulo={form.id ? "Editar projeto" : "Novo projeto"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <label className="campo" style={{ gridColumn: "1 / -1" }}>
                <span>Nome</span>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} autoFocus />
              </label>
              <MunicipioSelect value={municipioForm?.apiId} onChange={setMunicipioForm} />
              <label className="campo">
                <span>Status</span>
                <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={opcoes(PROJETO_STATUS)} />
              </label>
              <label className="campo">
                <span>Data de início</span>
                <input type="date" value={form.dataInicio} onChange={(e) => setForm({ ...form, dataInicio: e.target.value })} />
              </label>
              <label className="campo">
                <span>Data fim prevista</span>
                <input type="date" value={form.dataFimPrevista} onChange={(e) => setForm({ ...form, dataFimPrevista: e.target.value })} />
              </label>
              <label className="campo">
                <span>Meta tCO₂e</span>
                <input type="number" step="0.01" value={form.metaTco2e} onChange={(e) => setForm({ ...form, metaTco2e: e.target.value })} />
              </label>
              <label className="campo">
                <span>Orçamento previsto (R$)</span>
                <input type="number" step="0.01" value={form.orcamentoPrevisto} onChange={(e) => setForm({ ...form, orcamentoPrevisto: e.target.value })} />
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

      {projetoMarcos && (
        <Modal titulo={`Marcos · ${projetoMarcos.nome}`} onFechar={() => { setProjetoMarcos(null); setMarcoForm(null); }}>
          {ehGestor && !marcoForm && (
            <button type="button" className="painel-acao" style={{ marginBottom: 14 }} onClick={() => setMarcoForm({ ...vazioMarco })}>
              <Plus size={15} /> Adicionar marco
            </button>
          )}

          {marcoForm ? (
            <form onSubmit={salvarMarco}>
              <div className="form-grid">
                <label className="campo" style={{ gridColumn: "1 / -1" }}>
                  <span>Título</span>
                  <input value={marcoForm.titulo} onChange={(e) => setMarcoForm({ ...marcoForm, titulo: e.target.value })} autoFocus />
                </label>
                <label className="campo">
                  <span>Data prevista</span>
                  <input type="date" value={marcoForm.dataPrevista} onChange={(e) => setMarcoForm({ ...marcoForm, dataPrevista: e.target.value })} />
                </label>
                <label className="campo">
                  <span>Data conclusão</span>
                  <input type="date" value={marcoForm.dataConclusao} onChange={(e) => setMarcoForm({ ...marcoForm, dataConclusao: e.target.value })} />
                </label>
                <label className="campo">
                  <span>Status</span>
                  <Select value={marcoForm.status} onChange={(v) => setMarcoForm({ ...marcoForm, status: v })} options={opcoes(MARCO_STATUS)} />
                </label>
                <label className="campo">
                  <span>% conclusão</span>
                  <input type="number" min="0" max="100" value={marcoForm.percentualConclusao} onChange={(e) => setMarcoForm({ ...marcoForm, percentualConclusao: e.target.value })} />
                </label>
                <label className="campo" style={{ gridColumn: "1 / -1" }}>
                  <span>Descrição</span>
                  <input value={marcoForm.descricao} onChange={(e) => setMarcoForm({ ...marcoForm, descricao: e.target.value })} />
                </label>
              </div>
              <div className="modal-acoes">
                <button type="button" className="modal-btn modal-btn--cancelar" onClick={() => setMarcoForm(null)}>Cancelar</button>
                <button type="submit" className="modal-btn modal-btn--salvar">Salvar marco</button>
              </div>
            </form>
          ) : (
            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Marco</th>
                    <th>Status</th>
                    <th className="dir">%</th>
                    {ehGestor && <th className="dir">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {(projetoMarcos.marcos || []).map((m) => (
                    <tr key={m.id}>
                      <td className="admin-nome">{m.titulo}</td>
                      <td><span className="selo selo--neutro">{rotulo(MARCO_STATUS, m.status)}</span></td>
                      <td className="dir">{m.percentualConclusao ?? 0}%</td>
                      {ehGestor && (
                        <td className="dir admin-acoes-col">
                          <button type="button" className="admin-acao" onClick={() => setMarcoForm({ ...m, dataPrevista: m.dataPrevista || "", dataConclusao: m.dataConclusao || "" })}>Editar</button>
                          <button type="button" className="admin-acao" onClick={() => removerMarcoEtapa(m)}><Trash2 size={14} /></button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {(projetoMarcos.marcos || []).length === 0 && (
                    <tr><td colSpan={ehGestor ? 4 : 3} className="admin-vazio">Nenhum marco cadastrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
