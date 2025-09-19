/**
 * Sistema Universal de Progresso para SAASI Escape Room
 * Garante consistência na exibição de pontuações e percentagens
 */

class ProgressSystem {
  constructor() {
    this.maxScores = {
      puzzle1: 25,
      puzzle2: 25,
      puzzle3: 30,
      puzzle4: 20,
      total: 100,
    };

    this.setupProgressUpdater();
  }

  setupProgressUpdater() {
    // Sobrescrever função updateScore global se existir
    if (window.updateScore) {
      this.originalUpdateScore = window.updateScore;
    }

    window.updateScore = () => this.updateScore();
  }

  updateScore() {
    // Chamar função original se existir
    if (this.originalUpdateScore) {
      this.originalUpdateScore();
    }

    // Atualizar com sistema melhorado
    this.updateProgressBars();
    this.updateScoreDisplays();
    this.updatePercentages();
  }

  updateProgressBars() {
    const gameState = window.gameState || window.escapeRoom?.gameState;
    if (!gameState) return;

    // Atualizar barras de progresso específicas de cada puzzle
    this.updatePuzzleProgress("puzzle1", gameState);
    this.updatePuzzleProgress("puzzle2", gameState);
    this.updatePuzzleProgress("puzzle3", gameState);
    this.updatePuzzleProgress("puzzle4", gameState);

    // Atualizar progresso geral
    this.updateOverallProgress(gameState);
  }

  updatePuzzleProgress(puzzleId, gameState) {
    const puzzleData = gameState[puzzleId];
    if (!puzzleData) return;

    const maxScore = this.maxScores[puzzleId];
    const currentScore = Math.max(0, Math.min(maxScore, puzzleData.score || 0));
    const percentage = Math.round((currentScore / maxScore) * 100);

    // Atualizar barra de progresso
    const progressBar = document.getElementById(`${puzzleId}-progress-bar`);
    if (progressBar) {
      progressBar.style.width = percentage + "%";
    }

    // Atualizar texto de progresso
    const progressText = document.getElementById(`${puzzleId}-progress-text`);
    if (progressText) {
      progressText.textContent = `${currentScore}/${maxScore} pontos (${percentage}%)`;
    }

    // Atualizar indicadores específicos do puzzle
    this.updatePuzzleSpecificIndicators(puzzleId, gameState);
  }

  updatePuzzleSpecificIndicators(puzzleId, gameState) {
    const puzzleData = gameState[puzzleId];

    switch (puzzleId) {
      case "puzzle1":
        // Atualizar contadores de programas selecionados
        const selectedCount = puzzleData.selectedPrograms?.length || 0;
        const rejectedCount = puzzleData.rejectedPrograms?.length || 0;

        const selectedElement = document.getElementById("programs-selected");
        if (selectedElement) {
          selectedElement.textContent = selectedCount;
        }

        const progressElement = document.getElementById("progress-programs");
        if (progressElement) {
          const totalDecisions = selectedCount + rejectedCount;
          const progressPercentage = Math.min(100, (totalDecisions / 6) * 100);
          progressElement.style.width = progressPercentage + "%";
        }
        break;

      case "puzzle2":
        // Atualizar contadores de entidades contactadas
        const contactedCount = puzzleData.connectedEntities?.length || 0;

        const contactedElement = document.getElementById("entities-contacted");
        if (contactedElement) {
          contactedElement.textContent = contactedCount;
        }

        const entitiesProgress = document.getElementById("progress-entities");
        if (entitiesProgress) {
          const progressPercentage = Math.min(100, (contactedCount / 3) * 100);
          entitiesProgress.style.width = progressPercentage + "%";
        }
        break;

      case "puzzle3":
        // Atualizar contadores de atividades colocadas
        const placedCount = Object.keys(
          puzzleData.placedActivities || {}
        ).length;

        const placedElement = document.getElementById("activities-placed");
        if (placedElement) {
          placedElement.textContent = placedCount;
        }

        const timelineProgress = document.getElementById("progress-timeline");
        if (timelineProgress) {
          const progressPercentage = Math.min(100, (placedCount / 10) * 100);
          timelineProgress.style.width = progressPercentage + "%";
        }
        break;

      case "puzzle4":
        // Atualizar contadores de validações
        const validationStages = puzzleData.validationStages || {};
        const completedValidations =
          Object.values(validationStages).filter(Boolean).length;

        const validationsElement = document.getElementById(
          "validations-completed"
        );
        if (validationsElement) {
          validationsElement.textContent = completedValidations;
        }

        const validationProgress = document.getElementById(
          "progress-validation"
        );
        if (validationProgress) {
          const progressPercentage = Math.min(
            100,
            (completedValidations / 3) * 100
          );
          validationProgress.style.width = progressPercentage + "%";
        }
        break;
    }
  }

  updateScoreDisplays() {
    const gameState = window.gameState || window.escapeRoom?.gameState;
    if (!gameState) return;

    // Calcular pontuação total
    let totalScore = 0;
    ["puzzle1", "puzzle2", "puzzle3", "puzzle4"].forEach((puzzleId) => {
      const puzzleData = gameState[puzzleId];
      if (puzzleData && puzzleData.score) {
        const maxScore = this.maxScores[puzzleId];
        const clampedScore = Math.max(0, Math.min(maxScore, puzzleData.score));
        totalScore += clampedScore;
      }
    });

    // Garantir que não excede 100 pontos
    totalScore = Math.min(100, totalScore);

    // Atualizar exibição da pontuação total
    const scoreElements = [
      document.getElementById("total-score"),
      document.getElementById("score"),
      document.getElementById("current-score"),
    ];

    scoreElements.forEach((element) => {
      if (element) {
        element.textContent = totalScore;
      }
    });

    // Atualizar pontuações individuais dos puzzles
    const puzzleScores = document.querySelectorAll(".puzzle-score");
    puzzleScores.forEach((element, index) => {
      const puzzleId = `puzzle${index + 1}`;
      const puzzleData = gameState[puzzleId];
      const maxScore = this.maxScores[puzzleId];

      if (puzzleData) {
        const currentScore = Math.max(
          0,
          Math.min(maxScore, puzzleData.score || 0)
        );
        element.textContent = `${currentScore}/${maxScore} pontos`;
      }
    });

    // Atualizar gameState com pontuação corrigida
    if (gameState.score !== totalScore) {
      gameState.score = totalScore;
    }
  }

  updatePercentages() {
    const gameState = window.gameState || window.escapeRoom?.gameState;
    if (!gameState) return;

    // Calcular percentagem geral
    const totalScore = gameState.score || 0;
    const percentage = Math.round((totalScore / 100) * 100);

    // Atualizar elementos de percentagem
    const percentageElements = [
      document.getElementById("progress-text"),
      document.getElementById("percentage-display"),
      document.getElementById("overall-percentage"),
    ];

    percentageElements.forEach((element) => {
      if (element) {
        element.textContent = percentage + "%";
      }
    });
  }

  updateOverallProgress(gameState) {
    const totalScore = gameState.score || 0;
    const percentage = Math.min(100, (totalScore / 100) * 100);

    // Atualizar barra de progresso geral
    const overallProgress = document.getElementById("progress");
    if (overallProgress) {
      overallProgress.style.width = percentage + "%";
    }

    // Atualizar círculo de progresso se existir
    const progressCircle = document.getElementById("progress-circle");
    if (progressCircle) {
      const circumference = 2 * Math.PI * 50; // assumindo radius = 50
      const offset = circumference - (percentage / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  // Função para debug - mostra estado atual
  debugProgress() {
    const gameState = window.gameState || window.escapeRoom?.gameState;
    if (!gameState) {
      console.log("❌ GameState não encontrado");
      return;
    }

    console.log("📊 Estado do Progresso:");
    ["puzzle1", "puzzle2", "puzzle3", "puzzle4"].forEach((puzzleId) => {
      const puzzleData = gameState[puzzleId];
      const maxScore = this.maxScores[puzzleId];
      const currentScore = puzzleData?.score || 0;
      const clampedScore = Math.max(0, Math.min(maxScore, currentScore));

      console.log(
        `  ${puzzleId}: ${clampedScore}/${maxScore} (${Math.round(
          (clampedScore / maxScore) * 100
        )}%)`
      );
    });

    console.log(
      `  Total: ${gameState.score}/100 (${Math.round(
        (gameState.score / 100) * 100
      )}%)`
    );
  }

  // Função para forçar atualização completa
  forceUpdate() {
    console.log("🔄 Forçando atualização completa do progresso...");
    this.updateScore();
  }
}

// Inicializar sistema de progresso
document.addEventListener("DOMContentLoaded", () => {
  window.progressSystem = new ProgressSystem();

  // Adicionar comando de debug ao console
  window.debugProgress = () => window.progressSystem.debugProgress();
  window.forceProgressUpdate = () => window.progressSystem.forceUpdate();
});

// Exportar para uso em outros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProgressSystem;
}
