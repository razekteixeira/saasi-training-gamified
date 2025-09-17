/**
 * SAASI Escape Room - Success Rate & Justification System
 * Sistema de taxas de sucesso visíveis e justificações contextuais
 *
 * Agent 4 Implementation - 4.3 Success Rate Logic & Justifications
 *
 * FUNCIONALIDADES:
 * - Taxas de sucesso visíveis e documentadas
 * - Justificações detalhadas para cada decisão
 * - Tooltips informativos contextuais
 * - Sistema de explicações educacionais
 */

class SuccessRateSystem {
  constructor() {
    this.successRates = new Map();
    this.justifications = new Map();
    this.tooltips = new Map();

    this.init();
  }

  init() {
    this.setupSuccessRates();
    this.setupJustifications();
    this.setupTooltips();
    this.initializeTooltipSystem();

    console.log(
      "SuccessRateSystem initialized with",
      this.successRates.size,
      "success rates"
    );
  }

  /**
   * Configurar todas as taxas de sucesso documentadas
   */
  setupSuccessRates() {
    // PUZZLE 1: Gestão de Progresso - Taxas de sucesso das avaliações
    this.successRates.set("progress_consultas_psicologia_continuar", {
      rate: 95,
      category: "program_evaluation",
      context: "Programa com excelente progresso",
      factors: ["Adesão 90%", "Satisfação 85%", "Progresso consistente"],
    });

    this.successRates.set("progress_programa_qualifica_ajustar", {
      rate: 85,
      category: "program_evaluation",
      context: "Programa com dificuldades identificadas",
      factors: [
        "Apoio pedagógico disponível",
        "Motivação mantida",
        "Componente prática forte",
      ],
    });

    this.successRates.set("progress_grupos_apoio_alternativa", {
      rate: 80,
      category: "program_evaluation",
      context: "Resistência identificada, alternativas disponíveis",
      factors: [
        "Grupos específicos existem",
        "Perfil adequado identificado",
        "Apoio individual possível",
      ],
    });

    // PUZZLE 2: Gestão de Crises - Taxas de sucesso das respostas
    this.successRates.set("crisis_habitacional_emergencia_social", {
      rate: 80,
      category: "crisis_response",
      context: "Serviço de emergência social tem recursos disponíveis",
      factors: [
        "Fundo emergencial ativo",
        "Alojamentos temporários disponíveis",
        "Resposta rápida (24h)",
      ],
    });

    this.successRates.set("crisis_habitacional_apoio_familia", {
      rate: 30,
      category: "crisis_response",
      context: "Família com limitações financeiras conhecidas",
      factors: [
        "Histórico de dificuldades familiares",
        "Espaço limitado",
        "Situação temporária",
      ],
    });

    this.successRates.set("crisis_emprego_negociar_part_time", {
      rate: 70,
      category: "crisis_response",
      context: "Empresas abertas a flexibilidade, IEFP apoia conciliação",
      factors: [
        "Empresa interessada na candidata",
        "IEFP facilita acordos",
        "Precedentes positivos",
      ],
    });

    this.successRates.set("crisis_emprego_aceitar_suspender", {
      rate: 90,
      category: "crisis_response",
      context: "Emprego garantido mas sem certificação",
      factors: [
        "Vaga confirmada",
        "Início imediato",
        "Sem requisitos adicionais",
      ],
    });

    this.successRates.set("crisis_grupos_encontrar_alternativo", {
      rate: 85,
      category: "crisis_response",
      context: "Grupos específicos para mulheres 55+ disponíveis na região",
      factors: [
        "IPSS tem grupos especializados",
        "Perfil etário adequado",
        "Atividades direcionadas",
      ],
    });

    // PUZZLE 3: Ajuste de Estratégias - Taxas de sucesso das estratégias
    this.successRates.set("strategy_modelo_hibrido", {
      rate: 75,
      category: "strategy_adjustment",
      context: "Modelo testado com sucesso em casos similares",
      factors: [
        "Experiência prévia positiva",
        "Apoio institucional",
        "Flexibilidade comprovada",
      ],
    });

    this.successRates.set("strategy_competencias_praticas", {
      rate: 90,
      category: "strategy_adjustment",
      context: "Alinha com pontos fortes identificados da Felisbina",
      factors: [
        "Competências práticas fortes",
        "Menos ansiedade",
        "Resultados imediatos",
      ],
    });

    this.successRates.set("strategy_apoio_personalizado", {
      rate: 80,
      category: "strategy_adjustment",
      context: "Reduz ansiedade social, permite progressão gradual",
      factors: [
        "Menos pressão social",
        "Apoio direcionado",
        "Progressão controlada",
      ],
    });

    // PUZZLE 4: Preparação Autonomia - Taxas de sucesso das ações
    this.successRates.set("autonomy_habitacional_inscricao", {
      rate: 60,
      category: "autonomy_preparation",
      context: "Lista de espera longa mas processo necessário",
      factors: [
        "Lista de espera 18-24 meses",
        "Processo obrigatório",
        "Prioridade por situação",
      ],
    });

    this.successRates.set("autonomy_profissional_certificacao", {
      rate: 85,
      category: "autonomy_preparation",
      context: "Com apoio pedagógico, certificação é alcançável",
      factors: [
        "Apoio pedagógico disponível",
        "Componente prática forte",
        "Motivação profissional",
      ],
    });

    this.successRates.set("autonomy_emocional_reducao_consultas", {
      rate: 90,
      category: "autonomy_preparation",
      context: "Progresso emocional permite redução gradual",
      factors: [
        "Estabilidade demonstrada",
        "Estratégias aprendidas",
        "Rede apoio estabelecida",
      ],
    });

    this.successRates.set("autonomy_social_participacao_regular", {
      rate: 70,
      category: "autonomy_preparation",
      context: "Com apoio inicial, participação social é desenvolvível",
      factors: [
        "Atividades adequadas identificadas",
        "Apoio técnico inicial",
        "Progressão gradual",
      ],
    });
  }

  /**
   * Configurar justificações detalhadas para cada decisão
   */
  setupJustifications() {
    // PUZZLE 1: Justificações para avaliações de progresso
    this.justifications.set("progress_consultas_psicologia_continuar", {
      title: "Por que continuar conforme planeado?",
      reasoning:
        "O programa de consultas de psicologia apresenta indicadores excelentes com 90% de adesão e progresso consistente na redução da dependência emocional.",
      evidence: [
        "Redução significativa da dependência emocional do pai",
        "Adesão de 90% às consultas agendadas",
        "Satisfação de 85% expressa pela Felisbina",
        "Objetivos terapêuticos 70% alcançados",
      ],
      alternatives:
        "Outras ações como reduzir frequência seriam prematuras dado o progresso positivo.",
      professional_standard:
        "Manter intervenções eficazes é princípio fundamental do trabalho social.",
    });

    this.justifications.set("progress_programa_qualifica_ajustar", {
      title: "Por que ajustar a metodologia?",
      reasoning:
        "O Programa Qualifica apresenta dificuldades específicas na componente teórica, mas mantém potencial com apoio adequado.",
      evidence: [
        "Aproveitamento de apenas 60% na componente teórica",
        "Motivação reduzida para 55%",
        "Adesão ainda aceitável (75%)",
        "Competências práticas em desenvolvimento",
      ],
      alternatives:
        "Abandonar seria desperdiçar progresso já alcançado. Manter sem ajustes perpetuaria dificuldades.",
      professional_standard:
        "Adaptação metodológica é essencial para responder às necessidades individuais.",
    });

    this.justifications.set("progress_grupos_apoio_estrategia_alternativa", {
      title: "Por que procurar estratégia alternativa?",
      reasoning:
        "A resistência aos grupos atuais indica inadequação do formato, não falta de necessidade de apoio social.",
      evidence: [
        "Participação de apenas 30% quando presente",
        "Adesão baixa (40%) com faltas frequentes",
        "Sentimento de não pertença ao grupo",
        "Isolamento social ainda significativo",
      ],
      alternatives:
        "Aceitar abandono deixaria necessidade social por resolver. Insistir no formato atual aumentaria resistência.",
      professional_standard:
        "Encontrar formatos adequados de apoio social é crucial para integração sustentável.",
    });

    // PUZZLE 2: Justificações para respostas a crises
    this.justifications.set("crisis_habitacional_emergencia_social", {
      title: "Por que contactar serviço de emergência social?",
      reasoning:
        "A situação habitacional é uma emergência que requer resposta institucional imediata e adequada.",
      evidence: [
        "Prazo limite de 3 dias para encontrar solução",
        "Serviço de emergência tem recursos específicos",
        "Probabilidade de sucesso de 80%",
        "Solução em 24h preserva continuidade dos programas",
      ],
      alternatives:
        "Família não tem condições. Suspender programas comprometeria progresso alcançado.",
      professional_standard:
        "Utilizar recursos institucionais adequados é responsabilidade profissional.",
    });

    this.justifications.set("crisis_emprego_negociar_part_time", {
      title: "Por que negociar horário part-time?",
      reasoning:
        "A conciliação entre emprego e formação maximiza benefícios a longo prazo sem desperdiçar oportunidades.",
      evidence: [
        "Experiência prática complementa formação teórica",
        "Rendimento imediato melhora situação financeira",
        "Certificação formal aumenta empregabilidade futura",
        "Empresas mostram-se flexíveis com apoio do IEFP",
      ],
      alternatives:
        "Aceitar só emprego perde certificação. Recusar perde oportunidade rara.",
      professional_standard:
        "Maximizar oportunidades de desenvolvimento integral é objetivo central.",
    });

    this.justifications.set("crisis_grupos_encontrar_alternativo", {
      title: "Por que procurar grupo alternativo?",
      reasoning:
        "A resistência indica inadequação do formato atual, não ausência de necessidade de apoio social.",
      evidence: [
        "Grupos específicos para mulheres 55+ existem na região",
        "Perfil etário e de género mais adequado",
        "Probabilidade de sucesso de 85%",
        "Mantém objetivo de integração social",
      ],
      alternatives:
        "Aceitar abandono deixa isolamento por resolver. Sessões individuais são preparatórias, não substituto.",
      professional_standard:
        "Adaptar intervenções ao perfil individual é essencial para eficácia.",
    });

    // PUZZLE 3: Justificações para ajustes estratégicos
    this.justifications.set("strategy_modelo_hibrido", {
      title: "Por que implementar modelo híbrido?",
      reasoning:
        "Combina benefícios imediatos do emprego com desenvolvimento de competências a longo prazo.",
      evidence: [
        "Experiência prática reforça aprendizagem teórica",
        "Rendimento imediato reduz pressão financeira",
        "Certificação formal garante empregabilidade futura",
        "Modelo testado com sucesso em casos similares",
      ],
      challenges:
        "Requer coordenação entre entidades e gestão de tempo eficaz.",
      professional_standard:
        "Integração de múltiplas dimensões de desenvolvimento é abordagem holística recomendada.",
    });

    this.justifications.set("strategy_competencias_praticas", {
      title: "Por que focar em competências práticas?",
      reasoning:
        "Alinha com pontos fortes identificados e reduz pressão que causa dificuldades.",
      evidence: [
        "Competências práticas são ponto forte da Felisbina",
        "Componente teórica causa ansiedade e desmotivação",
        "Resultados práticos aumentam autoconfiança",
        "Pode retomar teoria posteriormente com mais confiança",
      ],
      challenges: "Certificação fica incompleta temporariamente.",
      professional_standard:
        "Construir sobre pontos fortes é estratégia motivacional eficaz.",
    });

    // PUZZLE 4: Justificações para preparação de autonomia
    this.justifications.set("autonomy_contactos_seguimento", {
      title: "Por que manter contactos de seguimento?",
      reasoning:
        "Transição gradual previne recaídas e mantém suporte disponível quando necessário.",
      evidence: [
        "Redução gradual permite adaptação",
        "Suporte disponível em momentos críticos",
        "Previne isolamento súbito",
        "Permite ajustes conforme necessário",
      ],
      alternatives:
        "Corte abrupto pode causar insegurança. Manter intensidade impede autonomia.",
      professional_standard:
        "Transição gradual e acompanhamento são práticas recomendadas para sustentabilidade.",
    });
  }

  /**
   * Configurar tooltips informativos
   */
  setupTooltips() {
    // Tooltips para taxas de sucesso
    this.tooltips.set("success_rate_80", {
      title: "Taxa de Sucesso: 80%",
      content:
        "Esta opção tem alta probabilidade de sucesso baseada em dados históricos e recursos disponíveis.",
      icon: "📊",
    });

    this.tooltips.set("success_rate_70", {
      title: "Taxa de Sucesso: 70%",
      content:
        "Opção com boa probabilidade de sucesso, mas pode requerer coordenação adicional.",
      icon: "📈",
    });

    this.tooltips.set("success_rate_30", {
      title: "Taxa de Sucesso: 30%",
      content:
        "Opção com baixa probabilidade de sucesso devido a limitações conhecidas.",
      icon: "⚠️",
    });

    // Tooltips para conceitos técnicos
    this.tooltips.set("programa_qualifica", {
      title: "Programa Qualifica",
      content:
        "Programa nacional de qualificação profissional que combina formação teórica e prática para certificação de competências.",
      icon: "🎓",
    });

    this.tooltips.set("emergencia_social", {
      title: "Serviço de Emergência Social",
      content:
        "Serviço municipal que responde a situações de emergência habitacional, providenciando alojamento temporário.",
      icon: "🏠",
    });

    this.tooltips.set("autonomia_gradual", {
      title: "Redução Gradual de Apoio",
      content:
        "Processo de diminuição progressiva do apoio técnico para promover autonomia sustentável.",
      icon: "📉",
    });
  }

  /**
   * Inicializar sistema de tooltips
   */
  initializeTooltipSystem() {
    // Criar container para tooltips
    if (!document.getElementById("tooltip-container")) {
      const container = document.createElement("div");
      container.id = "tooltip-container";
      container.style.cssText = `
                position: fixed;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 14px;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;
      document.body.appendChild(container);
    }

    // Event listeners para mostrar/esconder tooltips
    document.addEventListener("mouseover", this.handleTooltipShow.bind(this));
    document.addEventListener("mouseout", this.handleTooltipHide.bind(this));
    document.addEventListener("mousemove", this.handleTooltipMove.bind(this));
  }

  /**
   * Mostrar tooltip
   */
  handleTooltipShow(event) {
    const element = event.target.closest("[data-tooltip]");
    if (!element) return;

    const tooltipKey = element.getAttribute("data-tooltip");
    const tooltip = this.tooltips.get(tooltipKey);

    if (!tooltip) return;

    const container = document.getElementById("tooltip-container");
    container.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="margin-right: 8px; font-size: 16px;">${tooltip.icon}</span>
                <strong>${tooltip.title}</strong>
            </div>
            <div>${tooltip.content}</div>
        `;

    container.style.opacity = "1";
  }

  /**
   * Esconder tooltip
   */
  handleTooltipHide(event) {
    const element = event.target.closest("[data-tooltip]");
    if (!element) {
      const container = document.getElementById("tooltip-container");
      container.style.opacity = "0";
    }
  }

  /**
   * Mover tooltip com o mouse
   */
  handleTooltipMove(event) {
    const container = document.getElementById("tooltip-container");
    if (container.style.opacity === "0") return;

    const x = event.clientX + 15;
    const y = event.clientY - 15;

    container.style.left = x + "px";
    container.style.top = y + "px";
  }

  /**
   * Obter taxa de sucesso para uma ação
   */
  getSuccessRate(actionKey) {
    const data = this.successRates.get(actionKey);
    return data ? data.rate : null;
  }

  /**
   * Obter justificação para uma ação
   */
  getJustification(actionKey) {
    return this.justifications.get(actionKey);
  }

  /**
   * Adicionar taxa de sucesso visível a um elemento
   */
  addSuccessRateDisplay(element, actionKey) {
    const data = this.successRates.get(actionKey);
    if (!data) return;

    // Criar badge de taxa de sucesso
    const badge = document.createElement("span");
    badge.className = "success-rate-badge";
    badge.innerHTML = `📊 ${data.rate}%`;
    badge.setAttribute("data-tooltip", `success_rate_${data.rate}`);

    // Estilo do badge
    badge.style.cssText = `
            background: ${this.getSuccessRateColor(data.rate)};
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-left: 8px;
            cursor: help;
        `;

    element.appendChild(badge);
  }

  /**
   * Obter cor baseada na taxa de sucesso
   */
  getSuccessRateColor(rate) {
    if (rate >= 80) return "#4caf50"; // Verde
    if (rate >= 60) return "#ff9800"; // Laranja
    if (rate >= 40) return "#f44336"; // Vermelho
    return "#9e9e9e"; // Cinza
  }

  /**
   * Adicionar botão de justificação a um elemento
   */
  addJustificationButton(element, actionKey) {
    const justification = this.justifications.get(actionKey);
    if (!justification) return;

    const button = document.createElement("button");
    button.className = "justification-button";
    button.innerHTML = "💡 Por quê?";
    button.style.cssText = `
            background: #2196f3;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
            margin-left: 8px;
        `;

    button.onclick = () => this.showJustificationModal(justification);
    element.appendChild(button);
  }

  /**
   * Mostrar modal com justificação detalhada
   */
  showJustificationModal(justification) {
    // Criar modal se não existir
    let modal = document.getElementById("justification-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "justification-modal";
      modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10001;
                display: none;
                align-items: center;
                justify-content: center;
            `;
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 12px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <h3 style="margin-top: 0; color: #2c3e50;">${
                  justification.title
                }</h3>
                
                <div style="margin: 20px 0;">
                    <h4 style="color: #34495e;">🎯 Fundamentação:</h4>
                    <p>${justification.reasoning}</p>
                </div>

                <div style="margin: 20px 0;">
                    <h4 style="color: #34495e;">📋 Evidências:</h4>
                    <ul>
                        ${justification.evidence
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>

                <div style="margin: 20px 0;">
                    <h4 style="color: #34495e;">🔄 Alternativas consideradas:</h4>
                    <p>${justification.alternatives}</p>
                </div>

                <div style="margin: 20px 0;">
                    <h4 style="color: #34495e;">⚖️ Padrão profissional:</h4>
                    <p>${justification.professional_standard}</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button onclick="document.getElementById('justification-modal').style.display='none'" 
                            style="background: #2196f3; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        Compreendido
                    </button>
                </div>
            </div>
        `;

    modal.style.display = "flex";
  }

  /**
   * Aplicar sistema completo a um elemento (taxa + justificação)
   */
  enhanceElement(element, actionKey) {
    this.addSuccessRateDisplay(element, actionKey);
    this.addJustificationButton(element, actionKey);
  }

  /**
   * Obter estatísticas do sistema
   */
  getStatistics() {
    return {
      successRates: this.successRates.size,
      justifications: this.justifications.size,
      tooltips: this.tooltips.size,
      categories: {
        program_evaluation: Array.from(this.successRates.values()).filter(
          (r) => r.category === "program_evaluation"
        ).length,
        crisis_response: Array.from(this.successRates.values()).filter(
          (r) => r.category === "crisis_response"
        ).length,
        strategy_adjustment: Array.from(this.successRates.values()).filter(
          (r) => r.category === "strategy_adjustment"
        ).length,
        autonomy_preparation: Array.from(this.successRates.values()).filter(
          (r) => r.category === "autonomy_preparation"
        ).length,
      },
    };
  }

  /**
   * Debug do sistema
   */
  debug() {
    console.group("SuccessRateSystem Debug");
    console.log("Statistics:", this.getStatistics());
    console.log("Success Rates:", Array.from(this.successRates.entries()));
    console.log("Justifications:", Array.from(this.justifications.keys()));
    console.log("Tooltips:", Array.from(this.tooltips.keys()));
    console.groupEnd();
  }
}

// Instância global
let successRateSystem;

// Inicializar quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  successRateSystem = new SuccessRateSystem();

  // Disponibilizar globalmente
  window.successRateSystem = successRateSystem;
});

// Exportar para uso em outros módulos
if (typeof window !== "undefined") {
  window.SuccessRateSystem = SuccessRateSystem;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SuccessRateSystem };
}
