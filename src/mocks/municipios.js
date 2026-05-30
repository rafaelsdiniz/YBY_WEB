// Dados de exemplo (mocks) — municípios reais do Tocantins, números fictícios.
// Substituídos pela API Spring quando USE_MOCK virar false em services/api.js.
export const MUNICIPIOS_MOCK = [
  {
    id: "1721000", nome: "Palmas", prioridade: 82, semaforo: "AMARELO",
    notaRisco: 45, gastoPublico: 12000000, retornoPorReal: 0.7, desperdicio: false,
    reducaoDesmatamento: 18, conformidade: 64,
    pendencias: ["Pendência de CAR em análise"],
    serieDesmatamento: [
      { ano: 2021, valor: 120 }, { ano: 2022, valor: 105 },
      { ano: 2023, valor: 98 }, { ano: 2024, valor: 80 },
    ],
  },
  {
    id: "1702109", nome: "Araguaína", prioridade: 91, semaforo: "VERMELHO",
    notaRisco: 78, gastoPublico: 9000000, retornoPorReal: 0.2, desperdicio: true,
    reducaoDesmatamento: 4, conformidade: 38,
    pendencias: ["Embargo ativo do IBAMA", "Alto desmatamento recente (DETER)"],
    serieDesmatamento: [
      { ano: 2021, valor: 210 }, { ano: 2022, valor: 230 },
      { ano: 2023, valor: 225 }, { ano: 2024, valor: 220 },
    ],
  },
  {
    id: "1709500", nome: "Gurupi", prioridade: 40, semaforo: "VERDE",
    notaRisco: 22, gastoPublico: 4000000, retornoPorReal: 1.3, desperdicio: false,
    reducaoDesmatamento: 31, conformidade: 81,
    pendencias: [],
    serieDesmatamento: [
      { ano: 2021, valor: 60 }, { ano: 2022, valor: 48 },
      { ano: 2023, valor: 35 }, { ano: 2024, valor: 28 },
    ],
  },
  {
    id: "1718204", nome: "Porto Nacional", prioridade: 67, semaforo: "AMARELO",
    notaRisco: 51, gastoPublico: 6500000, retornoPorReal: 0.6, desperdicio: false,
    reducaoDesmatamento: 14, conformidade: 59,
    pendencias: ["Reserva Legal abaixo do exigido em parte das áreas"],
    serieDesmatamento: [
      { ano: 2021, valor: 95 }, { ano: 2022, valor: 88 },
      { ano: 2023, valor: 82 }, { ano: 2024, valor: 74 },
    ],
  },
  {
    id: "1716109", nome: "Paraíso do Tocantins", prioridade: 35, semaforo: "VERDE",
    notaRisco: 19, gastoPublico: 3200000, retornoPorReal: 1.5, desperdicio: false,
    reducaoDesmatamento: 37, conformidade: 86,
    pendencias: [],
    serieDesmatamento: [
      { ano: 2021, valor: 40 }, { ano: 2022, valor: 33 },
      { ano: 2023, valor: 25 }, { ano: 2024, valor: 20 },
    ],
  },
  {
    id: "1711902", nome: "Lagoa da Confusão", prioridade: 88, semaforo: "VERMELHO",
    notaRisco: 73, gastoPublico: 7800000, retornoPorReal: 0.3, desperdicio: true,
    reducaoDesmatamento: 6, conformidade: 41,
    pendencias: ["Sobreposição com área protegida", "Embargo ativo"],
    serieDesmatamento: [
      { ano: 2021, valor: 180 }, { ano: 2022, valor: 195 },
      { ano: 2023, valor: 188 }, { ano: 2024, valor: 175 },
    ],
  },
];
