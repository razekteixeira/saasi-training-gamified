/**
 * SAASI Escape Room - Phase 3 Engine
 * Enhanced Interactive Training Experience
 * Following fase3.html structure and scoring (25+25+30+20=100 points max)
 *
 * 4 Interactive Puzzles with Escape Room Elements:
 * 1. Program Selection Matrix with Hidden Codes (25 points max)
 * 2. Entity Network Coordination Hub (25 points max)
 * 3. Timeline Orchestrator with Conflict Detection (30 points max)
 * 4. Multi-Stage Validation System (20 points max)
 *
 * @version 2.0 - Enhanced Escape Room Edition
 * @date January 2025
 */

class EscapeRoomPhase3 {
  constructor(gameState) {
    this.gameState = gameState;
    this.connectionLines = [];
    this.hiddenCodes = {
      puzzle1: "ADEQUACAO",
      puzzle2: "COORDENACAO",
      puzzle3: "CRONOGRAMA",
      puzzle4: "VALIDACAO",
    };
    this.unlockedCodes = [];

    // Enhanced Programs Data - EXACTLY from fase3.html to maintain compliance
    this.programsData = [
      {
        id: "programa_qualifica",
        nome: "Medida + Emprego - Programa Qualifica",
        categoria: "emprego_formacao",
        adequado_felisbina: true,
        pontos_se_selecionado: 6,
        pontos_se_rejeitado: -2,
        entidade_responsavel: "IEFP",
        duracao_meses: 6,
        justificacao_correta:
          "Adequado: Felisbina tem 9º ano, experiência em limpeza e disponibilidade total",
        icone: "💼",
        cor: "#2196f3",
        // Enhanced escape room properties
        adequacyScore: 85,
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
        hiddenCode: "ADQ1",
      },
      {
        id: "apoio_psicossocial",
        nome: "Medida + Inclusão - Apoio Psicossocial",
        categoria: "apoio_psicossocial",
        adequado_felisbina: true,
        pontos_se_selecionado: 6,
        pontos_se_rejeitado: -3,
        entidade_responsavel: "centro_saude",
        duracao_meses: 8,
        justificacao_correta:
          "Essencial: Dependência emocional e isolamento social são problemas prioritários",
        icone: "🧠",
        cor: "#e91e63",
        // Enhanced escape room properties
        adequacyScore: 95,
        requirements: [
          { text: "Problemas psicossociais identificados", met: true },
          { text: "Disponibilidade para acompanhamento", met: true },
          { text: "Motivação para mudança", met: true },
        ],
        impactMetrics: {
          mentalHealth: 85,
          socialIntegration: 75,
        },
        problemsCovered: ["dependencia_emocional", "isolamento_social"],
        budgetCost: 1800,
        hiddenCode: "PSI2",
      },
      {
        id: "grupos_apoio_social",
        nome: "Grupos de Apoio Social - IPSS",
        categoria: "apoio_social",
        adequado_felisbina: true,
        pontos_se_selecionado: 5,
        pontos_se_rejeitado: -2,
        entidade_responsavel: "ipss_local",
        duracao_meses: 6,
        justificacao_correta:
          "Adequado: Isolamento social severo necessita intervenção específica",
        icone: "👥",
        cor: "#ff9800",
        // Enhanced escape room properties
        adequacyScore: 80,
        requirements: [
          { text: "Isolamento social identificado", met: true },
          { text: "Capacidade de participação em grupo", met: true },
          { text: "Disponibilidade horária", met: true },
        ],
        impactMetrics: {
          socialIntegration: 80,
          selfEsteem: 65,
        },
        problemsCovered: ["isolamento_social"],
        budgetCost: 800,
        hiddenCode: "SOC3",
      },
      {
        id: "formacao_digital",
        nome: "Formação Modular - Competências Digitais",
        categoria: "formacao_especializada",
        adequado_felisbina: false,
        pontos_se_selecionado: -3,
        pontos_se_rejeitado: 3,
        entidade_responsavel: "centro_formacao",
        duracao_meses: 3,
        justificacao_correta:
          "Inadequado: Competências digitais muito limitadas, não é prioridade atual",
        icone: "📚",
        cor: "#9c27b0",
        // Enhanced escape room properties
        adequacyScore: 25,
        requirements: [
          { text: "Competências digitais básicas", met: false },
          { text: "Motivação para tecnologia", met: false },
          { text: "Prioridade atual", met: false },
        ],
        impactMetrics: {
          digitalSkills: 30,
          employability: 20,
        },
        problemsCovered: [],
        budgetCost: 1200,
        hiddenCode: "DIG4",
      },
      {
        id: "trabalho_necessario",
        nome: "Trabalho Socialmente Necessário",
        categoria: "emprego_protegido",
        adequado_felisbina: false,
        pontos_se_selecionado: -5,
        pontos_se_rejeitado: 4,
        entidade_responsavel: "camara_municipal",
        duracao_meses: 12,
        justificacao_correta:
          "Inadequado: Felisbina tem capacidade para emprego regular com apoio adequado",
        icone: "🛡️",
        cor: "#607d8b",
        // Enhanced escape room properties
        adequacyScore: 15,
        requirements: [
          { text: "Incapacidade para emprego regular", met: false },
          { text: "Necessidade de proteção social", met: false },
          { text: "Limitações severas", met: false },
        ],
        impactMetrics: {
          employment: 40,
          independence: 20,
        },
        problemsCovered: [],
        budgetCost: 3000,
        hiddenCode: "TSN5",
      },
      {
        id: "estagios_iniciar",
        nome: "Estágios INICIAR - Inclusão Social",
        categoria: "estagio_inclusao",
        adequado_felisbina: false,
        pontos_se_selecionado: -2,
        pontos_se_rejeitado: 1,
        entidade_responsavel: "ipss_local",
        duracao_meses: 4,
        justificacao_correta:
          "Inadequado: Conflito temporal com Programa Qualifica que é prioritário",
        icone: "🌱",
        cor: "#4caf50",
        // Enhanced escape room properties
        adequacyScore: 35,
        requirements: [
          { text: "Disponibilidade temporal", met: false },
          { text: "Prioridade vs Qualifica", met: false },
          { text: "Necessidade de inclusão", met: true },
        ],
        impactMetrics: {
          socialInclusion: 60,
          workExperience: 45,
        },
        problemsCovered: ["isolamento_social"],
        budgetCost: 1500,
        hiddenCode: "EST6",
      },
    ];

    // Enhanced Entities Data - EXACTLY from fase3.html to maintain compliance
    this.entitiesData = [
      {
        id: "iefp_porto",
        nome: "IEFP - Instituto do Emprego e Formação Profissional",
        localizacao: "Porto",
        contacto: "225 073 000",
        email: "porto@iefp.pt",
        especialidade: [
          "qualifica",
          "medidas_emprego",
          "formacao_profissional",
        ],
        tempo_resposta: "3-5 dias úteis",
        adequado_felisbina: true,
        pontos: 8,
        // Enhanced escape room properties
        position: { x: 20, y: 20 },
        status: "offline",
        services: ["Programa Qualifica", "Medidas Emprego", "RVCC"],
        avatar: "🏢",
        connectionCode: "IEFP2025",
      },
      {
        id: "centro_saude_ramalde",
        nome: "Centro de Saúde de Ramalde",
        localizacao: "Porto - Ramalde",
        contacto: "225 073 200",
        email: "ramalde@arsnorte.min-saude.pt",
        especialidade: ["psicologia", "psiquiatria", "apoio_psicossocial"],
        tempo_resposta: "2-3 semanas",
        adequado_felisbina: true,
        pontos: 9,
        // Enhanced escape room properties
        position: { x: 80, y: 30 },
        status: "online",
        services: ["Psicologia", "Psiquiatria", "Apoio Social"],
        avatar: "🏥",
        connectionCode: "SAUDE2025",
      },
      {
        id: "ipss_solidariedade",
        nome: "IPSS Solidariedade Social",
        localizacao: "Porto",
        contacto: "225 073 300",
        email: "geral@solidariedadesocial.pt",
        especialidade: [
          "grupos_apoio",
          "atividades_sociais",
          "estagios_inclusao",
        ],
        tempo_resposta: "1-2 semanas",
        adequado_felisbina: true,
        pontos: 8,
        // Enhanced escape room properties
        position: { x: 20, y: 70 },
        status: "online",
        services: ["Grupos Apoio", "Atividades Sociais", "Estágios"],
        avatar: "🤝",
        connectionCode: "IPSS2025",
      },
      {
        id: "centro_formacao_digital",
        nome: "Centro de Formação Digital",
        localizacao: "Porto",
        contacto: "225 073 400",
        email: "formacao@digitalporto.pt",
        especialidade: ["competencias_digitais", "formacao_modular"],
        tempo_resposta: "1 semana",
        adequado_felisbina: false,
        pontos: -3,
        // Enhanced escape room properties
        position: { x: 80, y: 80 },
        status: "offline",
        services: ["Formação Digital", "Competências TIC"],
        avatar: "💻",
        connectionCode: "DIGITAL2025",
      },
    ];

    // Enhanced Activities Data - EXACTLY from fase3.html to maintain compliance
    this.activitiesData = [
      {
        id: "consulta_psicologia_inicial",
        nome: "Primeira consulta de psicologia",
        mes: 1,
        pontos: 3,
        // Enhanced escape room properties
        category: "psicossocial",
        entity: "centro_saude_ramalde",
        duration: 2,
        prerequisites: [],
        icon: "🧠",
        difficulty: "medium",
        secretCode: "PRIM1",
      },
      {
        id: "avaliacao_iefp",
        nome: "Avaliação inicial no IEFP",
        mes: 1,
        pontos: 3,
        // Enhanced escape room properties
        category: "emprego",
        entity: "iefp_porto",
        duration: 1,
        prerequisites: [],
        icon: "📋",
        difficulty: "easy",
        secretCode: "AVAL1",
      },
      {
        id: "inicio_qualifica",
        nome: "Início do Programa Qualifica",
        mes: 2,
        pontos: 4,
        // Enhanced escape room properties
        category: "emprego",
        entity: "iefp_porto",
        duration: 4,
        prerequisites: ["avaliacao_iefp"],
        icon: "🎯",
        difficulty: "hard",
        secretCode: "QUAL2",
      },
      {
        id: "grupos_apoio_inicio",
        nome: "Integração em grupos de apoio social",
        mes: 2,
        pontos: 3,
        // Enhanced escape room properties
        category: "social",
        entity: "ipss_solidariedade",
        duration: 3,
        prerequisites: ["consulta_psicologia_inicial"],
        icon: "👥",
        difficulty: "medium",
        secretCode: "GRUP2",
      },
      {
        id: "consultas_regulares",
        nome: "Consultas de psicologia quinzenais",
        mes: 2,
        pontos: 3,
        // Enhanced escape room properties
        category: "psicossocial",
        entity: "centro_saude_ramalde",
        duration: 6,
        prerequisites: ["consulta_psicologia_inicial"],
        icon: "🔄",
        difficulty: "easy",
        secretCode: "CONS2",
      },
      {
        id: "rvcc_desenvolvimento",
        nome: "Desenvolvimento do RVCC 12º ano",
        mes: 3,
        pontos: 4,
        // Enhanced escape room properties
        category: "emprego",
        entity: "iefp_porto",
        duration: 3,
        prerequisites: ["inicio_qualifica"],
        icon: "📚",
        difficulty: "hard",
        secretCode: "RVCC3",
      },
      {
        id: "acompanhamento_grupo_apoio",
        nome: "Acompanhamento em grupos de apoio",
        mes: 3,
        pontos: 3,
        // Enhanced escape room properties
        category: "social",
        entity: "ipss_solidariedade",
        duration: 4,
        prerequisites: ["grupos_apoio_inicio"],
        icon: "🤝",
        difficulty: "medium",
        secretCode: "ACOM3",
      },
      {
        id: "formacao_competencias_profissionais",
        nome: "Formação em competências profissionais",
        mes: 4,
        pontos: 4,
        // Enhanced escape room properties
        category: "emprego",
        entity: "iefp_porto",
        duration: 2,
        prerequisites: ["rvcc_desenvolvimento"],
        icon: "⚙️",
        difficulty: "hard",
        secretCode: "COMP4",
      },
      {
        id: "avaliacao_intermedia",
        nome: "Avaliação intermédia do progresso",
        mes: 4,
        pontos: 3,
        // Enhanced escape room properties
        category: "avaliacao",
        entity: "centro_saude_ramalde",
        duration: 1,
        prerequisites: ["consultas_regulares", "acompanhamento_grupo_apoio"],
        icon: "📊",
        difficulty: "medium",
        secretCode: "INTER4",
      },
      {
        id: "estagio_profissional",
        nome: "Estágio profissional (Qualifica)",
        mes: 5,
        pontos: 4,
        // Enhanced escape room properties
        category: "emprego",
        entity: "iefp_porto",
        duration: 4,
        prerequisites: ["formacao_competencias_profissionais"],
        icon: "💼",
        difficulty: "hard",
        secretCode: "ESTAG5",
      },
      {
        id: "preparacao_autonomia",
        nome: "Preparação para autonomia",
        mes: 6,
        pontos: 3,
        // Enhanced escape room properties
        category: "psicossocial",
        entity: "centro_saude_ramalde",
        duration: 2,
        prerequisites: ["avaliacao_intermedia"],
        icon: "🚀",
        difficulty: "medium",
        secretCode: "AUTON6",
      },
      {
        id: "avaliacao_final",
        nome: "Avaliação final do processo",
        mes: 7,
        pontos: 2,
        // Enhanced escape room properties
        category: "avaliacao",
        entity: "centro_saude_ramalde",
        duration: 1,
        prerequisites: ["preparacao_autonomia", "estagio_profissional"],
        icon: "🏆",
        difficulty: "easy",
        secretCode: "FINAL7",
      },
    ];
  }

  // =====================================================
  // PUZZLE 1: ENHANCED PROGRAM SELECTION MATRIX
  // =====================================================

  initializePuzzle1() {
    console.log("🎯 Initializing Puzzle 1: Enhanced Program Selection Matrix");
    this.createProgramsCards();
    this.updateSelectionSummary();

    // Show hidden code hint
    setTimeout(() => {
      showToast(
        "🔍 Dica: Procure códigos ocultos nos programas adequados para desbloquear funcionalidades especiais!",
        "info",
        5000
      );
    }, 2000);
  }

  createProgramsCards() {
    const container = document.getElementById("programs-container");
    if (!container) return;

    container.innerHTML = "";

    this.programsData.forEach((program) => {
      const card = document.createElement("div");
      card.className = "program-card";
      card.dataset.programId = program.id;

      // Calculate adequacy color
      const adequacyColor =
        program.adequacyScore >= 80
          ? "#4caf50"
          : program.adequacyScore >= 50
          ? "#ff9800"
          : "#f44336";

      card.innerHTML = `
        <div class="program-header">
          <div style="display: flex; align-items: center;">
            <div class="program-icon">${program.icone}</div>
            <div class="program-title">${program.nome}</div>
          </div>
          <div class="adequacy-meter">
            <div class="meter-label">${program.adequacyScore}% adequação</div>
            <div class="meter-fill" style="--adequacy-width: ${
              program.adequacyScore
            }%"></div>
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
              <span>${req.text}</span>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="program-impact-preview">
          <h5>📊 Impacto Previsto</h5>
          <div class="impact-metrics">
            ${Object.entries(program.impactMetrics)
              .map(
                ([key, value]) => `
              <div class="metric">
                <span class="metric-label">${this.translateMetric(key)}</span>
                <div class="metric-bar">
                  <div class="bar-fill" style="width: ${value}%">${value}%</div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
          <div style="margin-top: 10px;">
            <span style="float: right; font-size: 0.8rem; color: #666;">
              Código: <span class="hidden-code" style="cursor: pointer;" onclick="window.escapeRoom.revealCode('${
                program.hiddenCode
              }')">${program.hiddenCode}</span>
            </span>
          </div>
        </div>

        <div class="selection-controls">
          <button class="btn-select-program" onclick="window.escapeRoom.selectProgram('${
            program.id
          }', true)">
            ✅ Selecionar
          </button>
          <button class="btn-reject-program" onclick="window.escapeRoom.selectProgram('${
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
      socialIntegration: "Integração Social",
      digitalSkills: "Competências Digitais",
      employment: "Emprego",
      independence: "Independência",
      selfEsteem: "Auto-estima",
      socialInclusion: "Inclusão Social",
      workExperience: "Experiência Profissional",
    };
    return translations[key] || key;
  }

  selectProgram(programId, selected) {
    const program = this.programsData.find((p) => p.id === programId);
    const card = document.querySelector(`[data-program-id="${programId}"]`);

    if (!program || !card) return;

    // Remove from both arrays first
    this.gameState.puzzle1.selectedPrograms =
      this.gameState.puzzle1.selectedPrograms.filter((id) => id !== programId);
    this.gameState.puzzle1.rejectedPrograms =
      this.gameState.puzzle1.rejectedPrograms.filter((id) => id !== programId);

    // Clear visual state
    card.classList.remove("selected", "rejected");

    if (selected) {
      // SELECT the program
      this.gameState.puzzle1.selectedPrograms.push(programId);
      card.classList.add("selected");

      // Award points based on adequacy - MAX 25 POINTS TOTAL
      const points = program.adequado_felisbina
        ? program.pontos_se_selecionado
        : program.pontos_se_rejeitado;
      this.gameState.puzzle1.score = Math.min(
        25,
        Math.max(0, this.gameState.puzzle1.score + points)
      );

      showToast(
        `✅ ${program.nome} SELECIONADO (+${points} pontos)`,
        "success",
        2000
      );

      // Check for hidden code
      if (
        program.adequado_felisbina &&
        !this.unlockedCodes.includes(program.hiddenCode)
      ) {
        this.revealCode(program.hiddenCode);
      }
    } else {
      // REJECT the program
      this.gameState.puzzle1.rejectedPrograms.push(programId);
      card.classList.add("rejected");

      // Award points based on adequacy - MAX 25 POINTS TOTAL
      const points = !program.adequado_felisbina
        ? program.pontos_se_rejeitado
        : program.pontos_se_selecionado;
      this.gameState.puzzle1.score = Math.min(
        25,
        Math.max(0, this.gameState.puzzle1.score + points)
      );

      showToast(
        `❌ ${program.nome} REJEITADO (+${points} pontos)`,
        "warning",
        2000
      );
    }

    this.updateSelectionSummary();
    this.checkPuzzle1Completion();
    updateScore();
  }

  updateSelectionSummary() {
    const selectedList = document.getElementById("selected-programs-list");
    const avgAdequacy = document.getElementById("avg-adequacy");
    const problemCoverage = document.getElementById("problem-coverage");
    const budgetViability = document.getElementById("budget-viability");

    if (!selectedList) return;

    // Update selected programs list
    selectedList.innerHTML = "";
    let totalAdequacy = 0;
    let totalBudget = 0;
    let problemsCovered = new Set();

    this.gameState.puzzle1.selectedPrograms.forEach((programId) => {
      const program = this.programsData.find((p) => p.id === programId);
      if (program) {
        const badge = document.createElement("div");
        badge.className = "selected-program-badge";
        badge.textContent = `${program.icone} ${program.nome}`;
        selectedList.appendChild(badge);

        totalAdequacy += program.adequacyScore;
        totalBudget += program.budgetCost;
        program.problemsCovered.forEach((problem) =>
          problemsCovered.add(problem)
        );
      }
    });

    // Update metrics
    const avgAdequacyValue =
      this.gameState.puzzle1.selectedPrograms.length > 0
        ? Math.round(
            totalAdequacy / this.gameState.puzzle1.selectedPrograms.length
          )
        : 0;

    if (avgAdequacy) avgAdequacy.textContent = avgAdequacyValue + "%";
    if (problemCoverage)
      problemCoverage.textContent =
        Math.min(100, problemsCovered.size * 33) + "%";
    if (budgetViability)
      budgetViability.textContent =
        totalBudget <= 8000
          ? "100%"
          : Math.max(0, 100 - (totalBudget - 8000) / 100) + "%";

    // Update progress
    document.getElementById("puzzle1-progress").textContent =
      this.gameState.puzzle1.selectedPrograms.length;

    // Store metrics for final calculation
    this.gameState.puzzle1.avgAdequacy = avgAdequacyValue;
    this.gameState.puzzle1.problemCoverage = Math.min(
      100,
      problemsCovered.size * 33
    );
    this.gameState.puzzle1.budgetViability =
      totalBudget <= 8000 ? 100 : Math.max(0, 100 - (totalBudget - 8000) / 100);
  }

  checkPuzzle1Completion() {
    // Check completion criteria: at least 3 adequate programs selected and 2 inadequate rejected
    const adequateSelected = this.gameState.puzzle1.selectedPrograms.filter(
      (id) => this.programsData.find((p) => p.id === id).adequado_felisbina
    ).length;

    const inadequateRejected = this.gameState.puzzle1.rejectedPrograms.filter(
      (id) => !this.programsData.find((p) => p.id === id).adequado_felisbina
    ).length;

    if (adequateSelected >= 3 && inadequateRejected >= 2) {
      this.completePuzzle1();
    }
  }

  completePuzzle1() {
    this.gameState.puzzle1.completed = true;
    document.getElementById("btn-continue-puzzle2").style.display = "block";

    showToast(
      "🎯 Puzzle 1 Completado! Seleção de programas adequada. Pode continuar para o próximo desafio!",
      "success",
      4000
    );

    // Bonus points for high adequacy
    if (this.gameState.puzzle1.avgAdequacy >= 85) {
      const bonus = Math.min(5, 25 - this.gameState.puzzle1.score);
      this.gameState.puzzle1.score = Math.min(
        25,
        this.gameState.puzzle1.score + bonus
      );
      showToast(`🌟 Bónus de adequação: +${bonus} pontos!`, "success", 3000);
    }

    updateScore();
  }

  revealCode(code) {
    if (!this.unlockedCodes.includes(code)) {
      this.unlockedCodes.push(code);
      showToast(
        `🔓 Código descoberto: ${code}! Funcionalidade especial desbloqueada!`,
        "info",
        4000
      );

      // Special effects based on code
      if (
        code.includes("ADQ") ||
        code.includes("PSI") ||
        code.includes("SOC")
      ) {
        // Highlight adequate programs
        document.querySelectorAll(".program-card").forEach((card) => {
          const programId = card.dataset.programId;
          const program = this.programsData.find((p) => p.id === programId);
          if (program && program.adequado_felisbina) {
            card.style.boxShadow = "0 0 20px rgba(76, 175, 80, 0.5)";
            setTimeout(() => (card.style.boxShadow = ""), 3000);
          }
        });
      }
    }
  }

  // =====================================================
  // PUZZLE 2: DYNAMIC ENTITY COORDINATION HUB
  // =====================================================

  initializePuzzle2() {
    console.log("🤝 Initializing Puzzle 2: Dynamic Entity Coordination Hub");
    this.createEntityNodes();
    this.updateCoordinationMetrics();
    this.updateCoordinationTimeline();

    // Show coordination challenge
    setTimeout(() => {
      showToast(
        "🔗 Desafio: Estabeleça conexões estratégicas entre entidades. Procure códigos de conexão!",
        "info",
        5000
      );
    }, 1500);
  }

  createEntityNodes() {
    const container = document.getElementById("entity-nodes-container");
    if (!container) return;

    container.innerHTML = "";

    this.entitiesData.forEach((entity, index) => {
      const node = document.createElement("div");
      node.className = `entity-node ${entity.status}`;
      node.dataset.entityId = entity.id;

      // Position nodes around Felisbina with proper bounds checking
      const angle = (index / this.entitiesData.length) * 2 * Math.PI;
      const radiusPercent = 30; // 30% radius from center
      const centerX = 50; // Center of the visualization
      const centerY = 50;

      // Calculate position with bounds checking
      let x = centerX + radiusPercent * Math.cos(angle);
      let y = centerY + radiusPercent * Math.sin(angle);

      // Ensure nodes stay within bounds (leave 15% margin from edges)
      x = Math.max(15, Math.min(85, x));
      y = Math.max(15, Math.min(85, y));

      node.style.left = `${x}%`;
      node.style.top = `${y}%`;

      node.innerHTML = `
        <div class="entity-avatar">${entity.avatar}</div>
        <div class="entity-name">${entity.nome.split(" ")[0]}</div>
        <div class="entity-status ${entity.status}">${
        entity.status === "online" ? "Disponível" : "Ocupado"
      }</div>
        <div class="services-list">
          ${entity.services
            .map((service) => `<span class="service">${service}</span>`)
            .join("")}
        </div>
        <div style="font-size: 0.7rem; margin: 5px 0;">
          Código: <span class="connection-code" style="cursor: pointer;" onclick="window.escapeRoom.enterConnectionCode('${
            entity.connectionCode
          }')">${entity.connectionCode}</span>
        </div>
        <button class="btn-contact-entity" onclick="window.escapeRoom.contactEntity('${
          entity.id
        }')">
          Contactar
        </button>
      `;

      container.appendChild(node);
    });
  }

  contactEntity(entityId) {
    const entity = this.entitiesData.find((e) => e.id === entityId);
    const node = document.querySelector(`[data-entity-id="${entityId}"]`);

    if (!entity || !node) return;

    if (!this.gameState.puzzle2.connectedEntities.includes(entityId)) {
      this.gameState.puzzle2.connectedEntities.push(entityId);
      node.classList.add("contacted");

      const button = node.querySelector(".btn-contact-entity");
      button.textContent = "Contactado ✓";
      button.disabled = true;

      // Award points - MAX 25 POINTS TOTAL
      const points = entity.adequado_felisbina
        ? entity.pontos
        : Math.abs(entity.pontos);
      this.gameState.puzzle2.score = Math.min(
        25,
        Math.max(0, this.gameState.puzzle2.score + points)
      );

      showToast(
        `🤝 ${entity.nome} contactado! (+${points} pontos)`,
        "success",
        3000
      );

      // Create connection line
      this.createConnectionLine(entityId);

      // Update metrics
      this.updateCoordinationMetrics();
      this.updateCoordinationTimeline();

      // Check completion
      if (this.gameState.puzzle2.connectedEntities.length >= 3) {
        this.completePuzzle2();
      }

      updateScore();
    }
  }

  enterConnectionCode(code) {
    showToast(
      `🔑 Código de conexão: ${code}. Use este código para estabelecer conexões prioritárias!`,
      "info",
      3000
    );

    // Special connection bonus
    if (!this.unlockedCodes.includes(code)) {
      this.unlockedCodes.push(code);
      const bonus = 2;
      this.gameState.puzzle2.score = Math.min(
        25,
        this.gameState.puzzle2.score + bonus
      );
      showToast(
        `🌟 Bónus de conexão especial: +${bonus} pontos!`,
        "success",
        2000
      );
      updateScore();
    }
  }

  createConnectionLine(entityId) {
    const container = document.getElementById("connection-lines-container");
    const entityNode = document.querySelector(`[data-entity-id="${entityId}"]`);
    const felisbinaNode = document.querySelector(".felisbina-node");

    if (!container || !entityNode || !felisbinaNode) return;

    const line = document.createElement("div");
    line.className = "connection-line active";
    line.dataset.entityId = entityId;

    // Calculate line position and rotation
    const entityRect = entityNode.getBoundingClientRect();
    const felisbinaRect = felisbinaNode.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const x1 =
      felisbinaRect.left + felisbinaRect.width / 2 - containerRect.left;
    const y1 = felisbinaRect.top + felisbinaRect.height / 2 - containerRect.top;
    const x2 = entityRect.left + entityRect.width / 2 - containerRect.left;
    const y2 = entityRect.top + entityRect.height / 2 - containerRect.top;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.width = length + "px";
    line.style.transform = `rotate(${angle}deg)`;

    container.appendChild(line);
    this.connectionLines.push(line);
  }

  removeConnectionLine(entityId) {
    const line = document.querySelector(`[data-entity-id="${entityId}"]`);
    if (line) {
      line.remove();
      this.connectionLines = this.connectionLines.filter((l) => l !== line);
    }
  }

  updateCoordinationMetrics() {
    const activeEntities = document.getElementById("active-entities");
    const coordinationScore = document.getElementById("coordination-score");
    const avgResponseTime = document.getElementById("avg-response-time");

    if (activeEntities) {
      activeEntities.textContent = `${this.gameState.puzzle2.connectedEntities.length}/${this.entitiesData.length}`;
    }

    if (coordinationScore) {
      const score = Math.round(
        (this.gameState.puzzle2.connectedEntities.length /
          this.entitiesData.length) *
          100
      );
      coordinationScore.textContent = score + "%";
      this.gameState.puzzle2.coordinationScore = score;
    }

    if (avgResponseTime) {
      const connectedEntities = this.gameState.puzzle2.connectedEntities
        .map((id) => this.entitiesData.find((e) => e.id === id))
        .filter(Boolean);

      if (connectedEntities.length > 0) {
        const avgTime =
          connectedEntities.reduce((sum, entity) => {
            const days = parseInt(entity.tempo_resposta.split("-")[0]) || 1;
            return sum + days;
          }, 0) / connectedEntities.length;
        avgResponseTime.textContent = Math.round(avgTime) + " dias";
        this.gameState.puzzle2.avgResponseTime = avgTime;
      }
    }

    // Update progress
    document.getElementById("puzzle2-progress").textContent =
      this.gameState.puzzle2.connectedEntities.length;
  }

  updateCoordinationTimeline() {
    const container = document.getElementById("coordination-timeline-viz");
    if (!container) return;

    container.innerHTML = "";

    this.gameState.puzzle2.connectedEntities.forEach((entityId) => {
      const entity = this.entitiesData.find((e) => e.id === entityId);
      if (!entity) return;

      const track = document.createElement("div");
      track.className = "timeline-track";
      track.innerHTML = `
        <div class="track-header">
          <span class="entity-name">${entity.avatar} ${entity.nome}</span>
          <span class="track-status">Ativo</span>
        </div>
        <div class="timeline-events">
          <div class="timeline-event">Contacto inicial</div>
          <div class="timeline-event">Articulação estabelecida</div>
          <div class="timeline-event">Programas coordenados</div>
        </div>
      `;
      container.appendChild(track);
    });
  }

  completePuzzle2() {
    this.gameState.puzzle2.completed = true;
    document.getElementById("btn-continue-puzzle3").style.display = "block";

    showToast(
      "🤝 Puzzle 2 Completado! Rede de coordenação estabelecida com sucesso!",
      "success",
      4000
    );

    // Bonus for high coordination
    if (this.gameState.puzzle2.coordinationScore >= 75) {
      const bonus = Math.min(3, 25 - this.gameState.puzzle2.score);
      this.gameState.puzzle2.score = Math.min(
        25,
        this.gameState.puzzle2.score + bonus
      );
      showToast(
        `🌟 Bónus de coordenação eficaz: +${bonus} pontos!`,
        "success",
        3000
      );
    }

    updateScore();
  }

  // =====================================================
  // PUZZLE 3: ADVANCED TIMELINE ORCHESTRATOR
  // =====================================================

  initializePuzzle3() {
    console.log("📅 Initializing Puzzle 3: Advanced Timeline Orchestrator");
    this.createActivityCategories();
    this.createTimelineGrid();
    this.setupAdvancedDragAndDrop();

    setTimeout(() => {
      showToast(
        "⏰ Desafio: Organize as atividades respeitando pré-requisitos e evitando conflitos!",
        "info",
        5000
      );
    }, 1500);
  }

  createActivityCategories() {
    const container = document.getElementById("activity-categories");
    if (!container) return;

    const categories = {
      psicossocial: {
        name: "Apoio Psicossocial",
        color: "#e91e63",
        icon: "🧠",
      },
      emprego: { name: "Emprego e Formação", color: "#2196f3", icon: "💼" },
      social: { name: "Integração Social", color: "#ff9800", icon: "👥" },
      avaliacao: { name: "Avaliação", color: "#4caf50", icon: "📊" },
    };

    container.innerHTML = "";

    Object.entries(categories).forEach(([categoryId, category]) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";

      const activities = this.activitiesData.filter(
        (a) => a.category === categoryId
      );

      categoryDiv.innerHTML = `
        <h5 style="background: ${category.color};">${category.icon} ${
        category.name
      }</h5>
        <div class="activities-list">
          ${activities
            .map(
              (activity) => `
            <div class="activity-item" draggable="true" data-activity-id="${activity.id}">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="activity-icon">${activity.icon}</span>
                <div class="activity-info">
                  <h6>${activity.nome}</h6>
                  <div class="activity-metadata">
                    <span class="duration">${activity.duration}sem</span>
                    <span class="frequency">Mês ${activity.mes}</span>
                    <span class="priority ${activity.difficulty}">${activity.difficulty}</span>
                  </div>
                </div>
              </div>
              <div style="font-size: 0.7rem; color: #666; margin-top: 5px;">
                Código: ${activity.secretCode}
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
    const container = document.getElementById("timeline-grid-advanced");
    if (!container) return;

    // Create month labels
    const monthLabels = document.getElementById("month-labels");
    if (monthLabels) {
      const months = ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
      monthLabels.innerHTML = months
        .map(
          (month, index) => `
        <div class="month-label">
          <span class="month-name">Mês ${index + 1}</span>
          <span class="month-name">${month}</span>
          <div class="month-capacity">Cap: 4 atividades</div>
        </div>
      `
        )
        .join("");
    }

    // Create timeline rows for each entity
    const entities = ["IEFP", "Centro Saúde", "IPSS", "Geral"];
    container.innerHTML = "";

    entities.forEach((entityName) => {
      const row = document.createElement("div");
      row.className = "timeline-row";

      row.innerHTML = `
        <div class="row-header">
          <div class="entity-info">
            <div class="entity-name">${entityName}</div>
            <div class="availability-indicator">
              <span class="available-slots">4/4</span> slots disponíveis
            </div>
          </div>
        </div>
        <div class="timeline-slots">
          ${Array.from(
            { length: 7 },
            (_, month) => `
            <div class="time-slot" data-month="${
              month + 1
            }" data-entity="${this.getEntityDataAttribute(entityName)}">
              <!-- Activities will be dropped here -->
            </div>
          `
          ).join("")}
        </div>
      `;

      container.appendChild(row);
    });
  }

  setupAdvancedDragAndDrop() {
    // Enhanced drag and drop with conflict detection
    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("activity-item")) {
        e.dataTransfer.setData("text/plain", e.target.dataset.activityId);
        e.target.classList.add("dragging");
      }
    });

    document.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("activity-item")) {
        e.target.classList.remove("dragging");
      }
    });

    document.addEventListener("dragover", (e) => {
      if (e.target.classList.contains("time-slot")) {
        e.preventDefault();
        e.target.classList.add("drop-target");
      }
    });

    document.addEventListener("dragleave", (e) => {
      if (e.target.classList.contains("time-slot")) {
        e.target.classList.remove("drop-target");
      }
    });

    document.addEventListener("drop", (e) => {
      if (e.target.classList.contains("time-slot")) {
        e.preventDefault();
        e.target.classList.remove("drop-target");

        const activityId = e.dataTransfer.getData("text/plain");
        const month = parseInt(e.target.dataset.month);
        const entity = e.target.dataset.entity;

        this.placeActivityAdvanced(activityId, month, entity, e.target);
      }
    });
  }

  placeActivityAdvanced(activityId, month, entity, slot) {
    const activity = this.activitiesData.find((a) => a.id === activityId);
    if (!activity) return;

    // Check if activity is already placed
    if (this.gameState.puzzle3.placedActivities[activityId]) {
      showToast("⚠️ Atividade já foi colocada no cronograma!", "warning", 2000);
      return;
    }

    // Check prerequisites
    if (!this.checkPrerequisitesAdvanced(activity, month)) {
      showToast(
        "❌ Pré-requisitos não cumpridos! Verifique dependências.",
        "error",
        3000
      );
      return;
    }

    // Check entity compatibility
    const activityEntity = this.getActivityEntity(activity.entity);
    if (entity !== "geral" && entity !== activityEntity) {
      showToast("⚠️ Entidade incorreta para esta atividade!", "warning", 2000);
      return;
    }

    // Check correct month
    if (month !== activity.mes) {
      showToast(
        `⏰ Atividade deve ser colocada no mês ${activity.mes}!`,
        "warning",
        2000
      );
      return;
    }

    // Place activity
    const placedActivity = document.createElement("div");
    placedActivity.className = "placed-activity";
    placedActivity.dataset.activityId = activityId;
    placedActivity.innerHTML = `
      <div>${activity.icon} ${activity.nome}</div>
      <div style="font-size: 0.6rem; margin-top: 2px;">${activity.secretCode}</div>
    `;
    placedActivity.onclick = () => this.removeActivity(activityId, slot);

    slot.appendChild(placedActivity);
    slot.classList.add("occupied");

    // Update game state
    this.gameState.puzzle3.placedActivities[activityId] = {
      month,
      entity,
      slot,
    };

    // Award points - MAX 30 POINTS TOTAL
    this.gameState.puzzle3.score = Math.min(
      30,
      this.gameState.puzzle3.score + activity.pontos
    );

    // Mark original activity as placed
    const originalActivity = document.querySelector(
      `[data-activity-id="${activityId}"]`
    );
    if (originalActivity) {
      originalActivity.classList.add("placed");
    }

    showToast(
      `✅ ${activity.nome} colocada! (+${activity.pontos} pontos)`,
      "success",
      2000
    );

    // Update metrics
    this.updateResourceUtilization();
    this.updateLogicalSequencing();

    // Check completion
    const placedCount = Object.keys(
      this.gameState.puzzle3.placedActivities
    ).length;
    console.log(`Puzzle 3 Progress: ${placedCount}/12 activities placed`);
    if (placedCount >= 12) {
      this.completePuzzle3();
    }

    updateScore();
  }

  checkPrerequisitesAdvanced(activity, month) {
    if (!activity.prerequisites || activity.prerequisites.length === 0)
      return true;

    return activity.prerequisites.every((prereqId) => {
      const placedPrereq = this.gameState.puzzle3.placedActivities[prereqId];
      return placedPrereq && placedPrereq.month < month;
    });
  }

  getActivityEntity(entityCode) {
    const entityMap = {
      iefp_porto: "iefp",
      centro_saude_ramalde: "centro_saude",
      ipss_solidariedade: "ipss",
    };
    console.log(entityCode);
    console.log(entityMap);
    console.log(entityMap[entityCode] || "geral");
    return entityMap[entityCode] || "geral";
  }

  getEntityDataAttribute(entityDisplayName) {
    // Map display names to data attribute values to ensure consistency
    const displayNameMap = {
      IEFP: "iefp",
      "Centro Saúde": "centro_saude",
      IPSS: "ipss",
      Geral: "geral",
    };
    return displayNameMap[entityDisplayName] || "geral";
  }

  removeActivity(activityId, slot) {
    const placedActivity = slot.querySelector(
      `[data-activity-id="${activityId}"]`
    );
    if (placedActivity) {
      placedActivity.remove();
      slot.classList.remove("occupied");

      // Update game state
      const activity = this.activitiesData.find((a) => a.id === activityId);
      if (activity) {
        this.gameState.puzzle3.score = Math.max(
          0,
          this.gameState.puzzle3.score - activity.pontos
        );
      }
      delete this.gameState.puzzle3.placedActivities[activityId];

      // Unmark original activity
      const originalActivity = document.querySelector(
        `[data-activity-id="${activityId}"]`
      );
      if (originalActivity) {
        originalActivity.classList.remove("placed");
      }

      showToast("🔄 Atividade removida do cronograma", "info", 1500);
      updateScore();
    }
  }

  updateResourceUtilization() {
    const totalSlots = 7 * 4; // 7 months * 4 entities
    const usedSlots = Object.keys(
      this.gameState.puzzle3.placedActivities
    ).length;
    const utilization = Math.round((usedSlots / totalSlots) * 100);

    this.gameState.puzzle3.resourceUtilization = utilization;

    const utilizationBar = document.getElementById("resource-utilization");
    if (utilizationBar) {
      utilizationBar.style.width = utilization + "%";
      // Find the value span in the same metric container
      const valueSpan = utilizationBar
        .closest(".metric")
        .querySelector(".value");
      if (valueSpan) {
        valueSpan.textContent = utilization + "%";
      }
    }

    document.getElementById("puzzle3-progress").textContent = usedSlots;
  }

  updateLogicalSequencing() {
    let correctSequences = 0;
    let totalSequences = 0;

    this.activitiesData.forEach((activity) => {
      if (activity.prerequisites && activity.prerequisites.length > 0) {
        totalSequences++;
        const placedActivity =
          this.gameState.puzzle3.placedActivities[activity.id];

        if (placedActivity) {
          const allPrereqsBefore = activity.prerequisites.every((prereqId) => {
            const placedPrereq =
              this.gameState.puzzle3.placedActivities[prereqId];
            return placedPrereq && placedPrereq.month < placedActivity.month;
          });

          if (allPrereqsBefore) correctSequences++;
        }
      }
    });

    const sequencing =
      totalSequences > 0
        ? Math.round((correctSequences / totalSequences) * 100)
        : 100;
    this.gameState.puzzle3.logicalSequencing = sequencing;

    const sequencingBar = document.getElementById("logical-sequencing");
    if (sequencingBar) {
      sequencingBar.style.width = sequencing + "%";
      // Find the value span in the same metric container
      const valueSpan = sequencingBar
        .closest(".metric")
        .querySelector(".value");
      if (valueSpan) {
        valueSpan.textContent = sequencing + "%";
      }
    }
  }

  autoSequence() {
    showToast(
      "🤖 Sequenciamento automático ativado! Organizando atividades...",
      "info",
      3000
    );

    // Clear existing placements
    Object.keys(this.gameState.puzzle3.placedActivities).forEach(
      (activityId) => {
        const placement = this.gameState.puzzle3.placedActivities[activityId];
        this.removeActivity(activityId, placement.slot);
      }
    );

    // Auto-place activities in correct order
    setTimeout(() => {
      this.activitiesData.slice(0, 6).forEach((activity, index) => {
        setTimeout(() => {
          const entity = this.getActivityEntity(activity.entity);
          const slot = document.querySelector(
            `[data-month="${activity.mes}"][data-entity="${entity}"]`
          );
          if (slot && !slot.classList.contains("occupied")) {
            this.placeActivityAdvanced(activity.id, activity.mes, entity, slot);
          }
        }, index * 500);
      });
    }, 1000);
  }

  detectConflicts() {
    const conflicts = [];
    const conflictsList = document.getElementById("conflicts-list");

    // Check for scheduling conflicts
    Object.entries(this.gameState.puzzle3.placedActivities).forEach(
      ([activityId, placement]) => {
        const activity = this.activitiesData.find((a) => a.id === activityId);

        // Check prerequisites
        if (activity.prerequisites) {
          activity.prerequisites.forEach((prereqId) => {
            const prereqPlacement =
              this.gameState.puzzle3.placedActivities[prereqId];
            if (!prereqPlacement || prereqPlacement.month >= placement.month) {
              conflicts.push(
                `${activity.nome}: Pré-requisito ${prereqId} não cumprido`
              );
            }
          });
        }
      }
    );

    this.gameState.puzzle3.conflicts = conflicts;

    if (conflictsList) {
      if (conflicts.length === 0) {
        conflictsList.innerHTML =
          '<p style="text-align: center; color: #4caf50;">✅ Nenhum conflito detetado</p>';
      } else {
        conflictsList.innerHTML = conflicts
          .map((conflict) => `<div class="conflict-item">⚠️ ${conflict}</div>`)
          .join("");
      }
    }

    showToast(
      `🔍 Análise completa: ${conflicts.length} conflitos detetados`,
      conflicts.length > 0 ? "warning" : "success",
      3000
    );
  }

  // @deprecated
  optimizeIntelligent() {
    showToast("⚡ Otimização inteligente iniciada...", "info", 2000);

    const suggestions = [
      "Priorize atividades de avaliação no início de cada mês",
      "Mantenha continuidade nas consultas psicológicas",
      "Coordene atividades do IEFP em sequência lógica",
      "Reserve tempo para preparação entre atividades intensivas",
    ];

    const suggestionsContainer = document.getElementById(
      "optimization-suggestions"
    );
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = suggestions
        .map(
          (suggestion) => `<div class="suggestion-item">💡 ${suggestion}</div>`
        )
        .join("");
    }

    // Bonus for using optimization
    const bonus = 2;
    this.gameState.puzzle3.score = Math.min(
      30,
      this.gameState.puzzle3.score + bonus
    );
    showToast(`🌟 Bónus de otimização: +${bonus} pontos!`, "success", 2000);
    updateScore();
  }

  completePuzzle3() {
    this.gameState.puzzle3.completed = true;
    document.getElementById("btn-continue-puzzle4").style.display = "block";

    showToast(
      "📅 Puzzle 3 Completado! Cronograma organizado com eficiência!",
      "success",
      4000
    );

    // Bonus for high efficiency
    if (
      this.gameState.puzzle3.resourceUtilization >= 80 &&
      this.gameState.puzzle3.logicalSequencing >= 90
    ) {
      const bonus = Math.min(5, 30 - this.gameState.puzzle3.score);
      this.gameState.puzzle3.score = Math.min(
        30,
        this.gameState.puzzle3.score + bonus
      );
      showToast(
        `🌟 Bónus de eficiência máxima: +${bonus} pontos!`,
        "success",
        3000
      );
    }

    updateScore();
  }

  // =====================================================
  // PUZZLE 4: COMPREHENSIVE VALIDATION & APPROVAL SYSTEM
  // =====================================================

  initializePuzzle4() {
    console.log(
      "✅ Initializing Puzzle 4: Comprehensive Validation & Approval System"
    );
    this.createApprovalCards();
    this.updateValidationProgress();

    setTimeout(() => {
      showToast(
        "🔍 Desafio final: Complete todas as validações e obtenha aprovações necessárias!",
        "info",
        5000
      );
    }, 1500);
  }

  createApprovalCards() {
    const container = document.getElementById("approvals-grid");
    if (!container) return;

    const approvalEntities = [
      {
        id: "iefp",
        name: "IEFP Porto",
        logo: "🏢",
        programs: ["Programa Qualifica", "RVCC 12º ano"],
        timeline: [
          { step: "Pedido submetido", status: "pending" },
          { step: "Análise técnica", status: "pending" },
          { step: "Aprovação final", status: "pending" },
        ],
      },
      {
        id: "saude",
        name: "Centro de Saúde",
        logo: "🏥",
        programs: ["Apoio Psicossocial", "Consultas Regulares"],
        timeline: [
          { step: "Referenciação médica", status: "pending" },
          { step: "Avaliação psicológica", status: "pending" },
          { step: "Plano aprovado", status: "pending" },
        ],
      },
      {
        id: "ipss",
        name: "IPSS Local",
        logo: "🤝",
        programs: ["Grupos de Apoio Social"],
        timeline: [
          { step: "Avaliação social", status: "pending" },
          { step: "Integração aprovada", status: "pending" },
        ],
      },
    ];

    container.innerHTML = "";

    approvalEntities.forEach((entity) => {
      const card = document.createElement("div");
      card.className = "approval-card";
      card.dataset.entityId = entity.id;

      card.innerHTML = `
        <div class="entity-header">
          <div style="display: flex; align-items: center;">
            <div class="entity-logo">${entity.logo}</div>
            <div class="entity-name">${entity.name}</div>
          </div>
          <div class="approval-status pending">Pendente</div>
        </div>
        
        <div class="approval-details">
          <h5>Programas a Aprovar:</h5>
          <div class="programs-list">
            ${entity.programs
              .map(
                (program) => `
              <div class="program-item">
                <span class="program-name">${program}</span>
                <span class="program-status">Aguarda</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        
        <div class="approval-timeline">
          ${entity.timeline
            .map(
              (step, index) => `
            <div class="timeline-step ${step.status}" data-step="${index}">
              <span class="step-label">${step.step}</span>
              <span class="step-time">--</span>
            </div>
          `
            )
            .join("")}
        </div>
        
        <div class="approval-actions">
          <button class="btn-request-approval" onclick="window.escapeRoom.requestApproval('${
            entity.id
          }')">
            📋 Solicitar Aprovação
          </button>
          <button class="btn-follow-up" onclick="window.escapeRoom.followUpApproval('${
            entity.id
          }')" disabled>
            📞 Fazer Follow-up
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  validateObjectives() {
    const result = document.getElementById("objectives-result");

    // Simulate validation process
    setTimeout(() => {
      const isValid =
        this.gameState.puzzle1.completed &&
        this.gameState.puzzle1.avgAdequacy >= 70;

      if (isValid) {
        result.className = "validation-result success";
        result.textContent =
          "✅ Objetivos validados: Claros, específicos e alinhados com as necessidades da Felisbina.";

        this.gameState.puzzle4.validationStages.coherence = true;
        this.gameState.puzzle4.score = Math.min(
          20,
          this.gameState.puzzle4.score + 5
        );

        document.getElementById("btn-validate-objectives").disabled = true;
        document.getElementById("btn-validate-objectives").textContent =
          "✅ Validado";

        this.checkCoherenceCompletion();
      } else {
        result.className = "validation-result error";
        result.textContent =
          "❌ Objetivos necessitam refinamento. Revise a seleção de programas.";
      }

      updateScore();
    }, 2000);
  }

  validateSchedule() {
    const result = document.getElementById("schedule-result");

    setTimeout(() => {
      const isValid =
        this.gameState.puzzle3.completed &&
        this.gameState.puzzle3.logicalSequencing >= 80;

      if (isValid) {
        result.className = "validation-result success";
        result.textContent =
          "✅ Cronograma validado: Sequência lógica respeitada e prazos realistas.";

        this.gameState.puzzle4.validationStages.coherence = true;
        this.gameState.puzzle4.score = Math.min(
          20,
          this.gameState.puzzle4.score + 5
        );

        document.getElementById("btn-validate-schedule").disabled = true;
        document.getElementById("btn-validate-schedule").textContent =
          "✅ Validado";

        this.checkCoherenceCompletion();
      } else {
        result.className = "validation-result error";
        result.textContent =
          "❌ Cronograma necessita ajustes. Verifique sequência e dependências.";
      }

      updateScore();
    }, 2000);
  }

  validateResources() {
    const result = document.getElementById("resources-result");

    setTimeout(() => {
      const isValid =
        this.gameState.puzzle2.completed &&
        this.gameState.puzzle2.coordinationScore >= 60;

      if (isValid) {
        result.className = "validation-result success";
        result.textContent =
          "✅ Recursos validados: Entidades coordenadas e recursos adequados identificados.";

        this.gameState.puzzle4.validationStages.coherence = true;
        this.gameState.puzzle4.score = Math.min(
          20,
          this.gameState.puzzle4.score + 5
        );

        document.getElementById("btn-validate-resources").disabled = true;
        document.getElementById("btn-validate-resources").textContent =
          "✅ Validado";

        this.checkCoherenceCompletion();
      } else {
        result.className = "validation-result error";
        result.textContent =
          "❌ Recursos insuficientes. Estabeleça mais coordenações.";
      }

      updateScore();
    }, 2000);
  }

  checkCoherenceCompletion() {
    const objectives = document.getElementById(
      "btn-validate-objectives"
    ).disabled;
    const schedule = document.getElementById("btn-validate-schedule").disabled;
    const resources = document.getElementById(
      "btn-validate-resources"
    ).disabled;

    if (objectives && schedule && resources) {
      const stage = document.getElementById("stage-coherence");
      stage.classList.add("completed");
      stage.querySelector(".stage-status").textContent = "Completo";
      stage.querySelector(".stage-status").classList.remove("pending");
      stage.querySelector(".stage-status").classList.add("completed");

      showToast("🔍 Validação de coerência completada!", "success", 3000);
      this.updateValidationProgress();
    }
  }

  requestApproval(entityId) {
    const card = document.querySelector(`[data-entity-id="${entityId}"]`);
    const button = card.querySelector(".btn-request-approval");
    const followUpButton = card.querySelector(".btn-follow-up");

    button.disabled = true;
    button.textContent = "⏳ Processando...";

    // Simulate approval process
    setTimeout(() => {
      this.gameState.puzzle4.approvalStatus[entityId] = "approved";

      card.classList.add("approved");
      card.querySelector(".approval-status").textContent = "Aprovado";
      card.querySelector(".approval-status").classList.remove("pending");
      card.querySelector(".approval-status").classList.add("approved");

      // Update timeline
      const steps = card.querySelectorAll(".timeline-step");
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.remove("pending");
          step.classList.add("completed");
          step.querySelector(".step-time").textContent = "Concluído";
        }, index * 500);
      });

      button.textContent = "✅ Aprovado";
      followUpButton.disabled = false;

      // Award points
      this.gameState.puzzle4.score = Math.min(
        20,
        this.gameState.puzzle4.score + 3
      );

      showToast(
        `✅ Aprovação obtida: ${entityId.toUpperCase()}`,
        "success",
        3000
      );

      // Check if all approvals obtained
      if (Object.keys(this.gameState.puzzle4.approvalStatus).length >= 3) {
        this.completeApprovals();
      }

      updateScore();
    }, 3000);
  }

  followUpApproval(entityId) {
    showToast(
      `📞 Follow-up realizado com ${entityId.toUpperCase()}. Processo acelerado!`,
      "info",
      2000
    );
  }

  completeApprovals() {
    this.gameState.puzzle4.validationStages.approvals = true;

    const stage = document.getElementById("stage-approvals");
    stage.classList.add("completed");
    stage.querySelector(".stage-status").textContent = "Completo";
    stage.querySelector(".stage-status").classList.remove("pending");
    stage.querySelector(".stage-status").classList.add("completed");

    showToast("📋 Todas as aprovações obtidas!", "success", 3000);
    this.updateValidationProgress();
  }

  explainPrograms() {
    this.gameState.puzzle4.comprehensionLevel = Math.min(
      100,
      this.gameState.puzzle4.comprehensionLevel + 25
    );
    this.updateConsentInterface();
    showToast(
      "📚 Programas explicados à Felisbina. Compreensão aumentada!",
      "success",
      2000
    );
  }

  showTimeline() {
    this.gameState.puzzle4.comprehensionLevel = Math.min(
      100,
      this.gameState.puzzle4.comprehensionLevel + 20
    );
    this.updateConsentInterface();
    showToast(
      "📅 Cronograma apresentado à Felisbina. Expectativas alinhadas!",
      "success",
      2000
    );
  }

  addressConcerns() {
    this.gameState.puzzle4.comprehensionLevel = Math.min(
      100,
      this.gameState.puzzle4.comprehensionLevel + 30
    );
    this.updateConsentInterface();
    showToast(
      "💭 Dúvidas esclarecidas. Felisbina mais confiante!",
      "success",
      2000
    );
  }

  updateConsentInterface() {
    const moodIndicator = document.getElementById("mood-indicator");
    const comprehensionLevel = document.getElementById("comprehension-level");
    const dialogueBubble = document.getElementById("dialogue-bubble");

    const level = this.gameState.puzzle4.comprehensionLevel;

    if (comprehensionLevel) {
      comprehensionLevel.textContent = level + "%";
    }

    if (moodIndicator) {
      if (level >= 80) moodIndicator.textContent = "😊";
      else if (level >= 50) moodIndicator.textContent = "🙂";
      else if (level >= 25) moodIndicator.textContent = "😐";
      else moodIndicator.textContent = "😟";
    }

    if (dialogueBubble) {
      const messages = [
        "Preciso entender melhor o que vai acontecer...",
        "Estou a começar a perceber o plano...",
        "Acho que estou a compreender melhor...",
        "Sim, agora faz sentido! Estou preparada!",
      ];
      const messageIndex = Math.floor(level / 25);
      dialogueBubble.innerHTML = `<p>"${
        messages[Math.min(messageIndex, messages.length - 1)]
      }"</p>`;
    }

    // Update consent checklist
    const items = [
      "understanding-status",
      "consent-status",
      "expectations-status",
    ];
    items.forEach((itemId, index) => {
      const element = document.getElementById(itemId);
      if (element && level >= (index + 1) * 30) {
        element.textContent = "✅";
      }
    });

    // Enable finalize button when ready
    const finalizeButton = document.getElementById("btn-finalize-consent");
    if (finalizeButton && level >= 80) {
      finalizeButton.disabled = false;
    }
  }

  finalizeConsent() {
    if (this.gameState.puzzle4.comprehensionLevel >= 80) {
      this.gameState.puzzle4.validationStages.consent = true;
      this.gameState.puzzle4.score = Math.min(
        20,
        this.gameState.puzzle4.score + 5
      );

      const stage = document.getElementById("stage-consent");
      stage.classList.add("completed");
      stage.querySelector(".stage-status").textContent = "Completo";
      stage.querySelector(".stage-status").classList.remove("pending");
      stage.querySelector(".stage-status").classList.add("completed");

      document.getElementById("btn-finalize-consent").textContent =
        "✅ Consentimento Obtido";
      document.getElementById("btn-finalize-consent").disabled = true;

      showToast(
        "👤 Consentimento informado obtido com sucesso!",
        "success",
        3000
      );

      this.updateValidationProgress();
      this.completePuzzle4();
      updateScore();
    } else {
      showToast(
        "⚠️ Felisbina precisa compreender melhor o plano antes de dar consentimento!",
        "warning",
        3000
      );
    }
  }

  updateValidationProgress() {
    const completed = Object.values(
      this.gameState.puzzle4.validationStages
    ).filter(Boolean).length;
    const total = Object.keys(this.gameState.puzzle4.validationStages).length;
    const percentage = Math.round((completed / total) * 100);

    const circle = document.getElementById("validation-progress-circle");
    const percentageText = document.getElementById("validation-percentage");

    if (circle) {
      const circumference = 2 * Math.PI * 50; // radius = 50
      const offset = circumference - (percentage / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    if (percentageText) {
      percentageText.textContent = percentage + "%";
    }

    document.getElementById("puzzle4-progress").textContent = completed;
  }

  completePuzzle4() {
    const allStagesComplete = Object.values(
      this.gameState.puzzle4.validationStages
    ).every(Boolean);

    if (allStagesComplete) {
      this.gameState.puzzle4.completed = true;
      document.getElementById("btn-finalize-phase").style.display = "block";

      showToast(
        "✅ Puzzle 4 Completado! Todas as validações e aprovações obtidas!",
        "success",
        4000
      );

      // Final bonus for complete validation
      const bonus = Math.min(2, 20 - this.gameState.puzzle4.score);
      this.gameState.puzzle4.score = Math.min(
        20,
        this.gameState.puzzle4.score + bonus
      );
      showToast(
        `🌟 Bónus de validação completa: +${bonus} pontos!`,
        "success",
        3000
      );

      updateScore();
    }
  }
}

// Make the class globally available
window.EscapeRoomPhase3 = EscapeRoomPhase3;
