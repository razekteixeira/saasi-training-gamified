/**
 * SAASI Escape Room - URL Navigation System
 * Enables direct navigation to specific stages via URL parameters
 *
 * Usage:
 * - /fase1.html?stage=conversa - Go directly to conversation stage
 * - /fase1-escape.html?stage=analise - Go directly to analysis stage
 * - /fase2.html?stage=planeamento - Go directly to planning stage
 *
 * @version 1.0
 * @date January 2025
 */

class URLNavigationManager {
  constructor() {
    this.currentPhase = this.detectPhase();
    this.urlParams = new URLSearchParams(window.location.search);
    this.validStages = this.getValidStages();
    this.dataGenerator = null; // Will be initialized when needed

    // Initialize navigation on page load
    this.init();
  }

  /**
   * Detect current phase from URL
   * @returns {string} Phase identifier
   */
  detectPhase() {
    const path = window.location.pathname;
    const filename = path.split("/").pop().replace(".html", "");

    if (filename.includes("fase1")) return "fase1";
    if (filename.includes("fase2")) return "fase2";
    if (filename.includes("fase3")) return "fase3";
    if (filename.includes("fase4")) return "fase4";

    return "unknown";
  }

  /**
   * Get valid stages for each phase
   * @returns {Object} Valid stages mapping
   */
  getValidStages() {
    return {
      fase1: [
        "inicio",
        "conversa",
        "analise",
        "documentacao",
        "avaliacao",
        "conclusao",
      ],
      fase2: [
        "inicio",
        "mapeamento",
        "beneficios",
        "articulacao",
        "cronograma",
        "conclusao",
      ],
      fase3: [
        "inicio",
        "selecao_programas",
        "coordenacao_entidades",
        "timeline_intervencao",
        "validacao",
        "conclusao",
      ],
      fase4: [
        "inicio",
        "monitorizacao",
        "gestao_crises",
        "adaptacao_estrategias",
        "transicao_autonomia",
        "conclusao",
      ],
    };
  }

  /**
   * Initialize URL navigation system
   */
  init() {
    // Check if there's a stage parameter in URL
    const requestedStage = this.urlParams.get("stage");

    if (requestedStage && this.isValidStage(requestedStage)) {
      // Generate background data for direct phase access
      this.ensurePhaseDataExists();

      // Wait for page to fully load, then navigate to requested stage
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          this.navigateToStage(requestedStage);
        });
      } else {
        // Page already loaded
        setTimeout(() => this.navigateToStage(requestedStage), 100);
      }
    }

    // Update URL when stage changes (without page reload)
    this.setupStageChangeListener();

    console.log(`🧭 URL Navigation initialized for ${this.currentPhase}`);
  }

  /**
   * Check if stage is valid for current phase
   * @param {string} stage - Stage to validate
   * @returns {boolean} Is stage valid
   */
  isValidStage(stage) {
    const phaseStages = this.validStages[this.currentPhase];
    return phaseStages && phaseStages.includes(stage);
  }

  /**
   * Navigate to specific stage
   * @param {string} stage - Target stage
   * @returns {boolean} Success status
   */
  navigateToStage(stage) {
    if (!this.isValidStage(stage)) {
      console.warn(`Invalid stage '${stage}' for phase ${this.currentPhase}`);
      return false;
    }

    // Check if changeState function exists (for phases with state management)
    if (typeof window.changeState === "function") {
      try {
        window.changeState(stage);
        this.updateURL(stage, false); // Update URL without reload

        console.log(`🎯 Navigated to stage: ${stage}`);

        // Show navigation toast
        if (typeof window.showToast === "function") {
          window.showToast(
            `Navegou diretamente para: ${this.getStageDisplayName(stage)}`,
            "info",
            3000
          );
        }

        return true;
      } catch (error) {
        console.error(`Error navigating to stage ${stage}:`, error);
        return false;
      }
    } else {
      console.warn(
        "changeState function not available - stage navigation not supported on this page"
      );
      return false;
    }
  }

  /**
   * Get display name for stage
   * @param {string} stage - Stage identifier
   * @returns {string} Display name
   */
  getStageDisplayName(stage) {
    const stageNames = {
      // Fase 1
      inicio: "Início",
      conversa: "Conversa com Felisbina",
      analise: "Análise de Fatores",
      documentacao: "Verificação de Documentos",
      avaliacao: "Avaliação DLD",
      conclusao: "Conclusão",

      // Fase 2
      mapeamento: "Mapeamento de Problemas",
      beneficios: "Análise de Benefícios",
      articulacao: "Articulação com Entidades",
      cronograma: "Cronograma de Acompanhamento",

      // Fase 3
      selecao_programas: "Seleção de Programas",
      coordenacao_entidades: "Coordenação de Entidades",
      timeline_intervencao: "Timeline de Intervenção",
      validacao: "Validação do Plano",

      // Fase 4
      monitorizacao: "Monitorização de Progresso",
      gestao_crises: "Gestão de Crises",
      adaptacao_estrategias: "Adaptação de Estratégias",
      transicao_autonomia: "Transição para Autonomia",
    };

    return stageNames[stage] || stage;
  }

  /**
   * Update URL with current stage (without page reload)
   * @param {string} stage - Current stage
   * @param {boolean} replaceState - Whether to replace or push state
   */
  updateURL(stage, replaceState = true) {
    const url = new URL(window.location);
    url.searchParams.set("stage", stage);

    if (replaceState) {
      history.replaceState(null, "", url);
    } else {
      history.pushState(null, "", url);
    }
  }

  /**
   * Setup listener for stage changes to update URL
   */
  setupStageChangeListener() {
    // Monitor for state changes in the global gameState object
    if (typeof window.gameState === "object" && window.gameState !== null) {
      // Create a proxy to intercept state changes
      const originalGameState = window.gameState;
      let lastState = originalGameState.currentState;

      // Poll for state changes (since we can't easily intercept the changeState function)
      setInterval(() => {
        if (originalGameState.currentState !== lastState) {
          this.updateURL(originalGameState.currentState, true);
          lastState = originalGameState.currentState;
        }
      }, 500);
    }
  }

  /**
   * Generate shareable URL for current stage
   * @returns {string} Shareable URL
   */
  getShareableURL() {
    const currentStage = window.gameState?.currentState || "inicio";
    const url = new URL(window.location);
    url.searchParams.set("stage", currentStage);
    return url.toString();
  }

  /**
   * Navigate to stage via URL (for programmatic use)
   * @param {string} stage - Target stage
   * @param {boolean} updateHistory - Whether to update browser history
   */
  goToStage(stage, updateHistory = true) {
    if (this.navigateToStage(stage)) {
      if (updateHistory) {
        this.updateURL(stage, false);
      }
    }
  }

  /**
   * Get available stages for current phase
   * @returns {Array} Available stages
   */
  getAvailableStages() {
    return this.validStages[this.currentPhase] || [];
  }

  /**
   * Ensure required data exists for current phase
   */
  ensurePhaseDataExists() {
    const phaseNumber = this.getPhaseNumber();

    if (phaseNumber > 1) {
      // Initialize data generator if needed
      if (!this.dataGenerator) {
        this.initializeDataGenerator();
      }

      if (this.dataGenerator) {
        // Generate data chain for phases leading up to current
        const success = this.dataGenerator.generateDataChain(phaseNumber);

        if (success) {
          console.log(`✅ Background data ensured for Phase ${phaseNumber}`);

          // Update main navigation if available
          if (typeof window.loadAppState === "function") {
            setTimeout(() => window.loadAppState(), 500);
          }

          // Update enhanced app state if available
          if (typeof window.loadEnhancedAppState === "function") {
            setTimeout(() => window.loadEnhancedAppState(), 500);
          }
        } else {
          console.warn(
            `⚠️ Failed to generate background data for Phase ${phaseNumber}`
          );
        }
      }
    }
  }

  /**
   * Initialize data generator
   */
  initializeDataGenerator() {
    try {
      // Wait for PhaseDataGenerator to be available
      if (typeof window.PhaseDataGenerator !== "undefined") {
        this.dataGenerator = window.PhaseDataGenerator;
        console.log("🔄 Phase Data Generator connected to URL Navigation");
      } else {
        // Try to load it if not available
        console.warn(
          "⚠️ PhaseDataGenerator not available - background data generation disabled"
        );
      }
    } catch (error) {
      console.error("❌ Error initializing data generator:", error);
    }
  }

  /**
   * Get numeric phase number from current phase
   * @returns {number} Phase number (1-4)
   */
  getPhaseNumber() {
    switch (this.currentPhase) {
      case "fase1":
        return 1;
      case "fase2":
        return 2;
      case "fase3":
        return 3;
      case "fase4":
        return 4;
      default:
        return 1;
    }
  }

  /**
   * Check if background data generation is available
   * @returns {boolean} Data generation available
   */
  isDataGenerationAvailable() {
    return (
      this.dataGenerator !== null &&
      typeof this.dataGenerator.generateDataChain === "function"
    );
  }

  /**
   * Create navigation menu for debugging/admin purposes
   * @returns {HTMLElement} Navigation menu element
   */
  createNavigationMenu() {
    const stages = this.getAvailableStages();
    const menu = document.createElement("div");
    menu.className = "url-navigation-menu";
    menu.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 9999;
      display: none;
    `;

    const title = document.createElement("div");
    title.textContent = `${this.currentPhase.toUpperCase()} - Navigation`;
    title.style.fontWeight = "bold";
    title.style.marginBottom = "5px";
    menu.appendChild(title);

    stages.forEach((stage) => {
      const button = document.createElement("button");
      button.textContent = this.getStageDisplayName(stage);
      button.style.cssText = `
        display: block;
        width: 100%;
        margin: 2px 0;
        padding: 3px 6px;
        font-size: 11px;
        cursor: pointer;
        background: #333;
        color: white;
        border: 1px solid #555;
        border-radius: 3px;
      `;
      button.onclick = () => this.goToStage(stage);
      menu.appendChild(button);
    });

    // Toggle visibility with Ctrl+Shift+N
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "N") {
        menu.style.display = menu.style.display === "none" ? "block" : "none";
      }
    });

    return menu;
  }
}

// Initialize URL Navigation Manager globally
window.URLNavigation = new URLNavigationManager();

// Add navigation menu for development/debugging (only on localhost)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(window.URLNavigation.createNavigationMenu());
    console.log(
      "🔧 Development navigation menu available (Ctrl+Shift+N to toggle)"
    );
  });
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = URLNavigationManager;
}

console.log("🧭 SAASI URL Navigation System loaded successfully");
