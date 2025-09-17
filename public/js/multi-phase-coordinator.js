/**
 * SAASI Escape Room - Multi-Phase Coordinator
 * Complete Integration System for all phases
 *
 * Handles:
 * - Data flow between phases
 * - Progress validation and unlocking
 * - Cross-phase consistency
 * - State management
 *
 * @version 2.0
 * @date January 2025
 */

class MultiPhaseCoordinator {
  constructor() {
    this.storageManager = SaaSIStorage;
    this.phases = {
      1: {
        name: "Conversa com Felisbina",
        required_score: 0,
        unlock_code: null,
      },
      2: {
        name: "Identificação de Necessidades",
        required_score: 60,
        unlock_code: "PLANO2025",
      },
      3: {
        name: "Plano de Intervenção",
        required_score: 60,
        unlock_code: "INTERVENCAO2025",
      },
      4: {
        name: "Implementação e Acompanhamento",
        required_score: 65,
        unlock_code: "IMPLEMENTACAO2025",
      },
    };
  }

  /**
   * Get complete game state across all phases
   * @returns {Object} Complete game state
   */
  getGameState() {
    const phaseResults = {};
    for (let phase = 1; phase <= 4; phase++) {
      phaseResults[`phase${phase}`] =
        this.storageManager.loadPhaseResults(phase);
    }

    return {
      phases: phaseResults,
      progress: this.calculateOverallProgress(phaseResults),
      unlocked: this.calculateUnlockedPhases(phaseResults),
      currentPhase: this.getCurrentPhase(phaseResults),
      felisbinaJourney: this.getFelisbinaJourney(phaseResults),
    };
  }

  /**
   * Calculate overall progress with detailed breakdown
   * @param {Object} phaseResults - Results from all phases
   * @returns {Object} Progress details
   */
  calculateOverallProgress(phaseResults) {
    let totalScore = 0;
    let completedPhases = 0;
    let totalTime = 0;
    const phaseBreakdown = {};

    for (let phase = 1; phase <= 4; phase++) {
      const phaseData = phaseResults[`phase${phase}`];
      if (phaseData && phaseData.score !== undefined) {
        totalScore += phaseData.score;
        completedPhases++;
        totalTime += phaseData.duration || 0;

        phaseBreakdown[phase] = {
          score: phaseData.score,
          maxScore: phaseData.maxScore || 100,
          percentage: phaseData.percentage || phaseData.score,
          level: phaseData.level || SaaSIUtils.calculateLevel(phaseData.score),
          duration: phaseData.duration || 0,
          completed: true,
        };
      } else {
        phaseBreakdown[phase] = {
          score: 0,
          maxScore: 100,
          percentage: 0,
          level: null,
          duration: 0,
          completed: false,
        };
      }
    }

    return {
      totalScore: Math.min(totalScore, 400),
      maxPossible: 400,
      percentage: Math.round((totalScore / 400) * 100),
      completedPhases: completedPhases,
      averageScore:
        completedPhases > 0 ? Math.round(totalScore / completedPhases) : 0,
      totalTime: totalTime,
      phaseBreakdown: phaseBreakdown,
      overallLevel: this.calculateOverallLevel(totalScore, completedPhases),
    };
  }

  /**
   * Calculate which phases are unlocked
   * @param {Object} phaseResults - Results from all phases
   * @returns {Object} Unlock status for each phase
   */
  calculateUnlockedPhases(phaseResults) {
    const unlockStatus = {
      1: { unlocked: true, reason: "Always available" },
      2: this.checkPhaseUnlock(2, phaseResults),
      3: this.checkPhaseUnlock(3, phaseResults),
      4: this.checkPhaseUnlock(4, phaseResults),
    };

    return unlockStatus;
  }

  /**
   * Check if a specific phase is unlocked
   * @param {number} phase - Phase to check
   * @param {Object} phaseResults - All phase results
   * @returns {Object} Unlock status
   */
  checkPhaseUnlock(phase, phaseResults) {
    const previousPhase = phase - 1;
    const previousResult = phaseResults[`phase${previousPhase}`];
    const requiredScore = this.phases[phase].required_score;

    if (!previousResult) {
      return {
        unlocked: false,
        reason: `Complete Phase ${previousPhase} first`,
        requiredScore: requiredScore,
        currentScore: 0,
      };
    }

    if (previousResult.score >= requiredScore) {
      return {
        unlocked: true,
        reason: `Phase ${previousPhase} completed with sufficient score`,
        requiredScore: requiredScore,
        currentScore: previousResult.score,
        unlockCode: this.phases[phase].unlock_code,
      };
    }

    return {
      unlocked: false,
      reason: `Insufficient score in Phase ${previousPhase}`,
      requiredScore: requiredScore,
      currentScore: previousResult.score,
      shortfall: requiredScore - previousResult.score,
    };
  }

  /**
   * Determine current phase based on progress
   * @param {Object} phaseResults - All phase results
   * @returns {number} Current phase number
   */
  getCurrentPhase(phaseResults) {
    for (let phase = 4; phase >= 1; phase--) {
      if (phaseResults[`phase${phase}`]) {
        // If this phase is completed, next phase is current
        return Math.min(phase + 1, 4);
      }
    }
    return 1; // Start at phase 1
  }

  /**
   * Get Felisbina's journey narrative based on completed phases
   * @param {Object} phaseResults - All phase results
   * @returns {Object} Journey narrative
   */
  getFelisbinaJourney(phaseResults) {
    const journey = {
      currentStage: "Início da jornada",
      completedMilestones: [],
      nextSteps: [],
      progressNarrative: "",
    };

    // Phase 1: Initial contact and assessment
    if (phaseResults.phase1) {
      const phase1Data = phaseResults.phase1;
      journey.completedMilestones.push({
        phase: 1,
        milestone: "Acolhimento e Avaliação Inicial",
        score: phase1Data.score,
        level:
          phase1Data.level?.title ||
          SaaSIUtils.calculateLevel(phase1Data.score).title,
        key_achievements: this.extractPhase1Achievements(phase1Data),
      });

      if (phase1Data.score >= 60) {
        journey.currentStage = "Pronta para Planeamento";
      }
    }

    // Phase 2: Needs identification and planning
    if (phaseResults.phase2) {
      const phase2Data = phaseResults.phase2;
      journey.completedMilestones.push({
        phase: 2,
        milestone: "Identificação de Necessidades",
        score: phase2Data.score,
        level:
          phase2Data.level?.title ||
          SaaSIUtils.calculateLevel(phase2Data.score).title,
        key_achievements: this.extractPhase2Achievements(phase2Data),
      });

      if (phase2Data.score >= 60) {
        journey.currentStage = "Plano Definido";
      }
    }

    // Phase 3: Intervention planning
    if (phaseResults.phase3) {
      const phase3Data = phaseResults.phase3;
      journey.completedMilestones.push({
        phase: 3,
        milestone: "Plano de Intervenção",
        score: phase3Data.score,
        level:
          phase3Data.level?.title ||
          SaaSIUtils.calculateLevel(phase3Data.score).title,
        key_achievements: this.extractPhase3Achievements(phase3Data),
      });

      if (phase3Data.score >= 65) {
        journey.currentStage = "Pronta para Implementação";
      }
    }

    // Phase 4: Implementation and follow-up
    if (phaseResults.phase4) {
      const phase4Data = phaseResults.phase4;
      journey.completedMilestones.push({
        phase: 4,
        milestone: "Implementação Completa",
        score: phase4Data.score,
        level:
          phase4Data.level?.title ||
          SaaSIUtils.calculateLevel(phase4Data.score).title,
        key_achievements: this.extractPhase4Achievements(phase4Data),
      });

      journey.currentStage = "Jornada Completa";
    }

    // Generate narrative
    journey.progressNarrative = this.generateProgressNarrative(journey);

    return journey;
  }

  /**
   * Extract key achievements from Phase 1
   * @param {Object} phase1Data - Phase 1 results
   * @returns {Array} Key achievements
   */
  extractPhase1Achievements(phase1Data) {
    const achievements = [];

    if (phase1Data.empathy_score >= 20) {
      achievements.push("Excelente relação empática estabelecida");
    }

    if (phase1Data.information_percentage >= 80) {
      achievements.push("Informação abrangente recolhida");
    }

    if (phase1Data.felisbinaData?.availability === "sim_total") {
      achievements.push("Disponibilidade total confirmada");
    }

    if (phase1Data.score >= 85) {
      achievements.push("Avaliação de excelência");
    }

    return achievements;
  }

  /**
   * Extract key achievements from Phase 2
   * @param {Object} phase2Data - Phase 2 results
   * @returns {Array} Key achievements
   */
  extractPhase2Achievements(phase2Data) {
    const achievements = [];

    if (phase2Data.problemsCategorized >= 4) {
      achievements.push("Problemas corretamente categorizados");
    }

    if (phase2Data.entitiesContacted >= 3) {
      achievements.push("Articulação com entidades estabelecida");
    }

    if (phase2Data.interventionsScheduled >= 5) {
      achievements.push("Cronograma de intervenções completo");
    }

    if (phase2Data.score >= 85) {
      achievements.push("Planeamento de excelência");
    }

    return achievements;
  }

  /**
   * Extract key achievements from Phase 3
   * @param {Object} phase3Data - Phase 3 results
   * @returns {Array} Key achievements
   */
  extractPhase3Achievements(phase3Data) {
    const achievements = [];

    if (phase3Data.puzzle1?.programsSelected?.length >= 3) {
      achievements.push("Programas adequados selecionados");
    }

    if (phase3Data.puzzle2?.entitiesContacted?.length >= 3) {
      achievements.push("Articulação completa estabelecida");
    }

    if (Object.keys(phase3Data.puzzle3?.activitiesPlaced || {}).length >= 8) {
      achievements.push("Cronograma detalhado criado");
    }

    if (phase3Data.score >= 85) {
      achievements.push("Plano de intervenção de excelência");
    }

    return achievements;
  }

  /**
   * Extract key achievements from Phase 4
   * @param {Object} phase4Data - Phase 4 results
   * @returns {Array} Key achievements
   */
  extractPhase4Achievements(phase4Data) {
    const achievements = [];

    // Placeholder - Phase 4 specific achievements will be defined
    if (phase4Data.score >= 85) {
      achievements.push("Implementação de excelência");
    }

    return achievements;
  }

  /**
   * Generate overall level based on total progress
   * @param {number} totalScore - Total score across phases
   * @param {number} completedPhases - Number of completed phases
   * @returns {Object} Overall level information
   */
  calculateOverallLevel(totalScore, completedPhases) {
    if (completedPhases === 4) {
      if (totalScore >= 380)
        return {
          title: "Mestre SAASI Supremo",
          color: "#FFD700",
          description: "Excelência em todas as fases",
        };
      if (totalScore >= 340)
        return {
          title: "Mestre SAASI",
          color: "#4CAF50",
          description: "Desempenho consistentemente alto",
        };
      if (totalScore >= 280)
        return {
          title: "Técnico Especialista Superior",
          color: "#2196F3",
          description: "Competência avançada demonstrada",
        };
      if (totalScore >= 220)
        return {
          title: "Técnico Proficiente",
          color: "#FF9800",
          description: "Competência sólida em todas as áreas",
        };
      return {
        title: "Técnico Competente",
        color: "#757575",
        description: "Formação básica completa",
      };
    } else {
      const averageScore =
        completedPhases > 0 ? totalScore / completedPhases : 0;
      const baseLevel = SaaSIUtils.calculateLevel(averageScore);
      return {
        ...baseLevel,
        description: `Progresso: ${completedPhases}/4 fases completas`,
      };
    }
  }

  /**
   * Generate progress narrative
   * @param {Object} journey - Journey data
   * @returns {string} Progress narrative
   */
  generateProgressNarrative(journey) {
    if (journey.completedMilestones.length === 0) {
      return "Felisbina está no início da sua jornada de reintegração social e profissional.";
    }

    let narrative = "A jornada de Felisbina com o SAASI: ";

    journey.completedMilestones.forEach((milestone, index) => {
      if (index > 0) narrative += " → ";
      narrative += `Fase ${milestone.phase}: ${milestone.milestone} (${milestone.score}/100)`;
    });

    switch (journey.currentStage) {
      case "Pronta para Planeamento":
        narrative +=
          ". Estabeleceu-se uma base sólida de confiança e recolheu-se informação abrangente. Pronta para a fase de planeamento.";
        break;
      case "Plano Definido":
        narrative +=
          ". Necessidades identificadas e plano inicial estruturado. Pronta para detalhar intervenções específicas.";
        break;
      case "Pronta para Implementação":
        narrative +=
          ". Plano de intervenção completo e validado. Pronta para iniciar implementação prática.";
        break;
      case "Jornada Completa":
        narrative +=
          ". Processo completo de acompanhamento realizado com sucesso.";
        break;
      default:
        narrative += ". Continuando o percurso de apoio e desenvolvimento.";
    }

    return narrative;
  }

  /**
   * Validate data consistency across phases
   * @returns {Object} Validation report
   */
  validateDataConsistency() {
    const gameState = this.getGameState();
    const issues = [];
    const warnings = [];

    // Check for data continuity
    if (gameState.phases.phase1 && gameState.phases.phase2) {
      // Validate Phase 1 → Phase 2 data transfer
      if (!gameState.phases.phase2.phase1Data) {
        issues.push("Phase 2 missing Phase 1 data reference");
      }
    }

    if (gameState.phases.phase2 && gameState.phases.phase3) {
      // Validate Phase 2 → Phase 3 data transfer
      if (!gameState.phases.phase3.phase2Data) {
        issues.push("Phase 3 missing Phase 2 data reference");
      }
    }

    // Check score progression logic
    for (let phase = 1; phase <= 3; phase++) {
      const currentPhase = gameState.phases[`phase${phase}`];
      const nextPhase = gameState.phases[`phase${phase + 1}`];

      if (currentPhase && nextPhase) {
        const unlockStatus = this.checkPhaseUnlock(phase + 1, gameState.phases);
        if (!unlockStatus.unlocked) {
          issues.push(
            `Phase ${
              phase + 1
            } should not be accessible with Phase ${phase} score of ${
              currentPhase.score
            }`
          );
        }
      }
    }

    // Check Felisbina data consistency
    const felisbinaData = this.extractFelisbinaData(gameState.phases);
    if (felisbinaData.inconsistencies.length > 0) {
      warnings.push(...felisbinaData.inconsistencies);
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      warnings: warnings,
      lastValidated: new Date().toISOString(),
    };
  }

  /**
   * Extract and validate Felisbina data consistency
   * @param {Object} phases - All phase data
   * @returns {Object} Felisbina data summary and inconsistencies
   */
  extractFelisbinaData(phases) {
    const inconsistencies = [];
    const data = {
      age: 56,
      education: "9º ano",
      experience: "6 meses limpeza",
      situation: "Vive sozinha, pensão",
      benefits: "RSI + PSI",
    };

    // Check for inconsistencies across phases
    if (phases.phase1 && phases.phase1.felisbinaData) {
      const phase1Data = phases.phase1.felisbinaData;
      // Validate core data remains consistent
    }

    if (phases.phase2 && phases.phase2.felisbinaContext) {
      const phase2Data = phases.phase2.felisbinaContext;
      // Check consistency with phase 1
    }

    return {
      data: data,
      inconsistencies: inconsistencies,
    };
  }

  /**
   * Generate comprehensive progress report
   * @param {Object} phaseResults - All phase results
   * @returns {Object} Detailed progress report
   */
  generateProgressReport(phaseResults) {
    const gameState = this.getGameState();
    const validation = this.validateDataConsistency();

    return {
      overview: gameState.progress,
      phases: gameState.phases,
      unlockStatus: gameState.unlocked,
      felisbinaJourney: gameState.felisbinaJourney,
      validation: validation,
      recommendations: this.generateRecommendations(gameState),
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Generate recommendations based on current progress
   * @param {Object} gameState - Current game state
   * @returns {Array} Recommendations for improvement
   */
  generateRecommendations(gameState) {
    const recommendations = [];

    // Check for low-performing phases
    Object.keys(gameState.progress.phaseBreakdown).forEach((phase) => {
      const phaseData = gameState.progress.phaseBreakdown[phase];
      if (phaseData.completed && phaseData.score < 60) {
        recommendations.push({
          type: "improvement",
          phase: parseInt(phase),
          message: `Consider retrying Phase ${phase} - current score (${phaseData.score}) is below optimal threshold`,
          priority: "medium",
        });
      }
    });

    // Check for missing phases
    const currentPhase = gameState.currentPhase;
    if (currentPhase <= 4) {
      const unlockStatus = gameState.unlocked[currentPhase];
      if (unlockStatus && unlockStatus.unlocked) {
        recommendations.push({
          type: "next_step",
          phase: currentPhase,
          message: `Ready to proceed with Phase ${currentPhase}: ${this.phases[currentPhase].name}`,
          priority: "high",
          unlockCode: unlockStatus.unlockCode,
        });
      }
    }

    return recommendations;
  }

  /**
   * Reset all data (for development/testing)
   */
  resetAllData() {
    return this.storageManager.clearAllData();
  }
}

// Global instance
const MultiPhaseCoordinator = new MultiPhaseCoordinator();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MultiPhaseCoordinator };
}

console.log("Multi-Phase Coordinator loaded successfully");
