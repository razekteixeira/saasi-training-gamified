/**
 * 🎮 SAASI ESCAPE ROOM - PHASE 4 ENGINE
 * =====================================
 *
 * FASE 4: ACOMPANHAMENTO E AJUSTAMENTO DINÂMICO
 * - Puzzle 1: Monitorização Dinâmica de Progresso
 * - Puzzle 2: Simulação de Gestão de Crises
 * - Puzzle 3: Laboratório de Adaptação Estratégica
 * - Puzzle 4: Orquestrador de Transição para Autonomia
 *
 * Este é o sistema mais avançado, focado em simulação realista
 * e gestão adaptativa do caso da Felisbina.
 */

class EscapeRoomPhase4 {
  constructor(gameState) {
    this.gameState = gameState;
    this.simulationSpeed = 1; // 1x speed initially
    this.crisisActive = false;
    this.autonomyLevel = 0;

    // Load data from previous phases
    this.phase1Data =
      JSON.parse(localStorage.getItem("phase1-escape-data")) || {};
    this.phase2Data =
      JSON.parse(localStorage.getItem("phase2-escape-data")) || {};
    this.phase3Data =
      JSON.parse(localStorage.getItem("phase3-escape-data")) || {};

    // PUZZLE 1: Progress Monitoring Data
    this.progressMetrics = [
      {
        id: "emprego_readiness",
        name: "Prontidão para Emprego",
        currentValue: 67,
        target: 85,
        trend: "positive",
        monthlyChange: 12,
        alertThreshold: 60,
        icon: "💼",
        program: "Programa Qualifica",
        issues: [],
      },
      {
        id: "formacao_progress",
        name: "Progresso na Formação",
        currentValue: 78,
        target: 90,
        trend: "stable",
        monthlyChange: 3,
        alertThreshold: 70,
        icon: "📚",
        program: "Capacitação Digital",
        issues: ["Dificuldades com Excel avançado"],
      },
      {
        id: "autonomia_pessoal",
        name: "Autonomia Pessoal",
        currentValue: 45,
        target: 75,
        trend: "concerning",
        monthlyChange: -2,
        alertThreshold: 50,
        icon: "🧠",
        program: "Apoio Psicológico",
        issues: ["Dependência emocional persistente", "Baixa autoestima"],
      },
      {
        id: "estabilidade_habitacional",
        name: "Estabilidade Habitacional",
        currentValue: 82,
        target: 90,
        trend: "positive",
        monthlyChange: 8,
        alertThreshold: 60,
        icon: "🏠",
        program: "Apoio Habitacional",
        issues: [],
      },
      {
        id: "rede_apoio",
        name: "Rede de Apoio Social",
        currentValue: 38,
        target: 70,
        trend: "critical",
        monthlyChange: -5,
        alertThreshold: 40,
        icon: "👥",
        program: "Dinamização Comunitária",
        issues: ["Isolamento social crescente", "Conflitos familiares"],
      },
    ];

    // PUZZLE 2: Crisis Scenarios Data
    this.crisisScenarios = [
      {
        id: "emprego_perdido",
        title: "🚨 Perda Súbita de Oportunidade de Emprego",
        description:
          "A empresa onde a Felisbina faria estágio faliu. Precisa de nova estratégia urgente.",
        severity: "high",
        timeToRespond: 72, // hours
        impactAreas: ["emprego", "financeiro", "psicologico"],
        availableResponses: [
          {
            id: "busca_alternativas",
            text: "Ativar rede de contactos para encontrar alternativas",
            effectiveness: 75,
            cost: 100,
            timeRequired: 48,
            consequences: [
              "Pode encontrar oportunidade melhor",
              "Stress temporário",
            ],
          },
          {
            id: "formacao_adicional",
            text: "Intensificar formação para melhorar competitividade",
            effectiveness: 60,
            cost: 500,
            timeRequired: 120,
            consequences: ["Melhor preparação", "Atraso nos objetivos"],
          },
          {
            id: "apoio_psicologico",
            text: "Reforçar apoio psicológico para lidar com frustração",
            effectiveness: 40,
            cost: 200,
            timeRequired: 24,
            consequences: [
              "Estabilidade emocional",
              "Não resolve problema base",
            ],
          },
        ],
        correctStrategy: "busca_alternativas",
      },
      {
        id: "crise_familiar",
        title: "⚠️ Agravamento de Conflitos Familiares",
        description:
          "Pai intensifica pressão psicológica. Felisbina considera desistir do processo.",
        severity: "critical",
        timeToRespond: 24,
        impactAreas: ["psicologico", "autonomia", "habitacional"],
        availableResponses: [
          {
            id: "mediacao_familiar",
            text: "Organizar sessão de mediação familiar urgente",
            effectiveness: 80,
            cost: 300,
            timeRequired: 12,
            consequences: ["Pode resolver conflito", "Pode agravar situação"],
          },
          {
            id: "habitacao_temporaria",
            text: "Arranjar habitação temporária alternativa",
            effectiveness: 90,
            cost: 800,
            timeRequired: 6,
            consequences: ["Segurança imediata", "Custos elevados"],
          },
          {
            id: "intensificar_apoio",
            text: "Intensificar apoio psicológico e visitas domiciliárias",
            effectiveness: 65,
            cost: 150,
            timeRequired: 2,
            consequences: ["Suporte emocional", "Não resolve problema base"],
          },
        ],
        correctStrategy: "habitacao_temporaria",
      },
      {
        id: "saude_mental",
        title: "🆘 Crise de Saúde Mental",
        description:
          "Felisbina manifesta sinais de depressão severa e ideação suicida.",
        severity: "critical",
        timeToRespond: 2,
        impactAreas: ["psicologico", "saude", "todos_programas"],
        availableResponses: [
          {
            id: "emergencia_psiquiatrica",
            text: "Acionar emergência psiquiátrica imediatamente",
            effectiveness: 95,
            cost: 0,
            timeRequired: 1,
            consequences: ["Segurança garantida", "Possível internamento"],
          },
          {
            id: "intensificar_terapia",
            text: "Aumentar frequência das sessões de terapia",
            effectiveness: 30,
            cost: 400,
            timeRequired: 24,
            consequences: ["Insuficiente para crise", "Risco elevado"],
          },
          {
            id: "rede_familiar",
            text: "Contactar familiares de confiança",
            effectiveness: 50,
            cost: 0,
            timeRequired: 2,
            consequences: ["Apoio emocional", "Pode não ser suficiente"],
          },
        ],
        correctStrategy: "emergencia_psiquiatrica",
      },
    ];

    // PUZZLE 3: Strategy Adjustment Scenarios
    this.adjustmentScenarios = [
      {
        id: "baixo_progresso_formacao",
        title: "📉 Baixo Progresso na Formação",
        currentStrategy: "Formação intensiva em Excel",
        issue: "Felisbina tem dificuldades com conceitos avançados",
        adjustmentOptions: [
          {
            id: "reducir_ritmo",
            text: "Reduzir ritmo e focar em conceitos básicos",
            impact: { time: +30, effectiveness: +25, stress: -20 },
            cost: 200,
          },
          {
            id: "tutor_individual",
            text: "Arranjar tutor individual para apoio extra",
            impact: { time: +10, effectiveness: +40, stress: -10 },
            cost: 600,
          },
          {
            id: "metodologia_alternativa",
            text: "Mudar para metodologia visual/prática",
            impact: { time: +15, effectiveness: +35, stress: -15 },
            cost: 300,
          },
        ],
        bestOption: "tutor_individual",
      },
      {
        id: "resistencia_autonomia",
        title: "🔒 Resistência ao Desenvolvimento de Autonomia",
        currentStrategy: "Sessões semanais de empoderamento",
        issue: "Felisbina evita tomar decisões independentes",
        adjustmentOptions: [
          {
            id: "pequenos_passos",
            text: "Começar com decisões muito pequenas e gradualmente aumentar",
            impact: { time: +45, effectiveness: +30, stress: -5 },
            cost: 100,
          },
          {
            id: "peer_support",
            text: "Integrar grupo de apoio com pessoas em situação similar",
            impact: { time: +20, effectiveness: +45, stress: -25 },
            cost: 250,
          },
          {
            id: "terapia_familiar",
            text: "Incluir pai nas sessões para trabalhar dinâmica",
            impact: { time: +25, effectiveness: +50, stress: +10 },
            cost: 400,
          },
        ],
        bestOption: "peer_support",
      },
      {
        id: "oportunidades_emprego",
        title: "🎯 Ajuste na Estratégia de Procura de Emprego",
        currentStrategy: "Procura em escritórios e comércio",
        issue: "Poucas oportunidades no mercado tradicional",
        adjustmentOptions: [
          {
            id: "economia_social",
            text: "Focar em cooperativas e economia social",
            impact: { time: +10, effectiveness: +20, stress: -10 },
            cost: 150,
          },
          {
            id: "trabalho_remoto",
            text: "Explorar oportunidades de trabalho remoto",
            impact: { time: +30, effectiveness: +35, stress: +5 },
            cost: 400,
          },
          {
            id: "empreendedorismo",
            text: "Desenvolver projeto de empreendedorismo social",
            impact: { time: +60, effectiveness: +60, stress: +20 },
            cost: 800,
          },
        ],
        bestOption: "trabalho_remoto",
      },
    ];

    // PUZZLE 4: Autonomy Transition Milestones
    this.autonomyMilestones = [
      {
        id: "decisoes_basicas",
        title: "Decisões Básicas do Dia-a-dia",
        description: "Tomar decisões simples sem consultar outros",
        currentLevel: 60,
        targetLevel: 90,
        activities: [
          { text: "Escolher refeições da semana", completed: true, impact: 5 },
          { text: "Gerir horário pessoal", completed: true, impact: 10 },
          {
            text: "Decidir compras do supermercado",
            completed: false,
            impact: 15,
          },
          { text: "Planear atividades de lazer", completed: false, impact: 10 },
        ],
      },
      {
        id: "gestao_financeira",
        title: "Gestão Financeira Independente",
        description: "Gerir dinheiro e orçamento pessoal",
        currentLevel: 35,
        targetLevel: 80,
        activities: [
          { text: "Criar orçamento mensal", completed: false, impact: 20 },
          {
            text: "Gerir conta bancária sozinha",
            completed: false,
            impact: 25,
          },
          { text: "Planear poupanças", completed: false, impact: 15 },
          { text: "Negociar contratos", completed: false, impact: 20 },
        ],
      },
      {
        id: "relacoes_sociais",
        title: "Relações Sociais Saudáveis",
        description: "Desenvolver e manter relações equilibradas",
        currentLevel: 25,
        targetLevel: 75,
        activities: [
          {
            text: "Participar em atividades comunitárias",
            completed: false,
            impact: 15,
          },
          {
            text: "Estabelecer limites com família",
            completed: false,
            impact: 25,
          },
          { text: "Fazer novos amigos", completed: false, impact: 20 },
          {
            text: "Resolver conflitos de forma assertiva",
            completed: false,
            impact: 15,
          },
        ],
      },
      {
        id: "carreira_profissional",
        title: "Desenvolvimento da Carreira",
        description: "Planear e gerir desenvolvimento profissional",
        currentLevel: 50,
        targetLevel: 85,
        activities: [
          {
            text: "Definir objetivos profissionais",
            completed: true,
            impact: 15,
          },
          {
            text: "Procurar emprego autonomamente",
            completed: false,
            impact: 20,
          },
          {
            text: "Negociar condições de trabalho",
            completed: false,
            impact: 25,
          },
          { text: "Planear formação contínua", completed: false, impact: 15 },
        ],
      },
    ];
  }

  // ===== PUZZLE 1: DYNAMIC PROGRESS MONITORING =====
  initializePuzzle1() {
    console.log("Initializing Puzzle 1: Dynamic Progress Monitoring");
    this.createProgressDashboard();
    this.createInteractiveProgramMonitors();
    this.createPredictiveAnalytics();

    showToast(
      "📊 Analise os dados e identifique áreas que precisam de ajuste!",
      "info",
      4000
    );
  }

  createProgressDashboard() {
    // Dashboard already exists in HTML, just update with real data
    this.updateDashboardMetrics();
  }

  updateDashboardMetrics() {
    // Calculate overall progress
    const totalProgress =
      this.progressMetrics.reduce(
        (sum, metric) => sum + metric.currentValue,
        0
      ) / this.progressMetrics.length;

    // Update metric cards with animation
    document.querySelector(".metric-value").textContent = `${Math.round(
      totalProgress
    )}%`;

    // Update individual program monitors
    this.progressMetrics.forEach((metric) => {
      this.updateMetricCard(metric);
    });
  }

  // Create interactive program evaluation dropdowns (essential for puzzle progression)
  createInteractiveProgramMonitors() {
    const container = document.getElementById("programs-monitoring");
    if (!container) return;

    container.innerHTML = "";

    // Define program data that matches fase4.html structure
    const programsData = [
      {
        id: "consultas_psicologia",
        nome: "Consultas de Psicologia",
        entidade: "Centro de Saúde de Ramalde",
        progresso_atual: 66.7,
        status: "em_curso",
        observacoes:
          "Progresso consistente. Redução significativa da dependência emocional do pai.",
        proxima_acao: "continuar_conforme_planeado",
        pontos_avaliacao_correta: 8,
      },
      {
        id: "programa_qualifica",
        nome: "Programa Qualifica - Limpeza",
        entidade: "IEFP Porto",
        progresso_atual: 50,
        status: "com_dificuldades",
        observacoes:
          "Dificuldades na componente teórica. Precisa apoio adicional.",
        proxima_acao: "ajustar_metodologia",
        pontos_avaliacao_correta: 10,
      },
      {
        id: "grupos_apoio_social",
        nome: "Grupos de Apoio Social",
        entidade: "IPSS Solidariedade",
        progresso_atual: 40,
        status: "resistencia",
        observacoes:
          "Resistência à participação. Sente-se 'diferente' dos outros participantes.",
        proxima_acao: "estrategia_alternativa",
        pontos_avaliacao_correta: 12,
      },
    ];

    programsData.forEach((programa) => {
      const card = document.createElement("div");
      card.className = "program-monitor active";
      card.innerHTML = `
        <div class="monitor-header">
          <div style="display: flex; align-items: center;">
            <div class="program-icon">📊</div>
            <div>
              <h4>${programa.nome}</h4>
              <p><strong>Entidade:</strong> ${programa.entidade}</p>
            </div>
          </div>
          <div class="status-indicator ${
            programa.status === "em_curso"
              ? "active"
              : programa.status === "com_dificuldades"
              ? "warning"
              : "error"
          }">
            ${
              programa.status === "em_curso"
                ? "Em Curso"
                : programa.status === "com_dificuldades"
                ? "Dificuldades"
                : "Resistência"
            }
          </div>
        </div>
        <div class="progress-visualization">
          <div class="progress-chart">
            <div class="chart-bar" style="width: ${programa.progresso_atual}%">
              ${programa.progresso_atual}%
            </div>
          </div>
        </div>
        <div class="progress-details">
          <div class="detail-item">
            <span class="label">Observações:</span>
            <span class="value">${programa.observacoes}</span>
          </div>
        </div>
        <div style="margin-top: 15px;">
          <label><strong>Próxima ação recomendada:</strong></label>
          <select onchange="window.escapeRoom.evaluateProgram('${
            programa.id
          }', this.value)" 
                  class="form-control" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 6px; border: 2px solid #ddd;">
            <option value="">Selecione uma ação...</option>
            <option value="continuar_conforme_planeado">Continuar conforme planeado</option>
            <option value="ajustar_metodologia">Ajustar metodologia</option>
            <option value="estrategia_alternativa">Estratégia alternativa</option>
            <option value="reforcar_apoio">Reforçar apoio</option>
            <option value="reduzir_intensidade">Reduzir intensidade</option>
          </select>
        </div>
      `;
      container.appendChild(card);
    });

    // Store program data for evaluation
    this.programsData = programsData;
  }

  // Program evaluation method that actually progresses the puzzle
  evaluateProgram(programId, action) {
    console.log("Evaluating program:", programId, "Action:", action);

    if (!action) return;

    const programa = this.programsData.find((p) => p.id === programId);
    if (!programa) {
      console.error("Program not found:", programId);
      return;
    }

    const isCorrect = action === programa.proxima_acao;
    const points = isCorrect ? programa.pontos_avaliacao_correta : 2;

    // Update game state
    this.gameState.puzzle1.monitoringActions[programId] = action;
    if (isCorrect) {
      this.gameState.puzzle1.alertsAnalyzed.push(programId);
      this.gameState.puzzle1.score += points;
      showToast(`✅ Avaliação correta! +${points} pontos`, "success");
    } else {
      this.gameState.puzzle1.score += points;
      showToast(`⚠️ Avaliação parcial. +${points} pontos`, "warning");
    }

    this.gameState.puzzle1.progress++;
    this.updateProgress1();

    // Update main score display
    if (typeof updateScore === "function") {
      updateScore();
    }

    // Check if puzzle 1 is complete (3 evaluations made)
    if (this.gameState.puzzle1.progress >= 3) {
      this.completePuzzle1();
    }

    console.log(
      "Program evaluation completed. Score:",
      this.gameState.puzzle1.score,
      "Progress:",
      this.gameState.puzzle1.progress
    );
  }

  updateMetricCard(metric) {
    const container = document.getElementById("programs-monitoring");
    if (!container) return;

    const existingCard = document.getElementById(`monitor-${metric.id}`);
    if (existingCard) {
      existingCard.remove();
    }

    const monitorCard = document.createElement("div");
    monitorCard.className = "program-monitor-card";
    monitorCard.id = `monitor-${metric.id}`;

    const alertClass =
      metric.currentValue < metric.alertThreshold ? "alert" : "";
    const trendClass =
      metric.trend === "positive"
        ? "positive"
        : metric.trend === "concerning"
        ? "concerning"
        : "stable";

    monitorCard.innerHTML = `
            <div class="monitor-header ${alertClass}">
                <div class="monitor-icon">${metric.icon}</div>
                <div class="monitor-info">
                    <h4>${metric.name}</h4>
                    <p>${metric.program}</p>
                </div>
                <div class="monitor-status ${trendClass}">
                    ${
                      metric.trend === "positive"
                        ? "📈"
                        : metric.trend === "concerning"
                        ? "📉"
                        : "➡️"
                    }
                </div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${
                      metric.currentValue
                    }%"></div>
                    <div class="progress-target" style="left: ${
                      metric.target
                    }%"></div>
                </div>
                <div class="progress-labels">
                    <span class="current">${metric.currentValue}%</span>
                    <span class="target">Meta: ${metric.target}%</span>
                </div>
            </div>
            <div class="trend-indicator">
                <span class="trend-text ${trendClass}">
                    ${metric.monthlyChange > 0 ? "+" : ""}${
      metric.monthlyChange
    }% este mês
                </span>
            </div>
            ${
              metric.issues.length > 0
                ? `
                <div class="issues-alert">
                    <strong>⚠️ Alertas:</strong>
                    <ul>
                        ${metric.issues
                          .map((issue) => `<li>${issue}</li>`)
                          .join("")}
                    </ul>
                </div>
            `
                : ""
            }
            ${
              metric.currentValue < metric.alertThreshold
                ? `
                <button class="alert-action-btn" onclick="window.escapeRoom.handleProgressAlert('${metric.id}')">
                    🔧 Analisar & Ajustar
                </button>
            `
                : ""
            }
        `;

    container.appendChild(monitorCard);
  }

  createProgramMonitors() {
    const container = document.getElementById("programs-monitoring");
    if (!container) return;

    container.innerHTML = ""; // Clear existing content

    this.progressMetrics.forEach((metric) => {
      this.updateMetricCard(metric);
    });
  }

  createPredictiveAnalytics() {
    // Predictive analytics already exist in HTML
    // Could enhance with dynamic predictions based on current data
    this.updatePredictions();
  }

  updatePredictions() {
    // Update predictions based on current progress trends
    // This would involve complex calculations in a real system
    console.log("Updating predictive analytics...");
  }

  startProgressSimulation() {
    // Simulate real-time updates every few seconds
    this.progressInterval = setInterval(() => {
      this.simulateProgressUpdates();
    }, 5000);
  }

  simulateProgressUpdates() {
    // Simulate small changes in metrics
    this.progressMetrics.forEach((metric) => {
      if (Math.random() < 0.3) {
        // 30% chance of change
        const change = (Math.random() - 0.5) * 2; // -1 to +1
        metric.currentValue = Math.max(
          0,
          Math.min(100, metric.currentValue + change)
        );

        if (Math.random() < 0.1) {
          // 10% chance of new issue
          this.addRandomIssue(metric);
        }
      }
    });

    this.updateDashboardMetrics();
  }

  addRandomIssue(metric) {
    const possibleIssues = [
      "Falta às sessões",
      "Dificuldades técnicas",
      "Resistência à mudança",
      "Conflitos externos",
      "Sobrecarga emocional",
    ];

    const newIssue =
      possibleIssues[Math.floor(Math.random() * possibleIssues.length)];
    if (!metric.issues.includes(newIssue)) {
      metric.issues.push(newIssue);
    }
  }

  handleProgressAlert(metricId) {
    const metric = this.progressMetrics.find((m) => m.id === metricId);
    if (!metric) return;

    const response = prompt(
      `⚠️ ALERTA: ${
        metric.name
      }\n\nProblemas identificados:\n${metric.issues.join(
        "\n"
      )}\n\nQue ação recomenda? (digite sua resposta):`
    );

    if (response && response.trim().length > 10) {
      this.gameState.puzzle1Progress++;
      this.gameState.puzzle1Score += 15;

      // Remove the issue as "resolved"
      metric.issues = [];
      metric.currentValue += 5; // Small improvement

      showToast(
        `✅ Ação registada! Intervenção: "${response.substring(0, 50)}..."`,
        "success",
        3000
      );

      this.updateProgress1();
      this.updateMetricCard(metric);

      if (this.gameState.puzzle1Progress >= 3) {
        this.completePuzzle1();
      }
    } else {
      showToast(
        "❌ Resposta muito curta! Precisa de uma análise mais detalhada.",
        "error",
        3000
      );
    }
  }

  updateProgress1() {
    const progressSpan = document.getElementById("puzzle1-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle1.progress;
    }
  }

  completePuzzle1() {
    this.gameState.puzzle1.completed = true;

    showToast(
      "🎉 Puzzle 1 COMPLETO! Sistema de monitorização calibrado!",
      "success",
      4000
    );

    const btnContinue = document.getElementById("btn-continue-puzzle2");
    if (btnContinue) {
      btnContinue.style.display = "block";
    }

    this.gameState.puzzle1.score += 5; // Completion bonus

    // Update main score display
    if (typeof updateScore === "function") {
      updateScore();
    }

    console.log(`Puzzle 1 completed! Score: ${this.gameState.puzzle1.score}`);
  }

  // ===== PUZZLE 2: CRISIS MANAGEMENT SIMULATION =====
  initializePuzzle2() {
    console.log("Initializing Puzzle 2: Crisis Management Simulation");
    this.createCrisisScenarios();
    this.startCrisisSimulation();

    showToast(
      "🚨 Prepare-se! Crises podem surgir a qualquer momento!",
      "warning",
      4000
    );
  }

  createCrisisScenarios() {
    const container = document.getElementById("active-crises");
    if (!container) {
      console.error("Crisis container not found: active-crises");
      return;
    }

    container.innerHTML = "";

    // Define crisis scenarios data that matches fase4.html pattern
    const crisisScenariosData = [
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
            pontos: 3,
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
            probabilidade_sucesso: 90,
            pontos: 8,
            correto: false,
            consequencias: "Emprego a curto prazo mas sem certificação",
          },
          {
            id: "negociar_emprego_part_time",
            acao: "Negociar horário part-time para manter ambos",
            probabilidade_sucesso: 70,
            pontos: 18,
            correto: true,
            consequencias: "Conciliação ideal entre emprego e formação",
          },
          {
            id: "recusar_completar_qualifica",
            acao: "Recusar emprego para completar formação",
            probabilidade_sucesso: 100,
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

    crisisScenariosData.forEach((cenario) => {
      const card = document.createElement("div");
      card.className = "crisis-card";
      card.innerHTML = `
        <div class="crisis-timer" id="timer-${cenario.id}">${Math.floor(
        cenario.tempo_limite / 60
      )}:${(cenario.tempo_limite % 60).toString().padStart(2, "0")}</div>
        <h4>🚨 ${cenario.titulo}</h4>
        <p><strong>Urgência:</strong> ${cenario.urgencia.toUpperCase()}</p>
        <p>${cenario.descricao}</p>
        <div class="crisis-response-options" id="options-${cenario.id}">
          ${cenario.opcoes_resposta
            .map(
              (opcao) => `
            <div class="response-option" onclick="window.escapeRoom.selectCrisisOption('${cenario.id}', '${opcao.id}')">
              <div class="option-header">
                <h5>${opcao.acao}</h5>
                <span class="success-probability">${opcao.probabilidade_sucesso}% sucesso</span>
              </div>
              <div class="option-details">
                <p><strong>Consequências:</strong> ${opcao.consequencias}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="crisis-decision-panel">
          <button onclick="window.escapeRoom.confirmCrisisResponse('${
            cenario.id
          }')" class="btn btn-crisis-action" id="confirm-${
        cenario.id
      }" disabled>
            Confirmar Resposta
          </button>
        </div>
      `;
      container.appendChild(card);

      // Start timer
      this.startCrisisTimer(cenario.id, cenario.tempo_limite);
    });

    // Store scenarios data for evaluation
    this.crisisScenariosData = crisisScenariosData;
  }

  startCrisisTimer(cenarioId, tempoLimite) {
    let timeRemaining = tempoLimite;
    const timerElement = document.getElementById(`timer-${cenarioId}`);

    const interval = setInterval(() => {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerElement.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      if (timeRemaining <= 0) {
        clearInterval(interval);
        timerElement.textContent = "TEMPO ESGOTADO";
        timerElement.style.background = "#f44336";

        // Auto-confirm response if selected
        if (
          this.selectedCrisisOptions &&
          this.selectedCrisisOptions[cenarioId]
        ) {
          this.confirmCrisisResponse(cenarioId);
        } else {
          // Penalize for not responding
          this.gameState.puzzle2.progress++;
          this.updateProgress2();
          showToast("⚠️ Tempo esgotado! Crise não resolvida.", "error", 3000);
        }
      }
    }, 1000);
  }

  startCrisisSimulation() {
    // This method is called after scenarios are created
    // Individual timers are started in createCrisisScenarios
    showToast(
      "🚨 Crises ativas! Responda rapidamente para evitar agravamento.",
      "warning",
      4000
    );
  }

  // Crisis selection methods (two-step process like fase4.html)
  selectCrisisOption(cenarioId, opcaoId) {
    // Remove previous selection
    document
      .querySelectorAll(`#options-${cenarioId} .response-option`)
      .forEach((option) => {
        option.classList.remove("selected");
      });

    // Select new option
    event.target.closest(".response-option").classList.add("selected");

    // Store selection
    if (!this.selectedCrisisOptions) {
      this.selectedCrisisOptions = {};
    }
    this.selectedCrisisOptions[cenarioId] = opcaoId;

    // Enable confirm button
    document.getElementById(`confirm-${cenarioId}`).disabled = false;
  }

  confirmCrisisResponse(cenarioId) {
    const cenario = this.crisisScenariosData.find((c) => c.id === cenarioId);
    const opcaoId = this.selectedCrisisOptions[cenarioId];
    const opcao = cenario.opcoes_resposta.find((o) => o.id === opcaoId);

    if (!opcao) return;

    // Update game state
    this.gameState.puzzle2.responseChoices[cenarioId] = opcaoId;

    if (opcao.correto) {
      this.gameState.puzzle2.score += opcao.pontos;
      document
        .querySelector(`#options-${cenarioId} .response-option.selected`)
        .classList.add("correct");
      showToast(`✅ Resposta adequada! +${opcao.pontos} pontos`, "success");
    } else {
      this.gameState.puzzle2.score += Math.max(opcao.pontos, 0);
      document
        .querySelector(`#options-${cenarioId} .response-option.selected`)
        .classList.add("incorrect");
      showToast(
        `⚠️ Resposta pode ser melhorada. +${Math.max(opcao.pontos, 0)} pontos`,
        "warning"
      );
    }

    this.gameState.puzzle2.progress++;

    // Disable options
    document
      .querySelectorAll(`#options-${cenarioId} .response-option`)
      .forEach((option) => {
        option.style.pointerEvents = "none";
      });
    document.getElementById(`confirm-${cenarioId}`).disabled = true;

    this.updateProgress2();

    // Update main score display
    if (typeof updateScore === "function") {
      updateScore();
    }

    // Check if puzzle 2 is complete (3 crises resolved)
    if (this.gameState.puzzle2.progress >= 3) {
      this.completePuzzle2();
    }

    console.log(
      "Crisis response completed. Score:",
      this.gameState.puzzle2.score,
      "Progress:",
      this.gameState.puzzle2.progress
    );
  }

  handleCrisisTimeout(crisisId) {
    const statusElement = document.getElementById(`status-${crisisId}`);
    if (statusElement) {
      const statusValue = statusElement.querySelector(".status-value");
      statusValue.innerHTML = "❌ TEMPO ESGOTADO! Crise agravou-se";
      statusValue.className = "status-value error";
    }

    showToast(
      "⏰ Tempo esgotado! Em situações reais, a demora pode agravar crises.",
      "error",
      4000
    );
  }

  updateProgress2() {
    const progressSpan = document.getElementById("puzzle2-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle2.progress;
    }
  }

  completePuzzle2() {
    this.gameState.puzzle2.completed = true;

    showToast(
      "🎉 Puzzle 2 COMPLETO! Protocolos de crise estabelecidos!",
      "success",
      4000
    );

    const btnContinue = document.getElementById("btn-continue-puzzle3");
    if (btnContinue) {
      btnContinue.style.display = "block";
    }

    this.gameState.puzzle2.score += 5; // Completion bonus

    // Update main score display
    if (typeof updateScore === "function") {
      updateScore();
    }

    console.log(`Puzzle 2 completed! Score: ${this.gameState.puzzle2.score}`);
  }

  // ===== PUZZLE 3: STRATEGIC ADAPTATION LABORATORY =====
  initializePuzzle3() {
    console.log("Initializing Puzzle 3: Strategic Adaptation Laboratory");
    this.createAdaptationScenarios();

    showToast(
      "🔬 Analise cenários e ajuste estratégias para otimizar resultados!",
      "info",
      4000
    );
  }

  createAdaptationScenarios() {
    const container = document.getElementById("adaptation-scenarios");
    if (!container) return;

    container.innerHTML = "";

    this.adjustmentScenarios.forEach((scenario) => {
      const scenarioCard = document.createElement("div");
      scenarioCard.className = "adaptation-scenario";
      scenarioCard.id = `scenario-${scenario.id}`;

      scenarioCard.innerHTML = `
                <div class="scenario-header">
                    <h3>${scenario.title}</h3>
                </div>
                <div class="current-strategy">
                    <strong>📋 Estratégia Atual:</strong>
                    <p>${scenario.currentStrategy}</p>
                </div>
                <div class="identified-issue">
                    <strong>⚠️ Problema Identificado:</strong>
                    <p>${scenario.issue}</p>
                </div>
                <div class="adjustment-options">
                    <h4>🔧 Opções de Ajuste:</h4>
                    ${scenario.adjustmentOptions
                      .map(
                        (option) => `
                        <div class="adjustment-option" onclick="window.escapeRoom.selectAdjustment('${
                          scenario.id
                        }', '${option.id}')">
                            <div class="option-header">
                                <strong>${option.text}</strong>
                            </div>
                            <div class="impact-metrics">
                                <div class="metric">
                                    <span class="metric-label">⏱️ Tempo:</span>
                                    <span class="metric-value ${
                                      option.impact.time > 0
                                        ? "negative"
                                        : "positive"
                                    }">
                                        ${option.impact.time > 0 ? "+" : ""}${
                          option.impact.time
                        } dias
                                    </span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">🎯 Eficácia:</span>
                                    <span class="metric-value ${
                                      option.impact.effectiveness > 0
                                        ? "positive"
                                        : "negative"
                                    }">
                                        ${
                                          option.impact.effectiveness > 0
                                            ? "+"
                                            : ""
                                        }${option.impact.effectiveness}%
                                    </span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">😰 Stress:</span>
                                    <span class="metric-value ${
                                      option.impact.stress < 0
                                        ? "positive"
                                        : "negative"
                                    }">
                                        ${option.impact.stress > 0 ? "+" : ""}${
                          option.impact.stress
                        }%
                                    </span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">💰 Custo:</span>
                                    <span class="metric-value">€${
                                      option.cost
                                    }</span>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="scenario-status" id="adaptation-status-${
                  scenario.id
                }">
                    <span class="status-label">Status:</span>
                    <span class="status-value">🤔 Aguardando análise</span>
                </div>
            `;

      container.appendChild(scenarioCard);
    });
  }

  selectAdjustment(scenarioId, optionId) {
    const scenario = this.adjustmentScenarios.find((s) => s.id === scenarioId);
    const option = scenario.adjustmentOptions.find((o) => o.id === optionId);

    if (!scenario || !option) return;

    const isOptimal = optionId === scenario.bestOption;
    const points = isOptimal ? 25 : 10;

    this.gameState.puzzle3Score += points;
    this.gameState.puzzle3Progress++;

    // Update scenario status
    const statusElement = document.getElementById(
      `adaptation-status-${scenarioId}`
    );
    if (statusElement) {
      const statusValue = statusElement.querySelector(".status-value");
      statusValue.innerHTML = isOptimal
        ? "🎯 ESTRATÉGIA ÓTIMA! Máxima eficiência alcançada"
        : "📝 Estratégia válida, mas há opções mais eficientes";
      statusValue.className = `status-value ${
        isOptimal ? "success" : "warning"
      }`;
    }

    // Disable other options
    const scenarioCard = document.getElementById(`scenario-${scenarioId}`);
    const options = scenarioCard.querySelectorAll(".adjustment-option");
    options.forEach((opt) => {
      opt.style.pointerEvents = "none";
      opt.style.opacity = "0.6";
    });

    // Highlight selected option
    const selectedOption = Array.from(options).find((opt) =>
      opt.onclick.toString().includes(optionId)
    );
    if (selectedOption) {
      selectedOption.style.backgroundColor = isOptimal ? "#d4edda" : "#fff3cd";
      selectedOption.style.border = isOptimal
        ? "2px solid #28a745"
        : "2px solid #ffc107";
    }

    showToast(
      isOptimal
        ? `🎯 Perfeito! Estratégia otimizada selecionada! (+${points} pontos)`
        : `📊 Ajuste registado. Analise outras métricas para otimização. (+${points} pontos)`,
      isOptimal ? "success" : "warning",
      3000
    );

    this.updateProgress3();

    if (this.gameState.puzzle3Progress >= 3) {
      this.completePuzzle3();
    }
  }

  updateProgress3() {
    const progressSpan = document.getElementById("puzzle3-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle3Progress;
    }
  }

  completePuzzle3() {
    showToast(
      "🎉 Puzzle 3 COMPLETO! Laboratório de adaptação calibrado!",
      "success",
      4000
    );

    const btnContinue = document.getElementById("btn-continue-puzzle4");
    if (btnContinue) {
      btnContinue.style.display = "block";
    }

    this.gameState.puzzle3Score += 35; // Completion bonus
    console.log(`Puzzle 3 completed! Score: ${this.gameState.puzzle3Score}`);
  }

  // ===== PUZZLE 4: AUTONOMY TRANSITION ORCHESTRATOR =====
  initializePuzzle4() {
    console.log("Initializing Puzzle 4: Autonomy Transition Orchestrator");
    this.createAutonomyMilestones();
    this.createTransitionPlan();

    showToast(
      "🎓 Configure o plano de transição para autonomia completa!",
      "info",
      4000
    );
  }

  createAutonomyMilestones() {
    const container = document.getElementById("autonomy-milestones");
    if (!container) return;

    container.innerHTML = "";

    this.autonomyMilestones.forEach((milestone) => {
      const milestoneCard = document.createElement("div");
      milestoneCard.className = "autonomy-milestone";
      milestoneCard.id = `milestone-${milestone.id}`;

      const progressPercent =
        (milestone.currentLevel / milestone.targetLevel) * 100;

      milestoneCard.innerHTML = `
                <div class="milestone-header">
                    <h3>${milestone.title}</h3>
                    <div class="milestone-progress">
                        <span class="current-level">${
                          milestone.currentLevel
                        }%</span>
                        <span class="target-level">Meta: ${
                          milestone.targetLevel
                        }%</span>
                    </div>
                </div>
                <div class="milestone-description">
                    <p>${milestone.description}</p>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                <div class="milestone-activities">
                    <h4>📋 Atividades para Desenvolvimento:</h4>
                    ${milestone.activities
                      .map(
                        (activity) => `
                        <div class="activity-item ${
                          activity.completed ? "completed" : ""
                        }" 
                             onclick="window.escapeRoom.toggleActivity('${
                               milestone.id
                             }', '${activity.text}')">
                            <div class="activity-checkbox">
                                ${activity.completed ? "✅" : "☐"}
                            </div>
                            <div class="activity-content">
                                <span class="activity-text">${
                                  activity.text
                                }</span>
                                <span class="activity-impact">+${
                                  activity.impact
                                }% de autonomia</span>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="milestone-status">
                    <span class="gap-analysis">
                        Gap para meta: ${
                          milestone.targetLevel - milestone.currentLevel
                        }%
                    </span>
                </div>
            `;

      container.appendChild(milestoneCard);
    });
  }

  createTransitionPlan() {
    const container = document.getElementById("transition-timeline");
    if (!container) return;

    // Create a timeline showing progression plan
    container.innerHTML = `
            <div class="transition-phases">
                <div class="phase-item current">
                    <div class="phase-marker">1</div>
                    <div class="phase-content">
                        <h4>Fase Atual: Dependência Assistida</h4>
                        <p>Apoio intensivo em todas as áreas</p>
                        <div class="phase-duration">Duração: Atual</div>
                    </div>
                </div>
                <div class="phase-item next">
                    <div class="phase-marker">2</div>
                    <div class="phase-content">
                        <h4>Autonomia Supervisionada</h4>
                        <p>Decisões independentes com supervisão</p>
                        <div class="phase-duration">Duração: 3-6 meses</div>
                    </div>
                </div>
                <div class="phase-item future">
                    <div class="phase-marker">3</div>
                    <div class="phase-content">
                        <h4>Autonomia Apoiada</h4>
                        <p>Independência com suporte pontual</p>
                        <div class="phase-duration">Duração: 6-12 meses</div>
                    </div>
                </div>
                <div class="phase-item target">
                    <div class="phase-marker">4</div>
                    <div class="phase-content">
                        <h4>Autonomia Completa</h4>
                        <p>Independência total com follow-up</p>
                        <div class="phase-duration">Meta: 12-18 meses</div>
                    </div>
                </div>
            </div>
            <div class="transition-controls">
                <button class="plan-action-btn" onclick="window.escapeRoom.generateTransitionPlan()">
                    📋 Gerar Plano Detalhado
                </button>
                <button class="validate-plan-btn" onclick="window.escapeRoom.validateTransitionPlan()">
                    ✅ Validar Plano
                </button>
            </div>
        `;
  }

  toggleActivity(milestoneId, activityText) {
    const milestone = this.autonomyMilestones.find((m) => m.id === milestoneId);
    const activity = milestone.activities.find((a) => a.text === activityText);

    if (!milestone || !activity) return;

    activity.completed = !activity.completed;

    // Recalculate milestone level
    const completedActivities = milestone.activities.filter((a) => a.completed);
    const totalImpact = completedActivities.reduce(
      (sum, a) => sum + a.impact,
      0
    );
    milestone.currentLevel = Math.min(
      milestone.targetLevel,
      milestone.currentLevel +
        (activity.completed ? activity.impact : -activity.impact)
    );

    // Update display
    this.createAutonomyMilestones();

    if (activity.completed) {
      this.gameState.puzzle4Score += 5;
      showToast(
        `✅ Atividade concluída! Autonomia aumentou em ${activity.impact}%`,
        "success",
        2000
      );
    } else {
      showToast(
        `↩️ Atividade desmarcada. Autonomia reduzida em ${activity.impact}%`,
        "info",
        2000
      );
    }

    this.checkPuzzle4Completion();
  }

  generateTransitionPlan() {
    const plan = this.createDetailedTransitionPlan();

    showToast(
      "📋 Plano de transição gerado! Revise todas as fases.",
      "info",
      3000
    );

    // Show detailed plan in a modal or expand section
    this.displayDetailedPlan(plan);

    this.gameState.puzzle4Score += 15;
    this.gameState.puzzle4Progress++;
    this.updateProgress4();
  }

  createDetailedTransitionPlan() {
    return {
      phases: [
        {
          name: "Autonomia Supervisionada",
          duration: "3-6 meses",
          goals: [
            "Decisões básicas independentes",
            "Gestão financeira com apoio",
          ],
          support: "Técnico de referência + visitas semanais",
          criteria: "70% autonomia em decisões básicas",
        },
        {
          name: "Autonomia Apoiada",
          duration: "6-12 meses",
          goals: ["Gestão completa do orçamento", "Relações sociais saudáveis"],
          support: "Contacto quinzenal + emergências",
          criteria: "85% autonomia geral",
        },
        {
          name: "Autonomia Completa",
          duration: "12+ meses",
          goals: ["Independência total", "Carreira estável"],
          support: "Follow-up mensal opcional",
          criteria: "95% autonomia + estabilidade 6 meses",
        },
      ],
    };
  }

  displayDetailedPlan(plan) {
    // This would show a detailed view of the transition plan
    console.log("Detailed transition plan:", plan);
  }

  validateTransitionPlan() {
    const totalAutonomy =
      this.autonomyMilestones.reduce((sum, m) => sum + m.currentLevel, 0) /
      this.autonomyMilestones.length;

    if (totalAutonomy >= 65) {
      showToast(
        "✅ Plano VALIDADO! Felisbina está preparada para iniciar transição!",
        "success",
        4000
      );
      this.gameState.puzzle4Score += 25;
      this.completePuzzle4();
    } else {
      showToast(
        `⚠️ Plano precisa de ajustes. Autonomia atual: ${Math.round(
          totalAutonomy
        )}% (mínimo: 65%)`,
        "warning",
        4000
      );
      this.gameState.puzzle4Score += 5;
    }

    this.gameState.puzzle4Progress++;
    this.updateProgress4();
  }

  updateProgress4() {
    const progressSpan = document.getElementById("puzzle4-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle4Progress;
    }
  }

  checkPuzzle4Completion() {
    const completedActivities = this.autonomyMilestones.reduce(
      (sum, m) => sum + m.activities.filter((a) => a.completed).length,
      0
    );

    if (completedActivities >= 8) {
      // Need at least 8 activities completed
      const btnValidate = document.querySelector(".validate-plan-btn");
      if (btnValidate) {
        btnValidate.style.backgroundColor = "#28a745";
        btnValidate.style.animation = "pulse 2s infinite";
      }
    }
  }

  completePuzzle4() {
    showToast(
      "🎉 Puzzle 4 COMPLETO! Plano de autonomia validado!",
      "success",
      4000
    );

    setTimeout(() => {
      this.completePhase4();
    }, 2000);

    this.gameState.puzzle4Score += 40; // Completion bonus
    console.log(`Puzzle 4 completed! Score: ${this.gameState.puzzle4Score}`);
  }

  // ===== PHASE COMPLETION =====
  completePhase4() {
    this.gameState.completionTime = Date.now();
    const totalTime =
      (this.gameState.completionTime - this.gameState.startTime) / 1000 / 60; // minutes

    const totalScore =
      this.gameState.puzzle1Score +
      this.gameState.puzzle2Score +
      this.gameState.puzzle3Score +
      this.gameState.puzzle4Score;

    this.gameState.score = totalScore;

    // Save phase data
    const phase4Data = {
      score: totalScore,
      completionTime: totalTime,
      puzzleScores: {
        puzzle1: this.gameState.puzzle1Score,
        puzzle2: this.gameState.puzzle2Score,
        puzzle3: this.gameState.puzzle3Score,
        puzzle4: this.gameState.puzzle4Score,
      },
      autonomyLevel: this.autonomyLevel,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem("phase4-escape-data", JSON.stringify(phase4Data));

    showToast(
      "🎊 FASE 4 CONCLUÍDA! Sistema SAASI totalmente implementado!",
      "success",
      5000
    );

    setTimeout(() => {
      this.showCompletionScreen(totalScore, totalTime);
    }, 3000);
  }

  showCompletionScreen(score, timeMinutes) {
    // Hide all puzzle states
    document.querySelectorAll(".state").forEach((state) => {
      state.style.display = "none";
    });

    // Show conclusion
    const conclusionState = document.getElementById("state-conclusion");
    if (conclusionState) {
      conclusionState.style.display = "block";

      // Update completion stats
      document.getElementById("final-score").textContent = score;
      document.getElementById("completion-time").textContent = `${Math.round(
        timeMinutes
      )} minutos`;

      // Calculate performance rating
      let rating = "⭐⭐⭐⭐⭐ EXCELENTE!";
      if (score < 200) rating = "⭐⭐⭐ BOM!";
      if (score < 150) rating = "⭐⭐ ADEQUADO";
      if (score < 100) rating = "⭐ PRECISA MELHORAR";

      document.getElementById("performance-rating").textContent = rating;
    }
  }

  // ===== NAVIGATION & UTILITIES =====
  nextPuzzle(puzzleNumber) {
    // Hide current state
    document.querySelectorAll(".state").forEach((state) => {
      state.style.display = "none";
    });

    // Show next puzzle
    const nextState = document.getElementById(`state-puzzle${puzzleNumber}`);
    if (nextState) {
      nextState.style.display = "block";
      this.gameState.currentState = `puzzle${puzzleNumber}`;

      // Initialize the next puzzle
      switch (puzzleNumber) {
        case 2:
          this.initializePuzzle2();
          break;
        case 3:
          this.initializePuzzle3();
          break;
        case 4:
          this.initializePuzzle4();
          break;
      }
    }

    // Update progress bar
    this.updateProgressBar(puzzleNumber);
  }

  updateProgressBar(currentPuzzle) {
    const progressBar = document.querySelector(".progress-fill");
    if (progressBar) {
      const progress = (currentPuzzle / 4) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Update step indicators
    document.querySelectorAll(".step").forEach((step, index) => {
      if (index < currentPuzzle) {
        step.classList.add("completed");
        step.classList.remove("active");
      } else if (index === currentPuzzle - 1) {
        step.classList.add("active");
        step.classList.remove("completed");
      } else {
        step.classList.remove("active", "completed");
      }
    });
  }

  returnToMenu() {
    if (
      confirm("Tem certeza que quer voltar ao menu? O progresso será perdido.")
    ) {
      window.location.href = "index.html";
    }
  }

  restartPhase() {
    if (confirm("Tem certeza que quer reiniciar esta fase?")) {
      window.location.reload();
    }
  }
}

// ===== INITIALIZATION =====
let escapeRoom;

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎮 FASE 4 ESCAPE ROOM - Initializing...");

  // Initialize game state
  const gameState = {
    currentState: "loading",
    score: 0,
    startTime: Date.now(),
    completionTime: null,

    // Puzzle states
    puzzle1Score: 0,
    puzzle1Progress: 0,
    puzzle2Score: 0,
    puzzle2Progress: 0,
    puzzle3Score: 0,
    puzzle3Progress: 0,
    puzzle4Score: 0,
    puzzle4Progress: 0,
  };

  // Create escape room instance
  escapeRoom = new EscapeRoomPhase4(gameState);

  // Make it globally accessible for button clicks
  window.escapeRoom = escapeRoom;

  // Auto-start intro after loading
  setTimeout(() => {
    startIntro();
  }, 2000);
});

function startIntro() {
  // Hide loading
  document.getElementById("state-loading").style.display = "none";
  // Show intro
  document.getElementById("state-intro").style.display = "block";
  escapeRoom.gameState.currentState = "intro";
}

function startGame() {
  // Hide intro
  document.getElementById("state-intro").style.display = "none";
  // Show first puzzle
  document.getElementById("state-puzzle1").style.display = "block";
  escapeRoom.gameState.currentState = "puzzle1";

  // Initialize first puzzle
  escapeRoom.initializePuzzle1();

  // Update progress bar
  escapeRoom.updateProgressBar(1);
}

// ===== SHARED TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = "info", duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Add to page
  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

console.log("🎮 Phase 4 Escape Room Engine loaded successfully!");
