/**
 * SAASI Escape Room - Phase Data Generator
 * Automatically generates realistic background data when jumping directly to phases
 *
 * This system creates believable progression data as if the user had completed
 * all previous phases normally, ensuring phase continuity and proper functionality.
 *
 * @version 1.0
 * @date January 2025
 */

class PhaseDataGenerator {
  constructor() {
    this.storageManager = window.SaaSIStorage || this.createFallbackStorage();
    this.felisbinaData =
      window.FELISBINA_CASE_DATA || this.createFallbackCaseData();
    this.currentTimestamp = Date.now();
  }

  /**
   * Generate complete data chain for direct phase access
   * @param {number} targetPhase - Phase to access directly (2, 3, or 4)
   * @returns {boolean} Success status
   */
  generateDataChain(targetPhase) {
    console.log(
      `🔄 Generating data chain for direct access to Phase ${targetPhase}`
    );

    try {
      // Generate data for all phases up to target
      for (let phase = 1; phase < targetPhase; phase++) {
        if (!this.hasPhaseData(phase)) {
          this.generatePhaseData(phase);
          console.log(`✅ Generated Phase ${phase} data`);
        } else {
          console.log(`ℹ️ Phase ${phase} data already exists, skipping`);
        }
      }

      // Verify data integrity
      const verification = this.verifyDataChain(targetPhase);
      if (verification.valid) {
        console.log(`🎯 Data chain complete for Phase ${targetPhase}`);
        this.showDataGenerationNotification(targetPhase);
        return true;
      } else {
        console.error(
          "❌ Data chain verification failed:",
          verification.issues
        );
        return false;
      }
    } catch (error) {
      console.error("❌ Error generating data chain:", error);
      return false;
    }
  }

  /**
   * Check if phase data exists
   * @param {number} phase - Phase number to check
   * @returns {boolean} Data exists
   */
  hasPhaseData(phase) {
    const data = this.storageManager.loadPhaseResults(phase);
    return data && data.score !== undefined && data.score > 0;
  }

  /**
   * Generate realistic data for a specific phase
   * @param {number} phase - Phase number (1, 2, 3, or 4)
   * @returns {Object} Generated phase data
   */
  generatePhaseData(phase) {
    const generators = {
      1: () => this.generatePhase1Data(),
      2: () => this.generatePhase2Data(),
      3: () => this.generatePhase3Data(),
      4: () => this.generatePhase4Data(),
    };

    const generator = generators[phase];
    if (!generator) {
      throw new Error(`No generator available for phase ${phase}`);
    }

    const data = generator();
    this.storageManager.savePhaseResults(phase, data);
    return data;
  }

  /**
   * Generate Phase 1 data - Acolhimento e Avaliação Inicial
   * @returns {Object} Phase 1 completion data
   */
  generatePhase1Data() {
    // Generate realistic but good performance scores
    const empathyScore = this.randomBetween(20, 25); // Good empathy
    const informationScore = this.randomBetween(45, 60); // Adequate information gathering
    const interactionsScore = this.randomBetween(4, 5); // Most interactions completed

    const baseScore = empathyScore + informationScore + interactionsScore * 2;
    const finalScore = Math.min(baseScore + this.randomBetween(5, 15), 100);

    return {
      phase: 1,
      score: finalScore,
      maxScore: 100,
      percentage: finalScore,
      duration: this.randomBetween(12, 18), // 12-18 minutes
      timestamp: this.currentTimestamp - this.randomBetween(3600000, 86400000), // 1-24 hours ago
      level: this.calculateLevel(finalScore),

      // Detailed metrics
      metrics: {
        empathy: {
          score: empathyScore,
          max: 25,
          percentage: Math.round((empathyScore / 25) * 100),
        },
        information: {
          score: informationScore,
          max: 75,
          percentage: Math.round((informationScore / 75) * 100),
        },
        interactions: {
          score: interactionsScore,
          max: 6,
          percentage: Math.round((interactionsScore / 6) * 100),
        },
      },

      // Task completion details
      taskReports: {
        conversa_inicial: {
          completed: true,
          score: empathyScore,
          percentage: Math.round((empathyScore / 25) * 100),
          quality:
            empathyScore >= 22
              ? "Excellent"
              : empathyScore >= 18
              ? "Good"
              : "Adequate",
        },
        analise_perfil: {
          completed: true,
          score: 30, // 6 elements * 5 points
          accuracy: 100,
          feedback: "Análise completa com categorização correta",
        },
        documentacao: {
          completed: true,
          score: 24, // 3 mandatory documents * 8 points
          efficiency: 100,
          feedback: "Documentação adequada identificada",
        },
        avaliacao_final: {
          completed: true,
          score: Math.round(finalScore * 0.2), // 20% of final score
          availability: "sim_condicionada", // Realistic choice
          capacity: "sim_formacao", // Realistic choice
          decision_quality: "Boa",
        },
      },

      // Assessment decisions (realistic for Felisbina's case)
      assessmentDecisions: {
        availability: "sim_condicionada",
        capacity: "sim_formacao",
        justification:
          "Disponível com necessidade de apoio psicológico, capacidade existente com necessidade de formação adicional",
      },

      // Felisbina relationship data
      felisbinaRelationship: {
        empathy_established: empathyScore >= 18,
        trust_built: informationScore >= 50,
        rapport_quality:
          empathyScore >= 22
            ? "excellent"
            : empathyScore >= 18
            ? "good"
            : "adequate",
      },

      // Next steps recommendation
      nextSteps:
        "Encaminhamento para Fase 2 - Identificação de necessidades específicas e planeamento de intervenção",

      // Auto-generated flag
      generated: true,
      generatedAt: this.currentTimestamp,
      generatedReason: "Direct phase access - simulated completion",
    };
  }

  /**
   * Generate Phase 2 data - Identificação de Necessidades
   * @returns {Object} Phase 2 completion data
   */
  generatePhase2Data() {
    const phase1Data = this.storageManager.loadPhaseResults(1);
    const baseScore = this.randomBetween(70, 85);

    return {
      phase: 2,
      score: baseScore,
      maxScore: 100,
      percentage: baseScore,
      duration: this.randomBetween(15, 22), // 15-22 minutes
      timestamp: this.currentTimestamp - this.randomBetween(1800000, 7200000), // 30min-2h ago
      level: this.calculateLevel(baseScore),

      // Problem mapping results
      problemMapping: {
        identified_problems: [
          {
            problem: "Dependência emocional do pai",
            category: "psicossocial",
            priority: "alta",
            intervention_needed: "Apoio psicológico",
          },
          {
            problem: "Isolamento social",
            category: "social",
            priority: "média",
            intervention_needed: "Atividades de grupo",
          },
          {
            problem: "Baixa autoestima",
            category: "psicossocial",
            priority: "média",
            intervention_needed: "Coaching pessoal",
          },
          {
            problem: "Necessidade de qualificação",
            category: "profissional",
            priority: "alta",
            intervention_needed: "Formação profissional",
          },
        ],
        mapping_accuracy: this.randomBetween(80, 95),
      },

      // Benefits analysis
      benefitsAnalysis: {
        current_situation: {
          rsi: 253.2,
          psi: 324.55,
          total_monthly: 577.75,
        },
        optimized_situation: {
          rsi: 253.2,
          psi: 324.55,
          additional_supports: 50, // Emergency food support
          total_monthly: 627.75,
        },
        improvement: 50,
        optimization_score: this.randomBetween(75, 90),
      },

      // Entity articulation
      entityArticulation: {
        contacted_entities: [
          {
            entity: "Centro de Saúde",
            purpose: "Apoio psicológico",
            status: "contacted",
            response_time: "2-3 dias",
          },
          {
            entity: "IEFP Porto",
            purpose: "Formação profissional",
            status: "contacted",
            response_time: "1 semana",
          },
          {
            entity: "IPSS Local",
            purpose: "Atividades sociais",
            status: "contacted",
            response_time: "3-5 dias",
          },
        ],
        coordination_score: this.randomBetween(80, 95),
      },

      // Timeline planning
      timelinePlanning: {
        total_duration: "7 meses",
        phases: [
          {
            month: 1,
            focus: "Estabilização emocional",
            activities: ["Consulta psicologia inicial", "Avaliação social"],
          },
          {
            month: 2,
            focus: "Desenvolvimento social",
            activities: ["Atividades de grupo", "Coaching pessoal"],
          },
          {
            month: 3,
            focus: "Preparação profissional",
            activities: ["Avaliação de competências", "Orientação vocacional"],
          },
        ],
        timeline_quality: this.randomBetween(85, 95),
      },

      // Continuation from Phase 1
      previousPhaseData: {
        phase1_score: phase1Data?.score || 75,
        felisbina_relationship: phase1Data?.felisbinaRelationship || {
          empathy_established: true,
          trust_built: true,
          rapport_quality: "good",
        },
      },

      // Next steps
      nextSteps:
        "Encaminhamento para Fase 3 - Elaboração do plano de intervenção detalhado",

      // Auto-generated flag
      generated: true,
      generatedAt: this.currentTimestamp,
      generatedReason: "Direct phase access - simulated completion",
    };
  }

  /**
   * Generate Phase 3 data - Plano de Intervenção
   * @returns {Object} Phase 3 completion data
   */
  generatePhase3Data() {
    const phase1Data = this.storageManager.loadPhaseResults(1);
    const phase2Data = this.storageManager.loadPhaseResults(2);
    const baseScore = this.randomBetween(75, 90);

    return {
      phase: 3,
      score: baseScore,
      maxScore: 100,
      percentage: baseScore,
      duration: this.randomBetween(18, 25), // 18-25 minutes
      timestamp: this.currentTimestamp - this.randomBetween(900000, 3600000), // 15min-1h ago
      level: this.calculateLevel(baseScore),

      // Program selection
      programSelection: {
        selected_programs: [
          {
            program: "Programa Qualifica",
            adequacy: 85,
            duration: "6 meses",
            entity: "IEFP",
            status: "approved",
          },
          {
            program: "Apoio Psicológico",
            adequacy: 90,
            duration: "4 meses",
            entity: "Centro de Saúde",
            status: "approved",
          },
          {
            program: "Atividades de Inclusão Social",
            adequacy: 75,
            duration: "3 meses",
            entity: "IPSS",
            status: "pending",
          },
        ],
        selection_quality: this.randomBetween(80, 95),
        total_adequacy: this.randomBetween(82, 92),
      },

      // Entity coordination
      entityCoordination: {
        coordination_network: [
          { from: "SAASI", to: "IEFP", type: "formacao_profissional" },
          { from: "SAASI", to: "Centro_Saude", type: "apoio_psicologico" },
          {
            from: "IEFP",
            to: "Centro_Saude",
            type: "coordenacao_psicossocial",
          },
        ],
        approval_status: {
          iefp: "approved",
          centro_saude: "approved",
          ipss: "pending",
        },
        coordination_efficiency: this.randomBetween(85, 95),
      },

      // Intervention timeline
      interventionTimeline: {
        total_months: 7,
        detailed_schedule: [
          {
            month: 1,
            week: 1,
            activity: "Consulta Psicologia Inicial",
            entity: "Centro de Saúde",
            status: "scheduled",
          },
          {
            month: 1,
            week: 3,
            activity: "Avaliação Programa Qualifica",
            entity: "IEFP",
            status: "scheduled",
          },
          {
            month: 2,
            week: 1,
            activity: "Início Apoio Psicológico Regular",
            entity: "Centro de Saúde",
            status: "scheduled",
          },
        ],
        conflicts_resolved: true,
        timeline_optimization: this.randomBetween(88, 96),
      },

      // Plan validation
      planValidation: {
        coherence_check: {
          objectives_clear: true,
          timeline_realistic: true,
          resources_available: true,
          score: this.randomBetween(90, 98),
        },
        entity_approvals: {
          iefp: {
            status: "approved",
            date: new Date(this.currentTimestamp - 86400000).toISOString(),
          },
          centro_saude: {
            status: "approved",
            date: new Date(this.currentTimestamp - 43200000).toISOString(),
          },
          ipss: {
            status: "pending",
            expected_date: new Date(
              this.currentTimestamp + 86400000
            ).toISOString(),
          },
        },
        felisbina_consent: {
          understanding_level: this.randomBetween(85, 95),
          agreement: true,
          concerns_addressed: true,
        },
        validation_score: this.randomBetween(85, 95),
      },

      // Integration with previous phases
      previousPhases: {
        phase1_assessment: phase1Data?.assessmentDecisions || {
          availability: "sim_condicionada",
          capacity: "sim_formacao",
        },
        phase2_problems: phase2Data?.problemMapping?.identified_problems || [],
        continuity_score: this.randomBetween(90, 98),
      },

      // Next steps
      nextSteps:
        "Encaminhamento para Fase 4 - Implementação e acompanhamento do plano",

      // Auto-generated flag
      generated: true,
      generatedAt: this.currentTimestamp,
      generatedReason: "Direct phase access - simulated completion",
    };
  }

  /**
   * Generate Phase 4 data - Implementação e Acompanhamento
   * @returns {Object} Phase 4 completion data
   */
  generatePhase4Data() {
    const phase3Data = this.storageManager.loadPhaseResults(3);
    const baseScore = this.randomBetween(80, 95);

    return {
      phase: 4,
      score: baseScore,
      maxScore: 100,
      percentage: baseScore,
      duration: this.randomBetween(25, 35), // 25-35 minutes
      timestamp: this.currentTimestamp - this.randomBetween(300000, 1800000), // 5-30min ago
      level: this.calculateLevel(baseScore),

      // Progress monitoring
      progressMonitoring: {
        monitoring_period: "3 meses",
        progress_indicators: [
          {
            indicator: "Frequência apoio psicológico",
            target: "2x/semana",
            actual: "2x/semana",
            status: "on_track",
          },
          {
            indicator: "Participação formação",
            target: "100%",
            actual: "95%",
            status: "good",
          },
          {
            indicator: "Atividades sociais",
            target: "1x/semana",
            actual: "1x/2semanas",
            status: "needs_attention",
          },
        ],
        overall_progress: this.randomBetween(75, 90),
      },

      // Crisis management
      crisisManagement: {
        crises_handled: [
          {
            type: "Habitacional",
            description: "Problemas com pagamento da pensão",
            response: "Apoio financeiro emergência + mediação",
            outcome: "Resolvido",
            response_time: "2 horas",
          },
          {
            type: "Emocional",
            description: "Episódio de ansiedade durante formação",
            response: "Apoio psicológico adicional + ajuste cronograma",
            outcome: "Resolvido",
            response_time: "1 dia",
          },
        ],
        crisis_response_quality: this.randomBetween(85, 95),
      },

      // Strategy adaptation
      strategyAdaptation: {
        adaptations_made: [
          {
            area: "Formação profissional",
            original: "Curso intensivo 6 meses",
            adapted: "Curso modular 8 meses",
            reason: "Melhor adaptação ao ritmo da Felisbina",
          },
          {
            area: "Apoio psicológico",
            original: "1x/semana",
            adapted: "2x/semana inicial, depois 1x/semana",
            reason: "Necessidade de apoio mais intensivo inicial",
          },
        ],
        adaptation_effectiveness: this.randomBetween(88, 96),
      },

      // Autonomy transition
      autonomyTransition: {
        readiness_assessment: {
          professional_skills: this.randomBetween(80, 90),
          emotional_autonomy: this.randomBetween(70, 85),
          financial_management: this.randomBetween(75, 88),
          social_integration: this.randomBetween(65, 80),
        },
        transition_plan: {
          support_reduction: "Gradual ao longo de 3 meses",
          maintenance_strategy: "Contacto mensal + grupo apoio",
          emergency_contacts: "Sempre disponível",
        },
        autonomy_score: this.randomBetween(75, 88),
      },

      // Final outcomes
      finalOutcomes: {
        employment_readiness: this.randomBetween(80, 95),
        personal_development: this.randomBetween(75, 90),
        social_integration: this.randomBetween(70, 85),
        overall_success: this.randomBetween(78, 92),
      },

      // Integration with previous phases
      previousPhases: {
        phase3_plan: phase3Data?.programSelection || {},
        implementation_fidelity: this.randomBetween(85, 95),
        continuity_maintained: true,
      },

      // Completion status
      completionStatus:
        "Successful transition to autonomy with ongoing support network",

      // Auto-generated flag
      generated: true,
      generatedAt: this.currentTimestamp,
      generatedReason: "Direct phase access - simulated completion",
    };
  }

  /**
   * Calculate performance level based on score
   * @param {number} score - Score achieved
   * @returns {Object} Level information
   */
  calculateLevel(score) {
    if (score >= 95)
      return {
        title: "Mestre SAASI",
        color: "#FFD700",
        description: "Desempenho excecional",
      };
    if (score >= 85)
      return {
        title: "Técnico Especialista",
        color: "#4CAF50",
        description: "Desempenho muito bom",
      };
    if (score >= 70)
      return {
        title: "Técnico Proficiente",
        color: "#2196F3",
        description: "Desempenho bom",
      };
    if (score >= 60)
      return {
        title: "Técnico Competente",
        color: "#FF9800",
        description: "Desempenho adequado",
      };
    return {
      title: "Técnico Iniciante",
      color: "#757575",
      description: "Necessita melhoria",
    };
  }

  /**
   * Generate random number between min and max (inclusive)
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Verify data chain integrity
   * @param {number} targetPhase - Target phase to verify up to
   * @returns {Object} Verification result
   */
  verifyDataChain(targetPhase) {
    const issues = [];
    const requiredScores = { 2: 60, 3: 60, 4: 65 }; // Phase unlock requirements

    for (let phase = 1; phase < targetPhase; phase++) {
      const data = this.storageManager.loadPhaseResults(phase);

      if (!data) {
        issues.push(`Phase ${phase} data missing`);
        continue;
      }

      if (data.score === undefined || data.score < 0) {
        issues.push(`Phase ${phase} has invalid score`);
      }

      // Check unlock requirements for next phase
      const nextPhase = phase + 1;
      if (nextPhase <= targetPhase && requiredScores[nextPhase]) {
        if (data.score < requiredScores[nextPhase]) {
          issues.push(
            `Phase ${phase} score (${data.score}) insufficient to unlock Phase ${nextPhase} (requires ${requiredScores[nextPhase]}+)`
          );
        }
      }
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      summary:
        issues.length === 0
          ? "Data chain valid"
          : `${issues.length} issues found`,
    };
  }

  /**
   * Show notification about data generation
   * @param {number} targetPhase - Target phase
   */
  showDataGenerationNotification(targetPhase) {
    const message = `🔄 Dados de progresso simulados gerados para acesso direto à Fase ${targetPhase}. Todas as fases anteriores foram marcadas como concluídas com desempenho realista.`;

    if (typeof window.showToast === "function") {
      window.showToast(message, "info", 8000);
    } else if (typeof window.ModalSystem !== "undefined") {
      window.ModalSystem.notify(message, { type: "info", duration: 8000 });
    } else {
      console.log(message);
    }
  }

  /**
   * Create fallback storage manager if not available
   * @returns {Object} Fallback storage manager
   */
  createFallbackStorage() {
    return {
      loadPhaseResults: (phase) => {
        try {
          const data = localStorage.getItem(`saasi_phase${phase}_results`);
          return data ? JSON.parse(data) : null;
        } catch (error) {
          console.error(`Error loading phase ${phase} results:`, error);
          return null;
        }
      },
      savePhaseResults: (phase, data) => {
        try {
          localStorage.setItem(
            `saasi_phase${phase}_results`,
            JSON.stringify(data)
          );
          return { success: true };
        } catch (error) {
          console.error(`Error saving phase ${phase} results:`, error);
          return { success: false, error: error.message };
        }
      },
    };
  }

  /**
   * Create fallback case data if not available
   * @returns {Object} Fallback case data
   */
  createFallbackCaseData() {
    return {
      personal: {
        nome: "Felisbina Santos",
        idade: 56,
        escolaridade: "9º ano",
      },
      dld_analysis: {
        fatores_risco: [
          { fator: "Idade superior a 45 anos", peso: "moderado" },
          { fator: "Dependência emocional", peso: "moderado" },
          { fator: "Isolamento social", peso: "baixo" },
        ],
        fatores_protecao: [
          { fator: "Experiência profissional prévia", peso: "alto" },
          { fator: "Motivação para mudança", peso: "alto" },
          { fator: "Educação adequada", peso: "moderado" },
        ],
      },
    };
  }

  /**
   * Reset all generated data (for testing purposes)
   */
  resetGeneratedData() {
    for (let phase = 1; phase <= 4; phase++) {
      const data = this.storageManager.loadPhaseResults(phase);
      if (data && data.generated) {
        localStorage.removeItem(`saasi_phase${phase}_results`);
        console.log(`🗑️ Removed generated data for Phase ${phase}`);
      }
    }
  }

  /**
   * Get summary of generated data
   * @returns {Object} Summary of what data has been generated
   */
  getGeneratedDataSummary() {
    const summary = {
      total_phases: 0,
      generated_phases: [],
      natural_phases: [],
      scores: {},
    };

    for (let phase = 1; phase <= 4; phase++) {
      const data = this.storageManager.loadPhaseResults(phase);
      if (data && data.score !== undefined) {
        summary.total_phases++;
        summary.scores[`phase${phase}`] = data.score;

        if (data.generated) {
          summary.generated_phases.push(phase);
        } else {
          summary.natural_phases.push(phase);
        }
      }
    }

    return summary;
  }
}

// Initialize global instance
window.PhaseDataGenerator = new PhaseDataGenerator();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = PhaseDataGenerator;
}

console.log("🔄 SAASI Phase Data Generator loaded successfully");
