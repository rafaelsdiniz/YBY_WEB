import { Link } from "react-router-dom";
import {
  Map,
  Gauge,
  TrendingDown,
  ShieldCheck,
  Leaf,
  Coins,
  Target,
  ArrowRight,
  Database,
  BarChart3,
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import "./LandingPage.css";

const RECURSOS = [
  {
    icone: Map,
    titulo: "Mapa de prioridade",
    texto:
      "Os 139 municípios do Tocantins coloridos por urgência de investimento — o estado inteiro numa só tela.",
  },
  {
    icone: Gauge,
    titulo: "Semáforo de decisão",
    texto:
      "Verde, amarelo e vermelho traduzem risco e prontidão: onde pode investir, onde investir com cuidado e onde não investir agora.",
  },
  {
    icone: TrendingDown,
    titulo: "Detecção de desperdício",
    texto:
      "Identifica municípios que gastam muito e entregam pouco resultado ambiental, para realocar recursos.",
  },
];

const IMPACTOS = [
  { icone: Map, valor: "139", rotulo: "municípios monitorados" },
  { icone: Coins, valor: "R$ 42 mi", rotulo: "em investimento acompanhado" },
  { icone: Leaf, valor: "+30%", rotulo: "redução de desmatamento onde há gasto eficiente" },
  { icone: ShieldCheck, valor: "64%", rotulo: "conformidade média (CAR)" },
];

const PASSOS = [
  {
    icone: Database,
    titulo: "1. Reúne os dados",
    texto: "Desmatamento, conformidade (CAR), gasto público e risco legal em um só lugar.",
  },
  {
    icone: Target,
    titulo: "2. Calcula a prioridade",
    texto: "Um índice único de 0 a 100 e um semáforo apontam onde cada real rende mais.",
  },
  {
    icone: BarChart3,
    titulo: "3. Investe e monitora",
    texto: "Acompanhe a evolução por município e comprove o resultado ao longo do tempo.",
  },
];

export default function LandingPage() {
  return (
    <div className="landing" id="topo">
      <LandingNavbar />

      {/* HERO */}
      <header className="hero">
        <video
          className="hero-video"
          src="/jalapao.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-conteudo">
          <span className="hero-tag">Programa JREDD+ · Estado do Tocantins</span>
          <h1>Onde investir para proteger o Tocantins</h1>
          <p>
            O YBY transforma dados ambientais, fiscais e de risco em decisões
            claras de investimento — município a município, com transparência e
            foco em resultado.
          </p>
          <div className="hero-acoes">
            <Link to="/login" className="btn-primario">
              Entrar no sistema <ArrowRight size={18} />
            </Link>
            <a href="#sobre" className="btn-secundario">
              Conhecer o YBY
            </a>
          </div>
        </div>
      </header>

      {/* SOBRE */}
      <section id="sobre" className="secao">
        <div className="secao-inner">
          <span className="secao-tag">Sobre o YBY</span>
          <h2>Inteligência para o investimento ambiental</h2>
          <p className="secao-lead">
            <strong>Yby</strong> significa “terra” em tupi. É a plataforma de
            priorização do programa JREDD+ que reúne desmatamento, conformidade,
            gasto público e risco em um índice único — para que o investimento
            ambiental do Tocantins seja aplicado onde gera mais impacto.
          </p>

          <div className="recursos">
            {RECURSOS.map((r) => {
              const Icone = r.icone;
              return (
                <article key={r.titulo} className="recurso">
                  <span className="recurso-icone">
                    <Icone size={24} strokeWidth={2} />
                  </span>
                  <h3>{r.titulo}</h3>
                  <p>{r.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACTOS */}
      <section id="impactos" className="secao secao--azul">
        <div className="secao-inner">
          <span className="secao-tag claro">Impactos</span>
          <h2>Resultado que se mede</h2>
          <p className="secao-lead claro">
            Mais do que um mapa: uma régua comum para o estado decidir, priorizar
            e cobrar resultado.
          </p>

          <div className="impactos">
            {IMPACTOS.map((i) => {
              const Icone = i.icone;
              return (
                <div key={i.rotulo} className="impacto">
                  <Icone size={26} strokeWidth={2} className="impacto-icone" />
                  <strong className="impacto-valor">{i.valor}</strong>
                  <span className="impacto-rotulo">{i.rotulo}</span>
                </div>
              );
            })}
          </div>
          <p className="impactos-nota">* Números ilustrativos da base de demonstração.</p>
        </div>
      </section>

      {/* MUDANÇAS */}
      <section id="mudancas" className="secao">
        <div className="secao-inner">
          <span className="secao-tag">O que muda</span>
          <h2>Da planilha à decisão</h2>

          <div className="mudancas">
            <div className="mudanca mudanca--antes">
              <h4>Antes</h4>
              <ul>
                <li>Dados espalhados em planilhas e relatórios soltos</li>
                <li>Investimento sem visão de risco ou retorno</li>
                <li>Desperdício difícil de enxergar</li>
                <li>Decisões lentas e pouco transparentes</li>
              </ul>
            </div>
            <div className="mudanca mudanca--depois">
              <h4>Com o YBY</h4>
              <ul>
                <li>Visão única do estado, atualizada e comparável</li>
                <li>Prioridade objetiva por risco, retorno e conformidade</li>
                <li>Alertas de desperdício para realocar recursos</li>
                <li>Decisão em minutos, com trilha clara de evidências</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="secao secao--cinza">
        <div className="secao-inner">
          <span className="secao-tag">Como funciona</span>
          <h2>Três passos</h2>

          <div className="passos">
            {PASSOS.map((p) => {
              const Icone = p.icone;
              return (
                <article key={p.titulo} className="passo">
                  <span className="passo-icone">
                    <Icone size={22} strokeWidth={2} />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Pronto para investir melhor?</h2>
          <p>Acesse o painel e veja o Tocantins por prioridade de investimento.</p>
          <Link to="/login" className="btn-primario grande">
            Entrar no sistema <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
