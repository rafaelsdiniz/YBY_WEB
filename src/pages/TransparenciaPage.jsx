import { useEffect, useState } from "react";
import { metadados } from "../services/publico";
import "./Paineis.css";

export default function TransparenciaPage() {
  const [meta, setMeta] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    metadados().then(setMeta).catch(() => setErro(true));
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Transparência</h1>
        <p>Metadados públicos dos cálculos (LAI · Lei 12.527/2011)</p>
      </header>

      <section className="card">
        {erro && <p className="painel-vazio">Não foi possível carregar os metadados.</p>}
        {!meta && !erro && <p className="estado">Carregando metadados…</p>}
        {meta && (
          <>
            <div className="kpi-grid">
              <div className="kpi-box">
                <span className="kpi-rotulo">Versão do algoritmo</span>
                <span className="kpi-valor">{meta.versaoAlgoritmo}</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-rotulo">Municípios monitorados</span>
                <span className="kpi-valor">{meta.totalMunicipios}</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-rotulo">Última atualização</span>
                <span className="kpi-valor" style={{ fontSize: "1rem" }}>
                  {meta.ultimaAtualizacao ? new Date(meta.ultimaAtualizacao).toLocaleString("pt-BR") : "—"}
                </span>
              </div>
            </div>

            <h3 style={{ marginTop: 18 }}>Pesos do score de aptidão JREDD+</h3>
            <ul>
              {Object.entries(meta.pesosScore || {}).map(([k, v]) => (
                <li key={k}><strong>{k}</strong>: {v}</li>
              ))}
            </ul>

            {meta.baseLegal && <p className="painel-meta">Base legal: {meta.baseLegal}</p>}
          </>
        )}
      </section>
    </>
  );
}
