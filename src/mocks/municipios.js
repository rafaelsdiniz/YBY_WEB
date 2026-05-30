// Dados de exemplo (mock) dos 139 municípios do Tocantins.
// Os 6 primeiros são curados; os demais são sintéticos (determinísticos por
// código IBGE) só para a demonstração — viram dados reais da API depois.
export const MUNICIPIOS_MOCK = [
  {
    "id": "1700251",
    "nome": "Abreulândia",
    "prioridade": 33,
    "semaforo": "AMARELO",
    "notaRisco": 46,
    "gastoPublico": 4967856,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 34,
    "conformidade": 81,
    "pendencias": [
      "Notificação ambiental pendente"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 165
      },
      {
        "ano": 2022,
        "valor": 162
      },
      {
        "ano": 2023,
        "valor": 149
      },
      {
        "ano": 2024,
        "valor": 141
      }
    ]
  },
  {
    "id": "1700301",
    "nome": "Aguiarnópolis",
    "prioridade": 56,
    "semaforo": "VERDE",
    "notaRisco": 38,
    "gastoPublico": 11757992,
    "retornoPorReal": 1.8,
    "desperdicio": false,
    "reducaoDesmatamento": 11,
    "conformidade": 36,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 161
      },
      {
        "ano": 2022,
        "valor": 137
      },
      {
        "ano": 2023,
        "valor": 121
      },
      {
        "ano": 2024,
        "valor": 97
      }
    ]
  },
  {
    "id": "1700350",
    "nome": "Aliança do Tocantins",
    "prioridade": 82,
    "semaforo": "VERMELHO",
    "notaRisco": 85,
    "gastoPublico": 11132324,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 25,
    "conformidade": 79,
    "pendencias": [
      "Alto desmatamento recente (DETER)",
      "Multa ambiental em aberto"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 87
      },
      {
        "ano": 2022,
        "valor": 93
      },
      {
        "ano": 2023,
        "valor": 92
      },
      {
        "ano": 2024,
        "valor": 97
      }
    ]
  },
  {
    "id": "1700400",
    "nome": "Almas",
    "prioridade": 18,
    "semaforo": "VERDE",
    "notaRisco": 21,
    "gastoPublico": 3922460,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 40,
    "conformidade": 88,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 98
      },
      {
        "ano": 2022,
        "valor": 87
      },
      {
        "ano": 2023,
        "valor": 81
      },
      {
        "ano": 2024,
        "valor": 62
      }
    ]
  },
  {
    "id": "1700707",
    "nome": "Alvorada",
    "prioridade": 46,
    "semaforo": "AMARELO",
    "notaRisco": 41,
    "gastoPublico": 12573891,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 72,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 46
      },
      {
        "ano": 2022,
        "valor": 45
      },
      {
        "ano": 2023,
        "valor": 44
      },
      {
        "ano": 2024,
        "valor": 37
      }
    ]
  },
  {
    "id": "1701002",
    "nome": "Ananás",
    "prioridade": 39,
    "semaforo": "AMARELO",
    "notaRisco": 45,
    "gastoPublico": 2235689,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 26,
    "conformidade": 78,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 95
      },
      {
        "ano": 2022,
        "valor": 87
      },
      {
        "ano": 2023,
        "valor": 82
      },
      {
        "ano": 2024,
        "valor": 79
      }
    ]
  },
  {
    "id": "1701051",
    "nome": "Angico",
    "prioridade": 59,
    "semaforo": "VERDE",
    "notaRisco": 36,
    "gastoPublico": 1610022,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 2,
    "conformidade": 67,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 32
      },
      {
        "ano": 2022,
        "valor": 24
      },
      {
        "ano": 2023,
        "valor": 19
      },
      {
        "ano": 2024,
        "valor": 22
      }
    ]
  },
  {
    "id": "1701101",
    "nome": "Aparecida do Rio Negro",
    "prioridade": 88,
    "semaforo": "VERMELHO",
    "notaRisco": 84,
    "gastoPublico": 8400157,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 76,
    "pendencias": [
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 133
      },
      {
        "ano": 2022,
        "valor": 138
      },
      {
        "ano": 2023,
        "valor": 141
      },
      {
        "ano": 2024,
        "valor": 153
      }
    ]
  },
  {
    "id": "1701309",
    "nome": "Aragominas",
    "prioridade": 63,
    "semaforo": "AMARELO",
    "notaRisco": 59,
    "gastoPublico": 10887120,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 40,
    "conformidade": 62,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 107
      },
      {
        "ano": 2022,
        "valor": 109
      },
      {
        "ano": 2023,
        "valor": 97
      },
      {
        "ano": 2024,
        "valor": 95
      }
    ]
  },
  {
    "id": "1701903",
    "nome": "Araguacema",
    "prioridade": 31,
    "semaforo": "VERDE",
    "notaRisco": 19,
    "gastoPublico": 5873928,
    "retornoPorReal": 0.4,
    "desperdicio": false,
    "reducaoDesmatamento": 24,
    "conformidade": 49,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 22
      },
      {
        "ano": 2022,
        "valor": 19
      },
      {
        "ano": 2023,
        "valor": 12
      },
      {
        "ano": 2024,
        "valor": 15
      }
    ]
  },
  {
    "id": "1702000",
    "nome": "Araguaçu",
    "prioridade": 45,
    "semaforo": "VERDE",
    "notaRisco": 30,
    "gastoPublico": 11206790,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 14,
    "conformidade": 59,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 89
      },
      {
        "ano": 2022,
        "valor": 78
      },
      {
        "ano": 2023,
        "valor": 68
      },
      {
        "ano": 2024,
        "valor": 64
      }
    ]
  },
  {
    "id": "1702109",
    "nome": "Araguaína",
    "prioridade": 91,
    "semaforo": "VERMELHO",
    "notaRisco": 78,
    "gastoPublico": 9000000,
    "retornoPorReal": 0.2,
    "desperdicio": true,
    "reducaoDesmatamento": 4,
    "conformidade": 38,
    "pendencias": [
      "Embargo ativo do IBAMA",
      "Alto desmatamento recente (DETER)"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 210
      },
      {
        "ano": 2022,
        "valor": 230
      },
      {
        "ano": 2023,
        "valor": 225
      },
      {
        "ano": 2024,
        "valor": 220
      }
    ]
  },
  {
    "id": "1702158",
    "nome": "Araguanã",
    "prioridade": 14,
    "semaforo": "VERDE",
    "notaRisco": 14,
    "gastoPublico": 6903618,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 22,
    "conformidade": 36,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 23
      },
      {
        "ano": 2022,
        "valor": 25
      },
      {
        "ano": 2023,
        "valor": 19
      },
      {
        "ano": 2024,
        "valor": 22
      }
    ]
  },
  {
    "id": "1702208",
    "nome": "Araguatins",
    "prioridade": 98,
    "semaforo": "VERMELHO",
    "notaRisco": 92,
    "gastoPublico": 13693753,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 37,
    "conformidade": 45,
    "pendencias": [
      "Multa ambiental em aberto",
      "Embargo ativo do IBAMA"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 132
      },
      {
        "ano": 2022,
        "valor": 135
      },
      {
        "ano": 2023,
        "valor": 145
      },
      {
        "ano": 2024,
        "valor": 151
      }
    ]
  },
  {
    "id": "1702307",
    "nome": "Arapoema",
    "prioridade": 15,
    "semaforo": "VERDE",
    "notaRisco": 18,
    "gastoPublico": 5858221,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 28,
    "conformidade": 43,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 19
      },
      {
        "ano": 2022,
        "valor": 23
      },
      {
        "ano": 2023,
        "valor": 12
      },
      {
        "ano": 2024,
        "valor": 14
      }
    ]
  },
  {
    "id": "1702406",
    "nome": "Arraias",
    "prioridade": 33,
    "semaforo": "VERDE",
    "notaRisco": 31,
    "gastoPublico": 12022689,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 19,
    "conformidade": 41,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 115
      },
      {
        "ano": 2022,
        "valor": 105
      },
      {
        "ano": 2023,
        "valor": 85
      },
      {
        "ano": 2024,
        "valor": 75
      }
    ]
  },
  {
    "id": "1702554",
    "nome": "Augustinópolis",
    "prioridade": 32,
    "semaforo": "VERDE",
    "notaRisco": 35,
    "gastoPublico": 3561490,
    "retornoPorReal": 0.3,
    "desperdicio": false,
    "reducaoDesmatamento": 24,
    "conformidade": 82,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 97
      },
      {
        "ano": 2022,
        "valor": 88
      },
      {
        "ano": 2023,
        "valor": 75
      },
      {
        "ano": 2024,
        "valor": 61
      }
    ]
  },
  {
    "id": "1702703",
    "nome": "Aurora do Tocantins",
    "prioridade": 16,
    "semaforo": "VERDE",
    "notaRisco": 9,
    "gastoPublico": 2516093,
    "retornoPorReal": 0.3,
    "desperdicio": false,
    "reducaoDesmatamento": 30,
    "conformidade": 89,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 93
      },
      {
        "ano": 2022,
        "valor": 86
      },
      {
        "ano": 2023,
        "valor": 68
      },
      {
        "ano": 2024,
        "valor": 54
      }
    ]
  },
  {
    "id": "1702901",
    "nome": "Axixá do Tocantins",
    "prioridade": 67,
    "semaforo": "AMARELO",
    "notaRisco": 59,
    "gastoPublico": 14845029,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 11,
    "conformidade": 84,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 67
      },
      {
        "ano": 2022,
        "valor": 64
      },
      {
        "ano": 2023,
        "valor": 54
      },
      {
        "ano": 2024,
        "valor": 53
      }
    ]
  },
  {
    "id": "1703008",
    "nome": "Babaçulândia",
    "prioridade": 53,
    "semaforo": "AMARELO",
    "notaRisco": 53,
    "gastoPublico": 10335919,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 5,
    "conformidade": 86,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 162
      },
      {
        "ano": 2022,
        "valor": 160
      },
      {
        "ano": 2023,
        "valor": 150
      },
      {
        "ano": 2024,
        "valor": 144
      }
    ]
  },
  {
    "id": "1703057",
    "nome": "Bandeirantes do Tocantins",
    "prioridade": 17,
    "semaforo": "VERDE",
    "notaRisco": 16,
    "gastoPublico": 9710251,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 19,
    "conformidade": 74,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 40
      },
      {
        "ano": 2022,
        "valor": 32
      },
      {
        "ano": 2023,
        "valor": 34
      },
      {
        "ano": 2024,
        "valor": 25
      }
    ]
  },
  {
    "id": "1703073",
    "nome": "Barra do Ouro",
    "prioridade": 35,
    "semaforo": "AMARELO",
    "notaRisco": 58,
    "gastoPublico": 2363095,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 24,
    "conformidade": 81,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 27
      },
      {
        "ano": 2022,
        "valor": 26
      },
      {
        "ano": 2023,
        "valor": 32
      },
      {
        "ano": 2024,
        "valor": 22
      }
    ]
  },
  {
    "id": "1703107",
    "nome": "Barrolândia",
    "prioridade": 87,
    "semaforo": "VERMELHO",
    "notaRisco": 64,
    "gastoPublico": 2500387,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 34,
    "conformidade": 83,
    "pendencias": [
      "Alto desmatamento recente (DETER)",
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 60
      },
      {
        "ano": 2022,
        "valor": 61
      },
      {
        "ano": 2023,
        "valor": 57
      },
      {
        "ano": 2024,
        "valor": 60
      }
    ]
  },
  {
    "id": "1703206",
    "nome": "Bernardo Sayão",
    "prioridade": 19,
    "semaforo": "VERDE",
    "notaRisco": 21,
    "gastoPublico": 8664855,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 25,
    "conformidade": 81,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 36
      },
      {
        "ano": 2022,
        "valor": 30
      },
      {
        "ano": 2023,
        "valor": 27
      },
      {
        "ano": 2024,
        "valor": 18
      }
    ]
  },
  {
    "id": "1703305",
    "nome": "Bom Jesus do Tocantins",
    "prioridade": 37,
    "semaforo": "VERDE",
    "notaRisco": 33,
    "gastoPublico": 14829322,
    "retornoPorReal": 0.4,
    "desperdicio": true,
    "reducaoDesmatamento": 16,
    "conformidade": 79,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 132
      },
      {
        "ano": 2022,
        "valor": 112
      },
      {
        "ano": 2023,
        "valor": 101
      },
      {
        "ano": 2024,
        "valor": 78
      }
    ]
  },
  {
    "id": "1703602",
    "nome": "Brasilândia do Tocantins",
    "prioridade": 20,
    "semaforo": "VERDE",
    "notaRisco": 11,
    "gastoPublico": 5322726,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 27,
    "conformidade": 72,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 109
      },
      {
        "ano": 2022,
        "valor": 91
      },
      {
        "ano": 2023,
        "valor": 83
      },
      {
        "ano": 2024,
        "valor": 67
      }
    ]
  },
  {
    "id": "1703701",
    "nome": "Brejinho de Nazaré",
    "prioridade": 39,
    "semaforo": "VERDE",
    "notaRisco": 24,
    "gastoPublico": 11487194,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 70,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 46
      },
      {
        "ano": 2022,
        "valor": 41
      },
      {
        "ano": 2023,
        "valor": 32
      },
      {
        "ano": 2024,
        "valor": 32
      }
    ]
  },
  {
    "id": "1703800",
    "nome": "Buriti do Tocantins",
    "prioridade": 71,
    "semaforo": "AMARELO",
    "notaRisco": 61,
    "gastoPublico": 3651662,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 8,
    "conformidade": 67,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 108
      },
      {
        "ano": 2022,
        "valor": 104
      },
      {
        "ano": 2023,
        "valor": 101
      },
      {
        "ano": 2024,
        "valor": 91
      }
    ]
  },
  {
    "id": "1703826",
    "nome": "Cachoeirinha",
    "prioridade": 32,
    "semaforo": "VERDE",
    "notaRisco": 34,
    "gastoPublico": 14462533,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 66,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 101
      },
      {
        "ano": 2022,
        "valor": 86
      },
      {
        "ano": 2023,
        "valor": 79
      },
      {
        "ano": 2024,
        "valor": 69
      }
    ]
  },
  {
    "id": "1703842",
    "nome": "Campos Lindos",
    "prioridade": 34,
    "semaforo": "AMARELO",
    "notaRisco": 49,
    "gastoPublico": 7115376,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 21,
    "conformidade": 73,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 45
      },
      {
        "ano": 2022,
        "valor": 49
      },
      {
        "ano": 2023,
        "valor": 46
      },
      {
        "ano": 2024,
        "valor": 41
      }
    ]
  },
  {
    "id": "1703867",
    "nome": "Cariri do Tocantins",
    "prioridade": 29,
    "semaforo": "VERDE",
    "notaRisco": 16,
    "gastoPublico": 10510444,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 28,
    "conformidade": 50,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 63
      },
      {
        "ano": 2022,
        "valor": 53
      },
      {
        "ano": 2023,
        "valor": 51
      },
      {
        "ano": 2024,
        "valor": 35
      }
    ]
  },
  {
    "id": "1703883",
    "nome": "Carmolândia",
    "prioridade": 47,
    "semaforo": "AMARELO",
    "notaRisco": 58,
    "gastoPublico": 3163287,
    "retornoPorReal": 0.2,
    "desperdicio": false,
    "reducaoDesmatamento": 33,
    "conformidade": 58,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 70
      },
      {
        "ano": 2022,
        "valor": 73
      },
      {
        "ano": 2023,
        "valor": 64
      },
      {
        "ano": 2024,
        "valor": 66
      }
    ]
  },
  {
    "id": "1703891",
    "nome": "Carrasco Bonito",
    "prioridade": 38,
    "semaforo": "VERDE",
    "notaRisco": 11,
    "gastoPublico": 6489709,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 35,
    "conformidade": 61,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 154
      },
      {
        "ano": 2022,
        "valor": 138
      },
      {
        "ano": 2023,
        "valor": 111
      },
      {
        "ano": 2024,
        "valor": 97
      }
    ]
  },
  {
    "id": "1703909",
    "nome": "Caseara",
    "prioridade": 47,
    "semaforo": "VERDE",
    "notaRisco": 30,
    "gastoPublico": 13974157,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 2,
    "conformidade": 56,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 30
      },
      {
        "ano": 2022,
        "valor": 27
      },
      {
        "ano": 2023,
        "valor": 27
      },
      {
        "ano": 2024,
        "valor": 18
      }
    ]
  },
  {
    "id": "1704105",
    "nome": "Centenário",
    "prioridade": 22,
    "semaforo": "VERDE",
    "notaRisco": 23,
    "gastoPublico": 11471488,
    "retornoPorReal": 0.2,
    "desperdicio": true,
    "reducaoDesmatamento": 22,
    "conformidade": 64,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 53
      },
      {
        "ano": 2022,
        "valor": 46
      },
      {
        "ano": 2023,
        "valor": 33
      },
      {
        "ano": 2024,
        "valor": 31
      }
    ]
  },
  {
    "id": "1704600",
    "nome": "Chapada de Areia",
    "prioridade": 43,
    "semaforo": "VERDE",
    "notaRisco": 27,
    "gastoPublico": 14293828,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 14,
    "conformidade": 53,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 63
      },
      {
        "ano": 2022,
        "valor": 57
      },
      {
        "ano": 2023,
        "valor": 48
      },
      {
        "ano": 2024,
        "valor": 35
      }
    ]
  },
  {
    "id": "1705102",
    "nome": "Chapada da Natividade",
    "prioridade": 55,
    "semaforo": "AMARELO",
    "notaRisco": 61,
    "gastoPublico": 13026786,
    "retornoPorReal": 0.5,
    "desperdicio": true,
    "reducaoDesmatamento": 9,
    "conformidade": 79,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 46
      },
      {
        "ano": 2022,
        "valor": 41
      },
      {
        "ano": 2023,
        "valor": 38
      },
      {
        "ano": 2024,
        "valor": 43
      }
    ]
  },
  {
    "id": "1705508",
    "nome": "Colinas do Tocantins",
    "prioridade": 14,
    "semaforo": "VERDE",
    "notaRisco": 8,
    "gastoPublico": 13842685,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 14,
    "conformidade": 60,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 168
      },
      {
        "ano": 2022,
        "valor": 145
      },
      {
        "ano": 2023,
        "valor": 125
      },
      {
        "ano": 2024,
        "valor": 110
      }
    ]
  },
  {
    "id": "1705557",
    "nome": "Combinado",
    "prioridade": 65,
    "semaforo": "AMARELO",
    "notaRisco": 56,
    "gastoPublico": 13217018,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 28,
    "conformidade": 49,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 18
      },
      {
        "ano": 2022,
        "valor": 20
      },
      {
        "ano": 2023,
        "valor": 23
      },
      {
        "ano": 2024,
        "valor": 14
      }
    ]
  },
  {
    "id": "1705607",
    "nome": "Conceição do Tocantins",
    "prioridade": 33,
    "semaforo": "VERDE",
    "notaRisco": 21,
    "gastoPublico": 6007153,
    "retornoPorReal": 0.3,
    "desperdicio": false,
    "reducaoDesmatamento": 5,
    "conformidade": 58,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 103
      },
      {
        "ano": 2022,
        "valor": 93
      },
      {
        "ano": 2023,
        "valor": 84
      },
      {
        "ano": 2024,
        "valor": 74
      }
    ]
  },
  {
    "id": "1706001",
    "nome": "Couto Magalhães",
    "prioridade": 47,
    "semaforo": "AMARELO",
    "notaRisco": 41,
    "gastoPublico": 1833420,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 6,
    "conformidade": 62,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 97
      },
      {
        "ano": 2022,
        "valor": 91
      },
      {
        "ano": 2023,
        "valor": 85
      },
      {
        "ano": 2024,
        "valor": 80
      }
    ]
  },
  {
    "id": "1706100",
    "nome": "Cristalândia",
    "prioridade": 95,
    "semaforo": "VERMELHO",
    "notaRisco": 78,
    "gastoPublico": 7997888,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 35,
    "conformidade": 59,
    "pendencias": [
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 155
      },
      {
        "ano": 2022,
        "valor": 169
      },
      {
        "ano": 2023,
        "valor": 173
      },
      {
        "ano": 2024,
        "valor": 179
      }
    ]
  },
  {
    "id": "1706258",
    "nome": "Crixás do Tocantins",
    "prioridade": 33,
    "semaforo": "VERDE",
    "notaRisco": 36,
    "gastoPublico": 3694715,
    "retornoPorReal": 0.2,
    "desperdicio": false,
    "reducaoDesmatamento": 5,
    "conformidade": 36,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 38
      },
      {
        "ano": 2022,
        "valor": 30
      },
      {
        "ano": 2023,
        "valor": 23
      },
      {
        "ano": 2024,
        "valor": 25
      }
    ]
  },
  {
    "id": "1706506",
    "nome": "Darcinópolis",
    "prioridade": 37,
    "semaforo": "VERDE",
    "notaRisco": 23,
    "gastoPublico": 8813787,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 2,
    "conformidade": 41,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 120
      },
      {
        "ano": 2022,
        "valor": 110
      },
      {
        "ano": 2023,
        "valor": 89
      },
      {
        "ano": 2024,
        "valor": 78
      }
    ]
  },
  {
    "id": "1707009",
    "nome": "Dianópolis",
    "prioridade": 39,
    "semaforo": "VERDE",
    "notaRisco": 35,
    "gastoPublico": 14962548,
    "retornoPorReal": 0.3,
    "desperdicio": true,
    "reducaoDesmatamento": 35,
    "conformidade": 88,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 63
      },
      {
        "ano": 2022,
        "valor": 54
      },
      {
        "ano": 2023,
        "valor": 49
      },
      {
        "ano": 2024,
        "valor": 41
      }
    ]
  },
  {
    "id": "1707108",
    "nome": "Divinópolis do Tocantins",
    "prioridade": 57,
    "semaforo": "AMARELO",
    "notaRisco": 47,
    "gastoPublico": 7127016,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 26,
    "conformidade": 86,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 114
      },
      {
        "ano": 2022,
        "valor": 114
      },
      {
        "ano": 2023,
        "valor": 107
      },
      {
        "ano": 2024,
        "valor": 98
      }
    ]
  },
  {
    "id": "1707207",
    "nome": "Dois Irmãos do Tocantins",
    "prioridade": 66,
    "semaforo": "VERMELHO",
    "notaRisco": 86,
    "gastoPublico": 13291484,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 84,
    "pendencias": [
      "Multa ambiental em aberto"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 42
      },
      {
        "ano": 2022,
        "valor": 51
      },
      {
        "ano": 2023,
        "valor": 47
      },
      {
        "ano": 2024,
        "valor": 54
      }
    ]
  },
  {
    "id": "1707306",
    "nome": "Dueré",
    "prioridade": 22,
    "semaforo": "VERDE",
    "notaRisco": 13,
    "gastoPublico": 5455952,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 8,
    "conformidade": 81,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 41
      },
      {
        "ano": 2022,
        "valor": 35
      },
      {
        "ano": 2023,
        "valor": 31
      },
      {
        "ano": 2024,
        "valor": 31
      }
    ]
  },
  {
    "id": "1707405",
    "nome": "Esperantina",
    "prioridade": 41,
    "semaforo": "VERDE",
    "notaRisco": 26,
    "gastoPublico": 11620420,
    "retornoPorReal": 1.5,
    "desperdicio": false,
    "reducaoDesmatamento": 37,
    "conformidade": 79,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 137
      },
      {
        "ano": 2022,
        "valor": 116
      },
      {
        "ano": 2023,
        "valor": 105
      },
      {
        "ano": 2024,
        "valor": 91
      }
    ]
  },
  {
    "id": "1707553",
    "nome": "Fátima",
    "prioridade": 39,
    "semaforo": "VERDE",
    "notaRisco": 29,
    "gastoPublico": 3159221,
    "retornoPorReal": 0.4,
    "desperdicio": false,
    "reducaoDesmatamento": 4,
    "conformidade": 65,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 118
      },
      {
        "ano": 2022,
        "valor": 108
      },
      {
        "ano": 2023,
        "valor": 94
      },
      {
        "ano": 2024,
        "valor": 77
      }
    ]
  },
  {
    "id": "1707652",
    "nome": "Figueirópolis",
    "prioridade": 58,
    "semaforo": "AMARELO",
    "notaRisco": 43,
    "gastoPublico": 9323688,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 33,
    "conformidade": 63,
    "pendencias": [
      "Notificação ambiental pendente"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 135
      },
      {
        "ano": 2022,
        "valor": 135
      },
      {
        "ano": 2023,
        "valor": 126
      },
      {
        "ano": 2024,
        "valor": 124
      }
    ]
  },
  {
    "id": "1707702",
    "nome": "Filadélfia",
    "prioridade": 40,
    "semaforo": "VERDE",
    "notaRisco": 34,
    "gastoPublico": 2113824,
    "retornoPorReal": 0.4,
    "desperdicio": false,
    "reducaoDesmatamento": 10,
    "conformidade": 72,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 114
      },
      {
        "ano": 2022,
        "valor": 96
      },
      {
        "ano": 2023,
        "valor": 87
      },
      {
        "ano": 2024,
        "valor": 70
      }
    ]
  },
  {
    "id": "1708205",
    "nome": "Formoso do Araguaia",
    "prioridade": 26,
    "semaforo": "VERDE",
    "notaRisco": 16,
    "gastoPublico": 8262585,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 5,
    "conformidade": 64,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 58
      },
      {
        "ano": 2022,
        "valor": 51
      },
      {
        "ano": 2023,
        "valor": 47
      },
      {
        "ano": 2024,
        "valor": 34
      }
    ]
  },
  {
    "id": "1708254",
    "nome": "Fortaleza do Tabocão",
    "prioridade": 69,
    "semaforo": "VERMELHO",
    "notaRisco": 92,
    "gastoPublico": 7636918,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 19,
    "conformidade": 53,
    "pendencias": [
      "Embargo ativo do IBAMA"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 57
      },
      {
        "ano": 2022,
        "valor": 61
      },
      {
        "ano": 2023,
        "valor": 65
      },
      {
        "ano": 2024,
        "valor": 60
      }
    ]
  },
  {
    "id": "1708304",
    "nome": "Goianorte",
    "prioridade": 44,
    "semaforo": "VERDE",
    "notaRisco": 28,
    "gastoPublico": 14427053,
    "retornoPorReal": 0.5,
    "desperdicio": true,
    "reducaoDesmatamento": 34,
    "conformidade": 62,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 154
      },
      {
        "ano": 2022,
        "valor": 132
      },
      {
        "ano": 2023,
        "valor": 110
      },
      {
        "ano": 2024,
        "valor": 94
      }
    ]
  },
  {
    "id": "1709005",
    "nome": "Goiatins",
    "prioridade": 74,
    "semaforo": "VERMELHO",
    "notaRisco": 91,
    "gastoPublico": 4904751,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 11,
    "conformidade": 50,
    "pendencias": [
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 165
      },
      {
        "ano": 2022,
        "valor": 179
      },
      {
        "ano": 2023,
        "valor": 186
      },
      {
        "ano": 2024,
        "valor": 199
      }
    ]
  },
  {
    "id": "1709302",
    "nome": "Guaraí",
    "prioridade": 27,
    "semaforo": "AMARELO",
    "notaRisco": 44,
    "gastoPublico": 9398155,
    "retornoPorReal": 1.8,
    "desperdicio": false,
    "reducaoDesmatamento": 22,
    "conformidade": 43,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 171
      },
      {
        "ano": 2022,
        "valor": 163
      },
      {
        "ano": 2023,
        "valor": 153
      },
      {
        "ano": 2024,
        "valor": 141
      }
    ]
  },
  {
    "id": "1709500",
    "nome": "Gurupi",
    "prioridade": 40,
    "semaforo": "VERDE",
    "notaRisco": 22,
    "gastoPublico": 4000000,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 31,
    "conformidade": 81,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 60
      },
      {
        "ano": 2022,
        "valor": 48
      },
      {
        "ano": 2023,
        "valor": 35
      },
      {
        "ano": 2024,
        "valor": 28
      }
    ]
  },
  {
    "id": "1709807",
    "nome": "Ipueiras",
    "prioridade": 18,
    "semaforo": "VERDE",
    "notaRisco": 27,
    "gastoPublico": 2378521,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 77,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 68
      },
      {
        "ano": 2022,
        "valor": 64
      },
      {
        "ano": 2023,
        "valor": 51
      },
      {
        "ano": 2024,
        "valor": 47
      }
    ]
  },
  {
    "id": "1710508",
    "nome": "Itacajá",
    "prioridade": 88,
    "semaforo": "VERMELHO",
    "notaRisco": 90,
    "gastoPublico": 6856219,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 33,
    "conformidade": 65,
    "pendencias": [
      "Embargo ativo do IBAMA",
      "Alto desmatamento recente (DETER)"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 55
      },
      {
        "ano": 2022,
        "valor": 59
      },
      {
        "ano": 2023,
        "valor": 69
      },
      {
        "ano": 2024,
        "valor": 69
      }
    ]
  },
  {
    "id": "1710706",
    "nome": "Itaguatins",
    "prioridade": 22,
    "semaforo": "VERDE",
    "notaRisco": 30,
    "gastoPublico": 5185155,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 15,
    "conformidade": 60,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 86
      },
      {
        "ano": 2022,
        "valor": 70
      },
      {
        "ano": 2023,
        "valor": 67
      },
      {
        "ano": 2024,
        "valor": 51
      }
    ]
  },
  {
    "id": "1710904",
    "nome": "Itapiratins",
    "prioridade": 90,
    "semaforo": "VERMELHO",
    "notaRisco": 81,
    "gastoPublico": 3514091,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 35,
    "conformidade": 55,
    "pendencias": [
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 47
      },
      {
        "ano": 2022,
        "valor": 49
      },
      {
        "ano": 2023,
        "valor": 50
      },
      {
        "ano": 2024,
        "valor": 54
      }
    ]
  },
  {
    "id": "1711100",
    "nome": "Itaporã do Tocantins",
    "prioridade": 34,
    "semaforo": "AMARELO",
    "notaRisco": 47,
    "gastoPublico": 1011421,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 64,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 61
      },
      {
        "ano": 2022,
        "valor": 60
      },
      {
        "ano": 2023,
        "valor": 56
      },
      {
        "ano": 2024,
        "valor": 46
      }
    ]
  },
  {
    "id": "1711506",
    "nome": "Jaú do Tocantins",
    "prioridade": 47,
    "semaforo": "VERDE",
    "notaRisco": 19,
    "gastoPublico": 1827320,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 21,
    "conformidade": 45,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 157
      },
      {
        "ano": 2022,
        "valor": 137
      },
      {
        "ano": 2023,
        "valor": 113
      },
      {
        "ano": 2024,
        "valor": 100
      }
    ]
  },
  {
    "id": "1711803",
    "nome": "Juarina",
    "prioridade": 93,
    "semaforo": "VERMELHO",
    "notaRisco": 83,
    "gastoPublico": 6320724,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 32,
    "conformidade": 38,
    "pendencias": [
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 113
      },
      {
        "ano": 2022,
        "valor": 118
      },
      {
        "ano": 2023,
        "valor": 114
      },
      {
        "ano": 2024,
        "valor": 121
      }
    ]
  },
  {
    "id": "1711902",
    "nome": "Lagoa da Confusão",
    "prioridade": 88,
    "semaforo": "VERMELHO",
    "notaRisco": 73,
    "gastoPublico": 7800000,
    "retornoPorReal": 0.3,
    "desperdicio": true,
    "reducaoDesmatamento": 6,
    "conformidade": 41,
    "pendencias": [
      "Sobreposição com área protegida",
      "Embargo ativo"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 180
      },
      {
        "ano": 2022,
        "valor": 195
      },
      {
        "ano": 2023,
        "valor": 188
      },
      {
        "ano": 2024,
        "valor": 175
      }
    ]
  },
  {
    "id": "1711951",
    "nome": "Lagoa do Tocantins",
    "prioridade": 92,
    "semaforo": "VERMELHO",
    "notaRisco": 87,
    "gastoPublico": 11859525,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 37,
    "conformidade": 79,
    "pendencias": [
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 52
      },
      {
        "ano": 2022,
        "valor": 60
      },
      {
        "ano": 2023,
        "valor": 58
      },
      {
        "ano": 2024,
        "valor": 60
      }
    ]
  },
  {
    "id": "1712009",
    "nome": "Lajeado",
    "prioridade": 49,
    "semaforo": "VERDE",
    "notaRisco": 31,
    "gastoPublico": 7976082,
    "retornoPorReal": 1.5,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 37,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 99
      },
      {
        "ano": 2022,
        "valor": 81
      },
      {
        "ano": 2023,
        "valor": 72
      },
      {
        "ano": 2024,
        "valor": 64
      }
    ]
  },
  {
    "id": "1712157",
    "nome": "Lavandeira",
    "prioridade": 47,
    "semaforo": "VERDE",
    "notaRisco": 34,
    "gastoPublico": 13514882,
    "retornoPorReal": 0.4,
    "desperdicio": true,
    "reducaoDesmatamento": 21,
    "conformidade": 78,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 81
      },
      {
        "ano": 2022,
        "valor": 73
      },
      {
        "ano": 2023,
        "valor": 61
      },
      {
        "ano": 2024,
        "valor": 50
      }
    ]
  },
  {
    "id": "1712405",
    "nome": "Lizarda",
    "prioridade": 51,
    "semaforo": "VERDE",
    "notaRisco": 22,
    "gastoPublico": 4633953,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 83,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 163
      },
      {
        "ano": 2022,
        "valor": 142
      },
      {
        "ano": 2023,
        "valor": 127
      },
      {
        "ano": 2024,
        "valor": 103
      }
    ]
  },
  {
    "id": "1712454",
    "nome": "Luzinópolis",
    "prioridade": 77,
    "semaforo": "VERMELHO",
    "notaRisco": 68,
    "gastoPublico": 4008286,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 32,
    "conformidade": 72,
    "pendencias": [
      "Sobreposição com área protegida",
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 83
      },
      {
        "ano": 2022,
        "valor": 89
      },
      {
        "ano": 2023,
        "valor": 87
      },
      {
        "ano": 2024,
        "valor": 94
      }
    ]
  },
  {
    "id": "1712504",
    "nome": "Marianópolis do Tocantins",
    "prioridade": 29,
    "semaforo": "VERDE",
    "notaRisco": 34,
    "gastoPublico": 10798421,
    "retornoPorReal": 0.2,
    "desperdicio": true,
    "reducaoDesmatamento": 9,
    "conformidade": 81,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 109
      },
      {
        "ano": 2022,
        "valor": 92
      },
      {
        "ano": 2023,
        "valor": 87
      },
      {
        "ano": 2024,
        "valor": 68
      }
    ]
  },
  {
    "id": "1712702",
    "nome": "Mateiros",
    "prioridade": 50,
    "semaforo": "VERDE",
    "notaRisco": 30,
    "gastoPublico": 9127357,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 29,
    "conformidade": 76,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 141
      },
      {
        "ano": 2022,
        "valor": 133
      },
      {
        "ano": 2023,
        "valor": 110
      },
      {
        "ano": 2024,
        "valor": 92
      }
    ]
  },
  {
    "id": "1712801",
    "nome": "Maurilândia do Tocantins",
    "prioridade": 12,
    "semaforo": "VERDE",
    "notaRisco": 12,
    "gastoPublico": 1291825,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 20,
    "conformidade": 74,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 87
      },
      {
        "ano": 2022,
        "valor": 82
      },
      {
        "ano": 2023,
        "valor": 70
      },
      {
        "ano": 2024,
        "valor": 57
      }
    ]
  },
  {
    "id": "1713205",
    "nome": "Miracema do Tocantins",
    "prioridade": 82,
    "semaforo": "VERMELHO",
    "notaRisco": 67,
    "gastoPublico": 1276119,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 24,
    "conformidade": 69,
    "pendencias": [
      "Embargo ativo do IBAMA",
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 129
      },
      {
        "ano": 2022,
        "valor": 134
      },
      {
        "ano": 2023,
        "valor": 137
      },
      {
        "ano": 2024,
        "valor": 150
      }
    ]
  },
  {
    "id": "1713304",
    "nome": "Miranorte",
    "prioridade": 15,
    "semaforo": "VERDE",
    "notaRisco": 24,
    "gastoPublico": 7440587,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 15,
    "conformidade": 66,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 30
      },
      {
        "ano": 2022,
        "valor": 27
      },
      {
        "ano": 2023,
        "valor": 19
      },
      {
        "ano": 2024,
        "valor": 21
      }
    ]
  },
  {
    "id": "1713601",
    "nome": "Monte do Carmo",
    "prioridade": 54,
    "semaforo": "VERDE",
    "notaRisco": 32,
    "gastoPublico": 11933991,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 26,
    "conformidade": 59,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 158
      },
      {
        "ano": 2022,
        "valor": 139
      },
      {
        "ano": 2023,
        "valor": 125
      },
      {
        "ano": 2024,
        "valor": 106
      }
    ]
  },
  {
    "id": "1713700",
    "nome": "Monte Santo do Tocantins",
    "prioridade": 16,
    "semaforo": "VERDE",
    "notaRisco": 15,
    "gastoPublico": 4098459,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 57,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 103
      },
      {
        "ano": 2022,
        "valor": 88
      },
      {
        "ano": 2023,
        "valor": 74
      },
      {
        "ano": 2024,
        "valor": 60
      }
    ]
  },
  {
    "id": "1713809",
    "nome": "Palmeiras do Tocantins",
    "prioridade": 69,
    "semaforo": "VERMELHO",
    "notaRisco": 94,
    "gastoPublico": 14420954,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 10,
    "conformidade": 46,
    "pendencias": [
      "Alto desmatamento recente (DETER)"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 58
      },
      {
        "ano": 2022,
        "valor": 60
      },
      {
        "ano": 2023,
        "valor": 63
      },
      {
        "ano": 2024,
        "valor": 64
      }
    ]
  },
  {
    "id": "1713957",
    "nome": "Muricilândia",
    "prioridade": 91,
    "semaforo": "VERMELHO",
    "notaRisco": 67,
    "gastoPublico": 5959754,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 87,
    "pendencias": [
      "Embargo ativo do IBAMA"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 156
      },
      {
        "ano": 2022,
        "valor": 159
      },
      {
        "ano": 2023,
        "valor": 172
      },
      {
        "ano": 2024,
        "valor": 175
      }
    ]
  },
  {
    "id": "1714203",
    "nome": "Natividade",
    "prioridade": 18,
    "semaforo": "VERDE",
    "notaRisco": 26,
    "gastoPublico": 10247220,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 12,
    "conformidade": 49,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 47
      },
      {
        "ano": 2022,
        "valor": 43
      },
      {
        "ano": 2023,
        "valor": 34
      },
      {
        "ano": 2024,
        "valor": 24
      }
    ]
  },
  {
    "id": "1714302",
    "nome": "Nazaré",
    "prioridade": 38,
    "semaforo": "AMARELO",
    "notaRisco": 41,
    "gastoPublico": 2411688,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 3,
    "conformidade": 47,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 29
      },
      {
        "ano": 2022,
        "valor": 28
      },
      {
        "ano": 2023,
        "valor": 20
      },
      {
        "ano": 2024,
        "valor": 23
      }
    ]
  },
  {
    "id": "1714880",
    "nome": "Nova Olinda",
    "prioridade": 63,
    "semaforo": "VERMELHO",
    "notaRisco": 65,
    "gastoPublico": 4745652,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 20,
    "conformidade": 81,
    "pendencias": [
      "Alto desmatamento recente (DETER)",
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 64
      },
      {
        "ano": 2022,
        "valor": 65
      },
      {
        "ano": 2023,
        "valor": 67
      },
      {
        "ano": 2024,
        "valor": 71
      }
    ]
  },
  {
    "id": "1715002",
    "nome": "Nova Rosalândia",
    "prioridade": 41,
    "semaforo": "VERDE",
    "notaRisco": 15,
    "gastoPublico": 13473583,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 68,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 104
      },
      {
        "ano": 2022,
        "valor": 94
      },
      {
        "ano": 2023,
        "valor": 77
      },
      {
        "ano": 2024,
        "valor": 67
      }
    ]
  },
  {
    "id": "1715101",
    "nome": "Novo Acordo",
    "prioridade": 20,
    "semaforo": "VERDE",
    "notaRisco": 28,
    "gastoPublico": 5638051,
    "retornoPorReal": 1.8,
    "desperdicio": false,
    "reducaoDesmatamento": 8,
    "conformidade": 66,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 49
      },
      {
        "ano": 2022,
        "valor": 43
      },
      {
        "ano": 2023,
        "valor": 36
      },
      {
        "ano": 2024,
        "valor": 31
      }
    ]
  },
  {
    "id": "1715150",
    "nome": "Novo Alegre",
    "prioridade": 39,
    "semaforo": "VERDE",
    "notaRisco": 19,
    "gastoPublico": 5012383,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 23,
    "conformidade": 54,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 86
      },
      {
        "ano": 2022,
        "valor": 76
      },
      {
        "ano": 2023,
        "valor": 66
      },
      {
        "ano": 2024,
        "valor": 54
      }
    ]
  },
  {
    "id": "1715259",
    "nome": "Novo Jardim",
    "prioridade": 46,
    "semaforo": "AMARELO",
    "notaRisco": 43,
    "gastoPublico": 1334878,
    "retornoPorReal": 0.2,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 43,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 102
      },
      {
        "ano": 2022,
        "valor": 101
      },
      {
        "ano": 2023,
        "valor": 97
      },
      {
        "ano": 2024,
        "valor": 89
      }
    ]
  },
  {
    "id": "1715507",
    "nome": "Oliveira de Fátima",
    "prioridade": 95,
    "semaforo": "VERMELHO",
    "notaRisco": 85,
    "gastoPublico": 6453950,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 13,
    "conformidade": 48,
    "pendencias": [
      "Embargo ativo do IBAMA",
      "Sobreposição com área protegida"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 101
      },
      {
        "ano": 2022,
        "valor": 105
      },
      {
        "ano": 2023,
        "valor": 108
      },
      {
        "ano": 2024,
        "valor": 117
      }
    ]
  },
  {
    "id": "1715705",
    "nome": "Palmeirante",
    "prioridade": 29,
    "semaforo": "VERDE",
    "notaRisco": 24,
    "gastoPublico": 4782885,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 33,
    "conformidade": 43,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 107
      },
      {
        "ano": 2022,
        "valor": 90
      },
      {
        "ano": 2023,
        "valor": 76
      },
      {
        "ano": 2024,
        "valor": 67
      }
    ]
  },
  {
    "id": "1715754",
    "nome": "Palmeirópolis",
    "prioridade": 12,
    "semaforo": "VERDE",
    "notaRisco": 15,
    "gastoPublico": 4157218,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 9,
    "conformidade": 87,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 142
      },
      {
        "ano": 2022,
        "valor": 123
      },
      {
        "ano": 2023,
        "valor": 106
      },
      {
        "ano": 2024,
        "valor": 89
      }
    ]
  },
  {
    "id": "1716109",
    "nome": "Paraíso do Tocantins",
    "prioridade": 35,
    "semaforo": "VERDE",
    "notaRisco": 19,
    "gastoPublico": 3200000,
    "retornoPorReal": 1.5,
    "desperdicio": false,
    "reducaoDesmatamento": 37,
    "conformidade": 86,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 40
      },
      {
        "ano": 2022,
        "valor": 33
      },
      {
        "ano": 2023,
        "valor": 25
      },
      {
        "ano": 2024,
        "valor": 20
      }
    ]
  },
  {
    "id": "1716208",
    "nome": "Paranã",
    "prioridade": 31,
    "semaforo": "VERDE",
    "notaRisco": 36,
    "gastoPublico": 10931647,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 28,
    "conformidade": 35,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 50
      },
      {
        "ano": 2022,
        "valor": 45
      },
      {
        "ano": 2023,
        "valor": 35
      },
      {
        "ano": 2024,
        "valor": 31
      }
    ]
  },
  {
    "id": "1716307",
    "nome": "Pau D'Arco",
    "prioridade": 50,
    "semaforo": "AMARELO",
    "notaRisco": 48,
    "gastoPublico": 3096115,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 19,
    "conformidade": 88,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 38
      },
      {
        "ano": 2022,
        "valor": 36
      },
      {
        "ano": 2023,
        "valor": 33
      },
      {
        "ano": 2024,
        "valor": 27
      }
    ]
  },
  {
    "id": "1716505",
    "nome": "Pedro Afonso",
    "prioridade": 14,
    "semaforo": "VERDE",
    "notaRisco": 14,
    "gastoPublico": 1425051,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 39,
    "conformidade": 83,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 28
      },
      {
        "ano": 2022,
        "valor": 25
      },
      {
        "ano": 2023,
        "valor": 18
      },
      {
        "ano": 2024,
        "valor": 20
      }
    ]
  },
  {
    "id": "1716604",
    "nome": "Peixe",
    "prioridade": 33,
    "semaforo": "VERDE",
    "notaRisco": 27,
    "gastoPublico": 7589519,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 30,
    "conformidade": 81,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 114
      },
      {
        "ano": 2022,
        "valor": 107
      },
      {
        "ano": 2023,
        "valor": 91
      },
      {
        "ano": 2024,
        "valor": 71
      }
    ]
  },
  {
    "id": "1716653",
    "nome": "Pequizeiro",
    "prioridade": 13,
    "semaforo": "VERDE",
    "notaRisco": 18,
    "gastoPublico": 6963851,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 6,
    "conformidade": 69,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 160
      },
      {
        "ano": 2022,
        "valor": 139
      },
      {
        "ano": 2023,
        "valor": 121
      },
      {
        "ano": 2024,
        "valor": 103
      }
    ]
  },
  {
    "id": "1716703",
    "nome": "Colméia",
    "prioridade": 53,
    "semaforo": "AMARELO",
    "notaRisco": 41,
    "gastoPublico": 13753987,
    "retornoPorReal": 0.5,
    "desperdicio": true,
    "reducaoDesmatamento": 21,
    "conformidade": 79,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 141
      },
      {
        "ano": 2022,
        "valor": 126
      },
      {
        "ano": 2023,
        "valor": 120
      },
      {
        "ano": 2024,
        "valor": 114
      }
    ]
  },
  {
    "id": "1717008",
    "nome": "Pindorama do Tocantins",
    "prioridade": 17,
    "semaforo": "VERDE",
    "notaRisco": 26,
    "gastoPublico": 7573812,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 34,
    "conformidade": 76,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 121
      },
      {
        "ano": 2022,
        "valor": 101
      },
      {
        "ano": 2023,
        "valor": 91
      },
      {
        "ano": 2024,
        "valor": 80
      }
    ]
  },
  {
    "id": "1717206",
    "nome": "Piraquê",
    "prioridade": 53,
    "semaforo": "AMARELO",
    "notaRisco": 50,
    "gastoPublico": 5902748,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 16,
    "conformidade": 71,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 80
      },
      {
        "ano": 2022,
        "valor": 76
      },
      {
        "ano": 2023,
        "valor": 71
      },
      {
        "ano": 2024,
        "valor": 75
      }
    ]
  },
  {
    "id": "1717503",
    "nome": "Pium",
    "prioridade": 37,
    "semaforo": "VERDE",
    "notaRisco": 29,
    "gastoPublico": 10396152,
    "retornoPorReal": 0.3,
    "desperdicio": true,
    "reducaoDesmatamento": 27,
    "conformidade": 64,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 131
      },
      {
        "ano": 2022,
        "valor": 113
      },
      {
        "ano": 2023,
        "valor": 97
      },
      {
        "ano": 2024,
        "valor": 84
      }
    ]
  },
  {
    "id": "1717800",
    "nome": "Ponte Alta do Bom Jesus",
    "prioridade": 36,
    "semaforo": "VERDE",
    "notaRisco": 37,
    "gastoPublico": 14889556,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 38,
    "conformidade": 57,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 108
      },
      {
        "ano": 2022,
        "valor": 93
      },
      {
        "ano": 2023,
        "valor": 79
      },
      {
        "ano": 2024,
        "valor": 73
      }
    ]
  },
  {
    "id": "1717909",
    "nome": "Ponte Alta do Tocantins",
    "prioridade": 40,
    "semaforo": "AMARELO",
    "notaRisco": 56,
    "gastoPublico": 11212051,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 32,
    "conformidade": 46,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 152
      },
      {
        "ano": 2022,
        "valor": 147
      },
      {
        "ano": 2023,
        "valor": 139
      },
      {
        "ano": 2024,
        "valor": 137
      }
    ]
  },
  {
    "id": "1718006",
    "nome": "Porto Alegre do Tocantins",
    "prioridade": 22,
    "semaforo": "VERDE",
    "notaRisco": 11,
    "gastoPublico": 2544914,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 22,
    "conformidade": 56,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 74
      },
      {
        "ano": 2022,
        "valor": 67
      },
      {
        "ano": 2023,
        "valor": 56
      },
      {
        "ano": 2024,
        "valor": 48
      }
    ]
  },
  {
    "id": "1718204",
    "nome": "Porto Nacional",
    "prioridade": 67,
    "semaforo": "AMARELO",
    "notaRisco": 51,
    "gastoPublico": 6500000,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 14,
    "conformidade": 59,
    "pendencias": [
      "Reserva Legal abaixo do exigido em parte das áreas"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 95
      },
      {
        "ano": 2022,
        "valor": 88
      },
      {
        "ano": 2023,
        "valor": 82
      },
      {
        "ano": 2024,
        "valor": 74
      }
    ]
  },
  {
    "id": "1718303",
    "nome": "Praia Norte",
    "prioridade": 22,
    "semaforo": "VERDE",
    "notaRisco": 19,
    "gastoPublico": 7038317,
    "retornoPorReal": 0.2,
    "desperdicio": false,
    "reducaoDesmatamento": 33,
    "conformidade": 49,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 52
      },
      {
        "ano": 2022,
        "valor": 48
      },
      {
        "ano": 2023,
        "valor": 39
      },
      {
        "ano": 2024,
        "valor": 37
      }
    ]
  },
  {
    "id": "1718402",
    "nome": "Presidente Kennedy",
    "prioridade": 41,
    "semaforo": "VERDE",
    "notaRisco": 32,
    "gastoPublico": 13202785,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 24,
    "conformidade": 47,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 147
      },
      {
        "ano": 2022,
        "valor": 129
      },
      {
        "ano": 2023,
        "valor": 112
      },
      {
        "ano": 2024,
        "valor": 97
      }
    ]
  },
  {
    "id": "1718451",
    "nome": "Pugmil",
    "prioridade": 20,
    "semaforo": "VERDE",
    "notaRisco": 22,
    "gastoPublico": 12577118,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 38,
    "conformidade": 35,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 33
      },
      {
        "ano": 2022,
        "valor": 29
      },
      {
        "ano": 2023,
        "valor": 27
      },
      {
        "ano": 2024,
        "valor": 23
      }
    ]
  },
  {
    "id": "1718501",
    "nome": "Recursolândia",
    "prioridade": 60,
    "semaforo": "AMARELO",
    "notaRisco": 45,
    "gastoPublico": 5367253,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 15,
    "conformidade": 45,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 113
      },
      {
        "ano": 2022,
        "valor": 99
      },
      {
        "ano": 2023,
        "valor": 100
      },
      {
        "ano": 2024,
        "valor": 95
      }
    ]
  },
  {
    "id": "1718550",
    "nome": "Riachinho",
    "prioridade": 39,
    "semaforo": "VERDE",
    "notaRisco": 35,
    "gastoPublico": 4741586,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 29,
    "conformidade": 88,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 129
      },
      {
        "ano": 2022,
        "valor": 111
      },
      {
        "ano": 2023,
        "valor": 101
      },
      {
        "ano": 2024,
        "valor": 84
      }
    ]
  },
  {
    "id": "1718659",
    "nome": "Rio da Conceição",
    "prioridade": 28,
    "semaforo": "VERDE",
    "notaRisco": 28,
    "gastoPublico": 1064081,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 23,
    "conformidade": 77,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 17
      },
      {
        "ano": 2022,
        "valor": 15
      },
      {
        "ano": 2023,
        "valor": 12
      },
      {
        "ano": 2024,
        "valor": 10
      }
    ]
  },
  {
    "id": "1718709",
    "nome": "Rio dos Bois",
    "prioridade": 67,
    "semaforo": "AMARELO",
    "notaRisco": 49,
    "gastoPublico": 7854216,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 38,
    "conformidade": 86,
    "pendencias": [
      "Notificação ambiental pendente"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 86
      },
      {
        "ano": 2022,
        "valor": 83
      },
      {
        "ano": 2023,
        "valor": 79
      },
      {
        "ano": 2024,
        "valor": 71
      }
    ]
  },
  {
    "id": "1718758",
    "nome": "Rio Sono",
    "prioridade": 31,
    "semaforo": "VERDE",
    "notaRisco": 11,
    "gastoPublico": 7228549,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 14,
    "conformidade": 74,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 114
      },
      {
        "ano": 2022,
        "valor": 97
      },
      {
        "ano": 2023,
        "valor": 86
      },
      {
        "ano": 2024,
        "valor": 70
      }
    ]
  },
  {
    "id": "1718808",
    "nome": "Sampaio",
    "prioridade": 76,
    "semaforo": "VERMELHO",
    "notaRisco": 89,
    "gastoPublico": 14018684,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 29,
    "conformidade": 84,
    "pendencias": [
      "Alto desmatamento recente (DETER)"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 88
      },
      {
        "ano": 2022,
        "valor": 91
      },
      {
        "ano": 2023,
        "valor": 92
      },
      {
        "ano": 2024,
        "valor": 96
      }
    ]
  },
  {
    "id": "1718840",
    "nome": "Sandolândia",
    "prioridade": 60,
    "semaforo": "VERDE",
    "notaRisco": 36,
    "gastoPublico": 13324371,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 38,
    "conformidade": 44,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 38
      },
      {
        "ano": 2022,
        "valor": 32
      },
      {
        "ano": 2023,
        "valor": 29
      },
      {
        "ano": 2024,
        "valor": 23
      }
    ]
  },
  {
    "id": "1718865",
    "nome": "Santa Fé do Araguaia",
    "prioridade": 31,
    "semaforo": "VERDE",
    "notaRisco": 32,
    "gastoPublico": 2719439,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 7,
    "conformidade": 76,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 132
      },
      {
        "ano": 2022,
        "valor": 121
      },
      {
        "ano": 2023,
        "valor": 102
      },
      {
        "ano": 2024,
        "valor": 90
      }
    ]
  },
  {
    "id": "1718881",
    "nome": "Santa Maria do Tocantins",
    "prioridade": 17,
    "semaforo": "VERDE",
    "notaRisco": 18,
    "gastoPublico": 9372282,
    "retornoPorReal": 1.7,
    "desperdicio": false,
    "reducaoDesmatamento": 12,
    "conformidade": 83,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 150
      },
      {
        "ano": 2022,
        "valor": 131
      },
      {
        "ano": 2023,
        "valor": 115
      },
      {
        "ano": 2024,
        "valor": 96
      }
    ]
  },
  {
    "id": "1718899",
    "nome": "Santa Rita do Tocantins",
    "prioridade": 26,
    "semaforo": "VERDE",
    "notaRisco": 37,
    "gastoPublico": 2856731,
    "retornoPorReal": 0.2,
    "desperdicio": false,
    "reducaoDesmatamento": 17,
    "conformidade": 78,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 25
      },
      {
        "ano": 2022,
        "valor": 29
      },
      {
        "ano": 2023,
        "valor": 20
      },
      {
        "ano": 2024,
        "valor": 17
      }
    ]
  },
  {
    "id": "1718907",
    "nome": "Santa Rosa do Tocantins",
    "prioridade": 31,
    "semaforo": "VERDE",
    "notaRisco": 15,
    "gastoPublico": 6183152,
    "retornoPorReal": 0.8,
    "desperdicio": false,
    "reducaoDesmatamento": 20,
    "conformidade": 82,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 109
      },
      {
        "ano": 2022,
        "valor": 94
      },
      {
        "ano": 2023,
        "valor": 78
      },
      {
        "ano": 2024,
        "valor": 72
      }
    ]
  },
  {
    "id": "1719004",
    "nome": "Santa Tereza do Tocantins",
    "prioridade": 60,
    "semaforo": "AMARELO",
    "notaRisco": 53,
    "gastoPublico": 11516015,
    "retornoPorReal": 1,
    "desperdicio": false,
    "reducaoDesmatamento": 10,
    "conformidade": 37,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 23
      },
      {
        "ano": 2022,
        "valor": 20
      },
      {
        "ano": 2023,
        "valor": 21
      },
      {
        "ano": 2024,
        "valor": 24
      }
    ]
  },
  {
    "id": "1720002",
    "nome": "Santa Terezinha do Tocantins",
    "prioridade": 12,
    "semaforo": "VERDE",
    "notaRisco": 11,
    "gastoPublico": 6487116,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 36,
    "conformidade": 73,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 139
      },
      {
        "ano": 2022,
        "valor": 120
      },
      {
        "ano": 2023,
        "valor": 99
      },
      {
        "ano": 2024,
        "valor": 89
      }
    ]
  },
  {
    "id": "1720101",
    "nome": "São Bento do Tocantins",
    "prioridade": 30,
    "semaforo": "VERDE",
    "notaRisco": 24,
    "gastoPublico": 12651584,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 27,
    "conformidade": 70,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 75
      },
      {
        "ano": 2022,
        "valor": 70
      },
      {
        "ano": 2023,
        "valor": 59
      },
      {
        "ano": 2024,
        "valor": 54
      }
    ]
  },
  {
    "id": "1720150",
    "nome": "São Félix do Tocantins",
    "prioridade": 12,
    "semaforo": "VERDE",
    "notaRisco": 14,
    "gastoPublico": 12025917,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 3,
    "conformidade": 59,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 121
      },
      {
        "ano": 2022,
        "valor": 102
      },
      {
        "ano": 2023,
        "valor": 89
      },
      {
        "ano": 2024,
        "valor": 76
      }
    ]
  },
  {
    "id": "1720200",
    "nome": "São Miguel do Tocantins",
    "prioridade": 62,
    "semaforo": "AMARELO",
    "notaRisco": 61,
    "gastoPublico": 4816052,
    "retornoPorReal": 0.5,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 68,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 84
      },
      {
        "ano": 2022,
        "valor": 83
      },
      {
        "ano": 2023,
        "valor": 73
      },
      {
        "ano": 2024,
        "valor": 75
      }
    ]
  },
  {
    "id": "1720259",
    "nome": "São Salvador do Tocantins",
    "prioridade": 68,
    "semaforo": "AMARELO",
    "notaRisco": 62,
    "gastoPublico": 8348412,
    "retornoPorReal": 1.4,
    "desperdicio": false,
    "reducaoDesmatamento": 35,
    "conformidade": 47,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 25
      },
      {
        "ano": 2022,
        "valor": 19
      },
      {
        "ano": 2023,
        "valor": 22
      },
      {
        "ano": 2024,
        "valor": 15
      }
    ]
  },
  {
    "id": "1720309",
    "nome": "São Sebastião do Tocantins",
    "prioridade": 37,
    "semaforo": "VERDE",
    "notaRisco": 29,
    "gastoPublico": 1138547,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 12,
    "conformidade": 57,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 69
      },
      {
        "ano": 2022,
        "valor": 55
      },
      {
        "ano": 2023,
        "valor": 53
      },
      {
        "ano": 2024,
        "valor": 39
      }
    ]
  },
  {
    "id": "1720499",
    "nome": "São Valério da Natividade",
    "prioridade": 36,
    "semaforo": "VERDE",
    "notaRisco": 16,
    "gastoPublico": 10141061,
    "retornoPorReal": 1.6,
    "desperdicio": false,
    "reducaoDesmatamento": 29,
    "conformidade": 48,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 17
      },
      {
        "ano": 2022,
        "valor": 20
      },
      {
        "ano": 2023,
        "valor": 17
      },
      {
        "ano": 2024,
        "valor": 8
      }
    ]
  },
  {
    "id": "1720655",
    "nome": "Silvanópolis",
    "prioridade": 31,
    "semaforo": "AMARELO",
    "notaRisco": 55,
    "gastoPublico": 5006284,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 37,
    "conformidade": 38,
    "pendencias": [
      "Reserva Legal abaixo do exigido"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 156
      },
      {
        "ano": 2022,
        "valor": 145
      },
      {
        "ano": 2023,
        "valor": 138
      },
      {
        "ano": 2024,
        "valor": 134
      }
    ]
  },
  {
    "id": "1720804",
    "nome": "Sítio Novo do Tocantins",
    "prioridade": 58,
    "semaforo": "VERDE",
    "notaRisco": 33,
    "gastoPublico": 3960887,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 5,
    "conformidade": 45,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 78
      },
      {
        "ano": 2022,
        "valor": 66
      },
      {
        "ano": 2023,
        "valor": 58
      },
      {
        "ano": 2024,
        "valor": 53
      }
    ]
  },
  {
    "id": "1720853",
    "nome": "Sucupira",
    "prioridade": 38,
    "semaforo": "VERDE",
    "notaRisco": 24,
    "gastoPublico": 3335220,
    "retornoPorReal": 0.9,
    "desperdicio": false,
    "reducaoDesmatamento": 19,
    "conformidade": 89,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 125
      },
      {
        "ano": 2022,
        "valor": 109
      },
      {
        "ano": 2023,
        "valor": 88
      },
      {
        "ano": 2024,
        "valor": 76
      }
    ]
  },
  {
    "id": "1720903",
    "nome": "Taguatinga",
    "prioridade": 36,
    "semaforo": "AMARELO",
    "notaRisco": 45,
    "gastoPublico": 10125355,
    "retornoPorReal": 1.8,
    "desperdicio": false,
    "reducaoDesmatamento": 34,
    "conformidade": 43,
    "pendencias": [
      "Notificação ambiental pendente"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 55
      },
      {
        "ano": 2022,
        "valor": 55
      },
      {
        "ano": 2023,
        "valor": 44
      },
      {
        "ano": 2024,
        "valor": 44
      }
    ]
  },
  {
    "id": "1720937",
    "nome": "Taipas do Tocantins",
    "prioridade": 16,
    "semaforo": "VERDE",
    "notaRisco": 21,
    "gastoPublico": 10262647,
    "retornoPorReal": 1.5,
    "desperdicio": false,
    "reducaoDesmatamento": 6,
    "conformidade": 45,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 58
      },
      {
        "ano": 2022,
        "valor": 55
      },
      {
        "ano": 2023,
        "valor": 49
      },
      {
        "ano": 2024,
        "valor": 41
      }
    ]
  },
  {
    "id": "1720978",
    "nome": "Talismã",
    "prioridade": 30,
    "semaforo": "VERDE",
    "notaRisco": 33,
    "gastoPublico": 6310558,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 84,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 20
      },
      {
        "ano": 2022,
        "valor": 23
      },
      {
        "ano": 2023,
        "valor": 21
      },
      {
        "ano": 2024,
        "valor": 17
      }
    ]
  },
  {
    "id": "1721000",
    "nome": "Palmas",
    "prioridade": 82,
    "semaforo": "AMARELO",
    "notaRisco": 45,
    "gastoPublico": 12000000,
    "retornoPorReal": 0.7,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 64,
    "pendencias": [
      "Pendência de CAR em análise"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 120
      },
      {
        "ano": 2022,
        "valor": 105
      },
      {
        "ano": 2023,
        "valor": 98
      },
      {
        "ano": 2024,
        "valor": 80
      }
    ]
  },
  {
    "id": "1721109",
    "nome": "Tocantínia",
    "prioridade": 69,
    "semaforo": "VERMELHO",
    "notaRisco": 75,
    "gastoPublico": 11780712,
    "retornoPorReal": 0.6,
    "desperdicio": false,
    "reducaoDesmatamento": 18,
    "conformidade": 42,
    "pendencias": [
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 119
      },
      {
        "ano": 2022,
        "valor": 131
      },
      {
        "ano": 2023,
        "valor": 135
      },
      {
        "ano": 2024,
        "valor": 145
      }
    ]
  },
  {
    "id": "1721208",
    "nome": "Tocantinópolis",
    "prioridade": 41,
    "semaforo": "VERDE",
    "notaRisco": 32,
    "gastoPublico": 3945180,
    "retornoPorReal": 1.3,
    "desperdicio": false,
    "reducaoDesmatamento": 9,
    "conformidade": 40,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 76
      },
      {
        "ano": 2022,
        "valor": 71
      },
      {
        "ano": 2023,
        "valor": 58
      },
      {
        "ano": 2024,
        "valor": 53
      }
    ]
  },
  {
    "id": "1721257",
    "nome": "Tupirama",
    "prioridade": 68,
    "semaforo": "VERMELHO",
    "notaRisco": 79,
    "gastoPublico": 3319513,
    "retornoPorReal": 1.1,
    "desperdicio": false,
    "reducaoDesmatamento": 23,
    "conformidade": 83,
    "pendencias": [
      "CAR cancelado"
    ],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 68
      },
      {
        "ano": 2022,
        "valor": 73
      },
      {
        "ano": 2023,
        "valor": 80
      },
      {
        "ano": 2024,
        "valor": 85
      }
    ]
  },
  {
    "id": "1721307",
    "nome": "Tupiratins",
    "prioridade": 43,
    "semaforo": "VERDE",
    "notaRisco": 14,
    "gastoPublico": 10109648,
    "retornoPorReal": 0.4,
    "desperdicio": true,
    "reducaoDesmatamento": 38,
    "conformidade": 37,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 22
      },
      {
        "ano": 2022,
        "valor": 21
      },
      {
        "ano": 2023,
        "valor": 18
      },
      {
        "ano": 2024,
        "valor": 18
      }
    ]
  },
  {
    "id": "1722081",
    "nome": "Wanderlândia",
    "prioridade": 44,
    "semaforo": "AMARELO",
    "notaRisco": 61,
    "gastoPublico": 9940943,
    "retornoPorReal": 1.2,
    "desperdicio": false,
    "reducaoDesmatamento": 36,
    "conformidade": 79,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 117
      },
      {
        "ano": 2022,
        "valor": 114
      },
      {
        "ano": 2023,
        "valor": 104
      },
      {
        "ano": 2024,
        "valor": 107
      }
    ]
  },
  {
    "id": "1722107",
    "nome": "Xambioá",
    "prioridade": 45,
    "semaforo": "VERDE",
    "notaRisco": 34,
    "gastoPublico": 6751814,
    "retornoPorReal": 0.3,
    "desperdicio": false,
    "reducaoDesmatamento": 6,
    "conformidade": 78,
    "pendencias": [],
    "serieDesmatamento": [
      {
        "ano": 2021,
        "valor": 93
      },
      {
        "ano": 2022,
        "valor": 78
      },
      {
        "ano": 2023,
        "valor": 74
      },
      {
        "ano": 2024,
        "valor": 57
      }
    ]
  }
];
