import { useState } from "react";
import { Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import MunicipioSelect from "../components/MunicipioSelect";
import { historicoMenores, baixarRelatorioPdf, registrarEmissao, sincronizarEmissoes } from "../services/carbono";
import "./AdminTabela.css";
import "./Paineis.css";

const num = (v) => (v == null ? 0 : Number(v));
const fmt = (v) => num(v).toLocaleString("pt-BR", { maximumFractionDigits: 2 });

export default function CarbonoPage() {
  const { usuario } = useAuth();
  const toast = useToast();
  const ehGestor = usuario?.perfil === "GESTOR";

  const [filtro, setFiltro] = useState({ dataInicio: "", dataFim: "", limite: 20 });
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [baixando, setBaixando] = useState(false);

  const [form, setForm] = useState(null);
  const [municipioForm, setMunicipioForm] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [sincronizando, setSincronizando] = useState(false);

  async function sincronizar() {
    const anoPadrao = new Date().getFullYear() - 1;
    const ano = Number(window.prompt("Ano para (re)gerar a série SEEG de emissões:", anoPadrao));
    if (!ano) return;
    setSincronizando(true);
    try {
      const r = await sincronizarEmissoes(ano);
      toast.sucesso(`Emissões sincronizadas: ${r.inseridos} municípios (${ano}).`);
      await consultar();
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setSincronizando(false);
    }
  }

  async function consultar() {
    setCarregando(true);
    try {
      setLista(await historicoMenores(filtro));
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function baixarPdf() {
    setBaixando(true);
    try {
      await baixarRelatorioPdf(filtro);
      toast.sucesso("Relatório PDF gerado.");
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setBaixando(false);
    }
  }

  function novoRegistro() {
    setMunicipioForm(null);
    setForm({
      dataReferencia: new Date().toISOString().slice(0, 10),
      emissaoTco2e: "",
      fonte: "SEEG",
      observacao: "",
    });
  }

  async function salvar(e) {
    e.preventDefault();
    if (!municipioForm) {
      toast.info("Selecione um município.");
      return;
    }
    setSalvando(true);
    try {
      await registrarEmissao({
        municipioId: municipioForm.apiId,
        dataReferencia: form.dataReferencia,
        emissaoTco2e: Number(form.emissaoTco2e),
        fonte: form.fonte,
        observacao: form.observacao || null,
      });
      toast.sucesso("Emissão registrada.");
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
          <h1>Emissões de carbono</h1>
          <p>Municípios com menores emissões (tCO₂e) e relatório oficial</p>
        </div>
        {ehGestor && (
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="painel-acao secundario" onClick={sincronizar} disabled={sincronizando}>
              {sincronizando ? "Sincronizando…" : "Sincronizar SEEG"}
            </button>
            <button type="button" className="painel-acao" onClick={novoRegistro}>
              Registrar emissão
            </button>
          </div>
        )}
      </header>

      <section className="card">
        <div className="painel-toolbar">
          <label className="campo estreito">
            <span>Data início</span>
            <input type="date" value={filtro.dataInicio} onChange={(e) => setFiltro({ ...filtro, dataInicio: e.target.value })} />
          </label>
          <label className="campo estreito">
            <span>Data fim</span>
            <input type="date" value={filtro.dataFim} onChange={(e) => setFiltro({ ...filtro, dataFim: e.target.value })} />
          </label>
          <label className="campo estreito">
            <span>Limite</span>
            <input type="number" value={filtro.limite} onChange={(e) => setFiltro({ ...filtro, limite: +e.target.value })} />
          </label>
          <button type="button" className="painel-acao" onClick={consultar} disabled={carregando}>
            {carregando ? "Consultando…" : "Consultar"}
          </button>
          <button type="button" className="painel-acao secundario" onClick={baixarPdf} disabled={baixando}>
            <Download size={16} strokeWidth={1.75} /> {baixando ? "Gerando…" : "Baixar PDF"}
          </button>
        </div>

        <div className="admin-tabela-wrap">
          <table className="admin-tabela">
            <thead>
              <tr>
                <th>Município</th>
                <th>IBGE</th>
                <th className="dir">Emissão total (tCO₂e)</th>
                <th className="dir">Média diária</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((c) => (
                <tr key={c.municipioId}>
                  <td className="admin-nome">{c.nome}</td>
                  <td className="admin-mut">{c.codigoIbge}</td>
                  <td className="dir">{fmt(c.emissaoTotal)}</td>
                  <td className="dir">{fmt(c.mediaDiaria)}</td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr><td colSpan={4} className="admin-vazio">Consulte para listar os menores emissores.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {form && (
        <section className="card">
          <h2 className="grafico-titulo">Registrar emissão</h2>
          <form onSubmit={salvar}>
            <div className="form-grid">
              <MunicipioSelect value={municipioForm?.apiId} onChange={setMunicipioForm} />
              <label className="campo">
                <span>Data de referência</span>
                <input type="date" value={form.dataReferencia} onChange={(e) => setForm({ ...form, dataReferencia: e.target.value })} />
              </label>
              <label className="campo">
                <span>Emissão (tCO₂e)</span>
                <input type="number" step="0.0001" required value={form.emissaoTco2e} onChange={(e) => setForm({ ...form, emissaoTco2e: e.target.value })} />
              </label>
              <label className="campo">
                <span>Fonte</span>
                <input value={form.fonte} onChange={(e) => setForm({ ...form, fonte: e.target.value })} />
              </label>
              <label className="campo">
                <span>Observação</span>
                <input value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
              </label>
            </div>
            <div className="modal-acoes">
              <button type="button" className="painel-acao secundario" onClick={() => setForm(null)}>Cancelar</button>
              <button type="submit" className="painel-acao" disabled={salvando}>{salvando ? "Salvando…" : "Salvar emissão"}</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
