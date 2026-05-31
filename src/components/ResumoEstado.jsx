import {
  MapPin,
  Gauge,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Coins,
  LandPlot,
} from "lucide-react";
import { numero } from "../utils/format";
import "./ResumoEstado.css";

const media = (arr) => (arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : null);
const soma = (arr) => arr.reduce((s, n) => s + n, 0);

// Área em hectares: abrevia para "mi ha" quando passa de 1 milhão, para caber
// no card sem estourar.
const areaCurta = (ha) =>
  ha >= 1e6 ? `${numero(ha / 1e6, 1)} mi ha` : `${numero(ha)} ha`;

// Faixa de indicadores agregados do estado, no topo do painel.
// Usa apenas dados presentes no ranking (prioridade, semáforo, retorno) — assim
// nenhum card mostra valor inventado quando o detalhe ainda não foi carregado.
export default function ResumoEstado({ municipios }) {
  const total = municipios.length;
  const comPrioridade = municipios.filter((m) => m.prioridade != null);
  const semDado = total - comPrioridade.length;
  const verdes = municipios.filter((m) => m.semaforo === "VERDE").length;
  const amarelos = municipios.filter((m) => m.semaforo === "AMARELO").length;
  const vermelhos = municipios.filter((m) => m.semaforo === "VERMELHO").length;
  const prioridadeMedia = media(comPrioridade.map((m) => m.prioridade));
  const retornoMedio = media(
    municipios.map((m) => m.retornoPorReal).filter((v) => v != null)
  );
  const areasComDado = municipios.map((m) => m.areaHa).filter((v) => v != null);
  const areaTotal = areasComDado.length ? soma(areasComDado) : null;

  const pctEstado = (n) => (total ? Math.round((n / total) * 100) : 0);

  const cards = [
    {
      icone: MapPin,
      tom: "azul",
      valor: numero(total),
      rotulo: "Municípios analisados",
      sub: semDado ? `${semDado} ainda sem dados` : "todos com dados",
    },
    {
      icone: LandPlot,
      tom: "azul",
      valor: areaTotal == null ? "—" : areaCurta(areaTotal),
      rotulo: "Área monitorada",
      sub: areaTotal == null ? "sem área informada" : `${areasComDado.length} municípios`,
    },
    {
      icone: Gauge,
      tom: "azul",
      valor: prioridadeMedia == null ? "—" : numero(prioridadeMedia),
      rotulo: "Aptidão JREDD+",
      sub: "score de aptidão 0 a 100",
      barra: prioridadeMedia ?? 0,
      tomBarra: "azul",
    },
    {
      icone: ShieldCheck,
      tom: "verde",
      valor: numero(verdes),
      rotulo: "Prontos para investir",
      sub: `${pctEstado(verdes)}% do estado`,
      barra: pctEstado(verdes),
      tomBarra: "verde",
    },
    {
      icone: ShieldAlert,
      tom: "amarelo",
      valor: numero(amarelos),
      rotulo: "Exigem cuidado",
      sub: `${pctEstado(amarelos)}% do estado`,
      barra: pctEstado(amarelos),
      tomBarra: "amarelo",
    },
    {
      icone: AlertTriangle,
      tom: "vermelho",
      valor: numero(vermelhos),
      rotulo: "Em risco alto",
      sub: `${pctEstado(vermelhos)}% do estado`,
      barra: pctEstado(vermelhos),
      tomBarra: "vermelho",
    },
    {
      icone: Coins,
      tom: "amarelo",
      valor: retornoMedio == null ? "—" : `R$ ${numero(retornoMedio, 2)}`,
      rotulo: "Retorno médio por R$",
      sub: "retorno por real investido",
    },
  ];

  return (
    <div className="resumo">
      {cards.map((c) => {
        const Icone = c.icone;
        return (
          <div key={c.rotulo} className={`stat stat--${c.tom}`}>
            <span className="stat-icone">
              <Icone size={22} strokeWidth={1.5} />
            </span>
            <div className="stat-txt">
              <strong className="stat-valor">{c.valor}</strong>
              <span className="stat-rotulo">{c.rotulo}</span>
              {c.barra != null && (
                <span className="stat-barra">
                  <i
                    className={`stat-barra-fill stat-barra--${c.tomBarra}`}
                    style={{ width: `${Math.min(100, Math.max(0, c.barra))}%` }}
                  />
                </span>
              )}
              {c.sub && <span className="stat-sub">{c.sub}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
