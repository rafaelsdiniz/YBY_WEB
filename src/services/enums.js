// Enums do backend (mercado de carbono / plano safra / projetos) e rotulos
// amigaveis para exibir e popular <Select>. Mantem os valores exatamente como a
// API espera; o `rotulo` e so apresentacao.

export const CREDITO_STATUS = {
  PLANEJADO: "Planejado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export const INSTITUICAO_TIPO = {
  CERTIFICADORA: "Certificadora",
  COMPRADORA: "Compradora",
  MARKETPLACE: "Marketplace",
  VERIFICADORA: "Verificadora",
  FUNDO: "Fundo",
  REGISTRO: "Registro",
};

export const PADRAO_CERTIFICACAO = {
  VERRA_VCS: "Verra (VCS)",
  GOLD_STANDARD: "Gold Standard",
  CERCARBONO: "Cercarbono",
  PLANVIVO: "Plan Vivo",
  ART_TREES: "ART TREES",
  CAR: "CAR",
  OUTRO: "Outro",
};

export const PROJETO_STATUS = {
  PLANEJADO: "Planejado",
  EM_EXECUCAO: "Em execução",
  SUSPENSO: "Suspenso",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
};

export const MARCO_STATUS = {
  PENDENTE: "Pendente",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Concluído",
  ATRASADO: "Atrasado",
};

export const PROGRAMA_SAFRA = {
  ABC_MAIS: "ABC+",
  RENOVAGRO: "RenovAgro",
  PRONAF: "Pronaf",
  PRONAMP: "Pronamp",
  INOVAGRO: "Inovagro",
  MODERAGRO: "Moderagro",
  OUTRO: "Outro",
};

export const BIOMA = {
  AMAZONIA: "Amazônia",
  CERRADO: "Cerrado",
  PANTANAL: "Pantanal",
};

// Converte um mapa { VALOR: "Rotulo" } em options p/ o componente Select.
export const opcoes = (mapa) =>
  Object.entries(mapa).map(([value, label]) => ({ value, label }));

// Rotulo seguro (cai no proprio valor se nao mapeado).
export const rotulo = (mapa, valor) => (valor == null ? "—" : mapa[valor] ?? valor);
