/**
 * SAASI Escape Room - Selection State Manager
 * Gestão robusta de estado de seleções para resolver bugs críticos
 *
 * Agent 4 Implementation - 4.2 Critical Bug Fixes
 *
 * PROBLEMAS RESOLVIDOS:
 * - Pontuação não retorna a 0 ao remover seleções
 * - Não permite avançar sem todas as seleções obrigatórias
 * - Gestão de estado inconsistente entre puzzles
 */

class SelectionStateManager {
  constructor() {
    this.selections = new Map();
    this.requiredSelections = new Map();
    this.validationRules = new Map();
    this.listeners = [];

    this.init();
  }

  init() {
    console.log("SelectionStateManager initialized");
    this.setupValidationRules();
  }

  /**
   * Configurar regras de validação para cada puzzle
   */
  setupValidationRules() {
    // Puzzle 1: Gestão de Progresso - 3 avaliações obrigatórias
    this.validationRules.set("puzzle1", {
      type: "progress_evaluations",
      minSelections: 3,
      maxSelections: 3,
      requiredKeys: [
        "consultas_psicologia",
        "programa_qualifica",
        "grupos_apoio_social",
      ],
      validationMessage:
        "Deve avaliar todos os 3 programas antes de continuar.",
    });

    // Puzzle 2: Gestão de Crises - 3 cenários obrigatórios
    this.validationRules.set("puzzle2", {
      type: "crisis_responses",
      minSelections: 3,
      maxSelections: 3,
      requiredKeys: [
        "crise_habitacional",
        "oportunidade_emprego",
        "resistencia_grupos_apoio",
      ],
      validationMessage:
        "Deve responder a todas as 3 situações de crise antes de continuar.",
    });

    // Puzzle 3: Ajuste de Estratégias - exatamente 3 estratégias
    this.validationRules.set("puzzle3", {
      type: "strategy_adjustments",
      minSelections: 3,
      maxSelections: 3,
      requiredKeys: null, // Qualquer 3 estratégias adequadas
      validationMessage: "Deve selecionar exatamente 3 estratégias de ajuste.",
    });

    // Puzzle 4: Preparação Autonomia - pelo menos 2 ações por área + 3 estratégias manutenção
    this.validationRules.set("puzzle4", {
      type: "autonomy_planning",
      minSelections: 6, // 2 ações × 3 áreas mínimo
      maxSelections: null,
      customValidation: this.validateAutonomyPlanning.bind(this),
      validationMessage:
        "Deve selecionar pelo menos 2 ações por área de autonomia e 3 estratégias de manutenção.",
    });
  }

  /**
   * Adicionar uma seleção
   * @param {string} puzzleId - ID do puzzle
   * @param {string} selectionId - ID da seleção
   * @param {number} points - Pontos associados
   * @param {object} metadata - Metadados adicionais
   */
  addSelection(puzzleId, selectionId, points = 0, metadata = {}) {
    const key = `${puzzleId}_${selectionId}`;

    // Verificar se já existe
    if (this.selections.has(key)) {
      console.warn(`Selection ${key} already exists. Updating...`);
      this.removeSelection(puzzleId, selectionId);
    }

    // Adicionar nova seleção
    const selection = {
      puzzleId,
      selectionId,
      points,
      metadata,
      timestamp: Date.now(),
    };

    this.selections.set(key, selection);

    console.log(`Added selection: ${key} (+${points} points)`);
    this.notifyListeners("selection_added", {
      puzzleId,
      selectionId,
      points,
      metadata,
    });

    return true;
  }

  /**
   * Remover uma seleção
   * @param {string} puzzleId - ID do puzzle
   * @param {string} selectionId - ID da seleção
   */
  removeSelection(puzzleId, selectionId) {
    const key = `${puzzleId}_${selectionId}`;

    if (!this.selections.has(key)) {
      console.warn(`Selection ${key} not found for removal`);
      return false;
    }

    const selection = this.selections.get(key);
    this.selections.delete(key);

    console.log(`Removed selection: ${key} (-${selection.points} points)`);
    this.notifyListeners("selection_removed", {
      puzzleId,
      selectionId,
      points: selection.points,
      metadata: selection.metadata,
    });

    return true;
  }

  /**
   * Alternar uma seleção (adicionar se não existe, remover se existe)
   * @param {string} puzzleId - ID do puzzle
   * @param {string} selectionId - ID da seleção
   * @param {number} points - Pontos associados
   * @param {object} metadata - Metadados adicionais
   */
  toggleSelection(puzzleId, selectionId, points = 0, metadata = {}) {
    const key = `${puzzleId}_${selectionId}`;

    if (this.selections.has(key)) {
      return this.removeSelection(puzzleId, selectionId);
    } else {
      return this.addSelection(puzzleId, selectionId, points, metadata);
    }
  }

  /**
   * Verificar se uma seleção existe
   * @param {string} puzzleId - ID do puzzle
   * @param {string} selectionId - ID da seleção
   */
  hasSelection(puzzleId, selectionId) {
    const key = `${puzzleId}_${selectionId}`;
    return this.selections.has(key);
  }

  /**
   * Obter todas as seleções de um puzzle
   * @param {string} puzzleId - ID do puzzle
   */
  getSelectionsForPuzzle(puzzleId) {
    const selections = [];

    for (const [key, selection] of this.selections) {
      if (selection.puzzleId === puzzleId) {
        selections.push(selection);
      }
    }

    return selections;
  }

  /**
   * Calcular pontuação total de um puzzle
   * @param {string} puzzleId - ID do puzzle
   */
  getPuzzleScore(puzzleId) {
    let totalScore = 0;

    for (const [key, selection] of this.selections) {
      if (selection.puzzleId === puzzleId) {
        totalScore += selection.points;
      }
    }

    return totalScore;
  }

  /**
   * Calcular pontuação total de todos os puzzles
   */
  getTotalScore() {
    let totalScore = 0;

    for (const [key, selection] of this.selections) {
      totalScore += selection.points;
    }

    return totalScore;
  }

  /**
   * Validar se um puzzle pode ser completado
   * @param {string} puzzleId - ID do puzzle
   */
  validatePuzzleCompletion(puzzleId) {
    const rule = this.validationRules.get(puzzleId);
    if (!rule) {
      console.warn(`No validation rule found for puzzle: ${puzzleId}`);
      return { valid: true, message: "" };
    }

    // Validação customizada
    if (rule.customValidation) {
      return rule.customValidation(puzzleId);
    }

    // Validação padrão
    const selections = this.getSelectionsForPuzzle(puzzleId);

    // Verificar número mínimo de seleções
    if (selections.length < rule.minSelections) {
      return {
        valid: false,
        message: rule.validationMessage,
        current: selections.length,
        required: rule.minSelections,
      };
    }

    // Verificar número máximo de seleções
    if (rule.maxSelections && selections.length > rule.maxSelections) {
      return {
        valid: false,
        message: `Máximo ${rule.maxSelections} seleções permitidas.`,
        current: selections.length,
        max: rule.maxSelections,
      };
    }

    // Verificar chaves obrigatórias
    if (rule.requiredKeys) {
      const selectedKeys = selections.map((s) => s.selectionId);
      const missingKeys = rule.requiredKeys.filter(
        (key) => !selectedKeys.includes(key)
      );

      if (missingKeys.length > 0) {
        return {
          valid: false,
          message: `Seleções obrigatórias em falta: ${missingKeys.join(", ")}`,
          missing: missingKeys,
        };
      }
    }

    return { valid: true, message: "Puzzle pode ser completado." };
  }

  /**
   * Validação customizada para Puzzle 4 (Autonomia)
   * @param {string} puzzleId - ID do puzzle
   */
  validateAutonomyPlanning(puzzleId) {
    const selections = this.getSelectionsForPuzzle(puzzleId);

    // Separar ações de autonomia e estratégias de manutenção
    const autonomyActions = selections.filter(
      (s) => s.metadata.type === "autonomy_action"
    );
    const maintenanceStrategies = selections.filter(
      (s) => s.metadata.type === "maintenance_strategy"
    );

    // Verificar estratégias de manutenção (exatamente 3)
    if (maintenanceStrategies.length < 3) {
      return {
        valid: false,
        message: `Deve selecionar 3 estratégias de manutenção. Atual: ${maintenanceStrategies.length}/3`,
        current: maintenanceStrategies.length,
        required: 3,
      };
    }

    // Verificar ações por área de autonomia (pelo menos 2 por área em 3 áreas)
    const actionsByArea = {};
    autonomyActions.forEach((action) => {
      const areaId = action.metadata.areaId;
      if (!actionsByArea[areaId]) actionsByArea[areaId] = 0;
      actionsByArea[areaId]++;
    });

    const areasWithSufficientActions = Object.keys(actionsByArea).filter(
      (areaId) => actionsByArea[areaId] >= 2
    );

    if (areasWithSufficientActions.length < 3) {
      return {
        valid: false,
        message: `Deve selecionar pelo menos 2 ações em 3 áreas de autonomia. Áreas completas: ${areasWithSufficientActions.length}/3`,
        areasCompleted: areasWithSufficientActions.length,
        required: 3,
      };
    }

    return { valid: true, message: "Planeamento de autonomia completo." };
  }

  /**
   * Limpar todas as seleções de um puzzle
   * @param {string} puzzleId - ID do puzzle
   */
  clearPuzzleSelections(puzzleId) {
    const keysToRemove = [];

    for (const [key, selection] of this.selections) {
      if (selection.puzzleId === puzzleId) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      const selection = this.selections.get(key);
      this.selections.delete(key);
      this.notifyListeners("selection_removed", {
        puzzleId: selection.puzzleId,
        selectionId: selection.selectionId,
        points: selection.points,
        metadata: selection.metadata,
      });
    });

    console.log(
      `Cleared ${keysToRemove.length} selections from puzzle: ${puzzleId}`
    );
    return keysToRemove.length;
  }

  /**
   * Limpar todas as seleções
   */
  clearAllSelections() {
    const count = this.selections.size;
    this.selections.clear();
    this.notifyListeners("all_selections_cleared", { count });
    console.log(`Cleared all ${count} selections`);
    return count;
  }

  /**
   * Obter estatísticas do estado atual
   */
  getStatistics() {
    const stats = {
      totalSelections: this.selections.size,
      totalScore: this.getTotalScore(),
      puzzleBreakdown: {},
    };

    // Estatísticas por puzzle
    const puzzleIds = ["puzzle1", "puzzle2", "puzzle3", "puzzle4"];
    puzzleIds.forEach((puzzleId) => {
      const selections = this.getSelectionsForPuzzle(puzzleId);
      const validation = this.validatePuzzleCompletion(puzzleId);

      stats.puzzleBreakdown[puzzleId] = {
        selections: selections.length,
        score: this.getPuzzleScore(puzzleId),
        canComplete: validation.valid,
        validationMessage: validation.message,
      };
    });

    return stats;
  }

  /**
   * Exportar estado atual para persistência
   */
  exportState() {
    const state = {
      selections: Array.from(this.selections.entries()),
      timestamp: Date.now(),
      version: "1.0",
    };

    return JSON.stringify(state);
  }

  /**
   * Importar estado de persistência
   * @param {string} stateJson - Estado serializado
   */
  importState(stateJson) {
    try {
      const state = JSON.parse(stateJson);

      if (state.version !== "1.0") {
        console.warn("State version mismatch. May cause issues.");
      }

      this.selections.clear();

      state.selections.forEach(([key, selection]) => {
        this.selections.set(key, selection);
      });

      console.log(
        `Imported ${this.selections.size} selections from saved state`
      );
      this.notifyListeners("state_imported", { count: this.selections.size });

      return true;
    } catch (error) {
      console.error("Failed to import state:", error);
      return false;
    }
  }

  /**
   * Adicionar listener para mudanças de estado
   * @param {function} callback - Função callback
   */
  addListener(callback) {
    if (typeof callback === "function") {
      this.listeners.push(callback);
      return true;
    }
    return false;
  }

  /**
   * Remover listener
   * @param {function} callback - Função callback
   */
  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Notificar todos os listeners
   * @param {string} event - Tipo de evento
   * @param {object} data - Dados do evento
   */
  notifyListeners(event, data) {
    this.listeners.forEach((callback) => {
      try {
        callback(event, data, this.getStatistics());
      } catch (error) {
        console.error("Error in selection state listener:", error);
      }
    });
  }

  /**
   * Método de debug para inspecionar estado
   */
  debug() {
    console.group("SelectionStateManager Debug");
    console.log("Total selections:", this.selections.size);
    console.log("Total score:", this.getTotalScore());
    console.log("Statistics:", this.getStatistics());

    console.group("All selections:");
    for (const [key, selection] of this.selections) {
      console.log(`${key}:`, selection);
    }
    console.groupEnd();

    console.group("Validation status:");
    ["puzzle1", "puzzle2", "puzzle3", "puzzle4"].forEach((puzzleId) => {
      const validation = this.validatePuzzleCompletion(puzzleId);
      console.log(`${puzzleId}:`, validation);
    });
    console.groupEnd();

    console.groupEnd();
  }
}

// Funções utilitárias para integração com o sistema existente

/**
 * Wrapper para compatibilidade com código existente
 */
class SelectionStateWrapper {
  constructor(selectionStateManager) {
    this.manager = selectionStateManager;
  }

  // Métodos para Puzzle 1 - Gestão de Progresso
  evaluateProgram(programId, isCorrect, points) {
    if (isCorrect) {
      this.manager.addSelection("puzzle1", programId, points, {
        type: "program_evaluation",
        correct: true,
      });
    } else {
      this.manager.addSelection("puzzle1", programId, 0, {
        type: "program_evaluation",
        correct: false,
      });
    }

    return this.manager.validatePuzzleCompletion("puzzle1");
  }

  // Métodos para Puzzle 2 - Gestão de Crises
  respondToCrisis(scenarioId, optionId, isCorrect, points) {
    this.manager.addSelection("puzzle2", scenarioId, points, {
      type: "crisis_response",
      optionId,
      correct: isCorrect,
    });

    return this.manager.validatePuzzleCompletion("puzzle2");
  }

  // Métodos para Puzzle 3 - Ajuste de Estratégias
  toggleStrategy(strategyId, points, isAdequate) {
    const result = this.manager.toggleSelection("puzzle3", strategyId, points, {
      type: "strategy_adjustment",
      adequate: isAdequate,
    });

    return {
      toggled: result,
      validation: this.manager.validatePuzzleCompletion("puzzle3"),
      currentCount: this.manager.getSelectionsForPuzzle("puzzle3").length,
    };
  }

  // Métodos para Puzzle 4 - Preparação Autonomia
  selectAutonomyAction(areaId, actionIndex, points) {
    const selectionId = `${areaId}_action_${actionIndex}`;
    this.manager.addSelection("puzzle4", selectionId, points, {
      type: "autonomy_action",
      areaId,
      actionIndex,
    });

    return this.manager.validatePuzzleCompletion("puzzle4");
  }

  deselectAutonomyAction(areaId, actionIndex, points) {
    const selectionId = `${areaId}_action_${actionIndex}`;
    this.manager.removeSelection("puzzle4", selectionId);

    return this.manager.validatePuzzleCompletion("puzzle4");
  }

  toggleMaintenanceStrategy(strategyId, points, isAdequate) {
    const result = this.manager.toggleSelection("puzzle4", strategyId, points, {
      type: "maintenance_strategy",
      adequate: isAdequate,
    });

    return {
      toggled: result,
      validation: this.manager.validatePuzzleCompletion("puzzle4"),
      currentCount: this.manager
        .getSelectionsForPuzzle("puzzle4")
        .filter((s) => s.metadata.type === "maintenance_strategy").length,
    };
  }

  // Métodos de utilidade
  canAdvanceFromPuzzle(puzzleId) {
    const validation = this.manager.validatePuzzleCompletion(puzzleId);
    return validation.valid;
  }

  getPuzzleProgress(puzzleId) {
    const selections = this.manager.getSelectionsForPuzzle(puzzleId);
    const score = this.manager.getPuzzleScore(puzzleId);
    const validation = this.manager.validatePuzzleCompletion(puzzleId);

    return {
      selections: selections.length,
      score,
      canComplete: validation.valid,
      message: validation.message,
    };
  }

  resetPuzzle(puzzleId) {
    return this.manager.clearPuzzleSelections(puzzleId);
  }

  getFullState() {
    return this.manager.getStatistics();
  }
}

// Exportar para uso global
if (typeof window !== "undefined") {
  window.SelectionStateManager = SelectionStateManager;
  window.SelectionStateWrapper = SelectionStateWrapper;
}

// Exportar para Node.js se disponível
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SelectionStateManager, SelectionStateWrapper };
}
