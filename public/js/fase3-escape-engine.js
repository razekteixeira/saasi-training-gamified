/**
 * SAASI Escape Room - Phase 3 Engine
 * Complete Advanced Implementation following ESCAPE_ROOM_COMPLETE_SPECIFICATION.md
 * Pattern: Following fase1-escape.html exactly
 *
 * 4 Advanced Puzzles:
 * 1. Enhanced Program Selection Matrix (adequacy scoring)
 * 2. Dynamic Entity Coordination Hub (network visualization)
 * 3. Advanced Timeline Orchestrator (conflict detection)
 * 4. Comprehensive Validation & Approval System (multi-stage)
 *
 * @version 1.0
 * @date January 2025
 */

class EscapeRoomPhase3 {
  constructor(gameState) {
    this.gameState = gameState;
    this.connectionLines = [];

    // Enhanced Programs Data with detailed adequacy analysis
    this.programsData = [
      {
        id: "programa_qualifica",
        name: "Medida + Emprego - Programa Qualifica",
        icon: "💼",
        category: "emprego_formacao",
        adequateForFelisbina: true,
        adequacyScore: 85,
        pointsIfSelected: 8,
        pointsIfRejected: -3,
        entity: "IEFP",
        duration: 6,
        requirements: [
          { text: "9º ano completo", met: true },
          { text: "Experiência profissional", met: true },
          { text: "Idade próxima do limite", met: false, warning: true },
        ],
        impactMetrics: {
          employability: 70,
          qualification: 90,
        },
        problemsCovered: ["baixa_qualificacao", "experiencia_limitada"],
        budgetCost: 2500,
      },
      {
        id: "apoio_psicossocial",
        name: "Medida + Inclusão - Apoio Psicossocial",
        icon: "🧠",
        category: "apoio_psicossocial",
        adequateForFelisbina: true,
        adequacyScore: 92,
        pointsIfSelected: 9,
        pointsIfRejected: -4,
        entity: "centro_saude",
        duration: 8,
        requirements: [
          { text: "Referenciação médica", met: true },
          { text: "Disponibilidade horária", met: true },
          { text: "Motivação para mudança", met: true },
        ],
        impactMetrics: {
          mentalHealth: 85,
          autonomy: 75,
        },
        problemsCovered: ["dependencia_emocional", "isolamento_social"],
        budgetCost: 1200,
      },
      {
        id: "grupos_apoio_social",
        name: "Grupos de Apoio Social - IPSS",
        icon: "👥",
        category: "apoio_social",
        adequateForFelisbina: true,
        adequacyScore: 78,
        pointsIfSelected: 6,
        pointsIfRejected: -2,
        entity: "ipss_local",
        duration: 6,
        requirements: [
          { text: "Compromisso participação", met: true },
          { text: "Disponibilidade semanal", met: true },
        ],
        impactMetrics: {
          socialIntegration: 80,
          selfEsteem: 65,
        },
        problemsCovered: ["isolamento_social"],
        budgetCost: 400,
      },
      {
        id: "formacao_digital",
        name: "Formação Modular - Competências Digitais",
        icon: "📚",
        category: "formacao_especializada",
        adequateForFelisbina: false,
        adequacyScore: 35,
        pointsIfSelected: -4,
        pointsIfRejected: 3,
        entity: "centro_formacao",
        duration: 3,
        requirements: [
          { text: "Competências digitais básicas", met: false },
          { text: "Motivação para tecnologia", met: false },
        ],
        impactMetrics: {
          digitalSkills: 60,
          employability: 45,
        },
        problemsCovered: [],
        budgetCost: 800,
      },
      {
        id: "trabalho_necessario",
        name: "Trabalho Socialmente Necessário",
        icon: "🛡️",
        category: "emprego_protegido",
        adequateForFelisbina: false,
        adequacyScore: 25,
        pointsIfSelected: -6,
        pointsIfRejected: 5,
        entity: "camara_municipal",
        duration: 12,
        requirements: [
          { text: "Incapacidade emprego regular", met: false },
          { text: "Vulnerabilidade extrema", met: false },
        ],
        impactMetrics: {
          income: 55,
          dignity: 40,
        },
        problemsCovered: [],
        budgetCost: 5000,
      },
      {
        id: "estagios_iniciar",
        name: "Estágios INICIAR - Inclusão Social",
        icon: "🌱",
        category: "estagio_inclusao",
        adequateForFelisbina: false,
        adequacyScore: 45,
        pointsIfSelected: -3,
        pointsIfRejected: 2,
        entity: "ipss_local",
        duration: 4,
        requirements: [
          { text: "Conflito temporal com Qualifica", met: false },
          { text: "Prioridade mais baixa", met: false },
        ],
        impactMetrics: {
          workExperience: 50,
          socialIntegration: 60,
        },
        problemsCovered: ["experiencia_limitada"],
        budgetCost: 1500,
      },
    ];

    // Enhanced Entities Data with coordination capabilities
    this.entitiesData = [
      {
        id: "iefp_porto",
        name: "IEFP Porto",
        icon: "🏢",
        specialties: ["Qualifica", "Formação", "Emprego"],
        position: { angle: 0, distance: 180 }, // Top
        responseTime: "3-5 dias úteis",
        adequate: true,
        points: 9,
        services: ["programa_qualifica", "formacao_profissional"],
        availability: "online",
        currentCapacity: 75,
      },
      {
        id: "centro_saude_ramalde",
        name: "Centro de Saúde Ramalde",
        icon: "🏥",
        specialties: ["Psicologia", "Psiquiatria"],
        position: { angle: 60, distance: 180 }, // Top-right
        responseTime: "2-3 semanas",
        adequate: true,
        points: 8,
        services: ["apoio_psicossocial", "consultas_psicologia"],
        availability: "online",
        currentCapacity: 60,
      },
      {
        id: "ipss_solidariedade",
        name: "IPSS Solidariedade",
        icon: "🤝",
        specialties: ["Grupos Apoio", "Atividades Sociais"],
        position: { angle: 120, distance: 180 }, // Bottom-right
        responseTime: "1-2 semanas",
        adequate: true,
        points: 7,
        services: ["grupos_apoio_social", "atividades_sociais"],
        availability: "online",
        currentCapacity: 90,
      },
      {
        id: "centro_formacao_digital",
        name: "Centro de Formação Digital",
        icon: "💻",
        specialties: ["Competências Digitais"],
        position: { angle: 180, distance: 180 }, // Bottom
        responseTime: "1 semana",
        adequate: false,
        points: 2,
        services: ["formacao_digital"],
        availability: "online",
        currentCapacity: 100,
      },
      {
        id: "camara_municipal",
        name: "Câmara Municipal",
        icon: "🏛️",
        specialties: ["Trabalho Social"],
        position: { angle: 240, distance: 180 }, // Bottom-left
        responseTime: "1-2 semanas",
        adequate: false,
        points: 1,
        services: ["trabalho_necessario"],
        availability: "offline",
        currentCapacity: 50,
      },
      {
        id: "banco_alimentar",
        name: "Banco Alimentar",
        icon: "🍽️",
        specialties: ["Apoio Alimentar"],
        position: { angle: 300, distance: 180 }, // Top-left
        responseTime: "1 semana",
        adequate: false,
        points: 3,
        services: ["apoio_alimentar"],
        availability: "online",
        currentCapacity: 80,
      },
    ];

    // Advanced Activities Data for timeline orchestration
    this.activitiesData = [
      {
        id: "consulta_psicologia_inicial",
        name: "Primeira consulta psicologia",
        icon: "🩺",
        category: "psicossocial",
        entity: "centro_saude",
        duration: 1, // hours
        frequency: "Única",
        priority: "high",
        correctMonth: 1,
        correctWeek: 1,
        prerequisites: [],
        points: 4,
      },
      {
        id: "avaliacao_iefp",
        name: "Avaliação inicial IEFP",
        icon: "📋",
        category: "psicossocial",
        entity: "iefp",
        duration: 2,
        frequency: "Única",
        priority: "high",
        correctMonth: 1,
        correctWeek: 2,
        prerequisites: [],
        points: 4,
      },
      {
        id: "inicio_qualifica",
        name: "Início Programa Qualifica",
        icon: "💼",
        category: "emprego_formacao",
        entity: "iefp",
        duration: 20, // weekly
        frequency: "Contínua",
        priority: "high",
        correctMonth: 2,
        correctWeek: 1,
        prerequisites: ["avaliacao_iefp"],
        points: 5,
      },
      {
        id: "grupos_apoio_inicio",
        name: "Integração grupos apoio",
        icon: "👥",
        category: "apoio_social",
        entity: "ipss",
        duration: 2,
        frequency: "Semanal",
        priority: "medium",
        correctMonth: 2,
        correctWeek: 3,
        prerequisites: [],
        points: 4,
      },
      {
        id: "consultas_regulares",
        name: "Consultas psicologia regulares",
        icon: "🧠",
        category: "psicossocial",
        entity: "centro_saude",
        duration: 1,
        frequency: "Quinzenal",
        priority: "high",
        correctMonth: 2,
        correctWeek: 4,
        prerequisites: ["consulta_psicologia_inicial"],
        points: 4,
      },
      {
        id: "rvcc_desenvolvimento",
        name: "Desenvolvimento RVCC 12º",
        icon: "📚",
        category: "emprego_formacao",
        entity: "iefp",
        duration: 4,
        frequency: "Semanal",
        priority: "medium",
        correctMonth: 3,
        correctWeek: 1,
        prerequisites: ["inicio_qualifica"],
        points: 4,
      },
      {
        id: "acompanhamento_grupo_apoio",
        name: "Acompanhamento grupos apoio",
        icon: "🤝",
        category: "apoio_social",
        entity: "ipss",
        duration: 2,
        frequency: "Semanal",
        priority: "medium",
        correctMonth: 3,
        correctWeek: 2,
        prerequisites: ["grupos_apoio_inicio"],
        points: 3,
      },
      {
        id: "formacao_competencias",
        name: "Formação competências profissionais",
        icon: "🛠️",
        category: "emprego_formacao",
        entity: "iefp",
        duration: 4,
        frequency: "Semanal",
        priority: "medium",
        correctMonth: 4,
        correctWeek: 1,
        prerequisites: ["rvcc_desenvolvimento"],
        points: 4,
      },
      {
        id: "avaliacao_intermedia",
        name: "Avaliação intermédia progresso",
        icon: "📊",
        category: "psicossocial",
        entity: "centro_saude",
        duration: 1,
        frequency: "Única",
        priority: "medium",
        correctMonth: 4,
        correctWeek: 3,
        prerequisites: ["consultas_regulares"],
        points: 3,
      },
      {
        id: "estagio_profissional",
        name: "Estágio profissional",
        icon: "👔",
        category: "emprego_formacao",
        entity: "iefp",
        duration: 35, // weekly
        frequency: "Contínua",
        priority: "high",
        correctMonth: 5,
        correctWeek: 1,
        prerequisites: ["formacao_competencias"],
        points: 5,
      },
      {
        id: "preparacao_autonomia",
        name: "Preparação para autonomia",
        icon: "🌟",
        category: "apoio_social",
        entity: "ipss",
        duration: 2,
        frequency: "Quinzenal",
        priority: "medium",
        correctMonth: 6,
        correctWeek: 1,
        prerequisites: ["acompanhamento_grupo_apoio"],
        points: 3,
      },
      {
        id: "avaliacao_final",
        name: "Avaliação final processo",
        icon: "🎯",
        category: "psicossocial",
        entity: "centro_saude",
        duration: 1,
        frequency: "Única",
        priority: "low",
        correctMonth: 7,
        correctWeek: 1,
        prerequisites: ["avaliacao_intermedia", "preparacao_autonomia"],
        points: 2,
      },
    ];

    this.months = [
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
    ];
    this.entities = ["Centro de Saúde", "IEFP", "IPSS"];
  }

  // ===== PUZZLE 1: ENHANCED PROGRAM SELECTION MATRIX =====
  initializePuzzle1() {
    console.log("Initializing Puzzle 1: Enhanced Program Selection");
    this.createProgramsCards();

    showToast(
      "🎯 Analise cada programa e selecione os mais adequados para a Felisbina!",
      "info",
      4000
    );
  }

  createProgramsCards() {
    const container = document.getElementById("programs-container");
    container.innerHTML = "";

    this.programsData.forEach((program) => {
      const card = document.createElement("div");
      card.className = "program-card";
      card.dataset.programId = program.id;

      const adequacyColor =
        program.adequacyScore >= 70
          ? "#4caf50"
          : program.adequacyScore >= 50
          ? "#ff9800"
          : "#f44336";

      card.innerHTML = `
                <div class="program-header">
                    <div style="display: flex; align-items: center;">
                        <div class="program-icon">${program.icon}</div>
                        <h4 class="program-title">${program.name}</h4>
                    </div>
                    <div class="adequacy-meter">
                        <div class="meter-fill" style="--adequacy-width: ${
                          program.adequacyScore
                        }%"></div>
                        <span class="meter-label">${
                          program.adequacyScore
                        }% adequado</span>
                    </div>
                </div>

                <div class="compatibility-analysis">
                    ${program.requirements
                      .map(
                        (req) => `
                        <div class="requirement ${
                          req.met ? "met" : req.warning ? "warning" : "not-met"
                        }">
                            <span class="req-icon">${
                              req.met ? "✅" : req.warning ? "⚠️" : "❌"
                            }</span>
                            <span class="req-text">${req.text}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="program-impact-preview">
                    <h5>Impacto Esperado:</h5>
                    <div class="impact-metrics">
                        ${Object.entries(program.impactMetrics)
                          .map(
                            ([key, value]) => `
                            <div class="metric">
                                <span class="metric-label">${this.translateMetric(
                                  key
                                )}</span>
                                <div class="metric-bar">
                                    <div class="bar-fill" style="width: ${value}%">+${value}%</div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>

                <div class="selection-controls">
                    <button class="btn-select-program" onclick="selectProgram('${
                      program.id
                    }', true)">
                        ✅ Selecionar
                    </button>
                    <button class="btn-reject-program" onclick="selectProgram('${
                      program.id
                    }', false)">
                        ❌ Rejeitar
                    </button>
                </div>
            `;

      container.appendChild(card);
    });
  }

  translateMetric(key) {
    const translations = {
      employability: "Empregabilidade",
      qualification: "Qualificação",
      mentalHealth: "Saúde Mental",
      autonomy: "Autonomia",
      socialIntegration: "Integração Social",
      selfEsteem: "Autoestima",
      digitalSkills: "Competências Digitais",
      income: "Rendimento",
      dignity: "Dignidade",
      workExperience: "Experiência",
    };
    return translations[key] || key;
  }

  selectProgram(programId, selected) {
    const program = this.programsData.find((p) => p.id === programId);
    const card = document.querySelector(`[data-program-id="${programId}"]`);

    // Remove from both arrays first
    this.gameState.puzzle1.selectedPrograms =
      this.gameState.puzzle1.selectedPrograms.filter((id) => id !== programId);
    this.gameState.puzzle1.rejectedPrograms =
      this.gameState.puzzle1.rejectedPrograms.filter((id) => id !== programId);

    // Clear visual state
    card.classList.remove("selected", "rejected");

    if (selected) {
      // Select the program
      this.gameState.puzzle1.selectedPrograms.push(programId);
      card.classList.add("selected");

      if (program.adequateForFelisbina) {
        this.gameState.puzzle1.score += program.pointsIfSelected;
        showToast(
          `✅ ${program.name} SELECIONADO (+${program.pointsIfSelected} pontos)`,
          "success",
          2500
        );
      } else {
        this.gameState.puzzle1.score += program.pointsIfSelected; // Usually negative
        showToast(
          `⚠️ ${program.name} selecionado (adequação baixa: ${program.adequacyScore}%)`,
          "warning",
          3000
        );
      }
    } else {
      // Reject the program
      this.gameState.puzzle1.rejectedPrograms.push(programId);
      card.classList.add("rejected");

      if (!program.adequateForFelisbina) {
        this.gameState.puzzle1.score += program.pointsIfRejected;
        showToast(
          `✅ ${program.name} REJEITADO corretamente (+${program.pointsIfRejected} pontos)`,
          "success",
          2500
        );
      } else {
        this.gameState.puzzle1.score += program.pointsIfRejected; // Usually negative
        showToast(
          `❌ ${program.name} rejeitado (era adequado!)`,
          "error",
          3000
        );
      }
    }

    this.updateSelectionSummary();
    this.checkPuzzle1Completion();
    updateScore();
  }

  updateSelectionSummary() {
    // Update selected programs list
    const selectedList = document.getElementById("selected-programs-list");
    selectedList.innerHTML = "";

    this.gameState.puzzle1.selectedPrograms.forEach((programId) => {
      const program = this.programsData.find((p) => p.id === programId);
      const badge = document.createElement("div");
      badge.className = "selected-program-badge";
      badge.textContent = `${program.icon} ${program.name}`;
      selectedList.appendChild(badge);
    });

    // Calculate and update metrics
    const selectedPrograms = this.gameState.puzzle1.selectedPrograms.map((id) =>
      this.programsData.find((p) => p.id === id)
    );

    // Average adequacy
    const avgAdequacy =
      selectedPrograms.length > 0
        ? selectedPrograms.reduce((sum, p) => sum + p.adequacyScore, 0) /
          selectedPrograms.length
        : 0;
    this.gameState.puzzle1.avgAdequacy = avgAdequacy;
    document.getElementById("avg-adequacy").textContent =
      Math.round(avgAdequacy) + "%";

    // Problem coverage
    const coveredProblems = new Set();
    selectedPrograms.forEach((program) => {
      program.problemsCovered.forEach((problem) =>
        coveredProblems.add(problem)
      );
    });
    const problemCoverage = (coveredProblems.size / 4) * 100; // 4 main problems
    this.gameState.puzzle1.problemCoverage = problemCoverage;
    document.getElementById("problem-coverage").textContent =
      Math.round(problemCoverage) + "%";

    // Budget viability
    const totalCost = selectedPrograms.reduce(
      (sum, p) => sum + p.budgetCost,
      0
    );
    const budgetViability = Math.max(0, 100 - totalCost / 100); // Simplified calculation
    this.gameState.puzzle1.budgetViability = budgetViability;
    document.getElementById("budget-viability").textContent =
      Math.round(budgetViability) + "%";

    // Update progress
    this.gameState.puzzle1.progress =
      this.gameState.puzzle1.selectedPrograms.length;
    document.getElementById("puzzle1-progress").textContent =
      this.gameState.puzzle1.progress;
  }

  checkPuzzle1Completion() {
    // Completion criteria: at least 3 programs selected with average adequacy >85%
    if (
      this.gameState.puzzle1.selectedPrograms.length >= 3 &&
      this.gameState.puzzle1.avgAdequacy >= 85
    ) {
      this.completePuzzle1();
    }
  }

  completePuzzle1() {
    this.gameState.puzzle1.completed = true;
    document.getElementById("btn-continue-puzzle2").style.display = "block";

    const bonus = Math.floor((this.gameState.puzzle1.avgAdequacy - 85) / 5) * 2; // Bonus for high adequacy
    this.gameState.puzzle1.score += bonus;

    showToast(
      `🎉 Puzzle 1 Concluído! Adequação: ${Math.round(
        this.gameState.puzzle1.avgAdequacy
      )}% (+${bonus} bónus)`,
      "success",
      4000
    );
    updateScore();
  }

  // ===== PUZZLE 2: DYNAMIC ENTITY COORDINATION HUB =====
  initializePuzzle2() {
    console.log("Initializing Puzzle 2: Dynamic Entity Coordination");
    this.createEntityNodes();
    this.updateCoordinationMetrics();

    showToast(
      "🤝 Conecte entidades para estabelecer coordenação eficaz!",
      "info",
      4000
    );
  }

  createEntityNodes() {
    const container = document.getElementById("entity-nodes-container");
    container.innerHTML = "";

    this.entitiesData.forEach((entity) => {
      const node = document.createElement("div");
      node.className = "entity-node";
      node.dataset.entityId = entity.id;

      // Position nodes in a circle around Felisbina
      const centerX = 50; // Percentage
      const centerY = 50;
      const radius = 35; // Percentage
      const angle = (entity.position.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      node.style.left = x + "%";
      node.style.top = y + "%";
      node.onclick = () => this.contactEntity(entity.id);

      node.innerHTML = `
                <div class="entity-avatar">${entity.icon}</div>
                <div class="entity-info">
                    <h4>${entity.name}</h4>
                    <div class="services-list">
                        ${entity.specialties
                          .map((s) => `<span class="service">${s}</span>`)
                          .join("")}
                    </div>
                    <div class="entity-status ${entity.availability}">${
        entity.availability === "online" ? "Disponível" : "Indisponível"
      }</div>
                    <div style="font-size: 0.7rem; margin-top: 5px;">
                        Capacidade: ${entity.currentCapacity}%
                    </div>
                </div>
                <button class="btn-contact-entity">📞 Contactar</button>
            `;

      container.appendChild(node);
    });
  }

  contactEntity(entityId) {
    const entity = this.entitiesData.find((e) => e.id === entityId);
    const node = document.querySelector(`[data-entity-id="${entityId}"]`);
    const button = node.querySelector(".btn-contact-entity");

    if (this.gameState.puzzle2.connectedEntities.includes(entityId)) {
      // Already connected, disconnect
      this.gameState.puzzle2.connectedEntities =
        this.gameState.puzzle2.connectedEntities.filter(
          (id) => id !== entityId
        );
      node.classList.remove("contacted");
      button.textContent = "📞 Contactar";
      button.disabled = false;
      this.gameState.puzzle2.progress--;

      if (entity.adequate) {
        this.gameState.puzzle2.score -= entity.points;
      }

      // Remove connection line
      this.removeConnectionLine(entityId);

      showToast(`➖ ${entity.name} desconectado`, "info", 2000);
    } else {
      // Connect entity
      this.gameState.puzzle2.connectedEntities.push(entityId);
      node.classList.add("contacted");
      button.textContent = "✅ Conectado";
      button.disabled = true;
      this.gameState.puzzle2.progress++;

      if (entity.adequate) {
        this.gameState.puzzle2.score += entity.points;
        showToast(
          `✅ ${entity.name} conectado! (+${entity.points} pontos)`,
          "success",
          2500
        );
      } else {
        this.gameState.puzzle2.score += entity.points; // Usually lower points
        showToast(
          `⚠️ ${entity.name} conectado (não prioritário)`,
          "warning",
          3000
        );
      }

      // Create connection line
      this.createConnectionLine(entityId);
    }

    this.updateCoordinationMetrics();
    this.updateCoordinationTimeline();

    // Update progress
    document.getElementById("puzzle2-progress").textContent =
      this.gameState.puzzle2.progress;

    // Check completion
    if (this.gameState.puzzle2.progress >= 5) {
      this.completePuzzle2();
    }

    updateScore();
  }

  createConnectionLine(entityId) {
    const entity = this.entitiesData.find((e) => e.id === entityId);
    const felisbinaNode = document.querySelector(".felisbina-node");
    const entityNode = document.querySelector(`[data-entity-id="${entityId}"]`);
    const container = document.getElementById("connection-lines-container");

    if (!container) {
      // Create container if it doesn't exist
      const newContainer = document.createElement("div");
      newContainer.id = "connection-lines-container";
      document
        .querySelector(".entity-network-visualization")
        .appendChild(newContainer);
    }

    // Create SVG line (simplified implementation)
    const line = document.createElement("div");
    line.className = "connection-line active";
    line.dataset.connection = entityId;
    line.id = `connection-${entityId}`;

    // Calculate line position and rotation (simplified)
    const angle = (entity.position.angle * Math.PI) / 180;
    const distance = 120; // pixels

    line.style.position = "absolute";
    line.style.left = "50%";
    line.style.top = "50%";
    line.style.width = distance + "px";
    line.style.height = "3px";
    line.style.transformOrigin = "left center";
    line.style.transform = `rotate(${entity.position.angle}deg)`;
    line.style.zIndex = "1";

    document.getElementById("connection-lines-container").appendChild(line);
  }

  removeConnectionLine(entityId) {
    const line = document.getElementById(`connection-${entityId}`);
    if (line) {
      line.remove();
    }
  }

  updateCoordinationMetrics() {
    // Update active entities
    document.getElementById(
      "active-entities"
    ).textContent = `${this.gameState.puzzle2.connectedEntities.length}/6`;

    // Calculate coordination score
    const adequateConnected = this.gameState.puzzle2.connectedEntities.filter(
      (id) => this.entitiesData.find((e) => e.id === id).adequate
    ).length;
    const coordinationScore = Math.round((adequateConnected / 3) * 100); // 3 adequate entities = 100%
    this.gameState.puzzle2.coordinationScore = coordinationScore;
    document.getElementById("coordination-score").textContent =
      coordinationScore + "%";

    // Calculate average response time
    const connectedEntities = this.gameState.puzzle2.connectedEntities.map(
      (id) => this.entitiesData.find((e) => e.id === id)
    );
    const avgResponseTime =
      connectedEntities.length > 0
        ? connectedEntities.reduce(
            (sum, e) => sum + parseInt(e.responseTime),
            0
          ) / connectedEntities.length
        : 0;
    document.getElementById("avg-response-time").textContent =
      Math.round(avgResponseTime) + " dias";
  }

  updateCoordinationTimeline() {
    const timeline = document.getElementById("coordination-timeline-viz");
    timeline.innerHTML = "";

    this.gameState.puzzle2.connectedEntities.forEach((entityId, index) => {
      const entity = this.entitiesData.find((e) => e.id === entityId);

      const track = document.createElement("div");
      track.className = "timeline-track";
      track.innerHTML = `
                <div class="track-header">
                    <span class="entity-name">${entity.name}</span>
                    <span class="track-status">Resposta em ${entity.responseTime}</span>
                </div>
                <div class="timeline-events">
                    <div class="timeline-event">Contacto inicial</div>
                    <div class="timeline-event">Agendamento</div>
                    <div class="timeline-event">Início serviços</div>
                </div>
            `;

      timeline.appendChild(track);
    });
  }

  completePuzzle2() {
    this.gameState.puzzle2.completed = true;
    document.getElementById("btn-continue-puzzle3").style.display = "block";

    // Bonus for efficient coordination
    const efficiencyBonus = Math.floor(
      this.gameState.puzzle2.coordinationScore / 20
    );
    this.gameState.puzzle2.score += efficiencyBonus;

    showToast(
      `🎉 Puzzle 2 Concluído! Coordenação: ${this.gameState.puzzle2.coordinationScore}% (+${efficiencyBonus} bónus)`,
      "success",
      4000
    );
    updateScore();
  }

  // ===== PUZZLE 3: ADVANCED TIMELINE ORCHESTRATOR =====
  initializePuzzle3() {
    console.log("Initializing Puzzle 3: Advanced Timeline Orchestrator");
    this.createActivityCategories();
    this.createTimelineGrid();
    this.setupAdvancedDragAndDrop();

    showToast(
      "📅 Organize atividades na timeline. Use as ferramentas para otimizar!",
      "info",
      4000
    );
  }

  createActivityCategories() {
    const container = document.getElementById("activity-categories");
    container.innerHTML = "";

    const categories = {
      psicossocial: { name: "🧠 Apoio Psicossocial", color: "#e91e63" },
      emprego_formacao: { name: "💼 Emprego e Formação", color: "#2196f3" },
      apoio_social: { name: "👥 Apoio Social", color: "#ff9800" },
    };

    Object.entries(categories).forEach(([categoryId, category]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";

      const activitiesInCategory = this.activitiesData.filter(
        (a) => a.category === categoryId
      );

      categoryDiv.innerHTML = `
                <h5 style="background: ${category.color}">${category.name}</h5>
                <div class="activities-list">
                    ${activitiesInCategory
                      .map(
                        (activity) => `
                        <div class="activity-item" draggable="true" data-activity-id="${
                          activity.id
                        }">
                            <div style="display: flex; align-items: center;">
                                <span class="activity-icon">${
                                  activity.icon
                                }</span>
                                <div class="activity-info">
                                    <h6>${activity.name}</h6>
                                    <div class="activity-metadata">
                                        <span class="duration">${
                                          activity.duration
                                        }h</span>
                                        <span class="frequency">${
                                          activity.frequency
                                        }</span>
                                        <span class="priority ${
                                          activity.priority
                                        }">${activity.priority.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;

      container.appendChild(categoryDiv);
    });
  }

  createTimelineGrid() {
    // Create month labels
    const monthLabels = document.getElementById("month-labels");
    monthLabels.innerHTML = "";

    for (let month = 1; month <= 7; month++) {
      const label = document.createElement("div");
      label.className = "month-label";
      label.innerHTML = `
                <span class="month-name">${this.months[month - 1]}</span>
                <div class="month-capacity">
                    <span class="used">0</span>/<span class="max">20</span>h
                </div>
            `;
      monthLabels.appendChild(label);
    }

    // Create timeline grid
    const grid = document.getElementById("timeline-grid-advanced");
    grid.innerHTML = "";

    this.entities.forEach((entityName) => {
      const row = document.createElement("div");
      row.className = "timeline-row";
      row.dataset.entity = entityName.toLowerCase().replace(/\s+/g, "_");

      row.innerHTML = `
                <div class="row-header">
                    <div class="entity-info">
                        <div class="entity-name">${entityName}</div>
                        <div class="availability-indicator">
                            <span class="available-slots">20</span> slots livres
                        </div>
                    </div>
                </div>
                <div class="timeline-slots">
                    ${Array(7)
                      .fill(0)
                      .map(
                        (_, month) => `
                        <div class="time-slot" data-month="${
                          month + 1
                        }" data-entity="${entityName
                          .toLowerCase()
                          .replace(/\s+/g, "_")}"></div>
                    `
                      )
                      .join("")}
                </div>
            `;

      grid.appendChild(row);
    });
  }

  setupAdvancedDragAndDrop() {
    // Setup drag events for activities
    document.querySelectorAll(".activity-item").forEach((item) => {
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", item.dataset.activityId);
        item.classList.add("dragging");
      });

      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
      });
    });

    // Setup drop zones
    document.querySelectorAll(".time-slot").forEach((slot) => {
      slot.addEventListener("dragover", (e) => {
        e.preventDefault();
        slot.classList.add("drop-target");
      });

      slot.addEventListener("dragleave", () => {
        slot.classList.remove("drop-target");
      });

      slot.addEventListener("drop", (e) => {
        e.preventDefault();
        slot.classList.remove("drop-target");

        const activityId = e.dataTransfer.getData("text/plain");
        const month = parseInt(slot.dataset.month);
        const entity = slot.dataset.entity;

        this.placeActivityAdvanced(activityId, month, entity, slot);
      });
    });
  }

  placeActivityAdvanced(activityId, month, entity, slot) {
    const activity = this.activitiesData.find((a) => a.id === activityId);
    const activityItem = document.querySelector(
      `[data-activity-id="${activityId}"]`
    );

    // Check prerequisites
    if (!this.checkPrerequisitesAdvanced(activity, month)) {
      showToast(
        `❌ Pré-requisitos não cumpridos para ${activity.name}`,
        "error",
        3000
      );
      return;
    }

    // Check entity compatibility
    const activityEntity = this.getActivityEntity(activity.entity);
    const slotEntity = entity.replace(/_/g, " ");
    if (activityEntity.toLowerCase() !== slotEntity.toLowerCase()) {
      showToast(
        `⚠️ ${activity.name} deve ser executado por ${activityEntity}`,
        "warning",
        3000
      );
      return;
    }

    // Check slot availability
    if (slot.children.length > 0) {
      showToast("⚠️ Slot já ocupado!", "warning", 2000);
      return;
    }

    // Place activity
    const placedActivity = document.createElement("div");
    placedActivity.className = "placed-activity";
    placedActivity.innerHTML = `${activity.icon} ${activity.name}`;
    placedActivity.onclick = () => this.removeActivity(activityId, slot);

    slot.appendChild(placedActivity);
    slot.classList.add("occupied");

    // Mark original as placed
    activityItem.classList.add("placed");
    activityItem.draggable = false;

    // Record placement
    this.gameState.puzzle3.placedActivities[activityId] = { month, entity };
    this.gameState.puzzle3.progress++;

    // Evaluate placement
    this.evaluateActivityPlacement(activityId, month);

    // Update progress and metrics
    document.getElementById("puzzle3-progress").textContent =
      this.gameState.puzzle3.progress;
    this.updateResourceUtilization();
    this.updateLogicalSequencing();

    updateScore();
  }

  checkPrerequisitesAdvanced(activity, month) {
    if (activity.prerequisites.length === 0) return true;

    return activity.prerequisites.every((prereqId) => {
      const placement = this.gameState.puzzle3.placedActivities[prereqId];
      return placement && placement.month < month;
    });
  }

  getActivityEntity(entityCode) {
    const entityMap = {
      centro_saude: "Centro de Saúde",
      iefp: "IEFP",
      ipss: "IPSS",
    };
    return entityMap[entityCode] || entityCode;
  }

  removeActivity(activityId, slot) {
    const placedActivity = slot.querySelector(".placed-activity");
    const originalItem = document.querySelector(
      `[data-activity-id="${activityId}"]`
    );

    slot.removeChild(placedActivity);
    slot.classList.remove("occupied");

    originalItem.classList.remove("placed");
    originalItem.draggable = true;

    delete this.gameState.puzzle3.placedActivities[activityId];
    this.gameState.puzzle3.progress--;

    document.getElementById("puzzle3-progress").textContent =
      this.gameState.puzzle3.progress;
    this.updateResourceUtilization();
    this.updateLogicalSequencing();
  }

  evaluateActivityPlacement(activityId, month) {
    const activity = this.activitiesData.find((a) => a.id === activityId);

    if (month === activity.correctMonth) {
      this.gameState.puzzle3.score += activity.points;
      showToast(
        `✅ ${activity.name} - Mês IDEAL! (+${activity.points} pontos)`,
        "success",
        2500
      );
    } else if (Math.abs(month - activity.correctMonth) === 1) {
      const partialPoints = Math.floor(activity.points * 0.7);
      this.gameState.puzzle3.score += partialPoints;
      showToast(
        `🟡 ${activity.name} - Mês aceitável (+${partialPoints} pontos)`,
        "warning",
        2500
      );
    } else {
      showToast(
        `❌ ${activity.name} - Mês subótimo (ideal: ${activity.correctMonth})`,
        "error",
        3000
      );
    }
  }

  updateResourceUtilization() {
    const totalSlots = 7 * 3; // 7 months, 3 entities
    const usedSlots = Object.keys(
      this.gameState.puzzle3.placedActivities
    ).length;
    const utilization = (usedSlots / totalSlots) * 100;

    this.gameState.puzzle3.resourceUtilization = utilization;
    document.getElementById("resource-utilization").style.width =
      utilization + "%";
    document.querySelector("#metrics-panel .metric .value").textContent =
      Math.round(utilization) + "%";
  }

  updateLogicalSequencing() {
    let correctSequences = 0;
    let totalDependencies = 0;

    Object.entries(this.gameState.puzzle3.placedActivities).forEach(
      ([activityId, placement]) => {
        const activity = this.activitiesData.find((a) => a.id === activityId);

        activity.prerequisites.forEach((prereqId) => {
          totalDependencies++;
          const prereqPlacement =
            this.gameState.puzzle3.placedActivities[prereqId];
          if (prereqPlacement && prereqPlacement.month < placement.month) {
            correctSequences++;
          }
        });
      }
    );

    const sequencingScore =
      totalDependencies > 0
        ? (correctSequences / totalDependencies) * 100
        : 100;
    this.gameState.puzzle3.logicalSequencing = sequencingScore;

    const sequencingBar = document.querySelectorAll(
      "#metrics-panel .metric .progress-fill"
    )[1];
    const sequencingValue = document.querySelectorAll(
      "#metrics-panel .metric .value"
    )[1];
    if (sequencingBar) sequencingBar.style.width = sequencingScore + "%";
    if (sequencingValue)
      sequencingValue.textContent = Math.round(sequencingScore) + "%";

    // Check completion
    if (
      this.gameState.puzzle3.progress >= 8 &&
      this.gameState.puzzle3.resourceUtilization >= 80
    ) {
      this.completePuzzle3();
    }
  }

  // Puzzle 3 Tool Functions
  autoSequence() {
    showToast(
      "🤖 Aplicando sequenciamento automático baseado em dependências...",
      "info",
      3000
    );

    // Simple auto-placement based on prerequisites
    this.activitiesData.forEach((activity) => {
      if (!this.gameState.puzzle3.placedActivities[activity.id]) {
        const targetMonth = activity.correctMonth;
        const targetEntity = this.getActivityEntity(activity.entity)
          .toLowerCase()
          .replace(/\s+/g, "_");
        const slot = document.querySelector(
          `[data-month="${targetMonth}"][data-entity="${targetEntity}"]`
        );

        if (slot && slot.children.length === 0) {
          this.placeActivityAdvanced(
            activity.id,
            targetMonth,
            targetEntity,
            slot
          );
        }
      }
    });
  }

  detectConflicts() {
    const conflicts = [];

    // Check for capacity conflicts
    const monthlyCapacity = {};
    Object.entries(this.gameState.puzzle3.placedActivities).forEach(
      ([activityId, placement]) => {
        const activity = this.activitiesData.find((a) => a.id === activityId);
        const key = `${placement.month}-${placement.entity}`;
        monthlyCapacity[key] = (monthlyCapacity[key] || 0) + activity.duration;

        if (monthlyCapacity[key] > 20) {
          // 20h monthly capacity
          conflicts.push(
            `Mês ${placement.month} - ${placement.entity}: Sobrecarga (${monthlyCapacity[key]}h)`
          );
        }
      }
    );

    // Update conflicts display
    const conflictsList = document.getElementById("conflicts-list");
    if (conflicts.length > 0) {
      conflictsList.innerHTML = conflicts
        .map((conflict) => `<div class="conflict-item">${conflict}</div>`)
        .join("");
    } else {
      conflictsList.innerHTML =
        '<p style="text-align: center; color: #4caf50;">✅ Nenhum conflito detetado</p>';
    }

    showToast(
      `⚠️ Deteção completa: ${conflicts.length} conflitos encontrados`,
      conflicts.length > 0 ? "warning" : "success",
      3000
    );
  }

  optimizeIntelligent() {
    showToast(
      "⚡ Aplicando otimização inteligente da timeline...",
      "info",
      3000
    );

    // Generate optimization suggestions
    const suggestions = [
      "Agrupar atividades do mesmo tipo no mesmo período",
      "Balancear carga entre entidades",
      "Otimizar sequência para reduzir tempo de espera",
      "Priorizar atividades críticas nos primeiros meses",
    ];

    const suggestionsList = document.getElementById("optimization-suggestions");
    suggestionsList.innerHTML = suggestions
      .map((suggestion) => `<div class="suggestion-item">${suggestion}</div>`)
      .join("");

    // Apply some optimizations automatically
    this.updateResourceUtilization();
    this.updateLogicalSequencing();
  }

  completePuzzle3() {
    this.gameState.puzzle3.completed = true;
    document.getElementById("btn-continue-puzzle4").style.display = "block";

    // Bonus for high efficiency
    const efficiencyBonus = Math.floor(
      (this.gameState.puzzle3.resourceUtilization +
        this.gameState.puzzle3.logicalSequencing) /
        40
    );
    this.gameState.puzzle3.score += efficiencyBonus;

    showToast(
      `🎉 Puzzle 3 Concluído! Eficiência: ${Math.round(
        (this.gameState.puzzle3.resourceUtilization +
          this.gameState.puzzle3.logicalSequencing) /
          2
      )}% (+${efficiencyBonus} bónus)`,
      "success",
      4000
    );
    updateScore();
  }

  // ===== PUZZLE 4: COMPREHENSIVE VALIDATION & APPROVAL =====
  initializePuzzle4() {
    console.log("Initializing Puzzle 4: Comprehensive Validation");
    this.createApprovalCards();
    this.updateValidationProgress();

    showToast(
      "✅ Complete todas as validações para finalizar o plano!",
      "info",
      4000
    );
  }

  createApprovalCards() {
    const grid = document.getElementById("approvals-grid");
    grid.innerHTML = "";

    const entities = [
      {
        id: "iefp",
        name: "IEFP Porto",
        icon: "🏢",
        programs: ["Programa Qualifica"],
      },
      {
        id: "saude",
        name: "Centro de Saúde",
        icon: "🏥",
        programs: ["Apoio Psicossocial"],
      },
      {
        id: "ipss",
        name: "IPSS Local",
        icon: "🤝",
        programs: ["Grupos de Apoio"],
      },
    ];

    entities.forEach((entity) => {
      const card = document.createElement("div");
      card.className = "approval-card";
      card.id = `approval-card-${entity.id}`;

      card.innerHTML = `
                <div class="entity-header">
                    <div style="display: flex; align-items: center;">
                        <div class="entity-logo">${entity.icon}</div>
                        <h5>${entity.name}</h5>
                    </div>
                    <div class="approval-status pending">Aguardando</div>
                </div>

                <div class="approval-details">
                    <div class="programs-list">
                        ${entity.programs
                          .map(
                            (program) => `
                            <div class="program-item">
                                <span class="program-name">${program}</span>
                                <span class="program-status">Pré-aprovado</span>
                            </div>
                        `
                          )
                          .join("")}
                    </div>

                    <div class="approval-timeline">
                        <div class="timeline-step completed">
                            <span class="step-label">Pedido Enviado</span>
                            <span class="step-time">Há 2 min</span>
                        </div>
                        <div class="timeline-step active">
                            <span class="step-label">Em Análise</span>
                            <span class="step-time">3-5 dias</span>
                        </div>
                        <div class="timeline-step pending">
                            <span class="step-label">Aprovação Final</span>
                            <span class="step-time">Pendente</span>
                        </div>
                    </div>
                </div>

                <div class="approval-actions">
                    <button class="btn-request-approval" onclick="requestApproval('${
                      entity.id
                    }')">
                        📤 Solicitar Aprovação
                    </button>
                    <button class="btn-follow-up" onclick="followUpApproval('${
                      entity.id
                    }')" disabled>
                        📞 Follow-up
                    </button>
                </div>
            `;

      grid.appendChild(card);
    });
  }

  // Validation Functions
  validateObjectives() {
    const result = document.getElementById("objectives-result");

    // Check if programs were selected
    if (this.gameState.puzzle1.selectedPrograms.length >= 3) {
      result.className = "validation-result success";
      result.innerHTML =
        "✅ Objetivos SMART definidos com base na seleção de programas";
      this.gameState.puzzle4.validationStages.coherence = true;
      this.gameState.puzzle4.score += 5;

      showToast("✅ Objetivos validados com sucesso!", "success", 2500);
    } else {
      result.className = "validation-result error";
      result.innerHTML =
        "❌ Objetivos insuficientes - selecione mais programas no Puzzle 1";

      showToast("❌ Validação de objetivos falhada", "error", 3000);
    }

    this.checkCoherenceCompletion();
    updateScore();
  }

  validateSchedule() {
    const result = document.getElementById("schedule-result");

    // Check if timeline was built
    if (this.gameState.puzzle3.progress >= 6) {
      result.className = "validation-result success";
      result.innerHTML = "✅ Cronograma realista e sequencial validado";
      this.gameState.puzzle4.score += 5;

      showToast("✅ Cronograma validado com sucesso!", "success", 2500);
    } else {
      result.className = "validation-result error";
      result.innerHTML =
        "❌ Cronograma incompleto - organize mais atividades no Puzzle 3";

      showToast("❌ Validação de cronograma falhada", "error", 3000);
    }

    this.checkCoherenceCompletion();
    updateScore();
  }

  validateResources() {
    const result = document.getElementById("resources-result");

    // Check if entities were coordinated
    if (this.gameState.puzzle2.progress >= 3) {
      result.className = "validation-result success";
      result.innerHTML =
        "✅ Recursos humanos e financeiros adequados identificados";
      this.gameState.puzzle4.score += 5;

      showToast("✅ Recursos validados com sucesso!", "success", 2500);
    } else {
      result.className = "validation-result error";
      result.innerHTML =
        "❌ Recursos insuficientes - conecte mais entidades no Puzzle 2";

      showToast("❌ Validação de recursos falhada", "error", 3000);
    }

    this.checkCoherenceCompletion();
    updateScore();
  }

  checkCoherenceCompletion() {
    const objectives = document.getElementById("objectives-result");
    const schedule = document.getElementById("schedule-result");
    const resources = document.getElementById("resources-result");

    if (
      objectives.classList.contains("success") &&
      schedule.classList.contains("success") &&
      resources.classList.contains("success")
    ) {
      const stage = document.getElementById("stage-coherence");
      stage.classList.add("completed");
      stage.querySelector(".stage-status").textContent = "Completo";
      stage.querySelector(".stage-status").classList.add("completed");

      this.gameState.puzzle4.validationStages.coherence = true;
      this.gameState.puzzle4.progress++;

      this.updateValidationProgress();
    }
  }

  requestApproval(entityId) {
    const card = document.getElementById(`approval-card-${entityId}`);
    const button = card.querySelector(".btn-request-approval");
    const status = card.querySelector(".approval-status");
    const followUpBtn = card.querySelector(".btn-follow-up");

    button.disabled = true;
    button.textContent = "⏳ Processando...";

    // Simulate approval process
    setTimeout(() => {
      card.classList.add("approved");
      status.textContent = "Aprovado";
      status.classList.remove("pending");
      status.classList.add("approved");
      button.textContent = "✅ Aprovado";
      followUpBtn.disabled = false;

      this.gameState.puzzle4.approvalStatus[entityId] = true;
      this.gameState.puzzle4.score += 3;

      showToast(
        `✅ ${entityId.toUpperCase()} aprovou o plano!`,
        "success",
        2500
      );

      // Check if all approvals are complete
      if (Object.keys(this.gameState.puzzle4.approvalStatus).length >= 3) {
        this.completeApprovals();
      }

      updateScore();
    }, 2000);
  }

  followUpApproval(entityId) {
    showToast(
      `📞 Follow-up enviado para ${entityId.toUpperCase()}`,
      "info",
      2000
    );
  }

  completeApprovals() {
    const stage = document.getElementById("stage-approvals");
    stage.classList.add("completed");
    stage.querySelector(".stage-status").textContent = "Completo";
    stage.querySelector(".stage-status").classList.add("completed");

    this.gameState.puzzle4.validationStages.approvals = true;
    this.gameState.puzzle4.progress++;

    this.updateValidationProgress();
    showToast("🎉 Todas as aprovações obtidas!", "success", 3000);
  }

  // Consent Functions
  explainPrograms() {
    this.gameState.puzzle4.comprehensionLevel += 25;
    this.updateConsentInterface();

    showToast("📚 Programas explicados à Felisbina", "success", 2000);
  }

  showTimeline() {
    this.gameState.puzzle4.comprehensionLevel += 25;
    this.updateConsentInterface();

    showToast("📅 Cronograma apresentado à Felisbina", "success", 2000);
  }

  addressConcerns() {
    this.gameState.puzzle4.comprehensionLevel += 30;
    this.updateConsentInterface();

    showToast("💭 Dúvidas esclarecidas com a Felisbina", "success", 2000);
  }

  updateConsentInterface() {
    const level = Math.min(this.gameState.puzzle4.comprehensionLevel, 100);
    document.getElementById("comprehension-level").textContent = level + "%";

    // Update mood indicator
    const moodIndicator = document.getElementById("mood-indicator");
    if (level >= 80) {
      moodIndicator.textContent = "😊";
    } else if (level >= 50) {
      moodIndicator.textContent = "🙂";
    } else if (level >= 25) {
      moodIndicator.textContent = "😐";
    }

    // Update dialogue
    const dialogue = document.getElementById("dialogue-bubble");
    if (level >= 80) {
      dialogue.innerHTML =
        '<p>"Agora compreendo tudo! Estou preparada para começar."</p>';
    } else if (level >= 50) {
      dialogue.innerHTML =
        '<p>"Está a ficar mais claro... pode explicar mais alguns detalhes?"</p>';
    } else if (level >= 25) {
      dialogue.innerHTML =
        '<p>"Compreendo melhor agora, mas ainda tenho algumas dúvidas..."</p>';
    }

    // Update consent items
    if (level >= 30) {
      document.getElementById("understanding-status").textContent = "✅";
      document.getElementById("understanding-status").style.color = "#4caf50";
    }
    if (level >= 60) {
      document.getElementById("consent-status").textContent = "✅";
      document.getElementById("consent-status").style.color = "#4caf50";
    }
    if (level >= 80) {
      document.getElementById("expectations-status").textContent = "✅";
      document.getElementById("expectations-status").style.color = "#4caf50";
      document.getElementById("btn-finalize-consent").disabled = false;
    }
  }

  finalizeConsent() {
    if (this.gameState.puzzle4.comprehensionLevel >= 80) {
      const stage = document.getElementById("stage-consent");
      stage.classList.add("completed");
      stage.querySelector(".stage-status").textContent = "Completo";
      stage.querySelector(".stage-status").classList.add("completed");

      this.gameState.puzzle4.validationStages.consent = true;
      this.gameState.puzzle4.progress++;
      this.gameState.puzzle4.score += 5;

      this.updateValidationProgress();

      showToast("✅ Consentimento informado obtido!", "success", 3000);

      // Check if all stages are complete
      if (this.gameState.puzzle4.progress >= 3) {
        this.completePuzzle4();
      }

      updateScore();
    } else {
      showToast(
        "⚠️ Compreensão insuficiente. Continue a explicar o plano.",
        "warning",
        3000
      );
    }
  }

  updateValidationProgress() {
    const percentage = (this.gameState.puzzle4.progress / 3) * 100;
    document.getElementById("validation-percentage").textContent =
      Math.round(percentage) + "%";

    // Update progress ring
    const circle = document.getElementById("validation-progress-circle");
    const circumference = 314; // 2 * PI * 50
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  completePuzzle4() {
    this.gameState.puzzle4.completed = true;
    document.getElementById("btn-finalize-phase").style.display = "block";

    showToast(
      "🎉 Puzzle 4 Concluído! Plano totalmente validado e aprovado!",
      "success",
      4000
    );
  }
}

// Global functions for HTML onclick handlers
window.selectProgram = function (programId, selected) {
  if (window.escapeRoom) {
    window.escapeRoom.selectProgram(programId, selected);
  }
};

window.requestApproval = function (entityId) {
  if (window.escapeRoom) {
    window.escapeRoom.requestApproval(entityId);
  }
};

window.followUpApproval = function (entityId) {
  if (window.escapeRoom) {
    window.escapeRoom.followUpApproval(entityId);
  }
};

// Make it globally available
window.EscapeRoomPhase3 = EscapeRoomPhase3;
