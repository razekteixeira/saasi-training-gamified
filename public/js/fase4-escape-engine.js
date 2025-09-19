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
        id: "dificuldades_programa_qualifica",
        title: "📚 Dificuldades no Programa Qualifica",
        currentStrategy:
          "Formação teórica e prática em Higiene, Saúde e Segurança no Trabalho",
        issue:
          "Felisbina tem dificuldades na componente teórica do curso, causando ansiedade e baixa autoestima",
        adjustmentOptions: [
          {
            id: "foco_competencias_praticas",
            text: "Priorizar componente prática e adiar teoria para mais tarde",
            impact: { time: +15, effectiveness: +35, stress: -25 },
          },
          {
            id: "apoio_pedagogico_especializado",
            text: "Solicitar apoio pedagógico individualizado para teoria",
            impact: { time: +10, effectiveness: +40, stress: -15 },
          },
          {
            id: "abandonar_qualifica",
            text: "Abandonar formação e focar apenas na experiência prática",
            impact: { time: -30, effectiveness: -20, stress: -10 },
          },
        ],
        bestOption: "apoio_pedagogico_especializado",
      },
      {
        id: "oportunidade_emprego_limpeza",
        title: "💼 Oportunidade de Emprego em Limpezas Profissionais Porto",
        currentStrategy:
          "Aguardar conclusão do Programa Qualifica antes de trabalhar",
        issue:
          "Empresa oferece emprego part-time (20h) mas Felisbina só tem 50% do curso completo",
        adjustmentOptions: [
          {
            id: "aceitar_emprego_part_time",
            text: "Aceitar emprego part-time e continuar formação em horário adaptado",
            impact: { time: +5, effectiveness: +45, stress: +10 },
          },
          {
            id: "recusar_aguardar_certificacao",
            text: "Recusar emprego e completar primeiro a certificação",
            impact: { time: +30, effectiveness: +20, stress: -5 },
          },
          {
            id: "negociar_horario_flexivel",
            text: "Negociar horário flexível para conciliar emprego e formação",
            impact: { time: +10, effectiveness: +50, stress: +5 },
          },
        ],
        bestOption: "negociar_horario_flexivel",
      },
      {
        id: "resistencia_grupos_apoio",
        title: "👥 Resistência aos Grupos de Apoio Social",
        currentStrategy: "Participação em grupos genéricos de apoio social",
        issue:
          "Felisbina sente-se desconfortável e 'diferente' dos outros participantes, evitando as sessões",
        adjustmentOptions: [
          {
            id: "grupo_mulheres_55_mais",
            text: "Mudar para grupo específico de mulheres 55+ em situação similar",
            impact: { time: +5, effectiveness: +40, stress: -20 },
          },
          {
            id: "sessoes_individuais_preparacao",
            text: "Sessões individuais para preparar gradualmente a participação em grupo",
            impact: { time: +20, effectiveness: +30, stress: -15 },
          },
          {
            id: "aceitar_abandono_grupos",
            text: "Aceitar a resistência e focar noutras formas de apoio social",
            impact: { time: -10, effectiveness: -15, stress: -25 },
          },
        ],
        bestOption: "grupo_mulheres_55_mais",
      },
    ];

    // PUZZLE 4: Autonomy Transition Milestones
    // Puzzle 4 data is now defined in autonomyPreparationData object to align with fase4.html
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
          "A Felisbina vai ser despejada da pensão por atraso no pagamento. Tem até ao último dia do corrente mês para encontrar uma nova habitação.",
        urgencia: "alta",
        tempo_limite: 180,
        opcoes_resposta: [
          {
            id: "contactar_emergencia_social",
            acao: "Contactar serviço de emergência social",
            probabilidade_sucesso: 80,
            pontos: 15,
            correto: true,
            consequencias: "Alojamento temporário garantido",
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
            probabilidade_sucesso: 30,
            pontos: 3,
            correto: false,
            consequencias: "Problema de isolamento social não resolvido",
          },
          {
            id: "encontrar_grupo_alternativo",
            acao: "Procurar grupo mais adequado ao seu perfil",
            probabilidade_sucesso: 75,
            pontos: 12,
            correto: true,
            consequencias: "Melhor adaptação e participação ativa",
          },
          {
            id: "sessoes_individuais_preparacao",
            acao: "Sessões individuais para preparar participação em grupo",
            probabilidade_sucesso: 85,
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

    // Initialize puzzle3 object in gameState
    if (!this.gameState.puzzle3) {
      this.gameState.puzzle3 = {
        adaptationChoices: {},
        effectiveness: 67,
        score: 0,
        progress: 0,
      };
    }

    this.createAdaptationScenarios();

    showToast(
      "🔬 Analise cenários e ajuste estratégias para otimizar resultados!",
      "info",
      4000
    );
  }

  createAdaptationScenarios() {
    const container = document.getElementById("strategy-scenarios");
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

    // Initialize puzzle3 object if it doesn't exist
    if (!this.gameState.puzzle3) {
      this.gameState.puzzle3 = { adaptationChoices: {}, effectiveness: 67 };
    }
    if (!this.gameState.puzzle3.adaptationChoices) {
      this.gameState.puzzle3.adaptationChoices = {};
    }

    // Check if this scenario was already selected (for score adjustment)
    const wasAlreadySelected =
      this.gameState.puzzle3.adaptationChoices[scenarioId];
    if (wasAlreadySelected) {
      // Remove previous points
      this.gameState.puzzle3Score -= wasAlreadySelected.points;
    } else {
      // Only increment progress for new scenarios
      this.gameState.puzzle3Progress++;
    }

    // Add new points
    this.gameState.puzzle3Score += points;

    // Store the selection for analysis
    this.gameState.puzzle3.adaptationChoices[scenarioId] = {
      optionId: optionId,
      option: option,
      isOptimal: isOptimal,
      points: points,
    };

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

    // Clear previous selections and highlight current one
    const scenarioCard = document.getElementById(`scenario-${scenarioId}`);
    const options = scenarioCard.querySelectorAll(".adjustment-option");

    // Remove previous selections
    options.forEach((opt) => {
      opt.classList.remove("optimal", "selected");
    });

    // Highlight selected option
    const selectedOption = Array.from(options).find((opt) =>
      opt.onclick.toString().includes(optionId)
    );
    if (selectedOption) {
      selectedOption.classList.add(isOptimal ? "optimal" : "selected");
    }

    // Update effectiveness gauge
    this.updateEffectivenessGauge();

    // Update results visualization
    this.updateAdaptationResults();

    showToast(
      isOptimal
        ? `🎯 Perfeito! Estratégia otimizada selecionada! (+${points} pontos)`
        : `📊 Ajuste registado. Analise outras métricas para otimização. (+${points} pontos)`,
      isOptimal ? "success" : "warning",
      3000
    );

    this.updateProgress3();

    console.log(
      "Puzzle 3 Progress:",
      this.gameState.puzzle3Progress,
      "Selections:",
      Object.keys(this.gameState.puzzle3.adaptationChoices || {}).length
    );

    // Check if all 3 scenarios have been answered
    const totalScenarios = this.adjustmentScenarios.length;
    const completedScenarios = Object.keys(
      this.gameState.puzzle3.adaptationChoices || {}
    ).length;

    if (completedScenarios >= totalScenarios) {
      this.completePuzzle3();
    }
  }

  updateEffectivenessGauge() {
    const gaugeFill = document.querySelector(".gauge-fill");
    if (!gaugeFill) return;

    // Calculate new effectiveness based on selections
    let totalEffectiveness = 67; // Starting value
    let optimalSelections = 0;
    let totalSelections = 0;

    if (this.gameState.puzzle3.adaptationChoices) {
      Object.values(this.gameState.puzzle3.adaptationChoices).forEach(
        (choice) => {
          totalSelections++;
          if (choice.isOptimal) {
            optimalSelections++;
            totalEffectiveness += 8; // Optimal choices boost effectiveness more
          } else {
            totalEffectiveness += 3; // Non-optimal still add some effectiveness
          }
        }
      );
    }

    // Cap at 95%
    totalEffectiveness = Math.min(95, totalEffectiveness);

    gaugeFill.classList.add("updated");
    gaugeFill.style.width = `${totalEffectiveness}%`;

    const gaugeValue = document.querySelector(".gauge-value");
    if (gaugeValue) {
      gaugeValue.textContent = `${totalEffectiveness}%`;
    }

    // Update the effectiveness in gameState
    this.gameState.puzzle3.effectiveness = totalEffectiveness;
  }

  updateAdaptationResults() {
    const chartElement = document.getElementById("adaptation-chart");
    const insightsElement = document.getElementById("key-insights");

    if (!chartElement || !insightsElement) return;

    const choices = this.gameState.puzzle3.adaptationChoices || {};
    const numChoices = Object.keys(choices).length;

    if (numChoices === 0) return;

    // Update chart
    chartElement.classList.add("active");
    chartElement.innerHTML = `
      <div style="text-align: center;">
        <h4>📊 Análise de Impacto das Adaptações</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
          <div style="background: white; padding: 15px; border-radius: 8px; border: 2px solid #4caf50;">
            <div style="font-size: 1.8rem; color: #4caf50; font-weight: bold;">${
              this.gameState.puzzle3.effectiveness || 67
            }%</div>
            <div style="font-size: 0.9rem; color: #6c757d;">Eficácia Atual</div>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 2px solid #17a2b8;">
            <div style="font-size: 1.8rem; color: #17a2b8; font-weight: bold;">${numChoices}/3</div>
            <div style="font-size: 0.9rem; color: #6c757d;">Adaptações</div>
          </div>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 2px solid #ffc107;">
            <div style="font-size: 1.8rem; color: #ffc107; font-weight: bold;">${
              Object.values(choices).filter((c) => c.isOptimal).length
            }</div>
            <div style="font-size: 0.9rem; color: #6c757d;">Ótimas</div>
          </div>
        </div>
      </div>
    `;

    // Update insights
    const insights = this.generateInsights(choices);
    insightsElement.innerHTML = insights
      .map(
        (insight) => `
      <div class="insight ${insight.type}">
        <span class="insight-icon">${insight.icon}</span>
        <span class="insight-text">${insight.text}</span>
      </div>
    `
      )
      .join("");
  }

  generateInsights(choices) {
    const insights = [];
    const optimalCount = Object.values(choices).filter(
      (c) => c.isOptimal
    ).length;
    const totalCount = Object.keys(choices).length;

    // Performance insights
    if (optimalCount === totalCount && totalCount >= 3) {
      insights.push({
        type: "positive",
        icon: "🏆",
        text: "Excelente! Todas as adaptações são estratégias ótimas!",
      });
    } else if (optimalCount >= totalCount * 0.67) {
      insights.push({
        type: "positive",
        icon: "✅",
        text: "Bom desempenho! Maioria das adaptações são eficazes.",
      });
    } else {
      insights.push({
        type: "warning",
        icon: "⚠️",
        text: "Pode melhorar! Analise as métricas antes de decidir.",
      });
    }

    // Specific adaptation insights
    Object.entries(choices).forEach(([scenarioId, choice]) => {
      const scenario = this.adjustmentScenarios.find(
        (s) => s.id === scenarioId
      );
      if (choice.isOptimal) {
        if (scenarioId === "dificuldades_programa_qualifica") {
          insights.push({
            type: "positive",
            icon: "🎯",
            text: "Apoio pedagógico individualizado é crucial para o sucesso da Felisbina!",
          });
        } else if (scenarioId === "oportunidade_emprego_limpeza") {
          insights.push({
            type: "positive",
            icon: "💼",
            text: "Horário flexível permite conciliar experiência prática com certificação!",
          });
        } else if (scenarioId === "resistencia_grupos_apoio") {
          insights.push({
            type: "positive",
            icon: "👥",
            text: "Grupo específico para mulheres 55+ cria ambiente mais acolhedor!",
          });
        }
      } else {
        insights.push({
          type: "info",
          icon: "💡",
          text: `${scenario.title}: Há estratégias mais eficazes disponíveis.`,
        });
      }
    });

    // Strategy insights based on overall performance
    if (totalCount >= 3) {
      const effectiveness = this.gameState.puzzle3.effectiveness || 67;
      if (effectiveness >= 90) {
        insights.push({
          type: "positive",
          icon: "🌟",
          text: "Estratégia adaptativa altamente eficaz implementada!",
        });
      } else if (effectiveness >= 80) {
        insights.push({
          type: "info",
          icon: "📈",
          text: "Boa evolução estratégica. Continue a otimizar as intervenções.",
        });
      }
    }

    return insights.slice(0, 4); // Limit to 4 insights for better UX
  }

  updateProgress3() {
    const progressSpan = document.getElementById("puzzle3-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle3Progress;
    }
  }

  completePuzzle3() {
    // Final effectiveness and insights update
    this.updateEffectivenessGauge();
    this.updateAdaptationResults();

    // Calculate completion bonus based on performance
    const choices = this.gameState.puzzle3.adaptationChoices || {};
    const optimalCount = Object.values(choices).filter(
      (c) => c.isOptimal
    ).length;
    const totalCount = Object.keys(choices).length;

    let completionBonus = 15; // Base bonus
    if (optimalCount === totalCount) {
      completionBonus = 25; // Perfect performance bonus
    } else if (optimalCount >= totalCount * 0.67) {
      completionBonus = 20; // Good performance bonus
    }

    this.gameState.puzzle3Score += completionBonus;

    // Show completion message based on performance
    const effectiveness = this.gameState.puzzle3.effectiveness || 67;
    let message = "🎉 Puzzle 3 COMPLETO! Laboratório de adaptação calibrado!";
    if (effectiveness >= 90) {
      message = "🏆 PERFEITO! Adaptação estratégica otimizada ao máximo!";
    } else if (effectiveness >= 80) {
      message = "⭐ EXCELENTE! Estratégias bem adaptadas e eficazes!";
    }

    showToast(message, "success", 4000);

    // Show final summary
    setTimeout(() => {
      showToast(
        `📊 Análise Final:<br>• Eficácia: ${effectiveness}%<br>• Adaptações ótimas: ${optimalCount}/${totalCount}<br>• Bónus: +${completionBonus} pontos`,
        "info",
        6000
      );
    }, 1000);

    const btnContinue = document.getElementById("btn-continue-puzzle4");
    if (btnContinue) {
      btnContinue.style.display = "block";
    }

    console.log(
      `Puzzle 3 completed! Score: ${this.gameState.puzzle3Score}, Effectiveness: ${effectiveness}%`
    );
  }

  // ===== PUZZLE 4: PREPARAÇÃO PARA AUTONOMIA (ALIGNED WITH FASE4.HTML) =====
  initializePuzzle4() {
    console.log("Initializing Puzzle 4: Preparação para Autonomia");
    this.initAutonomyPreparation();

    showToast(
      "🌟 Defina estratégias de manutenção e redução gradual do apoio!",
      "info",
      4000
    );
  }

  // AUTONOMY PREPARATION DATA - ALIGNED WITH FASE4.HTML
  initAutonomyPreparation() {
    const container = document.getElementById("autonomy-preparation-container");
    if (!container) {
      console.error("Container autonomy-preparation-container not found!");
      return;
    }

    container.innerHTML = "";

    // Initialize selected items tracking
    this.selectedAutonomyActions = {};
    this.selectedMaintenanceStrategies = [];

    // Create sophisticated visual components matching other puzzles
    this.createAutonomyOverviewDashboard(container);
    this.createAutonomyAreasGrid(container);
    this.createMaintenanceStrategiesSection(container);
  }

  createAutonomyOverviewDashboard(container) {
    const dashboardDiv = document.createElement("div");
    dashboardDiv.className = "autonomy-overview-dashboard";
    dashboardDiv.innerHTML = `
      <div class="autonomy-metrics-grid">
        <div class="autonomy-metric-card" style="--metric-color: #9c27b0">
          <div class="metric-icon">🏠</div>
          <div class="metric-content">
            <h4>Autonomia Habitacional</h4>
            <div class="metric-value">25%</div>
            <div class="metric-status critical">Dependente de apoio</div>
          </div>
        </div>
        <div class="autonomy-metric-card" style="--metric-color: #2196f3">
          <div class="metric-icon">💼</div>
          <div class="metric-content">
            <h4>Autonomia Profissional</h4>
            <div class="metric-value">55%</div>
            <div class="metric-status improving">Part-time com apoio</div>
          </div>
        </div>
        <div class="autonomy-metric-card" style="--metric-color: #4caf50">
          <div class="metric-icon">🧠</div>
          <div class="metric-content">
            <h4>Autonomia Emocional</h4>
            <div class="metric-value">70%</div>
            <div class="metric-status good">Progresso significativo</div>
          </div>
        </div>
        <div class="autonomy-metric-card" style="--metric-color: #ff9800">
          <div class="metric-icon">👥</div>
          <div class="metric-content">
            <h4>Autonomia Social</h4>
            <div class="metric-value">35%</div>
            <div class="metric-status warning">Participação limitada</div>
          </div>
        </div>
      </div>
      <div class="transition-timeline">
        <h4>⏱️ Cronograma de Transição (6 meses)</h4>
        <div class="timeline-phases">
          <div class="phase-marker current">
            <span class="phase-label">Mês 4</span>
            <span class="phase-status">Implementação</span>
          </div>
          <div class="phase-marker next">
            <span class="phase-label">Mês 5</span>
            <span class="phase-status">Consolidação</span>
          </div>
          <div class="phase-marker future">
            <span class="phase-label">Mês 6</span>
            <span class="phase-status">Autonomia</span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(dashboardDiv);
  }

  createAutonomyAreasGrid(container) {
    const areasSection = document.createElement("div");
    areasSection.className = "autonomy-areas-section";
    areasSection.innerHTML = `
      <div class="section-header">
        <h4>🎯 Áreas de Autonomia - Configuração de Ações</h4>
        <p>Selecione pelo menos 2 ações por área para criar um plano de transição completo</p>
      </div>
    `;

    const areasGrid = document.createElement("div");
    areasGrid.className = "autonomy-areas-grid";

    this.autonomyPreparationData.areas_autonomia.forEach((area) => {
      const areaCard = document.createElement("div");
      areaCard.className = "autonomy-area-card";
      areaCard.innerHTML = `
        <div class="area-header">
          <div class="area-icon">${this.getAreaIcon(area.id)}</div>
          <div class="area-info">
            <h5>${area.nome}</h5>
            <div class="area-progress">
              <div class="current-status">
                <span class="status-label">Estado atual:</span>
                <span class="status-value">${area.status_atual.replace(
                  /_/g,
                  " "
                )}</span>
              </div>
              <div class="target-status">
                <span class="status-label">Meta 6 meses:</span>
                <span class="status-value target">${area.meta_6_meses.replace(
                  /_/g,
                  " "
                )}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="actions-grid">
          ${area.acoes_necessarias
            .map(
              (acao, index) => `
            <div class="action-card" data-area="${
              area.id
            }" data-index="${index}">
              <div class="action-content">
                <div class="action-header">
                  <label class="action-checkbox">
                    <input type="checkbox" onchange="window.escapeRoom.selectAutonomyAction('${
                      area.id
                    }', ${index}, this.checked)">
                    <span class="checkmark"></span>
                  </label>
                  <div class="action-points">+${acao.pontos} pts</div>
                </div>
                <div class="action-details">
                  <h6>${acao.acao}</h6>
                  <div class="action-meta">
                    <span class="action-timeline">⏱️ ${acao.prazo}</span>
                    <span class="action-responsible">👤 ${acao.responsavel.replace(
                      /_/g,
                      " "
                    )}</span>
                  </div>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
      areasGrid.appendChild(areaCard);
    });

    areasSection.appendChild(areasGrid);
    container.appendChild(areasSection);
  }

  createMaintenanceStrategiesSection(container) {
    const maintenanceSection = document.createElement("div");
    maintenanceSection.className = "maintenance-strategies-section";
    maintenanceSection.innerHTML = `
      <div class="section-header">
        <h4>🔧 Estratégias de Manutenção</h4>
        <p>Selecione 3 estratégias para garantir a sustentabilidade do plano de autonomia</p>
      </div>
    `;

    const strategiesGrid = document.createElement("div");
    strategiesGrid.className = "maintenance-strategies-grid";

    this.autonomyPreparationData.estrategias_manutencao.forEach(
      (estrategia) => {
        const strategyCard = document.createElement("div");
        strategyCard.className = `maintenance-strategy-card ${
          !estrategia.adequado ? "inadequate" : ""
        }`;
        strategyCard.onclick = () =>
          this.toggleMaintenanceStrategy(estrategia.id);

        strategyCard.innerHTML = `
        <div class="strategy-header">
          <div class="strategy-icon">${this.getStrategyIcon(
            estrategia.id
          )}</div>
          <div class="strategy-info">
            <h5>${estrategia.nome}</h5>
            <div class="strategy-points ${
              estrategia.pontos < 0 ? "negative" : "positive"
            }">
              ${estrategia.pontos > 0 ? "+" : ""}${estrategia.pontos} pontos
            </div>
          </div>
        </div>
        <div class="strategy-content">
          <p>${estrategia.descricao}</p>
          ${
            estrategia.justificacao
              ? `
            <div class="strategy-warning">
              <span class="warning-icon">⚠️</span>
              <span class="warning-text">${estrategia.justificacao}</span>
            </div>
          `
              : ""
          }
        </div>
        <div class="strategy-selection-indicator">
          <div class="selection-checkmark">✓</div>
        </div>
      `;
        strategiesGrid.appendChild(strategyCard);
      }
    );

    maintenanceSection.appendChild(strategiesGrid);
    container.appendChild(maintenanceSection);
  }

  getAreaIcon(areaId) {
    const icons = {
      autonomia_habitacional: "🏠",
      autonomia_profissional: "💼",
      autonomia_emocional: "🧠",
      autonomia_social: "👥",
    };
    return icons[areaId] || "🎯";
  }

  getStrategyIcon(estrategiaId) {
    const icons = {
      contactos_seguimento: "📞",
      rede_apoio_emergencia: "🆘",
      indicadores_alerta: "📊",
      apoio_intensivo_permanente: "🔒",
    };
    return icons[estrategiaId] || "🔧";
  }

  // AUTONOMY PREPARATION DATA - EXACTLY FROM FASE4.HTML
  autonomyPreparationData = {
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
    ],
    estrategias_manutencao: [
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
    ],
  };

  selectAutonomyAction(areaId, actionIndex, checked) {
    if (!this.selectedAutonomyActions[areaId]) {
      this.selectedAutonomyActions[areaId] = [];
    }

    const area = this.autonomyPreparationData.areas_autonomia.find(
      (a) => a.id === areaId
    );
    const action = area.acoes_necessarias[actionIndex];

    if (checked) {
      this.selectedAutonomyActions[areaId].push(actionIndex);
      this.gameState.puzzle4Score += action.pontos;
      showToast(
        `✅ Ação selecionada: ${action.acao} (+${action.pontos} pts)`,
        "success",
        2000
      );
    } else {
      this.selectedAutonomyActions[areaId] = this.selectedAutonomyActions[
        areaId
      ].filter((i) => i !== actionIndex);
      this.gameState.puzzle4Score -= action.pontos;
      showToast(
        `↩️ Ação removida: ${action.acao} (-${action.pontos} pts)`,
        "info",
        2000
      );
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

    this.updateProgress4();
    this.checkAutonomyCompletion();
  }

  toggleMaintenanceStrategy(estrategiaId) {
    const estrategia = this.autonomyPreparationData.estrategias_manutencao.find(
      (e) => e.id === estrategiaId
    );
    const card = event.currentTarget;

    if (!estrategia.adequado) {
      showToast(
        "⚠️ Esta estratégia não é adequada e pode impedir o desenvolvimento da autonomia.",
        "warning",
        4000
      );
      // Ainda permitir seleção mas com penalização
    }

    if (this.selectedMaintenanceStrategies.includes(estrategiaId)) {
      // Remover seleção
      this.selectedMaintenanceStrategies =
        this.selectedMaintenanceStrategies.filter((id) => id !== estrategiaId);
      card.classList.remove("selected");
      this.gameState.puzzle4Score -= estrategia.pontos;
      showToast(
        `↩️ Estratégia removida: ${estrategia.nome} (${
          estrategia.pontos > 0 ? "-" : "+"
        }${Math.abs(estrategia.pontos)} pts)`,
        "info",
        2000
      );
    } else {
      // Adicionar seleção (máximo 3)
      if (this.selectedMaintenanceStrategies.length >= 3) {
        showToast(
          "🚫 Pode selecionar no máximo 3 estratégias de manutenção.",
          "warning"
        );
        return;
      }

      this.selectedMaintenanceStrategies.push(estrategiaId);
      card.classList.add("selected");
      this.gameState.puzzle4Score += estrategia.pontos;
      showToast(
        `✅ Estratégia selecionada: ${estrategia.nome} (+${estrategia.pontos} pts)`,
        "success",
        2000
      );
    }

    this.gameState.autonomyPlanning = {
      actions: this.selectedAutonomyActions,
      maintenanceStrategies: this.selectedMaintenanceStrategies,
    };

    this.updateProgress4();
    this.checkAutonomyCompletion();
  }

  checkAutonomyCompletion() {
    // Verificar se pode finalizar (pelo menos 2 ações por área e 3 estratégias de manutenção)
    const areasWithActions = Object.keys(this.selectedAutonomyActions).filter(
      (areaId) => this.selectedAutonomyActions[areaId].length >= 2
    );

    if (
      areasWithActions.length >= 3 &&
      this.selectedMaintenanceStrategies.length >= 3
    ) {
      const btnFinalize = document.getElementById("btn-finalize-escape-room");
      if (btnFinalize) {
        btnFinalize.style.display = "block";
        showToast(
          "🎉 Critérios mínimos atingidos! Pode finalizar o Escape Room!",
          "success",
          3000
        );
      }
    }
  }

  updateProgress4() {
    // Update score display
    const scoreElement = document.getElementById("puzzle4-score");
    if (scoreElement) {
      scoreElement.textContent = `${this.gameState.puzzle4Score}/20 pontos`;
    }

    // Update progress span
    const progressSpan = document.getElementById("puzzle4-progress");
    if (progressSpan) {
      progressSpan.textContent = this.gameState.puzzle4Progress;
    }

    // Update overall progress
    this.updateTotalScore();
  }

  checkPuzzle4Completion() {
    // Check if minimum requirements are met for completion
    const totalActionsSelected = Object.values(
      this.selectedAutonomyActions
    ).reduce((sum, actions) => sum + actions.length, 0);

    const areasWithMinimumActions = Object.keys(
      this.selectedAutonomyActions
    ).filter(
      (areaId) => this.selectedAutonomyActions[areaId].length >= 2
    ).length;

    if (
      areasWithMinimumActions >= 3 &&
      this.selectedMaintenanceStrategies.length >= 3 &&
      totalActionsSelected >= 8
    ) {
      this.completePuzzle4();
    }
  }

  completePuzzle4() {
    showToast(
      "🎉 Puzzle 4 COMPLETO! Plano de autonomia validado!",
      "success",
      4000
    );

    // Add completion bonus
    this.gameState.puzzle4Score += 10;
    this.gameState.puzzle4Progress = 4; // Mark as complete

    // Update progress display
    this.updateProgress4();

    console.log(`Puzzle 4 completed! Score: ${this.gameState.puzzle4Score}`);

    // Show finalize button - MUST USE CORRECT ID FOR FASE4-ESCAPE.HTML
    const btnFinalize = document.getElementById("btn-finalize-escape-room");
    if (btnFinalize) {
      btnFinalize.style.display = "block";
      btnFinalize.textContent = "🎉 Finalizar Escape Room SAASI - COMPLETO!";
      btnFinalize.style.background =
        "linear-gradient(135deg, #28a745, #20c997)";
      btnFinalize.style.animation = "pulse 2s infinite";
    }
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

    // Save phase data - ALIGNED WITH FASE4.HTML FORMAT
    const phase4Data = {
      phase: 4,
      score: totalScore,
      maxScore: 100,
      percentage: totalScore,
      duration: Math.round(totalTime),
      level: { title: this.getPerformanceLevel(totalScore) },
      certification: this.getCertification(totalScore),
      autonomyPlanning: this.gameState.autonomyPlanning,
      puzzleScores: {
        puzzle1: this.gameState.puzzle1Score,
        puzzle2: this.gameState.puzzle2Score,
        puzzle3: this.gameState.puzzle3Score,
        puzzle4: this.gameState.puzzle4Score,
      },
      completionTime: this.gameState.completionTime,
      startTime: this.gameState.startTime,
      completedAt: new Date().toISOString(),
    };

    // Save using same format as other phases
    localStorage.setItem("saasi_phase4_results", JSON.stringify(phase4Data));

    showToast(
      "🎊 FASE 4 CONCLUÍDA! Plano de autonomia implementado com sucesso!",
      "success",
      5000
    );

    setTimeout(() => {
      this.showCompletionScreen(totalScore, totalTime);
    }, 3000);
  }

  getPerformanceLevel(score) {
    if (score >= 95) return "Master SAASI";
    if (score >= 85) return "Técnico Especialista";
    if (score >= 70) return "Técnico Proficiente";
    if (score >= 50) return "Técnico Competente";
    return "Técnico Iniciante";
  }

  getCertification(score) {
    if (score >= 95) return "Master SAASI";
    if (score >= 85) return "Técnico Especialista SAASI";
    if (score >= 70) return "Técnico Proficiente SAASI";
    return "Técnico Competente SAASI";
  }

  updateTotalScore() {
    const totalScore =
      this.gameState.puzzle1Score +
      this.gameState.puzzle2Score +
      this.gameState.puzzle3Score +
      this.gameState.puzzle4Score;

    this.gameState.score = totalScore;

    // Update any total score displays
    const totalScoreElement = document.getElementById("total-score-phase4");
    if (totalScoreElement) {
      totalScoreElement.textContent = totalScore;
    }
  }

  showCompletionScreen(score, timeMinutes) {
    // NAVIGATE TO CONCLUSION STATE USING SAME PATTERN AS FASE4.HTML
    console.log("Navigating to conclusion with score:", score);

    // Use the same navigation function as the HTML if available
    if (typeof changeState === "function") {
      changeState("conclusao");
    } else {
      // Fallback: manually show conclusion state
      document.querySelectorAll(".state").forEach((state) => {
        state.classList.add("state-hidden");
      });

      const conclusionState = document.getElementById("state-conclusao");
      if (conclusionState) {
        conclusionState.classList.remove("state-hidden");
      }
    }

    // The conclusion screen will be handled by the main fase4.html logic
    console.log("Phase 4 completed successfully!");
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

    // Puzzle 4 specific data
    autonomyPlanning: {
      actions: {},
      maintenanceStrategies: [],
    },
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
