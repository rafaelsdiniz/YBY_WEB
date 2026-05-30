import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CORES = { VERDE: "#2E8B3E", AMARELO: "#F4B400", VERMELHO: "#C62828" };

// Barras horizontais: prioridade de cada município, colorida pelo semáforo.
export default function GraficoPrioridade({ municipios }) {
  const dados = [...municipios]
    .sort((a, b) => b.prioridade - a.prioridade)
    .slice(0, 12)
    .map((m) => ({ nome: m.nome, prioridade: m.prioridade, semaforo: m.semaforo }));

  return (
    <div>
      <h2 className="grafico-titulo">Top 12 por prioridade</h2>
      <ResponsiveContainer width="100%" height={Math.max(200, dados.length * 44)}>
        <BarChart
          layout="vertical"
          data={dados}
          margin={{ top: 4, right: 18, bottom: 4, left: 4 }}
        >
          <CartesianGrid horizontal={false} stroke="#eef2f7" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9aa5ad" />
          <YAxis
            type="category"
            dataKey="nome"
            width={130}
            tick={{ fontSize: 12.5 }}
            stroke="#9aa5ad"
          />
          <Tooltip
            formatter={(v) => [v, "Prioridade"]}
            cursor={{ fill: "rgba(10,77,156,0.05)" }}
          />
          <Bar dataKey="prioridade" radius={[0, 6, 6, 0]} barSize={18}>
            {dados.map((d) => (
              <Cell key={d.nome} fill={CORES[d.semaforo]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
