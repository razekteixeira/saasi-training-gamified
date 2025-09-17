/**
 * SAASI Escape Room - Felisbina Case Data
 * Agent 2: Content & Logic Specialist Implementation
 *
 * This module contains accurate and contextually validated data about
 * Felisbina's case for consistent use across all phases of the escape room.
 */

/**
 * Complete Felisbina Profile with Historical Context
 */
const FELISBINA_CASE_DATA = {
  // Basic Demographics
  personal: {
    nome: "Felisbina Santos",
    idade: 56,
    ano_nascimento: 1968,
    escolaridade: "9º ano",
    estado_civil: "solteira", // inferred from living alone
    habitacao: "Vive sozinha numa pensão",
  },

  // Social Benefits and Financial Situation
  benefits: {
    rsi: {
      status: "ativa",
      inicio: "Março 2025",
      duracao_meses: 1, // assuming current is April 2025
      valor_estimado: "253.20€", // 2025 RSI value
    },
    psi: {
      status: "ativa",
      motivo: "Sem diagnóstico conhecido",
      observacoes: "Recebe prestação sem diagnóstico específico identificado",
    },
    historico_financeiro: {
      anterior_rsi: "Contava com retaguarda do irmão",
      gestao_financeira: "Anteriormente feita pelo irmão",
      situacao_atual: "Gestão financeira independente recente",
    },
  },

  // Professional Experience and Skills
  work_experience: {
    empregada_limpeza: {
      duracao: "6 meses",
      tipo: "Única experiência profissional",
      competencias_desenvolvidas: [
        "Limpeza de espaços",
        "Organização",
        "Pontualidade",
        "Trabalho autónomo",
        "Uso de produtos de limpeza",
      ],
      avaliacao: "Experiência valiosa e transferível para outras áreas",
    },
    competencias_potenciais: [
      "Cuidado e atenção ao detalhe",
      "Capacidade de trabalho físico",
      "Experiência em ambiente profissional",
      "Conhecimento básico de higiene e segurança",
    ],
  },

  // Educational Context with Historical Perspective
  education: {
    nivel: "9º ano",
    contexto_historico: {
      ano_nascimento: 1968,
      periodo_escolar: "1974-1984 (aproximadamente)",
      contexto_social:
        "Durante este período, o 9º ano era considerado uma educação adequada",
      comparacao_atual: "Equivalente ao ensino básico completo",
      adequacao: "Adequado para a época e contexto social",
      nota_importante:
        "Para mulheres nascidas em 1968, o 9º ano representa uma escolaridade adequada para os padrões da época",
    },
    competencias_educacionais: [
      "Literacia básica",
      "Numeracia básica",
      "Conhecimentos gerais",
      "Capacidade de aprendizagem",
    ],
  },

  // Family and Social Situation
  family_social: {
    dependencia_emocional: {
      figura: "Progenitor (pai)",
      manifestacao: "Menciona sempre nos atendimentos",
      impacto: "Procura validação e orientação",
      avaliacao: "Pode afetar autonomia mas não incapacita",
    },
    ruptura_familiar: {
      figura: "Irmão",
      anterior: "Fazia gestão financeira e orientação",
      ruptura: "Cortaram relação",
      impacto_emocional: "Sente-se sozinha",
      impacto_pratico: "Teve que assumir gestão financeira própria",
    },
    rede_social: {
      atual: "Reduzida",
      suporte_institucional: "Técnica de acompanhamento",
      isolamento: "Presente mas não total",
      potencial_rede: "Pode ser desenvolvida",
    },
  },

  // Health and Psychological Profile
  health: {
    fisica: {
      diagnostico_conhecido: "Não tem diagnóstico conhecido",
      psi_eligibility: "Recebe PSI sem diagnóstico específico",
      capacidade_trabalho: "Aparentemente sem limitações físicas",
      idade_ativa: "56 anos - ainda em idade produtiva",
    },
    psicologica: {
      dependencia_emocional: "Identificada - necessita apoio",
      adaptacao: "Dificuldade inicial mas capacidade de adaptação",
      motivacao: "Demonstra interesse em mudança",
      resiliencia:
        "Histórico de ultrapassar dificuldades (experiência trabalho)",
    },
  },

  // DLD Assessment Factors
  dld_analysis: {
    fatores_risco: [
      {
        fator: "Idade superior a 45 anos",
        impacto: "Fator de risco para reinserção",
        peso: "moderado",
      },
      {
        fator: "Dependência emocional",
        impacto: "Pode afetar autonomia profissional",
        peso: "moderado",
      },
      {
        fator: "Isolamento social",
        impacto: "Reduzida rede de suporte",
        peso: "baixo",
      },
      {
        fator: "Gestão financeira recente",
        impacto: "Inexperiência em autonomia financeira",
        peso: "baixo",
      },
    ],

    fatores_protecao: [
      {
        fator: "Experiência profissional prévia",
        impacto: "Demonstra capacidade de trabalho",
        peso: "alto",
      },
      {
        fator: "Motivação para mudança",
        impacto: "Procura ativamente apoio",
        peso: "alto",
      },
      {
        fator: "Educação adequada para a época",
        impacto: "Base educacional sólida",
        peso: "moderado",
      },
      {
        fator: "Benefícios sociais ativos",
        impacto: "Estabilidade financeira básica",
        peso: "moderado",
      },
      {
        fator: "Acompanhamento técnico",
        impacto: "Suporte profissional disponível",
        peso: "moderado",
      },
    ],

    prognóstico: {
      disponibilidade: "Alta - sem dependentes ou impedimentos diretos",
      capacidade: "Boa com formação - experiência prévia e motivação",
      necessidades_apoio: [
        "Apoio psicológico para dependência emocional",
        "Formação profissional complementar",
        "Acompanhamento durante período de adaptação",
      ],
      areas_formacao_sugeridas: [
        "Limpeza e higienização (aprofundamento)",
        "Apoio domiciliário",
        "Auxiliar de serviços gerais",
        "Cuidados básicos (com formação adicional)",
      ],
    },
  },

  // Response Quality Mapping for Educational Purposes
  response_mapping: {
    correct_assessment: {
      disponibilidade: "SIM - Disponibilidade total ou condicionada",
      justificacao_disponibilidade:
        "Sem dependentes, motivada, apenas necessita apoio psicológico preventivo",
      capacidade: "SIM - Capacidade com formação",
      justificacao_capacidade:
        "Experiência prévia + educação adequada + motivação = base excelente para formação",
      decisao_otima: "Encaminhamento IEFP com formação profissional",
    },

    common_mistakes: [
      {
        erro: "Avaliar 9º ano como baixa qualificação",
        correcao: "Para 1968, 9º ano é adequado",
        impacto: "Subestima potencial da pessoa",
      },
      {
        erro: "Focar apenas na dependência emocional",
        correcao: "Considerar também fatores de proteção",
        impacto: "Visão demasiado pessimista",
      },
      {
        erro: "Ignorar experiência profissional prévia",
        correcao: "6 meses são valiosos e demonstram capacidade",
        impacto: "Perde oportunidade de valorizar competências",
      },
    ],
  },
};

/**
 * Utility functions for case data manipulation
 */
class FelisbinaCaseUtils {
  /**
   * Get age-appropriate education assessment
   * @returns {Object} Education assessment with context
   */
  static getEducationAssessment() {
    return {
      nivel: FELISBINA_CASE_DATA.education.nivel,
      adequacao: "adequado",
      contexto: FELISBINA_CASE_DATA.education.contexto_historico,
      comparacao_moderna: "Ensino básico completo",
      recomendacao: "Valorizar como base sólida para formação adicional",
    };
  }

  /**
   * Calculate DLD risk/protection score
   * @returns {Object} Balanced assessment
   */
  static calculateDLDBalance() {
    const riscos = FELISBINA_CASE_DATA.dld_analysis.fatores_risco;
    const protecoes = FELISBINA_CASE_DATA.dld_analysis.fatores_protecao;

    const pesoMap = { alto: 3, moderado: 2, baixo: 1 };

    const riskScore = riscos.reduce((sum, r) => sum + pesoMap[r.peso], 0);
    const protectionScore = protecoes.reduce(
      (sum, p) => sum + pesoMap[p.peso],
      0
    );

    return {
      risk_total: riskScore,
      protection_total: protectionScore,
      balance: protectionScore - riskScore,
      assessment:
        protectionScore > riskScore
          ? "favorable"
          : protectionScore === riskScore
          ? "balanced"
          : "needs_support",
      recommendation:
        protectionScore > riskScore
          ? "Encaminhamento recomendado com apoio"
          : "Encaminhamento com apoio intensivo",
    };
  }

  /**
   * Generate contextual timeline
   * @returns {Object} Important dates and context
   */
  static generateTimeline() {
    return {
      1968: "Nascimento da Felisbina",
      "1974-1984": "Período escolar (estimado) - 9º ano",
      "~2024": "Experiência como empregada de limpeza (6 meses)",
      "Março 2025": "Início do RSI",
      "Abril 2025": "Acompanhamento técnico atual (presente)",
    };
  }

  /**
   * Validate case data consistency
   * @returns {Object} Validation results
   */
  static validateCaseConsistency() {
    const issues = [];
    const data = FELISBINA_CASE_DATA;

    // Age consistency
    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - data.personal.ano_nascimento;
    if (Math.abs(calculatedAge - data.personal.idade) > 1) {
      issues.push("Inconsistência de idade calculada");
    }

    // Education era consistency
    const schoolStartYear = data.personal.ano_nascimento + 6;
    if (schoolStartYear < 1974 || schoolStartYear > 1976) {
      issues.push("Período escolar pode estar incorreto");
    }

    return {
      valid: issues.length === 0,
      issues: issues,
      summary:
        issues.length === 0
          ? "Dados consistentes"
          : `${issues.length} inconsistências encontradas`,
    };
  }
}

// Export for global use
if (typeof window !== "undefined") {
  window.FELISBINA_CASE_DATA = FELISBINA_CASE_DATA;
  window.FelisbinaCaseUtils = FelisbinaCaseUtils;
}

// Export for Node.js (testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FELISBINA_CASE_DATA,
    FelisbinaCaseUtils,
  };
}

console.log("✅ SAASI Felisbina Case Data loaded successfully");
