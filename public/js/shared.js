// Shared utilities and functions for SAASI Escape Room
// Version: 1.0 - Static Build

/**
 * SAASI Game Storage Manager
 * Handles localStorage operations with validation and error handling
 */
class SaaSIStorageManager {
  constructor() {
    this.keys = {
      phase1: "saasi_phase1_results",
      phase2: "saasi_phase2_results",
      phase3: "saasi_phase3_results",
      phase4: "saasi_phase4_results",
      settings: "saasi_settings",
      lastSave: "saasi_last_save",
    };
  }

  /**
   * Save phase results to localStorage
   * @param {number} phase - Phase number (1, 2, 3, 4)
   * @param {Object} data - Phase completion data
   */
  savePhaseResults(phase, data) {
    try {
      const key = this.keys[`phase${phase}`];
      const timestampedData = {
        ...data,
        timestamp: Date.now(),
        version: "1.0",
      };

      localStorage.setItem(key, JSON.stringify(timestampedData));
      localStorage.setItem(this.keys.lastSave, Date.now().toString());

      console.log(`Phase ${phase} results saved successfully`);
      return { success: true, timestamp: Date.now() };
    } catch (error) {
      console.error(`Error saving Phase ${phase} results:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Load phase results from localStorage
   * @param {number} phase - Phase number to load
   * @returns {Object|null} Phase data or null if not found
   */
  loadPhaseResults(phase) {
    try {
      const key = this.keys[`phase${phase}`];
      const saved = localStorage.getItem(key);

      if (saved) {
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error(`Error loading Phase ${phase} results:`, error);
      return null;
    }
  }

  /**
   * Get overall progress across all phases
   * @returns {Object} Progress summary
   */
  getOverallProgress() {
    const phaseResults = {
      phase1: this.loadPhaseResults(1),
      phase2: this.loadPhaseResults(2),
      phase3: this.loadPhaseResults(3),
      phase4: this.loadPhaseResults(4),
    };

    // Use MultiPhaseCoordinator if available, otherwise fallback to basic calculation
    if (typeof MultiPhaseCoordinator !== "undefined") {
      const detailedProgress =
        MultiPhaseCoordinator.generateProgressReport(phaseResults);
      return {
        ...detailedProgress.overview,
        detailedReport: detailedProgress,
        unlockedPhases: this.calculateUnlockedPhases(phaseResults),
      };
    } else {
      // Fallback for backward compatibility
      return this.basicProgressCalculation(phaseResults);
    }
  }

  /**
   * Calculate unlocked phases (fallback method)
   * CONFORME ESPECIFICAÇÃO: Phase 2 requires 60+, Phase 3 requires 60+, Phase 4 requires 65+
   * @param {Object} phaseResults - Phase results
   * @returns {number} Number of unlocked phases
   */
  calculateUnlockedPhases(phaseResults) {
    let unlocked = 1; // Phase 1 always unlocked

    if (phaseResults.phase1?.score >= 60) unlocked = Math.max(unlocked, 2);
    if (phaseResults.phase2?.score >= 60) unlocked = Math.max(unlocked, 3);
    if (phaseResults.phase3?.score >= 65) unlocked = Math.max(unlocked, 4);

    return unlocked;
  }

  /**
   * Basic progress calculation (fallback)
   * @param {Object} phaseResults - Phase results
   * @returns {Object} Basic progress summary
   */
  basicProgressCalculation(phaseResults) {
    let totalScore = 0;
    let completedPhases = 0;

    for (let phase = 1; phase <= 4; phase++) {
      const phaseData = phaseResults[`phase${phase}`];
      if (phaseData?.score !== undefined) {
        totalScore += phaseData.score;
        completedPhases++;
      }
    }

    return {
      totalScore: Math.min(totalScore, 400),
      maxPossible: 400,
      percentage: Math.round((totalScore / 400) * 100),
      completedPhases: completedPhases,
      averageScore:
        completedPhases > 0 ? Math.round(totalScore / completedPhases) : 0,
      unlockedPhases: this.calculateUnlockedPhases(phaseResults),
    };
  }

  /**
   * Clear all saved data (for reset functionality)
   */
  clearAllData() {
    try {
      Object.values(this.keys).forEach((key) => {
        localStorage.removeItem(key);
      });
      console.log("All SAASI data cleared");
      return true;
    } catch (error) {
      console.error("Error clearing data:", error);
      return false;
    }
  }

  /**
   * Export all data for backup/analysis
   * @returns {Object} Complete data export
   */
  exportData() {
    return {
      phase1: this.loadPhaseResults(1),
      phase2: this.loadPhaseResults(2),
      phase3: this.loadPhaseResults(3),
      exportDate: new Date().toISOString(),
      version: "1.0",
    };
  }
}

/**
 * SAASI Achievement System
 * Manages badges and achievements across phases
 */
class SaaSIAchievementManager {
  constructor() {
    this.achievementDefinitions = [
      {
        id: "phase1_perfect",
        name: "🏆 Mestre da Fase 1",
        description: "Pontuação perfeita na Fase 1",
        condition: (progress) => progress.phase1 && progress.phase1.score >= 95,
      },
      {
        id: "phase2_perfect",
        name: "🏆 Mestre da Fase 2",
        description: "Pontuação perfeita na Fase 2",
        condition: (progress) => progress.phase2 && progress.phase2.score >= 95,
      },
      {
        id: "phase1_expert",
        name: "⭐ Especialista Fase 1",
        description: "Pontuação de especialista na Fase 1",
        condition: (progress) => progress.phase1 && progress.phase1.score >= 85,
      },
      {
        id: "phase2_expert",
        name: "⭐ Especialista Fase 2",
        description: "Pontuação de especialista na Fase 2",
        condition: (progress) => progress.phase2 && progress.phase2.score >= 85,
      },
      {
        id: "complete_technician",
        name: "🎯 Técnico Completo",
        description: "Completou as duas primeiras fases",
        condition: (progress) => progress.phase1 && progress.phase2,
      },
      {
        id: "experienced_technician",
        name: "💎 Técnico Experiente",
        description: "Pontuação total superior a 180",
        condition: (progress) => progress.totalScore >= 180,
      },
      {
        id: "master_saasi",
        name: "👑 Mestre SAASI",
        description: "Pontuação perfeita em todas as fases",
        condition: (progress) => {
          return (
            progress.phase1?.score >= 95 &&
            progress.phase2?.score >= 95 &&
            progress.phase3?.score >= 95
          );
        },
      },
    ];
  }

  /**
   * Calculate achieved badges based on current progress
   * @param {Object} progress - Progress data from StorageManager
   * @returns {Array} Array of achieved badges
   */
  calculateAchievements(progress) {
    return this.achievementDefinitions
      .filter((achievement) => achievement.condition(progress))
      .map((achievement) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
      }));
  }

  /**
   * Get achievement progress (for future unlockable content)
   * @param {Object} progress - Progress data
   * @returns {Object} Achievement progress summary
   */
  getAchievementProgress(progress) {
    const achievements = this.calculateAchievements(progress);
    return {
      earned: achievements.length,
      total: this.achievementDefinitions.length,
      percentage: Math.round(
        (achievements.length / this.achievementDefinitions.length) * 100
      ),
      achievements: achievements,
    };
  }
}

/**
 * SAASI Analytics Tracker
 * Tracks user interactions and performance for improvement insights
 */
class SaaSIAnalyticsTracker {
  constructor() {
    this.sessionStart = Date.now();
    this.events = [];
  }

  /**
   * Track a game event
   * @param {string} type - Event type
   * @param {Object} data - Event data
   */
  trackEvent(type, data = {}) {
    const event = {
      type: type,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionStart,
      data: data,
    };

    this.events.push(event);
    console.log("Analytics Event:", event);
  }

  /**
   * Track phase completion
   * @param {number} phase - Phase number
   * @param {Object} results - Phase completion results
   */
  trackPhaseCompletion(phase, results) {
    this.trackEvent("phase_completed", {
      phase: phase,
      score: results.score,
      duration: results.duration,
      level: results.level,
    });
  }

  /**
   * Track user interaction
   * @param {string} interaction - Type of interaction
   * @param {Object} context - Context data
   */
  trackInteraction(interaction, context = {}) {
    this.trackEvent("user_interaction", {
      interaction: interaction,
      context: context,
    });
  }

  /**
   * Get session summary
   * @returns {Object} Session analytics summary
   */
  getSessionSummary() {
    const duration = Date.now() - this.sessionStart;
    const interactions = this.events.filter(
      (e) => e.type === "user_interaction"
    ).length;
    const completions = this.events.filter(
      (e) => e.type === "phase_completed"
    ).length;

    return {
      sessionDuration: duration,
      totalInteractions: interactions,
      phasesCompleted: completions,
      events: this.events.length,
    };
  }
}

/**
 * SAASI Utility Functions
 * Common utility functions used across phases
 */
class SaaSIUtils {
  /**
   * Format time duration in a readable format
   * @param {number} milliseconds - Duration in milliseconds
   * @returns {string} Formatted time string
   */
  static formatDuration(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  /**
   * Calculate performance level based on score
   * @param {number} score - Score achieved
   * @returns {Object} Level information
   */
  static calculateLevel(score) {
    if (score >= 95) return { title: "Mestre SAASI", color: "#FFD700" };
    if (score >= 85) return { title: "Técnico Especialista", color: "#4CAF50" };
    if (score >= 70) return { title: "Técnico Proficiente", color: "#2196F3" };
    if (score >= 50) return { title: "Técnico Competente", color: "#FF9800" };
    return { title: "Técnico Iniciante", color: "#757575" };
  }

  /**
   * Validate phase unlock requirements
   * @param {number} targetPhase - Phase to unlock
   * @param {Object} progress - Current progress
   * @returns {Object} Validation result
   */
  static validatePhaseUnlock(targetPhase, progress) {
    switch (targetPhase) {
      case 1:
        return { unlocked: true, reason: "Always available" };

      case 2:
        if (progress.phase1 && progress.phase1.score >= 60) {
          return {
            unlocked: true,
            reason: "Phase 1 completed with sufficient score",
          };
        }
        return {
          unlocked: false,
          reason: "Requires Phase 1 completion with 60+ points",
          currentScore: progress.phase1?.score || 0,
        };

      case 3:
        if (progress.phase2 && progress.phase2.score >= 60) {
          return {
            unlocked: true,
            reason: "Phase 2 completed with sufficient score",
          };
        }
        return {
          unlocked: false,
          reason: "Requires Phase 2 completion with 60+ points",
          currentScore: progress.phase2?.score || 0,
        };

      case 4:
        if (progress.phase3 && progress.phase3.score >= 65) {
          return {
            unlocked: true,
            reason: "Phase 3 completed with sufficient score",
          };
        }
        return {
          unlocked: false,
          reason: "Requires Phase 3 completion with 65+ points",
          currentScore: progress.phase3?.score || 0,
        };

      default:
        return { unlocked: false, reason: "Invalid phase number" };
    }
  }

  /**
   * Generate a unique session ID
   * @returns {string} Unique identifier
   */
  static generateSessionId() {
    return (
      "saasi_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  /**
   * Deep copy an object (for state management)
   * @param {Object} obj - Object to copy
   * @returns {Object} Deep copy of the object
   */
  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

/**
 * SAASI Event System
 * Simple event system for communication between components
 */
class SaaSIEventSystem {
  constructor() {
    this.listeners = {};
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name
   * @param {Function} callback - Callback to remove
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }
}

// Initialize global instances
const SaaSIStorage = new SaaSIStorageManager();
const SaaSIAchievements = new SaaSIAchievementManager();
const SaaSIAnalytics = new SaaSIAnalyticsTracker();
const SaaSIEvents = new SaaSIEventSystem();

// Export for use in modules (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    SaaSIStorageManager,
    SaaSIAchievementManager,
    SaaSIAnalyticsTracker,
    SaaSIUtils,
    SaaSIEventSystem,
    SaaSIStorage,
    SaaSIAchievements,
    SaaSIAnalytics,
    SaaSIEvents,
  };
}

// Global helper functions for backward compatibility
function formatTime(ms) {
  return SaaSIUtils.formatDuration(ms);
}

function getPlayerLevel(score) {
  return SaaSIUtils.calculateLevel(score);
}

function generateSessionId() {
  return SaaSIUtils.generateSessionId();
}

/**
 * Enhanced Dialog System Integration
 * Automatically replaces native dialogs with modern modal system
 */
class DialogManager {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    // Wait for ModalSystem to be available
    const checkModalSystem = () => {
      if (window.ModalSystem) {
        this.enableEnhancedDialogs();
        this.initialized = true;
        console.log("Enhanced Dialog System initialized successfully");
      } else {
        setTimeout(checkModalSystem, 50);
      }
    };
    checkModalSystem();
  }

  enableEnhancedDialogs() {
    // Store original functions
    if (!window._originalAlert) {
      window._originalAlert = window.alert;
      window._originalConfirm = window.confirm;
      window._originalPrompt = window.prompt;
    }

    // Replace with enhanced modal versions
    window.alert = async (message) => {
      return await ModalSystem.alert(message, "info");
    };

    window.confirm = async (message) => {
      return await ModalSystem.confirm(message);
    };

    window.prompt = async (message, defaultValue = "") => {
      return await ModalSystem.prompt(message, {
        defaultValue,
        required: false,
      });
    };

    // Add convenience methods
    window.showSuccess = (message, duration = 3000) => {
      return ModalSystem.notify(message, {
        type: "success",
        duration,
      });
    };

    window.showWarning = (message, duration = 4000) => {
      return ModalSystem.notify(message, {
        type: "warning",
        duration,
      });
    };

    window.showError = (message, duration = 5000) => {
      return ModalSystem.notify(message, {
        type: "error",
        duration,
      });
    };

    window.showInfo = (message, duration = 3000) => {
      return ModalSystem.notify(message, {
        type: "info",
        duration,
      });
    };
  }

  disableEnhancedDialogs() {
    if (window._originalAlert) {
      window.alert = window._originalAlert;
      window.confirm = window._originalConfirm;
      window.prompt = window._originalPrompt;
    }
  }

  // Enhanced alert with better UX
  async smartAlert(message, options = {}) {
    const {
      type = "info",
      title = null,
      showAsNotification = false,
      duration = 4000,
    } = options;

    if (showAsNotification) {
      return ModalSystem.notify(message, { type, duration });
    } else {
      const titleMap = {
        info: "ℹ️ Informação",
        success: "✅ Sucesso",
        warning: "⚠️ Aviso",
        error: "❌ Erro",
      };
      return await ModalSystem.alert(message, {
        type,
        title: title || titleMap[type],
      });
    }
  }

  // Enhanced confirm with better options
  async smartConfirm(message, options = {}) {
    const {
      title = "❓ Confirmar",
      okText = "Confirmar",
      cancelText = "Cancelar",
      type = "confirm",
      dangerousAction = false,
    } = options;

    return await ModalSystem.confirm(message, {
      title: dangerousAction ? "⚠️ Ação Perigosa" : title,
      okText,
      cancelText,
      type: dangerousAction ? "warning" : type,
    });
  }

  // Enhanced prompt with validation
  async smartPrompt(message, options = {}) {
    const {
      title = "📝 Input Necessário",
      defaultValue = "",
      placeholder = "Digite sua resposta...",
      required = false,
      inputType = "text",
      maxLength = null,
      pattern = null,
      okText = "OK",
      cancelText = "Cancelar",
    } = options;

    return await ModalSystem.prompt(message, {
      title,
      defaultValue,
      placeholder,
      required,
      inputType,
      maxLength,
      pattern,
      okText,
      cancelText,
    });
  }
}

// Initialize Dialog Manager
window.DialogManager = new DialogManager();

console.log("SAASI Shared Libraries loaded successfully");
