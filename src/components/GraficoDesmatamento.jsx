import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./GraficoDesmatamento.css";

// Grafico de linha da evolucao do desmatamento (serieDesmatamento).
export default function GraficoDesmatamento({ serie }) {
  if (!serie || serie.length === 0) return null;
  return (
    <div className="grafico">
      <h3>Evolução do desmatamento</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={serie} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6ebe8" />
          <XAxis dataKey="ano" tick={{ fontSize: 12 }} stroke="#1f2a2e" />
          <YAxis tick={{ fontSize: 12 }} stroke="#1f2a2e" />
          <Tooltip
            formatter={(v) => [`${v} km²`, "Desmatamento"]}
            labelFormatter={(l) => `Ano ${l}`}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#0A4D9C"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#0A4D9C" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
