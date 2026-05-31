import { Map, Gauge, TrendingDown, Database } from "lucide-react";
import "./SobrePage.css";

const RECURSOS = [
  { icone: Map,         titulo: "Mapa de prioridade",      texto: "Os 139 municípios do Tocantins coloridos por urgência de investimento." },
  { icone: Gauge,       titulo: "Semáforo de decisão",     texto: "Verde, amarelo e vermelho traduzem risco e prontidão para investir." },
  { icone: TrendingDown,titulo: "Detecção de desperdício", texto: "Aponta quem gasta muito e entrega pouco resultado ambiental." },
  { icone: Database,    titulo: "Dados integrados",        texto: "Desmatamento, conformidade (CAR), gasto público e risco em um só índice." },
];

const SEMAFORO = [
  { cor: "var(--verde)", titulo: "Verde - Pode investir", texto: "Baixo risco e bom retorno." },
  { cor: "var(--amarelo)", titulo: "Amarelo - Investir com cuidado", texto: "Há ressalvas a resolver." },
  { cor: "var(--vermelho)", titulo: "Vermelho - Não investir agora", texto: "Risco alto (embargo, sobreposição)." },
];

export default function SobrePage() {
  return (
    <>
      <header className="page-header">
        <h1>Sobre o YBY</h1>
        <p>Inteligência de monitoramento e gestão para investimento ambiental - Programa JREDD+</p>
      </header>

      <section className="card sobre-intro">
        <p>
          <strong>Yby</strong> significa “terra” em tupi. A plataforma reúne dados
          ambientais, fiscais e de risco em um índice único de prioridade, para
          que o investimento ambiental do Tocantins seja aplicado onde gera mais
          impacto - com transparência e foco em resultado.
        </p>
      </section>

      <div className="sobre-grid">
        {RECURSOS.map((r) => {
          const Icone = r.icone;
          return (
            <article key={r.titulo} className="card sobre-card">
              <span className="sobre-icone">
                <Icone size={34} strokeWidth={1.5} />
              </span>
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </article>
          );
        })}
      </div>

      <section className="card">
        <h2 className="grafico-titulo">O que significa o semáforo</h2>
        <ul className="sobre-semaforo">
          {SEMAFORO.map((s) => (
            <li key={s.titulo}>
              <span className="sobre-bolinha" style={{ background: s.cor }} />
              <div>
                <strong>{s.titulo}</strong>
                <span>{s.texto}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="sobre-versao">YBY · JREDD+ Intelligence - Tocantins · versão 1.0</p>
    </>
  );
}
