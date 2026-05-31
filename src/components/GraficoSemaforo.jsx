import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./GraficoSemaforo.css";

const COR  = { VERDE: "#16a34a", AMARELO: "#d97706", VERMELHO: "#dc2626" };
const NOME = { VERDE: "Prontos", AMARELO: "Cuidado", VERMELHO: "Em risco" };

const TooltipCustom = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background:"#fff", border:"1px solid #f1f5f9", borderRadius:10,
      padding:"8px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12,
    }}>
      <p style={{ margin:"0 0 3px", fontWeight:700, color: COR[d.payload.chave] }}>{d.name}</p>
      <p style={{ margin:0, color:"#64748b" }}>
        <strong style={{ color:"#0f172a" }}>{d.value}</strong> município(s)
      </p>
    </div>
  );
};

export default function GraficoSemaforo({ municipios }) {
  const total = municipios.length;
  const dados = [
    { nome: "Prontos para investir", chave: "VERDE"    },
    { nome: "Exigem cuidado",        chave: "AMARELO"  },
    { nome: "Em risco alto",         chave: "VERMELHO" },
  ].map((d) => ({
    ...d,
    valor: municipios.filter((m) => m.semaforo === d.chave).length,
  }));

  return (
    <div className="gsem-corpo">
      <div className="gsem-donut">
        <ResponsiveContainer width="100%" height={164}>
          <PieChart>
            <Pie
              data={dados}
              dataKey="valor"
              nameKey="nome"
              innerRadius={50}
              outerRadius={76}
              paddingAngle={3}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {dados.map((d) => (
                <Cell key={d.chave} fill={COR[d.chave]} />
              ))}
            </Pie>
            <Tooltip content={<TooltipCustom />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="gsem-centro">
          <strong>{total}</strong>
          <span>municípios</span>
        </div>
      </div>

      <ul className="gsem-legenda">
        {dados.map((d) => {
          const pct = total ? Math.round((d.valor / total) * 100) : 0;
          return (
            <li key={d.chave}>
              <span className="gsem-dot" style={{ background: COR[d.chave] }} />
              <div className="gsem-leg-info">
                <strong style={{ color: COR[d.chave] }}>{d.valor}</strong>
                <span>{NOME[d.chave]}</span>
              </div>
              <em>{pct}%</em>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
