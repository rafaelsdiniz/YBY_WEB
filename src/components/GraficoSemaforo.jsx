import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./GraficoSemaforo.css";

const CORES = { VERDE: "#2E8B3E", AMARELO: "#F4B400", VERMELHO: "#C62828" };

// Donut com a distribuição dos municípios por semáforo.
export default function GraficoSemaforo({ municipios }) {
  const dados = [
    { nome: "Pode investir", chave: "VERDE" },
    { nome: "Cuidado", chave: "AMARELO" },
    { nome: "Não investir", chave: "VERMELHO" },
  ].map((d) => ({
    ...d,
    valor: municipios.filter((m) => m.semaforo === d.chave).length,
  }));

  return (
    <div>
      <h2 className="grafico-titulo">Distribuição por semáforo</h2>
      <div className="gsem-corpo">
        <div className="gsem-donut">
          <ResponsiveContainer width="100%" height={172}>
            <PieChart>
              <Pie
                data={dados}
                dataKey="valor"
                nameKey="nome"
                innerRadius={54}
                outerRadius={80}
                paddingAngle={3}
                stroke="none"
              >
                {dados.map((d) => (
                  <Cell key={d.chave} fill={CORES[d.chave]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [`${v} município(s)`, n]}
                position={{ y: 0 }}
                allowEscapeViewBox={{ x: false, y: true }}
                wrapperStyle={{ zIndex: 5 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="gsem-centro">
            <strong>{municipios.length}</strong>
            <span>municípios</span>
          </div>
        </div>
        <ul className="gsem-legenda">
          {dados.map((d) => (
            <li key={d.chave}>
              <span style={{ background: CORES[d.chave] }} />
              {d.nome}
              <b>{d.valor}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
