import { motion } from "framer-motion";
import { Map, Gauge, TrendingDown, CheckCircle } from "lucide-react";
import "./FlipCardGallery.css";

const CARDS = [
  {
    icone: Map,
    titulo: "Mapa de prioridade",
    descricao:
      "Os 139 municípios do Tocantins coloridos por urgência de investimento, com prioridade objetiva.",
    detalhes: [
      "139 municípios mapeados",
      "Prioridade visual por urgência",
      "Semáforo verde, amarelo e vermelho",
      "Atualizado com dados reais",
    ],
    destaque: true,
  },
  {
    icone: Gauge,
    titulo: "Semáforo de decisão",
    descricao:
      "Decisão baseada em dados para orientar onde o investimento ambiental gera mais impacto.",
    detalhes: [
      "Classificação por prioridade",
      "Indicadores consolidados",
      "Apoio à tomada de decisão",
      "Visualização simples e objetiva",
    ],
    destaque: false,
  },
  {
    icone: TrendingDown,
    titulo: "Detecção de desperdício",
    descricao:
      "Eficiência do gasto público com identificação de áreas de maior risco e menor retorno.",
    detalhes: [
      "Análise de gasto público",
      "Identificação de desperdícios",
      "Apoio à fiscalização",
      "Melhor uso dos recursos",
    ],
    destaque: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.13,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function FlipCardGallery() {
  return (
    <section id="sobre" className="fcg-section" aria-labelledby="fcg-titulo">
      <div className="fcg-inner">
        <motion.div
          className="fcg-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="fcg-tag">O que o YBY oferece</span>
          <h2 id="fcg-titulo" className="fcg-titulo">
            Inteligência para o<br />
            investimento ambiental
          </h2>
          <p className="fcg-subtitulo">
            Três camadas de análise que transformam dados dispersos em decisões
            claras, rápidas e baseadas em evidências.
          </p>
        </motion.div>

        <div className="fcg-grid">
          {CARDS.map((card, i) => {
            const Icone = card.icone;
            return (
              <motion.div
                key={card.titulo}
                className="fcg-card-outer"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* perspectiva e trigger de hover ficam aqui */}
                <div className={`fcg-card${card.destaque ? " fcg-card--destaque" : ""}`}>
                  <div className="fcg-card-inner">
                    {/* FRENTE */}
                    <div className="fcg-face fcg-face--frente">
                      <span className="fcg-icone-wrap">
                        <Icone size={26} strokeWidth={1.8} />
                      </span>
                      <h3 className="fcg-card-titulo">{card.titulo}</h3>
                      <p className="fcg-card-desc">{card.descricao}</p>
                      <span className="fcg-hint" aria-hidden="true">
                        Passe o mouse para ver detalhes →
                      </span>
                    </div>

                    {/* VERSO */}
                    <div className="fcg-face fcg-face--verso">
                      <h3 className="fcg-verso-titulo">{card.titulo}</h3>
                      <ul className="fcg-lista" role="list">
                        {card.detalhes.map((d) => (
                          <li key={d} className="fcg-lista-item">
                            <CheckCircle
                              size={15}
                              strokeWidth={2.5}
                              className="fcg-check"
                              aria-hidden="true"
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
