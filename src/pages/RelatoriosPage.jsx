import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { getMunicipios } from "../services/api";
import { useToast } from "../context/ToastContext";
import ResumoEstado from "../components/ResumoEstado";
import SemaforoBadge from "../components/SemaforoBadge";
import "./AdminTabela.css";

const moeda = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function RelatoriosPage() {
  const toast = useToast();
  const [municipios, setMunicipios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getMunicipios()
      .then(setMunicipios)
      .finally(() => setCarregando(false));
  }, []);

  function exportarCSV() {
    const cab = [
      "Município",
      "Semáforo",
      "Prioridade",
      "Risco",
      "Retorno por R$",
      "Conformidade (%)",
      "Gasto público (R$)",
    ];
    const linhas = [...municipios]
      .sort((a, b) => b.prioridade - a.prioridade)
      .map((m) => [
        m.nome,
        m.semaforo,
        m.prioridade,
        m.notaRisco,
        m.retornoPorReal,
        m.conformidade,
        m.gastoPublico,
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

  const ordenados = [...municipios].sort((a, b) => b.prioridade - a.prioridade);

  return (
    <>
      <header className="page-header admin-header">
        <div>
          <h1>Relatórios</h1>
          <p>Consolidado de investimento, risco e conformidade</p>
        </div>
        <button
          type="button"
          className="admin-novo"
          onClick={exportarCSV}
          disabled={carregando || !municipios.length}
        >
          <Download size={18} /> Exportar CSV
        </button>
      </header>

      <ResumoEstado municipios={municipios} />

      <section className="card">
        <h2 className="grafico-titulo">Municípios por prioridade</h2>
        {carregando ? (
          <p className="estado">Carregando relatório...</p>
        ) : (
          <div className="admin-tabela-wrap">
            <table className="admin-tabela">
              <thead>
                <tr>
                  <th>Município</th>
                  <th>Situação</th>
                  <th className="dir">Prioridade</th>
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
                    <td className="dir">{m.prioridade}</td>
                    <td className="dir">{m.notaRisco}</td>
                    <td className="dir">{m.retornoPorReal.toFixed(1)}</td>
                    <td className="dir">{m.conformidade}%</td>
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
