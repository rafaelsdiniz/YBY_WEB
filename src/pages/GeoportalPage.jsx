import { useEffect, useState } from "react";
import { Layers, MapPin, Database } from "lucide-react";
import { camadasGeoportal, dadosCamada, sugestoesAreasCarbono } from "../services/geoportal";
import { useToast } from "../context/ToastContext";
import { numero } from "../utils/format";
import { rotulo, BIOMA } from "../services/enums";
import "./AdminTabela.css";
import "./Paineis.css";

const seloSemaforo = (s) => {
  const k = String(s || "").toUpperCase();
  if (k === "VERDE") return "selo selo--verde";
  if (k === "AMARELO") return "selo selo--amarelo";
  if (k === "VERMELHO") return "selo selo--vermelho";
  return "selo selo--neutro";
};

const seloRelevancia = (r) => {
  const k = String(r || "").toUpperCase();
  if (k === "ALTA") return "selo selo--verde";
  if (k === "MEDIA") return "selo selo--amarelo";
  return "selo selo--neutro";
};

export default function GeoportalPage() {
  const toast = useToast();
  const [camadas, setCamadas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [consultando, setConsultando] = useState(null); // typeName em consulta

  useEffect(() => {
    Promise.all([camadasGeoportal().catch(() => []), sugestoesAreasCarbono(10).catch(() => [])])
      .then(([c, a]) => {
        setCamadas(c || []);
        setAreas(a || []);
      })
      .catch((err) => toast.erro(err.message))
      .finally(() => setCarregando(false));
  }, [toast]);

  async function consultarCamada(c) {
    setConsultando(c.typeName);
    try {
      const fc = await dadosCamada({ typeName: c.typeName, maxFeatures: 50 });
      const total = fc?.features?.length ?? fc?.totalFeatures ?? 0;
      toast.sucesso(`${c.titulo}: ${total} feição(ões) retornada(s) do GeoServer.`);
    } catch (err) {
      toast.erro(`Falha ao consultar ${c.titulo}: ${err.message}`);
    } finally {
      setConsultando(null);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1>Geoportal SEPLAN-TO</h1>
        <p>Camadas territoriais e áreas prioritárias para estudo de carbono</p>
      </header>

      {carregando ? (
        <p className="estado">Carregando geoportal…</p>
      ) : (
        <>
          <section className="card">
            <h2 className="grafico-titulo"><MapPin size={17} /> Áreas sugeridas para estudo de carbono</h2>
            <div className="admin-tabela-wrap">
              <table className="admin-tabela">
                <thead>
                  <tr>
                    <th>Município</th>
                    <th>Bioma</th>
                    <th>Situação</th>
                    <th className="dir">Área (ha)</th>
                    <th className="dir">Score</th>
                    <th className="dir">Potencial tCO₂e/ano</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((a) => (
                    <tr key={a.municipioId}>
                      <td className="admin-nome">{a.nome}</td>
                      <td className="admin-mut">{rotulo(BIOMA, a.bioma)}</td>
                      <td><span className={seloSemaforo(a.semaforo)}>{a.semaforo || "—"}</span></td>
                      <td className="dir">{numero(a.areaHa)}</td>
                      <td className="dir">{numero(a.scorePrioridade)}</td>
                      <td className="dir">{numero(a.potencialTco2eAno)}</td>
                    </tr>
                  ))}
                  {areas.length === 0 && (
                    <tr><td colSpan={6} className="admin-vazio">Nenhuma área sugerida.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2 className="grafico-titulo"><Layers size={17} /> Catálogo de camadas</h2>
            <div className="geo-camadas">
              {camadas.map((c) => (
                <article key={c.codigo} className="geo-camada">
                  <div className="geo-camada-top">
                    <strong>{c.titulo}</strong>
                    <span className={seloRelevancia(c.relevanciaCarbono)}>{c.relevanciaCarbono || "—"}</span>
                  </div>
                  <span className="geo-camada-tema">{c.tema}</span>
                  <p className="geo-camada-desc">{c.descricao}</p>
                  <button
                    type="button"
                    className="admin-acao"
                    onClick={() => consultarCamada(c)}
                    disabled={consultando === c.typeName}
                  >
                    <Database size={14} /> {consultando === c.typeName ? "Consultando…" : "Consultar GeoServer"}
                  </button>
                </article>
              ))}
              {camadas.length === 0 && <p className="painel-vazio">Nenhuma camada disponível.</p>}
            </div>
          </section>
        </>
      )}
    </>
  );
}
