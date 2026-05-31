import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import "./GraficoDesmatamento.css";

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:"#fff", border:"1px solid #f1f5f9", borderRadius:10,
      padding:"8px 14px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", fontSize:12,
    }}>
      <p style={{ margin:"0 0 3px", fontWeight:700, color:"#0f172a" }}>Ano {label}</p>
      <p style={{ margin:0, color:"#dc2626", fontWeight:600 }}>
        {Number(payload[0].value).toLocaleString("pt-BR", { maximumFractionDigits:1 })} km²
      </p>
    </div>
  );
};

export default function GraficoDesmatamento({ serie }) {
  if (!serie || serie.length === 0) return null;
  return (
    <div className="grafico">
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={serie} margin={{ top:8, right:12, bottom:0, left:-16 }}>
          <defs>
            <linearGradient id="gradDesm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#dc2626" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="0" vertical={false} />
          <XAxis dataKey="ano" tick={{ fontSize:10, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip content={<TooltipCustom />} />
          <Area
            type="monotone"
            dataKey="valor"
            stroke="#dc2626"
            strokeWidth={2}
            fill="url(#gradDesm)"
            dot={{ r:3, fill:"#dc2626", strokeWidth:0 }}
            activeDot={{ r:5, fill:"#dc2626", strokeWidth:0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
