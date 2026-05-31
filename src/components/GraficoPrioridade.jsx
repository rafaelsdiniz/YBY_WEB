import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip,
  CartesianGrid, ResponsiveContainer, ReferenceLine,
} from "recharts";

const COR = { VERDE:"#16a34a", AMARELO:"#d97706", VERMELHO:"#dc2626", SEM_DADO:"#cbd5e1" };

const TooltipCustom = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background:"#fff", border:"1px solid #f1f5f9", borderRadius:10,
      padding:"8px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12,
    }}>
      <p style={{ margin:"0 0 4px", fontWeight:700, color:"#0f172a" }}>{d.nome}</p>
      <p style={{ margin:0, color:"#64748b" }}>
        Aptidão JREDD+:{" "}
        <strong style={{ color: COR[d.semaforo] || "#64748b" }}>{d.prioridade ?? "N/D"}</strong>
      </p>
    </div>
  );
};

export default function GraficoPrioridade({ municipios }) {
  const dados = [...municipios]
    .sort((a, b) => (b.prioridade ?? -1) - (a.prioridade ?? -1))
    .slice(0, 12)
    .map((m) => ({
      nome: m.nome.length > 18 ? m.nome.slice(0, 16) + "…" : m.nome,
      prioridade: m.prioridade,
      semaforo: m.semaforo,
    }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={Math.max(220, dados.length * 36)}>
        <BarChart
          layout="vertical"
          data={dados}
          margin={{ top: 4, right: 28, bottom: 4, left: 4 }}
          barCategoryGap="32%"
        >
          <CartesianGrid horizontal={false} stroke="#f1f5f9" strokeDasharray="0" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="nome"
            width={136}
            tick={{ fontSize: 11.5, fill: "#475569" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<TooltipCustom />} cursor={{ fill:"rgba(0,0,0,0.03)" }} />
          <ReferenceLine
            x={70}
            stroke="#16a34a"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            opacity={0.45}
          />
          <Bar dataKey="prioridade" radius={[0, 6, 6, 0]} barSize={13}>
            {dados.map((d, i) => (
              <Cell key={i} fill={COR[d.semaforo] || COR.SEM_DADO} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{
        display:"flex", gap:16, flexWrap:"wrap", marginTop:10,
        paddingTop:10, borderTop:"1px solid #f8fafc",
      }}>
        {[
          { cor: COR.VERDE,    label:"Pronto para investir" },
          { cor: COR.AMARELO,  label:"Exige cuidado" },
          { cor: COR.VERMELHO, label:"Alto risco" },
        ].map((l) => (
          <span key={l.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#64748b" }}>
            <span style={{ width:9, height:9, borderRadius:3, background:l.cor, display:"inline-block" }} />
            {l.label}
          </span>
        ))}
        <span style={{ marginLeft:"auto", fontSize:10, color:"#cbd5e1" }}>referência: aptidão 70+</span>
      </div>
    </div>
  );
}
