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

// Faixas de score (0–100). Cor caminha de vermelho (baixa prioridade/maior
// risco) para verde (pronto para investir), dando leitura imediata de onde o
// estado está concentrado.
const FAIXAS = [
  { rotulo: "0–20", min: 0, max: 20, cor: "#C62828" },
  { rotulo: "20–40", min: 20, max: 40, cor: "#E2683B" },
  { rotulo: "40–60", min: 40, max: 60, cor: "#F4B400" },
  { rotulo: "60–80", min: 60, max: 80, cor: "#7CB342" },
  { rotulo: "80–100", min: 80, max: 101, cor: "#2E8B3E" },
];

export default function GraficoDistribuicao({ municipios }) {
  const dados = FAIXAS.map((f) => ({
    rotulo: f.rotulo,
    cor: f.cor,
    qtd: municipios.filter(
      (m) => m.prioridade != null && m.prioridade >= f.min && m.prioridade < f.max
    ).length,
  }));

  return (
    <div>
      <h2 className="grafico-titulo">Distribuição por Aptidão JREDD+</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
          <CartesianGrid vertical={false} stroke="#eef2f7" />
          <XAxis dataKey="rotulo" tick={{ fontSize: 12 }} stroke="#9aa5ad" />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#9aa5ad" />
          <Tooltip
            formatter={(v) => [`${v} município(s)`, "Quantidade"]}
            labelFormatter={(l) => `Score ${l}`}
            cursor={{ fill: "rgba(10,77,156,0.05)" }}
          />
          <Bar dataKey="qtd" radius={[6, 6, 0, 0]}>
            {dados.map((d) => (
              <Cell key={d.rotulo} fill={d.cor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
