/**
 * SAASI Escape Room - Phase 4 Engine
 * Implementação e Acompanhamento - Motor Principal
 *
 * Conforme FASE4_ESPECIFICACAO_DETALHADA.md
 * Agent 4 Implementation - Complete Phase 4 Engine
 */

// DADOS PARA PUZZLE 1: GESTÃO DE PROGRESSO
const progressManagementData = {
  programas_em_curso: [
    {
      id: "programa_qualifica",
      nome: "Programa Qualifica",
      entidade: "IEFP Porto",
      progresso_atual: 75,
      status: "bom_progresso",
      observacoes:
        "Felisbina tem mostrado boa adaptação às competências digitais",
      proxima_acao: "continuar_acompanhamento",
      pontos_avaliacao_correta: 8,
      acoes_disponiveis: [
        {
          id: "continuar_acompanhamento",
          texto: "Continuar acompanhamento normal",
          justificacao: "Progresso está dentro do esperado",
        },
        {
          id: "intensificar_apoio",
          texto: "Intensificar apoio técnico",
          justificacao: "Necessário para acelerar o progresso",
        },
        {
          id: "reduzir_intensidade",
          texto: "Reduzir intensidade do programa",
          justificacao: "Evitar sobrecarga da beneficiária",
        },
      ],
    },
    {
      id: "apoio_psicologico",
      nome: "Apoio Psicológico",
      entidade: "Centro de Saúde",
      progresso_atual: 45,
      status: "progresso_lento",
      observacoes:
        "Resistência inicial às sessões, mas começando a mostrar abertura",
      proxima_acao: "intensificar_apoio",
      pontos_avaliacao_correta: 9,
      acoes_disponiveis: [
        {
          id: "continuar_acompanhamento",
          texto: "Manter frequência atual",
          justificacao: "Dar tempo para adaptação natural",
        },
        {
          id: "intensificar_apoio",
          texto: "Aumentar frequência das sessões",
          justificacao: "Acelerar processo de confiança",
        },
        {
          id: "mudar_abordagem",
          texto: "Mudar abordagem terapêutica",
          justificacao: "Tentar metodologia diferente",
        },
      ],
    },
    {
      id: "apoio_habitacional",
      nome: "Apoio Habitacional",
      entidade: "Câmara Municipal",
      progresso_atual: 90,
      status: "excelente_progresso",
      observacoes: "Situação habitacional estabilizada, boa gestão do espaço",
      proxima_acao: "reduzir_intensidade",
      pontos_avaliacao_correta: 8,
      acoes_disponiveis: [
        {
          id: "continuar_acompanhamento",
          texto: "Manter acompanhamento atual",
          justificacao: "Situação está estável",
        },
        {
          id: "intensificar_apoio",
          texto: "Aumentar visitas domiciliárias",
          justificacao: "Garantir sustentabilidade",
        },
        {
          id: "reduzir_intensidade",
          texto: "Reduzir para acompanhamento mensal",
          justificacao: "Promover autonomia habitacional",
        },
      ],
    },
  ],
};

class Phase4Engine {
  constructor() {
    this.gameState = {
      currentState: "intro",
      score: 0,
      startTime: Date.now(),
      completionTime: null,

      // Puzzle 1: Gestão de Progresso
      progressEvaluations: {},
      puzzle1Score: 0,
      puzzle1Progress: 0,

      // Puzzle 2: Gestão de Crises
      crisisResponses: {},
      puzzle2Score: 0,
      puzzle2Progress: 0,

      // Puzzle 3: Ajuste de Estratégias
      strategyAdjustments: {},
      puzzle3Score: 0,
      puzzle3Progress: 0,

      // Puzzle 4: Preparação para Autonomia
      autonomyPlanning: {},
      puzzle4Score: 0,
      puzzle4Progress: 0,

      // Dados das fases anteriores
      phase1Data: null,
      phase2Data: null,
      phase3Data: null,
    };

    this.selectionStateManager = new SelectionStateManager();
    this.successRateSystem = null; // Will be initialized after DOM is ready
    this.init();
  }

  init() {
    // Make gameState globally accessible for HTML functions FIRST
    window.gameState = this.gameState;

    const canProceed = this.loadPreviousPhases();
    if (!canProceed) {
      console.log("Phase 4 access denied - stopping initialization");
      return;
    }

    this.setupEventListeners();
    this.updateSidebar();

    // Initialize success rate system when available
    setTimeout(() => {
      if (typeof window.successRateSystem !== "undefined") {
        this.successRateSystem = window.successRateSystem;
        console.log("Phase4Engine: SuccessRateSystem integrated");
      }
    }, 200);

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackEvent("phase4_started", { timestamp: Date.now() });
    }
  }

  loadPreviousPhases() {
    if (typeof SaaSIStorage !== "undefined") {
      this.gameState.phase1Data = SaaSIStorage.loadPhaseResults(1);
      this.gameState.phase2Data = SaaSIStorage.loadPhaseResults(2);
      this.gameState.phase3Data = SaaSIStorage.loadPhaseResults(3);
    }

    console.log("Phase 4 Engine - Loading previous phases:");
    console.log("Phase 1 data:", this.gameState.phase1Data);
    console.log("Phase 2 data:", this.gameState.phase2Data);
    console.log("Phase 3 data:", this.gameState.phase3Data);

    // Verificar acesso à Fase 4 (MODO DESENVOLVIMENTO: desabilitado para testes)
    const DEVELOPMENT_MODE = true; // Mude para false em produção

    if (!DEVELOPMENT_MODE) {
      if (!this.gameState.phase3Data) {
        this.showToast(
          "⚠️ Acesso negado à Fase 4!<br><br>Deve completar a Fase 3 primeiro.<br>Redirecionando para o menu principal...",
          "error",
          3000
        );
        setTimeout(() => (window.location.href = "index.html"), 3000);
        return false;
      }

      const phase3Score = this.gameState.phase3Data.score || 0;
      if (phase3Score < 65) {
        this.showToast(
          `⚠️ Acesso negado à Fase 4!<br><br>Deve completar a Fase 3 com pelo menos 65 pontos.<br>Pontuação atual: ${phase3Score}/100<br><br>Redirecionando para o menu principal...`,
          "error",
          4000
        );
        setTimeout(() => (window.location.href = "index.html"), 4000);
        return false;
      }
    } else {
      console.log("🔧 DEVELOPMENT MODE: Phase 4 access checks bypassed");
    }

    // Atualizar sidebar com dados das fases anteriores
    this.updatePreviousPhasesDisplay();
    return true;
  }

  updatePreviousPhasesDisplay() {
    const elements = {
      "sidebar-phase1-score": this.gameState.phase1Data?.score || "--",
      "sidebar-phase2-score": this.gameState.phase2Data?.score || "--",
      "sidebar-phase3-score": this.gameState.phase3Data?.score || "--",
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });
  }

  setupEventListeners() {
    // Event listeners para navegação entre estados
    document.addEventListener("click", (e) => {
      if (e.target.matches('[data-action="change-state"]')) {
        const newState = e.target.getAttribute("data-state");
        if (newState) this.changeState(newState);
      }
    });
  }

  changeState(newState) {
    // Validar transição de estado
    if (!this.canTransitionTo(newState)) {
      this.showToast(
        "⚠️ Complete as tarefas atuais antes de continuar.",
        "warning"
      );
      return;
    }

    // Esconder todos os estados
    document.querySelectorAll(".state").forEach((state) => {
      state.classList.add("state-hidden");
    });

    // Mostrar novo estado
    const newStateElement = document.getElementById(`state-${newState}`);
    if (newStateElement) {
      newStateElement.classList.remove("state-hidden");
      newStateElement.classList.add("fade-in");
    }

    this.gameState.currentState = newState;

    // Inicializar estado específico
    this.initializeState(newState);

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackEvent("phase4_state_change", {
        newState,
        timestamp: Date.now(),
      });
    }
  }

  canTransitionTo(newState) {
    const transitions = {
      "gestao-progresso": () => true,
      "gestao-crises": () => this.gameState.puzzle1Progress >= 3,
      "ajuste-estrategias": () => this.gameState.puzzle2Progress >= 3,
      "preparacao-autonomia": () => this.gameState.puzzle3Progress >= 3,
      conclusao: () => this.gameState.puzzle4Progress >= 4,
    };

    return transitions[newState] ? transitions[newState]() : true;
  }

  initializeState(state) {
    const initializers = {
      "gestao-progresso": () => this.initProgressManagement(),
      "gestao-crises": () => this.initCrisisManagement(),
      "ajuste-estrategias": () => this.initStrategyAdjustment(),
      "preparacao-autonomia": () => this.initAutonomyPreparation(),
      conclusao: () => this.showConclusion(),
    };

    if (initializers[state]) {
      initializers[state]();
    }
  }

  // PUZZLE 1: Gestão de Progresso
  initProgressManagement() {
    console.log("Phase4Engine: Initializing Progress Management");
    const container = document.getElementById("progress-analysis-container");
    if (!container) {
      console.error("Container 'progress-analysis-container' not found!");
      return;
    }

    container.innerHTML = "";

    // Use the global progressManagementData
    progressManagementData.programas_em_curso.forEach((programa) => {
      const card = this.createProgressCard(programa);
      container.appendChild(card);
    });

    console.log("Progress Management initialized successfully");
  }

  createProgressCard(programa) {
    const card = document.createElement("div");
    card.className = "indicator-card";

    const progressColor = this.getProgressColor(programa.status);

    card.innerHTML = `
      <h4>${programa.nome}</h4>
      <p><strong>Entidade:</strong> ${programa.entidade}</p>
      <p><strong>Progresso:</strong> ${programa.progresso_atual}%</p>
      <div class="progress-indicator">
        <div class="progress-fill" style="width: ${
          programa.progresso_atual
        }%; background: ${progressColor};"></div>
      </div>
      <p><strong>Observações:</strong> ${programa.observacoes}</p>
      <div style="margin-top: 15px;">
        <label><strong>Próxima ação recomendada:</strong></label>
        <select onchange="phase4Engine.evaluateProgram('${
          programa.id
        }', this.value)" style="width: 100%; padding: 8px; margin-top: 5px;">
          <option value="">-- Selecione uma ação --</option>
          ${programa.acoes_disponiveis
            .map(
              (acao) => `
            <option value="${acao.id}">${acao.texto}</option>
          `
            )
            .join("")}
        </select>
        <div style="margin-top: 5px; font-size: 0.9em; color: #666;">
          <strong>Justificações:</strong>
          ${programa.acoes_disponiveis
            .map(
              (acao) => `
            <div><em>${acao.texto}:</em> ${acao.justificacao}</div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    return card;
  }

  getProgressColor(status) {
    const colors = {
      em_curso: "#4caf50",
      com_dificuldades: "#ff9800",
      resistencia: "#f44336",
    };
    return colors[status] || "#2196f3";
  }

  getSuccessRateColor(rate) {
    if (rate >= 80) return "#4caf50"; // Verde
    if (rate >= 60) return "#ff9800"; // Laranja
    if (rate >= 40) return "#f44336"; // Vermelho
    return "#9e9e9e"; // Cinza
  }

  showJustification(actionKey) {
    if (this.successRateSystem) {
      const justification = this.successRateSystem.getJustification(actionKey);
      if (justification) {
        this.successRateSystem.showJustificationModal(justification);
      } else {
        this.showToast(
          "ℹ️ Justificação não disponível para esta ação.",
          "info"
        );
      }
    } else {
      this.showToast("⚠️ Sistema de justificações não carregado.", "warning");
    }
  }

  evaluateProgram(programId, action) {
    console.log(
      "Phase4Engine: Evaluating program:",
      programId,
      "Action:",
      action
    );

    if (!action) return;

    const programa = progressManagementData.programas_em_curso.find(
      (p) => p.id === programId
    );
    if (!programa) {
      console.error("Program not found:", programId);
      return;
    }

    const isCorrect = action === programa.proxima_acao;
    const points = isCorrect ? programa.pontos_avaliacao_correta : 2;

    this.gameState.progressEvaluations[programId] = isCorrect;

    if (isCorrect) {
      this.gameState.puzzle1Score += points;
      this.showToast(`✅ Avaliação correta! +${points} pontos`, "success");
    } else {
      this.gameState.puzzle1Score += points;
      this.showToast(`⚠️ Avaliação parcial. +${points} pontos`, "warning");
    }

    this.gameState.puzzle1Progress++;
    this.updateProgress();

    // Verificar se pode continuar
    if (this.gameState.puzzle1Progress >= 3) {
      const continueBtn = document.getElementById("btn-continue-crisis");
      if (continueBtn) {
        continueBtn.style.display = "block";
        continueBtn.onclick = () => this.changeState("gestao-crises");
      }
    }

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackInteraction("program_evaluation", {
        programId,
        action,
        correct: isCorrect,
      });
    }

    console.log(
      "Program evaluation completed. Score:",
      this.gameState.puzzle1Score,
      "Progress:",
      this.gameState.puzzle1Progress
    );
  }

  // PUZZLE 2: Gestão de Crises
  initCrisisManagement() {
    const container = document.getElementById("crisis-scenarios-container");
    if (!container) return;

    container.innerHTML = "";

    // Dados dos cenários de crise (conforme especificação)
    const crisisScenarios = [
      {
        id: "crise_habitacional",
        titulo: "Crise Habitacional Urgente",
        descricao:
          "A Felisbina foi despejada da pensão por atraso no pagamento. Está temporariamente na casa de uma conhecida, mas só pode ficar 3 dias.",
        urgencia: "alta",
        tempo_limite: 180,
        opcoes_resposta: [
          {
            id: "contactar_emergencia_social",
            acao: "Contactar serviço de emergência social da Câmara",
            probabilidade_sucesso: 80,
            pontos: 15,
            correto: true,
            consequencias: "Alojamento temporário garantido em 24h",
          },
          {
            id: "solicitar_apoio_familia",
            acao: "Contactar familiares para apoio temporário",
            probabilidade_sucesso: 30,
            pontos: 5,
            correto: false,
            consequencias: "Família não tem condições para ajudar",
          },
          {
            id: "parar_programas_procurar_casa",
            acao: "Suspender programas para procurar habitação",
            probabilidade_sucesso: 60,
            pontos: -10,
            correto: false,
            consequencias: "Interrupção do progresso nos programas",
          },
        ],
      },
      {
        id: "oportunidade_emprego",
        titulo: "Oportunidade de Emprego Inesperada",
        descricao:
          "Empresa de limpeza contactou o IEFP. Têm vaga imediata, mas Felisbina só tem 50% do Programa Qualifica completo.",
        urgencia: "media",
        tempo_limite: 240,
        opcoes_resposta: [
          {
            id: "aceitar_emprego_suspender_qualifica",
            acao: "Aceitar emprego e suspender Programa Qualifica",
            probabilidade_sucesso: 60,
            pontos: 8,
            correto: false,
            consequencias: "Emprego a curto prazo mas sem certificação",
          },
          {
            id: "negociar_emprego_part_time",
            acao: "Negociar horário part-time para manter ambos",
            probabilidade_sucesso: 90,
            pontos: 18,
            correto: true,
            consequencias: "Conciliação ideal entre emprego e formação",
          },
          {
            id: "recusar_completar_qualifica",
            acao: "Recusar emprego para completar formação",
            probabilidade_sucesso: 50,
            pontos: 5,
            correto: false,
            consequencias: "Formação completa mas oportunidade perdida",
          },
        ],
      },
      {
        id: "resistencia_grupos_apoio",
        titulo: "Resistência aos Grupos de Apoio",
        descricao:
          "Felisbina quer abandonar grupos de apoio. Sente que 'não encaixa' e que os outros participantes 'têm problemas piores'.",
        urgencia: "baixa",
        tempo_limite: 300,
        opcoes_resposta: [
          {
            id: "aceitar_abandonar_grupos",
            acao: "Aceitar decisão e focar noutras intervenções",
            probabilidade_sucesso: 100,
            pontos: 3,
            correto: false,
            consequencias: "Problema de isolamento social não resolvido",
          },
          {
            id: "encontrar_grupo_alternativo",
            acao: "Procurar grupo mais adequado ao seu perfil",
            probabilidade_sucesso: 85,
            pontos: 12,
            correto: true,
            consequencias: "Melhor adaptação e participação ativa",
          },
          {
            id: "sessoes_individuais_preparacao",
            acao: "Sessões individuais para preparar participação em grupo",
            probabilidade_sucesso: 75,
            pontos: 10,
            correto: true,
            consequencias: "Preparação gradual para integração social",
          },
        ],
      },
    ];

    crisisScenarios.forEach((scenario) => {
      const card = this.createCrisisCard(scenario);
      container.appendChild(card);
    });
  }

  createCrisisCard(scenario) {
    const card = document.createElement("div");
    card.className = "crisis-scenario";

    card.innerHTML = `
            <div class="crisis-timer" id="timer-${scenario.id}">${Math.floor(
      scenario.tempo_limite / 60
    )}:${(scenario.tempo_limite % 60).toString().padStart(2, "0")}</div>
            <h4>🚨 ${scenario.titulo}</h4>
            <p><strong>Urgência:</strong> ${scenario.urgencia.toUpperCase()}</p>
            <p>${scenario.descricao}</p>
            <div class="crisis-options" id="options-${scenario.id}">
                ${scenario.opcoes_resposta
                  .map(
                    (opcao) => `
                    <div class="crisis-option" onclick="phase4Engine.selectCrisisOption('${
                      scenario.id
                    }', '${opcao.id}')">
                        <h5>${opcao.acao}</h5>
                        <p><strong>Probabilidade de sucesso:</strong> 
                            <span class="success-rate" data-tooltip="success_rate_${
                              opcao.probabilidade_sucesso
                            }" style="
                                background: ${this.getSuccessRateColor(
                                  opcao.probabilidade_sucesso
                                )};
                                color: white;
                                padding: 2px 6px;
                                border-radius: 8px;
                                font-weight: bold;
                            ">${opcao.probabilidade_sucesso}%</span>
                        </p>
                        <p><strong>Consequências:</strong> ${
                          opcao.consequencias
                        }</p>
                        <div style="margin-top: 8px;">
                            <button class="justification-btn" onclick="phase4Engine.showJustification('crisis_${
                              scenario.id
                            }_${opcao.id}')" style="
                                background: #2196f3;
                                color: white;
                                border: none;
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 0.8rem;
                                cursor: pointer;
                            ">💡 Por quê?</button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="phase4Engine.confirmCrisisResponse('${
                  scenario.id
                }')" class="action-button" id="confirm-${scenario.id}" disabled>
                    Confirmar Resposta
                </button>
            </div>
        `;

    // Iniciar cronómetro
    this.startCrisisTimer(scenario.id, scenario.tempo_limite);

    return card;
  }

  selectCrisisOption(scenarioId, optionId) {
    // Remover seleção anterior
    document
      .querySelectorAll(`#options-${scenarioId} .crisis-option`)
      .forEach((option) => {
        option.classList.remove("selected");
      });

    // Selecionar nova opção
    event.target.closest(".crisis-option").classList.add("selected");

    if (!this.selectedCrisisOptions) {
      this.selectedCrisisOptions = {};
    }
    this.selectedCrisisOptions[scenarioId] = optionId;

    // Ativar botão de confirmação
    const confirmBtn = document.getElementById(`confirm-${scenarioId}`);
    if (confirmBtn) confirmBtn.disabled = false;
  }

  confirmCrisisResponse(scenarioId) {
    if (!this.selectedCrisisOptions || !this.selectedCrisisOptions[scenarioId])
      return;

    const optionId = this.selectedCrisisOptions[scenarioId];

    // Encontrar cenário e opção
    const scenarios = this.getCrisisScenarios();
    const scenario = scenarios.find((s) => s.id === scenarioId);
    const option = scenario?.opcoes_resposta.find((o) => o.id === optionId);

    if (!option) return;

    this.gameState.crisisResponses[scenarioId] = optionId;

    // Aplicar pontuação
    if (option.correto) {
      this.gameState.puzzle2Score += option.pontos;
      document
        .querySelector(`#options-${scenarioId} .crisis-option.selected`)
        .classList.add("correct");
      this.showToast(
        `✅ Resposta adequada! +${option.pontos} pontos`,
        "success"
      );
    } else {
      this.gameState.puzzle2Score += Math.max(option.pontos, 0);
      document
        .querySelector(`#options-${scenarioId} .crisis-option.selected`)
        .classList.add("incorrect");
      this.showToast(
        `⚠️ Resposta pode ser melhorada. ${
          option.pontos > 0 ? "+" + option.pontos : option.pontos
        } pontos`,
        "warning"
      );
    }

    this.gameState.puzzle2Progress++;

    // Desativar opções
    document
      .querySelectorAll(`#options-${scenarioId} .crisis-option`)
      .forEach((option) => {
        option.style.pointerEvents = "none";
      });
    document.getElementById(`confirm-${scenarioId}`).disabled = true;

    this.updateProgress();

    // Verificar se pode continuar
    if (this.gameState.puzzle2Progress >= 3) {
      const continueBtn = document.getElementById("btn-continue-strategies");
      if (continueBtn) {
        continueBtn.style.display = "block";
        continueBtn.onclick = () => this.changeState("ajuste-estrategias");
      }
    }

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackInteraction("crisis_response", {
        scenarioId,
        optionId,
        correct: option.correto,
        points: option.pontos,
      });
    }
  }

  getCrisisScenarios() {
    // Retorna os cenários de crise (poderia vir de um arquivo de dados)
    return [
      {
        id: "crise_habitacional",
        opcoes_resposta: [
          { id: "contactar_emergencia_social", pontos: 15, correto: true },
          { id: "solicitar_apoio_familia", pontos: 5, correto: false },
          { id: "parar_programas_procurar_casa", pontos: -10, correto: false },
        ],
      },
      {
        id: "oportunidade_emprego",
        opcoes_resposta: [
          {
            id: "aceitar_emprego_suspender_qualifica",
            pontos: 8,
            correto: false,
          },
          { id: "negociar_emprego_part_time", pontos: 18, correto: true },
          { id: "recusar_completar_qualifica", pontos: 5, correto: false },
        ],
      },
      {
        id: "resistencia_grupos_apoio",
        opcoes_resposta: [
          { id: "aceitar_abandonar_grupos", pontos: 3, correto: false },
          { id: "encontrar_grupo_alternativo", pontos: 12, correto: true },
          { id: "sessoes_individuais_preparacao", pontos: 10, correto: true },
        ],
      },
    ];
  }

  startCrisisTimer(scenarioId, timeLimit) {
    let timeRemaining = timeLimit;
    const timerElement = document.getElementById(`timer-${scenarioId}`);
    if (!timerElement) return;

    const interval = setInterval(() => {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerElement.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      if (timeRemaining <= 30) {
        timerElement.style.background = "#ff4757";
        timerElement.style.animation = "pulse 1s infinite";
      }

      if (timeRemaining <= 0) {
        clearInterval(interval);
        timerElement.textContent = "TEMPO ESGOTADO";
        timerElement.style.background = "#f44336";

        // Auto-confirmar resposta se selecionada
        if (
          this.selectedCrisisOptions &&
          this.selectedCrisisOptions[scenarioId]
        ) {
          this.confirmCrisisResponse(scenarioId);
        } else {
          // Penalizar por não responder
          this.gameState.puzzle2Progress++;
          this.updateProgress();
          this.showToast("⏰ Tempo esgotado! Situação não resolvida.", "error");
        }
      }
    }, 1000);
  }

  // PUZZLE 3: Ajuste de Estratégias
  initStrategyAdjustment() {
    const container = document.getElementById("strategy-adjustment-container");
    if (!container) return;

    container.innerHTML = "";

    const header = document.createElement("div");
    header.innerHTML = `
            <h4>Selecione as estratégias de ajuste mais adequadas (escolha 3):</h4>
            <p>Baseie-se nos resultados dos primeiros 3 meses e nas situações imprevistas.</p>
        `;
    container.appendChild(header);

    const strategies = [
      {
        id: "modelo_hibrido_emprego_formacao",
        nome: "Modelo Híbrido: Emprego + Formação",
        descricao:
          "Combinar emprego part-time com conclusão do Programa Qualifica",
        adequado: true,
        pontos: 12,
        vantagens: [
          "Experiência prática",
          "Rendimento imediato",
          "Certificação formal",
        ],
        desafios: ["Gestão de tempo", "Coordenação entidades"],
      },
      {
        id: "foco_competencias_praticas",
        nome: "Foco em Competências Práticas",
        descricao: "Priorizar componente prática do Qualifica e adiar teoria",
        adequado: true,
        pontos: 8,
        vantagens: ["Alinha com pontos fortes", "Menos pressão académica"],
        desafios: ["Certificação incompleta"],
      },
      {
        id: "apoio_social_personalizado",
        nome: "Apoio Social Personalizado",
        descricao:
          "Substituir grupos genéricos por apoio individual + atividades específicas",
        adequado: true,
        pontos: 10,
        vantagens: ["Menos ansiedade social", "Apoio mais direcionado"],
        desafios: ["Mais recursos técnicos necessários"],
      },
      {
        id: "habitacao_definitiva",
        nome: "Solução Habitacional Definitiva",
        descricao:
          "Priorizar encontrar habitação estável antes de avançar outros objetivos",
        adequado: false,
        pontos: -5,
        vantagens: ["Estabilidade base"],
        desafios: ["Atraso outros objetivos", "Mercado habitacional difícil"],
        justificacao_inadequada:
          "Habitação temporária é suficiente para manter programas",
      },
    ];

    strategies.forEach((strategy) => {
      const card = this.createStrategyCard(strategy);
      container.appendChild(card);
    });

    this.selectedStrategies = [];
  }

  createStrategyCard(strategy) {
    const card = document.createElement("div");
    card.className = `strategy-card ${
      strategy.adequado ? "selectable" : "inadequate"
    }`;
    card.onclick = () => this.toggleStrategy(strategy.id);

    card.innerHTML = `
            <h4>${strategy.nome}</h4>
            <p>${strategy.descricao}</p>
            <div style="margin: 10px 0;">
                <strong>Vantagens:</strong> ${strategy.vantagens.join(", ")}
            </div>
            <div style="margin: 10px 0;">
                <strong>Desafios:</strong> ${strategy.desafios.join(", ")}
            </div>
            ${
              strategy.justificacao_inadequada
                ? `
                <div style="color: #f44336; margin-top: 10px;">
                    <strong>Por que inadequada:</strong> ${strategy.justificacao_inadequada}
                </div>
            `
                : ""
            }
            <div style="text-align: right; margin-top: 10px;">
                <span class="badge ${
                  strategy.adequado ? "badge-success" : "badge-warning"
                }">
                    ${strategy.pontos > 0 ? "+" : ""}${strategy.pontos} pontos
                </span>
            </div>
        `;

    return card;
  }

  toggleStrategy(strategyId) {
    const strategies = this.getStrategies();
    const strategy = strategies.find((s) => s.id === strategyId);
    const card = event.currentTarget;

    if (!strategy.adequado) {
      this.showToast(
        "⚠️ Esta estratégia não é adequada para a situação atual da Felisbina.",
        "warning",
        4000
      );
      return;
    }

    if (!this.selectedStrategies) this.selectedStrategies = [];

    if (this.selectedStrategies.includes(strategyId)) {
      // Remover seleção
      this.selectedStrategies = this.selectedStrategies.filter(
        (id) => id !== strategyId
      );
      card.classList.remove("selected");
      this.gameState.puzzle3Score -= strategy.pontos;
    } else {
      // Adicionar seleção (máximo 3)
      if (this.selectedStrategies.length >= 3) {
        this.showToast(
          "🚫 Pode selecionar no máximo 3 estratégias.",
          "warning"
        );
        return;
      }

      this.selectedStrategies.push(strategyId);
      card.classList.add("selected");
      this.gameState.puzzle3Score += strategy.pontos;
    }

    this.gameState.strategyAdjustments = this.selectedStrategies;
    this.gameState.puzzle3Progress = this.selectedStrategies.length;

    this.updateProgress();

    // Verificar se pode continuar
    if (this.selectedStrategies.length >= 3) {
      const continueBtn = document.getElementById("btn-continue-autonomy");
      if (continueBtn) {
        continueBtn.style.display = "block";
        continueBtn.onclick = () => this.changeState("preparacao-autonomia");
      }
    }

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackInteraction("strategy_selection", {
        strategyId,
        selected: this.selectedStrategies.includes(strategyId),
      });
    }
  }

  getStrategies() {
    return [
      { id: "modelo_hibrido_emprego_formacao", adequado: true, pontos: 12 },
      { id: "foco_competencias_praticas", adequado: true, pontos: 8 },
      { id: "apoio_social_personalizado", adequado: true, pontos: 10 },
      { id: "habitacao_definitiva", adequado: false, pontos: -5 },
    ];
  }

  // PUZZLE 4: Preparação para Autonomia
  initAutonomyPreparation() {
    const container = document.getElementById("autonomy-preparation-container");
    if (!container) return;

    container.innerHTML = "";

    // Áreas de autonomia
    const areasSection = document.createElement("div");
    areasSection.innerHTML =
      "<h4>Áreas de Autonomia - Selecione ações para cada área:</h4>";
    container.appendChild(areasSection);

    const autonomyAreas = [
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
            pontos: 5,
          },
          {
            acao: "Poupança para caução",
            prazo: "3 meses",
            responsavel: "felisbina_apoio_tecnico",
            pontos: 4,
          },
          {
            acao: "Procura ativa mercado privado",
            prazo: "1 mês",
            responsavel: "felisbina_autonoma",
            pontos: 3,
          },
        ],
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
            pontos: 6,
          },
          {
            acao: "Negociação full-time",
            prazo: "4 meses",
            responsavel: "felisbina_apoio_minimo",
            pontos: 5,
          },
          {
            acao: "Plano desenvolvimento carreira",
            prazo: "6 meses",
            responsavel: "felisbina_autonoma",
            pontos: 4,
          },
        ],
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
            pontos: 4,
          },
          {
            acao: "Estratégias gestão stress autonomas",
            prazo: "2 meses",
            responsavel: "felisbina_psicologo",
            pontos: 5,
          },
          {
            acao: "Rede apoio informal estabelecida",
            prazo: "4 meses",
            responsavel: "felisbina_apoio_minimo",
            pontos: 6,
          },
        ],
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
            pontos: 4,
          },
          {
            acao: "Desenvolvimento amizades independentes",
            prazo: "4 meses",
            responsavel: "felisbina_apoio_minimo",
            pontos: 5,
          },
          {
            acao: "Papel ativo na comunidade",
            prazo: "6 meses",
            responsavel: "felisbina_autonoma",
            pontos: 3,
          },
        ],
      },
    ];

    autonomyAreas.forEach((area) => {
      const areaDiv = this.createAutonomyAreaCard(area);
      container.appendChild(areaDiv);
    });

    // Estratégias de manutenção
    const maintenanceSection = document.createElement("div");
    maintenanceSection.innerHTML = `
            <h4 style="margin-top: 30px;">Estratégias de Manutenção - Selecione 3 estratégias:</h4>
        `;
    container.appendChild(maintenanceSection);

    const maintenanceStrategies = [
      {
        id: "contactos_seguimento",
        nome: "Contactos de Seguimento",
        descricao: "Sistema de contactos regulares com frequência decrescente",
        pontos: 8,
        adequado: true,
      },
      {
        id: "rede_apoio_emergencia",
        nome: "Rede de Apoio de Emergência",
        descricao: "Contactos para situações de crise ou dúvidas urgentes",
        pontos: 6,
        adequado: true,
      },
      {
        id: "indicadores_alerta",
        nome: "Sistema de Indicadores de Alerta",
        descricao: "Sinais que indicam necessidade de reforço de apoio",
        pontos: 5,
        adequado: true,
      },
      {
        id: "apoio_intensivo_permanente",
        nome: "Manutenção Apoio Intensivo",
        descricao: "Manter todos os apoios com mesma intensidade",
        pontos: -8,
        adequado: false,
        justificacao: "Impede desenvolvimento autonomia e é insustentável",
      },
    ];

    maintenanceStrategies.forEach((strategy) => {
      const strategyDiv = this.createMaintenanceStrategyCard(strategy);
      container.appendChild(strategyDiv);
    });

    this.selectedAutonomyActions = {};
    this.selectedMaintenanceStrategies = [];
  }

  createAutonomyAreaCard(area) {
    const areaDiv = document.createElement("div");
    areaDiv.className = "autonomy-area";

    areaDiv.innerHTML = `
            <h5>${area.nome}</h5>
            <p><strong>Estado atual:</strong> ${area.status_atual.replace(
              /_/g,
              " "
            )}</p>
            <p><strong>Meta 6 meses:</strong> ${area.meta_6_meses.replace(
              /_/g,
              " "
            )}</p>
            <div class="actions-list">
                ${area.acoes_necessarias
                  .map(
                    (acao, index) => `
                    <div class="action-item">
                        <label>
                            <input type="checkbox" onchange="phase4Engine.selectAutonomyAction('${
                              area.id
                            }', ${index}, this.checked)">
                            <strong>${acao.acao}</strong> (${acao.prazo})
                            <span class="badge badge-info">+${
                              acao.pontos
                            } pts</span>
                        </label>
                        <p>Responsável: ${acao.responsavel.replace(
                          /_/g,
                          " "
                        )}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    return areaDiv;
  }

  createMaintenanceStrategyCard(strategy) {
    const strategyDiv = document.createElement("div");
    strategyDiv.className = "maintenance-strategy";
    strategyDiv.onclick = () => this.toggleMaintenanceStrategy(strategy.id);

    strategyDiv.innerHTML = `
            <h5>${strategy.nome}</h5>
            <p>${strategy.descricao}</p>
            <div style="text-align: right; margin-top: 10px;">
                <span class="badge ${
                  strategy.adequado ? "badge-success" : "badge-warning"
                }">
                    ${strategy.pontos > 0 ? "+" : ""}${strategy.pontos} pontos
                </span>
            </div>
            ${
              strategy.justificacao
                ? `
                <div style="color: #f44336; margin-top: 10px; font-size: 0.9rem;">
                    <strong>Justificação:</strong> ${strategy.justificacao}
                </div>
            `
                : ""
            }
        `;

    return strategyDiv;
  }

  selectAutonomyAction(areaId, actionIndex, checked) {
    if (!this.selectedAutonomyActions) this.selectedAutonomyActions = {};
    if (!this.selectedAutonomyActions[areaId])
      this.selectedAutonomyActions[areaId] = [];

    const areas = this.getAutonomyAreas();
    const area = areas.find((a) => a.id === areaId);
    const action = area.acoes_necessarias[actionIndex];

    if (checked) {
      this.selectedAutonomyActions[areaId].push(actionIndex);
      this.gameState.puzzle4Score += action.pontos;
    } else {
      this.selectedAutonomyActions[areaId] = this.selectedAutonomyActions[
        areaId
      ].filter((i) => i !== actionIndex);
      this.gameState.puzzle4Score -= action.pontos;
    }

    this.gameState.autonomyPlanning = {
      actions: this.selectedAutonomyActions,
      maintenanceStrategies: this.selectedMaintenanceStrategies,
    };

    // Calcular progresso (4 áreas)
    this.gameState.puzzle4Progress = Object.keys(
      this.selectedAutonomyActions
    ).filter(
      (areaId) => this.selectedAutonomyActions[areaId].length > 0
    ).length;

    this.updateProgress();
    this.checkAutonomyCompletion();

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackInteraction("autonomy_action_selection", {
        areaId,
        actionIndex,
        checked,
      });
    }
  }

  toggleMaintenanceStrategy(strategyId) {
    const strategies = this.getMaintenanceStrategies();
    const strategy = strategies.find((s) => s.id === strategyId);
    const card = event.currentTarget;

    if (!strategy.adequado) {
      this.showToast(
        "⚠️ Esta estratégia não é adequada e pode impedir o desenvolvimento da autonomia.",
        "warning",
        4000
      );
      // Ainda permitir seleção mas com penalização
    }

    if (!this.selectedMaintenanceStrategies)
      this.selectedMaintenanceStrategies = [];

    if (this.selectedMaintenanceStrategies.includes(strategyId)) {
      // Remover seleção
      this.selectedMaintenanceStrategies =
        this.selectedMaintenanceStrategies.filter((id) => id !== strategyId);
      card.classList.remove("selected");
      this.gameState.puzzle4Score -= strategy.pontos;
    } else {
      // Adicionar seleção (máximo 3)
      if (this.selectedMaintenanceStrategies.length >= 3) {
        this.showToast(
          "🚫 Pode selecionar no máximo 3 estratégias de manutenção.",
          "warning"
        );
        return;
      }

      this.selectedMaintenanceStrategies.push(strategyId);
      card.classList.add("selected");
      this.gameState.puzzle4Score += strategy.pontos;
    }

    this.gameState.autonomyPlanning = {
      actions: this.selectedAutonomyActions,
      maintenanceStrategies: this.selectedMaintenanceStrategies,
    };

    this.updateProgress();
    this.checkAutonomyCompletion();

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackInteraction("maintenance_strategy_selection", {
        strategyId,
        selected: this.selectedMaintenanceStrategies.includes(strategyId),
      });
    }
  }

  getAutonomyAreas() {
    return [
      {
        id: "autonomia_habitacional",
        acoes_necessarias: [{ pontos: 5 }, { pontos: 4 }, { pontos: 3 }],
      },
      {
        id: "autonomia_profissional",
        acoes_necessarias: [{ pontos: 6 }, { pontos: 5 }, { pontos: 4 }],
      },
      {
        id: "autonomia_emocional",
        acoes_necessarias: [{ pontos: 4 }, { pontos: 5 }, { pontos: 6 }],
      },
      {
        id: "autonomia_social",
        acoes_necessarias: [{ pontos: 4 }, { pontos: 5 }, { pontos: 3 }],
      },
    ];
  }

  getMaintenanceStrategies() {
    return [
      { id: "contactos_seguimento", pontos: 8, adequado: true },
      { id: "rede_apoio_emergencia", pontos: 6, adequado: true },
      { id: "indicadores_alerta", pontos: 5, adequado: true },
      { id: "apoio_intensivo_permanente", pontos: -8, adequado: false },
    ];
  }

  checkAutonomyCompletion() {
    // Verificar se pode finalizar (pelo menos 2 ações por área e 3 estratégias de manutenção)
    const areasWithActions = Object.keys(
      this.selectedAutonomyActions || {}
    ).filter((areaId) => this.selectedAutonomyActions[areaId].length >= 2);

    if (
      areasWithActions.length >= 3 &&
      (this.selectedMaintenanceStrategies || []).length >= 3
    ) {
      const finalizeBtn = document.getElementById("btn-finalize-phase4");
      if (finalizeBtn) {
        finalizeBtn.style.display = "block";
        finalizeBtn.onclick = () => this.changeState("conclusao");
      }
    }
  }

  // Atualizar progresso
  updateProgress() {
    // Atualizar pontuação total (limitada ao máximo de 100 para a fase 4)
    this.gameState.score = Math.min(
      this.gameState.puzzle1Score +
        this.gameState.puzzle2Score +
        this.gameState.puzzle3Score +
        this.gameState.puzzle4Score,
      100
    );

    // Atualizar interface
    const elements = {
      "total-score-phase4": this.gameState.score,
      "sidebar-phase4-score": this.gameState.score,
      "puzzle1-score": `${this.gameState.puzzle1Score}/25 pontos`,
      "puzzle2-score": `${this.gameState.puzzle2Score}/30 pontos`,
      "puzzle3-score": `${this.gameState.puzzle3Score}/25 pontos`,
      "puzzle4-score": `${this.gameState.puzzle4Score}/20 pontos`,
      "puzzle1-progress": this.gameState.puzzle1Progress,
      "puzzle2-progress": this.gameState.puzzle2Progress,
      "puzzle3-progress": this.gameState.puzzle3Progress,
      "puzzle4-progress": this.gameState.puzzle4Progress,
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    // Atualizar barras de progresso
    const progressBars = {
      "progress-puzzle1": (this.gameState.puzzle1Progress / 3) * 100,
      "progress-puzzle2": (this.gameState.puzzle2Progress / 3) * 100,
      "progress-puzzle3": (this.gameState.puzzle3Progress / 3) * 100,
      "progress-puzzle4": (this.gameState.puzzle4Progress / 4) * 100,
    };

    Object.entries(progressBars).forEach(([id, width]) => {
      const element = document.getElementById(id);
      if (element) element.style.width = `${width}%`;
    });

    this.updateSidebar();
  }

  updateSidebar() {
    // Calcular pontuação total do escape room (limitada ao máximo de 400)
    let totalScore = this.gameState.score;
    if (this.gameState.phase1Data)
      totalScore += this.gameState.phase1Data.score;
    if (this.gameState.phase2Data)
      totalScore += this.gameState.phase2Data.score;
    if (this.gameState.phase3Data)
      totalScore += this.gameState.phase3Data.score;

    // Limitar ao máximo de 400 pontos
    totalScore = Math.min(totalScore, 400);

    const totalScoreElement = document.getElementById("sidebar-total-score");
    if (totalScoreElement) totalScoreElement.textContent = totalScore;

    // Atualizar estado da Felisbina baseado no progresso
    const autonomyLevel = Math.min(95, 65 + this.gameState.score / 4);
    const autonomyElement = document.getElementById("autonomy-level");
    if (autonomyElement)
      autonomyElement.textContent = `${Math.round(autonomyLevel)}%`;

    // Atualizar outros indicadores baseados nas decisões tomadas
    if (
      this.selectedStrategies &&
      this.selectedStrategies.includes("modelo_hibrido_emprego_formacao")
    ) {
      const employmentElement = document.getElementById("employment-status");
      if (employmentElement)
        employmentElement.textContent = "Part-time + Formação";
    }

    if (
      this.gameState.crisisResponses &&
      this.gameState.crisisResponses["crise_habitacional"] ===
        "contactar_emergencia_social"
    ) {
      const housingElement = document.getElementById("housing-status");
      if (housingElement) housingElement.textContent = "Estável (temporária)";
    }

    const mentalHealthElement = document.getElementById("mental-health");
    if (mentalHealthElement) {
      mentalHealthElement.textContent =
        this.gameState.score > 70 ? "Muito Estável" : "Estável";
    }
  }

  // Mostrar conclusão
  showConclusion() {
    this.gameState.completionTime = Date.now();
    const duration = Math.round(
      (this.gameState.completionTime - this.gameState.startTime) / 60000
    );

    // Calcular nível final
    let level = "Técnico Iniciante";
    let certification = "Técnico Competente SAASI";

    if (this.gameState.score >= 95) {
      level = "Master SAASI";
      certification = "Master SAASI";
    } else if (this.gameState.score >= 85) {
      level = "Técnico Especialista";
      certification = "Técnico Especialista SAASI";
    } else if (this.gameState.score >= 70) {
      level = "Técnico Proficiente";
      certification = "Técnico Proficiente SAASI";
    } else if (this.gameState.score >= 50) {
      level = "Técnico Competente";
    }

    // Calcular pontuação total do escape room
    let totalScore = this.gameState.score;
    if (this.gameState.phase1Data)
      totalScore += this.gameState.phase1Data.score;
    if (this.gameState.phase2Data)
      totalScore += this.gameState.phase2Data.score;
    if (this.gameState.phase3Data)
      totalScore += this.gameState.phase3Data.score;

    // Atualizar elementos da conclusão
    const elements = {
      "final-score-phase4": this.gameState.score,
      "final-score-total": totalScore,
      "final-level": level,
      "final-certification": certification,
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    });

    // Salvar resultados da Fase 4
    const phase4Results = {
      phase: 4,
      score: this.gameState.score,
      maxScore: 100,
      percentage: this.gameState.score,
      duration: duration,
      level: { title: level },
      certification: certification,
      progressEvaluations: this.gameState.progressEvaluations,
      crisisResponses: this.gameState.crisisResponses,
      strategyAdjustments: this.gameState.strategyAdjustments,
      autonomyPlanning: this.gameState.autonomyPlanning,
      puzzleScores: {
        puzzle1: this.gameState.puzzle1Score,
        puzzle2: this.gameState.puzzle2Score,
        puzzle3: this.gameState.puzzle3Score,
        puzzle4: this.gameState.puzzle4Score,
      },
      totalEscapeRoomScore: totalScore,
      completionTime: this.gameState.completionTime,
      startTime: this.gameState.startTime,
    };

    if (typeof SaaSIStorage !== "undefined") {
      SaaSIStorage.savePhaseResults(4, phase4Results);
    }

    // Gerar achievements finais
    this.generateFinalAchievements(totalScore);

    if (typeof SaaSIAnalytics !== "undefined") {
      SaaSIAnalytics.trackPhaseCompletion(4, phase4Results);
      SaaSIAnalytics.trackEvent("escape_room_completed", {
        totalScore,
        duration,
        certification,
      });
    }
  }

  generateFinalAchievements(totalScore) {
    const achievementsContainer = document.getElementById("achievements-final");
    if (!achievementsContainer) return;

    const achievements = [];

    // Achievements da Fase 4
    if (this.gameState.puzzle2Score >= 25)
      achievements.push("🚨 Gestor de Crises");
    if (this.gameState.puzzle3Score >= 20)
      achievements.push("🎯 Estrategista Adaptável");
    if (this.gameState.puzzle4Score >= 18)
      achievements.push("🌟 Mentor da Autonomia");

    // Achievement final do escape room
    if (totalScore >= 340) achievements.push("👑 Master SAASI");
    else if (totalScore >= 280)
      achievements.push("🏆 Especialista SAASI Completo");
    else if (totalScore >= 220)
      achievements.push("⭐ Técnico SAASI Proficiente");

    if (achievements.length > 0) {
      achievementsContainer.innerHTML = `
                <h4>🏆 Conquistas Desbloqueadas:</h4>
                <div style="margin: 15px 0;">
                    ${achievements
                      .map(
                        (achievement) =>
                          `<span class="badge badge-achievement">${achievement}</span>`
                      )
                      .join("")}
                </div>
            `;
    } else {
      achievementsContainer.innerHTML = `
                <h4>🏆 Continue a praticar para desbloquear conquistas!</h4>
            `;
    }
  }

  // Toast System
  showToast(message, type = "info", duration = 5000) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
            ${message}
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add("show"), 100);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Instância global
let phase4Engine;

// Inicializar quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  phase4Engine = new Phase4Engine();
});

// Funções globais para compatibilidade com HTML existente
function changeState(newState) {
  if (phase4Engine) phase4Engine.changeState(newState);
}

function showToast(message, type, duration) {
  if (phase4Engine) phase4Engine.showToast(message, type, duration);
}

// PUZZLE 1: Função global para inicializar gestão de progresso
function initProgressManagement() {
  console.log("Initializing Progress Management - Global Function");
  const container = document.getElementById("progress-analysis-container");
  if (!container) {
    console.error("Container 'progress-analysis-container' not found!");
    return;
  }

  container.innerHTML = "";

  progressManagementData.programas_em_curso.forEach((programa) => {
    const card = document.createElement("div");
    card.className = "indicator-card";
    card.innerHTML = `
      <h4>${programa.nome}</h4>
      <p><strong>Entidade:</strong> ${programa.entidade}</p>
      <p><strong>Progresso:</strong> ${programa.progresso_atual}%</p>
      <div class="progress-indicator">
        <div class="progress-fill" style="width: ${
          programa.progresso_atual
        }%; background: ${getProgressColor(programa.status)};"></div>
      </div>
      <p><strong>Observações:</strong> ${programa.observacoes}</p>
      <div style="margin-top: 15px;">
        <label><strong>Próxima ação recomendada:</strong></label>
        <select onchange="evaluateProgram('${
          programa.id
        }', this.value)" style="width: 100%; padding: 8px; margin-top: 5px;">
          <option value="">-- Selecione uma ação --</option>
          ${programa.acoes_disponiveis
            .map(
              (acao) => `
            <option value="${acao.id}">${acao.texto}</option>
          `
            )
            .join("")}
        </select>
        <div style="margin-top: 5px; font-size: 0.9em; color: #666;">
          <strong>Justificações:</strong>
          ${programa.acoes_disponiveis
            .map(
              (acao) => `
            <div><em>${acao.texto}:</em> ${acao.justificacao}</div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  console.log("Progress Management initialized successfully");
}

// Função auxiliar para obter cor do progresso
function getProgressColor(status) {
  switch (status) {
    case "excelente_progresso":
      return "#4caf50"; // Verde
    case "bom_progresso":
      return "#8bc34a"; // Verde claro
    case "progresso_lento":
      return "#ff9800"; // Laranja
    case "com_dificuldades":
      return "#f44336"; // Vermelho
    default:
      return "#2196f3"; // Azul
  }
}

// Função global para avaliar programa
function evaluateProgram(programId, action) {
  console.log("Evaluating program:", programId, "Action:", action);

  if (!action) return;

  const programa = progressManagementData.programas_em_curso.find(
    (p) => p.id === programId
  );
  if (!programa) {
    console.error("Program not found:", programId);
    return;
  }

  const isCorrect = action === programa.proxima_acao;
  const points = isCorrect ? programa.pontos_avaliacao_correta : 2;

  if (isCorrect) {
    window.gameState.puzzle1Score += points;
    showToast(`✅ Avaliação correta! +${points} pontos`, "success");
  } else {
    window.gameState.puzzle1Score += points;
    showToast(`⚠️ Avaliação parcial. +${points} pontos`, "warning");
  }

  window.gameState.puzzle1Progress++;
  updateProgress();

  // Verificar se pode continuar
  if (window.gameState.puzzle1Progress >= 3) {
    const continueBtn = document.getElementById("btn-continue-crisis");
    if (continueBtn) {
      continueBtn.style.display = "block";
      continueBtn.onclick = () => changeState("gestao-crises");
    }
  }

  console.log(
    "Program evaluation completed. Score:",
    window.gameState.puzzle1Score,
    "Progress:",
    window.gameState.puzzle1Progress
  );
}

// Função global para atualizar progresso
function updateProgress() {
  if (!window.gameState) return;

  // Atualizar pontuação total (limitada ao máximo de 100 para a fase 4)
  window.gameState.score = Math.min(
    window.gameState.puzzle1Score +
      window.gameState.puzzle2Score +
      window.gameState.puzzle3Score +
      window.gameState.puzzle4Score,
    100
  );

  // Atualizar interface
  const elements = {
    "total-score-phase4": window.gameState.score,
    "sidebar-phase4-score": window.gameState.score,
    "puzzle1-score": `${window.gameState.puzzle1Score}/25 pontos`,
    "puzzle2-score": `${window.gameState.puzzle2Score}/30 pontos`,
    "puzzle3-score": `${window.gameState.puzzle3Score}/25 pontos`,
    "puzzle4-score": `${window.gameState.puzzle4Score}/20 pontos`,
    "puzzle1-progress": window.gameState.puzzle1Progress,
    "puzzle2-progress": window.gameState.puzzle2Progress,
    "puzzle3-progress": window.gameState.puzzle3Progress,
    "puzzle4-progress": window.gameState.puzzle4Progress,
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  // Atualizar barras de progresso
  const progressBars = {
    "progress-puzzle1": (window.gameState.puzzle1Progress / 3) * 100,
    "progress-puzzle2": (window.gameState.puzzle2Progress / 3) * 100,
    "progress-puzzle3": (window.gameState.puzzle3Progress / 3) * 100,
    "progress-puzzle4": (window.gameState.puzzle4Progress / 4) * 100,
  };

  Object.entries(progressBars).forEach(([id, percentage]) => {
    const element = document.getElementById(id);
    if (element) element.style.width = `${percentage}%`;
  });

  console.log("Progress updated. Total score:", window.gameState.score);
}

async function restartPhase4() {
  const confirmRestart = await ModalSystem.confirm(
    "🔄 Tem certeza que deseja reiniciar a Fase 4?<br><br>Todos os progressos desta fase serão perdidos.",
    {
      title: "🔄 Reiniciar Fase 4",
      okText: "Sim, reiniciar",
      cancelText: "Cancelar",
      type: "warning",
    }
  );

  if (confirmRestart) {
    localStorage.removeItem("saasi_phase4_results");
    location.reload();
  }
}

function showFinalReport() {
  document.getElementById("state-conclusao").classList.add("state-hidden");
  document
    .getElementById("final-report-modal")
    .classList.remove("state-hidden");
  generateFinalReport();
}

function generateFinalReport() {
  if (!phase4Engine) return;

  const content = document.getElementById("final-report-content");
  if (!content) return;

  const totalScore =
    (phase4Engine.gameState.phase1Data?.score || 0) +
    (phase4Engine.gameState.phase2Data?.score || 0) +
    (phase4Engine.gameState.phase3Data?.score || 0) +
    phase4Engine.gameState.score;

  const totalDuration =
    (phase4Engine.gameState.phase1Data?.duration || 0) +
    (phase4Engine.gameState.phase2Data?.duration || 0) +
    (phase4Engine.gameState.phase3Data?.duration || 0) +
    Math.round(
      (phase4Engine.gameState.completionTime -
        phase4Engine.gameState.startTime) /
        60000
    );

  content.innerHTML = `
        <div class="final-report">
            <h3>📊 Resumo Executivo</h3>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h4>Pontuação Total</h4>
                            <div class="score-circle" style="margin: 20px auto;">
                                ${totalScore}/400
                            </div>
                            <p><strong>Percentagem:</strong> ${Math.round(
                              (totalScore / 400) * 100
                            )}%</p>
                            <p><strong>Tempo Total:</strong> ${totalDuration} minutos</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h4>Desempenho por Fase</h4>
                            <p><strong>Fase 1:</strong> ${
                              phase4Engine.gameState.phase1Data?.score || 0
                            }/100 (${
    phase4Engine.gameState.phase1Data?.duration || 0
  }min)</p>
                            <p><strong>Fase 2:</strong> ${
                              phase4Engine.gameState.phase2Data?.score || 0
                            }/100 (${
    phase4Engine.gameState.phase2Data?.duration || 0
  }min)</p>
                            <p><strong>Fase 3:</strong> ${
                              phase4Engine.gameState.phase3Data?.score || 0
                            }/100 (${
    phase4Engine.gameState.phase3Data?.duration || 0
  }min)</p>
                            <p><strong>Fase 4:</strong> ${
                              phase4Engine.gameState.score
                            }/100 (${Math.round(
    (phase4Engine.gameState.completionTime - phase4Engine.gameState.startTime) /
      60000
  )}min)</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <h3>🎯 Resultado do Caso Felisbina Santos</h3>
            <div class="card">
                <div class="card-body">
                    <h4>Estado Final da Beneficiária</h4>
                    <div class="row">
                        <div class="col">
                            <p><strong>Autonomia Pessoal:</strong> ${
                              document.getElementById("autonomy-level")
                                ?.textContent || "N/A"
                            }</p>
                            <p><strong>Situação Profissional:</strong> ${
                              document.getElementById("employment-status")
                                ?.textContent || "N/A"
                            }</p>
                        </div>
                        <div class="col">
                            <p><strong>Habitação:</strong> ${
                              document.getElementById("housing-status")
                                ?.textContent || "N/A"
                            }</p>
                            <p><strong>Saúde Mental:</strong> ${
                              document.getElementById("mental-health")
                                ?.textContent || "N/A"
                            }</p>
                        </div>
                    </div>
                    <h5>Fatores de Sucesso:</h5>
                    <ul>
                        ${
                          totalScore >= 300
                            ? "<li>Excelente coordenação multissetorial</li>"
                            : ""
                        }
                        ${
                          phase4Engine.gameState.puzzle2Score >= 25
                            ? "<li>Gestão eficaz de situações de crise</li>"
                            : ""
                        }
                        ${
                          phase4Engine.gameState.puzzle4Score >= 18
                            ? "<li>Planeamento sustentável para autonomia</li>"
                            : ""
                        }
                        <li>Abordagem personalizada e adaptativa</li>
                    </ul>
                </div>
            </div>

            <h3>💡 Recomendações para Desenvolvimento Profissional</h3>
            <div class="card">
                <div class="card-body">
                    ${
                      totalScore >= 340
                        ? `
                        <div class="alert alert-success">
                            <h5>🏆 Excelente Desempenho!</h5>
                            <p>Demonstrou competências avançadas em todas as áreas. Considere:</p>
                            <ul>
                                <li>Mentoria de novos técnicos</li>
                                <li>Formação especializada em casos complexos</li>
                                <li>Participação em desenvolvimento de metodologias</li>
                            </ul>
                        </div>
                    `
                        : totalScore >= 280
                        ? `
                        <div class="alert alert-info">
                            <h5>⭐ Bom Desempenho!</h5>
                            <p>Competências sólidas demonstradas. Áreas para desenvolvimento:</p>
                            <ul>
                                <li>Aprofundar gestão de situações de crise</li>
                                <li>Desenvolver competências de planeamento estratégico</li>
                                <li>Fortalecer articulação interinstitucional</li>
                            </ul>
                        </div>
                    `
                        : `
                        <div class="alert alert-warning">
                            <h5>📚 Continue a Desenvolver!</h5>
                            <p>Base sólida estabelecida. Focos prioritários:</p>
                            <ul>
                                <li>Praticar avaliação sistemática de necessidades</li>
                                <li>Melhorar competências de tomada de decisão</li>
                                <li>Desenvolver visão sistémica de intervenção</li>
                            </ul>
                        </div>
                    `
                    }
                </div>
            </div>
        </div>
    `;
}

function closeReport() {
  document.getElementById("final-report-modal").classList.add("state-hidden");
  document.getElementById("state-conclusao").classList.remove("state-hidden");
}

function exportResults() {
  if (!phase4Engine) return;

  const results = {
    escapeRoom: "SAASI",
    completionDate: new Date().toISOString(),
    totalScore:
      (phase4Engine.gameState.phase1Data?.score || 0) +
      (phase4Engine.gameState.phase2Data?.score || 0) +
      (phase4Engine.gameState.phase3Data?.score || 0) +
      phase4Engine.gameState.score,
    phases: {
      phase1: phase4Engine.gameState.phase1Data,
      phase2: phase4Engine.gameState.phase2Data,
      phase3: phase4Engine.gameState.phase3Data,
      phase4: {
        score: phase4Engine.gameState.score,
        progressEvaluations: phase4Engine.gameState.progressEvaluations,
        crisisResponses: phase4Engine.gameState.crisisResponses,
        strategyAdjustments: phase4Engine.gameState.strategyAdjustments,
        autonomyPlanning: phase4Engine.gameState.autonomyPlanning,
      },
    },
  };

  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `SAASI_EscapeRoom_Results_${
    new Date().toISOString().split("T")[0]
  }.json`;
  link.click();
  URL.revokeObjectURL(url);

  if (typeof SaaSIAnalytics !== "undefined") {
    SaaSIAnalytics.trackEvent("results_exported", {
      totalScore: results.totalScore,
    });
  }
}
