/**
 * SAASI Modal System
 * Replaces native alert(), confirm(), and prompt() dialogs with custom UI components
 */
class ModalSystem {
  constructor() {
    this.currentModal = null;
    this.init();
  }

  init() {
    // Create modal container if it doesn't exist
    if (!document.getElementById("modal-container")) {
      const container = document.createElement("div");
      container.id = "modal-container";
      document.body.appendChild(container);
    }
  }

  /**
   * Creates and shows a modal
   * @param {Object} options - Modal configuration
   * @param {string} options.type - Modal type: 'alert', 'confirm', 'success', 'error', 'warning'
   * @param {string} options.title - Modal title
   * @param {string} options.message - Modal message (supports HTML)
   * @param {Array} options.buttons - Array of button configurations
   * @param {boolean} options.allowClose - Whether to show close button
   * @param {Function} options.onClose - Callback when modal is closed
   * @returns {Promise} - Resolves with the button result
   */
  showModal(options) {
    return new Promise((resolve) => {
      const {
        type = "alert",
        title = "",
        message = "",
        buttons = [],
        allowClose = true,
        onClose = null,
      } = options;

      // Close existing modal
      if (this.currentModal) {
        this.closeModal();
      }

      // Create modal HTML
      const modalHTML = this.createModalHTML(
        type,
        title,
        message,
        buttons,
        allowClose
      );

      // Add to container
      const container = document.getElementById("modal-container");
      container.innerHTML = modalHTML;

      // Get modal elements
      const overlay = container.querySelector(".modal-overlay");
      const modal = container.querySelector(".modal");
      const closeBtn = container.querySelector(".modal-close");

      this.currentModal = overlay;

      // Add event listeners
      if (closeBtn && allowClose) {
        closeBtn.addEventListener("click", () => {
          this.closeModal();
          if (onClose) onClose();
          resolve(null);
        });
      }

      // Close on overlay click
      if (allowClose) {
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) {
            this.closeModal();
            if (onClose) onClose();
            resolve(null);
          }
        });
      }

      // Add button event listeners
      buttons.forEach((button, index) => {
        const btnElement = modal.querySelector(
          `[data-button-index="${index}"]`
        );
        if (btnElement) {
          btnElement.addEventListener("click", () => {
            let shouldClose = true;

            if (button.callback) {
              const result = button.callback();
              if (result === false) {
                shouldClose = false;
              }
            }

            if (shouldClose) {
              this.closeModal();
              resolve(button.value || button.text);
            }
          });
        }
      });

      // Keyboard support
      const handleKeydown = (e) => {
        if (e.key === "Escape" && allowClose) {
          this.closeModal();
          if (onClose) onClose();
          resolve(null);
          document.removeEventListener("keydown", handleKeydown);
        }
      };
      document.addEventListener("keydown", handleKeydown);

      // Show modal with animation
      requestAnimationFrame(() => {
        overlay.classList.add("show");
        modal.focus();
      });

      // Set up auto-remove event listener cleanup
      overlay.addEventListener("transitionend", (e) => {
        if (e.target === overlay && !overlay.classList.contains("show")) {
          document.removeEventListener("keydown", handleKeydown);
        }
      });
    });
  }

  /**
   * Creates the modal HTML structure
   */
  createModalHTML(type, title, message, buttons, allowClose) {
    const closeButton = allowClose
      ? `
      <button class="modal-close" aria-label="Fechar">
        <span aria-hidden="true">&times;</span>
      </button>
    `
      : "";

    const buttonsHTML =
      buttons.length > 0
        ? `
      <div class="modal-footer">
        ${buttons
          .map(
            (button, index) => `
          <button 
            class="btn ${button.class || "btn-secondary"}" 
            data-button-index="${index}"
            ${button.primary ? "autofocus" : ""}
          >
            ${button.text}
          </button>
        `
          )
          .join("")}
      </div>
    `
        : "";

    return `
      <div class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="false">
        <div class="modal modal-${type}" role="document">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            ${closeButton}
          </div>
          <div class="modal-body">
            ${message}
          </div>
          ${buttonsHTML}
        </div>
      </div>
    `;
  }

  /**
   * Closes the current modal
   */
  closeModal() {
    if (this.currentModal) {
      this.currentModal.classList.remove("show");

      // Clean up after animation
      setTimeout(() => {
        const container = document.getElementById("modal-container");
        if (container) {
          container.innerHTML = "";
        }
        this.currentModal = null;
      }, 300); // Match CSS transition duration
    }
  }

  /**
   * Alert replacement - shows information modal
   * @param {string} message - The message to display
   * @param {string} type - Type of alert: 'info', 'success', 'warning', 'error'
   * @returns {Promise}
   */
  alert(message, type = "alert") {
    const typeConfig = {
      alert: { title: "📋 Informação", icon: "📋" },
      info: { title: "ℹ️ Informação", icon: "ℹ️" },
      success: { title: "✅ Sucesso", icon: "✅" },
      warning: { title: "⚠️ Aviso", icon: "⚠️" },
      error: { title: "❌ Erro", icon: "❌" },
    };

    const config = typeConfig[type] || typeConfig.alert;

    return this.showModal({
      type: type,
      title: config.title,
      message: message,
      buttons: [
        {
          text: "OK",
          class: "btn-primary",
          primary: true,
          value: true,
        },
      ],
    });
  }

  /**
   * Confirm replacement - shows confirmation modal
   * @param {string} message - The message to display
   * @param {Object} options - Additional options
   * @returns {Promise<boolean>}
   */
  confirm(message, options = {}) {
    const {
      title = "❓ Confirmar",
      okText = "OK",
      cancelText = "Cancelar",
      type = "confirm",
    } = options;

    return this.showModal({
      type: type,
      title: title,
      message: message,
      buttons: [
        {
          text: cancelText,
          class: "btn-secondary",
          value: false,
        },
        {
          text: okText,
          class: "btn-primary",
          primary: true,
          value: true,
        },
      ],
    });
  }

  /**
   * Prompt replacement - shows input modal
   * @param {string} message - The message to display
   * @param {Object} options - Additional options
   * @returns {Promise<string|null>}
   */
  prompt(message, options = {}) {
    const {
      title = "📝 Input Required",
      defaultValue = "",
      placeholder = "Enter your response...",
      inputType = "text",
      okText = "OK",
      cancelText = "Cancel",
      required = false,
      maxLength = null,
      pattern = null,
    } = options;

    return new Promise((resolve) => {
      const inputId = `modal-input-${Date.now()}`;
      const inputHTML = `
        <div style="margin-top: 15px;">
          <input 
            type="${inputType}" 
            id="${inputId}"
            value="${defaultValue}"
            placeholder="${placeholder}"
            ${maxLength ? `maxlength="${maxLength}"` : ""}
            ${pattern ? `pattern="${pattern}"` : ""}
            ${required ? "required" : ""}
            style="
              width: 100%;
              padding: 12px;
              border: 2px solid #e0e0e0;
              border-radius: 8px;
              font-size: 14px;
              transition: border-color 0.3s ease;
              outline: none;
            "
            onFocus="this.style.borderColor='#667eea'"
            onBlur="this.style.borderColor='#e0e0e0'"
          />
        </div>
      `;

      this.showModal({
        type: "prompt",
        title: title,
        message: message + inputHTML,
        buttons: [
          {
            text: cancelText,
            class: "btn-secondary",
            value: null,
          },
          {
            text: okText,
            class: "btn-primary",
            primary: true,
            callback: () => {
              const input = document.getElementById(inputId);
              const value = input ? input.value.trim() : "";

              if (required && !value) {
                // Don't close modal if required field is empty
                input.style.borderColor = "#e74c3c";
                input.focus();
                return false; // Prevent modal from closing
              }

              resolve(value || null);
              return true;
            },
          },
        ],
        onClose: () => resolve(null),
      }).then((result) => {
        if (result !== true) {
          // If modal was closed by button callback, don't resolve here
          return;
        }
        // Focus the input when modal opens
        setTimeout(() => {
          const input = document.getElementById(inputId);
          if (input) {
            input.focus();
            input.select();
          }
        }, 100);
      });
    });
  }

  /**
   * Enhanced notification system
   * @param {string} message - The message to display
   * @param {Object} options - Notification options
   */
  notify(message, options = {}) {
    const {
      type = "info",
      duration = 4000,
      position = "top-right",
      closable = true,
    } = options;

    const notification = document.createElement("div");
    notification.className = `notification notification-${type} notification-${position}`;
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-message">${message}</div>
        ${closable ? '<button class="notification-close">&times;</button>' : ""}
      </div>
    `;

    // Add notification styles if not present
    if (!document.getElementById("notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
        .notification {
          position: fixed;
          z-index: 10000;
          max-width: 400px;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          transform: translateX(400px);
          opacity: 0;
        }
        .notification.notification-top-right {
          top: 20px;
          right: 20px;
        }
        .notification.notification-top-left {
          top: 20px;
          left: 20px;
          transform: translateX(-400px);
        }
        .notification.notification-bottom-right {
          bottom: 20px;
          right: 20px;
        }
        .notification.notification-bottom-left {
          bottom: 20px;
          left: 20px;
          transform: translateX(-400px);
        }
        .notification.show {
          transform: translateX(0);
          opacity: 1;
        }
        .notification-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .notification-message {
          flex: 1;
          line-height: 1.4;
        }
        .notification-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .notification-close:hover {
          opacity: 1;
        }
        .notification-info {
          background: #e3f2fd;
          color: #1976d2;
          border-left: 4px solid #2196f3;
        }
        .notification-success {
          background: #e8f5e9;
          color: #388e3c;
          border-left: 4px solid #4caf50;
        }
        .notification-warning {
          background: #fff3e0;
          color: #f57c00;
          border-left: 4px solid #ff9800;
        }
        .notification-error {
          background: #ffebee;
          color: #d32f2f;
          border-left: 4px solid #f44336;
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Show notification
    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration);
    }

    // Close button handler
    const closeBtn = notification.querySelector(".notification-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.removeNotification(notification);
      });
    }

    return notification;
  }

  /**
   * Remove notification
   */
  removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  /**
   * Custom modal for specific use cases
   * @param {Object} config - Full modal configuration
   * @returns {Promise}
   */
  custom(config) {
    return this.showModal(config);
  }
}

// Create global instance
window.ModalSystem = new ModalSystem();

// Override native dialogs (optional - can be enabled by calling enableOverrides())
window.enableModalOverrides = function () {
  // Store original functions
  window._originalAlert = window.alert;
  window._originalConfirm = window.confirm;
  window._originalPrompt = window.prompt;

  // Override with modal system
  window.alert = function (message) {
    return ModalSystem.alert(message);
  };

  window.confirm = function (message) {
    return ModalSystem.confirm(message);
  };

  window.prompt = function (message, defaultValue = "") {
    return ModalSystem.prompt(message, { defaultValue });
  };
};

// Restore native dialogs
window.disableModalOverrides = function () {
  if (window._originalAlert) {
    window.alert = window._originalAlert;
  }
  if (window._originalConfirm) {
    window.confirm = window._originalConfirm;
  }
  if (window._originalPrompt) {
    window.prompt = window._originalPrompt;
  }
};

// Export for ES6 modules if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = ModalSystem;
}
