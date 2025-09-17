# 📋 ESPECIFICAÇÃO TÉCNICA DETALHADA - FASE 2
## Escape Room SAASI: Identificação de Necessidades e Planeamento

**Versão:** 2.0  
**Data:** Janeiro 2025  
**Autor:** Planeamento AI-Assisted  
**Status:** Especificação Completa - Pronta para Implementação

---

## 🎯 **DEFINIÇÃO DA FASE 2**

### **Identificação**
- **Nome:** Fase 2 - Identificação de Necessidades e Planeamento
- **Cenário:** Mesa de trabalho com computador e documentos - Análise aprofundada
- **Objetivo Principal:** Mapear problemas específicos e criar plano de intervenção personalizado
- **Duração Estimada:** 15-20 minutos de gameplay
- **Pontuação Máxima:** 100 pontos
- **Código de Desbloqueio:** "PLANO2025" (para aceder à Fase 3)

### **Contexto Narrativo**
```
Após o acolhimento inicial, agora precisa de fazer uma análise mais profunda
da situação da Felisbina. Com base na informação recolhida na Fase 1,
deve identificar as necessidades específicas e criar um plano de intervenção.

A Felisbina demonstrou disponibilidade e capacidade para trabalhar, mas
apresenta várias barreiras que precisam ser endereçadas:
- Dependência emocional do ex-companheiro
- Isolamento social significativo  
- Baixa autoestima e confiança
- Necessidades de qualificação profissional

Como técnico do SAASI, deve priorizar as intervenções e articular
com as entidades competentes para criar um plano integrado.
```

### **Ambiente Virtual**
- **Local:** Mesa de trabalho SAASI - Área de planeamento
- **Elementos Interativos:**
  - Computador com bases de dados de programas e medidas
  - Quadro de planeamento com post-its virtuais
  - Telefone para contactos com entidades parceiras
  - Calculadora de benefícios e apoios
  - Agenda para marcação de consultas e follow-ups

---

## 🧩 **ESTRUTURA DOS PUZZLES E ENIGMAS**

### **PUZZLE 1: Mapeamento de Problemas**
**Objetivo:** Identificar e priorizar problemas específicos da Felisbina  
**Tipo:** Sistema de categorização e priorização  
**Duração:** 4-5 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const problemMappingPuzzle = {
  objetivo: "Identificar e categorizar problemas por ordem de prioridade",
  personagem: "Felisbina Santos",
  contexto: "Análise aprofundada pós-acolhimento",
  
  problemas_identificados: [
    {
      id: "dependencia_emocional",
      problema: "Dependência emocional do ex-companheiro",
      categoria: "psicossocial",
      prioridade_correta: 1, // Alta prioridade
      entidade_competente: "saude",
      pontos: 8,
      justificacao: "Impede autonomia e tomada de decisões independentes"
    },
    {
      id: "isolamento_social", 
      problema: "Isolamento social e falta de rede de apoio",
      categoria: "social",
      prioridade_correta: 2, // Média-alta prioridade
      entidade_competente: "outros",
      pontos: 7,
      justificacao: "Afeta motivação e acesso a oportunidades"
    },
    {
      id: "baixa_qualificacao",
      problema: "Baixa qualificação profissional (6º ano)",
      categoria: "formacao",
      prioridade_correta: 3, // Média prioridade
      entidade_competente: "educacao",
      pontos: 6,
      justificacao: "Limita acesso a empregos qualificados"
    },
    {
      id: "autoestima_baixa",
      problema: "Baixa autoestima e falta de confiança",
      categoria: "psicossocial",
      prioridade_correta: 2, // Média-alta prioridade
      entidade_competente: "saude",
      pontos: 7,
      justificacao: "Impacta capacidade de procura ativa de emprego"
    },
    {
      id: "dividas_financeiras",
      problema: "Dívidas em atraso (renda e eletricidade)",
      categoria: "financeiro",
      prioridade_correta: 4, // Média-baixa prioridade
      entidade_competente: "outros",
      pontos: 5,
      justificacao: "Situação estável com RSI, não é urgente"
    },
    {
      id: "competencias_digitais",
      problema: "Competências digitais básicas limitadas",
      categoria: "formacao",
      prioridade_correta: 4, // Média-baixa prioridade
      entidade_competente: "educacao",
      pontos: 4,
      justificacao: "Importante mas não crítico para reintegração inicial"
    }
  ],
  
  categorias: {
    psicossocial: {
      nome: "Problemas Psicossociais",
      cor: "#e91e63",
      entidade: "Saúde Mental/Psicologia"
    },
    social: {
      nome: "Problemas Sociais",
      cor: "#ff9800", 
      entidade: "Serviços Sociais"
    },
    formacao: {
      nome: "Necessidades de Formação",
      cor: "#2196f3",
      entidade: "Educação/Formação"
    },
    financeiro: {
      nome: "Questões Financeiras",
      cor: "#4caf50",
      entidade: "Apoios Sociais"
    }
  },
  
  criterios_sucesso: {
    problemas_categorizados: { min: 6, max: 6, peso: 0.4 },
    prioridades_corretas: { min: 4, max: 6, peso: 0.4 },
    justificacoes_adequadas: { min: 80, max: 100, peso: 0.2 } // percentagem
  }
}
```

### **PUZZLE 2: Análise de Benefícios e Apoios**
**Objetivo:** Calcular e otimizar benefícios sociais disponíveis  
**Tipo:** Sistema de cálculo e simulação  
**Duração:** 3-4 minutos  
**Pontuação Máxima:** 20 pontos

#### **Estrutura de Dados:**
```javascript
const benefitsAnalysisPuzzle = {
  objetivo: "Analisar benefícios atuais e identificar apoios adicionais",
  tipo: "calculation_simulation",
  
  situacao_atual: {
    rsi: {
      valor_mensal: 242.23,
      data_inicio: "2023-01-01",
      situacao: "ativo",
      condicoes: ["procura_ativa_emprego", "disponibilidade_trabalho"]
    },
    psi: {
      valor_mensal: 324.55,
      data_inicio: "2023-01-01",
      situacao: "ativo",
      descricao: "Prestação Social para a Inclusão"
    },
    despesas_mensais: {
      renda: 180.00,
      eletricidade: 45.00,
      agua: 25.00,
      alimentacao: 120.00,
      transporte: 30.00,
      outros: 50.00,
      total: 450.00
    },
    dividas: {
      renda_atraso: 150.00,
      eletricidade_atraso: 300.00,
      total: 450.00
    }
  },
  
  apoios_disponiveis: [
    {
      id: "apoio_alimentar",
      nome: "Apoio Alimentar de Emergência",
      valor_mensal: 50.00,
      duracao_meses: 6,
      elegivel: true,
      criterios: ["rsi_ativo", "agregado_1_pessoa"],
      pontos: 5
    },
    {
      id: "fundo_emergencia_social",
      nome: "Fundo de Emergência Social",
      valor_unico: 300.00,
      elegivel: true,
      criterios: ["dividas_habitacao", "rsi_ativo"],
      pontos: 8,
      aplicacao: "pagamento_dividas"
    },
    {
      id: "tarifa_social_energia",
      nome: "Tarifa Social de Energia",
      desconto_percentual: 33.8,
      elegivel: true,
      criterios: ["rsi_ativo"],
      pontos: 4
    },
    {
      id: "passe_social",
      nome: "Passe Social +",
      valor_mensal: 6.00, // em vez de 30.00
      elegivel: true,
      criterios: ["rsi_ativo", "idade_55_mais"],
      pontos: 3
    }
  ],
  
  simulacao_melhorias: {
    cenario_atual: {
      rsi: 242.23,
      psi: 324.55,
      total_base: 566.78,
      despesas: 450.00,
      saldo_atual: 116.78 // situação já positiva
    },
    cenario_otimizado: {
      rsi: 242.23,
      psi: 324.55,
      apoio_alimentar: 50.00,
      poupanca_energia: 15.23, // 33.8% de 45€
      poupanca_transporte: 24.00, // 30€ - 6€
      total_mensal: 656.01,
      saldo_mensal: 206.01, // significativamente melhor
      dividas_resolvidas: 300.00 // via fundo emergência
    }
  },
  
  acoes_necessarias: [
    {
      acao: "solicitar_apoio_alimentar",
      entidade: "Segurança Social",
      prazo: "15 dias",
      pontos: 5
    },
    {
      acao: "requerer_fundo_emergencia",
      entidade: "Câmara Municipal",
      prazo: "30 dias", 
      pontos: 8
    },
    {
      acao: "ativar_tarifa_social",
      entidade: "EDP/Endesa",
      prazo: "7 dias",
      pontos: 4
    },
    {
      acao: "solicitar_passe_social",
      entidade: "STCP/Metro",
      prazo: "10 dias",
      pontos: 3
    }
  ]
}
```

### **PUZZLE 3: Articulação com Entidades**
**Objetivo:** Contactar e articular com entidades competentes  
**Tipo:** Sistema de comunicação e agendamento  
**Duração:** 4-5 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const entityCoordinationPuzzle = {
  objetivo: "Articular com entidades para endereçar problemas identificados",
  tipo: "communication_scheduling",
  
  entidades_disponiveis: [
    {
      id: "centro_saude_campanha",
      nome: "Centro de Saúde de Campanhã",
      tipo: "saude",
      servicos: ["psicologia", "psiquiatria", "medicina_geral"],
      contacto: "220 123 456",
      email: "campanha@arsnorte.pt",
      disponibilidade: {
        psicologia: "2 semanas",
        psiquiatria: "6 semanas",
        medicina_geral: "1 semana"
      },
      adequado_para: ["dependencia_emocional", "autoestima_baixa"]
    },
    {
      id: "centro_qualificacao_porto",
      nome: "Centro de Qualificação do Porto",
      tipo: "educacao",
      servicos: ["rvcc", "formacao_profissional", "competencias_digitais"],
      contacto: "220 987 654",
      email: "porto@qualifica.pt",
      disponibilidade: {
        rvcc: "1 mês",
        formacao_profissional: "próximo curso em 3 meses",
        competencias_digitais: "2 semanas"
      },
      adequado_para: ["baixa_qualificacao", "competencias_digitais"]
    },
    {
      id: "centro_social_campanha",
      nome: "Centro Social de Campanhã",
      tipo: "outros",
      servicos: ["grupos_apoio", "atividades_sociais", "voluntariado"],
      contacto: "220 456 789",
      email: "social@campanha.pt",
      disponibilidade: {
        grupos_apoio: "próximo grupo em 1 semana",
        atividades_sociais: "imediato",
        voluntariado: "2 semanas"
      },
      adequado_para: ["isolamento_social"]
    },
    {
      id: "servico_social_municipal",
      nome: "Serviço Social Municipal",
      tipo: "outros",
      servicos: ["apoio_financeiro", "mediacao_dividas", "habitacao"],
      contacto: "220 321 654",
      email: "social@cm-porto.pt",
      disponibilidade: {
        apoio_financeiro: "1 semana",
        mediacao_dividas: "2 semanas",
        habitacao: "1 mês"
      },
      adequado_para: ["dividas_financeiras"]
    }
  ],
  
  tipos_contacto: [
    {
      tipo: "agendamento_consulta",
      pontos: 10,
      tempo_necessario: 60, // segundos
      informacao_necessaria: ["problema_especifico", "urgencia", "disponibilidade_utente"]
    },
    {
      tipo: "pedido_informacao",
      pontos: 5,
      tempo_necessario: 30,
      informacao_necessaria: ["servico_interesse", "criterios_elegibilidade"]
    },
    {
      tipo: "encaminhamento_formal",
      pontos: 15,
      tempo_necessario: 90,
      informacao_necessaria: ["relatorio_caso", "objetivos_intervencao", "prazo_resposta"]
    }
  ],
  
  criterios_avaliacao: {
    adequacao_entidade: {
      peso: 0.4,
      descricao: "Escolha da entidade adequada ao problema"
    },
    tipo_contacto_apropriado: {
      peso: 0.3,
      descricao: "Tipo de contacto adequado à situação"
    },
    informacao_fornecida: {
      peso: 0.3,
      descricao: "Qualidade da informação fornecida"
    }
  }
}
```

### **PUZZLE 4: Plano de Intervenção Integrado**
**Objetivo:** Criar cronograma de intervenções priorizadas  
**Tipo:** Sistema de planeamento temporal  
**Duração:** 4-5 minutos  
**Pontuação Máxima:** 30 pontos

#### **Estrutura de Dados:**
```javascript
const interventionPlanPuzzle = {
  objetivo: "Criar plano de intervenção cronológico e integrado",
  tipo: "temporal_planning",
  
  intervencoes_disponiveis: [
    {
      id: "consulta_psicologia",
      nome: "Consulta de Psicologia",
      entidade: "Centro de Saúde",
      duracao_semanas: 12,
      frequencia: "semanal",
      prioridade_recomendada: 1,
      prerequisitos: [],
      objetivos: ["reduzir_dependencia_emocional", "aumentar_autoestima"],
      pontos: 10
    },
    {
      id: "grupo_apoio_social",
      nome: "Grupo de Apoio Social",
      entidade: "Centro Social",
      duracao_semanas: 8,
      frequencia: "quinzenal",
      prioridade_recomendada: 2,
      prerequisitos: [],
      objetivos: ["reduzir_isolamento", "criar_rede_apoio"],
      pontos: 8
    },
    {
      id: "formacao_competencias_digitais",
      nome: "Formação em Competências Digitais",
      entidade: "Centro de Qualificação",
      duracao_semanas: 6,
      frequencia: "2x por semana",
      prioridade_recomendada: 4,
      prerequisitos: ["estabilidade_emocional_basica"],
      objetivos: ["melhorar_empregabilidade"],
      pontos: 6
    },
    {
      id: "processo_rvcc",
      nome: "Processo RVCC (9º ano)",
      entidade: "Centro de Qualificação", 
      duracao_semanas: 20,
      frequencia: "1x por semana",
      prioridade_recomendada: 3,
      prerequisitos: ["motivacao_estavel"],
      objetivos: ["aumentar_qualificacao"],
      pontos: 12
    },
    {
      id: "apoio_procura_emprego",
      nome: "Apoio na Procura de Emprego",
      entidade: "IEFP",
      duracao_semanas: 4,
      frequencia: "semanal",
      prioridade_recomendada: 5,
      prerequisitos: ["autoestima_melhorada", "competencias_basicas"],
      objetivos: ["encontrar_emprego"],
      pontos: 8
    }
  ],
  
  cronograma_recomendado: {
    mes_1: {
      semanas: [1, 2, 3, 4],
      intervencoes_prioritarias: ["consulta_psicologia"],
      objetivos: "Estabilização emocional inicial"
    },
    mes_2: {
      semanas: [5, 6, 7, 8],
      intervencoes_prioritarias: ["consulta_psicologia", "grupo_apoio_social"],
      objetivos: "Redução do isolamento social"
    },
    mes_3: {
      semanas: [9, 10, 11, 12],
      intervencoes_prioritarias: ["consulta_psicologia", "grupo_apoio_social", "processo_rvcc"],
      objetivos: "Início da qualificação profissional"
    },
    mes_4_6: {
      semanas: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      intervencoes_prioritarias: ["processo_rvcc", "formacao_competencias_digitais"],
      objetivos: "Desenvolvimento de competências"
    },
    mes_7: {
      semanas: [25, 26, 27, 28],
      intervencoes_prioritarias: ["apoio_procura_emprego"],
      objetivos: "Procura ativa de emprego"
    }
  },
  
  indicadores_sucesso: [
    {
      indicador: "Redução da dependência emocional",
      metrica: "Escala de autonomia 1-10",
      meta: "≥ 7",
      prazo: "3 meses"
    },
    {
      indicador: "Aumento da rede social",
      metrica: "Número de contactos regulares",
      meta: "≥ 3 pessoas",
      prazo: "2 meses"
    },
    {
      indicador: "Melhoria das qualificações",
      metrica: "Conclusão RVCC 9º ano",
      meta: "Certificado obtido",
      prazo: "6 meses"
    },
    {
      indicador: "Integração no mercado de trabalho",
      metrica: "Obtenção de emprego",
      meta: "Contrato de trabalho",
      prazo: "7 meses"
    }
  ]
}
```

---

## ⚙️ **FLUXO DE ESTADOS DA FASE 2**

### **Sistema de Estados**
```javascript
const phase2States = {
  INICIO: {
    name: "apresentacao_fase2",
    description: "Apresentação da Fase 2 e resultados da Fase 1",
    duration: 60, // segundos
    nextState: "MAPEAMENTO",
    actions: ["start_phase2", "review_phase1_results"]
  },
  
  MAPEAMENTO: {
    name: "mapeamento_problemas",
    description: "Identificação e priorização de problemas",
    duration: 300, // 5 minutos
    nextState: "BENEFICIOS",
    actions: ["categorize_problem", "set_priority", "justify_decision"],
    completionCriteria: {
      problems_categorized: 6,
      priorities_set: 6,
      justifications_provided: 4
    }
  },
  
  BENEFICIOS: {
    name: "analise_beneficios",
    description: "Análise e otimização de benefícios sociais",
    duration: 240, // 4 minutos
    nextState: "ARTICULACAO",
    actions: ["calculate_benefits", "identify_additional_support", "simulate_scenario"],
    completionCriteria: {
      benefits_calculated: true,
      additional_supports_identified: 3,
      optimization_completed: true
    }
  },
  
  ARTICULACAO: {
    name: "articulacao_entidades",
    description: "Contacto e coordenação com entidades competentes",
    duration: 300, // 5 minutos
    nextState: "PLANEAMENTO",
    actions: ["contact_entity", "schedule_appointment", "send_referral"],
    completionCriteria: {
      entities_contacted: 3,
      appointments_scheduled: 2,
      referrals_sent: 1
    }
  },
  
  PLANEAMENTO: {
    name: "plano_intervencao",
    description: "Criação do plano de intervenção integrado",
    duration: 300, // 5 minutos
    nextState: "CONCLUSAO",
    actions: ["schedule_intervention", "set_timeline", "define_indicators"],
    completionCriteria: {
      interventions_scheduled: 5,
      timeline_created: true,
      success_indicators_defined: 4
    }
  },
  
  CONCLUSAO: {
    name: "finalizacao_fase2",
    description: "Apresentação do plano final e feedback",
    duration: 120,
    nextState: "PHASE3_READY",
    actions: ["view_plan", "export_plan", "continue_phase3"]
  }
}
```

---

## 📊 **SISTEMA DE PONTUAÇÃO FASE 2**

### **Algoritmo de Pontuação**
```javascript
const phase2ScoringSystem = {
  baseTasks: {
    mapeamento_problemas: {
      max_points: 25,
      components: {
        categorization_accuracy: 10,
        priority_setting: 10,
        justification_quality: 5
      }
    },
    analise_beneficios: {
      max_points: 20,
      components: {
        calculation_accuracy: 8,
        additional_supports: 7,
        optimization_effectiveness: 5
      }
    },
    articulacao_entidades: {
      max_points: 25,
      components: {
        entity_selection: 10,
        communication_quality: 10,
        follow_up_planning: 5
      }
    },
    plano_intervencao: {
      max_points: 30,
      components: {
        intervention_sequencing: 12,
        timeline_realism: 10,
        success_indicators: 8
      }
    }
  },
  
  multipliers: {
    eficiencia_temporal: {
      condition: "completion_time <= ideal_time",
      multiplier: 1.15,
      description: "Completar dentro do tempo ideal"
    },
    integracao_completa: {
      condition: "all_entities_coordinated == true",
      multiplier: 1.2,
      description: "Articulação com todas as entidades necessárias"
    },
    plano_realista: {
      condition: "timeline_feasibility >= 90%",
      multiplier: 1.1,
      description: "Plano com cronograma realista"
    }
  },
  
  penalties: {
    entidade_inadequada: {
      penalty: -5,
      description: "Contactar entidade inadequada ao problema"
    },
    prioridade_incorreta: {
      penalty: -3,
      description: "Priorização inadequada de problemas"
    },
    cronograma_irrealista: {
      penalty: -8,
      description: "Cronograma impossível de cumprir"
    }
  }
}
```

---

## 🎯 **DADOS DO CASO - CONTINUAÇÃO**

### **Estado da Felisbina pós-Fase 1**
```javascript
const felisbinaPhase2Data = {
  // Resultados da Fase 1
  fase1_resultados: {
    disponibilidade: "sim_condicionada", // Precisa apoio psicológico
    capacidade: "sim_formacao", // Precisa qualificação adicional
    empathy_score: 18, // Boa relação estabelecida
    information_gathered: 85, // Informação suficiente recolhida
    confianca_tecnico: "alta" // Felisbina confia no técnico
  },
  
  // Problemas identificados na Fase 1 (agora para aprofundar)
  problemas_detalhados: {
    dependencia_emocional: {
      descricao: "Ainda contacta ex-companheiro para decisões simples",
      impacto: "Impede autonomia total",
      manifestacoes: ["indecisao", "baixa_confianca", "medo_abandono"],
      urgencia: "alta"
    },
    isolamento_social: {
      descricao: "Apenas sai de casa para necessidades básicas",
      impacto: "Reduz oportunidades e motivação",
      manifestacoes: ["evita_contacto_social", "nao_participa_atividades"],
      urgencia: "media_alta"
    },
    autoestima_baixa: {
      descricao: "Sente-se 'velha demais' e 'sem valor'",
      impacto: "Afeta procura ativa de emprego",
      manifestacoes: ["autodepreciacao", "medo_rejeicao"],
      urgencia: "media_alta"
    },
    baixa_qualificacao: {
      descricao: "6º ano limita acesso a empregos",
      impacto: "Reduz opções de emprego",
      manifestacoes: ["inseguranca_competencias", "medo_formacao"],
      urgencia: "media"
    }
  },
  
  // Recursos e forças identificadas
  recursos_positivos: {
    experiencia_cuidados: "15 anos de experiência em cuidar de pessoas",
    disponibilidade_horaria: "Total flexibilidade",
    motivacao_mudanca: "Quer recuperar independência",
    relacao_tecnico: "Confia no apoio do SAASI",
    saude_fisica: "Sem limitações físicas"
  }
}
```

---

## 🎮 **IMPLEMENTAÇÃO TÉCNICA**

### **Estrutura de Ficheiros Fase 2**
```
src/phase2/
├── Phase2Manager.js           # Coordenador da Fase 2
├── ProblemMappingPuzzle.js    # Puzzle de mapeamento de problemas
├── BenefitsAnalysisPuzzle.js  # Puzzle de análise de benefícios
├── EntityCoordinationPuzzle.js # Puzzle de articulação com entidades
├── InterventionPlanPuzzle.js  # Puzzle de plano de intervenção
└── Phase2Data.js              # Dados específicos da Fase 2
```

### **Interface Principal Fase 2**
```javascript
class Phase2Manager {
  constructor() {
    this.currentState = 'INICIO';
    this.problemMapping = null;
    this.benefitsAnalysis = null;
    this.entityCoordination = null;
    this.interventionPlan = null;
    this.phase1Results = null; // Dados da fase anterior
  }
  
  initialize(phase1Data) {
    this.phase1Results = phase1Data;
    this.loadPhase2Data();
    this.setupPuzzles();
    return this.startPhase2();
  }
  
  // Métodos principais para cada puzzle...
}
```

---

## 📋 **CRITÉRIOS DE CONCLUSÃO FASE 2**

### **Requisitos Mínimos**
1. **Mapeamento completo:** 6 problemas categorizados e priorizados
2. **Análise financeira:** Benefícios calculados e otimizados
3. **Articulação realizada:** Pelo menos 3 entidades contactadas
4. **Plano criado:** Cronograma de 7 meses com indicadores

### **Código de Desbloqueio**
- **Condição:** Pontuação ≥ 70 pontos
- **Código:** "PLANO2025"
- **Próxima fase:** Fase 3 - Implementação e Acompanhamento

---

## 🎯 **OBJETIVOS PEDAGÓGICOS FASE 2**

1. **Análise Sistemática (30%)**
   - Identificação estruturada de problemas
   - Priorização baseada em critérios objetivos
   - Pensamento analítico e crítico

2. **Planeamento Integrado (35%)**
   - Coordenação multidisciplinar
   - Sequenciamento lógico de intervenções
   - Gestão de recursos e prazos

3. **Comunicação Profissional (35%)**
   - Articulação com entidades parceiras
   - Transmissão clara de informação
   - Negociação e coordenação

---

**Status:** ✅ ESPECIFICAÇÃO COMPLETA - PRONTA PARA IMPLEMENTAÇÃO

**Próximo Passo:** Implementar seguindo o mesmo padrão da Fase 1

---

*Documento gerado em Janeiro 2025 - Versão 2.0*  
*Baseado nos resultados da Fase 1 e fluxogramas DLD*
