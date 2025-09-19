/**
 * Sistema Universal de Dicas para SAASI Escape Room
 * Fornece orientações contextuais para ajudar jogadores
 */

class HintsSystem {
  constructor() {
    this.currentPhase = this.detectPhase();
    this.hintsData = this.loadHintsData();
    this.createHintsUI();
    this.setupEventListeners();
  }

  detectPhase() {
    const url = window.location.pathname;
    if (url.includes("fase1-escape")) return "fase1";
    if (url.includes("fase2-escape")) return "fase2";
    if (url.includes("fase3-escape")) return "fase3";
    return "unknown";
  }

  loadHintsData() {
    return {
      fase1: {
        general: [
          "🔍 Procure códigos ocultos nos elementos interativos",
          "💡 Clique nos ícones e textos para descobrir pistas",
          "🎯 Cada puzzle tem objetivos específicos - leia as instruções",
          "⭐ Códigos secretos desbloqueiam funcionalidades especiais",
        ],
        puzzle1: [
          "📋 Analise cuidadosamente cada problema identificado",
          "🔢 Priorize problemas com maior impacto na vida da Felisbina",
          "💭 Considere a urgência e a gravidade de cada situação",
          "🎯 Procure por códigos nos problemas mais críticos",
        ],
        puzzle2: [
          "🔗 Conecte problemas relacionados entre si",
          "📊 Observe as métricas de impacto para fazer conexões",
          "🧩 Problemas podem ter múltiplas causas e efeitos",
          "💡 Códigos aparecem quando faz conexões corretas",
        ],
        puzzle3: [
          "⚖️ Balance a importância vs urgência de cada problema",
          "📈 Use as métricas para tomar decisões informadas",
          "🎯 Problemas de alta prioridade devem estar no topo",
          "🔍 Códigos estão escondidos nos problemas bem priorizados",
        ],
      },
      fase2: {
        general: [
          "🔍 Explore todos os elementos interativos da interface",
          "💡 Códigos aparecem quando completa ações corretamente",
          "🎯 Cada puzzle tem critérios específicos de sucesso",
          "⭐ Dicas visuais indicam elementos importantes",
        ],
        puzzle1: [
          "📋 Leia atentamente cada objetivo proposto",
          "🎯 Objetivos devem ser específicos e mensuráveis",
          "💭 Considere a realidade e capacidades da Felisbina",
          "🔍 Códigos aparecem em objetivos bem formulados",
        ],
        puzzle2: [
          "🔗 Conecte objetivos que se complementam",
          "📊 Observe as sinergias entre diferentes objetivos",
          "🧩 Alguns objetivos dependem de outros",
          "💡 Conexões corretas revelam códigos especiais",
        ],
        puzzle3: [
          "⚖️ Avalie a viabilidade de cada objetivo",
          "📈 Considere recursos disponíveis e limitações",
          "🎯 Priorize objetivos com maior impacto",
          "🔍 Códigos estão em objetivos bem avaliados",
        ],
      },
      fase3: {
        general: [
          "🔍 Procure códigos ocultos nos programas e atividades",
          "💡 Interaja com todos os elementos para descobrir pistas",
          "🎯 Cada puzzle tem critérios específicos de conclusão",
          "⭐ Códigos de conexão desbloqueiam funcionalidades especiais",
        ],
        puzzle1: [
          "📋 Analise a adequação de cada programa para a Felisbina",
          "🎯 Considere idade, escolaridade e experiência",
          "💭 Verifique compatibilidade com outros programas",
          "🔍 Códigos estão nos programas mais adequados (ADQ, PSI, SOC)",
        ],
        puzzle2: [
          "🔗 Estabeleça conexões estratégicas entre entidades",
          "📊 Observe tempos de resposta e especialidades",
          "🧩 Cada entidade tem códigos de conexão únicos",
          "💡 Use códigos: IEFP2025, SAUDE2025, IPSS2025",
        ],
        puzzle3: [
          "⚖️ Organize atividades respeitando pré-requisitos",
          "📈 Verifique conflitos e dependências temporais",
          "🎯 Cada atividade tem um mês ideal de execução",
          "🔍 Códigos secretos: PRIM1, AVAL1, QUAL2, etc.",
        ],
        puzzle4: [
          "📋 Complete todas as validações obrigatórias",
          "🎯 Obtenha aprovações de todas as entidades",
          "💭 Garanta que Felisbina compreende o plano",
          "✅ Validação completa desbloqueia próxima fase",
        ],
      },
    };
  }

  createHintsUI() {
    // Criar botão de dicas
    const hintsButton = document.createElement("button");
    hintsButton.id = "hints-button";
    hintsButton.innerHTML = "💡 Dicas";
    hintsButton.className = "hints-button";
    hintsButton.onclick = () => this.showHintsModal();

    // Criar botão de navegação entre fases
    const navigationButton = document.createElement("button");
    navigationButton.id = "navigation-button";
    navigationButton.innerHTML = "🧭 Navegação";
    navigationButton.className = "navigation-button";
    navigationButton.onclick = () => this.showNavigationModal();

    // Adicionar estilos
    const style = document.createElement("style");
    style.textContent = `
      .hints-button, .navigation-button {
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(23, 162, 184, 0.9);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .navigation-button {
        top: 130px;
        background: rgba(108, 117, 125, 0.9);
      }

      .hints-button:hover, .navigation-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      .hints-modal, .navigation-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
      }

      .hints-modal.show, .navigation-modal.show {
        display: flex;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .hints-content, .navigation-content {
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        position: relative;
        margin: 20px;
        transform: scale(0.9);
        animation: modalSlideIn 0.3s ease forwards;
      }

      @keyframes modalSlideIn {
        from { 
          transform: scale(0.9) translateY(-20px);
          opacity: 0;
        }
        to { 
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      }

      .hints-header, .navigation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #f0f0f0;
        padding-bottom: 15px;
      }

      .hints-close, .navigation-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
      }

      .hints-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .hints-tab {
        padding: 8px 16px;
        border: 2px solid #ddd;
        background: #f8f9fa;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        user-select: none;
      }

      .hints-tab:hover {
        background: #e9ecef;
        border-color: #17a2b8;
        transform: translateY(-1px);
      }

      .hints-tab.active {
        background: #17a2b8;
        color: white;
        border-color: #17a2b8;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
      }

      .hints-tab.active:hover {
        background: #138496;
      }

      .hint-item {
        background: #f8f9fa;
        padding: 15px;
        margin: 10px 0;
        border-radius: 10px;
        border-left: 4px solid #17a2b8;
      }

      .navigation-item {
        background: #f8f9fa;
        padding: 15px;
        margin: 10px 0;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navigation-item button {
        background: #17a2b8;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .navigation-item button:hover {
        background: #138496;
      }

      .navigation-item button:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      .reset-section {
        border-top: 2px solid #f0f0f0;
        margin-top: 20px;
        padding-top: 20px;
      }

      .reset-button {
        background: #dc3545;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .reset-button:hover {
        background: #c82333;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(hintsButton);
    document.body.appendChild(navigationButton);
  }

  setupEventListeners() {
    // Atalho de teclado para dicas (H)
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (
          activeElement.tagName !== "INPUT" &&
          activeElement.tagName !== "TEXTAREA"
        ) {
          this.showHintsModal();
        }
      }
    });
  }

  showHintsModal() {
    // Remover modal existente se houver
    const existingModal = document.getElementById("hints-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "hints-modal";
    modal.className = "hints-modal";

    const phaseHints =
      this.hintsData[this.currentPhase] || this.hintsData.fase1;

    modal.innerHTML = `
      <div class="hints-content">
        <div class="hints-header">
          <h2>💡 Dicas e Orientações - ${this.currentPhase.toUpperCase()}</h2>
          <button class="hints-close" onclick="this.closest('.hints-modal').remove()">×</button>
        </div>

        <div class="hints-tabs">
          <div class="hints-tab active" data-category="general">
            🎯 Geral
          </div>
          ${Object.keys(phaseHints)
            .filter((key) => key !== "general")
            .map(
              (puzzle, index) => `
            <div class="hints-tab" data-category="${puzzle}">
              🧩 ${puzzle.replace("puzzle", "Puzzle ")}
            </div>
          `
            )
            .join("")}
        </div>

        <div class="hints-body">
          ${this.generateHintsContent("general", phaseHints.general)}
        </div>

        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
          💡 Pressione <strong>H</strong> a qualquer momento para abrir as dicas
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add("show");

    // Add event listeners for tabs
    const tabs = modal.querySelectorAll(".hints-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const category = tab.dataset.category;
        const content = this.generateHintsContent(
          category,
          phaseHints[category]
        );
        this.switchTab(tab, content);
      });
    });

    // Fechar ao clicar fora
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  generateHintsContent(category, hints) {
    return hints.map((hint) => `<div class="hint-item">${hint}</div>`).join("");
  }

  switchTab(tabElement, content) {
    // Remove active class from all tabs
    const allTabs = tabElement.parentElement.querySelectorAll(".hints-tab");
    allTabs.forEach((tab) => tab.classList.remove("active"));

    // Add active class to clicked tab
    tabElement.classList.add("active");

    // Update content
    const hintsBody =
      tabElement.parentElement.parentElement.querySelector(".hints-body");
    if (hintsBody) {
      hintsBody.innerHTML = content;
    }
  }

  showNavigationModal() {
    // Remover modal existente se houver
    const existingModal = document.getElementById("navigation-modal");
    if (existingModal) {
      existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "navigation-modal";
    modal.className = "navigation-modal";

    // Verificar progresso das fases
    const phase1Results = localStorage.getItem("saasi_phase1_results");
    const phase2Results = localStorage.getItem("saasi_phase2_results");
    const phase3Results = localStorage.getItem("saasi_phase3_results");

    modal.innerHTML = `
      <div class="navigation-content">
        <div class="navigation-header">
          <h2>🧭 Navegação entre Fases</h2>
          <button class="navigation-close" onclick="this.closest('.navigation-modal').remove()">×</button>
        </div>

        <div class="navigation-item">
          <div>
            <strong>🎯 Fase 1: Identificação de Problemas</strong>
            <div style="font-size: 14px; color: #666;">
              ${
                phase1Results
                  ? `✅ Completada (${
                      JSON.parse(phase1Results).score
                    }/100 pontos)`
                  : "⏳ Não iniciada"
              }
            </div>
          </div>
          <button onclick="window.location.href='fase1-escape.html'">
            Ir para Fase 1
          </button>
        </div>

        <div class="navigation-item">
          <div>
            <strong>🎯 Fase 2: Identificação e Planeamento</strong>
            <div style="font-size: 14px; color: #666;">
              ${
                phase2Results
                  ? `✅ Completada (${
                      JSON.parse(phase2Results).score
                    }/100 pontos)`
                  : "⏳ Não iniciada"
              }
            </div>
          </div>
          <button onclick="window.location.href='fase2-escape.html'" ${
            !phase1Results ? 'disabled title="Complete a Fase 1 primeiro"' : ""
          }>
            Ir para Fase 2
          </button>
        </div>

        <div class="navigation-item">
          <div>
            <strong>🎯 Fase 3: Plano de Intervenção</strong>
            <div style="font-size: 14px; color: #666;">
              ${
                phase3Results
                  ? `✅ Completada (${
                      JSON.parse(phase3Results).score
                    }/100 pontos)`
                  : "⏳ Não iniciada"
              }
            </div>
          </div>
          <button onclick="window.location.href='fase3-escape.html'" ${
            !phase2Results ? 'disabled title="Complete a Fase 2 primeiro"' : ""
          }>
            Ir para Fase 3
          </button>
        </div>

        <div class="navigation-item">
          <div>
            <strong>🏠 Menu Principal</strong>
            <div style="font-size: 14px; color: #666;">Voltar ao menu inicial</div>
          </div>
          <button onclick="window.location.href='index.html'">
            Menu Principal
          </button>
        </div>

        <div class="reset-section">
          <h3>⚠️ Opções de Reset</h3>
          <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
            Atenção: Estas ações irão apagar o seu progresso!
          </p>
          
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="reset-button" onclick="window.hintsSystem.resetCurrentPhase()">
              🔄 Reset Fase Atual
            </button>
            <button class="reset-button" onclick="window.hintsSystem.resetAllProgress()">
              🗑️ Reset Completo
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add("show");

    // Fechar ao clicar fora
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  resetCurrentPhase() {
    if (
      confirm(
        `Tem a certeza que deseja reiniciar a ${this.currentPhase.toUpperCase()}? Todo o progresso desta fase será perdido.`
      )
    ) {
      // Remover dados da fase atual
      localStorage.removeItem(`saasi_${this.currentPhase}_results`);

      // Mostrar toast de confirmação
      if (window.showToast) {
        window.showToast(
          `🔄 ${this.currentPhase.toUpperCase()} reiniciada com sucesso!`,
          "success",
          3000
        );
      }

      // Recarregar página após um pequeno delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  resetAllProgress() {
    if (
      confirm(
        "Tem a certeza que deseja apagar TODO o progresso? Esta ação não pode ser desfeita."
      )
    ) {
      // Remover todos os dados das fases
      localStorage.removeItem("saasi_phase1_results");
      localStorage.removeItem("saasi_phase2_results");
      localStorage.removeItem("saasi_phase3_results");

      // Mostrar toast de confirmação
      if (window.showToast) {
        window.showToast("🗑️ Todo o progresso foi apagado!", "success", 3000);
      }

      // Redirecionar para menu principal
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    }
  }
}

// Inicializar sistema de dicas quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  window.hintsSystem = new HintsSystem();
});
