import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip,
  CartesianGrid, ResponsiveContainer, LabelList,
} from "recharts";

const FAIXAS = [
  { rotulo:"0–20",  label:"Crítico",  min:0,  max:20,  cor:"#dc2626" },
  { rotulo:"20–40", label:"Baixo",    min:20, max:40,  cor:"#f97316" },
  { rotulo:"40–60", label:"Médio",    min:40, max:60,  cor:"#d97706" },
  { rotulo:"60–80", label:"Bom",      min:60, max:80,  cor:"#65a30d" },
  { rotulo:"80–100",label:"Ótimo",   min:80, max:101, cor:"#16a34a" },
];

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const faixa = FAIXAS.find((f) => f.rotulo === label);
  return (
    <div style={{
      background:"#fff", border:"1px solid #f1f5f9", borderRadius:10,
      padding:"8px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12,
    }}>
      <p style={{ margin:"0 0 3px", fontWeight:700, color: faixa?.cor || "#475569" }}>
        Score {label} — {faixa?.label}
      </p>
      <p style={{ margin:0, color:"#64748b" }}>
        <strong style={{ color:"#0f172a" }}>{payload[0].value}</strong> município(s)
      </p>
    </div>
  );
};

export default function GraficoDistribuicao({ municipios }) {
  const dados = FAIXAS.map((f) => ({
    rotulo: f.rotulo,
    label: f.label,
    cor: f.cor,
    qtd: municipios.filter(
      (m) => m.prioridade != null && m.prioridade >= f.min && m.prioridade < f.max
    ).length,
  }));

  const maxQtd = Math.max(...dados.map((d) => d.qtd), 1);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={dados} margin={{ top:20, right:8, bottom:4, left:-18 }} barCategoryGap="26%">
        <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="0" />
        <XAxis dataKey="rotulo" tick={{ fontSize:10.5, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize:10, fill:"#94a3b8" }} axisLine={false} tickLine={false} domain={[0, maxQtd + 2]} />
        <Tooltip content={<TooltipCustom />} cursor={{ fill:"rgba(0,0,0,0.03)" }} />
        <Bar dataKey="qtd" radius={[6, 6, 0, 0]}>
          <LabelList dataKey="qtd" position="top" style={{ fontSize:10, fill:"#94a3b8", fontWeight:600 }} />
          {dados.map((d, i) => (
            <Cell key={i} fill={d.cor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
