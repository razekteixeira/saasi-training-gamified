/**
 * Sistema de Orientação para SAASI Escape Room
 * Fornece dicas visuais e orientações contextuais
 */

class GuidanceSystem {
  constructor() {
    this.setupGuidanceStyles();
    this.setupTooltips();
    this.setupVisualCues();
    this.setupContextualHelp();
  }

  setupGuidanceStyles() {
    const style = document.createElement("style");
    style.textContent = `
      /* Tooltips para elementos interativos */
      .guidance-tooltip {
        position: relative;
        cursor: help;
      }

      .guidance-tooltip::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 50000;
        pointer-events: none;
        max-width: 200px;
        white-space: normal;
        word-wrap: break-word;
      }

      .guidance-tooltip:hover::after {
        opacity: 1;
        visibility: visible;
        bottom: calc(100% + 5px);
      }

      /* Prevent tooltips from appearing on modal elements */
      .hints-modal .guidance-tooltip::after,
      .navigation-modal .guidance-tooltip::after {
        display: none;
      }

      /* Indicadores visuais para códigos */
      .hidden-code {
        position: relative;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.8rem;
        animation: subtle-glow 2s ease-in-out infinite alternate;
      }

      .hidden-code::before {
        content: "🔍";
        margin-right: 4px;
      }

      @keyframes subtle-glow {
        from { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
        to { box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
      }

      /* Indicadores para elementos interativos */
      .interactive-element {
        position: relative;
        transition: all 0.3s ease;
      }

      .interactive-element::before {
        content: "👆";
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 12px;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .interactive-element:hover::before {
        opacity: 1;
        animation: bounce 1s ease-in-out infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
        60% { transform: translateY(-3px); }
      }

      /* Destaque para elementos importantes */
      .guidance-highlight {
        position: relative;
        overflow: visible;
      }

      .guidance-highlight::after {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px dashed #17a2b8;
        border-radius: 8px;
        opacity: 0;
        animation: highlight-pulse 3s ease-in-out infinite;
        pointer-events: none;
      }

      @keyframes highlight-pulse {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.6; }
      }

      /* Painel de ajuda contextual */
      .contextual-help {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(23, 162, 184, 0.95);
        color: white;
        padding: 15px;
        border-radius: 10px;
        max-width: 300px;
        font-size: 14px;
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Hide contextual help when modals are open */
      .hints-modal.show ~ .contextual-help,
      .navigation-modal.show ~ .contextual-help {
        opacity: 0;
        pointer-events: none;
        transform: translateY(100px);
      }

      .contextual-help.show {
        transform: translateY(0);
        opacity: 1;
      }

      .contextual-help .help-title {
        font-weight: bold;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .contextual-help .help-content {
        line-height: 1.4;
      }

      .contextual-help .help-close {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        opacity: 0.7;
      }

      .contextual-help .help-close:hover {
        opacity: 1;
      }

      /* Indicador de progresso para códigos */
      .codes-progress {
        position: fixed;
        top: 180px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        padding: 10px 15px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-size: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-width: 200px;
      }

      /* Hide codes progress when modals are open */
      .hints-modal.show ~ .codes-progress,
      .navigation-modal.show ~ .codes-progress {
        opacity: 0.3;
        pointer-events: none;
      }

      .codes-progress .codes-title {
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
      }

      .codes-list {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .code-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
      }

      .code-item.found {
        color: #28a745;
      }

      .code-item.not-found {
        color: #6c757d;
      }
    `;

    document.head.appendChild(style);
  }

  setupTooltips() {
    // Adicionar tooltips a elementos específicos baseados na fase
    const phase = this.detectPhase();

    setTimeout(() => {
      this.addPhaseSpecificTooltips(phase);
    }, 1000);
  }

  detectPhase() {
    const url = window.location.pathname;
    if (url.includes("fase1-escape")) return "fase1";
    if (url.includes("fase2-escape")) return "fase2";
    if (url.includes("fase3-escape")) return "fase3";
    return "unknown";
  }

  addPhaseSpecificTooltips(phase) {
    switch (phase) {
      case "fase1":
        this.addTooltipsToElements([
          {
            selector: ".problem-card",
            tooltip:
              "Clique para analisar o problema. Procure códigos nos mais críticos!",
          },
          {
            selector: ".connection-line",
            tooltip: "Arraste para conectar problemas relacionados",
          },
          {
            selector: ".priority-slider",
            tooltip: "Ajuste a prioridade baseando-se na urgência e impacto",
          },
        ]);
        break;

      case "fase2":
        this.addTooltipsToElements([
          {
            selector: ".objective-card",
            tooltip:
              "Analise cada objetivo. Códigos aparecem nos bem formulados!",
          },
          {
            selector: ".synergy-connector",
            tooltip: "Conecte objetivos que se complementam",
          },
          {
            selector: ".viability-meter",
            tooltip: "Avalie recursos necessários vs disponíveis",
          },
        ]);
        break;

      case "fase3":
        this.addTooltipsToElements([
          {
            selector: ".program-card",
            tooltip: "Analise adequação para Felisbina. Códigos: ADQ, PSI, SOC",
          },
          {
            selector: ".entity-node",
            tooltip:
              "Contacte entidades. Códigos: IEFP2025, SAUDE2025, IPSS2025",
          },
          {
            selector: ".activity-item",
            tooltip: "Arraste para mês correto. Códigos: PRIM1, AVAL1, QUAL2",
          },
          {
            selector: ".validation-item",
            tooltip: "Complete todas as validações para prosseguir",
          },
        ]);
        break;
    }
  }

  addTooltipsToElements(elements) {
    elements.forEach(({ selector, tooltip }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.classList.add("guidance-tooltip");
        element.setAttribute("data-tooltip", tooltip);
      });
    });
  }

  setupVisualCues() {
    // Destacar códigos ocultos
    this.highlightHiddenCodes();

    // Adicionar indicadores interativos
    this.addInteractiveIndicators();

    // Criar painel de progresso de códigos
    this.createCodesProgressPanel();
  }

  highlightHiddenCodes() {
    // Procurar por elementos que contenham códigos
    const codeSelectors = [
      ".hidden-code",
      ".connection-code",
      ".secret-code",
      "[data-code]",
      '[onclick*="Code"]',
    ];

    codeSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!element.classList.contains("hidden-code")) {
          element.classList.add("hidden-code");
        }
      });
    });
  }

  addInteractiveIndicators() {
    // Adicionar indicadores a elementos clicáveis/arrastáveis
    const interactiveSelectors = [
      '[draggable="true"]',
      "[onclick]",
      "button:not([disabled])",
      ".clickable",
      ".draggable",
    ];

    interactiveSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!element.classList.contains("interactive-element")) {
          element.classList.add("interactive-element");
        }
      });
    });
  }

  createCodesProgressPanel() {
    const phase = this.detectPhase();
    const codesData = this.getPhaseCodesData(phase);

    if (!codesData.length) return;

    const panel = document.createElement("div");
    panel.className = "codes-progress";
    panel.innerHTML = `
      <div class="codes-title">🔍 Códigos Descobertos</div>
      <div class="codes-list" id="codes-list">
        ${codesData
          .map(
            (code) => `
          <div class="code-item not-found" data-code="${code}">
            <span>❌</span>
            <span>${code}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    document.body.appendChild(panel);

    // Monitorar descoberta de códigos
    this.monitorCodeDiscovery();
  }

  getPhaseCodesData(phase) {
    const codesMap = {
      fase1: ["CRIT1", "EMOC2", "ISOL3", "QUAL4"],
      fase2: ["OBJ1", "SIN2", "VIA3", "PRI4"],
      fase3: [
        "ADQ1",
        "PSI2",
        "SOC3",
        "IEFP2025",
        "SAUDE2025",
        "IPSS2025",
        "PRIM1",
        "AVAL1",
        "QUAL2",
      ],
    };

    return codesMap[phase] || [];
  }

  monitorCodeDiscovery() {
    // Observar mudanças no localStorage ou gameState para códigos descobertos
    const checkCodes = () => {
      const escapeRoom = window.escapeRoom;
      if (escapeRoom && escapeRoom.unlockedCodes) {
        this.updateCodesProgress(escapeRoom.unlockedCodes);
      }
    };

    // Verificar periodicamente
    setInterval(checkCodes, 1000);

    // Verificar imediatamente
    checkCodes();
  }

  updateCodesProgress(unlockedCodes) {
    const codeItems = document.querySelectorAll(".code-item");
    codeItems.forEach((item) => {
      const code = item.dataset.code;
      if (unlockedCodes.includes(code)) {
        item.classList.remove("not-found");
        item.classList.add("found");
        item.querySelector("span").textContent = "✅";
      }
    });
  }

  setupContextualHelp() {
    // Mostrar ajuda contextual baseada no estado atual
    this.showContextualHelp();

    // Atualizar ajuda quando o estado muda
    this.monitorStateChanges();
  }

  showContextualHelp() {
    const phase = this.detectPhase();
    const currentState = this.getCurrentState();
    const helpContent = this.getContextualHelpContent(phase, currentState);

    if (helpContent) {
      this.displayContextualHelp(helpContent);
    }
  }

  getCurrentState() {
    const gameState = window.gameState;
    if (gameState && gameState.currentState) {
      return gameState.currentState;
    }

    // Tentar detectar pelo DOM
    const visibleStates = document.querySelectorAll(
      ".state:not(.state-hidden)"
    );
    if (visibleStates.length > 0) {
      return visibleStates[0].id.replace("state-", "");
    }

    return "unknown";
  }

  getContextualHelpContent(phase, state) {
    const helpMap = {
      fase1: {
        intro: {
          title: "🎯 Bem-vindo à Fase 1!",
          content:
            "Identifique e analise os problemas da Felisbina. Procure códigos nos problemas mais críticos!",
        },
        "problem-identification": {
          title: "🔍 Identificação de Problemas",
          content:
            "Clique nos problemas para analisá-los. Códigos aparecem nos mais importantes!",
        },
        "problem-analysis": {
          title: "🧩 Análise de Problemas",
          content:
            "Conecte problemas relacionados arrastando linhas entre eles.",
        },
        "priority-matrix": {
          title: "⚖️ Matriz de Prioridades",
          content:
            "Use os sliders para definir urgência vs impacto. Códigos nos bem priorizados!",
        },
      },
      fase2: {
        intro: {
          title: "🎯 Bem-vindo à Fase 2!",
          content:
            "Defina objetivos claros e viáveis. Procure códigos nos objetivos bem formulados!",
        },
        "objective-definition": {
          title: "📋 Definição de Objetivos",
          content:
            "Formule objetivos SMART. Códigos aparecem nos mais específicos!",
        },
        "synergy-mapping": {
          title: "🔗 Mapeamento de Sinergias",
          content:
            "Conecte objetivos que se complementam para maximizar eficácia.",
        },
        "viability-assessment": {
          title: "📊 Avaliação de Viabilidade",
          content:
            "Considere recursos vs limitações. Códigos nos objetivos viáveis!",
        },
      },
      fase3: {
        intro: {
          title: "🎯 Bem-vindo à Fase 3!",
          content:
            "Crie um plano de intervenção completo. Muitos códigos para descobrir!",
        },
        puzzle1: {
          title: "🎯 Seleção de Programas",
          content:
            "Analise adequação para Felisbina. Códigos: ADQ1, PSI2, SOC3 nos adequados!",
        },
        puzzle2: {
          title: "🤝 Articulação de Entidades",
          content:
            "Contacte entidades estratégicas. Códigos de conexão: IEFP2025, SAUDE2025, IPSS2025!",
        },
        puzzle3: {
          title: "📅 Cronograma",
          content:
            "Organize atividades por mês. Códigos secretos: PRIM1, AVAL1, QUAL2, etc!",
        },
        puzzle4: {
          title: "✅ Validação Final",
          content: "Complete todas as validações e aprovações para finalizar!",
        },
      },
    };

    return helpMap[phase]?.[state];
  }

  displayContextualHelp(helpContent) {
    // Remover ajuda existente
    const existingHelp = document.querySelector(".contextual-help");
    if (existingHelp) {
      existingHelp.remove();
    }

    const helpPanel = document.createElement("div");
    helpPanel.className = "contextual-help";
    helpPanel.innerHTML = `
      <button class="help-close" onclick="this.parentElement.remove()">×</button>
      <div class="help-title">
        ${helpContent.title}
      </div>
      <div class="help-content">
        ${helpContent.content}
      </div>
    `;

    document.body.appendChild(helpPanel);

    // Mostrar com animação
    setTimeout(() => {
      helpPanel.classList.add("show");
    }, 100);

    // Auto-ocultar após 10 segundos
    setTimeout(() => {
      if (helpPanel.parentElement) {
        helpPanel.classList.remove("show");
        setTimeout(() => helpPanel.remove(), 300);
      }
    }, 10000);
  }

  monitorStateChanges() {
    // Observar mudanças no gameState
    let lastState = this.getCurrentState();

    setInterval(() => {
      const currentState = this.getCurrentState();
      if (currentState !== lastState) {
        lastState = currentState;
        setTimeout(() => this.showContextualHelp(), 500);
      }
    }, 1000);
  }

  // Função para destacar elementos importantes temporariamente
  highlightElement(selector, duration = 5000) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.add("guidance-highlight");
      setTimeout(() => {
        element.classList.remove("guidance-highlight");
      }, duration);
    });
  }

  // Função para mostrar dica específica
  showHint(message, type = "info", duration = 5000) {
    if (window.showToast) {
      window.showToast(`💡 Dica: ${message}`, type, duration);
    }
  }
}

// Inicializar sistema de orientação
document.addEventListener("DOMContentLoaded", () => {
  window.guidanceSystem = new GuidanceSystem();

  // Adicionar funções globais para uso em outros scripts
  window.highlightElement = (selector, duration) =>
    window.guidanceSystem.highlightElement(selector, duration);
  window.showHint = (message, type, duration) =>
    window.guidanceSystem.showHint(message, type, duration);
});

// Exportar para uso em outros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = GuidanceSystem;
}
