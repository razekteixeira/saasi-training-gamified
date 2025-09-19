# 📋 ESPECIFICAÇÃO TÉCNICA DETALHADA - FASE 4
## Escape Room SAASI: Implementação e Acompanhamento

**Versão:** 2.0  
**Data:** Janeiro 2025  
**Autor:** Planeamento AI-Assisted  
**Status:** Especificação Completa - Pronta para Implementação

---

## 🎯 **DEFINIÇÃO DA FASE 4**

### **Identificação**
- **Nome:** Fase 4 - Implementação e Acompanhamento
- **Cenário:** Centro de coordenação SAASI - Acompanhamento ativo do plano de intervenção
- **Objetivo Principal:** Executar o plano de intervenção, gerir imprevistos e ajustar estratégias conforme necessário
- **Duração Estimada:** 25-30 minutos de gameplay
- **Pontuação Máxima:** 100 pontos
- **Código de Desbloqueio:** "SUCESSO2025" (conclusão do escape room)

### **Contexto Narrativo**
```
Passaram-se 3 meses desde o início da implementação do plano de intervenção
da Felisbina. O plano está em execução, mas surgem desafios que requerem
ajustes e tomadas de decisão em tempo real.

Situação atual da Felisbina (3 meses depois):
- Consultas de psicologia: 8 sessões realizadas - progresso positivo
- Programa Qualifica: 50% concluído - algumas dificuldades de adaptação
- Grupos de apoio social: participação irregular - resistência inicial
- Situação habitacional: mudança inesperada - precisa novo alojamento
- Oportunidade de emprego: surgiu vaga em empresa de limpeza

Como técnico do SAASI, deve gerir estas situações, tomar decisões rápidas,
ajustar o plano conforme necessário e garantir que a Felisbina mantém
o progresso na direção da autonomia e integração social.
```

### **Ambiente Virtual**
- **Local:** Centro de Coordenação SAASI - Sala de acompanhamento
- **Elementos Interativos:**
  - Dashboard de acompanhamento com progresso dos programas
  - Sistema de alertas e notificações de entidades parceiras
  - Telefone para gestão de crises e contactos urgentes
  - Computador com base de dados atualizada em tempo real
  - Quadro de estratégias e planos de contingência

---

## 🧩 **ESTRUTURA DOS PUZZLES E ENIGMAS**

### **PUZZLE 1: Gestão de Progresso e Indicadores**
**Objetivo:** Avaliar progresso atual e identificar áreas que necessitam ajuste  
**Tipo:** Dashboard interativo com análise de dados  
**Duração:** 6-8 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const progressManagementPuzzle = {
  objetivo: "Avaliar progresso dos programas e identificar necessidades de ajuste",
  contexto: "3 meses após início da implementação do plano",
  
  programas_em_curso: [
    {
      id: "consultas_psicologia",
      nome: "Consultas de Psicologia",
      entidade: "Centro de Saúde de Ramalde",
      progresso_atual: 66.7, // 8 de 12 sessões
      status: "em_curso",
      indicadores: {
        adesao: 90, // percentagem de presenças
        satisfacao: 85, // autoavaliação Felisbina
        objetivos_alcancados: 70, // avaliação técnica
        autonomia_emocional: 60 // escala 0-100
      },
      observacoes: "Progresso consistente. Redução significativa da dependência emocional do pai.",
      proxima_acao: "continuar_conforme_planeado",
      pontos_avaliacao_correta: 8
    },
    {
      id: "programa_qualifica",
      nome: "Programa Qualifica - Limpeza",
      entidade: "IEFP Porto",
      progresso_atual: 50, // 3 de 6 meses
      status: "com_dificuldades",
      indicadores: {
        adesao: 75, // algumas faltas
        aproveitamento: 60, // dificuldades técnicas
        motivacao: 55, // algum desânimo
        competencias_adquiridas: 45 // em desenvolvimento
      },
      observacoes: "Dificuldades na componente teórica. Precisa apoio adicional.",
      proxima_acao: "ajustar_metodologia",
      pontos_avaliacao_correta: 10
    },
    {
      id: "grupos_apoio_social",
      nome: "Grupos de Apoio Social",
      entidade: "IPSS Solidariedade",
      progresso_atual: 40, // 5 de 12 sessões
      status: "resistencia",
      indicadores: {
        adesao: 40, // muitas faltas
        participacao: 30, // pouco ativa quando presente
        integracao_grupo: 25, // dificuldade em socializar
        rede_social: 20 // ainda muito isolada
      },
      observacoes: "Resistência à participação. Sente-se 'diferente' dos outros participantes.",
      proxima_acao: "estrategia_alternativa",
      pontos_avaliacao_correta: 12
    }
  ],
  
  indicadores_globais: {
    autonomia_pessoal: {
      valor_atual: 65,
      valor_inicial: 30,
      meta_6_meses: 75,
      status: "progresso_positivo"
    },
    empregabilidade: {
      valor_atual: 55,
      valor_inicial: 35,
      meta_6_meses: 70,
      status: "progresso_lento"
    },
    integracao_social: {
      valor_atual: 35,
      valor_inicial: 20,
      meta_6_meses: 60,
      status: "abaixo_expectativas"
    },
    estabilidade_emocional: {
      valor_atual: 70,
      valor_inicial: 40,
      meta_6_meses: 80,
      status: "progresso_excelente"
    }
  },
  
  acoes_disponiveis: [
    {
      programa: "programa_qualifica",
      acao: "solicitar_apoio_pedagogico",
      justificacao: "Dificuldades na componente teórica requerem apoio especializado",
      pontos: 8,
      adequada: true
    },
    {
      programa: "grupos_apoio_social", 
      acao: "mudar_para_grupo_especifico_mulheres_55plus",
      justificacao: "Grupo mais adequado ao perfil etário e de género",
      pontos: 10,
      adequada: true
    },
    {
      programa: "consultas_psicologia",
      acao: "reduzir_frequencia_consultas",
      justificacao: "Progresso permite espaçar consultas",
      pontos: -5,
      adequada: false
    }
  ],
  
  criterios_sucesso: {
    avaliacao_progresso_correta: { min: 80, max: 100, peso: 0.4 },
    identificacao_problemas: { min: 2, max: 3, peso: 0.3 },
    acoes_apropriadas: { min: 2, max: 3, peso: 0.3 }
  }
}
```

### **PUZZLE 2: Gestão de Situações Imprevistas**
**Objetivo:** Responder a crises e situações não planeadas  
**Tipo:** Simulação de cenários com tomada de decisão  
**Duração:** 8-10 minutos  
**Pontuação Máxima:** 30 pontos

#### **Estrutura de Dados:**
```javascript
const crisisManagementPuzzle = {
  objetivo: "Gerir situações imprevistas e tomar decisões rápidas",
  contexto: "Situações que surgem durante a implementação",
  
  cenarios_crise: [
    {
      id: "crise_habitacional",
      titulo: "Crise Habitacional Urgente",
      descricao: "A Felisbina foi despejada da pensão por atraso no pagamento. Está temporariamente na casa de uma conhecida, mas só pode ficar 3 dias.",
      urgencia: "alta",
      tempo_limite: 180, // 3 minutos
      impacto_programas: ["todos"],
      
      opcoes_resposta: [
        {
          id: "contactar_emergencia_social",
          acao: "Contactar serviço de emergência social",
          prazo_execucao: "imediato",
          probabilidade_sucesso: 80,
          pontos: 15,
          correto: true,
          consequencias: "Alojamento temporário garantido"
        },
        {
          id: "solicitar_apoio_familia",
          acao: "Contactar familiares para apoio temporário",
          prazo_execucao: "imediato", 
          probabilidade_sucesso: 30,
          pontos: 5,
          correto: false,
          consequencias: "Família não tem condições para ajudar"
        },
        {
          id: "parar_programas_procurar_casa",
          acao: "Suspender programas para procurar habitação",
          prazo_execucao: "imediato",
          probabilidade_sucesso: 60,
          pontos: -10,
          correto: false,
          consequencias: "Interrupção do progresso nos programas"
        }
      ]
    },
    {
      id: "oportunidade_emprego",
      titulo: "Oportunidade de Emprego Inesperada",
      descricao: "Empresa de limpeza contactou o IEFP. Têm vaga imediata, mas Felisbina só tem 50% do Programa Qualifica completo.",
      urgencia: "media",
      tempo_limite: 240, // 4 minutos
      impacto_programas: ["programa_qualifica"],
      
      opcoes_resposta: [
        {
          id: "aceitar_emprego_suspender_qualifica",
          acao: "Aceitar emprego e suspender Programa Qualifica",
          prazo_execucao: "3 dias",
          probabilidade_sucesso: 90,
          pontos: 8,
          correto: false,
          consequencias: "Emprego a curto prazo mas sem certificação"
        },
        {
          id: "negociar_emprego_part_time",
          acao: "Negociar horário part-time para manter ambos",
          prazo_execucao: "1 semana",
          probabilidade_sucesso: 70,
          pontos: 18,
          correto: true,
          consequencias: "Conciliação ideal entre emprego e formação"
        },
        {
          id: "recusar_completar_qualifica",
          acao: "Recusar emprego para completar formação",
          prazo_execucao: "imediato",
          probabilidade_sucesso: 100,
          pontos: 5,
          correto: false,
          consequencias: "Formação completa mas oportunidade perdida"
        }
      ]
    },
    {
      id: "resistencia_grupos_apoio",
      titulo: "Resistência aos Grupos de Apoio",
      descricao: "Felisbina quer abandonar grupos de apoio. Sente que 'não encaixa' e que os outros participantes 'têm problemas piores'.",
      urgencia: "baixa",
      tempo_limite: 300, // 5 minutos
      impacto_programas: ["grupos_apoio_social"],
      
      opcoes_resposta: [
        {
          id: "aceitar_abandonar_grupos",
          acao: "Aceitar decisão e focar noutras intervenções",
          prazo_execucao: "imediato",
          probabilidade_sucesso: 100,
          pontos: 3,
          correto: false,
          consequencias: "Problema de isolamento social não resolvido"
        },
        {
          id: "encontrar_grupo_alternativo",
          acao: "Procurar grupo mais adequado ao seu perfil",
          prazo_execucao: "2 semanas",
          probabilidade_sucesso: 85,
          pontos: 12,
          correto: true,
          consequencias: "Melhor adaptação e participação ativa"
        },
        {
          id: "sessoes_individuais_preparacao",
          acao: "Sessões individuais para preparar participação em grupo",
          prazo_execucao: "1 mês",
          probabilidade_sucesso: 75,
          pontos: 10,
          correto: true,
          consequencias: "Preparação gradual para integração social"
        }
      ]
    }
  ],
  
  factores_avaliacao: {
    tempo_resposta: {
      peso: 0.2,
      excelente: "< 30 segundos",
      bom: "30-60 segundos", 
      adequado: "60-120 segundos"
    },
    adequacao_resposta: {
      peso: 0.5,
      criterios: ["urgencia", "impacto", "recursos_disponiveis"]
    },
    consequencias_consideradas: {
      peso: 0.3,
      criterios: ["impacto_longo_prazo", "sustentabilidade", "outros_programas"]
    }
  }
}
```

### **PUZZLE 3: Ajuste de Estratégias**
**Objetivo:** Modificar o plano original baseado nos resultados obtidos  
**Tipo:** Reconfiguração interativa de planos  
**Duração:** 7-9 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const strategyAdjustmentPuzzle = {
  objetivo: "Ajustar estratégias baseado no progresso e situações imprevistas",
  contexto: "Após 3 meses de implementação e gestão de crises",
  
  plano_original: {
    mes_1_3: {
      objetivos: ["estabilizacao_emocional", "inicio_programas", "integracao_social"],
      status_real: ["alcancado", "parcialmente_alcancado", "nao_alcancado"]
    },
    mes_4_6: {
      objetivos_originais: ["certificacao_competencias", "autonomia_habitacional", "rede_social_estabelecida"],
      necessidade_ajuste: true
    }
  },
  
  situacao_atual: {
    pontos_fortes: [
      "Progresso excelente na estabilização emocional",
      "Boa relação com psicóloga",
      "Oportunidade de emprego identificada",
      "Situação habitacional resolvida (temporária)"
    ],
    areas_melhoria: [
      "Dificuldades no Programa Qualifica - componente teórica",
      "Resistência aos grupos de apoio tradicionais",
      "Necessidade de habitação definitiva",
      "Ansiedade sobre emprego versus formação"
    ],
    recursos_adicionais: [
      "Empresa interessada em contratação",
      "Possibilidade de apoio pedagógico especializado",
      "Grupo de apoio específico para mulheres 55+",
      "Fundo de emergência habitacional aprovado"
    ]
  },
  
  estrategias_ajuste: [
    {
      id: "modelo_hibrido_emprego_formacao",
      nome: "Modelo Híbrido: Emprego + Formação",
      descricao: "Combinar emprego part-time com conclusão do Programa Qualifica",
      adequado: true,
      pontos: 12,
      vantagens: ["Experiência prática", "Rendimento imediato", "Certificação formal"],
      desafios: ["Gestão de tempo", "Coordenação entidades"],
      implementacao: {
        prazo: "2 semanas",
        passos: [
          "Negociar horário flexível com empresa",
          "Ajustar calendário Programa Qualifica",
          "Reforçar apoio pedagógico"
        ]
      }
    },
    {
      id: "foco_competencias_praticas",
      nome: "Foco em Competências Práticas",
      descricao: "Priorizar componente prática do Qualifica e adiar teoria",
      adequado: true,
      pontos: 8,
      vantagens: ["Alinha com pontos fortes", "Menos pressão académica"],
      desafios: ["Certificação incompleta"],
      implementacao: {
        prazo: "Imediato",
        passos: [
          "Renegociar plano formativo com IEFP",
          "Concentrar em competências técnicas",
          "Agendar teoria para fase posterior"
        ]
      }
    },
    {
      id: "apoio_social_personalizado",
      nome: "Apoio Social Personalizado",
      descricao: "Substituir grupos genéricos por apoio individual + atividades específicas",
      adequado: true,
      pontos: 10,
      vantagens: ["Menos ansiedade social", "Apoio mais direcionado"],
      desafios: ["Mais recursos técnicos necessários"],
      implementacao: {
        prazo: "1 mês",
        passos: [
          "Agendar sessões individuais IPSS",
          "Identificar atividades de interesse",
          "Gradual integração em atividades grupo"
        ]
      }
    },
    {
      id: "habitacao_definitiva",
      nome: "Solução Habitacional Definitiva",
      descricao: "Priorizar encontrar habitação estável antes de avançar outros objetivos",
      adequado: false,
      pontos: -5,
      vantagens: ["Estabilidade base"],
      desafios: ["Atraso outros objetivos", "Mercado habitacional difícil"],
      justificacao_inadequada: "Habitação temporária é suficiente para manter programas"
    }
  ],
  
  plano_ajustado_recomendado: {
    mes_4: {
      foco_principal: "Implementação modelo híbrido",
      atividades: [
        "Início emprego part-time (20h/semana)",
        "Programa Qualifica adaptado (componente prática)",
        "Sessões psicologia quinzenais (manutenção)",
        "Apoio individual IPSS"
      ]
    },
    mes_5: {
      foco_principal: "Consolidação modelo híbrido",
      atividades: [
        "Avaliação adaptação emprego",
        "Progressão componente prática Qualifica",
        "Início gradual atividades sociais específicas",
        "Procura habitação definitiva"
      ]
    },
    mes_6: {
      foco_principal: "Preparação autonomia",
      atividades: [
        "Decisão sobre full-time vs part-time",
        "Certificação competências práticas",
        "Redução gradual apoio técnico",
        "Plano manutenção conquistas"
      ]
    }
  },
  
  criterios_sucesso: {
    estrategias_adequadas_selecionadas: { min: 3, max: 3, peso: 0.5 },
    plano_realista: { min: 80, max: 100, peso: 0.3 }, // viabilidade
    consideracao_recursos: { min: 85, max: 100, peso: 0.2 } // uso eficiente recursos
  }
}
```

### **PUZZLE 4: Preparação para Autonomia**
**Objetivo:** Definir estratégias de manutenção e redução gradual do apoio  
**Tipo:** Planeamento de transição e sustentabilidade  
**Duração:** 8-10 minutos  
**Pontuação Máxima:** 20 pontos

#### **Estrutura de Dados:**
```javascript
const autonomyPreparationPuzzle = {
  objetivo: "Planear transição para autonomia e sustentabilidade das conquistas",
  contexto: "Preparação para redução gradual do apoio técnico",
  
  areas_autonomia: [
    {
      id: "autonomia_habitacional",
      nome: "Autonomia Habitacional",
      status_atual: "dependente_apoio_emergencial",
      meta_6_meses: "habitacao_independente",
      acoes_necessarias: [
        {
          acao: "Inscrição habitação social",
          prazo: "imediato",
          responsavel: "tecnico_saasi",
          pontos: 5
        },
        {
          acao: "Poupança para caução",
          prazo: "3 meses",
          responsavel: "felisbina_apoio_tecnico",
          pontos: 4
        },
        {
          acao: "Procura ativa mercado privado",
          prazo: "1 mês",
          responsavel: "felisbina_autonoma",
          pontos: 3
        }
      ]
    },
    {
      id: "autonomia_profissional",
      nome: "Autonomia Profissional",
      status_atual: "emprego_part_time_apoiado",
      meta_6_meses: "emprego_estavel_autonomo",
      acoes_necessarias: [
        {
          acao: "Certificação competências completa",
          prazo: "2 meses",
          responsavel: "iefp_felisbina",
          pontos: 6
        },
        {
          acao: "Negociação full-time",
          prazo: "4 meses",
          responsavel: "felisbina_apoio_minimo",
          pontos: 5
        },
        {
          acao: "Plano desenvolvimento carreira",
          prazo: "6 meses",
          responsavel: "felisbina_autonoma",
          pontos: 4
        }
      ]
    },
    {
      id: "autonomia_emocional",
      nome: "Autonomia Emocional",
      status_atual: "progresso_significativo_apoio_ocasional",
      meta_6_meses: "estabilidade_emocional_independente",
      acoes_necessarias: [
        {
          acao: "Redução frequência consultas psicologia",
          prazo: "1 mês",
          responsavel: "centro_saude",
          pontos: 4
        },
        {
          acao: "Estratégias gestão stress autonomas",
          prazo: "2 meses",
          responsavel: "felisbina_psicologo",
          pontos: 5
        },
        {
          acao: "Rede apoio informal estabelecida",
          prazo: "4 meses",
          responsavel: "felisbina_apoio_minimo",
          pontos: 6
        }
      ]
    },
    {
      id: "autonomia_social",
      nome: "Autonomia Social",
      status_atual: "participacao_limitada_apoio_necessario",
      meta_6_meses: "rede_social_activa_independente",
      acoes_necessarias: [
        {
          acao: "Participação regular atividades escolhidas",
          prazo: "2 meses",
          responsavel: "felisbina_apoio_tecnico",
          pontos: 4
        },
        {
          acao: "Desenvolvimento amizades independentes",
          prazo: "4 meses",
          responsavel: "felisbina_apoio_minimo",
          pontos: 5
        },
        {
          acao: "Papel ativo na comunidade",
          prazo: "6 meses",
          responsavel: "felisbina_autonoma",
          pontos: 3
        }
      ]
    }
  ],
  
  estrategias_manutencao: [
    {
      id: "contactos_seguimento",
      nome: "Contactos de Seguimento",
      descricao: "Sistema de contactos regulares com frequência decrescente",
      cronograma: {
        mes_1: "semanal",
        mes_2: "quinzenal", 
        mes_3_6: "mensal",
        apos_6_meses: "trimestral"
      },
      pontos: 8,
      adequado: true
    },
    {
      id: "rede_apoio_emergencia",
      nome: "Rede de Apoio de Emergência",
      descricao: "Contactos para situações de crise ou dúvidas urgentes",
      componentes: [
        "Número directo técnico SAASI",
        "Contacto psicóloga centro saúde",
        "Linha apoio IPSS",
        "Contacto colega trabalho confiança"
      ],
      pontos: 6,
      adequado: true
    },
    {
      id: "indicadores_alerta",
      nome: "Sistema de Indicadores de Alerta",
      descricao: "Sinais que indicam necessidade de reforço de apoio",
      indicadores: [
        "Faltas frequentes ao trabalho",
        "Isolamento social prolongado",
        "Dificuldades financeiras graves",
        "Sinais recaída dependência emocional"
      ],
      pontos: 5,
      adequado: true
    },
    {
      id: "apoio_intensivo_permanente",
      nome: "Manutenção Apoio Intensivo",
      descricao: "Manter todos os apoios com mesma intensidade",
      pontos: -8,
      adequado: false,
      justificacao: "Impede desenvolvimento autonomia e é insustentável"
    }
  ],
  
  plano_reducao_apoio: {
    fase_1: {
      periodo: "Mês 4",
      reducoes: [
        "Consultas psicologia: de semanal para quinzenal",
        "Contactos SAASI: de semanal para quinzenal"
      ],
      manutencoes: [
        "Emprego part-time com apoio",
        "Programa Qualifica adaptado",
        "Apoio habitacional ativo"
      ]
    },
    fase_2: {
      periodo: "Mês 5",
      reducoes: [
        "Apoio IPSS: de individual para grupo",
        "Contactos SAASI: de quinzenal para mensal"
      ],
      manutencoes: [
        "Consultas psicologia quinzenais",
        "Acompanhamento emprego"
      ]
    },
    fase_3: {
      periodo: "Mês 6",
      reducoes: [
        "Consultas psicologia: de quinzenal para mensal",
        "Contactos SAASI: apenas se solicitado"
      ],
      manutencoes: [
        "Emprego (idealmentefull-time)",
        "Habitação estável",
        "Rede apoio informal ativa"
      ]
    }
  },
  
  criterios_sucesso: {
    plano_autonomia_realista: { min: 80, max: 100, peso: 0.4 },
    estrategias_manutencao_adequadas: { min: 3, max: 3, peso: 0.3 },
    reducao_gradual_apoio: { min: 85, max: 100, peso: 0.3 }
  }
}
```

---

## ⚙️ **FLUXO DE ESTADOS DA FASE 4**

### **Sistema de Estados**
```javascript
const phase4States = {
  INICIO: {
    name: "apresentacao_fase4",
    description: "Apresentação da Fase 4 e situação atual após 3 meses",
    duration: 90, // segundos
    nextState: "GESTAO_PROGRESSO",
    actions: ["start_phase4", "review_3month_progress"]
  },
  
  GESTAO_PROGRESSO: {
    name: "gestao_progresso",
    description: "Avaliação do progresso atual e identificação de necessidades",
    duration: 480, // 8 minutos
    nextState: "GESTAO_CRISES",
    actions: ["analyze_progress", "identify_issues", "plan_adjustments"],
    completionCriteria: {
      programs_analyzed: 3,
      issues_identified: 2,
      actions_planned: 3
    }
  },
  
  GESTAO_CRISES: {
    name: "gestao_crises",
    description: "Resposta a situações imprevistas e tomada de decisão",
    duration: 600, // 10 minutos
    nextState: "AJUSTE_ESTRATEGIAS",
    actions: ["assess_crisis", "choose_response", "implement_solution"],
    completionCriteria: {
      crisis_scenarios_completed: 3,
      appropriate_responses: 2,
      quick_decision_making: true
    }
  },
  
  AJUSTE_ESTRATEGIAS: {
    name: "ajuste_estrategias",
    description: "Modificação do plano original baseado nos resultados",
    duration: 540, // 9 minutos
    nextState: "PREPARACAO_AUTONOMIA",
    actions: ["evaluate_strategies", "adjust_plan", "coordinate_changes"],
    completionCriteria: {
      strategies_adjusted: 3,
      plan_feasibility: 80, // percentagem
      coordination_established: true
    }
  },
  
  PREPARACAO_AUTONOMIA: {
    name: "preparacao_autonomia",
    description: "Planeamento da transição para autonomia",
    duration: 600, // 10 minutos
    nextState: "CONCLUSAO",
    actions: ["plan_autonomy", "setup_maintenance", "reduce_support"],
    completionCriteria: {
      autonomy_plan_created: true,
      maintenance_strategies: 3,
      support_reduction_planned: true
    }
  },
  
  CONCLUSAO: {
    name: "finalizacao_escape_room",
    description: "Conclusão do escape room e avaliação final",
    duration: 180, // 3 minutos
    nextState: "COMPLETED",
    actions: ["view_final_report", "export_complete_case", "celebration"]
  }
}
```

---

## 📊 **SISTEMA DE PONTUAÇÃO FASE 4**

### **Algoritmo de Pontuação**
```javascript
const phase4ScoringSystem = {
  baseTasks: {
    gestao_progresso: {
      max_points: 25,
      components: {
        progress_evaluation: 10,
        problem_identification: 8,
        appropriate_actions: 7
      }
    },
    gestao_crises: {
      max_points: 30,
      components: {
        crisis_assessment: 12,
        decision_quality: 12,
        response_speed: 6
      }
    },
    ajuste_estrategias: {
      max_points: 25,
      components: {
        strategy_adaptation: 10,
        plan_feasibility: 8,
        coordination_effectiveness: 7
      }
    },
    preparacao_autonomia: {
      max_points: 20,
      components: {
        autonomy_planning: 8,
        maintenance_strategies: 7,
        transition_realism: 5
      }
    }
  },
  
  multipliers: {
    gestao_eficaz_tempo: {
      condition: "completion_time <= ideal_time",
      multiplier: 1.15,
      description: "Gestão eficaz do tempo em todas as tarefas"
    },
    tomada_decisao_rapida: {
      condition: "crisis_response_time <= 60_seconds",
      multiplier: 1.2,
      description: "Tomada de decisão rápida em situações de crise"
    },
    plano_integrado: {
      condition: "all_areas_coordinated == true",
      multiplier: 1.1,
      description: "Plano final integrado e coordenado"
    },
    autonomia_sustentavel: {
      condition: "autonomy_plan_feasibility >= 90%",
      multiplier: 1.25,
      description: "Plano de autonomia altamente sustentável"
    }
  },
  
  penalties: {
    resposta_inadequada_crise: {
      penalty: -8,
      description: "Resposta inadequada a situação de crise"
    },
    estrategia_irrealista: {
      penalty: -5,
      description: "Estratégia de ajuste irrealista ou inviável"
    },
    coordenacao_falha: {
      penalty: -6,
      description: "Falha na coordenação entre entidades"
    },
    plano_autonomia_inadequado: {
      penalty: -10,
      description: "Plano de autonomia inadequado ou insustentável"
    }
  }
}
```

### **Sistema de Achievement Final**
```javascript
const phase4Achievements = {
  badges_especificos: [
    {
      id: "gestor_crises",
      nome: "Gestor de Crises",
      descricao: "Resolveu todas as situações de crise com decisões adequadas",
      icone: "🚨",
      criterio: "all_crisis_scenarios_solved_correctly",
      pontos_bonus: 15,
      raridade: "epic"
    },
    {
      id: "estrategista_adaptavel",
      nome: "Estrategista Adaptável",
      descricao: "Ajustou estratégias de forma eficaz baseado no progresso real",
      icone: "🎯",
      criterio: "strategy_adjustments_score >= 90%",
      pontos_bonus: 12,
      raridade: "rare"
    },
    {
      id: "mentor_autonomia",
      nome: "Mentor da Autonomia",
      descricao: "Criou plano de autonomia sustentável e realista",
      icone: "🌟",
      criterio: "autonomy_plan_quality >= 85%",
      pontos_bonus: 18,
      raridade: "legendary"
    },
    {
      id: "master_saasi",
      nome: "Master SAASI",
      descricao: "Completou todo o escape room com excelência",
      icone: "👑",
      criterio: "all_phases_score >= 80% && phase4_score >= 85%",
      pontos_bonus: 25,
      raridade: "legendary"
    }
  ],
  
  // Certificação final
  certificacao_final: {
    criterios: {
      tecnico_competente: { min_score: 50, title: "Técnico Competente SAASI" },
      tecnico_proficiente: { min_score: 70, title: "Técnico Proficiente SAASI" },
      tecnico_especialista: { min_score: 85, title: "Técnico Especialista SAASI" },
      master_saasi: { min_score: 95, title: "Master SAASI" }
    }
  }
}
```

---

## 📱 **INTERFACE E EXPERIÊNCIA DO UTILIZADOR**

### **Dashboard de Acompanhamento**
```css
.progress-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.program-progress-card {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 15px;
  padding: 20px;
  border-left: 4px solid var(--progress-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.progress-indicator {
  position: relative;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 15px 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--progress-start), var(--progress-end));
  border-radius: 4px;
  transition: width 0.5s ease;
}
```

### **Sistema de Alertas de Crise**
```css
.crisis-alert {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  animation: pulse 2s infinite;
  border: 2px solid #ff4757;
}

.crisis-timer {
  position: absolute;
  top: 10px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-weight: bold;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

### **Timeline de Ajustes**
```css
.adjustment-timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #667eea, #764ba2);
  transform: translateX(-50%);
}

.timeline-event {
  position: relative;
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.timeline-event:nth-child(odd) {
  flex-direction: row-reverse;
}

.event-content {
  flex: 1;
  margin: 0 20px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
```

---

## 🎯 **DADOS CONTEXTUAIS ESPECÍFICOS**

### **Estado da Felisbina após 3 meses**
```javascript
const felisbina3MonthsData = {
  // Evolução desde início
  evolucao_geral: {
    autonomia_emocional: {
      inicial: 30,
      atual: 65,
      meta_6_meses: 80,
      progresso: "positivo"
    },
    empregabilidade: {
      inicial: 25,
      atual: 55,
      meta_6_meses: 75,
      progresso: "moderado"
    },
    integracao_social: {
      inicial: 20,
      atual: 35,
      meta_6_meses: 60,
      progresso: "lento"
    },
    estabilidade_financeira: {
      inicial: 40,
      atual: 50,
      meta_6_meses: 70,
      progresso: "lento"
    }
  },
  
  // Situações específicas atual
  situacao_actual: {
    habitacao: {
      status: "temporaria_estavel",
      local: "Alojamento emergencial Câmara",
      prazo_maximo: "3 meses",
      necessidade_acao: "urgente"
    },
    emprego: {
      status: "oportunidade_disponivel",
      empresa: "Limpezas Profissionais Porto Lda",
      tipo: "part_time_20h",
      salario: 450.00,
      inicio_possivel: "2 semanas"
    },
    formacao: {
      status: "em_curso_dificuldades",
      programa: "Qualifica - Limpeza",
      progresso: "50%",
      principal_dificuldade: "componente_teorica",
      apoio_necessario: "pedagogico_especializado"
    },
    saude_mental: {
      status: "melhoria_significativa",
      consultas_realizadas: 8,
      proxima_consulta: "1 semana",
      observacoes: "Redução dependência emocional. Maior confiança."
    },
    rede_social: {
      status: "muito_limitada",
      contactos_regulares: 2, // psicóloga + técnico SAASI
      participacao_grupos: "irregular_resistente",
      isolamento: "ainda_significativo"
    }
  },
  
  // Recursos disponíveis
  recursos_actuais: {
    financeiros: {
      rsi: 242.23,
      psi: 324.55,
      apoio_alimentar: 50.00,
      total_mensal: 616.78
    },
    sociais: {
      tecnico_saasi: "contacto_regular",
      psicologa: "quinzenal",
      conhecida_pensao: "apoio_pontual",
      colegas_curso: "contacto_minimo"
    },
    institucionais: {
      saasi: "apoio_ativo",
      centro_saude: "consultas_regulares",
      iefp: "programa_em_curso",
      camara: "alojamento_temporario",
      ipss: "disponivel_resistencia"
    }
  }
}
```

---

## 🛠️ **PLANO DE IMPLEMENTAÇÃO TÉCNICA**

### **Estrutura de Ficheiros Fase 4**
```
src/phase4/
├── Phase4Manager.js              # Coordenador principal Fase 4
├── ProgressManagementPuzzle.js   # Puzzle gestão progresso
├── CrisisManagementPuzzle.js     # Puzzle gestão crises
├── StrategyAdjustmentPuzzle.js   # Puzzle ajuste estratégias
├── AutonomyPreparationPuzzle.js  # Puzzle preparação autonomia
├── DashboardComponents.js        # Componentes dashboard
├── TimelineBuilder.js            # Constructor timeline interativo
├── CrisisAlertSystem.js          # Sistema alertas crises
└── Phase4Data.js                 # Dados específicos Fase 4
```

### **Cronograma de Desenvolvimento**

#### **Semana 1: Core Infrastructure (5 dias)**
- [ ] Phase4Manager.js - Estrutura principal
- [ ] Sistema de estados e transições
- [ ] Interface dashboard base
- [ ] Integração dados fases anteriores
- [ ] Sistema save/load específico

#### **Semana 2: Puzzles 1-2 (5 dias)**
- [ ] ProgressManagementPuzzle.js - Avaliação progresso
- [ ] CrisisManagementPuzzle.js - Gestão situações
- [ ] Interface dashboard progresso
- [ ] Sistema alertas crises
- [ ] Cronómetros e pressão temporal

#### **Semana 3: Puzzles 3-4 (5 dias)**
- [ ] StrategyAdjustmentPuzzle.js - Ajuste estratégias
- [ ] AutonomyPreparationPuzzle.js - Preparação autonomia
- [ ] TimelineBuilder.js - Constructor timeline
- [ ] Sistema redução apoio
- [ ] Planeamento sustentabilidade

#### **Semana 4: Integration & Polish (5 dias)**
- [ ] Integração completa todos puzzles
- [ ] Sistema pontuação e achievements finais
- [ ] Relatório final integrado 4 fases
- [ ] Certificação final utilizador
- [ ] Testes responsividade e performance

### **Total: 20 dias de desenvolvimento**

---

## 📊 **MÉTRICAS DE SUCESSO E AVALIAÇÃO**

### **Critérios de Conclusão**
1. **Gestão Eficaz:** 80%+ na avaliação de progresso e crises
2. **Adaptabilidade:** Ajustes estratégicos adequados e viáveis
3. **Visão Longo Prazo:** Plano autonomia sustentável e realista
4. **Integração:** Coordenação eficaz entre todas entidades

### **Pontuação Mínima Final**
- **Escape Room Completo:** 280/400 pontos (70%)
- **Fase 4 Específica:** 65/100 pontos (65%)
- **Certificação Master:** 340/400 pontos (85%)

### **Indicadores Pedagógicos**
- **Tomada Decisão:** Rapidez e adequação em situações pressão
- **Pensamento Sistémico:** Visão integrada e coordenação multisectorial
- **Planeamento Estratégico:** Capacidade ajustar planos baseado em dados reais
- **Gestão Transição:** Preparação sustentável para autonomia

---

## 🎓 **OBJETIVOS PEDAGÓGICOS FASE 4**

### **Competências Avançadas (40%)**
- Gestão de situações complexas e imprevistas
- Tomada de decisão sob pressão temporal
- Adaptação estratégica baseada em dados reais
- Coordenação multisectorial eficaz

### **Visão Sistémica (35%)**
- Integração de múltiplas variáveis e contextos
- Planeamento sustentável longo prazo
- Gestão transição apoio → autonomia
- Avaliação impacto e sustentabilidade

### **Competências Relacionais (25%)**
- Comunicação em situações crise
- Negociação e coordenação institucional
- Empoderamento e capacitação utilizador
- Gestão expectativas e limitações

---

## 🏁 **CONCLUSÃO DO ESCAPE ROOM**

### **Relatório Final Integrado**
```javascript
const finalReport = {
  summary: {
    total_score: "X/400 pontos",
    completion_time: "X horas e Y minutos",
    certification_level: "Técnico [Nível] SAASI",
    achievements_unlocked: "X de Y badges",
    strong_areas: [],
    improvement_areas: [],
    overall_performance: "percentagem"
  },
  
  phase_breakdown: {
    fase1: { score: "X/100", key_learning: "Acolhimento e avaliação" },
    fase2: { score: "X/100", key_learning: "Identificação necessidades" },
    fase3: { score: "X/100", key_learning: "Planeamento intervenção" },
    fase4: { score: "X/100", key_learning: "Implementação e autonomia" }
  },
  
  case_outcome: {
    felisbina_final_status: {
      autonomia_alcancada: "percentagem",
      emprego_estavel: "boolean",
      habitacao_resolvida: "boolean",
      rede_social_ativa: "boolean",
      saude_mental_estavel: "boolean"
    },
    success_factors: [],
    ongoing_needs: [],
    follow_up_plan: "resumo"
  },
  
  recommendations: {
    continuous_learning: [],
    skills_to_develop: [],
    additional_training: [],
    peer_learning_opportunities: []
  }
}
```

---

**Status:** ✅ ESPECIFICAÇÃO COMPLETA - PRONTA PARA IMPLEMENTAÇÃO

**Próximo Passo:** Iniciar desenvolvimento seguindo o plano de implementação de 4 semanas (20 dias).

---

*Documento gerado em Janeiro 2025 - Versão 2.0*  
*Fase final do Escape Room SAASI - Preparação completa para implementação*
