import { MapPin, ShieldCheck, AlertTriangle, TrendingDown, Wallet } from "lucide-react";
import "./ResumoEstado.css";

const moedaCompacta = (v) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  });

// Faixa de indicadores agregados do estado, no topo do painel.
export default function ResumoEstado({ municipios }) {
  const total = municipios.length;
  const verdes = municipios.filter((m) => m.semaforo === "VERDE").length;
  const vermelhos = municipios.filter((m) => m.semaforo === "VERMELHO").length;
  const desperdicio = municipios.filter((m) => m.desperdicio).length;
  const investimento = municipios.reduce((s, m) => s + m.gastoPublico, 0);

  const cards = [
    { icone: MapPin, tom: "azul", valor: total, rotulo: "Municípios analisados" },
    { icone: ShieldCheck, tom: "verde", valor: verdes, rotulo: "Prontos para investir" },
    { icone: AlertTriangle, tom: "vermelho", valor: vermelhos, rotulo: "Em risco alto" },
    { icone: TrendingDown, tom: "amarelo", valor: desperdicio, rotulo: "Com desperdício" },
    { icone: Wallet, tom: "azul", valor: moedaCompacta(investimento), rotulo: "Investimento monitorado" },
  ];

  return (
    <div className="resumo">
      {cards.map((c) => {
        const Icone = c.icone;
        return (
          <div key={c.rotulo} className={`stat stat--${c.tom}`}>
            <span className="stat-icone">
              <Icone size={20} strokeWidth={2.2} />
            </span>
            <div className="stat-txt">
              <strong className="stat-valor">{c.valor}</strong>
              <span className="stat-rotulo">{c.rotulo}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
