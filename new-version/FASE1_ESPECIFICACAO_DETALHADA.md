# 📋 ESPECIFICAÇÃO TÉCNICA DETALHADA - FASE 1
## Escape Room SAASI: Acolhimento e Avaliação Inicial

**Versão:** 2.0  
**Data:** Janeiro 2025  
**Autor:** Planeamento AI-Assisted  
**Status:** Especificação Completa - Pronta para Implementação

---

## 🎯 **DEFINIÇÃO DA FASE 1**

### **Identificação**
- **Nome:** Fase 1 - Acolhimento e Avaliação Inicial
- **Cenário:** Gabinete do SAASI - Primeira consulta com a Felisbina
- **Objetivo Principal:** Realizar acolhimento inicial e avaliação de "Disponibilidade e Capacidade Para Trabalhar"
- **Duração Estimada:** 15-20 minutos de gameplay
- **Pontuação Máxima:** 100 pontos
- **Código de Desbloqueio:** "SAASI2025" (para aceder à Fase 2)

### **Contexto Narrativo**
```
Bem-vindo ao Gabinete do SAASI. Hoje é segunda-feira, 9h30 da manhã.
A sua primeira consulta é com a Felisbina Santos, 56 anos, 
desempregada há mais de 2 anos e beneficiária de RSI.

O seu objetivo é realizar o acolhimento inicial e determinar
se a Felisbina tem 'Disponibilidade e Capacidade Para Trabalhar'
conforme os procedimentos DLD (Desemprego de Longa Duração).

Como técnico do SAASI, deve demonstrar empatia, recolher informação
essencial e tomar decisões fundamentadas baseadas nos fluxogramas DLD.
```

### **Ambiente Virtual**
- **Local:** Gabinete SAASI - Sala de Atendimento
- **Elementos Interativos:**
  - Mesa de trabalho com computador (acesso a bases de dados)
  - Cadeiras para técnico e utente (área de diálogo)
  - Arquivo com documentação (sistema de inventário)
  - Telefone para contactos (lista de entidades parceiras)
  - Quadro com fluxogramas DLD (sistema de ajuda)

---

## 🧩 **ESTRUTURA DOS PUZZLES E ENIGMAS**

### **PUZZLE 1: Conversa com Felisbina**
**Objetivo:** Estabelecer rapport e recolher informação essencial  
**Tipo:** Sistema de diálogo interativo  
**Duração:** 5-7 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const dialoguePuzzle = {
  objetivo: "Estabelecer rapport e recolher informação essencial",
  personagem: "Felisbina Santos",
  contexto: "Primeira consulta - acolhimento inicial",
  
  dialogos: [
    {
      id: "abertura",
      pergunta: "Bom dia, Felisbina. Como se sente hoje?",
      respostas: [
        { 
          texto: "Bom dia! Obrigada por me receber. Estou nervosa mas esperançosa.", 
          pontos: 10, 
          tipo: "empatica",
          unlock: ["situacao_atual"]
        },
        { 
          texto: "Olá. Estou aqui porque me disseram que tinha de vir.", 
          pontos: 5, 
          tipo: "neutra",
          unlock: ["situacao_atual"] 
        }
      ]
    },
    {
      id: "situacao_atual",
      pergunta: "Pode falar-me um pouco sobre a sua situação atual?",
      respostas: [
        {
          texto: "Compreendo que deve ser difícil. Vamos trabalhar juntos para encontrar soluções.",
          pontos: 12,
          tipo: "empatica",
          unlock: ["experiencia_anterior", "motivacao"]
        },
        {
          texto: "Precisa de se esforçar mais na procura de emprego.",
          pontos: -5,
          tipo: "critica",
          unlock: ["experiencia_anterior"]
        },
        {
          texto: "Vamos ver o que podemos fazer para a ajudar.",
          pontos: 8,
          tipo: "neutra", 
          unlock: ["experiencia_anterior"]
        }
      ]
    },
    {
      id: "experiencia_anterior",
      pergunta: "Que tipo de trabalho fazia antes?",
      respostas: [
        {
          texto: "Essa experiência é muito valiosa. Cuidar de pessoas requer competências importantes.",
          pontos: 10,
          tipo: "valorizante",
          unlock: ["expectativas"]
        },
        {
          texto: "Entendo. E sente que gostaria de continuar nessa área?",
          pontos: 7,
          tipo: "neutra",
          unlock: ["expectativas"]
        }
      ]
    }
  ],
  
  criterios_sucesso: {
    empatia: { min: 15, max: 25, peso: 0.4 },
    informacao_recolhida: { min: 80, max: 100, peso: 0.4 }, // percentagem
    confianca_estabelecida: { min: 70, max: 100, peso: 0.2 }
  },
  
  informacoes_recolhidas: [
    "situacao_desemprego_28_meses",
    "experiencia_cuidados_pessoas", 
    "baixa_autoestima",
    "dependencia_emocional_ex_companheiro",
    "isolamento_social",
    "motivacao_baixa_mas_presente"
  ]
}
```

### **PUZZLE 2: Análise de Fatores de Risco**
**Objetivo:** Identificar e categorizar fatores de risco e proteção  
**Tipo:** Drag & Drop com categorização  
**Duração:** 4-5 minutos  
**Pontuação Máxima:** 30 pontos

#### **Estrutura de Dados:**
```javascript
const riskAnalysisPuzzle = {
  objetivo: "Identificar e categorizar fatores de risco e proteção",
  mecanica: "drag_and_drop",
  tempo_limite: 300, // 5 minutos
  
  elementos_analise: [
    {
      item: "Idade 56 anos",
      categoria_correta: "risco",
      subcategoria: "empregabilidade",
      pontos: 5,
      justificacao: "Idade próxima da reforma pode dificultar reintegração"
    },
    {
      item: "Experiência em cuidados",
      categoria_correta: "protecao", 
      subcategoria: "competencias",
      pontos: 8,
      justificacao: "Competências transferíveis para área social/saúde"
    },
    {
      item: "Isolamento social",
      categoria_correta: "risco",
      subcategoria: "psicossocial", 
      pontos: 10,
      justificacao: "Pode afetar motivação e acesso a oportunidades"
    },
    {
      item: "Dependência emocional",
      categoria_correta: "risco",
      subcategoria: "psicossocial",
      pontos: 10,
      justificacao: "Pode limitar autonomia e tomada de decisões"
    },
    {
      item: "Baixa qualificação (6º ano)",
      categoria_correta: "risco",
      subcategoria: "formacao",
      pontos: 8,
      justificacao: "Limita acesso a oportunidades de emprego"
    },
    {
      item: "Disponibilidade horária total",
      categoria_correta: "protecao",
      subcategoria: "disponibilidade", 
      pontos: 6,
      justificacao: "Flexibilidade para formação e emprego"
    }
  ],
  
  categorias: {
    risco: {
      nome: "Fatores de Risco",
      cor: "#dc3545",
      subcategorias: ["empregabilidade", "psicossocial", "formacao", "social"]
    },
    protecao: {
      nome: "Fatores de Proteção", 
      cor: "#28a745",
      subcategorias: ["competencias", "disponibilidade", "motivacao", "suporte"]
    }
  },
  
  pontuacao: {
    categoria_correta: 5,
    subcategoria_correta: 3,
    justificacao_adequada: 2,
    tempo_bonus: 5 // se completar em menos de 4 minutos
  }
}
```

### **PUZZLE 3: Documentação Necessária**
**Objetivo:** Verificar e recolher documentação obrigatória  
**Tipo:** Sistema de inventário e verificação  
**Duração:** 3-4 minutos  
**Pontuação Máxima:** 20 pontos

#### **Estrutura de Dados:**
```javascript
const documentationPuzzle = {
  objetivo: "Verificar e recolher documentação necessária para o processo",
  tipo: "inventory_management",
  
  documentos_necessarios: {
    obrigatorios: [
      {
        nome: "Comprovativo RSI",
        disponivel: true,
        localizacao: "arquivo_pessoal",
        pontos: 8,
        descricao: "Documento que comprova benefício RSI ativo"
      },
      {
        nome: "Histórico Profissional",
        disponivel: false,
        localizacao: "seguranca_social",
        pontos: 10,
        descricao: "Registo de contribuições e empregos anteriores",
        acao_necessaria: "solicitar_seguranca_social"
      },
      {
        nome: "Certificado de Habilitações",
        disponivel: true,
        localizacao: "arquivo_pessoal", 
        pontos: 6,
        descricao: "Comprovativo do 6º ano de escolaridade"
      }
    ],
    opcionais: [
      {
        nome: "Relatório Médico",
        disponivel: false,
        localizacao: "centro_saude",
        pontos: 3,
        descricao: "Avaliação de capacidade para o trabalho"
      },
      {
        nome: "Referências de Empregadores Anteriores",
        disponivel: false,
        localizacao: "contactos_pessoais",
        pontos: 2,
        descricao: "Cartas de recomendação de trabalhos anteriores"
      }
    ]
  },
  
  acoes_disponiveis: [
    {
      acao: "recolher_documento",
      condicao: "documento.disponivel == true",
      tempo: 30, // segundos
      sucesso: 100
    },
    {
      acao: "solicitar_documento",
      condicao: "documento.disponivel == false", 
      tempo: 60,
      sucesso: 80, // probabilidade
      followup: "agendar_recolha"
    },
    {
      acao: "marcar_como_pendente",
      condicao: "documento.obrigatorio == true && !disponivel",
      pontos: 2,
      nota: "Documento identificado como necessário"
    }
  ]
}
```

### **PUZZLE 4: Avaliação DLD (Desemprego Longa Duração)**
**Objetivo:** Aplicar critérios DLD e tomar decisão fundamentada  
**Tipo:** Análise de critérios e decisão múltipla  
**Duração:** 2-3 minutos  
**Pontuação Máxima:** 25 pontos

#### **Estrutura de Dados:**
```javascript
const dldAssessmentPuzzle = {
  objetivo: "Avaliar elegibilidade DLD e determinar disponibilidade/capacidade para trabalhar",
  tipo: "criteria_analysis_decision",
  
  criterios_dld: {
    tempo_desemprego: {
      valor_felisbina: 28, // meses
      criterio_minimo: 12,
      status: "ELEGIVEL",
      pontos: 8,
      peso: 0.3
    },
    idade: {
      valor_felisbina: 56,
      categoria: "55+", 
      factor_risco: "ALTO",
      pontos: 6,
      peso: 0.2
    },
    qualificacoes: {
      valor_felisbina: "6_ano",
      categoria: "baixa_qualificacao",
      factor_risco: "ALTO", 
      pontos: 6,
      peso: 0.2
    },
    apoios_sociais: {
      valor_felisbina: ["RSI"],
      status: "ATIVO",
      pontos: 5,
      peso: 0.3
    }
  },
  
  avaliacao_disponibilidade: {
    pergunta: "Com base na informação recolhida, a Felisbina tem DISPONIBILIDADE para trabalhar?",
    opcoes: [
      {
        resposta: "SIM - Disponibilidade total",
        justificacao: "Sem dependentes, horário flexível, motivada para mudança",
        pontos: 10,
        correto: true
      },
      {
        resposta: "SIM - Disponibilidade condicionada", 
        justificacao: "Disponível mas com necessidade de apoio psicológico",
        pontos: 8,
        correto: true
      },
      {
        resposta: "NÃO - Indisponível temporariamente",
        justificacao: "Necessita primeiro de estabilização emocional",
        pontos: 3,
        correto: false
      }
    ]
  },
  
  avaliacao_capacidade: {
    pergunta: "A Felisbina tem CAPACIDADE para trabalhar?",
    opcoes: [
      {
        resposta: "SIM - Capacidade plena",
        justificacao: "Experiência anterior, sem limitações físicas",
        pontos: 10,
        correto: true
      },
      {
        resposta: "SIM - Capacidade com formação",
        justificacao: "Capacidade existente mas necessita qualificação adicional", 
        pontos: 12,
        correto: true,
        melhor_opcao: true
      },
      {
        resposta: "NÃO - Incapacidade temporária",
        justificacao: "Limitações emocionais impedem trabalho imediato",
        pontos: 2,
        correto: false
      }
    ]
  },
  
  decisao_final: {
    criterio: "disponibilidade == SIM && capacidade == SIM",
    resultado_positivo: {
      acao: "ENCAMINHAR_IEFP",
      proxima_fase: "IDENTIFICACAO_NECESSIDADES",
      codigo_desbloqueio: "SAASI2025",
      pontos_bonus: 15
    },
    resultado_negativo: {
      acao: "ARTICULAR_ENTIDADES_COMPETENTES", 
      areas: ["Saúde", "Apoio Social"],
      pontos: 8
    }
  }
}
```

---

## ⚙️ **ARQUITETURA DO MOTOR DE JOGO**

### **Classe Principal - GameEngine**
```javascript
class SaaSIGameEngine {
  constructor() {
    this.currentPhase = 1;
    this.currentState = "INICIO";
    this.playerScore = 0;
    this.gameData = {};
    this.inventory = [];
    this.completedTasks = [];
    this.startTime = Date.now();
    this.analytics = new AnalyticsManager();
  }

  // Métodos principais
  initializePhase1() {
    this.gameData = {
      felisbina: new CaseData(),
      dialogueState: new DialogueState(),
      riskAnalysis: new RiskAnalysis(),
      documentation: new DocumentationManager(),
      dldAssessment: new DLDAssessment()
    };
    this.currentState = "APRESENTACAO";
    this.saveProgress();
  }

  processPlayerAction(action, data) {
    const result = this.validateAction(action, data);
    if (result.valid) {
      this.updateGameState(action, data);
      this.calculateScore(action, result);
      this.checkStateTransition();
      this.saveProgress();
      return this.generateFeedback(result);
    }
    return this.generateErrorFeedback(result.error);
  }

  updateGameState(action, data) {
    switch(this.currentState) {
      case "CONVERSA":
        this.gameData.dialogueState.processResponse(data);
        break;
      case "ANALISE":
        this.gameData.riskAnalysis.categorizeElement(data);
        break;
      case "DOCUMENTACAO":
        this.gameData.documentation.processDocument(data);
        break;
      case "AVALIACAO":
        this.gameData.dldAssessment.recordDecision(data);
        break;
    }
  }

  calculateScore(action, result) {
    const scoreCalculator = new ScoreCalculator();
    const points = scoreCalculator.calculate(action, result, this.currentState);
    this.playerScore += points;
    this.analytics.recordScoring(action, points, this.currentState);
  }

  checkPhaseCompletion() {
    const requiredTasks = ["conversa_inicial", "analise_perfil", "documentacao", "avaliacao_final"];
    const completed = requiredTasks.every(task => this.completedTasks.includes(task));
    
    if (completed) {
      this.currentState = "CONCLUSAO";
      this.generatePhaseReport();
      return true;
    }
    return false;
  }

  saveProgress() {
    const gameState = {
      phase: this.currentPhase,
      state: this.currentState,
      score: this.playerScore,
      data: this.gameData,
      inventory: this.inventory,
      completed: this.completedTasks,
      timestamp: Date.now()
    };
    StorageManager.save('saasi_phase1', gameState);
  }
}
```

### **Sistema de Estados**
```javascript
const gameStates = {
  INICIO: {
    name: "apresentacao_caso",
    description: "Apresentação do caso e contexto",
    duration: 120, // segundos
    nextState: "CONVERSA",
    actions: ["start_game", "view_tutorial"]
  },
  
  CONVERSA: {
    name: "dialogo_felisbina",
    description: "Conversa inicial com a Felisbina", 
    duration: 420, // 7 minutos
    nextState: "ANALISE",
    actions: ["select_dialogue", "ask_question", "show_empathy"],
    completionCriteria: {
      min_interactions: 5,
      empathy_score: 15,
      information_gathered: 80
    }
  },
  
  ANALISE: {
    name: "analise_perfil",
    description: "Análise de fatores de risco e proteção",
    duration: 300, // 5 minutos  
    nextState: "DOCUMENTACAO",
    actions: ["drag_element", "categorize", "justify_decision"],
    completionCriteria: {
      elements_categorized: 6,
      accuracy: 80
    }
  },
  
  DOCUMENTACAO: {
    name: "recolha_documentos", 
    description: "Verificação e recolha de documentação",
    duration: 240, // 4 minutos
    nextState: "AVALIACAO",
    actions: ["collect_document", "request_document", "mark_pending"],
    completionCriteria: {
      mandatory_docs_identified: 3,
      collection_rate: 70
    }
  },
  
  AVALIACAO: {
    name: "avaliacao_dld",
    description: "Avaliação DLD e decisão final",
    duration: 180, // 3 minutos
    nextState: "CONCLUSAO", 
    actions: ["assess_availability", "assess_capacity", "make_decision"],
    completionCriteria: {
      decision_made: true,
      justification_provided: true
    }
  },
  
  CONCLUSAO: {
    name: "finalizacao_fase1",
    description: "Apresentação de resultados e feedback",
    duration: 120,
    nextState: "PHASE2_READY",
    actions: ["view_report", "export_data", "continue_phase2"]
  }
}
```

### **Sistema de Interações**
```javascript
const interactionTypes = {
  DIALOGUE: {
    type: "conversa",
    component: "DialogueModal",
    scoring: "empathy_based",
    data_structure: {
      question_id: "string",
      response_id: "string", 
      empathy_level: "number",
      information_value: "number"
    }
  },
  
  COMPUTER: {
    type: "acesso_dados",
    component: "ComputerInterface", 
    scoring: "information_gathering",
    data_structure: {
      database: "string",
      query: "string",
      results_found: "array"
    }
  },
  
  DOCUMENTS: {
    type: "revisao_documentos",
    component: "DocumentViewer",
    scoring: "completeness_check", 
    data_structure: {
      document_id: "string",
      action: "string", // collect, request, mark_pending
      success: "boolean"
    }
  },
  
  PHONE: {
    type: "contacto_entidades",
    component: "PhoneInterface",
    scoring: "appropriate_referral",
    data_structure: {
      entity: "string",
      purpose: "string",
      outcome: "string"
    }
  },
  
  ANALYSIS: {
    type: "analise_categorização",
    component: "DragDropInterface",
    scoring: "accuracy_based",
    data_structure: {
      element_id: "string",
      category: "string",
      subcategory: "string",
      justification: "string"
    }
  }
}
```

---

## 📊 **SISTEMA DE PROGRESSÃO E PONTUAÇÃO**

### **Algoritmo de Pontuação**
```javascript
const scoringSystem = {
  // Pontuação base por tarefa
  baseTasks: {
    conversa_inicial: {
      max_points: 25,
      components: {
        empathy: 10,
        information_gathering: 10, 
        rapport_building: 5
      }
    },
    analise_perfil: {
      max_points: 30,
      components: {
        risk_identification: 15,
        categorization_accuracy: 10,
        justification_quality: 5
      }
    },
    documentacao: {
      max_points: 20,
      components: {
        mandatory_docs: 12,
        optional_docs: 5,
        process_efficiency: 3
      }
    },
    avaliacao_final: {
      max_points: 25,
      components: {
        dld_criteria_application: 10,
        decision_quality: 10,
        justification: 5
      }
    }
  },
  
  // Multiplicadores de performance
  multipliers: {
    tempo_eficiente: {
      condition: "completion_time <= ideal_time",
      multiplier: 1.2,
      description: "Completar dentro do tempo ideal"
    },
    sem_dicas: {
      condition: "hints_used == 0",
      multiplier: 1.1,
      description: "Não usar sistema de dicas"
    },
    decisoes_corretas: {
      condition: "correct_decisions >= 90%",
      multiplier: 1.15,
      description: "90%+ das decisões corretas"
    },
    empatia_alta: {
      condition: "empathy_score >= 20",
      multiplier: 1.1,
      description: "Demonstrar alta empatia"
    }
  },
  
  // Penalizações
  penalties: {
    uso_dica: {
      penalty: -2,
      description: "Por cada dica usada"
    },
    decisao_incorreta: {
      penalty: -5,
      description: "Por decisão incorreta"
    },
    tempo_excessivo: {
      penalty: -0.1, // por minuto
      condition: "time > ideal_time + 5_minutes",
      description: "Por cada minuto extra além do limite"
    },
    interacao_inadequada: {
      penalty: -3,
      description: "Resposta sem empatia ou inadequada"
    }
  },
  
  // Cálculo final
  calculateFinalScore: function(baseScore, multipliers, penalties) {
    let finalScore = baseScore;
    
    // Aplicar multiplicadores
    multipliers.forEach(mult => finalScore *= mult);
    
    // Aplicar penalizações
    penalties.forEach(pen => finalScore += pen);
    
    // Garantir que não seja negativo
    return Math.max(0, Math.round(finalScore));
  }
}
```

### **Sistema de Badges/Conquistas**
```javascript
const achievementSystem = {
  badges: [
    {
      id: "empatia_maxima",
      nome: "Coração de Ouro",
      descricao: "Demonstrou máxima empatia com a Felisbina",
      icone: "❤️",
      criterio: "empathy_score >= 23",
      pontos_bonus: 10,
      raridade: "rare"
    },
    {
      id: "eficiencia_temporal",
      nome: "Gestor de Tempo", 
      descricao: "Completou a fase dentro do tempo ideal",
      icone: "⏱️",
      criterio: "completion_time <= ideal_time",
      pontos_bonus: 8,
      raridade: "common"
    },
    {
      id: "analise_perfeita",
      nome: "Detetive Social",
      descricao: "Identificou todos os fatores de risco corretamente", 
      icone: "🔍",
      criterio: "risk_analysis_accuracy == 100",
      pontos_bonus: 12,
      raridade: "epic"
    },
    {
      id: "documentacao_completa",
      nome: "Organizador Exemplar",
      descricao: "Recolheu toda a documentação necessária",
      icone: "📋",
      criterio: "all_mandatory_docs_collected == true",
      pontos_bonus: 6,
      raridade: "common"
    },
    {
      id: "decisao_fundamentada",
      nome: "Técnico Especialista", 
      descricao: "Tomou decisão DLD perfeitamente fundamentada",
      icone: "⚖️",
      criterio: "dld_decision_score >= 23",
      pontos_bonus: 15,
      raridade: "legendary"
    },
    {
      id: "sem_ajuda",
      nome: "Autónomo",
      descricao: "Completou a fase sem usar dicas",
      icone: "🎯", 
      criterio: "hints_used == 0",
      pontos_bonus: 10,
      raridade: "rare"
    }
  ],
  
  // Sistema de níveis
  levels: {
    novato: { min: 0, max: 49, title: "Técnico Iniciante" },
    competente: { min: 50, max: 69, title: "Técnico Competente" },
    proficiente: { min: 70, max: 84, title: "Técnico Proficiente" },
    especialista: { min: 85, max: 94, title: "Técnico Especialista" },
    mestre: { min: 95, max: 100, title: "Mestre SAASI" }
  }
}
```

### **Sistema de Feedback em Tempo Real**
```javascript
const feedbackSystem = {
  tipos: {
    POSITIVO: {
      cor: "#28a745",
      icone: "✓",
      som: "success.mp3",
      animacao: "bounce"
    },
    NEUTRO: {
      cor: "#ffc107", 
      icone: "i",
      som: "info.mp3",
      animacao: "fade"
    },
    NEGATIVO: {
      cor: "#dc3545",
      icone: "✗", 
      som: "error.mp3",
      animacao: "shake"
    },
    CONQUISTA: {
      cor: "#6f42c1",
      icone: "🏆",
      som: "achievement.mp3", 
      animacao: "celebration"
    }
  },
  
  mensagens: {
    // Feedback de diálogo
    conversa_empatica: {
      tipo: "POSITIVO",
      texto: "Excelente! A Felisbina sente-se compreendida e confiante.",
      pontos: "+10",
      dica: "Continue a demonstrar empatia para construir rapport."
    },
    conversa_neutra: {
      tipo: "NEUTRO", 
      texto: "Resposta adequada. Pode explorar mais a situação emocional.",
      pontos: "+5",
      dica: "Tente uma abordagem mais empática na próxima interação."
    },
    conversa_inadequada: {
      tipo: "NEGATIVO",
      texto: "Atenção: Esta resposta pode afetar a confiança da utente.",
      pontos: "-3",
      dica: "Lembre-se de que a empatia é fundamental no acolhimento."
    },
    
    // Feedback de análise
    analise_correta: {
      tipo: "POSITIVO",
      texto: "Categorização correta! Fator identificado adequadamente.",
      pontos: "+8",
      dica: "Continue a análise sistemática dos restantes elementos."
    },
    analise_incorreta: {
      tipo: "NEGATIVO", 
      texto: "Categorização incorreta. Reveja os critérios de avaliação.",
      pontos: "-5",
      dica: "Consulte o fluxograma DLD para orientação."
    },
    
    // Feedback de documentação
    documento_encontrado: {
      tipo: "POSITIVO",
      texto: "Documento importante adicionado ao processo.",
      pontos: "+5",
      dica: "Verifique se existem mais documentos necessários."
    },
    documento_em_falta: {
      tipo: "NEUTRO",
      texto: "Documento identificado como em falta. Ação necessária.",
      pontos: "+2",
      dica: "Considere solicitar o documento à entidade competente."
    },
    
    // Feedback de decisão
    decisao_fundamentada: {
      tipo: "POSITIVO",
      texto: "Decisão bem fundamentada nos critérios DLD!",
      pontos: "+15",
      dica: "Prepare-se para definir o plano de intervenção."
    },
    decisao_sem_justificacao: {
      tipo: "NEGATIVO",
      texto: "Decisão tomada mas justificação insuficiente.",
      pontos: "-8", 
      dica: "Todas as decisões devem ser fundamentadas em critérios objetivos."
    }
  }
}
```

---

## 🗂️ **ESTRUTURA DE DADOS DO JOGO**

### **Estado Global do Jogo**
```javascript
const gameState = {
  // Informação da sessão
  session: {
    id: generateUUID(),
    startTime: Date.now(),
    currentPhase: 1,
    currentState: "INICIO",
    playerId: null,
    playerName: null,
    deviceInfo: {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language
    }
  },
  
  // Progresso do jogador
  progress: {
    phase1: {
      completed: false,
      score: 0,
      maxScore: 100,
      startTime: null,
      endTime: null,
      duration: 0,
      
      tasks: {
        conversa_inicial: {
          completed: false,
          score: 0,
          maxScore: 25,
          attempts: 0,
          startTime: null,
          endTime: null,
          data: {
            empathy_score: 0,
            information_gathered: 0,
            rapport_level: 0,
            dialogue_choices: []
          }
        },
        analise_perfil: {
          completed: false,
          score: 0,
          maxScore: 30,
          attempts: 0,
          startTime: null,
          endTime: null,
          data: {
            elements_categorized: 0,
            accuracy_rate: 0,
            risk_factors_identified: [],
            protection_factors_identified: []
          }
        },
        documentacao: {
          completed: false,
          score: 0,
          maxScore: 20,
          attempts: 0,
          startTime: null,
          endTime: null,
          data: {
            mandatory_docs_collected: 0,
            optional_docs_collected: 0,
            pending_docs: [],
            collection_efficiency: 0
          }
        },
        avaliacao_final: {
          completed: false,
          score: 0,
          maxScore: 25,
          attempts: 0,
          startTime: null,
          endTime: null,
          data: {
            availability_decision: null,
            capacity_decision: null,
            final_decision: null,
            justification_quality: 0
          }
        }
      },
      
      achievements: [],
      hintsUsed: 0,
      totalInteractions: 0,
      averageResponseTime: 0
    }
  },
  
  // Dados do caso
  caseData: {
    felisbina: {
      // Dados pessoais
      nome: "Felisbina Santos",
      idade: 56,
      dataNascimento: "1968-03-15",
      morada: "Rua das Flores, 123, 4000-001 Porto",
      contacto: "912345678",
      email: "felisbina.santos@email.com",
      
      // Situação familiar
      estadoCivil: "Divorciada",
      agregadoFamiliar: 1,
      dependentes: 0,
      habitacao: "Arrendamento social",
      
      // Situação profissional
      situacaoAtual: "Desempregada",
      tempoDesemprego: 28, // meses
      dataInicioDesemprego: "2022-11-01",
      ultimoEmprego: {
        funcao: "Cuidadora informal",
        empregador: "Particular",
        dataInicio: "2020-01-01",
        dataFim: "2022-10-31",
        motivoSaida: "Fim do contrato"
      },
      experienciaAnterior: [
        {
          funcao: "Empregada de limpeza doméstica",
          periodo: "2015-2019",
          tipo: "Trabalho não declarado"
        },
        {
          funcao: "Cuidadora de idosos",
          periodo: "2019-2022", 
          tipo: "Trabalho declarado"
        }
      ],
      
      // Situação social e económica
      rendimentos: {
        tipo: "RSI",
        valor: 242.23,
        dataInicio: "2023-01-01",
        situacao: "Ativo"
      },
      apoiosSociais: ["RSI", "PSI"],
      dividas: {
        existem: true,
        tipos: ["Renda em atraso", "Conta da luz"],
        valor_total: 450.00
      },
      
      // Perfil educacional
      escolaridade: {
        nivel: "6º ano",
        certificado: true,
        local: "Escola Básica do Porto",
        ano_conclusao: 1982
      },
      formacaoProfissional: [],
      competenciasDigitais: "Básicas",
      linguas: ["Português"],
      
      // Perfil psicossocial
      saudeGeral: {
        estado: "Razoável",
        limitacoes: "Nenhuma física",
        acompanhamento_medico: false,
        medicacao: false
      },
      saudeMental: {
        estado: "Fragilizada",
        problemas: ["Baixa autoestima", "Dependência emocional"],
        acompanhamento: false,
        historico: "Depressão após divórcio"
      },
      motivacao: {
        nivel: "Baixa mas presente",
        fatores_positivos: ["Necessidade económica", "Desejo de autonomia"],
        fatores_negativos: ["Medo de rejeição", "Baixa confiança"]
      },
      redesSociais: {
        familia: "Limitada - filhos adultos distantes",
        amigos: "Poucos contactos",
        vizinhanca: "Relação cordial",
        comunidade: "Não participa"
      },
      
      // Disponibilidade e mobilidade
      disponibilidade: {
        horaria: "Total - sem restrições",
        geografica: "Porto e arredores",
        transporte: "Transportes públicos",
        cuidados: "Sem dependentes a cargo"
      },
      
      // Fatores identificados (preenchidos durante o jogo)
      fatoresRisco: [],
      fatoresProtecao: [],
      necessidadesIdentificadas: [],
      
      // Avaliação DLD (preenchida durante o jogo)
      avaliacaoDLD: {
        elegivel: null,
        disponibilidade: null,
        capacidade: null,
        decisaoFinal: null,
        justificacao: null,
        proximosPassos: []
      }
    }
  },
  
  // Inventário do jogador
  inventory: {
    documentos: [],
    contactos: [
      {
        nome: "IEFP Porto",
        telefone: "220123456",
        email: "porto@iefp.pt",
        tipo: "Emprego e Formação"
      },
      {
        nome: "Centro de Saúde",
        telefone: "220654321", 
        email: "cs.porto@sns.pt",
        tipo: "Saúde"
      },
      {
        nome: "Segurança Social",
        telefone: "220987654",
        email: "porto@seg-social.pt", 
        tipo: "Apoios Sociais"
      }
    ],
    informacoes: [],
    ferramentas: [
      {
        nome: "Calculadora de Benefícios",
        tipo: "ferramenta",
        descricao: "Calcula valores e elegibilidade para apoios"
      },
      {
        nome: "Guia de Programas",
        tipo: "referencia",
        descricao: "Lista de programas e medidas disponíveis"
      },
      {
        nome: "Fluxograma DLD",
        tipo: "procedimento",
        descricao: "Procedimentos para Desemprego de Longa Duração"
      }
    ]
  },
  
  // Métricas de performance
  analytics: {
    // Decisões tomadas
    decisoes: [],
    
    // Tempos por tarefa
    temposPorTarefa: {
      conversa_inicial: 0,
      analise_perfil: 0,
      documentacao: 0,
      avaliacao_final: 0
    },
    
    // Interações registadas
    interacoes: [],
    
    // Erros comuns
    errosComuns: [],
    
    // Padrões de comportamento
    padroesBehavior: {
      uso_dicas: 0,
      tempo_reflexao: 0,
      mudancas_decisao: 0,
      consulta_ajuda: 0
    },
    
    // Métricas de qualidade
    qualidade: {
      empathy_score: 0,
      decision_quality: 0,
      process_efficiency: 0,
      knowledge_application: 0
    }
  }
}
```

### **Sistema de Persistência**
```javascript
const storageManager = {
  // Chaves de armazenamento
  keys: {
    gameState: 'saasi_escape_room_state',
    progress: 'saasi_progress',
    analytics: 'saasi_analytics',
    settings: 'saasi_settings',
    lastSave: 'saasi_last_save'
  },
  
  // Salvar estado do jogo
  saveGameState(state) {
    try {
      const compressed = this.compressGameState(state);
      localStorage.setItem(this.keys.gameState, JSON.stringify(compressed));
      localStorage.setItem(this.keys.lastSave, Date.now().toString());
      return { success: true, timestamp: Date.now() };
    } catch (error) {
      console.error('Erro ao salvar estado do jogo:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Carregar estado do jogo
  loadGameState() {
    try {
      const saved = localStorage.getItem(this.keys.gameState);
      if (saved) {
        const parsed = JSON.parse(saved);
        return this.decompressGameState(parsed);
      }
      return this.initializeNewGame();
    } catch (error) {
      console.error('Erro ao carregar estado do jogo:', error);
      return this.initializeNewGame();
    }
  },
  
  // Comprimir dados para economizar espaço
  compressGameState(state) {
    // Remove dados desnecessários e comprime estrutura
    return {
      s: state.session,
      p: state.progress,
      c: {
        f: {
          n: state.caseData.felisbina.nome,
          i: state.caseData.felisbina.idade,
          // ... outros dados essenciais
        }
      },
      inv: state.inventory,
      a: state.analytics
    };
  },
  
  // Descomprimir dados
  decompressGameState(compressed) {
    // Reconstrói estrutura completa a partir dos dados comprimidos
    return {
      session: compressed.s,
      progress: compressed.p,
      caseData: this.expandCaseData(compressed.c),
      inventory: compressed.inv,
      analytics: compressed.a
    };
  },
  
  // Exportar dados para análise
  exportAnalytics() {
    const state = this.loadGameState();
    const analytics = state.analytics;
    const report = this.generatePerformanceReport(analytics, state.progress);
    
    return {
      timestamp: Date.now(),
      playerId: state.session.playerId,
      sessionId: state.session.id,
      phase1Results: {
        score: state.progress.phase1.score,
        duration: state.progress.phase1.duration,
        tasks: state.progress.phase1.tasks,
        achievements: state.progress.phase1.achievements
      },
      detailedAnalytics: analytics,
      recommendations: this.generateRecommendations(analytics)
    };
  },
  
  // Gerar relatório de performance
  generatePerformanceReport(analytics, progress) {
    return {
      overall_performance: this.calculateOverallPerformance(progress),
      strengths: this.identifyStrengths(analytics),
      improvement_areas: this.identifyImprovementAreas(analytics),
      time_efficiency: this.analyzeTimeEfficiency(analytics),
      decision_quality: this.analyzeDecisionQuality(analytics),
      empathy_level: this.analyzeEmpathyLevel(analytics)
    };
  },
  
  // Limpar dados antigos
  clearOldData(daysToKeep = 30) {
    const cutoffDate = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    const lastSave = parseInt(localStorage.getItem(this.keys.lastSave) || '0');
    
    if (lastSave < cutoffDate) {
      Object.values(this.keys).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    }
    return false;
  }
}
```

---

## 🎯 **CENÁRIO ENVOLVENTE E NARRATIVA**

### **Contexto Narrativo Detalhado**
```javascript
const narrativeContext = {
  setting: {
    location: "Gabinete do SAASI - Serviço de Atendimento e Acompanhamento Social Integrado",
    address: "Rua de Santa Catarina, 123, 4000-001 Porto",
    time: "Segunda-feira, 9h30 da manhã",
    weather: "Dia nublado típico do Porto",
    atmosphere: "Ambiente profissional mas acolhedor"
  },
  
  backstory: {
    felisbina_context: `
      Felisbina Santos, 56 anos, chega ao gabinete do SAASI numa manhã fria de janeiro.
      Divorciada há 3 anos, vive sozinha num apartamento de habitação social no bairro
      de Campanhã. Está desempregada há 28 meses, desde que terminou o seu último
      trabalho como cuidadora informal de um idoso.
      
      Recebe RSI no valor de 242,23€ mensais e PSI no valor de 324,55€ mensais (total: 566,78€), situação financeira melhor.
      Tem duas dívidas em atraso: a renda (150€) e a conta da eletricidade (300€).
      
      Emocionalmente, ainda não se recuperou completamente do divórcio. Sente-se
      insegura, com baixa autoestima e tem medo de voltar ao mercado de trabalho.
      Os filhos, já adultos, vivem longe e o contacto é esporádico.
      
      Apesar das dificuldades, mantém uma centelha de esperança. Quer recuperar
      a sua autonomia e dignidade através do trabalho, mas precisa de apoio para
      superar as barreiras emocionais e práticas que enfrenta.
    `,
    
    technician_role: `
      Como técnico do SAASI, você é responsável por realizar o primeiro acolhimento
      da Felisbina. Este é um momento crucial que pode determinar o sucesso de todo
      o processo de reintegração.
      
      Deve demonstrar empatia, competência técnica e capacidade de análise. A sua
      avaliação determinará se a Felisbina será encaminhada para o IEFP ou se
      necessita primeiro de apoio de outras entidades (Saúde, Educação, Outros).
      
      Lembre-se: cada pessoa é única e merece ser tratada com dignidade e respeito.
      O seu trabalho pode mudar uma vida.
    `
  },
  
  environmental_details: {
    office_description: `
      O gabinete é pequeno mas bem organizado. Uma secretária de madeira clara
      ocupa o centro da sala, com um computador moderno e alguns documentos
      organizados em pastas. Duas cadeiras confortáveis estão posicionadas
      para facilitar a conversa.
      
      Na parede, um quadro com os fluxogramas DLD serve como referência rápida.
      Uma estante baixa contém manuais de procedimentos e guias de programas
      sociais. A janela oferece uma vista parcial da rua movimentada do Porto.
      
      O ambiente transmite profissionalismo mas também acolhimento - cores
      suaves, plantas pequenas e uma iluminação adequada criam um espaço
      onde as pessoas se sentem à vontade para partilhar as suas dificuldades.
    `,
    
    interactive_elements: [
      {
        name: "Computador",
        description: "Acesso às bases de dados RSI, histórico profissional e programas disponíveis",
        interactions: ["consultar_rsi", "verificar_historico", "pesquisar_programas"]
      },
      {
        name: "Arquivo de Documentos",
        description: "Pasta com documentação da Felisbina e formulários necessários",
        interactions: ["revisar_documentos", "identificar_em_falta", "organizar_processo"]
      },
      {
        name: "Telefone",
        description: "Contacto direto com entidades parceiras",
        interactions: ["ligar_iefp", "contactar_centro_saude", "falar_seguranca_social"]
      },
      {
        name: "Quadro DLD",
        description: "Fluxogramas de procedimentos para Desemprego de Longa Duração",
        interactions: ["consultar_criterios", "verificar_procedimentos", "confirmar_encaminhamento"]
      }
    ]
  },
  
  dialogue_context: {
    felisbina_personality: {
      traits: ["Tímida", "Desconfiada inicialmente", "Emotiva", "Resiliente no fundo"],
      communication_style: "Fala baixo, evita contacto visual inicial, mas abre-se com empatia",
      concerns: ["Medo de julgamento", "Preocupação com idade", "Ansiedade sobre capacidades"],
      hopes: ["Recuperar independência", "Sentir-se útil novamente", "Estabilidade financeira"]
    },
    
    conversation_flow: {
      opening: "Nervosa mas educada, agradece por ser recebida",
      middle: "Gradualmente mais aberta se tratada com empatia",
      challenges: "Pode ficar emocional ao falar do divórcio e dificuldades",
      resolution: "Esperançosa se sentir que há um plano concreto"
    }
  }
}
```

### **Sistema de Dicas Contextual**
```javascript
const hintSystem = {
  categories: {
    procedural: {
      name: "Dicas de Procedimento",
      icon: "📋",
      penalty: -1 // penalização mínima
    },
    empathy: {
      name: "Dicas de Empatia",
      icon: "❤️", 
      penalty: -2
    },
    technical: {
      name: "Dicas Técnicas",
      icon: "🔧",
      penalty: -3 // penalização maior
    }
  },
  
  hints: {
    // Dicas para conversa inicial
    dialogue_start: {
      category: "empathy",
      trigger: "dialogue_time > 60 && empathy_score < 5",
      text: "Lembre-se de demonstrar empatia. A Felisbina está nervosa e precisa de se sentir acolhida.",
      suggestion: "Tente uma abordagem mais calorosa e compreensiva."
    },
    
    dialogue_information: {
      category: "procedural",
      trigger: "dialogue_interactions > 3 && information_gathered < 50",
      text: "Certifique-se de recolher informação essencial sobre a situação da Felisbina.",
      suggestion: "Faça perguntas sobre experiência profissional, situação familiar e motivações."
    },
    
    // Dicas para análise de perfil
    risk_analysis_start: {
      category: "technical",
      trigger: "analysis_time > 120 && elements_categorized == 0",
      text: "Consulte o fluxograma DLD para orientação sobre fatores de risco e proteção.",
      suggestion: "Arraste os elementos para as categorias corretas: Risco ou Proteção."
    },
    
    risk_categorization: {
      category: "technical", 
      trigger: "wrong_categorizations >= 2",
      text: "Atenção à categorização. Idade 55+, baixa qualificação e isolamento são fatores de risco.",
      suggestion: "Reveja os critérios: fatores que dificultam = risco, fatores que ajudam = proteção."
    },
    
    // Dicas para documentação
    documentation_mandatory: {
      category: "procedural",
      trigger: "documentation_time > 90 && mandatory_docs_collected < 2",
      text: "Foque primeiro nos documentos obrigatórios: RSI, histórico profissional e habilitações.",
      suggestion: "Verifique quais documentos estão disponíveis e quais precisam ser solicitados."
    },
    
    // Dicas para avaliação DLD
    dld_criteria: {
      category: "technical",
      trigger: "assessment_time > 60 && no_decision_made",
      text: "Para DLD: desemprego 12+ meses, considere idade, qualificações e apoios sociais.",
      suggestion: "A Felisbina cumpre os critérios DLD. Avalie disponibilidade e capacidade."
    },
    
    dld_justification: {
      category: "procedural",
      trigger: "decision_made && justification_quality < 50",
      text: "Toda decisão deve ser fundamentada. Explique o porquê da sua avaliação.",
      suggestion: "Base a justificação nos dados recolhidos e critérios DLD."
    }
  },
  
  // Sistema de ajuda progressiva
  progressive_help: {
    level1: "Dica geral sobre o que fazer",
    level2: "Orientação específica sobre como fazer", 
    level3: "Sugestão quase explícita da resposta correta"
  },
  
  // Gestão de dicas
  manageHints: function(gameState, currentAction) {
    const availableHints = this.getAvailableHints(gameState);
    const relevantHints = availableHints.filter(hint => 
      this.evaluateTrigger(hint.trigger, gameState)
    );
    
    return relevantHints.sort((a, b) => a.category.penalty - b.category.penalty);
  }
}
```

---

## 🚀 **PLANO DE IMPLEMENTAÇÃO TÉCNICA**

### **Fase de Desenvolvimento**
```javascript
const implementationPlan = {
  phase: "Fase 1 - Acolhimento e Avaliação Inicial",
  estimated_duration: "3-4 semanas",
  priority: "ALTA - Base para todas as outras fases",
  
  milestones: [
    {
      week: 1,
      title: "Core Engine & Data Structures",
      deliverables: [
        "GameEngine class implementada",
        "Sistema de estados funcionais", 
        "Estrutura de dados completa",
        "StorageManager operacional"
      ],
      success_criteria: "Motor do jogo inicializa e gere estados corretamente"
    },
    {
      week: 2,
      title: "Dialogue System & UI Components", 
      deliverables: [
        "Sistema de diálogos interativo",
        "Interface de conversa com Felisbina",
        "Sistema de feedback em tempo real",
        "Componentes UI básicos"
      ],
      success_criteria: "Conversa inicial completamente funcional"
    },
    {
      week: 3,
      title: "Puzzles & Analysis Tools",
      deliverables: [
        "Puzzle de análise de fatores (drag & drop)",
        "Sistema de documentação",
        "Avaliação DLD automatizada",
        "Sistema de pontuação completo"
      ],
      success_criteria: "Todos os puzzles da Fase 1 funcionais"
    },
    {
      week: 4,
      title: "Integration & Polish",
      deliverables: [
        "Integração completa de todos os componentes",
        "Sistema de achievements",
        "Relatórios de performance",
        "Testes e correções finais"
      ],
      success_criteria: "Fase 1 completamente jogável e testada"
    }
  ]
}
```

### **Arquitetura Modular**
```
src/
├── core/
│   ├── GameEngine.js          # Motor principal do jogo
│   ├── StateManager.js        # Gestão de estados e transições
│   ├── ScoreManager.js        # Sistema de pontuação e achievements
│   ├── StorageManager.js      # Persistência de dados local
│   └── EventManager.js        # Sistema de eventos do jogo
│
├── phase1/
│   ├── Phase1Manager.js       # Coordenador da Fase 1
│   ├── DialogueSystem.js      # Sistema de diálogos com Felisbina
│   ├── RiskAnalysisPuzzle.js  # Puzzle de análise de fatores
│   ├── DocumentationPuzzle.js # Sistema de documentação
│   ├── DLDAssessment.js       # Avaliação DLD automatizada
│   └── CaseDataManager.js     # Gestão dos dados da Felisbina
│
├── ui/
│   ├── UIManager.js           # Coordenador da interface
│   ├── DialogueUI.js          # Interface de conversas
│   ├── DragDropUI.js          # Interface drag & drop
│   ├── InventoryUI.js         # Interface do inventário
│   ├── FeedbackSystem.js      # Sistema de feedback visual
│   ├── ProgressTracker.js     # Rastreamento de progresso
│   └── HintSystem.js          # Sistema de dicas contextual
│
├── data/
│   ├── CaseData.js            # Dados completos da Felisbina
│   ├── DialogueData.js        # Diálogos e respostas
│   ├── PuzzleData.js          # Configuração dos puzzles
│   ├── ScoringData.js         # Critérios de pontuação
│   └── ConfigData.js          # Configurações gerais
│
├── utils/
│   ├── Validators.js          # Validação de dados e ações
│   ├── Analytics.js           # Coleta e análise de métricas
│   ├── Helpers.js             # Funções auxiliares
│   └── Constants.js           # Constantes do jogo
│
└── assets/
    ├── sounds/                # Efeitos sonoros
    ├── images/                # Imagens e ícones
    └── styles/                # Estilos CSS
```

### **Fluxo de Execução Detalhado**
```javascript
const detailedGameFlow = {
  initialization: {
    step: 1,
    duration: "10 segundos",
    actions: [
      "Carregar configurações do jogo",
      "Inicializar dados da Felisbina", 
      "Configurar interface inicial",
      "Verificar dados salvos anteriores"
    ],
    success_condition: "Jogo pronto para começar"
  },
  
  presentation: {
    step: 2,
    duration: "2-3 minutos",
    state: "APRESENTACAO",
    actions: [
      "Mostrar contexto narrativo",
      "Apresentar objetivos da fase",
      "Explicar controlos básicos",
      "Oferecer tutorial opcional"
    ],
    transition: "Jogador clica 'Começar Consulta'"
  },
  
  dialogue_phase: {
    step: 3,
    duration: "5-7 minutos", 
    state: "CONVERSA",
    sub_phases: [
      {
        name: "Abertura",
        duration: "1-2 min",
        goal: "Estabelecer primeiro contacto",
        key_metrics: ["empathy_initial", "rapport_building"]
      },
      {
        name: "Exploração",
        duration: "3-4 min", 
        goal: "Recolher informação essencial",
        key_metrics: ["information_gathering", "active_listening"]
      },
      {
        name: "Consolidação",
        duration: "1-2 min",
        goal: "Confirmar compreensão e tranquilizar",
        key_metrics: ["empathy_final", "confidence_building"]
      }
    ],
    completion_criteria: {
      min_interactions: 5,
      empathy_threshold: 15,
      information_threshold: 80
    }
  },
  
  analysis_phase: {
    step: 4,
    duration: "4-5 minutos",
    state: "ANALISE", 
    mechanics: [
      {
        name: "Element Identification",
        duration: "1-2 min",
        action: "Identificar elementos para análise"
      },
      {
        name: "Risk Categorization", 
        duration: "2-3 min",
        action: "Categorizar fatores de risco e proteção"
      },
      {
        name: "Justification",
        duration: "1 min",
        action: "Justificar categorizações"
      }
    ],
    completion_criteria: {
      elements_categorized: 6,
      accuracy_minimum: 80,
      justifications_provided: true
    }
  },
  
  documentation_phase: {
    step: 5,
    duration: "3-4 minutos",
    state: "DOCUMENTACAO",
    tasks: [
      {
        name: "Document Review",
        priority: "HIGH",
        action: "Revisar documentos disponíveis"
      },
      {
        name: "Gap Identification",
        priority: "HIGH", 
        action: "Identificar documentos em falta"
      },
      {
        name: "Action Planning",
        priority: "MEDIUM",
        action: "Planear recolha de documentos pendentes"
      }
    ],
    completion_criteria: {
      mandatory_docs_reviewed: 3,
      gaps_identified: true,
      action_plan_created: true
    }
  },
  
  assessment_phase: {
    step: 6,
    duration: "2-3 minutos",
    state: "AVALIACAO",
    decisions: [
      {
        name: "DLD Eligibility",
        type: "automatic",
        based_on: ["unemployment_duration", "age", "qualifications", "social_support"]
      },
      {
        name: "Availability Assessment",
        type: "player_decision",
        options: ["full_availability", "conditional_availability", "unavailable"]
      },
      {
        name: "Capacity Assessment", 
        type: "player_decision",
        options: ["full_capacity", "capacity_with_training", "limited_capacity"]
      },
      {
        name: "Final Decision",
        type: "combined",
        logic: "availability AND capacity = referral_decision"
      }
    ],
    completion_criteria: {
      all_assessments_completed: true,
      justification_provided: true,
      next_steps_defined: true
    }
  },
  
  conclusion: {
    step: 7,
    duration: "1-2 minutos",
    state: "CONCLUSAO",
    outputs: [
      "Apresentar pontuação final",
      "Mostrar achievements desbloqueados",
      "Gerar relatório de performance", 
      "Oferecer opções de continuação"
    ],
    next_actions: [
      "Continuar para Fase 2",
      "Repetir Fase 1",
      "Ver relatório detalhado",
      "Exportar dados"
    ]
  }
}
```

---

## 📊 **CRITÉRIOS DE SUCESSO E MÉTRICAS**

### **Métricas de Qualidade**
```javascript
const qualityMetrics = {
  // Métricas técnicas
  technical: {
    performance: {
      load_time: { target: "<3s", critical: "<5s" },
      response_time: { target: "<200ms", critical: "<500ms" },
      memory_usage: { target: "<50MB", critical: "<100MB" }
    },
    reliability: {
      crash_rate: { target: "<0.1%", critical: "<1%" },
      data_loss: { target: "0%", critical: "<0.01%" },
      save_success: { target: ">99.9%", critical: ">99%" }
    },
    compatibility: {
      browsers: ["Chrome 90+", "Firefox 88+", "Safari 14+", "Edge 90+"],
      devices: ["Desktop", "Tablet", "Mobile"],
      screen_sizes: ["1920x1080", "1366x768", "768x1024", "375x667"]
    }
  },
  
  // Métricas pedagógicas
  pedagogical: {
    learning_objectives: {
      procedural_knowledge: {
        target: "80% dos jogadores demonstram aplicação correta dos procedimentos DLD",
        measurement: "Accuracy na avaliação DLD >= 80%"
      },
      decision_making: {
        target: "75% dos jogadores tomam decisões fundamentadas",
        measurement: "Justification quality score >= 75%"
      },
      empathy_development: {
        target: "70% dos jogadores demonstram alta empatia",
        measurement: "Empathy score >= 20/25"
      }
    },
    engagement: {
      completion_rate: { target: ">85%", critical: ">70%" },
      time_on_task: { target: "15-20 min", acceptable: "10-25 min" },
      replay_rate: { target: ">30%", good: ">20%" }
    }
  },
  
  // Métricas de experiência
  user_experience: {
    satisfaction: {
      overall_rating: { target: "4.5/5", acceptable: "4.0/5" },
      ease_of_use: { target: "4.3/5", acceptable: "3.8/5" },
      relevance: { target: "4.7/5", acceptable: "4.2/5" }
    },
    usability: {
      task_success_rate: { target: ">90%", critical: ">80%" },
      error_rate: { target: "<5%", critical: "<10%" },
      help_usage: { target: "<30%", acceptable: "<50%" }
    }
  }
}
```

### **Testes de Aceitação**
```javascript
const acceptanceTests = {
  functional_tests: [
    {
      test_id: "F001",
      name: "Inicialização do Jogo",
      description: "Verificar se o jogo inicializa corretamente",
      steps: [
        "Abrir aplicação",
        "Verificar carregamento de dados",
        "Confirmar interface inicial"
      ],
      expected: "Jogo pronto para começar em <5 segundos",
      priority: "CRITICAL"
    },
    {
      test_id: "F002", 
      name: "Sistema de Diálogos",
      description: "Testar funcionalidade completa do sistema de conversas",
      steps: [
        "Iniciar conversa com Felisbina",
        "Selecionar diferentes opções de resposta",
        "Verificar cálculo de empatia",
        "Confirmar recolha de informação"
      ],
      expected: "Todas as interações funcionam e pontuação é calculada corretamente",
      priority: "HIGH"
    },
    {
      test_id: "F003",
      name: "Análise de Fatores de Risco",
      description: "Testar puzzle de categorização drag & drop",
      steps: [
        "Arrastar elementos para categorias",
        "Verificar validação de respostas",
        "Confirmar cálculo de pontuação",
        "Testar justificações"
      ],
      expected: "Categorização funciona corretamente e feedback é adequado",
      priority: "HIGH"
    }
  ],
  
  performance_tests: [
    {
      test_id: "P001",
      name: "Tempo de Carregamento",
      description: "Medir tempo de inicialização",
      target: "<3 segundos",
      method: "Automated timing"
    },
    {
      test_id: "P002",
      name: "Responsividade da Interface",
      description: "Testar resposta a interações do utilizador",
      target: "<200ms por interação",
      method: "Manual timing"
    }
  ],
  
  usability_tests: [
    {
      test_id: "U001",
      name: "Navegação Intuitiva",
      description: "Verificar se utilizadores conseguem navegar sem ajuda",
      participants: "5 técnicos SAASI",
      success_criteria: "80% completam sem ajuda"
    },
    {
      test_id: "U002",
      name: "Compreensão dos Objetivos",
      description: "Verificar se objetivos são claros",
      method: "Questionário pós-jogo",
      success_criteria: "90% compreendem objetivos"
    }
  ]
}
```

---

## 🔄 **PREPARAÇÃO PARA EXPANSÃO**

### **Hooks para Three.js (Fase Futura)**
```javascript
const threejsIntegration = {
  // Estrutura preparada para renderização 3D
  sceneManager: {
    scenes: {
      office: {
        environment: "saasi_office",
        models: ["desk", "computer", "chairs", "documents"],
        lighting: "office_lighting",
        camera_positions: ["default", "dialogue", "computer", "documents"]
      }
    },
    
    // Mapeamento de estados para cenas 3D
    stateToScene: {
      "APRESENTACAO": { scene: "office", camera: "default", focus: null },
      "CONVERSA": { scene: "office", camera: "dialogue", focus: "felisbina_chair" },
      "ANALISE": { scene: "office", camera: "computer", focus: "computer_screen" },
      "DOCUMENTACAO": { scene: "office", camera: "documents", focus: "document_folder" },
      "AVALIACAO": { scene: "office", camera: "default", focus: "decision_board" }
    }
  },
  
  // Sistema de eventos compatível com 3D
  eventSystem: {
    // Eventos atuais que podem ser mapeados para 3D
    click_events: ["dialogue_option", "drag_element", "select_document"],
    hover_events: ["highlight_object", "show_tooltip", "preview_action"],
    
    // Preparação para eventos 3D futuros
    spatial_events: ["object_interaction", "camera_movement", "scene_transition"]
  },
  
  // Dados independentes de renderização
  gameLogic: {
    // Toda a lógica atual é independente da apresentação
    // Pode ser facilmente adaptada para 3D mantendo a mesma estrutura
    note: "Current game logic is presentation-agnostic and ready for 3D integration"
  }
}
```

### **Extensibilidade para Fases Futuras**
```javascript
const extensibilityFramework = {
  // Interface padrão para todas as fases
  phaseInterface: {
    initialize: "function() - Setup inicial da fase",
    start: "function() - Iniciar execução",
    processAction: "function(action, data) - Processar ação do jogador",
    checkCompletion: "function() - Verificar se fase está completa",
    getScore: "function() - Obter pontuação atual",
    cleanup: "function() - Limpeza ao terminar fase"
  },
  
  // Sistema de plugins para novas funcionalidades
  pluginSystem: {
    registerPlugin: "function(name, plugin) - Registar novo plugin",
    loadPlugin: "function(name) - Carregar plugin",
    hooks: [
      "before_phase_start",
      "after_action_processed", 
      "before_score_calculation",
      "after_phase_completion"
    ]
  },
  
  // Configuração modular
  moduleConfig: {
    phase1: { enabled: true, required: true },
    phase2: { enabled: false, required: false }, // Para implementação futura
    phase3: { enabled: false, required: false },
    phase4: { enabled: false, required: false },
    multiplayer: { enabled: false, required: false },
    analytics: { enabled: true, required: false }
  }
}
```

---

## 📝 **DOCUMENTAÇÃO PARA DESENVOLVIMENTO**

### **Checklist de Implementação**
```markdown
## Fase 1 - Checklist de Desenvolvimento

### Core Engine (Semana 1)
- [ ] Implementar GameEngine class
- [ ] Criar StateManager com todos os estados
- [ ] Desenvolver ScoreManager com algoritmo completo
- [ ] Implementar StorageManager com compressão
- [ ] Criar EventManager para comunicação entre componentes
- [ ] Testes unitários para componentes core

### Data Structures (Semana 1)
- [ ] Definir estrutura completa do gameState
- [ ] Implementar CaseData com dados da Felisbina
- [ ] Criar DialogueData com todas as conversas
- [ ] Configurar PuzzleData com todos os puzzles
- [ ] Implementar ScoringData com critérios detalhados
- [ ] Validar integridade de todos os dados

### Dialogue System (Semana 2)
- [ ] Criar DialogueSystem class
- [ ] Implementar DialogueUI component
- [ ] Desenvolver sistema de escolhas múltiplas
- [ ] Integrar cálculo de empatia em tempo real
- [ ] Implementar feedback visual para respostas
- [ ] Testar todos os caminhos de diálogo

### Risk Analysis Puzzle (Semana 2)
- [ ] Implementar RiskAnalysisPuzzle class
- [ ] Criar DragDropUI component
- [ ] Desenvolver sistema de categorização
- [ ] Implementar validação de respostas
- [ ] Criar feedback para categorizações
- [ ] Testar precisão do sistema de pontuação

### Documentation System (Semana 3)
- [ ] Criar DocumentationPuzzle class
- [ ] Implementar InventoryUI component
- [ ] Desenvolver sistema de recolha de documentos
- [ ] Implementar identificação de documentos em falta
- [ ] Criar sistema de solicitação de documentos
- [ ] Testar fluxo completo de documentação

### DLD Assessment (Semana 3)
- [ ] Implementar DLDAssessment class
- [ ] Criar interface de avaliação
- [ ] Desenvolver lógica de critérios DLD
- [ ] Implementar sistema de decisão
- [ ] Criar validação de justificações
- [ ] Testar precisão das avaliações

### UI Integration (Semana 4)
- [ ] Integrar UIManager com todos os componentes
- [ ] Implementar FeedbackSystem completo
- [ ] Criar ProgressTracker visual
- [ ] Desenvolver HintSystem contextual
- [ ] Implementar sistema de achievements
- [ ] Testar responsividade em todos os dispositivos

### Final Integration (Semana 4)
- [ ] Integrar todos os componentes
- [ ] Implementar fluxo completo da Fase 1
- [ ] Criar sistema de relatórios
- [ ] Implementar exportação de dados
- [ ] Realizar testes de aceitação
- [ ] Documentar APIs e componentes
```

### **Estrutura de Ficheiros Final**
```
FASE1_ESPECIFICACAO_DETALHADA.md    # Este documento
├── IMPLEMENTATION_GUIDE.md         # Guia de implementação técnica
├── API_DOCUMENTATION.md            # Documentação das APIs
├── TESTING_PLAN.md                 # Plano de testes detalhado
├── USER_MANUAL.md                  # Manual do utilizador
└── DEPLOYMENT_GUIDE.md             # Guia de deployment
```

---

## 🎯 **CONCLUSÃO**

Esta especificação técnica detalhada da Fase 1 fornece:

✅ **Definição Completa** - Todos os aspetos da Fase 1 estão especificados  
✅ **Estrutura Técnica** - Arquitetura modular e extensível  
✅ **Dados Detalhados** - Estruturas de dados completas e validadas  
✅ **Lógica de Jogo** - Algoritmos e fluxos totalmente definidos  
✅ **Sistema de Avaliação** - Métricas e critérios de sucesso claros  
✅ **Plano de Implementação** - Roadmap detalhado com milestones  
✅ **Preparação Futura** - Hooks para 3D e expansão para outras fases  

**Status:** ✅ ESPECIFICAÇÃO COMPLETA - PRONTA PARA IMPLEMENTAÇÃO

**Próximo Passo:** Iniciar desenvolvimento seguindo o plano de implementação de 4 semanas.

---

*Documento gerado em Janeiro 2025 - Versão 2.0*  
*Para questões técnicas ou esclarecimentos, consultar a equipa de desenvolvimento.*
