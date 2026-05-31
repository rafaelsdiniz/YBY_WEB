import {
  BookOpen, Server, Building2, LayoutGrid,
  Leaf, BarChart2, BrainCircuit, FileText,
  Gauge, Cloud, Coins, FolderKanban, Sprout,
  Map as MapIcon, Users, Database,
  Globe, Satellite, TreePine, Layers,
  FlaskConical, ShieldCheck, Link as LinkIcon,
} from "lucide-react";
import "./MetadadosPage.css";
import "./Paineis.css";

/* ── Dados ──────────────────────────────────────────── */

const GLOSSARIO = [
  {
    sigla: "CAR",
    nome: "Cadastro Ambiental Rural",
    def: "Registro eletrônico obrigatório para imóveis rurais, contendo informações georreferenciadas da propriedade.",
  },
  {
    sigla: "REDD+",
    nome: "Redução de Emissões por Desmatamento e Degradação",
    def: "Mecanismo internacional que recompensa países em desenvolvimento por reduzirem o desmatamento.",
  },
  {
    sigla: "tCO₂e",
    nome: "Toneladas de CO₂ Equivalente",
    def: "Unidade padrão para medir emissões de gases de efeito estufa, convertidas em equivalentes de dióxido de carbono.",
  },
  {
    sigla: "GEE",
    nome: "Gases de Efeito Estufa",
    def: "Gases que retêm calor na atmosfera: CO₂, CH₄, N₂O e outros. Monitorados pelo sistema YBY.",
  },
  {
    sigla: "Score",
    nome: "Score de Prioridade",
    def: "Índice calculado de 0 a 100 que indica o grau de urgência de intervenção ambiental em um município.",
  },
  {
    sigla: "KPI",
    nome: "Retorno por Real Investido",
    def: "Indicador de eficiência do gasto público ambiental: área preservada por cada R$ 1 aplicado.",
  },
  {
    sigla: "Semáforo",
    nome: "Semáforo Ambiental",
    def: "Classificação visual (verde/amarelo/vermelho) que representa o status de risco ambiental de um município.",
  },
  {
    sigla: "PRODES",
    nome: "Programa de Monitoramento do Desmatamento",
    def: "Sistema do INPE que mede anualmente as taxas de desmatamento na Amazônia e Cerrado.",
  },
  {
    sigla: "APP",
    nome: "Área de Preservação Permanente",
    def: "Área protegida pelo Código Florestal Brasileiro, como margens de rios e topos de morro.",
  },
  {
    sigla: "RL",
    nome: "Reserva Legal",
    def: "Percentual mínimo de vegetação nativa que toda propriedade rural deve manter, conforme bioma.",
  },
  {
    sigla: "WMS",
    nome: "Web Map Service",
    def: "Padrão OGC para servir mapas georreferenciados via protocolo HTTP, usado no Geoportal.",
  },
  {
    sigla: "IBGE",
    nome: "Código Municipal IBGE",
    def: "Identificador único de sete dígitos atribuído pelo IBGE a cada município brasileiro.",
  },
];

const APIS = [
  {
    nome: "YBY API",
    endpoint: "VITE_API_URL /api/v1",
    desc: "Backend principal do sistema. Expõe endpoints RESTful para municípios, indicadores, emissões de carbono, créditos, projetos REDD+, plano safra e autenticação JWT.",
    tag: "interno",
    tagLabel: "Interno",
    cor: "verde",
    icone: <Server size={20} />,
  },
  {
    nome: "INPE — PRODES / TerraBrasilis",
    endpoint: "terrabrasilis.dpi.inpe.br",
    desc: "Fornece séries históricas de desmatamento por município, dados de alertas DETER e incrementos anuais do Cerrado e Amazônia.",
    tag: "rest",
    tagLabel: "REST",
    cor: "azul",
    icone: <Satellite size={20} />,
  },
  {
    nome: "IBGE — Malha Municipal",
    endpoint: "servicodados.ibge.gov.br",
    desc: "Fornece o GeoJSON com os limites geográficos dos municípios do Tocantins, usado no mapa interativo e no Geoportal.",
    tag: "rest",
    tagLabel: "REST",
    cor: "laranja",
    icone: <Globe size={20} />,
  },
  {
    nome: "MapBiomas",
    endpoint: "plataforma.mapbiomas.org",
    desc: "Cobertura e uso do solo por classe de vegetação, derivada de imagens de satélite com resolução anual desde 1985.",
    tag: "rest",
    tagLabel: "REST",
    cor: "roxo",
    icone: <Layers size={20} />,
  },
  {
    nome: "Geoserver — WMS/WFS",
    endpoint: "geoserver.semar.to.gov.br",
    desc: "Servidor de mapas da SEMAR-TO. Disponibiliza camadas georreferenciadas de unidades de conservação, APPs e zoneamento ambiental.",
    tag: "wms",
    tagLabel: "WMS",
    cor: "ciano",
    icone: <MapIcon size={20} />,
  },
  {
    nome: "CAR — Sistema Nacional",
    endpoint: "car.gov.br / sicar.gov.br",
    desc: "Base de dados do Cadastro Ambiental Rural. Permite consultar irregularidades e status de regularização das propriedades rurais.",
    tag: "rest",
    tagLabel: "REST",
    cor: "rosa",
    icone: <TreePine size={20} />,
  },
];

const ORGAOS = [
  {
    sigla: "SEMAR-TO",
    nome: "Secretaria de Meio Ambiente e Recursos Hídricos do Tocantins",
    papel: "Órgão gestor do sistema YBY. Responsável pelo monitoramento ambiental estadual e pela operação do Geoportal.",
    esfera: "estadual",
  },
  {
    sigla: "INPE",
    nome: "Instituto Nacional de Pesquisas Espaciais",
    papel: "Fornece dados de desmatamento (PRODES/DETER) e alertas de degradação florestal usados nos painéis e relatórios.",
    esfera: "ciencia",
  },
  {
    sigla: "IBGE",
    nome: "Instituto Brasileiro de Geografia e Estatística",
    papel: "Provê malha municipal, códigos IBGE e dados socioeconômicos integrados aos indicadores do sistema.",
    esfera: "federal",
  },
  {
    sigla: "IBAMA",
    nome: "Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis",
    papel: "Fiscalização ambiental federal, autuações e embargos de áreas desmatadas. Dados integrados ao painel de emissões.",
    esfera: "federal",
  },
  {
    sigla: "MMA",
    nome: "Ministério do Meio Ambiente e Mudança do Clima",
    papel: "Define as metas nacionais de REDD+ e créditos de carbono e provê diretrizes para o Plano Nacional de Carbono.",
    esfera: "federal",
  },
  {
    sigla: "MAPA",
    nome: "Ministério da Agricultura, Pecuária e Abastecimento",
    papel: "Gestor do Plano Safra nacional. Fornece dados de crédito rural e índices agrícolas integrados ao módulo Plano Safra.",
    esfera: "federal",
  },
  {
    sigla: "ICMBio",
    nome: "Instituto Chico Mendes de Conservação da Biodiversidade",
    papel: "Administra unidades de conservação federais no Tocantins. Camadas espaciais disponíveis no Geoportal.",
    esfera: "federal",
  },
  {
    sigla: "FUNAI",
    nome: "Fundação Nacional dos Povos Indígenas",
    papel: "Fornece dados de terras indígenas demarcadas, essenciais para o georreferenciamento e cálculo de áreas elegíveis.",
    esfera: "federal",
  },
];

const PAGINAS = [
  {
    nome: "Painel",
    rota: "/painel",
    desc: "Visão geral do monitoramento ambiental do Tocantins, com mapa interativo, semáforos municipais e rankings de prioridade.",
    cor: "verde",
    icone: <BarChart2 size={20} />,
    dados: [
      "Mapa coroplético dos 139 municípios por score",
      "Semáforo ambiental (verde / amarelo / vermelho)",
      "Ranking de prioridades por score",
      "Distribuição de biomas e áreas de risco",
    ],
    fonte: "YBY API · INPE PRODES",
  },
  {
    nome: "Indicadores",
    rota: "/indicadores",
    desc: "KPIs de gasto público ambiental por município e período, com histórico de eficiência e retorno por real investido.",
    cor: "azul",
    icone: <BarChart2 size={20} />,
    dados: [
      "Gasto público ambiental (R$)",
      "Retorno por real investido (ha/R$)",
      "Histórico de indicadores por ano",
      "Comparativos entre municípios",
    ],
    fonte: "YBY API · SICONFI",
  },
  {
    nome: "Inteligência",
    rota: "/inteligencia",
    desc: "Assistente de inteligência artificial para análise ambiental, geração de insights e resposta a perguntas sobre os dados do sistema.",
    cor: "roxo",
    icone: <BrainCircuit size={20} />,
    dados: [
      "Chat contextualizado com dados ambientais",
      "Geração de análises automáticas",
      "Recomendações de ações prioritárias",
      "Interpretação de tendências",
    ],
    fonte: "YBY API · LLM",
  },
  {
    nome: "Relatórios",
    rota: "/relatorios",
    desc: "Exportação de relatórios analíticos em PDF por município, consolidando indicadores, histórico e recomendações de gestão.",
    cor: "laranja",
    icone: <FileText size={20} />,
    dados: [
      "Relatórios individuais por município",
      "KPIs consolidados por período",
      "Histórico de desmatamento em gráficos",
      "Exportação em PDF institucional",
    ],
    fonte: "YBY API",
  },
  {
    nome: "Painel de Carbono",
    rota: "/carbono/painel",
    desc: "Dashboard executivo com as emissões de GEE do Tocantins, créditos negociados e evolução temporal das metas climáticas.",
    cor: "ciano",
    icone: <Gauge size={20} />,
    dados: [
      "Total de emissões (tCO₂e) por período",
      "Créditos gerados vs. metas",
      "Evolução mensal/anual das emissões",
      "KPIs executivos de descarbonização",
    ],
    fonte: "YBY API · MMA",
  },
  {
    nome: "Emissões",
    rota: "/carbono",
    desc: "Registro e consulta das emissões de gases de efeito estufa por fonte emissora, setor e município.",
    cor: "lima",
    icone: <Cloud size={20} />,
    dados: [
      "Emissões por fonte (agropecuária, energia, resíduos)",
      "Filtros por município e período",
      "Cadastro de novas emissões (gestores)",
      "Séries históricas comparativas",
    ],
    fonte: "YBY API · INPE",
  },
  {
    nome: "Créditos de Carbono",
    rota: "/creditos-carbono",
    desc: "Gestão dos créditos de carbono gerados por projetos de conservação, com controle de emissão e rastreabilidade.",
    cor: "verde",
    icone: <Coins size={20} />,
    dados: [
      "Créditos emitidos, pendentes e utilizados",
      "Vinculação a projetos e municípios",
      "Status de validação por órgão",
      "Histórico de transações",
    ],
    fonte: "YBY API",
  },
  {
    nome: "Instituições",
    rota: "/instituicoes-carbono",
    desc: "Cadastro das instituições parceiras no mercado voluntário de carbono do Tocantins.",
    cor: "azul",
    icone: <Building2 size={20} />,
    dados: [
      "Cadastro de instituições públicas e privadas",
      "Tipo e categoria institucional",
      "Vínculos com projetos e créditos",
    ],
    fonte: "YBY API",
  },
  {
    nome: "Projetos JREDD+",
    rota: "/projetos",
    desc: "Gestão dos projetos de Redução de Emissões por Desmatamento e Degradação Florestal com componente de populações locais.",
    cor: "roxo",
    icone: <FolderKanban size={20} />,
    dados: [
      "Projetos cadastrados por status e município",
      "Área elegível e meta de redução",
      "Responsáveis e prazos",
      "Créditos vinculados ao projeto",
    ],
    fonte: "YBY API · MMA",
  },
  {
    nome: "Plano Safra",
    rota: "/plano-safra",
    desc: "Monitoramento ambiental integrado ao crédito rural do Plano Safra, com indicadores de conformidade ambiental por município.",
    cor: "lima",
    icone: <Sprout size={20} />,
    dados: [
      "Crédito rural liberado vs. metas ambientais",
      "Conformidade do CAR por produtor",
      "Indicadores de sustentabilidade agropecuária",
      "Municípios com restrição de crédito",
    ],
    fonte: "YBY API · MAPA · CAR",
  },
  {
    nome: "Geoportal",
    rota: "/geoportal",
    desc: "Mapa interativo com camadas georreferenciadas de cobertura vegetal, unidades de conservação, terras indígenas e alertas de desmatamento.",
    cor: "ciano",
    icone: <MapIcon size={20} />,
    dados: [
      "Camadas WMS da SEMAR-TO",
      "Alertas DETER em tempo quase real",
      "Unidades de conservação estaduais e federais",
      "Área de APP e Reserva Legal",
    ],
    fonte: "Geoserver SEMAR · INPE · ICMBio",
  },
];

/* ── Componentes auxiliares ─────────────────────────── */

function Secao({ icone, titulo, badge, children }) {
  return (
    <section className="card section-gap">
      <div className="meta-secao">
        <div className="meta-secao-icone">{icone}</div>
        <h2 className="meta-secao-titulo">{titulo}</h2>
        {badge && <span className="meta-secao-badge">{badge} itens</span>}
      </div>
      {children}
    </section>
  );
}

/* ── Page ───────────────────────────────────────────── */

export default function MetadadosPage() {
  return (
    <div className="section-gap">
      {/* Banner */}
      <div className="meta-banner">
        <div className="meta-banner-icon">
          <Database size={30} />
        </div>
        <div className="meta-banner-texto">
          <h1>Metadados do Sistema</h1>
          <p>
            Documentação técnica e institucional dos dados utilizados pelo YBY — plataforma de
            monitoramento ambiental do Tocantins. Inclui glossário, APIs integradas, órgãos
            parceiros e descrição detalhada do conteúdo de cada módulo.
          </p>
        </div>
        <div className="meta-banner-chips">
          <span className="meta-chip"><Leaf size={12} /> Tocantins</span>
          <span className="meta-chip"><ShieldCheck size={12} /> Dados abertos</span>
          <span className="meta-chip"><LinkIcon size={12} /> 6 APIs</span>
        </div>
      </div>

      {/* Glossário */}
      <Secao icone={<BookOpen size={18} />} titulo="Glossário" badge={GLOSSARIO.length}>
        <div className="glossario-grid">
          {GLOSSARIO.map((t) => (
            <div key={t.sigla} className="glossario-card">
              <div className="glossario-termo">
                <span className="glossario-termo-sigla">{t.sigla}</span>
                <p className="glossario-nome">{t.nome}</p>
              </div>
              <p className="glossario-def">{t.def}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* APIs */}
      <Secao icone={<Server size={18} />} titulo="APIs Utilizadas" badge={APIS.length}>
        <div className="apis-lista">
          {APIS.map((a) => (
            <div key={a.nome} className="api-card">
              <div className={`api-icone api-icone--${a.cor}`}>{a.icone}</div>
              <div className="api-info">
                <p className="api-nome">{a.nome}</p>
                <span className="api-endpoint">{a.endpoint}</span>
                <p className="api-desc">{a.desc}</p>
                <span className={`api-tag api-tag--${a.tag}`}>{a.tagLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </Secao>

      {/* Órgãos */}
      <Secao icone={<Building2 size={18} />} titulo="Órgãos Estaduais e Federais" badge={ORGAOS.length}>
        <div className="orgaos-grid">
          {ORGAOS.map((o) => (
            <div key={o.sigla} className="orgao-card">
              <div className={`orgao-emblema orgao-emblema--${o.esfera === "estadual" ? "estadual" : o.esfera === "ciencia" ? "ciencia" : "federal"}`}>
                {o.sigla.split("-")[0].slice(0, 5)}
              </div>
              <div className="orgao-info">
                <p className="orgao-sigla">{o.sigla}</p>
                <p className="orgao-nome-completo">{o.nome}</p>
                <p className="orgao-papel">{o.papel}</p>
                <span className={`orgao-esfera orgao-esfera--${o.esfera === "estadual" ? "estadual" : o.esfera === "ciencia" ? "ciencia" : "federal"}`}>
                  {o.esfera === "estadual" ? "Estadual" : o.esfera === "ciencia" ? "Pesquisa" : "Federal"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Secao>

      {/* Páginas */}
      <Secao icone={<LayoutGrid size={18} />} titulo="O que cada página apresenta" badge={PAGINAS.length}>
        <div className="paginas-grid">
          {PAGINAS.map((p) => (
            <div key={p.rota} className={`pagina-card pagina-card--${p.cor}`}>
              <div className="pagina-card-header">
                <div className={`pagina-icone pagina-icone--${p.cor}`}>{p.icone}</div>
                <div>
                  <p className="pagina-nome">{p.nome}</p>
                  <span className="pagina-rota">{p.rota}</span>
                </div>
              </div>
              <p className="pagina-desc">{p.desc}</p>
              <ul className="pagina-dados">
                {p.dados.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <div className="pagina-fonte">
                <Database size={11} />
                {p.fonte}
              </div>
            </div>
          ))}
        </div>
      </Secao>
    </div>
  );
}
