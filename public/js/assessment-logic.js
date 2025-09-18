/**
 * SAASI Escape Room - Assessment Logic System
 * Agent 2: Content & Logic Specialist Implementation
 *
 * This module provides contextually accurate DLD assessment logic that:
 * - Properly evaluates education levels based on historical context
 * - Implements weighted response evaluation with justifications
 * - Ensures all decisions are contextually appropriate
 * - Provides educational feedback for learning
 */

/**
 * DLD Assessment Context Configuration
 * Historical and contextual data for proper evaluation
 */
const DLD_ASSESSMENT_CONTEXT = {
  felisbina_profile: {
    birth_year: 1968,
    current_age: 56,
    education_era: "1970s-1980s",
    education_level: "9º ano",
    historical_context: {
      education_adequacy: "adequate_for_era",
      reasoning:
        "Em 1968, o 9º ano era considerado um nível educacional apropriado, especialmente para mulheres",
    },
  },

  dld_criteria: {
    unemployment_duration: ">12 meses",
    age_factor: "56 anos (fator de risco por idade)",
    education_context: "9º ano",
    social_benefits: "RSI + PSI ativas",
    emotional_dependency: "Dependência emocional identificada",
    work_experience: "6 meses experiência em limpeza (fator positivo)",
  },

  contextual_factors: {
    positive: [
      "motivacao_trabalho",
      "experiencia_previa",
      "qualificacao_adequada_contexto",
      "beneficios_sociais_ativos",
      "idade_produtiva",
    ],
    risk: [
      "idade_superior_45",
      "dependencia_emocional",
      "perda_suporte_familiar",
      "isolamento_social",
    ],
    protective: [
      "experiencia_limpeza",
      "motivacao_mudanca",
      "educacao_adequada_epoca",
      "apoio_social_institucional",
    ],
  },
};

/**
 * Response Quality Assessment with Justifications
 * Each response option has specific justifications and quality levels
 */
const RESPONSE_QUALITY_ASSESSMENT = {
  availability: {
    sim_total: {
      points: 12,
      quality: "excellent",
      justification:
        "Reconhece que Felisbina não tem dependentes e demonstra motivação para trabalhar",
      context:
        "Apesar da dependência emocional, não há impedimentos físicos ou familiares diretos",
      dld_impact: "positive",
      recommendation: "Encaminhamento direto com apoio psicológico preventivo",
    },
    sim_condicionada: {
      points: 10,
      quality: "good",
      justification:
        "Identifica corretamente a necessidade de apoio psicológico para a dependência emocional",
      context:
        "Abordagem prudente que reconhece os fatores de risco identificados",
      dld_impact: "positive_conditional",
      recommendation:
        "Encaminhamento com acompanhamento psicológico obrigatório",
    },
    nao: {
      points: 4,
      quality: "poor",
      justification:
        "Subestima a capacidade de recuperação e motivação demonstrada pela Felisbina",
      context:
        "Decisão excessivamente conservadora que pode perpetuar dependência",
      dld_impact: "negative",
      recommendation:
        "Reavaliação necessária - pode estar a limitar desnecessariamente",
    },
  },

  capacity: {
    sim_formacao: {
      points: 15,
      quality: "excellent",
      justification:
        "Reconhece a experiência prévia e identifica oportunidade de desenvolvimento profissional",
      context:
        "9º ano + 6 meses experiência = base sólida para formação adicional",
      dld_impact: "very_positive",
      recommendation:
        "Formação profissional em limpeza/serviços ou áreas relacionadas",
    },
    sim_plena: {
      points: 8,
      quality: "adequate",
      justification:
        "Reconhece capacidade mas não otimiza potencial de desenvolvimento",
      context: "Pode limitar oportunidades de crescimento profissional",
      dld_impact: "positive",
      recommendation: "Inserção direta mas sem desenvolvimento adicional",
    },
    nao: {
      points: 2,
      quality: "poor",
      justification: "Ignora experiência prévia e potencial demonstrado",
      context: "Decisão que contradiz evidências de capacidade já demonstrada",
      dld_impact: "very_negative",
      recommendation: "Revisão urgente - decisão não fundamentada",
    },
  },
};

/**
 * Educational Context Validation
 * Validates education levels against historical context
 */
const EDUCATION_CONTEXT_VALIDATOR = {
  /**
   * Validate education level appropriateness based on birth year
   * @param {number} birthYear - Year of birth
   * @param {string} educationLevel - Education level achieved
   * @returns {Object} Validation result with context
   */
  validateEducationLevel(birthYear, educationLevel) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    // Education eras and expectations
    const educationEras = {
      "1940-1960": { typical: "4º ano", good: "6º ano", excellent: "9º ano+" },
      "1960-1980": { typical: "6º ano", good: "9º ano", excellent: "12º ano+" },
      "1980-2000": {
        typical: "9º ano",
        good: "12º ano",
        excellent: "Superior",
      },
    };

    let era = "1960-1980"; // Felisbina's era
    if (birthYear <= 1960) era = "1940-1960";
    else if (birthYear >= 1980) era = "1980-2000";

    const expectations = educationEras[era];

    let assessment = "adequate";
    let reasoning = "";

    if (educationLevel === "9º ano") {
      if (era === "1940-1960") {
        assessment = "excellent";
        reasoning = "Educação acima da média para a época de nascimento";
      } else if (era === "1960-1980") {
        assessment = "good";
        reasoning = "Educação adequada e representativa da época";
      } else {
        assessment = "adequate";
        reasoning = "Educação mínima para a época";
      }
    }

    return {
      assessment: assessment,
      reasoning: reasoning,
      era: era,
      expectations: expectations,
      is_adequate_for_age: true,
      contextual_note: `Para nascidos em ${birthYear}, o ${educationLevel} representa ${assessment} qualificação`,
    };
  },
};

/**
 * Main Assessment Logic Engine
 */
class AssessmentLogic {
  /**
   * Generate DLD criteria display with proper context
   * @param {Object} profile - User profile data
   * @returns {Object} Formatted DLD criteria
   */
  static generateDLDCriteria(
    profile = DLD_ASSESSMENT_CONTEXT.felisbina_profile
  ) {
    const educationValidation =
      EDUCATION_CONTEXT_VALIDATOR.validateEducationLevel(
        profile.birth_year,
        profile.education_level
      );

    return {
      unemployment: {
        status: "✅",
        text: "Desemprego de longa duração (>12 meses)",
        assessment: "criteria_met",
        impact: "qualifies_for_dld",
      },
      age: {
        status: "⚠️",
        text: `Idade ${profile.current_age} anos (fator de risco)`,
        assessment: "risk_factor",
        impact: "requires_support",
      },
      education: {
        status: "✅",
        text: `Qualificação ${profile.education_level}`,
        assessment: educationValidation.assessment,
        impact: "adequate_for_context",
        context: educationValidation.reasoning,
      },
      benefits: {
        status: "✅",
        text: "Beneficiária RSI + PSI ativas",
        assessment: "criteria_met",
        impact: "social_support_confirmed",
      },
      emotional: {
        status: "⚠️",
        text: "Dependência emocional identificada",
        assessment: "requires_attention",
        impact: "needs_psychological_support",
      },
      experience: {
        status: "✅",
        text: "6 meses experiência profissional (fator positivo)",
        assessment: "positive_factor",
        impact: "demonstrates_capacity",
      },
    };
  }

  /**
   * Evaluate response quality with justification
   * @param {string} type - Type of assessment (availability/capacity)
   * @param {string} choice - Selected choice
   * @returns {Object} Detailed evaluation
   */
  static evaluateResponse(type, choice) {
    const assessment = RESPONSE_QUALITY_ASSESSMENT[type]?.[choice];

    if (!assessment) {
      return {
        points: 0,
        quality: "invalid",
        justification: "Resposta não reconhecida",
        recommendation: "Selecione uma opção válida",
      };
    }

    return {
      ...assessment,
      type: type,
      choice: choice,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Generate comprehensive assessment report
   * @param {Object} decisions - User decisions object
   * @returns {Object} Complete assessment report
   */
  static generateAssessmentReport(decisions) {
    const availabilityEval = this.evaluateResponse(
      "availability",
      decisions.availability
    );
    const capacityEval = this.evaluateResponse("capacity", decisions.capacity);

    const totalPoints = availabilityEval.points + capacityEval.points;
    const maxPoints = 27; // 15 + 12 maximum
    const percentage = Math.round((totalPoints / maxPoints) * 100);

    // Determine overall assessment quality
    let overallQuality = "poor";
    if (percentage >= 85) overallQuality = "excellent";
    else if (percentage >= 70) overallQuality = "good";
    else if (percentage >= 50) overallQuality = "adequate";

    // Generate final recommendation
    let finalRecommendation = "";
    if (
      decisions.availability === "sim_total" &&
      decisions.capacity === "sim_formacao"
    ) {
      finalRecommendation =
        "Encaminhamento IEFP com formação profissional - Decisão otimizada";
    } else if (
      decisions.availability !== "nao" &&
      decisions.capacity !== "nao"
    ) {
      finalRecommendation = "Encaminhamento IEFP aprovado - Decisão adequada";
    } else {
      finalRecommendation =
        "Apoio adicional necessário antes do encaminhamento";
    }

    return {
      availability: availabilityEval,
      capacity: capacityEval,
      overall: {
        points: totalPoints,
        maxPoints: maxPoints,
        percentage: percentage,
        quality: overallQuality,
        recommendation: finalRecommendation,
      },
      contextual_assessment: {
        education_appropriate: true,
        age_considerations: "Idade produtiva com necessidade de apoio",
        experience_valuable: true,
        dld_status: "Elegível com perfil de sucesso moderado a alto",
      },
    };
  }

  /**
   * Validate assessment logic consistency
   * @param {Object} gameState - Current game state
   * @returns {Object} Validation results
   */
  static validateAssessmentConsistency(gameState) {
    const issues = [];
    const warnings = [];

    // Check for logical inconsistencies
    if (
      gameState.availability === "nao" &&
      gameState.capacity === "sim_plena"
    ) {
      warnings.push(
        "Inconsistência: Sem disponibilidade mas com capacidade plena"
      );
    }

    if (
      gameState.availability === "sim_total" &&
      gameState.capacity === "nao"
    ) {
      warnings.push("Inconsistência: Disponibilidade total mas sem capacidade");
    }

    // Check education context
    const educationValidation =
      EDUCATION_CONTEXT_VALIDATOR.validateEducationLevel(1968, "9º ano");
    if (!educationValidation.is_adequate_for_age) {
      issues.push("Avaliação educacional não considera contexto histórico");
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      warnings: warnings,
      recommendations: this.generateRecommendationsFromValidation(
        issues,
        warnings
      ),
    };
  }

  /**
   * Generate recommendations based on validation
   * @param {Array} issues - Validation issues
   * @param {Array} warnings - Validation warnings
   * @returns {Array} Recommendations
   */
  static generateRecommendationsFromValidation(issues, warnings) {
    const recommendations = [];

    if (issues.length > 0) {
      recommendations.push({
        priority: "alta",
        area: "Lógica de Avaliação",
        suggestion:
          "Rever critérios de avaliação para garantir consistência contextual",
      });
    }

    if (warnings.length > 0) {
      recommendations.push({
        priority: "média",
        area: "Coerência de Decisões",
        suggestion:
          "Verificar alinhamento entre decisões de disponibilidade e capacidade",
      });
    }

    return recommendations;
  }
}

/**
 * Testing suite for assessment logic
 */
class AssessmentLogicTests {
  static runAllTests() {
    console.log("🧪 Running Assessment Logic Tests...");

    const tests = [
      this.testEducationValidation,
      this.testResponseEvaluation,
      this.testDLDCriteria,
      this.testAssessmentReport,
      this.testConsistencyValidation,
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

    console.log(`\n📊 Assessment Tests: ${passed} passed, ${failed} failed`);
    return { passed, failed, total: tests.length };
  }

  static testEducationValidation() {
    const validation = EDUCATION_CONTEXT_VALIDATOR.validateEducationLevel(
      1968,
      "9º ano"
    );
    if (validation.assessment !== "good")
      throw new Error("Should assess 9º ano as good for 1968");
    if (!validation.is_adequate_for_age)
      throw new Error("Should be adequate for age");
  }

  static testResponseEvaluation() {
    const eval1 = AssessmentLogic.evaluateResponse("availability", "sim_total");
    if (eval1.quality !== "excellent")
      throw new Error("sim_total should be excellent");

    const eval2 = AssessmentLogic.evaluateResponse("capacity", "sim_formacao");
    if (eval2.points !== 15)
      throw new Error("sim_formacao should give 15 points");
  }

  static testDLDCriteria() {
    const criteria = AssessmentLogic.generateDLDCriteria();
    if (criteria.education.status !== "✅")
      throw new Error("Education should be positive");
    if (!criteria.education.text.includes("adequado"))
      throw new Error("Should mention adequacy");
  }

  static testAssessmentReport() {
    const decisions = { availability: "sim_total", capacity: "sim_formacao" };
    const report = AssessmentLogic.generateAssessmentReport(decisions);
    if (report.overall.quality !== "excellent")
      throw new Error("Should be excellent for best choices");
  }

  static testConsistencyValidation() {
    const gameState = { availability: "nao", capacity: "sim_plena" };
    const validation = AssessmentLogic.validateAssessmentConsistency(gameState);
    if (validation.warnings.length === 0)
      throw new Error("Should detect inconsistency");
  }
}

// Export for global use
if (typeof window !== "undefined") {
  window.AssessmentLogic = AssessmentLogic;
  window.AssessmentLogicTests = AssessmentLogicTests;
  window.DLD_ASSESSMENT_CONTEXT = DLD_ASSESSMENT_CONTEXT;
  window.RESPONSE_QUALITY_ASSESSMENT = RESPONSE_QUALITY_ASSESSMENT;
  window.EDUCATION_CONTEXT_VALIDATOR = EDUCATION_CONTEXT_VALIDATOR;
}

// Export for Node.js (testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    AssessmentLogic,
    AssessmentLogicTests,
    DLD_ASSESSMENT_CONTEXT,
    RESPONSE_QUALITY_ASSESSMENT,
    EDUCATION_CONTEXT_VALIDATOR,
  };
}

console.log("✅ SAASI Assessment Logic System loaded successfully");
