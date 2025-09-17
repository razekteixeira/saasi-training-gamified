/**
 * SAASI Escape Room - Scoring System
 * Agent 1: Scoring System Specialist Implementation
 *
 * This module provides a centralized scoring system that:
 * - Prevents score overflows with proper limits
 * - Implements weighted response system
 * - Provides consistent scoring across all phases
 * - Includes validation and testing capabilities
 */

/**
 * Core Scoring Configuration
 * These limits are defined based on SAASI requirements and game balance
 */
const SCORING_LIMITS = {
  empathy: { min: 0, max: 25 },
  information: { min: 0, max: 100 }, // percentage
  interactions: { min: 0, max: 6 },
  phase1_total: { min: 0, max: 100 },
  phase2_total: { min: 0, max: 100 },
  phase3_total: { min: 0, max: 100 },
  phase4_total: { min: 0, max: 100 },
  global_total: { min: 0, max: 400 },
};

/**
 * Response Quality Classifications
 * Each response is classified by quality with appropriate weights
 */
const WEIGHTED_RESPONSES = {
  excellent: { multiplier: 1.0, min_points: 8, bonus: 2 },
  good: { multiplier: 0.8, min_points: 5, bonus: 1 },
  adequate: { multiplier: 0.6, min_points: 3, bonus: 0 },
  poor: { multiplier: 0.3, min_points: 1, bonus: 0 },
};

/**
 * Dialogue Response Classifications
 * Maps each dialogue option to its quality level
 */
const DIALOGUE_QUALITY_MAP = {
  // Abertura dialogue
  abertura_option_0: "good", // Empática mas não excelente
  abertura_option_1: "adequate", // Funcional mas fria
  abertura_option_2: "excellent", // Mostra empatia e profissionalismo

  // Situação atual dialogue
  situacao_atual_option_0: "excellent", // Empatia + informação balanceadas
  situacao_atual_option_1: "adequate", // Foco apenas financeiro
  situacao_atual_option_2: "good", // Boa empatia mas menos informação

  // Experiência limpeza dialogue
  experiencia_limpeza_option_0: "excellent", // Valoriza experiência + aprende
  experiencia_limpeza_option_1: "good", // Boa mas menos técnica
  experiencia_limpeza_option_2: "adequate", // Muito técnica, pouca empatia

  // Dependência emocional dialogue
  dependencia_emocional_option_0: "excellent", // Excelente abordagem profissional
  dependencia_emocional_option_1: "good", // Boa análise técnica
  dependencia_emocional_option_2: "adequate", // Superficial

  // Ruptura familiar dialogue
  ruptura_familiar_option_0: "excellent", // Máxima empatia + estratégia
  ruptura_familiar_option_1: "good", // Empatia + técnica balanceadas
  ruptura_familiar_option_2: "adequate", // Foco na autonomia

  // Motivação trabalho dialogue
  motivacao_trabalho_option_0: "excellent", // Reforço positivo
  motivacao_trabalho_option_1: "good", // Boa motivação
  motivacao_trabalho_option_2: "adequate", // Técnica mas menos pessoal
};

/**
 * Core scoring utility functions
 */
class ScoringSystem {
  /**
   * Cap a score within defined limits
   * @param {number} value - Current value
   * @param {number} min - Minimum allowed value
   * @param {number} max - Maximum allowed value
   * @returns {number} Capped value
   */
  static capScore(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Apply scoring limits for specific metrics
   * @param {string} metric - The metric name (empathy, information, etc.)
   * @param {number} value - Current value
   * @returns {number} Capped value
   */
  static applyLimit(metric, value) {
    const limits = SCORING_LIMITS[metric];
    if (!limits) {
      console.warn(`No limits defined for metric: ${metric}`);
      return value;
    }
    return this.capScore(value, limits.min, limits.max);
  }

  /**
   * Calculate weighted response score
   * @param {string} dialogueId - Dialogue identifier
   * @param {number} optionIndex - Selected option index
   * @param {Object} rawScores - Raw empathy and info scores
   * @returns {Object} Weighted scores and quality info
   */
  static calculateWeightedResponse(dialogueId, optionIndex, rawScores) {
    const qualityKey = `${dialogueId}_option_${optionIndex}`;
    const quality = DIALOGUE_QUALITY_MAP[qualityKey] || "adequate";
    const weights = WEIGHTED_RESPONSES[quality];

    // Apply quality multiplier to raw scores
    const weightedEmpathy = Math.round(rawScores.empathy * weights.multiplier);
    const weightedInfo = Math.round(rawScores.info * weights.multiplier);

    // Add quality bonus
    const totalPoints = weightedEmpathy + weightedInfo + weights.bonus;

    return {
      empathy: this.applyLimit("empathy", weightedEmpathy),
      information: weightedInfo, // Will be capped later as percentage
      totalPoints: totalPoints,
      quality: quality,
      qualityLevel: weights,
      bonus: weights.bonus,
    };
  }

  /**
   * Update dialogue metrics with proper capping
   * @param {Object} gameState - Current game state
   * @param {Object} weightedScores - Weighted scores from calculateWeightedResponse
   * @returns {Object} Updated metrics
   */
  static updateDialogueMetrics(gameState, weightedScores) {
    // Update empathy with cap
    gameState.empathy = this.applyLimit(
      "empathy",
      gameState.empathy + weightedScores.empathy
    );

    // Update information with cap (will be converted to percentage)
    gameState.information = this.applyLimit(
      "information",
      gameState.information + weightedScores.information
    );

    // Update interactions with cap
    gameState.interactions = this.applyLimit(
      "interactions",
      gameState.interactions + 1
    );

    return {
      empathy: gameState.empathy,
      information: gameState.information,
      informationPercentage: Math.round(
        (gameState.information / SCORING_LIMITS.information.max) * 100
      ),
      interactions: gameState.interactions,
      qualityFeedback: `Resposta ${weightedScores.quality.toUpperCase()}: +${
        weightedScores.totalPoints
      } pontos`,
    };
  }

  /**
   * Calculate total phase score with proper weighting
   * @param {Object} gameState - Current game state
   * @returns {number} Total phase score (0-100)
   */
  static calculatePhase1Score(gameState) {
    // Score components with different weights
    const empathyScore = (gameState.empathy / SCORING_LIMITS.empathy.max) * 30; // 30% weight
    const infoScore =
      (gameState.information / SCORING_LIMITS.information.max) * 25; // 25% weight
    const interactionScore =
      (gameState.interactions / SCORING_LIMITS.interactions.max) * 15; // 15% weight

    // Analysis, documentation, and assessment scores (remaining 30%)
    const analysisScore = (gameState.categorized / 6) * 10; // 10% weight
    const docsScore = (gameState.docsIdentified / 3) * 10; // 10% weight
    const assessmentScore = this.calculateAssessmentScore(gameState) * 10; // 10% weight

    const totalScore =
      empathyScore +
      infoScore +
      interactionScore +
      analysisScore +
      docsScore +
      assessmentScore;

    return this.applyLimit("phase1_total", Math.round(totalScore));
  }

  /**
   * Calculate assessment score based on decision quality
   * @param {Object} gameState - Current game state
   * @returns {number} Assessment score (0-1)
   */
  static calculateAssessmentScore(gameState) {
    if (!gameState.availability || !gameState.capacity) {
      return 0;
    }

    let score = 0;

    // Availability assessment (0.5 weight)
    switch (gameState.availability) {
      case "sim_total":
        score += 0.25;
        break; // Best choice
      case "sim_condicionada":
        score += 0.2;
        break; // Good choice
      case "nao":
        score += 0.05;
        break; // Poor choice
    }

    // Capacity assessment (0.5 weight)
    switch (gameState.capacity) {
      case "sim_formacao":
        score += 0.25;
        break; // Best choice - recognizes need for training
      case "sim_plena":
        score += 0.2;
        break; // Good choice
      case "nao":
        score += 0.05;
        break; // Poor choice
    }

    return score;
  }

  /**
   * Validate scoring consistency
   * @param {Object} gameState - Current game state
   * @returns {Object} Validation results
   */
  static validateScoring(gameState) {
    const issues = [];
    const warnings = [];

    // Check empathy limits
    if (
      gameState.empathy < SCORING_LIMITS.empathy.min ||
      gameState.empathy > SCORING_LIMITS.empathy.max
    ) {
      issues.push(
        `Empathy score ${gameState.empathy} outside limits [${SCORING_LIMITS.empathy.min}-${SCORING_LIMITS.empathy.max}]`
      );
    }

    // Check information limits
    if (
      gameState.information < SCORING_LIMITS.information.min ||
      gameState.information > SCORING_LIMITS.information.max
    ) {
      issues.push(
        `Information score ${gameState.information} outside limits [${SCORING_LIMITS.information.min}-${SCORING_LIMITS.information.max}]`
      );
    }

    // Check interactions limits
    if (
      gameState.interactions < SCORING_LIMITS.interactions.min ||
      gameState.interactions > SCORING_LIMITS.interactions.max
    ) {
      issues.push(
        `Interactions ${gameState.interactions} outside limits [${SCORING_LIMITS.interactions.min}-${SCORING_LIMITS.interactions.max}]`
      );
    }

    // Check total score limits
    if (
      gameState.score < SCORING_LIMITS.phase1_total.min ||
      gameState.score > SCORING_LIMITS.phase1_total.max
    ) {
      issues.push(
        `Total score ${gameState.score} outside limits [${SCORING_LIMITS.phase1_total.min}-${SCORING_LIMITS.phase1_total.max}]`
      );
    }

    // Performance warnings
    if (gameState.empathy < 10) {
      warnings.push("Low empathy score - consider more empathetic responses");
    }
    if (gameState.information < 40) {
      warnings.push("Low information gathering - ask more detailed questions");
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      warnings: warnings,
      summary: `Validation ${issues.length === 0 ? "PASSED" : "FAILED"} - ${
        issues.length
      } issues, ${warnings.length} warnings`,
    };
  }

  /**
   * Generate performance report
   * @param {Object} gameState - Current game state
   * @returns {Object} Detailed performance report
   */
  static generatePerformanceReport(gameState) {
    const totalScore = this.calculatePhase1Score(gameState);
    const validation = this.validateScoring(gameState);

    return {
      phase: 1,
      totalScore: totalScore,
      maxScore: SCORING_LIMITS.phase1_total.max,
      percentage: Math.round(
        (totalScore / SCORING_LIMITS.phase1_total.max) * 100
      ),

      metrics: {
        empathy: {
          score: gameState.empathy,
          max: SCORING_LIMITS.empathy.max,
          percentage: Math.round(
            (gameState.empathy / SCORING_LIMITS.empathy.max) * 100
          ),
        },
        information: {
          score: gameState.information,
          max: SCORING_LIMITS.information.max,
          percentage: Math.round(
            (gameState.information / SCORING_LIMITS.information.max) * 100
          ),
        },
        interactions: {
          score: gameState.interactions,
          max: SCORING_LIMITS.interactions.max,
          percentage: Math.round(
            (gameState.interactions / SCORING_LIMITS.interactions.max) * 100
          ),
        },
      },

      level: this.calculateLevel(totalScore),
      validation: validation,

      recommendations: this.generateRecommendations(gameState),
    };
  }

  /**
   * Calculate performance level
   * @param {number} score - Total score
   * @returns {Object} Level information
   */
  static calculateLevel(score) {
    if (score >= 95)
      return {
        title: "Mestre SAASI",
        color: "#FFD700",
        description: "Excelência profissional",
      };
    if (score >= 85)
      return {
        title: "Técnico Especialista",
        color: "#4CAF50",
        description: "Muito competente",
      };
    if (score >= 70)
      return {
        title: "Técnico Proficiente",
        color: "#2196F3",
        description: "Competente",
      };
    if (score >= 50)
      return {
        title: "Técnico Competente",
        color: "#FF9800",
        description: "Satisfatório",
      };
    return {
      title: "Técnico Iniciante",
      color: "#757575",
      description: "Necessita melhorias",
    };
  }

  /**
   * Generate improvement recommendations
   * @param {Object} gameState - Current game state
   * @returns {Array} Array of recommendations
   */
  static generateRecommendations(gameState) {
    const recommendations = [];

    if (gameState.empathy < 15) {
      recommendations.push({
        area: "Empatia",
        suggestion: "Pratique respostas mais empáticas e de apoio emocional",
        priority: "alta",
      });
    }

    if (gameState.information < 60) {
      recommendations.push({
        area: "Recolha de Informação",
        suggestion:
          "Faça perguntas mais detalhadas para obter informação completa",
        priority: "média",
      });
    }

    if (gameState.categorized < 6) {
      recommendations.push({
        area: "Análise de Fatores",
        suggestion: "Melhore a identificação de fatores de risco e proteção",
        priority: "alta",
      });
    }

    if (!gameState.availability || !gameState.capacity) {
      recommendations.push({
        area: "Tomada de Decisão",
        suggestion:
          "Complete todas as avaliações para uma decisão fundamentada",
        priority: "crítica",
      });
    }

    return recommendations;
  }
}

/**
 * Multi-Phase Coordination System
 * Manages scoring consistency and data flow between phases
 */
class MultiPhaseCoordinator {
  /**
   * Calculate total score across all completed phases
   * @param {Object} phaseResults - Results from all phases
   * @returns {Object} Total score summary
   */
  static calculateTotalScore(phaseResults) {
    let totalScore = 0;
    let maxPossible = 0;
    let completedPhases = 0;

    for (let phase = 1; phase <= 4; phase++) {
      const phaseData = phaseResults[`phase${phase}`];
      if (phaseData && phaseData.score !== undefined) {
        totalScore += phaseData.score;
        maxPossible += SCORING_LIMITS[`phase${phase}_total`]?.max || 100;
        completedPhases++;
      } else {
        maxPossible += SCORING_LIMITS[`phase${phase}_total`]?.max || 100;
      }
    }

    return {
      totalScore: ScoringSystem.applyLimit("global_total", totalScore),
      maxPossible: maxPossible,
      percentage: Math.round((totalScore / maxPossible) * 100),
      completedPhases: completedPhases,
      averageScore:
        completedPhases > 0 ? Math.round(totalScore / completedPhases) : 0,
    };
  }

  /**
   * Determine next phase unlock status
   * @param {Object} phaseResults - Current phase results
   * @returns {Object} Unlock status for each phase
   */
  static getPhaseUnlockStatus(phaseResults) {
    const unlockStatus = {
      phase1: { unlocked: true, reason: "Always available" },
      phase2: { unlocked: false, reason: "Requires Phase 1 completion" },
      phase3: { unlocked: false, reason: "Requires Phase 2 completion" },
      phase4: { unlocked: false, reason: "Requires Phase 3 completion" },
    };

    // Check Phase 1 completion for Phase 2 unlock
    if (phaseResults.phase1 && phaseResults.phase1.score >= 70) {
      unlockStatus.phase2 = {
        unlocked: true,
        reason: `Phase 1 completed with ${phaseResults.phase1.score} points`,
      };

      // Check Phase 2 completion for Phase 3 unlock
      if (phaseResults.phase2 && phaseResults.phase2.score >= 70) {
        unlockStatus.phase3 = {
          unlocked: true,
          reason: `Phase 2 completed with ${phaseResults.phase2.score} points`,
        };

        // Check Phase 3 completion for Phase 4 unlock
        if (phaseResults.phase3 && phaseResults.phase3.score >= 70) {
          unlockStatus.phase4 = {
            unlocked: true,
            reason: `Phase 3 completed with ${phaseResults.phase3.score} points`,
          };
        }
      }
    }

    return unlockStatus;
  }

  /**
   * Generate comprehensive progress report
   * @param {Object} phaseResults - All phase results
   * @returns {Object} Detailed progress report
   */
  static generateProgressReport(phaseResults) {
    const totalScores = this.calculateTotalScore(phaseResults);
    const unlockStatus = this.getPhaseUnlockStatus(phaseResults);

    return {
      overview: totalScores,
      phases: {
        phase1: phaseResults.phase1 || { status: "not_started" },
        phase2: phaseResults.phase2 || { status: "not_started" },
        phase3: phaseResults.phase3 || { status: "not_started" },
        phase4: phaseResults.phase4 || { status: "not_started" },
      },
      unlockStatus: unlockStatus,
      currentLevel: this.calculateOverallLevel(totalScores.averageScore),
      nextMilestone: this.getNextMilestone(totalScores.totalScore),
      recommendations: this.generateGlobalRecommendations(phaseResults),
    };
  }

  /**
   * Calculate overall level based on average performance
   * @param {number} averageScore - Average score across completed phases
   * @returns {Object} Overall level information
   */
  static calculateOverallLevel(averageScore) {
    if (averageScore >= 95)
      return {
        title: "Mestre SAASI Certificado",
        color: "#FFD700",
        tier: "master",
      };
    if (averageScore >= 85)
      return { title: "Especialista SAASI", color: "#4CAF50", tier: "expert" };
    if (averageScore >= 70)
      return {
        title: "Técnico SAASI Proficiente",
        color: "#2196F3",
        tier: "proficient",
      };
    if (averageScore >= 50)
      return {
        title: "Técnico SAASI Competente",
        color: "#FF9800",
        tier: "competent",
      };
    return {
      title: "Técnico SAASI em Formação",
      color: "#757575",
      tier: "beginner",
    };
  }

  /**
   * Get next achievement milestone
   * @param {number} totalScore - Current total score
   * @returns {Object} Next milestone info
   */
  static getNextMilestone(totalScore) {
    const milestones = [
      {
        score: 100,
        title: "Primeira Fase Concluída",
        description: "Complete a Fase 1 com sucesso",
      },
      {
        score: 200,
        title: "Meio Caminho",
        description: "Complete as duas primeiras fases",
      },
      { score: 300, title: "Quase Expert", description: "Complete três fases" },
      {
        score: 380,
        title: "Mestre SAASI",
        description: "Pontuação de excelência em todas as fases",
      },
    ];

    for (const milestone of milestones) {
      if (totalScore < milestone.score) {
        return {
          ...milestone,
          progress: Math.round((totalScore / milestone.score) * 100),
          remaining: milestone.score - totalScore,
        };
      }
    }

    return {
      score: 400,
      title: "Mestre SAASI Supremo",
      description: "Pontuação perfeita alcançada!",
      progress: 100,
      remaining: 0,
    };
  }

  /**
   * Generate recommendations based on all phases
   * @param {Object} phaseResults - All phase results
   * @returns {Array} Global recommendations
   */
  static generateGlobalRecommendations(phaseResults) {
    const recommendations = [];
    const totalData = this.calculateTotalScore(phaseResults);

    if (totalData.completedPhases === 0) {
      recommendations.push({
        area: "Início",
        suggestion: "Comece pela Fase 1 para aprender os fundamentos do SAASI",
        priority: "alta",
        type: "progression",
      });
    } else if (totalData.averageScore < 70) {
      recommendations.push({
        area: "Pontuação Geral",
        suggestion: "Pratique mais para melhorar a pontuação média das fases",
        priority: "média",
        type: "improvement",
      });
    }

    // Check for specific phase weaknesses
    for (let phase = 1; phase <= 4; phase++) {
      const phaseData = phaseResults[`phase${phase}`];
      if (phaseData && phaseData.score < 85) {
        recommendations.push({
          area: `Fase ${phase}`,
          suggestion: `Repetir Fase ${phase} para melhorar a pontuação (atual: ${phaseData.score})`,
          priority: "média",
          type: "retry",
        });
      }
    }

    return recommendations;
  }

  /**
   * Export phase data for external analysis
   * @param {Object} phaseResults - All phase results
   * @returns {Object} Exportable data structure
   */
  static exportData(phaseResults) {
    const progressReport = this.generateProgressReport(phaseResults);

    return {
      exportDate: new Date().toISOString(),
      version: "1.0",
      summary: progressReport.overview,
      phases: progressReport.phases,
      level: progressReport.currentLevel,
      recommendations: progressReport.recommendations,
      rawData: phaseResults,
    };
  }
}

/**
 * Testing suite for scoring system validation
 */
class ScoringSystemTests {
  static runAllTests() {
    console.log("🧪 Running Scoring System Tests...");

    const tests = [
      this.testCapScore,
      this.testLimits,
      this.testWeightedResponses,
      this.testPhaseScoring,
      this.testValidation,
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test) => {
      try {
        test();
        console.log(`✅ ${test.name} - PASSED`);
        passed++;
      } catch (error) {
        console.log(`❌ ${test.name} - FAILED: ${error.message}`);
        failed++;
      }
    });

    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    return { passed, failed, total: tests.length };
  }

  static testCapScore() {
    // Test basic capping
    if (ScoringSystem.capScore(10, 0, 25) !== 10)
      throw new Error("Normal value should pass through");
    if (ScoringSystem.capScore(-5, 0, 25) !== 0)
      throw new Error("Should cap to minimum");
    if (ScoringSystem.capScore(30, 0, 25) !== 25)
      throw new Error("Should cap to maximum");
  }

  static testLimits() {
    // Test limit application
    if (ScoringSystem.applyLimit("empathy", 30) !== 25)
      throw new Error("Empathy should cap at 25");
    if (ScoringSystem.applyLimit("information", 150) !== 100)
      throw new Error("Information should cap at 100");
    if (ScoringSystem.applyLimit("interactions", 10) !== 6)
      throw new Error("Interactions should cap at 6");
  }

  static testWeightedResponses() {
    // Test response weighting
    const result = ScoringSystem.calculateWeightedResponse("abertura", 2, {
      empathy: 12,
      info: 8,
    });
    if (result.quality !== "excellent")
      throw new Error("Should identify excellent response");
    if (result.bonus !== 2)
      throw new Error("Excellent responses should get 2 bonus points");
  }

  static testPhaseScoring() {
    // Test phase scoring calculation
    const mockState = {
      empathy: 20,
      information: 80,
      interactions: 6,
      categorized: 6,
      docsIdentified: 3,
      availability: "sim_total",
      capacity: "sim_formacao",
    };

    const score = ScoringSystem.calculatePhase1Score(mockState);
    if (score < 80 || score > 100)
      throw new Error(`Phase score ${score} should be in realistic range`);
  }

  static testValidation() {
    // Test validation system
    const badState = {
      empathy: 50,
      information: 200,
      interactions: 10,
      score: 150,
    };
    const validation = ScoringSystem.validateScoring(badState);
    if (validation.valid)
      throw new Error("Should fail validation for overflow values");
    if (validation.issues.length < 3)
      throw new Error("Should detect multiple limit violations");
  }
}

// Export for global use
if (typeof window !== "undefined") {
  window.ScoringSystem = ScoringSystem;
  window.MultiPhaseCoordinator = MultiPhaseCoordinator;
  window.ScoringSystemTests = ScoringSystemTests;
  window.SCORING_LIMITS = SCORING_LIMITS;
  window.WEIGHTED_RESPONSES = WEIGHTED_RESPONSES;
}

// Export for Node.js (testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ScoringSystem,
    MultiPhaseCoordinator,
    ScoringSystemTests,
    SCORING_LIMITS,
    WEIGHTED_RESPONSES,
    DIALOGUE_QUALITY_MAP,
  };
}

console.log("✅ SAASI Scoring System loaded successfully");
