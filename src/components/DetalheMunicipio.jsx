import SemaforoBadge from "./SemaforoBadge";
import KpiCard from "./KpiCard";
import "./DetalheMunicipio.css";

const moeda = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

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
          valor={m.retornoPorReal.toFixed(1)}
          tom={m.retornoPorReal >= 1 ? "bom" : m.retornoPorReal < 0.5 ? "ruim" : "neutro"}
        />
        <KpiCard
          rotulo="Nota de risco"
          valor={m.notaRisco}
          tom={m.notaRisco >= 60 ? "ruim" : m.notaRisco <= 30 ? "bom" : "neutro"}
        />
        <KpiCard
          rotulo="Redução do desmatamento"
          valor={m.reducaoDesmatamento}
          sufixo="%"
          tom={m.reducaoDesmatamento >= 25 ? "bom" : m.reducaoDesmatamento < 10 ? "ruim" : "neutro"}
        />
        <KpiCard
          rotulo="Conformidade (CAR)"
          valor={m.conformidade}
          sufixo="%"
          tom={m.conformidade >= 70 ? "bom" : m.conformidade < 50 ? "ruim" : "neutro"}
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
    </section>
  );
}
