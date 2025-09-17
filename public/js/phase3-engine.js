/**
 * SAASI Escape Room - Phase 3 Engine
 * Complete Implementation of Phase 3: Plano de Intervenção e Articulação
 *
 * Based on FASE3_ESPECIFICACAO_DETALHADA.md
 *
 * Features:
 * - Enhanced Program Selection with adequacy validation
 * - Entity Articulation with proper coordination
 * - Timeline Builder with correct sequencing
 * - Validation and Approval system
 *
 * @version 2.0
 * @date January 2025
 */

// =====================================================
// ENHANCED PROGRAM SELECTION DATA
// =====================================================

const ENHANCED_PROGRAMS_DATA = [
  {
    id: "programa_qualifica",
    nome: "Medida + Emprego - Programa Qualifica",
    categoria: "emprego_formacao",
    adequado_felisbina: true,
    pontos_se_selecionado: 8,
    pontos_se_rejeitado: -3,
    entidade_responsavel: "IEFP",
    duracao_meses: 6,
    requisitos: [
      "escolaridade_9ano",
      "experiencia_profissional",
      "disponibilidade_total",
    ],
    justificacao_correta:
      "ADEQUADO: Felisbina tem 9º ano, experiência em limpeza e disponibilidade total",
    justificacao_detalhada:
      "O Programa Qualifica é ideal para Felisbina porque permite reconhecer as competências adquiridas nos 6 meses de trabalho em limpeza e oferece formação adicional para alcançar o 12º ano.",
    icone: "💼",
    cor: "#2196f3",
    criterios_elegibilidade: [
      "Idade entre 18-64 anos ✓",
      "Habilitações ao nível do 9º ano ✓",
      "Experiência profissional comprovada ✓",
      "Disponibilidade para formação ✓",
    ],
  },
  {
    id: "apoio_psicossocial",
    nome: "Medida + Inclusão - Apoio Psicossocial",
    categoria: "apoio_psicossocial",
    adequado_felisbina: true,
    pontos_se_selecionado: 8,
    pontos_se_rejeitado: -5,
    entidade_responsavel: "Centro de Saúde",
    duracao_meses: 8,
    requisitos: ["problemas_psicossociais", "motivacao_mudanca"],
    justificacao_correta:
      "ESSENCIAL: Dependência emocional e isolamento social são problemas prioritários",
    justificacao_detalhada:
      "É fundamental abordar a dependência emocional do pai e o isolamento social antes de qualquer intervenção profissional. Sem esta base, outros programas terão baixa eficácia.",
    icone: "🧠",
    cor: "#e91e63",
    criterios_elegibilidade: [
      "Problemas emocionais identificados ✓",
      "Dependência emocional confirmada ✓",
      "Isolamento social presente ✓",
      "Motivação para mudança ✓",
    ],
  },
  {
    id: "grupos_apoio_social",
    nome: "Grupos de Apoio Social - IPSS",
    categoria: "apoio_social",
    adequado_felisbina: true,
    pontos_se_selecionado: 6,
    pontos_se_rejeitado: -2,
    entidade_responsavel: "IPSS Local",
    duracao_meses: 6,
    requisitos: ["isolamento_social", "motivacao_participacao"],
    justificacao_correta:
      "ADEQUADO: Isolamento social severo necessita intervenção específica",
    justificacao_detalhada:
      "Os grupos de apoio social são cruciais para quebrar o isolamento e desenvolver uma rede de suporte. Complementa o apoio psicológico individual.",
    icone: "👥",
    cor: "#ff9800",
    criterios_elegibilidade: [
      "Isolamento social documentado ✓",
      "Capacidade de participação em grupo ✓",
      "Interesse em atividades sociais ✓",
    ],
  },
  {
    id: "formacao_digital",
    nome: "Formação Modular - Competências Digitais",
    categoria: "formacao_especializada",
    adequado_felisbina: false,
    pontos_se_selecionado: -5,
    pontos_se_rejeitado: 3,
    entidade_responsavel: "Centro de Formação",
    duracao_meses: 3,
    requisitos: ["competencias_digitais_base", "motivacao_alta_tecnologia"],
    justificacao_correta:
      "INADEQUADO: Competências digitais muito limitadas, não é prioridade atual",
    justificacao_detalhada:
      "Embora importantes a longo prazo, as competências digitais não são prioritárias face aos problemas emocionais e sociais. Seria mais eficaz após estabilização.",
    icone: "📚",
    cor: "#9c27b0",
    criterios_elegibilidade: [
      "Competências digitais básicas ❌",
      "Motivação para tecnologia ❌",
      "Disponibilidade para formação intensiva ❌",
    ],
  },
  {
    id: "trabalho_necessario",
    nome: "Trabalho Socialmente Necessário",
    categoria: "emprego_protegido",
    adequado_felisbina: false,
    pontos_se_selecionado: -8,
    pontos_se_rejeitado: 5,
    entidade_responsavel: "Câmara Municipal",
    duracao_meses: 12,
    requisitos: ["incapacidade_emprego_normal"],
    justificacao_correta:
      "INADEQUADO: Felisbina tem capacidade para emprego regular com apoio adequado",
    justificacao_detalhada:
      "O Trabalho Socialmente Necessário destina-se a pessoas com maiores limitações. Felisbina tem capacidades para integração no mercado regular após formação adequada.",
    icone: "🛡️",
    cor: "#607d8b",
    criterios_elegibilidade: [
      "Incapacidade para emprego regular ❌",
      "Limitações significativas ❌",
      "Necessidade de proteção laboral ❌",
    ],
  },
  {
    id: "estagios_iniciar",
    nome: "Estágios INICIAR - Inclusão Social",
    categoria: "estagio_inclusao",
    adequado_felisbina: false,
    pontos_se_selecionado: -3,
    pontos_se_rejeitado: 2,
    entidade_responsavel: "IPSS Local",
    duracao_meses: 4,
    requisitos: ["disponibilidade_parcial", "competencias_sociais_basicas"],
    justificacao_correta:
      "INADEQUADO: Conflito temporal com Programa Qualifica que é prioritário",
    justificacao_detalhada:
      "Embora útil, este programa entraria em conflito com o Programa Qualifica que oferece reconhecimento formal e melhor progressão profissional.",
    icone: "🌱",
    cor: "#4caf50",
    criterios_elegibilidade: [
      "Disponibilidade parcial ✓",
      "Competências sociais básicas ~",
      "Não conflito com outros programas ❌",
    ],
  },
];

// =====================================================
// ENHANCED ENTITIES DATA
// =====================================================

const ENHANCED_ENTITIES_DATA = [
  {
    id: "iefp_porto",
    nome: "IEFP - Instituto do Emprego e Formação Profissional",
    localizacao: "Porto - Constituição",
    contacto: "225 073 000",
    email: "porto@iefp.pt",
    horario: "09:00-17:00",
    especialidade: [
      "programa_qualifica",
      "medidas_emprego",
      "formacao_profissional",
      "certificacao_competencias",
    ],
    tempo_resposta: "3-5 dias úteis",
    adequado_felisbina: true,
    pontos: 12,
    programas_oferecidos: ["programa_qualifica"],
    articulacao_necessaria: [
      "avaliacao_competencias",
      "plano_formacao",
      "acompanhamento",
    ],
    documentos_necessarios: [
      "cv_atualizado",
      "certificado_habilitacoes",
      "declaracao_rsi",
      "certificado_experiencia_trabalho",
    ],
    disponibilidade_atual: "Vaga disponível para inscrição imediata",
  },
  {
    id: "centro_saude_ramalde",
    nome: "Centro de Saúde de Ramalde",
    localizacao: "Porto - Ramalde",
    contacto: "225 073 200",
    email: "ramalde@arsnorte.min-saude.pt",
    horario: "08:00-20:00",
    especialidade: [
      "psicologia",
      "psiquiatria",
      "apoio_psicossocial",
      "medicina_geral",
    ],
    tempo_resposta: "2-3 semanas (psicologia), 6-8 semanas (psiquiatria)",
    adequado_felisbina: true,
    pontos: 15,
    programas_oferecidos: ["apoio_psicossocial"],
    articulacao_necessaria: [
      "consulta_triagem",
      "plano_tratamento",
      "acompanhamento_regular",
    ],
    documentos_necessarios: [
      "numero_utente",
      "cartao_cidadao",
      "referenciacao_medica",
    ],
    disponibilidade_atual:
      "Lista de espera - prioridade por vulnerabilidade social",
  },
  {
    id: "ipss_solidariedade",
    nome: "IPSS Solidariedade Social",
    localizacao: "Porto - Campanhã",
    contacto: "225 073 300",
    email: "geral@solidariedadesocial.pt",
    horario: "09:00-18:00",
    especialidade: [
      "grupos_apoio",
      "atividades_sociais",
      "estagios_inclusao",
      "apoio_comunitario",
    ],
    tempo_resposta: "1-2 semanas",
    adequado_felisbina: true,
    pontos: 10,
    programas_oferecidos: ["grupos_apoio_social"],
    articulacao_necessaria: [
      "avaliacao_social",
      "integracao_grupo",
      "acompanhamento",
    ],
    documentos_necessarios: [
      "declaracao_situacao_social",
      "atestado_medico",
      "carta_motivacao",
    ],
    disponibilidade_atual: "Próximo grupo inicia em 2 semanas",
  },
  {
    id: "centro_formacao_digital",
    nome: "Centro de Formação Digital",
    localizacao: "Porto - Baixa",
    contacto: "225 073 400",
    email: "formacao@digitalporto.pt",
    horario: "09:00-19:00",
    especialidade: [
      "competencias_digitais",
      "formacao_modular",
      "literacia_digital",
    ],
    tempo_resposta: "1 semana",
    adequado_felisbina: false,
    pontos: -5,
    programas_oferecidos: ["formacao_digital"],
    articulacao_necessaria: [],
    documentos_necessarios: [],
    disponibilidade_atual: "Não adequado para perfil atual",
    nota_inadequacao:
      "Requer competências digitais prévias que Felisbina não possui",
  },
];

// =====================================================
// ENHANCED TIMELINE DATA (with April and May activities)
// =====================================================

const ENHANCED_TIMELINE_DATA = [
  {
    id: "consulta_psicologia_inicial",
    nome: "Primeira consulta de psicologia",
    mes: 1,
    pontos: 4,
    prerequisitos: [],
    duracao_semanas: 1,
    entidade: "centro_saude_ramalde",
    objetivos: [
      "estabelecer_vinculo",
      "avaliar_estado_emocional",
      "definir_metas_terapeuticas",
    ],
  },
  {
    id: "avaliacao_iefp",
    nome: "Avaliação inicial no IEFP",
    mes: 1,
    pontos: 4,
    prerequisitos: [],
    duracao_semanas: 2,
    entidade: "iefp_porto",
    objetivos: [
      "reconhecer_competencias",
      "planear_formacao",
      "definir_percurso",
    ],
  },
  {
    id: "inicio_qualifica",
    nome: "Início do Programa Qualifica",
    mes: 2,
    pontos: 5,
    prerequisitos: ["avaliacao_iefp"],
    duracao_semanas: 4,
    entidade: "iefp_porto",
    objetivos: [
      "iniciar_formacao",
      "desenvolver_competencias",
      "preparar_certificacao",
    ],
  },
  {
    id: "grupos_apoio_inicio",
    nome: "Integração em grupos de apoio social",
    mes: 2,
    pontos: 4,
    prerequisitos: ["consulta_psicologia_inicial"],
    duracao_semanas: 2,
    entidade: "ipss_solidariedade",
    objetivos: [
      "quebrar_isolamento",
      "criar_rede_apoio",
      "desenvolver_competencias_sociais",
    ],
  },
  {
    id: "consultas_regulares",
    nome: "Consultas de psicologia quinzenais",
    mes: 2,
    pontos: 3,
    prerequisitos: ["consulta_psicologia_inicial"],
    duracao_semanas: 8,
    entidade: "centro_saude_ramalde",
    objetivos: [
      "acompanhamento_emocional",
      "reforcar_autonomia",
      "trabalhar_autoestima",
    ],
  },
  // NEW ACTIVITIES FOR APRIL (Month 3)
  {
    id: "rvcc_desenvolvimento",
    nome: "Desenvolvimento do RVCC 12º ano",
    mes: 3,
    pontos: 5,
    prerequisitos: ["inicio_qualifica"],
    duracao_semanas: 4,
    entidade: "iefp_porto",
    objetivos: [
      "avançar_qualificacao",
      "preparar_certificacao",
      "desenvolver_portfolio",
    ],
  },
  {
    id: "acompanhamento_grupo_apoio",
    nome: "Acompanhamento em grupos de apoio",
    mes: 3,
    pontos: 3,
    prerequisitos: ["grupos_apoio_inicio"],
    duracao_semanas: 4,
    entidade: "ipss_solidariedade",
    objetivos: [
      "consolidar_rede_social",
      "partilhar_experiencias",
      "apoio_mutuo",
    ],
  },
  // NEW ACTIVITIES FOR MAY (Month 4)
  {
    id: "formacao_competencias_profissionais",
    nome: "Formação em competências profissionais",
    mes: 4,
    pontos: 5,
    prerequisitos: ["rvcc_desenvolvimento"],
    duracao_semanas: 4,
    entidade: "iefp_porto",
    objetivos: [
      "especializar_competencias",
      "preparar_mercado_trabalho",
      "treinar_entrevistas",
    ],
  },
  {
    id: "avaliacao_intermedia",
    nome: "Avaliação intermédia do progresso",
    mes: 4,
    pontos: 3,
    prerequisitos: ["consultas_regulares"],
    duracao_semanas: 1,
    entidade: "centro_saude_ramalde",
    objetivos: [
      "avaliar_progresso",
      "ajustar_estrategias",
      "preparar_autonomia",
    ],
  },
  // EXISTING ACTIVITIES (June onwards)
  {
    id: "estagio_profissional",
    nome: "Estágio profissional (Qualifica)",
    mes: 5,
    pontos: 6,
    prerequisitos: ["formacao_competencias_profissionais"],
    duracao_semanas: 8,
    entidade: "iefp_porto",
    objetivos: [
      "experiencia_pratica",
      "aplicar_competencias",
      "integrar_mercado",
    ],
  },
  {
    id: "preparacao_autonomia",
    nome: "Preparação para autonomia",
    mes: 6,
    pontos: 4,
    prerequisitos: ["avaliacao_intermedia", "estagio_profissional"],
    duracao_semanas: 4,
    entidade: "centro_saude_ramalde",
    objetivos: [
      "consolidar_autonomia",
      "planear_futuro",
      "reduzir_dependencias",
    ],
  },
  {
    id: "avaliacao_final",
    nome: "Avaliação final do processo",
    mes: 7,
    pontos: 3,
    prerequisitos: ["preparacao_autonomia"],
    duracao_semanas: 2,
    entidade: "centro_saude_ramalde",
    objetivos: [
      "avaliar_resultados",
      "planear_seguimento",
      "celebrar_conquistas",
    ],
  },
];

// =====================================================
// PHASE 3 ENGINE CLASS
// =====================================================

class Phase3Engine {
  constructor() {
    this.currentState = "intro";
    this.score = 0;

    // Puzzle states
    this.puzzle1 = {
      completed: false,
      programsSelected: [],
      programsRejected: [],
      score: 0,
      justificationsProvided: {},
    };

    this.puzzle2 = {
      completed: false,
      entitiesContacted: [],
      articulationEstablished: [],
      score: 0,
    };

    this.puzzle3 = {
      completed: false,
      activitiesPlaced: {},
      sequenceCorrect: false,
      prerequisitesRespected: true,
      score: 0,
    };

    this.puzzle4 = {
      completed: false,
      validationCoherence: false,
      entityApprovals: { iefp: false, saude: false, ipss: false },
      consentObtained: false,
      score: 0,
    };

    // Data from previous phases
    this.phase1Data = null;
    this.phase2Data = null;
  }

  // Initialize Phase 3 with data from previous phases
  initialize(phase1Data, phase2Data) {
    this.phase1Data = phase1Data;
    this.phase2Data = phase2Data;
    this.loadFelisbinaContext();
    return this;
  }

  loadFelisbinaContext() {
    // Load contextualized data based on previous phases
    this.felisbinaContext = {
      problemas_priorizados: [
        {
          problema: "Dependência emocional do pai",
          prioridade: "ALTA",
          categoria: "psicossocial",
        },
        {
          problema: "Perda de suporte familiar (irmão)",
          prioridade: "ALTA",
          categoria: "social",
        },
        {
          problema: "Isolamento social significativo",
          prioridade: "MÉDIA-ALTA",
          categoria: "social",
        },
        {
          problema: "Necessidades qualificação profissional",
          prioridade: "MÉDIA",
          categoria: "formacao",
        },
      ],

      recursos_identificados: {
        experiencia_limpeza: "6 meses comprovados",
        motivacao_mudanca: "Alta (score Fase 1)",
        disponibilidade: "Total flexibilidade",
        apoio_tecnico: "Relação de confiança estabelecida",
        situacao_financeira: "Estável com RSI+PSI",
      },

      objetivos_fase3: [
        "Selecionar programas adequados ao perfil",
        "Estabelecer articulação com entidades competentes",
        "Criar cronograma realista de acompanhamento",
        "Validar plano com todas as partes interessadas",
      ],
    };
  }

  // ===== PUZZLE 1: ENHANCED PROGRAM SELECTION =====

  initializeProgramSelection() {
    const container = document.getElementById("programs-container");
    if (!container) return;

    container.innerHTML = "";

    ENHANCED_PROGRAMS_DATA.forEach((program) => {
      const card = document.createElement("div");
      card.className = "program-card enhanced";
      card.dataset.programId = program.id;

      const eligibilityHTML = program.criterios_elegibilidade
        .map(
          (criterio) =>
            `<div style="font-size: 0.8rem; margin: 2px 0;">${criterio}</div>`
        )
        .join("");

      card.innerHTML = `
        <div class="program-status"></div>
        <div class="program-header">
          <h4 class="program-title">${program.icone} ${program.nome}</h4>
          <span class="program-category" style="background: ${
            program.cor
          }20; color: ${program.cor};">
            ${program.categoria.replace("_", " ")}
          </span>
        </div>
        <div class="program-details">
          <div style="margin-bottom: 10px;">
            <strong>Entidade:</strong> ${program.entidade_responsavel}<br>
            <strong>Duração:</strong> ${program.duracao_meses} meses
          </div>
          <div style="background: rgba(0,0,0,0.05); padding: 10px; border-radius: 8px; margin: 10px 0;">
            <strong>Critérios de Elegibilidade:</strong>
            ${eligibilityHTML}
          </div>
          <div style="background: ${
            program.adequado_felisbina ? "#e8f5e8" : "#ffebee"
          }; padding: 10px; border-radius: 8px; margin: 10px 0;">
            <strong>Justificação:</strong><br>
            ${program.justificacao_detalhada}
          </div>
        </div>
        <div class="program-actions" style="margin-top: 15px; display: flex; gap: 10px;">
          <button class="btn btn-success" onclick="selectProgram('${
            program.id
          }')" style="background: #4caf50;">
            ✅ Selecionar
          </button>
          <button class="btn btn-danger" onclick="rejectProgram('${
            program.id
          }')" style="background: #f44336;">
            ❌ Rejeitar
          </button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  selectProgram(programId) {
    const program = ENHANCED_PROGRAMS_DATA.find((p) => p.id === programId);
    if (!program) return;

    // Remove from rejected if it was there and adjust score
    const wasRejected = this.puzzle1.programsRejected.includes(programId);
    if (wasRejected) {
      this.puzzle1.programsRejected = this.puzzle1.programsRejected.filter(
        (id) => id !== programId
      );
      this.puzzle1.score -= program.pontos_se_rejeitado;
    }

    // Add to selected if not already there
    if (!this.puzzle1.programsSelected.includes(programId)) {
      this.puzzle1.programsSelected.push(programId);
      this.puzzle1.score += program.pontos_se_selecionado;

      // Update UI
      const card = document.querySelector(`[data-program-id="${programId}"]`);
      card.classList.add("selected");
      card.classList.remove("rejected");
      card.querySelector(".program-status").textContent = "✅";

      // Re-enable buttons for re-selection
      const buttons = card.querySelectorAll("button");
      buttons.forEach((btn) => (btn.disabled = false));

      this.updateProgress();
      this.checkPuzzle1Completion();

      if (typeof showToast === "function") {
        showToast(
          `✅ ${program.nome} SELECIONADO (+${program.pontos_se_selecionado} pontos)`,
          "success",
          2000
        );
      }
    }
  }

  rejectProgram(programId) {
    const program = ENHANCED_PROGRAMS_DATA.find((p) => p.id === programId);
    if (!program) return;

    // Remove from selected if it was there and adjust score
    const wasSelected = this.puzzle1.programsSelected.includes(programId);
    if (wasSelected) {
      this.puzzle1.programsSelected = this.puzzle1.programsSelected.filter(
        (id) => id !== programId
      );
      this.puzzle1.score -= program.pontos_se_selecionado;
    }

    // Add to rejected if not already there
    if (!this.puzzle1.programsRejected.includes(programId)) {
      this.puzzle1.programsRejected.push(programId);
      this.puzzle1.score += program.pontos_se_rejeitado;

      // Update UI
      const card = document.querySelector(`[data-program-id="${programId}"]`);
      card.classList.add("rejected");
      card.classList.remove("selected");
      card.querySelector(".program-status").textContent = "❌";

      // Re-enable buttons for re-selection
      const buttons = card.querySelectorAll("button");
      buttons.forEach((btn) => (btn.disabled = false));

      this.updateProgress();
      this.checkPuzzle1Completion();

      if (typeof showToast === "function") {
        showToast(
          `❌ ${program.nome} REJEITADO (+${program.pontos_se_rejeitado} pontos)`,
          "warning",
          2000
        );
      }
    }
  }

  checkPuzzle1Completion() {
    // Check criteria: adequate programs selected, inadequate programs rejected
    const adequateSelected = this.puzzle1.programsSelected.filter(
      (id) => ENHANCED_PROGRAMS_DATA.find((p) => p.id === id).adequado_felisbina
    ).length;

    const inadequateRejected = this.puzzle1.programsRejected.filter(
      (id) =>
        !ENHANCED_PROGRAMS_DATA.find((p) => p.id === id).adequado_felisbina
    ).length;

    const totalDecisions =
      this.puzzle1.programsSelected.length +
      this.puzzle1.programsRejected.length;

    // Relaxed criteria: min 4 total decisions with good balance
    if (
      totalDecisions >= 4 &&
      adequateSelected >= 2 &&
      inadequateRejected >= 2
    ) {
      this.puzzle1.completed = true;
      document.getElementById("btn-continue-entities").style.display = "block";

      if (typeof showToast === "function") {
        showToast(
          "🎉 Seleção de programas concluída! Critérios de adequação respeitados.",
          "success"
        );
      }
    } else {
      document.getElementById("btn-continue-entities").style.display = "none";
    }
  }

  // ===== PUZZLE 2: ENHANCED ENTITY ARTICULATION =====

  initializeEntityArticulation() {
    const container = document.getElementById("entities-container");
    if (!container) return;

    container.innerHTML = "";

    ENHANCED_ENTITIES_DATA.forEach((entity) => {
      const card = document.createElement("div");
      card.className = `entity-card enhanced ${
        entity.adequado_felisbina ? "essential" : "not-essential"
      }`;
      card.dataset.entityId = entity.id;

      const specialtyHTML = entity.especialidade
        .map(
          (spec) =>
            `<span style="background: #e3f2fd; padding: 2px 6px; border-radius: 8px; font-size: 0.8rem; margin: 2px;">${spec}</span>`
        )
        .join(" ");

      const documentsHTML = entity.documentos_necessarios
        .map((doc) => `<li style="font-size: 0.8rem;">${doc}</li>`)
        .join("");

      card.innerHTML = `
        <div class="entity-header">
          <div class="entity-name">${entity.nome}</div>
          <div class="entity-status"></div>
        </div>
        <div class="entity-details">
          <div class="entity-specialty">
            <strong>Especialidades:</strong><br>
            ${specialtyHTML}
          </div>
          <div class="entity-contact">
            <strong>📍</strong> ${entity.localizacao}<br>
            <strong>📞</strong> ${entity.contacto}<br>
            <strong>📧</strong> ${entity.email}<br>
            <strong>🕒</strong> ${entity.horario}<br>
            <strong>⏰</strong> Resposta: ${entity.tempo_resposta}
          </div>
          <div class="entity-programs">
            <strong>Programas oferecidos:</strong> ${entity.programas_oferecidos.join(
              ", "
            )}
          </div>
          ${
            entity.articulacao_necessaria.length > 0
              ? `
            <div class="entity-articulation">
              <strong>Articulação necessária:</strong> ${entity.articulacao_necessaria.join(
                ", "
              )}
            </div>
          `
              : ""
          }
          ${
            entity.documentos_necessarios.length > 0
              ? `
            <div class="entity-documents">
              <strong>Documentos necessários:</strong>
              <ul style="margin: 5px 0; padding-left: 20px;">${documentsHTML}</ul>
            </div>
          `
              : ""
          }
          <div class="entity-availability" style="background: ${
            entity.adequado_felisbina ? "#e8f5e8" : "#ffebee"
          }; padding: 8px; border-radius: 6px; margin: 8px 0;">
            <strong>Estado atual:</strong> ${entity.disponibilidade_atual}
            ${
              entity.nota_inadequacao
                ? `<br><em>${entity.nota_inadequacao}</em>`
                : ""
            }
          </div>
        </div>
        <button class="contact-button" onclick="contactEntityEnhanced('${
          entity.id
        }')" ${!entity.adequado_felisbina ? "disabled" : ""}>
          ${entity.adequado_felisbina ? "Contactar" : "Não Adequado"}
        </button>
      `;

      container.appendChild(card);
    });
  }

  contactEntityEnhanced(entityId) {
    const entity = ENHANCED_ENTITIES_DATA.find((e) => e.id === entityId);
    if (!entity || !entity.adequado_felisbina) return;

    if (!this.puzzle2.entitiesContacted.includes(entityId)) {
      this.puzzle2.entitiesContacted.push(entityId);
      this.puzzle2.score += entity.pontos;

      // Update UI
      const card = document.querySelector(`[data-entity-id="${entityId}"]`);
      card.classList.add("contacted");
      card.querySelector(".entity-status").textContent = "✓";
      card.querySelector(".contact-button").textContent = "Contactado ✓";
      card.querySelector(".contact-button").disabled = true;

      this.updateProgress();

      // Check completion
      if (this.puzzle2.entitiesContacted.length >= 3) {
        this.puzzle2.completed = true;
        document.getElementById("btn-continue-timeline").style.display =
          "block";

        if (typeof showToast === "function") {
          showToast(
            "🤝 Articulação com entidades concluída! Todas as entidades essenciais contactadas.",
            "success"
          );
        }
      }
    }
  }

  // ===== PUZZLE 3: ENHANCED TIMELINE BUILDER =====

  initializeTimelineBuilder() {
    const poolContainer = document.getElementById("activities-pool");
    const timelineContainer = document.getElementById("timeline-container");

    if (!poolContainer || !timelineContainer) return;

    // Create enhanced activities pool
    poolContainer.innerHTML = "";
    ENHANCED_TIMELINE_DATA.forEach((activity) => {
      const item = document.createElement("div");
      item.className = "activity-item enhanced";
      item.draggable = true;
      item.dataset.activityId = activity.id;
      item.dataset.correctMonth = activity.mes;
      item.title = `Mês ${activity.mes} - ${activity.entidade} - ${activity.pontos} pontos`;

      item.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px;">${activity.nome}</div>
        <div style="font-size: 0.8rem; opacity: 0.8;">
          ${activity.entidade} | ${activity.duracao_semanas}sem | ${activity.pontos}pts
        </div>
      `;

      item.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", activity.id);
        item.classList.add("dragging");
      };

      item.ondragend = () => {
        item.classList.remove("dragging");
      };

      poolContainer.appendChild(item);
    });

    // Create enhanced timeline
    timelineContainer.innerHTML = "";
    const months = [
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
    ];

    for (let mes = 1; mes <= 7; mes++) {
      const monthDiv = document.createElement("div");
      monthDiv.className = "timeline-month enhanced";
      monthDiv.innerHTML = `
        <h4>Mês ${mes} - ${months[mes - 1]} 2025</h4>
        <div class="timeline-activities enhanced" 
             data-month="${mes}" 
             ondrop="dropActivityEnhanced(event)" 
             ondragover="allowDrop(event)"
             ondragleave="removeDragover(event)">
          <div class="drop-zone-hint">Arraste as atividades do mês ${mes} para aqui</div>
        </div>
      `;
      timelineContainer.appendChild(monthDiv);
    }
  }

  dropActivityEnhanced(event, month, activityId) {
    event.preventDefault();
    const droppedActivityId =
      activityId || event.dataTransfer.getData("text/plain");
    const targetMonth = month || parseInt(event.currentTarget.dataset.month);
    const activity = ENHANCED_TIMELINE_DATA.find(
      (a) => a.id === droppedActivityId
    );

    if (!activity) return;

    // Check if correct month
    const isCorrectMonth = activity.mes === targetMonth;

    // Check prerequisites
    const prerequisitesMet = activity.prerequisitos.every((prereq) =>
      Object.keys(this.puzzle3.activitiesPlaced).includes(prereq)
    );

    if (isCorrectMonth && prerequisitesMet) {
      // Valid placement
      const activityElement = document.querySelector(
        `[data-activity-id="${droppedActivityId}"]`
      );
      activityElement.classList.add("placed");
      event.currentTarget.appendChild(activityElement);

      // Remove drop hint
      const hint = event.currentTarget.querySelector(".drop-zone-hint");
      if (hint) hint.style.display = "none";

      this.puzzle3.activitiesPlaced[droppedActivityId] = targetMonth;
      this.puzzle3.score += activity.pontos;

      this.updateProgress();
      this.checkPuzzle3Completion();

      if (typeof showToast === "function") {
        showToast(
          `✅ ${activity.nome} colocada corretamente!`,
          "success",
          2000
        );
      }
    } else {
      // Invalid placement
      let errorMsg = "";
      if (!isCorrectMonth) {
        errorMsg = `❌ Atividade do mês ${activity.mes}, não do mês ${targetMonth}`;
      } else if (!prerequisitesMet) {
        errorMsg = `❌ Pré-requisitos não cumpridos: ${activity.prerequisitos.join(
          ", "
        )}`;
      }

      if (typeof showToast === "function") {
        showToast(errorMsg, "error", 3000);
      }
    }

    event.currentTarget.classList.remove("droppable");
  }

  checkPuzzle3Completion() {
    const activitiesPlaced = Object.keys(this.puzzle3.activitiesPlaced).length;

    // Check if 8+ activities placed (80% completion)
    if (activitiesPlaced >= 8) {
      this.puzzle3.completed = true;
      document.getElementById("btn-continue-validation").style.display =
        "block";

      if (typeof showToast === "function") {
        showToast(
          "📅 Cronograma concluído! Sequência lógica respeitada.",
          "success"
        );
      }
    }
  }

  // ===== SHARED FUNCTIONS =====

  updateProgress() {
    // Sync with main game state if it exists
    if (typeof gameState !== "undefined") {
      gameState.puzzle1Score = this.puzzle1.score;
      gameState.puzzle2Score = this.puzzle2.score;
      gameState.puzzle3Score = this.puzzle3.score;
      gameState.puzzle4Score = this.puzzle4.score;

      // Call main updateProgress function
      if (typeof updateProgress === "function") {
        updateProgress();
        return;
      }
    }

    // Update total score (max 100)
    const totalScore = Math.min(
      this.puzzle1.score +
        this.puzzle2.score +
        this.puzzle3.score +
        this.puzzle4.score,
      100
    );
    this.score = totalScore;

    if (document.getElementById("total-score")) {
      document.getElementById("total-score").textContent = this.score;
    }

    // Update progress bars
    if (document.getElementById("progress-programs")) {
      const programsProgress = (this.puzzle1.programsSelected.length / 6) * 100;
      document.getElementById("progress-programs").style.width = `${Math.min(
        programsProgress,
        100
      )}%`;
      document.getElementById(
        "programs-selected"
      ).textContent = `${this.puzzle1.programsSelected.length}`;
    }

    if (document.getElementById("progress-entities")) {
      const entitiesProgress =
        (this.puzzle2.entitiesContacted.length / 3) * 100;
      document.getElementById(
        "progress-entities"
      ).style.width = `${entitiesProgress}%`;
      document.getElementById("entities-contacted").textContent =
        this.puzzle2.entitiesContacted.length;
    }

    if (document.getElementById("progress-timeline")) {
      const activitiesProgress =
        (Object.keys(this.puzzle3.activitiesPlaced).length / 10) * 100;
      document.getElementById(
        "progress-timeline"
      ).style.width = `${activitiesProgress}%`;
      document.getElementById("activities-placed").textContent = Object.keys(
        this.puzzle3.activitiesPlaced
      ).length;
    }

    // Update puzzle score displays
    const puzzleScores = document.querySelectorAll(".puzzle-score");
    if (puzzleScores[0])
      puzzleScores[0].textContent = `${Math.max(
        0,
        this.puzzle1.score
      )}/25 pontos`;
    if (puzzleScores[1])
      puzzleScores[1].textContent = `${Math.max(
        0,
        this.puzzle2.score
      )}/25 pontos`;
    if (puzzleScores[2])
      puzzleScores[2].textContent = `${Math.max(
        0,
        this.puzzle3.score
      )}/30 pontos`;
    if (puzzleScores[3])
      puzzleScores[3].textContent = `${Math.max(
        0,
        this.puzzle4.score
      )}/20 pontos`;
  }

  savePhase3Results() {
    const results = {
      phase: 3,
      score: Math.min(this.score, 100),
      maxScore: 100,
      percentage: Math.min(this.score, 100),
      duration: Math.round((Date.now() - this.startTime) / 60000) || 20,

      puzzle1: this.puzzle1,
      puzzle2: this.puzzle2,
      puzzle3: this.puzzle3,
      puzzle4: this.puzzle4,

      phase1Data: this.phase1Data,
      phase2Data: this.phase2Data,
      felisbinaContext: this.felisbinaContext,
    };

    localStorage.setItem("saasi_phase3_results", JSON.stringify(results));
    return results;
  }
}

// =====================================================
// GLOBAL FUNCTIONS FOR INTEGRATION
// =====================================================

// Global instance
let phase3EngineEnhanced = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  phase3EngineEnhanced = new Phase3Engine();
  phase3EngineEnhanced.startTime = Date.now();
});

// Global functions for HTML integration
window.selectProgram = (programId) => {
  if (phase3EngineEnhanced) {
    phase3EngineEnhanced.selectProgram(programId);
  }
};

window.rejectProgram = (programId) => {
  if (phase3EngineEnhanced) {
    phase3EngineEnhanced.rejectProgram(programId);
  }
};

window.contactEntityEnhanced = (entityId) => {
  if (phase3EngineEnhanced) {
    phase3EngineEnhanced.contactEntityEnhanced(entityId);
  }
};

window.dropActivityEnhanced = (event) => {
  if (phase3EngineEnhanced) {
    phase3EngineEnhanced.dropActivityEnhanced(event);
  }
};

window.allowDrop = (event) => {
  event.preventDefault();
  event.currentTarget.classList.add("droppable");
};

window.removeDragover = (event) => {
  event.currentTarget.classList.remove("droppable");
};

console.log("Phase 3 Enhanced Engine loaded successfully");
