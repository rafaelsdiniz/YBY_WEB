import SemaforoBadge from "./SemaforoBadge";
import KpiCard from "./KpiCard";
import GraficoDesmatamento from "./GraficoDesmatamento";
import RelatorioPdf from "./RelatorioPdf";
import { numero, moeda, temValor, SEM_DADO } from "../utils/format";
import "./DetalheMunicipio.css";

// tom do KpiCard tolerante a dado ausente (null => neutro)
const tom = (v, { bom, ruim, invertido = false }) => {
  if (!temValor(v)) return "neutro";
  const n = Number(v);
  if (invertido) return n >= ruim ? "ruim" : n <= bom ? "bom" : "neutro";
  return n >= bom ? "bom" : n < ruim ? "ruim" : "neutro";
};

// Painel lateral com KPIs, semaforo e pendencias do municipio selecionado.
export default function DetalheMunicipio({ municipio }) {
  const m = municipio;
  return (
    <section className="detalhe">
      <header className="detalhe-head">
        <h2>{m.nome}</h2>
        <SemaforoBadge semaforo={m.semaforo} />
      </header>

      <div className="detalhe-kpis">
        <KpiCard
          rotulo="Retorno por R$ investido"
          valor={temValor(m.retornoPorReal) ? numero(m.retornoPorReal, 1) : SEM_DADO}
          tom={tom(m.retornoPorReal, { bom: 1, ruim: 0.5 })}
        />
        <KpiCard
          rotulo="Nota de risco"
          valor={numero(m.notaRisco, 1)}
          tom={tom(m.notaRisco, { bom: 30, ruim: 60, invertido: true })}
        />
        <KpiCard
          rotulo="Redução do desmatamento"
          valor={numero(m.reducaoDesmatamento)}
          sufixo={temValor(m.reducaoDesmatamento) ? "%" : ""}
          tom={tom(m.reducaoDesmatamento, { bom: 25, ruim: 10 })}
        />
        <KpiCard
          rotulo="Conformidade (CAR)"
          valor={numero(m.conformidade)}
          sufixo={temValor(m.conformidade) ? "%" : ""}
          tom={tom(m.conformidade, { bom: 70, ruim: 50 })}
        />
      </div>

      <p className="detalhe-gasto">
        Gasto público em meio ambiente: <strong>{moeda(m.gastoPublico)}</strong>
      </p>

      <div className="detalhe-pendencias">
        <h3>Pendências</h3>
        {m.pendencias.length === 0 ? (
          <p className="detalhe-sem-pendencia">Nenhuma pendência registrada.</p>
        ) : (
          <ul>
            {m.pendencias.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>

      <GraficoDesmatamento serie={m.serieDesmatamento} />

      <RelatorioPdf />
    </section>
  );
}
