import { useEffect, useState } from "react";
import {
  Map,
  Gauge,
  TrendingDown,
  Users,
  Globe,
  Database,
  ChevronDown,
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Contador from "../components/Contador";
import BarraProgresso from "../components/BarraProgresso";
import SideDots from "../components/SideDots";
import Loader from "../components/Loader";
import Carrossel from "../components/Carrossel";
import MapaDestaque from "../components/MapaDestaque";
import ComoFunciona from "../components/ComoFunciona";
import CircularCards from "../components/ui/CircularCards";
import "./LandingPage.css";

const NATUREZA = [
  {
    img: "/tocantinscarrossel2.jpg",
    tag: "Cerrado",
    titulo: "Onde a serra encontra a savana",
    texto:
      "Chapadas e palmeiras de buriti formam a paisagem do cerrado tocantinense — a savana mais biodiversa do planeta.",
  },
  {
    img: "/tocantinscarrosel.jpg",
    tag: "Águas",
    titulo: "Águas que brotam do cerrado",
    texto:
      "Fervedouros e corredeiras de águas cristalinas nascem da rocha e alimentam grandes bacias do Brasil.",
  },
  {
    img: "/tocantinscarrossel4.jpg",
    tag: "Rios",
    titulo: "Praias de água doce",
    texto:
      "Rios e lagos de águas claras viram praia no coração do país, cercados pelas serras do estado.",
  },
  {
    img: "/tocantinscarrossel3.jpg",
    tag: "Cachoeiras",
    titulo: "Quedas escondidas nos paredões",
    texto:
      "Cachoeiras surgem entre paredões de rocha e mata — refúgios da riqueza natural do Tocantins.",
  },
  {
    img: "/tocantinscarrossel1.jpg",
    tag: "Biodiversidade",
    titulo: "Refúgios de vida",
    texto:
      "Lagoas e palmeirais abrigam fauna e flora que dependem de cada hectare mantido em pé.",
  },
  {
    img: "/tocantinscarrossel5.jpg",
    tag: "Jalapão",
    titulo: "Serras que guardam nascentes",
    texto:
      "Os relevos do Jalapão protegem as nascentes que sustentam a vida por todo o território.",
  },
  {
    img: "/tocantinscarrossel6.jpg",
    tag: "Futuro",
    titulo: "Um convite à preservação",
    texto:
      "Cada hectare preservado é água, clima e futuro. É isso que o YBY ajuda a proteger.",
  },
];

const RECURSOS = [
  {
    id: 1,
    icone: Map,
    imagem: "/sobre1.jpg",
    titulo: "Mapa de monitoramento",
    subtitulo: "Visualização territorial",
    descricao:
      "Os 139 municípios do Tocantins coloridos por urgência de investimento, com prioridade objetiva.",
    detalhes: [
      "139 municípios mapeados",
      "Prioridade visual por urgência",
      "Semáforo verde, amarelo e vermelho",
      "Atualizado com dados reais",
    ],
    href: "/municipios",
  },
  {
    id: 2,
    icone: Gauge,
    imagem: "/sobre2.jpg",
    titulo: "Semáforo de decisão",
    subtitulo: "Decisão baseada em dados",
    descricao:
      "Decisão baseada em dados para orientar onde o investimento ambiental gera mais impacto.",
    detalhes: [
      "Classificação por prioridade",
      "Indicadores consolidados",
      "Apoio à tomada de decisão",
      "Visualização simples e objetiva",
    ],
    href: "/municipios",
  },
  {
    id: 3,
    icone: TrendingDown,
    imagem: "/sobre3.jpg",
    titulo: "Detecção de desperdício",
    subtitulo: "Eficiência do gasto público",
    descricao:
      "Eficiência do gasto público com identificação de áreas de maior risco e menor retorno.",
    detalhes: [
      "Análise de gasto público",
      "Identificação de desperdícios",
      "Apoio à fiscalização",
      "Melhor uso dos recursos",
    ],
    href: "/indicadores",
  },
];

const IMPACTOS = [
  { icone: Map,      valor: 139,                      rotulo: "Municípios monitorados" },
  { icone: Users,    textoFixo: "1,58 milhão",         rotulo: "de habitantes impactados" },
  { icone: Globe,    valor: 277, sufixo: " mil km²",   rotulo: "de território analisável" },
  { icone: Database, valor: 8,                         rotulo: "bases públicas integradas automaticamente" },
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
      <SideDots />
      <LandingNavbar />

      {/* HERO (cinematográfico) */}
      <header className="hero">
        <video
          className="hero-video"
          src="/jalapao.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{
            transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1.16 + Math.min(scrollY, 900) * 0.0004})`,
          }}
        />
        <div
          className="hero-conteudo"
          style={{
            opacity: Math.max(0, 1 - scrollY / 480),
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <h1 className="hero-titulo">
            <span className="hero-yby">YBY</span>
            <span className="hero-sub-titulo">Gestão Ambiental</span>
          </h1>
          <p className="hero-frase">
            Inteligência que transforma dados em proteção para o Tocantins.
          </p>
          <div className="hero-acoes">
            <a href="#sobre" className="hero-btn">
              Conhecer o YBY <ChevronDown size={17} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <a
          href="#sobre"
          className="hero-scroll"
          aria-label="Rolar para baixo"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <ChevronDown size={24} strokeWidth={1.75} />
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
              <strong>Yby</strong> significa "terra" em tupi. É a plataforma de
              priorização do programa JREDD+ que reúne desmatamento,
              conformidade, gasto público e risco em um índice único — para que o
              investimento ambiental do Tocantins seja aplicado onde gera mais
              impacto.
            </p>
          </Reveal>

          <CircularCards cards={RECURSOS} />
        </div>
      </section>

      {/* MAPA INTERATIVO (destaque) */}
      <section id="mapa" className="secao secao--cinza">
        <div className="secao-inner mapa-destaque">
          <Reveal as="div" className="mapa-destaque-mapa" direcao="left">
            <MapaDestaque />
          </Reveal>
          <Reveal className="mapa-destaque-texto" direcao="right">
            <span className="secao-tag">Mapa interativo</span>
            <h2>Conheça o Tocantins, região por região</h2>
            <span className="secao-linha" aria-hidden="true" />
            <p className="secao-lead">
              São 139 municípios em um só território. Passe o mouse pelo mapa e
              explore o estado — a mesma base que, dentro do sistema, se
              transforma em prioridade de investimento ambiental.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NATUREZA / POR QUE ISSO IMPORTA */}
      <section id="natureza" className="secao secao--cinza">
        <div className="secao-inner">
          <Reveal>
            <span className="secao-tag">A natureza do Tocantins</span>
            <h2>Por que isso importa</h2>
            <span className="secao-linha" aria-hidden="true" />
            <p className="secao-lead">
              O Tocantins é coração do cerrado e faz parte também da Amazônia Legal — uma região com alta biodiversidade 
              e a origem das águas que abastecem o Brasil. Proteger esse
              território é garantir clima, água e futuro. O YBY existe para que
              cada real investido chegue onde mais protege essa riqueza.
            </p>
          </Reveal>
          <Reveal>
            <Carrossel slides={NATUREZA} />
          </Reveal>
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
              monitorar e cobrar resultado.
            </p>
          </Reveal>

          <div className="impactos">
            {IMPACTOS.map((item, idx) => {
              const Icone = item.icone;
              return (
                <Reveal as="div" className="impacto reveal-shine" key={item.rotulo} delay={idx * 110}>
                  <Icone size={34} strokeWidth={1.5} className="impacto-icone" />
                  <strong className="impacto-valor">
                    {item.textoFixo
                      ? item.textoFixo
                      : <Contador valor={item.valor} prefixo={item.prefixo} sufixo={item.sufixo} />
                    }
                  </strong>
                  <span className="impacto-rotulo">{item.rotulo}</span>
                </Reveal>
              );
            })}
          </div>
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
            <Reveal as="div" className="mudanca-wrapper mudanca-wrapper--antes" direcao="left">
              <div className="mudanca mudanca--antes">
                <div className="mudanca-topo" />
                <div className="mudanca-corpo">
                  <h4>Antes</h4>
                  <ul>
                    <li>Dados espalhados em planilhas e relatórios soltos</li>
                    <li>Investimento sem visão de risco ou retorno</li>
                    <li>Desperdício difícil de enxergar</li>
                    <li>Decisões lentas e pouco transparentes</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal as="div" className="mudanca-wrapper mudanca-wrapper--depois" direcao="right">
              <div className="mudanca mudanca--depois">
                <div className="mudanca-topo" />
                <div className="mudanca-corpo">
                  <h4>Com o YBY</h4>
                  <ul>
                    <li>Visão única do estado, atualizada e comparável</li>
                    <li>Prioridade objetiva por risco, retorno e conformidade</li>
                    <li>Alertas de desperdício para realocar recursos</li>
                    <li>Decisão em minutos, com trilha clara de evidências</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (scrollytelling) */}
      <ComoFunciona />

      {/* INICIATIVA DO GOVERNO (destaque) */}
      <section id="iniciativa" className="secao secao-iniciativa">
        <div className="secao-inner iniciativa-inner">
          <Reveal>
            <span className="secao-tag">Iniciativa oficial</span>
            <h2>Um compromisso do Estado do Tocantins</h2>
            <span className="secao-linha iniciativa-linha" aria-hidden="true" />
            <p className="secao-lead iniciativa-lead">
              O YBY é uma iniciativa do <strong>Governo do Tocantins</strong>,
              conduzida pela <strong>Secretaria do Meio Ambiente e Recursos
              Hídricos</strong>, para transformar o investimento ambiental em
              política pública transparente, eficiente e baseada em evidências —
              colocando a tecnologia a serviço da preservação do cerrado e da Amazônia.
            </p>
            <div className="iniciativa-logos">
              <img src="/governotocantins.webp" alt="Governo do Tocantins" />
              <span className="iniciativa-sep" aria-hidden="true" />
              <img
                src="/secretaria.png"
                alt="Secretaria do Meio Ambiente e Recursos Hídricos"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
