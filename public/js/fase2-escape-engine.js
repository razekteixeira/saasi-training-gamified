/**
 * SAASI Escape Room - Phase 2 Engine
 * Complete Interactive Implementation following ESCAPE_ROOM_COMPLETE_SPECIFICATION.md
 * Pattern: Following fase1-escape.html exactly
 *
 * 4 Interactive Puzzles:
 * 1. Problem Mapping & Prioritization (Drag & Drop)
 * 2. Benefits Analysis & Optimization (Real-time Calculator)
 * 3. Entity Articulation Network (Interactive Map)
 * 4. Intervention Timeline Builder (Drag to Timeline)
 *
 * @version 1.0
 * @date January 2025
 */

class EscapeRoomPhase2 {
  constructor(gameState) {
    this.gameState = gameState;
    this.timers = {};
    this.dragElements = {};

    // Data for all puzzles
    this.problemsData = [
      {
        id: "dependencia_emocional",
        title: "🧠 Dependência emocional do pai",
        description: "Impede autonomia e tomada de decisões independentes",
        category: "psicossocial",
        correctPriority: 1, // Critical
        urgency: "high",
        impact: 8,
        complexity: 7,
        points: 5,
      },
      {
        id: "perda_suporte_irmao",
        title: "👥 Perda de suporte familiar (irmão)",
        description: "Cortou relação após discussão sobre herança",
        category: "social",
        correctPriority: 1, // Critical
        urgency: "high",
        impact: 7,
        complexity: 6,
        points: 5,
      },
      {
        id: "isolamento_social",
        title: "🏠 Isolamento social significativo",
        description: "Falta de rede de apoio e contactos sociais",
        category: "social",
        correctPriority: 2, // High
        urgency: "medium",
        impact: 6,
        complexity: 5,
        points: 4,
      },
      {
        id: "gestao_financeira",
        title: "💰 Gestão financeira independente",
        description: "Nova responsabilidade após morte do pai",
        category: "competencias",
        correctPriority: 2, // High
        urgency: "high",
        impact: 6,
        complexity: 4,
        points: 4,
      },
      {
        id: "baixa_qualificacao",
        title: "📚 Baixa qualificação profissional",
        description: "Apenas 9º ano, limita oportunidades de emprego",
        category: "formacao",
        correctPriority: 3, // Medium
        urgency: "low",
        impact: 5,
        complexity: 6,
        points: 3,
      },
      {
        id: "experiencia_limitada",
        title: "💼 Experiência profissional limitada",
        description: "Apenas 6 meses de trabalho em limpeza",
        category: "profissional",
        correctPriority: 3, // Medium
        urgency: "high",
        impact: 4,
        complexity: 3,
        points: 3,
      },
    ];

    this.benefitsData = [
      {
        id: "apoio_alimentar",
        title: "🍽️ Apoio Alimentar de Emergência",
        value: 50, // €/month
        duration: 6, // months
        eligible: true,
        requirements: ["RSI ativo", "Situação vulnerável"],
        points: 6,
      },
      {
        id: "fundo_emergencia",
        title: "💰 Fundo de Emergência Social",
        value: 300, // € one-time
        duration: 1,
        eligible: true,
        requirements: ["Dívidas comprovadas", "RSI ativo"],
        points: 8,
      },
      {
        id: "tarifa_social",
        title: "⚡ Tarifa Social de Energia",
        value: 15, // € saved per month
        duration: 12,
        eligible: true,
        requirements: ["RSI ativo", "Rendimentos baixos"],
        points: 5,
      },
      {
        id: "passe_social",
        title: "🚌 Passe Social +",
        value: 24, // € saved per month (30-6)
        duration: 12,
        eligible: true,
        requirements: ["RSI ativo", "Idade 18-64"],
        points: 4,
      },
    ];

    this.entitiesData = [
      {
        id: "centro_saude",
        name: "Centro de Saúde de Ramalde",
        specialties: ["Psicologia", "Apoio Psicossocial"],
        location: "Porto - Ramalde",
        contact: "225 073 200",
        responseTime: "2-3 semanas",
        adequate: true,
        points: 8,
        position: { top: "20%", left: "20%" },
      },
      {
        id: "iefp",
        name: "IEFP Porto",
        specialties: ["Qualifica", "Formação", "Emprego"],
        location: "Porto",
        contact: "225 073 000",
        responseTime: "3-5 dias úteis",
        adequate: true,
        points: 9,
        position: { top: "20%", left: "75%" },
      },
      {
        id: "ipss_local",
        name: "IPSS Solidariedade Social",
        specialties: ["Grupos Apoio", "Atividades Sociais"],
        location: "Porto",
        contact: "225 073 300",
        responseTime: "1-2 semanas",
        adequate: true,
        points: 7,
        position: { top: "75%", left: "20%" },
      },
      {
        id: "banco_alimentar",
        name: "Banco Alimentar do Porto",
        specialties: ["Apoio Alimentar"],
        location: "Porto",
        contact: "225 073 400",
        responseTime: "1 semana",
        adequate: false, // Not priority for Felisbina's main issues
        points: 2,
        position: { top: "75%", left: "75%" },
      },
    ];

    this.interventionsData = [
      {
        id: "consulta_psicologia_inicial",
        title: "Primeira consulta de psicologia",
        icon: "🩺",
        duration: "1h",
        frequency: "Única",
        priority: "Alta",
        entity: "Centro de Saúde",
        correctMonth: 1,
        prerequisites: [],
        points: 4,
      },
      {
        id: "avaliacao_iefp",
        title: "Avaliação inicial no IEFP",
        icon: "📋",
        duration: "2h",
        frequency: "Única",
        priority: "Alta",
        entity: "IEFP",
        correctMonth: 2,
        prerequisites: [],
        points: 4,
      },
      {
        id: "inicio_qualifica",
        title: "Início do Programa Qualifica",
        icon: "💼",
        duration: "Contínuo",
        frequency: "Diária",
        priority: "Alta",
        entity: "IEFP",
        correctMonth: 3,
        prerequisites: ["avaliacao_iefp"],
        points: 5,
      },
      {
        id: "grupos_apoio_inicio",
        title: "Integração em grupos de apoio social",
        icon: "👥",
        duration: "2h",
        frequency: "Semanal",
        priority: "Média",
        entity: "IPSS",
        correctMonth: 2,
        prerequisites: [],
        points: 4,
      },
      {
        id: "consultas_regulares",
        title: "Consultas de psicologia quinzenais",
        icon: "🧠",
        duration: "1h",
        frequency: "Quinzenal",
        priority: "Alta",
        entity: "Centro de Saúde",
        correctMonth: 3,
        prerequisites: ["consulta_psicologia_inicial"],
        points: 4,
      },
      {
        id: "rvcc_desenvolvimento",
        title: "Desenvolvimento do RVCC 12º ano",
        icon: "📚",
        duration: "Contínuo",
        frequency: "Semanal",
        priority: "Média",
        entity: "IEFP",
        correctMonth: 4,
        prerequisites: ["inicio_qualifica"],
        points: 4,
      },
      {
        id: "acompanhamento_grupo_apoio",
        title: "Acompanhamento em grupos de apoio",
        icon: "🤝",
        duration: "2h",
        frequency: "Semanal",
        priority: "Média",
        entity: "IPSS",
        correctMonth: 4,
        prerequisites: ["grupos_apoio_inicio"],
        points: 3,
      },
      {
        id: "formacao_competencias",
        title: "Formação em competências profissionais",
        icon: "🛠️",
        duration: "4h",
        frequency: "Semanal",
        priority: "Média",
        entity: "IEFP",
        correctMonth: 5,
        prerequisites: ["rvcc_desenvolvimento"],
        points: 4,
      },
      {
        id: "avaliacao_intermedia",
        title: "Avaliação intermédia do progresso",
        icon: "📊",
        duration: "1h",
        frequency: "Única",
        priority: "Média",
        entity: "Centro de Saúde",
        correctMonth: 5,
        prerequisites: ["consultas_regulares"],
        points: 3,
      },
      {
        id: "estagio_profissional",
        title: "Estágio profissional (Qualifica)",
        icon: "👔",
        duration: "8h",
        frequency: "Diária",
        priority: "Alta",
        entity: "IEFP",
        correctMonth: 6,
        prerequisites: ["formacao_competencias"],
        points: 5,
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
  }

  // ===== PUZZLE 1: PROBLEM MAPPING & PRIORITIZATION =====
  initializePuzzle1() {
    console.log("Initializing Puzzle 1: Problem Mapping");
    this.createProblemsCards();
    this.setupDragAndDrop();
    this.startTimer(1, 480); // 8 minutes

    showToast(
      "🗺️ Arraste cada problema para a zona de prioridade correta!",
      "info",
      4000
    );
  }

  createProblemsCards() {
    const container = document.getElementById("problems-list");
    container.innerHTML = "";

    this.problemsData.forEach((problem) => {
      const card = document.createElement("div");
      card.className = "problem-card";
      card.draggable = true;
      card.dataset.problemId = problem.id;
      card.dataset.correctPriority = problem.correctPriority;

      card.innerHTML = `
                <div class="problem-header">
                    <h4>${problem.title}</h4>
                </div>
                <p class="problem-description">${problem.description}</p>
                <div class="problem-metrics">
                    <span class="impact-score">Impacto: ${problem.impact}/10</span>
                    <span class="complexity-score">Complexidade: ${problem.complexity}/10</span>
                </div>
            `;

      container.appendChild(card);
    });
  }

  setupDragAndDrop() {
    // Setup drag events for problem cards
    document.querySelectorAll(".problem-card").forEach((card) => {
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", card.dataset.problemId);
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
    });

    // Setup drop zones
    document.querySelectorAll(".priority-zone").forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drop-target");
      });

      zone.addEventListener("dragleave", () => {
        zone.classList.remove("drop-target");
      });

      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drop-target");

        const problemId = e.dataTransfer.getData("text/plain");
        const problemCard = document.querySelector(
          `[data-problem-id="${problemId}"]`
        );
        const zonePriority = parseInt(zone.dataset.priority);
        const correctPriority = parseInt(problemCard.dataset.correctPriority);

        // Move card to zone
        const droppedArea = zone.querySelector(".dropped-problems");
        if (!droppedArea) {
          const newDropArea = document.createElement("div");
          newDropArea.className = "dropped-problems";
          newDropArea.dataset.zone = zone.dataset.priority;
          zone.appendChild(newDropArea);
        }

        zone.querySelector(".dropped-problems").appendChild(problemCard);
        problemCard.style.margin = "5px 0";
        problemCard.style.transform = "scale(0.9)";

        // Evaluate placement
        this.evaluateProblemPlacement(problemId, zonePriority, correctPriority);
      });
    });
  }

  evaluateProblemPlacement(problemId, zonePriority, correctPriority) {
    const problem = this.problemsData.find((p) => p.id === problemId);
    const card = document.querySelector(`[data-problem-id="${problemId}"]`);

    if (zonePriority === correctPriority) {
      // Correct placement
      card.style.borderColor = "#4caf50";
      card.style.background = "linear-gradient(135deg, #e8f5e9, #c8e6c9)";
      this.gameState.puzzle1.score = Math.min(
        this.gameState.puzzle1.score + problem.points,
        25
      );
      this.gameState.puzzle1.problemsPlaced[problemId] = true;

      showToast(
        `✅ ${problem.title
          .split(" ")
          .slice(1)
          .join(" ")} - Prioridade CORRETA! (+${problem.points} pontos)`,
        "success",
        2000
      );
    } else {
      // Incorrect placement
      card.style.borderColor = "#f44336";
      card.style.background = "linear-gradient(135deg, #ffebee, #ffcdd2)";
      card.classList.add("shake");
      this.gameState.puzzle1.problemsPlaced[problemId] = false;

      showToast(
        `❌ ${problem.title
          .split(" ")
          .slice(1)
          .join(" ")} - Prioridade INCORRETA! Tente novamente.`,
        "error",
        3000
      );

      // Allow retry - remove from zone after shake animation
      setTimeout(() => {
        card.classList.remove("shake");
        document.getElementById("problems-list").appendChild(card);
        card.style.transform = "scale(1)";
        card.style.borderColor = "";
        card.style.background = "";
      }, 1000);
      return;
    }

    // Update progress
    this.gameState.puzzle1.progress++;
    document.getElementById("puzzle1-progress").textContent =
      this.gameState.puzzle1.progress;

    // Check completion
    if (this.gameState.puzzle1.progress >= 6) {
      this.completePuzzle1();
    }
  }

  completePuzzle1() {
    this.gameState.puzzle1.completed = true;
    this.stopTimer(1);

    // Bonus for time remaining
    const timeBonus = Math.floor(this.gameState.puzzle1.timeRemaining / 60) * 2;
    this.gameState.puzzle1.score = Math.min(
      this.gameState.puzzle1.score + timeBonus,
      25
    );

    document.getElementById("btn-continue-puzzle2").style.display = "block";
    showToast(
      `🎉 Puzzle 1 Concluído! Pontuação: ${this.gameState.puzzle1.score}/25 (+${timeBonus} bónus tempo)`,
      "success",
      4000
    );

    updateScore();
  }

  // ===== PUZZLE 2: BENEFITS ANALYSIS & OPTIMIZATION =====
  initializePuzzle2() {
    console.log("Initializing Puzzle 2: Benefits Analysis");
    this.createBenefitsCards();

    showToast(
      "💰 Selecione os benefícios adequados para otimizar a situação financeira!",
      "info",
      4000
    );
  }

  createBenefitsCards() {
    const container = document.getElementById("benefits-list");
    container.innerHTML = "";

    this.benefitsData.forEach((benefit) => {
      const card = document.createElement("div");
      card.className = "benefit-card";
      card.dataset.benefitId = benefit.id;
      card.onclick = () => this.toggleBenefit(benefit.id);

      const requirements = benefit.requirements
        .map((req) => `<span class="requirement met">✓ ${req}</span>`)
        .join("");

      card.innerHTML = `
                <div class="benefit-icon">${benefit.title.split(" ")[0]}</div>
                <h4>${benefit.title.split(" ").slice(1).join(" ")}</h4>
                <div class="benefit-value">+${benefit.value}€${
        benefit.duration > 1 ? "/mês" : " único"
      } ${benefit.duration > 1 ? `× ${benefit.duration} meses` : ""}</div>
                <div class="eligibility-check">
                    ${requirements}
                </div>
            `;

      if (!benefit.eligible) {
        card.style.opacity = "0.6";
        card.style.border = "2px solid #f44336";
        const reqContainer = card.querySelector(".eligibility-check");
        reqContainer.innerHTML = `<span class="requirement not-met">❌ Não elegível atualmente</span>`;
      }

      container.appendChild(card);
    });
  }

  toggleBenefit(benefitId) {
    const benefit = this.benefitsData.find((b) => b.id === benefitId);
    const card = document.querySelector(`[data-benefit-id="${benefitId}"]`);

    if (this.gameState.puzzle2.selectedBenefits.includes(benefitId)) {
      // Deselect
      this.gameState.puzzle2.selectedBenefits =
        this.gameState.puzzle2.selectedBenefits.filter(
          (id) => id !== benefitId
        );
      card.classList.remove("selected");
      showToast(`➖ ${benefit.title} removido`, "info", 1500);
    } else {
      // Select
      this.gameState.puzzle2.selectedBenefits.push(benefitId);
      card.classList.add("selected");
      showToast(`➕ ${benefit.title} selecionado`, "success", 1500);
    }

    // Update real-time calculation display
    this.updateOptimizationPreview();
  }

  updateOptimizationPreview() {
    // This could show a live preview, but we'll do full calculation on button click
    const selectedCount = this.gameState.puzzle2.selectedBenefits.length;
    if (selectedCount > 0) {
      document.querySelector(
        "button[onclick='calculateOptimization()']"
      ).textContent = `📊 Calcular Otimização (${selectedCount} benefícios)`;
    }
  }

  calculateOptimization() {
    let monthlyIncome = 566.78; // RSI + PSI
    let monthlyExpenses = 450;
    let oneTimeSupport = 0;
    let totalMonthlyBenefit = 0;
    let score = 0;

    this.gameState.puzzle2.selectedBenefits.forEach((benefitId) => {
      const benefit = this.benefitsData.find((b) => b.id === benefitId);

      if (benefit.eligible) {
        if (benefit.duration === 1) {
          oneTimeSupport += benefit.value;
        } else {
          totalMonthlyBenefit += benefit.value;
          if (benefitId === "tarifa_social" || benefitId === "passe_social") {
            monthlyExpenses -= benefit.value; // These are savings
          } else {
            monthlyIncome += benefit.value;
          }
        }
        score += benefit.points;
      } else {
        score += benefit.points; // Usually negative for wrong selections
      }
    });

    const newBalance = monthlyIncome - monthlyExpenses;
    const improvement = newBalance - this.gameState.puzzle2.currentBalance;
    const improvementPercentage =
      (improvement / this.gameState.puzzle2.currentBalance) * 100;

    // Update display
    document.getElementById("optimization-results").style.display = "block";
    document.getElementById(
      "optimized-balance"
    ).textContent = `+${newBalance.toFixed(2)}€/mês`;
    document.getElementById(
      "improvement-amount"
    ).textContent = `+${improvement.toFixed(
      2
    )}€ melhoria (${improvementPercentage.toFixed(1)}%)`;

    // Score based on improvement percentage
    if (improvementPercentage >= 30) score += 15; // Excellent
    else if (improvementPercentage >= 20) score += 12; // Good
    else if (improvementPercentage >= 10) score += 8; // OK
    else score += 3; // Poor

    this.gameState.puzzle2.score = Math.max(0, Math.min(score, 25));
    this.gameState.puzzle2.optimizedBalance = newBalance;
    this.gameState.puzzle2.improvement = improvementPercentage;

    if (improvementPercentage >= 20) {
      this.completePuzzle2();
    } else {
      showToast(
        `📊 Melhoria de ${improvementPercentage.toFixed(
          1
        )}%. Meta: >20% para continuar.`,
        "warning",
        4000
      );
    }

    updateScore();
  }

  completePuzzle2() {
    this.gameState.puzzle2.completed = true;
    document.getElementById("btn-continue-puzzle3").style.display = "block";

    showToast(
      `🎉 Puzzle 2 Concluído! Otimização: ${this.gameState.puzzle2.improvement.toFixed(
        1
      )}%`,
      "success",
      4000
    );
  }

  // ===== PUZZLE 3: ENTITY ARTICULATION NETWORK =====
  initializePuzzle3() {
    console.log("Initializing Puzzle 3: Entity Network");
    this.createEntityNodes();

    showToast(
      "🤝 Conecte a Felisbina com as entidades adequadas. Meta: 3 conexões eficazes!",
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
      node.style.top = entity.position.top;
      node.style.left = entity.position.left;
      node.onclick = () => this.connectEntity(entity.id);

      const statusClass = entity.adequate ? "available" : "busy";

      node.innerHTML = `
                <div class="entity-avatar">${entity.name.charAt(0)}</div>
                <div class="entity-info">
                    <h4>${entity.name}</h4>
                    <div class="specialties">
                        ${entity.specialties
                          .map((s) => `<span class="specialty">${s}</span>`)
                          .join("")}
                    </div>
                </div>
            `;

      container.appendChild(node);
    });
  }

  connectEntity(entityId) {
    const entity = this.entitiesData.find((e) => e.id === entityId);
    const node = document.querySelector(`[data-entity-id="${entityId}"]`);

    if (this.gameState.puzzle3.connectedEntities.includes(entityId)) {
      // Disconnect
      this.gameState.puzzle3.connectedEntities =
        this.gameState.puzzle3.connectedEntities.filter(
          (id) => id !== entityId
        );
      node.classList.remove("connected");
      this.gameState.puzzle3.progress--;

      if (entity.adequate) {
        this.gameState.puzzle3.score = Math.max(
          this.gameState.puzzle3.score - entity.points,
          0
        );
      }

      showToast(`➖ ${entity.name} desconectado`, "info", 2000);
    } else {
      // Connect
      this.gameState.puzzle3.connectedEntities.push(entityId);
      node.classList.add("connected");
      this.gameState.puzzle3.progress++;

      if (entity.adequate) {
        this.gameState.puzzle3.score = Math.min(
          this.gameState.puzzle3.score + entity.points,
          25
        );
        showToast(
          `✅ ${entity.name} conectado! (+${entity.points} pontos)`,
          "success",
          2500
        );
      } else {
        this.gameState.puzzle3.score = Math.min(
          this.gameState.puzzle3.score + entity.points,
          25
        ); // Usually low points
        showToast(
          `⚠️ ${entity.name} conectado (não prioritário para o caso)`,
          "warning",
          3000
        );
      }

      // Create visual connection line
      this.createConnectionLine(entityId);
    }

    // Update coordination timeline
    this.updateCoordinationTimeline();

    // Update progress
    document.getElementById("puzzle3-progress").textContent =
      this.gameState.puzzle3.progress;

    // Check completion
    if (this.gameState.puzzle3.progress >= 3) {
      this.completePuzzle3();
    }

    updateScore();
  }

  createConnectionLine(entityId) {
    const felisbinaNode = document.getElementById("felisbina-node");
    const entityNode = document.querySelector(`[data-entity-id="${entityId}"]`);
    const canvas = document.getElementById("network-canvas");

    // Simple line representation (in a real implementation, you'd use SVG or Canvas)
    const line = document.createElement("div");
    line.className = "connection-line active";
    line.dataset.connection = entityId;

    // Basic positioning between nodes (simplified)
    const felisbinaRect = felisbinaNode.getBoundingClientRect();
    const entityRect = entityNode.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // This is a simplified line positioning - in production you'd want proper SVG lines
    line.style.position = "absolute";
    line.style.left = "50%";
    line.style.top = "50%";
    line.style.width = "2px";
    line.style.height = "50px";
    line.style.background = "#4caf50";

    canvas.appendChild(line);
  }

  updateCoordinationTimeline() {
    const timeline = document.getElementById("coordination-timeline");
    timeline.innerHTML = "";

    this.gameState.puzzle3.connectedEntities.forEach((entityId, index) => {
      const entity = this.entitiesData.find((e) => e.id === entityId);
      const week = index + 1;

      const step = document.createElement("div");
      step.className = "timeline-step";
      step.innerHTML = `
                <span class="week-label">Semana ${week}</span>
                <div class="actions-list">
                    Contactar ${entity.name}<br>
                    <small>Tempo resposta: ${entity.responseTime}</small>
                </div>
            `;

      timeline.appendChild(step);
    });
  }

  completePuzzle3() {
    this.gameState.puzzle3.completed = true;
    document.getElementById("btn-continue-puzzle4").style.display = "block";

    showToast(
      `🎉 Puzzle 3 Concluído! Rede estabelecida com ${this.gameState.puzzle3.progress} entidades`,
      "success",
      4000
    );
  }

  // ===== PUZZLE 4: INTERVENTION TIMELINE BUILDER =====
  initializePuzzle4() {
    console.log("Initializing Puzzle 4: Timeline Builder");
    this.createInterventionCards();
    this.createTimelineGrid();
    this.setupTimelineDragAndDrop();

    showToast(
      "📅 Arraste intervenções para o mês correto. Respeite pré-requisitos!",
      "info",
      4000
    );
  }

  createInterventionCards() {
    const container = document.getElementById("interventions-library");
    container.innerHTML = "<h3>📚 Intervenções Disponíveis</h3>";

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "intervention-cards";

    this.interventionsData.forEach((intervention) => {
      const card = document.createElement("div");
      card.className = "intervention-card";
      card.draggable = true;
      card.dataset.interventionId = intervention.id;
      card.dataset.correctMonth = intervention.correctMonth;

      card.innerHTML = `
                <div class="intervention-header">
                    <span class="intervention-icon">${intervention.icon}</span>
                    <h4>${intervention.title}</h4>
                </div>
                <div class="intervention-details">
                    <div class="duration">Duração: ${
                      intervention.duration
                    }</div>
                    <div class="prerequisites">Pré-requisitos: ${
                      intervention.prerequisites.length > 0
                        ? intervention.prerequisites.join(", ")
                        : "Nenhum"
                    }</div>
                    <div class="optimal-timing">Ideal: Mês ${
                      intervention.correctMonth
                    } (${this.months[intervention.correctMonth - 1]})</div>
                </div>
            `;

      // Drag events
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", intervention.id);
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });

      cardsContainer.appendChild(card);
    });

    container.appendChild(cardsContainer);
  }

  createTimelineGrid() {
    const grid = document.getElementById("timeline-grid");
    grid.innerHTML = "";

    for (let month = 1; month <= 7; month++) {
      const column = document.createElement("div");
      column.className = "month-column";
      column.dataset.month = month;

      column.innerHTML = `
                <div class="month-header">
                    <h4>Mês ${month} - ${this.months[month - 1]}</h4>
                    <div class="capacity-indicator">
                        <span class="capacity-used">0</span>/<span class="capacity-max">4</span> atividades
                    </div>
                </div>
                <div class="month-slots">
                    <div class="time-slot" data-week="1"></div>
                    <div class="time-slot" data-week="2"></div>
                    <div class="time-slot" data-week="3"></div>
                    <div class="time-slot" data-week="4"></div>
                </div>
            `;

      grid.appendChild(column);
    }
  }

  setupTimelineDragAndDrop() {
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

        const interventionId = e.dataTransfer.getData("text/plain");
        const intervention = this.interventionsData.find(
          (i) => i.id === interventionId
        );
        const month = parseInt(slot.closest(".month-column").dataset.month);

        this.placeIntervention(interventionId, month, slot);
      });
    });
  }

  placeIntervention(interventionId, month, slot) {
    const intervention = this.interventionsData.find(
      (i) => i.id === interventionId
    );
    const card = document.querySelector(
      `[data-intervention-id="${interventionId}"]`
    );

    // Check prerequisites
    const prerequisitesMet = this.checkPrerequisites(intervention, month);
    if (!prerequisitesMet) {
      showToast(
        `❌ Pré-requisitos não cumpridos para ${intervention.title}`,
        "error",
        3000
      );
      return;
    }

    // Check if slot is empty
    if (slot.children.length > 0) {
      showToast("⚠️ Slot já ocupado! Escolha outro.", "warning", 2000);
      return;
    }

    // Place intervention
    const miniCard = document.createElement("div");
    miniCard.className = "placed-intervention";
    miniCard.innerHTML = `${intervention.icon} ${intervention.title}`;
    miniCard.style.cssText = `
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 5px 8px;
            border-radius: 8px;
            font-size: 0.8rem;
            margin: 2px 0;
            cursor: pointer;
        `;

    // Allow removal by clicking
    miniCard.onclick = () => {
      slot.removeChild(miniCard);
      card.classList.remove("placed");
      card.style.pointerEvents = "auto";
      delete this.gameState.puzzle4.placedInterventions[interventionId];
      this.gameState.puzzle4.progress--;
      this.updateTimelineProgress();
    };

    slot.appendChild(miniCard);

    // Mark original card as placed
    card.classList.add("placed");
    card.style.pointerEvents = "none";

    // Record placement
    this.gameState.puzzle4.placedInterventions[interventionId] = month;

    // Evaluate placement
    this.evaluateInterventionPlacement(interventionId, month);

    // Update progress
    this.gameState.puzzle4.progress++;
    this.updateTimelineProgress();

    // Update capacity indicator
    const monthColumn = slot.closest(".month-column");
    const usedSlots = monthColumn.querySelectorAll(
      ".placed-intervention"
    ).length;
    monthColumn.querySelector(".capacity-used").textContent = usedSlots;
  }

  checkPrerequisites(intervention, month) {
    if (intervention.prerequisites.length === 0) return true;

    return intervention.prerequisites.every((prereqId) => {
      const prereqMonth = this.gameState.puzzle4.placedInterventions[prereqId];
      return prereqMonth && prereqMonth < month;
    });
  }

  evaluateInterventionPlacement(interventionId, month) {
    const intervention = this.interventionsData.find(
      (i) => i.id === interventionId
    );

    if (month === intervention.correctMonth) {
      this.gameState.puzzle4.score = Math.min(
        this.gameState.puzzle4.score + intervention.points,
        25
      );
      showToast(
        `✅ ${intervention.title} - Mês CORRETO! (+${intervention.points} pontos)`,
        "success",
        2500
      );
    } else if (Math.abs(month - intervention.correctMonth) === 1) {
      // Close enough, partial points
      const partialPoints = Math.floor(intervention.points * 0.7);
      this.gameState.puzzle4.score = Math.min(
        this.gameState.puzzle4.score + partialPoints,
        25
      );
      showToast(
        `🟡 ${intervention.title} - Mês ACEITÁVEL (+${partialPoints} pontos)`,
        "warning",
        2500
      );
    } else {
      showToast(
        `❌ ${intervention.title} - Mês subótimo. Ideal: ${intervention.correctMonth}`,
        "error",
        3000
      );
    }

    updateScore();
  }

  updateTimelineProgress() {
    document.getElementById("puzzle4-progress").textContent =
      this.gameState.puzzle4.progress;

    // Check completion
    if (this.gameState.puzzle4.progress >= 6) {
      // At least 6 interventions
      document.getElementById("btn-finalize").style.display = "block";
    }
  }

  validateTimeline() {
    let allValid = true;
    const validationItems = document.querySelectorAll(".validation-item");

    // Check prerequisites
    const prerequisitesValid = this.validatePrerequisites();
    this.updateValidationStatus("prerequisites", prerequisitesValid);
    allValid = allValid && prerequisitesValid;

    // Check capacity
    const capacityValid = this.validateCapacity();
    this.updateValidationStatus("capacity", capacityValid);
    allValid = allValid && capacityValid;

    // Check sequencing
    const sequencingValid = this.validateSequencing();
    this.updateValidationStatus("sequencing", sequencingValid);
    allValid = allValid && sequencingValid;

    if (allValid) {
      this.gameState.puzzle4.score = Math.min(
        this.gameState.puzzle4.score + 5,
        25
      ); // Bonus for valid timeline
      showToast(
        "✅ Timeline válida! Cronograma aprovado (+5 bónus)",
        "success",
        4000
      );
      this.completePuzzle4();
    } else {
      showToast(
        "⚠️ Timeline tem problemas. Verifique os indicadores.",
        "warning",
        4000
      );
    }

    updateScore();
  }

  validatePrerequisites() {
    // Check if all placed interventions have their prerequisites met
    for (const [interventionId, month] of Object.entries(
      this.gameState.puzzle4.placedInterventions
    )) {
      const intervention = this.interventionsData.find(
        (i) => i.id === interventionId
      );
      if (!this.checkPrerequisites(intervention, month)) {
        return false;
      }
    }
    return true;
  }

  validateCapacity() {
    // Check if no month has more than 4 activities
    const monthCounts = {};
    for (const month of Object.values(
      this.gameState.puzzle4.placedInterventions
    )) {
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    }

    return Object.values(monthCounts).every((count) => count <= 4);
  }

  validateSequencing() {
    // Check if interventions are in logical sequence
    const criticalPath = [
      "consulta_psicologia_inicial",
      "avaliacao_iefp",
      "inicio_qualifica",
    ];

    for (let i = 1; i < criticalPath.length; i++) {
      const current =
        this.gameState.puzzle4.placedInterventions[criticalPath[i]];
      const previous =
        this.gameState.puzzle4.placedInterventions[criticalPath[i - 1]];

      if (!current || !previous || current <= previous) {
        return false;
      }
    }

    return true;
  }

  updateValidationStatus(checkType, isValid) {
    const item = document.querySelector(`[data-check="${checkType}"]`);
    const status = item.querySelector(".check-status");

    if (isValid) {
      status.textContent = "Válido";
      status.className = "check-status valid";
    } else {
      status.textContent = "Inválido";
      status.className = "check-status invalid";
    }
  }

  optimizeTimeline() {
    // Auto-place remaining interventions in optimal positions
    const unplaced = this.interventionsData.filter(
      (i) => !this.gameState.puzzle4.placedInterventions[i.id]
    );

    unplaced.forEach((intervention) => {
      const optimalMonth = intervention.correctMonth;

      // Find available slot in optimal month
      const monthColumn = document.querySelector(
        `[data-month="${optimalMonth}"]`
      );
      const availableSlot = monthColumn.querySelector(
        ".time-slot:not(:has(.placed-intervention))"
      );

      if (availableSlot) {
        this.placeIntervention(intervention.id, optimalMonth, availableSlot);
      }
    });

    showToast("⚡ Timeline otimizada automaticamente!", "info", 3000);
  }

  completePuzzle4() {
    this.gameState.puzzle4.completed = true;
    showToast(
      `🎉 Puzzle 4 Concluído! Timeline validada com ${this.gameState.puzzle4.progress} intervenções`,
      "success",
      4000
    );
  }

  // ===== TIMER SYSTEM =====
  startTimer(puzzleNumber, seconds) {
    this.gameState[`puzzle${puzzleNumber}`].timeRemaining = seconds;

    this.timers[puzzleNumber] = setInterval(() => {
      this.gameState[`puzzle${puzzleNumber}`].timeRemaining--;
      const remaining = this.gameState[`puzzle${puzzleNumber}`].timeRemaining;

      if (document.getElementById(`timer${puzzleNumber}`)) {
        const minutes = Math.floor(remaining / 60);
        const secs = remaining % 60;
        document.getElementById(
          `timer${puzzleNumber}`
        ).textContent = `${minutes}:${secs.toString().padStart(2, "0")}`;

        // Warning colors
        if (remaining <= 60) {
          document.getElementById(`timer${puzzleNumber}`).style.color =
            "#f44336";
        } else if (remaining <= 120) {
          document.getElementById(`timer${puzzleNumber}`).style.color =
            "#ff9800";
        }
      }

      if (remaining <= 0) {
        this.stopTimer(puzzleNumber);
        this.handleTimeOut(puzzleNumber);
      }
    }, 1000);
  }

  stopTimer(puzzleNumber) {
    if (this.timers[puzzleNumber]) {
      clearInterval(this.timers[puzzleNumber]);
      delete this.timers[puzzleNumber];
    }
  }

  handleTimeOut(puzzleNumber) {
    showToast(
      `⏰ Tempo esgotado no Puzzle ${puzzleNumber}! Pode continuar mas sem bónus de tempo.`,
      "warning",
      4000
    );

    // Allow continuation with reduced score
    if (puzzleNumber === 1 && this.gameState.puzzle1.progress >= 4) {
      document.getElementById("btn-continue-puzzle2").style.display = "block";
    }
  }
}

// Make it globally available
window.EscapeRoomPhase2 = EscapeRoomPhase2;
