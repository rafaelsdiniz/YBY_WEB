import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Plus } from "lucide-react";
import {
  getMunicipios,
  criarMunicipio,
  atualizarMunicipio,
  deletarMunicipio,
} from "../services/api";
import { sincronizarMunicipiosIbge } from "../services/admin";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import SemaforoBadge from "../components/SemaforoBadge";
import Modal from "../components/Modal";
import "./MunicipiosPage.css";
import "./Paineis.css";

const norm = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const COLUNAS = [
  { chave: "nome", rotulo: "Município", num: false },
  { chave: "prioridade", rotulo: "Prioridade", num: true },
  { chave: "notaRisco", rotulo: "Risco", num: true },
  { chave: "retornoPorReal", rotulo: "Retorno/R$", num: true },
  { chave: "conformidade", rotulo: "Conformidade", num: true },
];

const FORM_VAZIO = { nome: "", codigoIbge: "", areaHa: "", scorePrioridade: "", semaforo: "VERDE" };

export default function MunicipiosPage() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const toast = useToast();
  const confirmar = useConfirm();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState({ campo: "prioridade", dir: "desc" });

  const [form, setForm] = useState(null); // { ...campos, apiId? }
  const [erroForm, setErroForm] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sincronizando, setSincronizando] = useState(false);

  function carregar() {
    setCarregando(true);
    getMunicipios()
      .then(setMunicipios)
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
  }

  // carga inicial (sem setState sincrono dentro do effect)
  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .catch(() => {})
      .finally(() => setCarregando(false));
  }, []);

  const lista = useMemo(() => {
    const filtrados = municipios.filter((m) => norm(m.nome).includes(norm(busca)));
    const { campo, dir } = ordem;
    const fator = dir === "asc" ? 1 : -1;
    return [...filtrados].sort((a, b) => {
      if (campo === "nome") return a.nome.localeCompare(b.nome) * fator;
      return (a[campo] - b[campo]) * fator;
    });
  }, [municipios, busca, ordem]);

  function ordenarPor(campo) {
    setOrdem((o) =>
      o.campo === campo
        ? { campo, dir: o.dir === "asc" ? "desc" : "asc" }
        : { campo, dir: campo === "nome" ? "asc" : "desc" }
    );
  }

  function abrirNoPainel(id) {
    navigate("/painel", { state: { municipioId: id } });
  }

  function novo() {
    setErroForm("");
    setForm({ ...FORM_VAZIO });
  }

  function editar(e, m) {
    e.stopPropagation();
    setErroForm("");
    setForm({
      apiId: m.apiId,
      nome: m.nome,
      codigoIbge: m.codigoIbge,
      areaHa: m.areaHa || "",
      scorePrioridade: m.prioridade ?? "",
      semaforo: m.semaforo || "VERDE",
    });
  }

  async function salvar(e) {
    e.preventDefault();
    const nome = form.nome.trim();
    const codigoIbge = form.codigoIbge.trim();
    if (!nome || !/^\d{7}$/.test(codigoIbge)) {
      setErroForm("Informe nome e código IBGE de 7 dígitos.");
      return;
    }
    setSalvando(true);
    try {
      const payload = {
        nome,
        codigoIbge,
        areaHa: form.areaHa === "" ? null : Number(form.areaHa),
        scorePrioridade: form.scorePrioridade === "" ? null : Number(form.scorePrioridade),
        semaforo: form.semaforo,
      };
      if (form.apiId) {
        await atualizarMunicipio(form.apiId, payload);
        toast.sucesso("Município atualizado.");
      } else {
        await criarMunicipio(payload);
        toast.sucesso("Município criado.");
      }
      setForm(null);
      carregar();
    } catch (err) {
      setErroForm(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(e, m) {
    e.stopPropagation();
    const ok = await confirmar({
      titulo: "Excluir município?",
      mensagem: `${m.nome} será removido da base.`,
      confirmar: "Excluir",
      tipo: "perigo",
    });
    if (!ok) return;
    try {
      await deletarMunicipio(m.apiId);
      toast.sucesso(`${m.nome} excluído.`);
      carregar();
    } catch (err) {
      toast.erro(err.message);
    }
  }

  async function sincronizar() {
    setSincronizando(true);
    try {
      const r = await sincronizarMunicipiosIbge("TO");
      toast.sucesso(`Sincronização concluída (${r.registrosInseridos ?? r.totalProcessados ?? "ok"}).`);
      carregar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSincronizando(false);
    }
  }

  if (carregando) {
    return <p className="estado">Carregando municípios...</p>;
  }

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Municípios</h1>
          <p>{municipios.length} municípios na base — clique para abrir no painel</p>
        </div>
        {ehGestor && (
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="painel-acao secundario" onClick={sincronizar} disabled={sincronizando}>
              <RefreshCw size={16} /> {sincronizando ? "Sincronizando…" : "Sincronizar IBGE"}
            </button>
            <button type="button" className="painel-acao" onClick={novo}>
              <Plus size={16} /> Novo município
            </button>
          </div>
        )}
      </header>

      <div className="card">
        <input
          className="mun-busca"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar município..."
        />

        <div className="mun-tabela-wrap">
          <table className="mun-tabela">
            <thead>
              <tr>
                {COLUNAS.map((c) => {
                  const ativo = ordem.campo === c.chave;
                  return (
                    <th
                      key={c.chave}
                      className={c.num ? "num" : ""}
                      aria-sort={ativo ? (ordem.dir === "asc" ? "ascending" : "descending") : "none"}
                    >
                      <button type="button" onClick={() => ordenarPor(c.chave)}>
                        {c.rotulo}
                        <span className="mun-seta">{ativo ? (ordem.dir === "asc" ? "▲" : "▼") : ""}</span>
                      </button>
                    </th>
                  );
                })}
                <th>Situação</th>
                {ehGestor && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {lista.map((m) => (
                <tr key={m.id} onClick={() => abrirNoPainel(m.id)}>
                  <td className="mun-nome">{m.nome}</td>
                  <td className="num">{m.prioridade}</td>
                  <td className="num">{m.notaRisco}</td>
                  <td className="num">{m.retornoPorReal.toFixed(1)}</td>
                  <td className="num">{m.conformidade}%</td>
                  <td><SemaforoBadge semaforo={m.semaforo} /></td>
                  {ehGestor && (
                    <td className="admin-acoes-col">
                      <button type="button" className="admin-acao" onClick={(e) => editar(e, m)}>Editar</button>
                      <button type="button" className="admin-acao" onClick={(e) => excluir(e, m)}>Excluir</button>
                    </td>
                  )}
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td colSpan={ehGestor ? 7 : 6} className="mun-vazio">
                    Nenhum município encontrado para "{busca}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {form && (
        <Modal titulo={form.apiId ? "Editar município" : "Novo município"} onFechar={() => setForm(null)}>
          <form onSubmit={salvar}>
            {erroForm && <div className="modal-erro">{erroForm}</div>}
            <label className="campo">
              <span>Nome</span>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} autoFocus />
            </label>
            <label className="campo">
              <span>Código IBGE (7 dígitos)</span>
              <input value={form.codigoIbge} onChange={(e) => setForm({ ...form, codigoIbge: e.target.value })} placeholder="1721000" />
            </label>
            <label className="campo">
              <span>Área (ha)</span>
              <input type="number" step="0.01" value={form.areaHa} onChange={(e) => setForm({ ...form, areaHa: e.target.value })} />
            </label>
            <label className="campo">
              <span>Score de prioridade (0–100)</span>
              <input type="number" step="0.01" min="0" max="100" value={form.scorePrioridade} onChange={(e) => setForm({ ...form, scorePrioridade: e.target.value })} />
            </label>
            <label className="campo">
              <span>Semáforo</span>
              <select value={form.semaforo} onChange={(e) => setForm({ ...form, semaforo: e.target.value })}>
                <option value="VERDE">Verde</option>
                <option value="AMARELO">Amarelo</option>
                <option value="VERMELHO">Vermelho</option>
              </select>
            </label>
            <div className="modal-acoes">
              <button type="button" className="modal-btn modal-btn--cancelar" onClick={() => setForm(null)}>Cancelar</button>
              <button type="submit" className="modal-btn modal-btn--salvar" disabled={salvando}>
                {salvando ? "Salvando…" : form.apiId ? "Salvar" : "Criar município"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
