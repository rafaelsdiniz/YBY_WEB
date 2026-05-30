import "./KpiCard.css";

// Cartao de numero grande. tom: neutro | bom | ruim para colorir o valor.
export default function KpiCard({ rotulo, valor, sufixo, tom = "neutro" }) {
  return (
    <div className={`kpi kpi--${tom}`}>
      <div className="kpi-valor">
        {valor}
        {sufixo && <span className="kpi-sufixo">{sufixo}</span>}
      </div>
      <div className="kpi-rotulo">{rotulo}</div>
    </div>
  );
}
