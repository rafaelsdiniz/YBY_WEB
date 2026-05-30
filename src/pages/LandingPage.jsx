import { useEffect, useState } from "react";
import {
  Map,
  Gauge,
  TrendingDown,
  ShieldCheck,
  Leaf,
  Coins,
  Target,
  Database,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Contador from "../components/Contador";
import BarraProgresso from "../components/BarraProgresso";
import Loader from "../components/Loader";
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
  { icone: Map, valor: 139, rotulo: "municípios monitorados" },
  { icone: Coins, prefixo: "R$ ", valor: 42, sufixo: " mi", rotulo: "em investimento acompanhado" },
  { icone: Leaf, prefixo: "+", valor: 30, sufixo: "%", rotulo: "redução de desmatamento onde há gasto eficiente" },
  { icone: ShieldCheck, valor: 64, sufixo: "%", rotulo: "conformidade média (CAR)" },
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
  const [scrollY, setScrollY] = useState(0);
  // splash de entrada do site institucional (aparece ao carregar/recarregar)
  const [splash, setSplash] = useState(true);
  const [splashSaindo, setSplashSaindo] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashSaindo(true), 1700);
    const t2 = setTimeout(() => setSplash(false), 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = null;
    const aoRolar = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="landing" id="topo">
      {splash && <Loader tela fechando={splashSaindo} texto="Preparando o YBY" />}
      <BarraProgresso />
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
          style={{ transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(1.16)` }}
        />
        <div className="hero-conteudo">
          <h1>Onde investir para proteger o Tocantins</h1>
          <p>
            O YBY transforma dados ambientais, fiscais e de risco em decisões
            claras de investimento — município a município, com transparência e
            foco em resultado.
          </p>
          <div className="hero-acoes">
            <a href="#sobre" className="btn-secundario">
              Conhecer o YBY
            </a>
          </div>
        </div>

        <a href="#sobre" className="hero-scroll" aria-label="Rolar para baixo">
          <ChevronDown size={26} />
        </a>
      </header>

      {/* SOBRE */}
      <section id="sobre" className="secao">
        <div className="secao-inner">
          <Reveal>
            <span className="secao-tag">Sobre o YBY</span>
            <h2>Inteligência para o investimento ambiental</h2>
            <span className="secao-linha" aria-hidden="true" />
            <p className="secao-lead">
              <strong>Yby</strong> significa “terra” em tupi. É a plataforma de
              priorização do programa JREDD+ que reúne desmatamento,
              conformidade, gasto público e risco em um índice único — para que o
              investimento ambiental do Tocantins seja aplicado onde gera mais
              impacto.
            </p>
          </Reveal>

          <div className="recursos">
            {RECURSOS.map((r, i) => {
              const Icone = r.icone;
              return (
                <Reveal as="article" className="recurso" key={r.titulo} delay={i * 110}>
                  <span className="recurso-icone">
                    <Icone size={24} strokeWidth={2} />
                  </span>
                  <h3>{r.titulo}</h3>
                  <p>{r.texto}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACTOS */}
      <section id="impactos" className="secao secao--azul">
        <div className="secao-inner">
          <Reveal>
            <span className="secao-tag claro">Impactos</span>
            <h2>Resultado que se mede</h2>
            <span className="secao-linha" aria-hidden="true" />
            <p className="secao-lead claro">
              Mais do que um mapa: uma régua comum para o estado decidir,
              priorizar e cobrar resultado.
            </p>
          </Reveal>

          <div className="impactos">
            {IMPACTOS.map((i, idx) => {
              const Icone = i.icone;
              return (
                <Reveal as="div" className="impacto" key={i.rotulo} delay={idx * 110}>
                  <Icone size={26} strokeWidth={2} className="impacto-icone" />
                  <strong className="impacto-valor">
                    <Contador valor={i.valor} prefixo={i.prefixo} sufixo={i.sufixo} />
                  </strong>
                  <span className="impacto-rotulo">{i.rotulo}</span>
                </Reveal>
              );
            })}
          </div>
          <p className="impactos-nota">* Números ilustrativos da base de demonstração.</p>
        </div>
      </section>

      {/* MUDANÇAS */}
      <section id="mudancas" className="secao">
        <div className="secao-inner">
          <Reveal>
            <span className="secao-tag">O que muda</span>
            <h2>Da planilha à decisão</h2>
            <span className="secao-linha" aria-hidden="true" />
          </Reveal>

          <div className="mudancas">
            <Reveal as="div" className="mudanca mudanca--antes">
              <h4>Antes</h4>
              <ul>
                <li>Dados espalhados em planilhas e relatórios soltos</li>
                <li>Investimento sem visão de risco ou retorno</li>
                <li>Desperdício difícil de enxergar</li>
                <li>Decisões lentas e pouco transparentes</li>
              </ul>
            </Reveal>
            <Reveal as="div" className="mudanca mudanca--depois" delay={120}>
              <h4>Com o YBY</h4>
              <ul>
                <li>Visão única do estado, atualizada e comparável</li>
                <li>Prioridade objetiva por risco, retorno e conformidade</li>
                <li>Alertas de desperdício para realocar recursos</li>
                <li>Decisão em minutos, com trilha clara de evidências</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="secao secao--cinza">
        <div className="secao-inner">
          <Reveal>
            <span className="secao-tag">Como funciona</span>
            <h2>Três passos</h2>
            <span className="secao-linha" aria-hidden="true" />
          </Reveal>

          <div className="passos">
            {PASSOS.map((p, i) => {
              const Icone = p.icone;
              return (
                <Reveal as="article" className="passo" key={p.titulo} delay={i * 110}>
                  <span className="passo-icone">
                    <Icone size={22} strokeWidth={2} />
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
