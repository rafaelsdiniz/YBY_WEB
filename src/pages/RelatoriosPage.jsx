import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
import { getMunicipios } from "../services/api";
import { gerarRelatorioExecutivo } from "../services/admin";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import ResumoEstado from "../components/ResumoEstado";
import SemaforoBadge from "../components/SemaforoBadge";
import { numero, moeda, pct } from "../utils/format";
import "./AdminTabela.css";
import "./Paineis.css";

const pri = (m) => (m.prioridade == null ? -1 : m.prioridade);

export default function RelatoriosPage() {
  const toast = useToast();
  const { usuario } = useAuth();
  const ehGestor = usuario?.perfil === "GESTOR";
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [relExec, setRelExec] = useState(null);
  const [gerando, setGerando] = useState(false);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  async function gerarExecutivo() {
    setGerando(true);
    try {
      setRelExec(await gerarRelatorioExecutivo());
      toast.sucesso("Relatório executivo gerado.");
    } catch (err) {
      toast.erro(err.message);
    } finally {
      setGerando(false);
    }
  }

  function exportarCSV() {
    const cab = [
      "Município",
      "Semáforo",
      "Aptidão JREDD+",
      "Risco",
      "Retorno por R$",
      "Conformidade (%)",
      "Gasto público (R$)",
    ];
    const cel = (v) => (v == null ? "" : v);
    const linhas = [...municipios]
      .sort((a, b) => pri(b) - pri(a))
      .map((m) => [
        m.nome,
        m.semaforo,
        cel(m.prioridade),
        cel(m.notaRisco),
        cel(m.retornoPorReal),
        cel(m.conformidade),
        cel(m.gastoPublico),
      ]);
    const csv = [cab, ...linhas].map((l) => l.join(";")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio-yby-municipios.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.sucesso("Relatório exportado (CSV).");
  }

  const ordenados = [...municipios].sort((a, b) => pri(b) - pri(a));

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Relatórios</h1>
          <p>Consolidado de investimento, risco e conformidade</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {ehGestor && (
            <button type="button" className="painel-acao secundario" onClick={gerarExecutivo} disabled={gerando}>
              <FileText size={15} strokeWidth={1.75} /> {gerando ? "Gerando…" : "Relatório executivo"}
            </button>
          )}
          <button
            type="button"
            className="admin-novo"
            onClick={exportarCSV}
            disabled={carregando || !municipios.length}
          >
            <Download size={17} strokeWidth={1.75} /> Exportar CSV
          </button>
        </div>
      </header>

      {relExec && (
        <section className="card">
          <h2 className="grafico-titulo">{relExec.titulo}</h2>
          <p className="painel-meta">
            {relExec.tipo} · gerado em {relExec.geradoEm ? new Date(relExec.geradoEm).toLocaleString("pt-BR") : "N/D"}
          </p>
          {relExec.observacao && <p className="painel-just">{relExec.observacao}</p>}
        </section>
      )}

      <ResumoEstado municipios={municipios} />

      <section className="card">
        <h2 className="grafico-titulo">Municípios por Aptidão JREDD+</h2>
        {carregando ? (
          <p className="estado">Carregando relatório...</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Município</th>
                  <th>Situação</th>
                  <th className="dir">Aptidão</th>
                  <th className="dir">Risco</th>
                  <th className="dir">Retorno/R$</th>
                  <th className="dir">Conformidade</th>
                  <th className="dir">Gasto público</th>
                </tr>
              </thead>
              <tbody>
                {ordenados.map((m) => (
                  <tr key={m.id}>
                    <td className="admin-nome">{m.nome}</td>
                    <td><SemaforoBadge semaforo={m.semaforo} /></td>
                    <td className="dir">{numero(m.prioridade)}</td>
                    <td className="dir">{numero(m.notaRisco, 1)}</td>
                    <td className="dir">{numero(m.retornoPorReal, 1)}</td>
                    <td className="dir">{pct(m.conformidade)}</td>
                    <td className="dir admin-mut">{moeda(m.gastoPublico)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
