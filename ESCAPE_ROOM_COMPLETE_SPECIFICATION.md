# SAASI ESCAPE ROOM - COMPLETE SPECIFICATION
## Adaptation of All Normal Mode Puzzles to Escape Room Mode

**Based on Analysis of Existing Phases 1-4**  
**Following the Pattern Established in `fase1-escape.html`**

---

## 🎯 OVERVIEW

This specification details how to adapt **ALL existing puzzles** from the normal mode phases (1-4) into escape room mode, following the exact same pattern and structure established in the existing `fase1-escape.html`.

### Key Principles:
1. **Maintain Core Learning Objectives** - All educational content preserved
2. **Add Gamification Elements** - Timer, scoring, achievements, progressive unlocking
3. **Enhance Interactivity** - Drag & drop, real-time feedback, visual effects
4. **Preserve Assessment Logic** - Same evaluation criteria and scoring systems
5. **Mobile-First Design** - Touch-friendly interface with responsive design

---

## 📋 PHASE 1 - ESCAPE ROOM ADAPTATION

### Current Status: ✅ COMPLETED
**File:** `fase1-escape.html`

#### Existing Puzzles (Already Implemented):
1. **Dialogue System** - Interactive conversation with Felisbina
2. **Risk/Protection Analysis** - Drag & drop categorization
3. **Document Verification** - Interactive document collection
4. **DLD Assessment** - Decision-making with validation

#### Pattern Established:
- **Toast notification system** for real-time feedback
- **Progress tracking** with visual indicators
- **State management** with smooth transitions
- **Mobile touch support** with fallback to drag & drop
- **Scoring system** with weighted responses
- **Assessment validation** with educational feedback

---

## 📋 PHASE 2 - ESCAPE ROOM ADAPTATION SPECIFICATION

### Target File: `fase2-escape.html`

#### PUZZLE 1: Problem Mapping & Prioritization
**Normal Mode:** Static problem list with basic categorization  
**Escape Mode Enhancement:**

```html
<!-- Interactive Problem Cards with Drag & Drop -->
<div class="problem-mapping-arena">
  <div class="problems-pool">
    <div class="problem-card draggable" data-problem-id="dependencia_emocional">
      <div class="problem-header">
        <h4>🧠 Dependência emocional do pai</h4>
        <span class="urgency-indicator high">ALTA</span>
      </div>
      <p class="problem-description">Impede autonomia e tomada de decisões independentes</p>
      <div class="problem-metrics">
        <span class="impact-score">Impacto: 8/10</span>
        <span class="complexity-score">Complexidade: 7/10</span>
      </div>
    </div>
  </div>
  
  <div class="priority-zones">
    <div class="priority-zone" data-priority="1">
      <h3>🔴 Prioridade CRÍTICA</h3>
      <p>Problemas que impedem qualquer progresso</p>
    </div>
    <div class="priority-zone" data-priority="2">
      <h3>🟡 Prioridade ALTA</h3>
      <p>Problemas que limitam significativamente</p>
    </div>
    <div class="priority-zone" data-priority="3">
      <h3>🟢 Prioridade MÉDIA</h3>
      <p>Problemas importantes mas não bloqueadores</p>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Timer:** 8 minutes to categorize all 6 problems
- **Scoring:** +10 points for correct priority, -3 for incorrect
- **Visual Feedback:** Cards glow when correctly placed, shake when wrong
- **Progressive Hints:** After 3 mistakes, show category suggestions

#### PUZZLE 2: Benefits Analysis & Optimization
**Normal Mode:** Checkbox selection with basic calculation  
**Escape Mode Enhancement:**

```html
<!-- Interactive Benefits Calculator -->
<div class="benefits-optimization-lab">
  <div class="current-situation-dashboard">
    <div class="financial-meter">
      <div class="income-bar">
        <span class="label">Rendimentos</span>
        <div class="bar-fill" style="width: 60%">566,78€</div>
      </div>
      <div class="expenses-bar">
        <span class="label">Despesas</span>
        <div class="bar-fill" style="width: 48%">450€</div>
      </div>
      <div class="balance-indicator positive">+116,78€</div>
    </div>
  </div>
  
  <div class="benefits-selection-area">
    <div class="benefit-card selectable" data-benefit="apoio_alimentar">
      <div class="benefit-icon">🍽️</div>
      <h4>Apoio Alimentar de Emergência</h4>
      <div class="benefit-value">+50€/mês × 6 meses</div>
      <div class="eligibility-check">
        <span class="requirement met">✓ RSI ativo</span>
        <span class="requirement met">✓ Situação vulnerável</span>
      </div>
    </div>
  </div>
  
  <div class="optimization-results">
    <div class="scenario-comparison">
      <div class="scenario current">
        <h4>Cenário Atual</h4>
        <div class="balance">+116,78€/mês</div>
      </div>
      <div class="scenario optimized">
        <h4>Cenário Otimizado</h4>
        <div class="balance improvement">+XXX€/mês</div>
        <div class="improvement-indicator">+XX€ melhoria</div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Real-time Calculation:** Values update as benefits are selected
- **Efficiency Score:** Bonus points for optimal benefit combinations
- **Budget Constraints:** Cannot exceed available funding limits
- **Impact Visualization:** Animated charts showing improvement

#### PUZZLE 3: Entity Articulation Network
**Normal Mode:** Simple contact buttons  
**Escape Mode Enhancement:**

```html
<!-- Interactive Entity Network Map -->
<div class="entity-network-map">
  <div class="network-canvas">
    <div class="entity-node" data-entity="iefp" style="top: 20%; left: 30%">
      <div class="entity-avatar">
        <img src="icons/iefp-logo.png" alt="IEFP">
      </div>
      <div class="entity-info">
        <h4>IEFP Porto</h4>
        <div class="specialties">
          <span class="specialty">Qualifica</span>
          <span class="specialty">Formação</span>
        </div>
        <div class="availability-status available">Disponível</div>
      </div>
      <div class="connection-ports">
        <div class="port" data-connects-to="centro_saude"></div>
        <div class="port" data-connects-to="ipss"></div>
      </div>
    </div>
    
    <div class="connection-line" data-from="iefp" data-to="centro_saude">
      <div class="connection-label">Coordenação Psicossocial</div>
    </div>
  </div>
  
  <div class="coordination-panel">
    <h3>Plano de Coordenação</h3>
    <div class="coordination-timeline">
      <div class="timeline-step" data-week="1">
        <span class="week-label">Semana 1</span>
        <div class="actions-list">
          <!-- Actions will be populated based on connections -->
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Network Building:** Drag connections between compatible entities
- **Coordination Score:** Points for logical entity combinations
- **Timeline Validation:** Ensure realistic scheduling
- **Efficiency Bonus:** Extra points for minimal but effective networks

#### PUZZLE 4: Intervention Timeline Builder
**Normal Mode:** Linear scheduling interface  
**Escape Mode Enhancement:**

```html
<!-- Interactive Timeline Construction -->
<div class="timeline-builder-workspace">
  <div class="interventions-library">
    <h3>📚 Intervenções Disponíveis</h3>
    <div class="intervention-cards">
      <div class="intervention-card" data-intervention="psicologia_inicial" draggable="true">
        <div class="intervention-header">
          <span class="intervention-icon">🧠</span>
          <h4>Consulta Psicologia Inicial</h4>
        </div>
        <div class="intervention-details">
          <div class="duration">Duração: 1 sessão</div>
          <div class="prerequisites">Pré-requisitos: Nenhum</div>
          <div class="optimal-timing">Ideal: Semanas 1-2</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="timeline-canvas">
    <div class="timeline-header">
      <h3>📅 Cronograma de 7 Meses</h3>
      <div class="timeline-controls">
        <button class="btn-validate-timeline">Validar Sequência</button>
        <button class="btn-optimize-timeline">Otimizar Automaticamente</button>
      </div>
    </div>
    
    <div class="timeline-grid">
      <div class="month-column" data-month="1">
        <div class="month-header">
          <h4>Mês 1 - Fevereiro</h4>
          <div class="capacity-indicator">
            <span class="capacity-used">0</span>/<span class="capacity-max">4</span> atividades
          </div>
        </div>
        <div class="month-slots">
          <div class="time-slot" data-week="1"></div>
          <div class="time-slot" data-week="2"></div>
          <div class="time-slot" data-week="3"></div>
          <div class="time-slot" data-week="4"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="timeline-validation-panel">
    <h3>✅ Validação do Cronograma</h3>
    <div class="validation-results">
      <div class="validation-item" data-check="prerequisites">
        <span class="check-icon">⏳</span>
        <span class="check-label">Pré-requisitos respeitados</span>
        <span class="check-status pending">Pendente</span>
      </div>
      <div class="validation-item" data-check="capacity">
        <span class="check-icon">📊</span>
        <span class="check-label">Capacidade das entidades</span>
        <span class="check-status pending">Pendente</span>
      </div>
      <div class="validation-item" data-check="sequencing">
        <span class="check-icon">🔄</span>
        <span class="check-label">Sequenciamento lógico</span>
        <span class="check-status pending">Pendente</span>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Dependency Validation:** Interventions light up when prerequisites are met
- **Capacity Management:** Visual indicators when entities are overloaded
- **Optimization Challenge:** Bonus points for efficient timeline
- **Real-time Validation:** Immediate feedback on timeline logic

---

## 📋 PHASE 3 - ESCAPE ROOM ADAPTATION SPECIFICATION

### Target File: `fase3-escape.html`

#### PUZZLE 1: Enhanced Program Selection Matrix
**Normal Mode:** Basic program cards with selection  
**Escape Mode Enhancement:**

```html
<!-- Advanced Program Selection Interface -->
<div class="program-selection-matrix">
  <div class="felisbina-profile-panel">
    <h3>👤 Perfil da Felisbina</h3>
    <div class="profile-attributes">
      <div class="attribute" data-attr="idade">
        <span class="attr-label">Idade</span>
        <span class="attr-value">56 anos</span>
        <div class="compatibility-indicator">⚠️ Fator limitante</div>
      </div>
      <div class="attribute" data-attr="escolaridade">
        <span class="attr-label">Escolaridade</span>
        <span class="attr-value">9º ano</span>
        <div class="compatibility-indicator">✅ Adequado</div>
      </div>
      <div class="attribute" data-attr="experiencia">
        <span class="attr-label">Experiência</span>
        <span class="attr-value">6 meses limpeza</span>
        <div class="compatibility-indicator">✅ Vantagem</div>
      </div>
    </div>
  </div>
  
  <div class="programs-evaluation-grid">
    <div class="program-card advanced" data-program="qualifica">
      <div class="program-header">
        <div class="program-icon">💼</div>
        <h4>Programa Qualifica</h4>
        <div class="adequacy-meter">
          <div class="meter-fill" style="width: 85%"></div>
          <span class="meter-label">85% adequado</span>
        </div>
      </div>
      
      <div class="compatibility-analysis">
        <div class="requirement met">
          <span class="req-icon">✅</span>
          <span class="req-text">9º ano completo</span>
        </div>
        <div class="requirement met">
          <span class="req-icon">✅</span>
          <span class="req-text">Experiência profissional</span>
        </div>
        <div class="requirement warning">
          <span class="req-icon">⚠️</span>
          <span class="req-text">Idade próxima do limite</span>
        </div>
      </div>
      
      <div class="program-impact-preview">
        <h5>Impacto Esperado:</h5>
        <div class="impact-metrics">
          <div class="metric">
            <span class="metric-label">Empregabilidade</span>
            <div class="metric-bar">
              <div class="bar-fill" style="width: 70%">+70%</div>
            </div>
          </div>
          <div class="metric">
            <span class="metric-label">Qualificação</span>
            <div class="metric-bar">
              <div class="bar-fill" style="width: 90%">+90%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="selection-controls">
        <button class="btn-select-program" onclick="selectProgram('qualifica', true)">
          ✅ Selecionar
        </button>
        <button class="btn-reject-program" onclick="selectProgram('qualifica', false)">
          ❌ Rejeitar
        </button>
      </div>
    </div>
  </div>
  
  <div class="selection-summary">
    <h3>📊 Resumo da Seleção</h3>
    <div class="selected-programs-list">
      <!-- Dynamically populated -->
    </div>
    <div class="selection-metrics">
      <div class="metric">
        <span class="label">Adequação Média</span>
        <span class="value" id="avg-adequacy">0%</span>
      </div>
      <div class="metric">
        <span class="label">Cobertura de Problemas</span>
        <span class="value" id="problem-coverage">0%</span>
      </div>
      <div class="metric">
        <span class="label">Viabilidade Orçamental</span>
        <span class="value" id="budget-viability">0%</span>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Compatibility Scoring:** Real-time adequacy calculation
- **Impact Simulation:** Preview expected outcomes
- **Selection Validation:** Immediate feedback on choices
- **Optimization Challenge:** Achieve maximum coverage with minimum programs

#### PUZZLE 2: Dynamic Entity Coordination Hub
**Normal Mode:** Static entity list  
**Escape Mode Enhancement:**

```html
<!-- Interactive Entity Coordination Hub -->
<div class="entity-coordination-hub">
  <div class="coordination-dashboard">
    <h3>🤝 Central de Coordenação</h3>
    <div class="coordination-metrics">
      <div class="metric">
        <span class="label">Entidades Ativas</span>
        <span class="value" id="active-entities">0/6</span>
      </div>
      <div class="metric">
        <span class="label">Coordenação</span>
        <span class="value" id="coordination-score">0%</span>
      </div>
      <div class="metric">
        <span class="label">Tempo Resposta</span>
        <span class="value" id="avg-response-time">-- dias</span>
      </div>
    </div>
  </div>
  
  <div class="entity-network-visualization">
    <div class="network-center">
      <div class="felisbina-node">
        <div class="node-avatar">👤</div>
        <span class="node-label">Felisbina</span>
      </div>
    </div>
    
    <div class="entity-nodes">
      <div class="entity-node" data-entity="iefp" style="--angle: 0deg">
        <div class="node-content">
          <div class="entity-avatar">🏢</div>
          <h4>IEFP Porto</h4>
          <div class="entity-status offline">Offline</div>
          <div class="services-list">
            <span class="service">Qualifica</span>
            <span class="service">Formação</span>
          </div>
          <button class="btn-contact-entity" onclick="contactEntity('iefp')">
            📞 Contactar
          </button>
        </div>
        <div class="connection-line" data-status="inactive"></div>
      </div>
      
      <div class="entity-node" data-entity="centro_saude" style="--angle: 60deg">
        <div class="node-content">
          <div class="entity-avatar">🏥</div>
          <h4>Centro de Saúde</h4>
          <div class="entity-status offline">Offline</div>
          <div class="services-list">
            <span class="service">Psicologia</span>
            <span class="service">Psiquiatria</span>
          </div>
          <button class="btn-contact-entity" onclick="contactEntity('centro_saude')">
            📞 Contactar
          </button>
        </div>
        <div class="connection-line" data-status="inactive"></div>
      </div>
    </div>
  </div>
  
  <div class="coordination-timeline">
    <h3>📅 Cronograma de Coordenação</h3>
    <div class="timeline-visualization">
      <div class="timeline-track" data-entity="iefp">
        <div class="track-header">
          <span class="entity-name">IEFP</span>
          <span class="track-status">Aguardando contacto</span>
        </div>
        <div class="timeline-events">
          <!-- Events will be populated dynamically -->
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Network Visualization:** Animated connections between entities
- **Response Simulation:** Realistic delays and responses
- **Coordination Scoring:** Points for efficient communication
- **Timeline Management:** Visual scheduling of entity interactions

#### PUZZLE 3: Advanced Timeline Orchestrator
**Normal Mode:** Simple drag and drop timeline  
**Escape Mode Enhancement:**

```html
<!-- Advanced Timeline Orchestration Interface -->
<div class="timeline-orchestrator">
  <div class="orchestration-controls">
    <h3>🎼 Orquestração de Intervenções</h3>
    <div class="timeline-tools">
      <button class="tool-btn" data-tool="auto-sequence">
        🤖 Sequenciamento Automático
      </button>
      <button class="tool-btn" data-tool="conflict-detector">
        ⚠️ Detector de Conflitos
      </button>
      <button class="tool-btn" data-tool="optimization">
        ⚡ Otimização Inteligente
      </button>
    </div>
  </div>
  
  <div class="timeline-workspace">
    <div class="activities-palette">
      <h4>🎯 Atividades Disponíveis</h4>
      <div class="activity-categories">
        <div class="category" data-category="psicossocial">
          <h5>🧠 Apoio Psicossocial</h5>
          <div class="activities-list">
            <div class="activity-item" data-activity="psicologia_inicial" draggable="true">
              <div class="activity-icon">🩺</div>
              <div class="activity-info">
                <h6>Consulta Psicologia Inicial</h6>
                <div class="activity-metadata">
                  <span class="duration">1h</span>
                  <span class="frequency">Única</span>
                  <span class="priority high">Alta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="timeline-canvas-advanced">
      <div class="timeline-header">
        <div class="month-labels">
          <div class="month-label" data-month="1">
            <span class="month-name">Fevereiro</span>
            <div class="month-capacity">
              <span class="used">0</span>/<span class="max">20</span>h
            </div>
          </div>
        </div>
      </div>
      
      <div class="timeline-grid-advanced">
        <div class="timeline-row" data-entity="centro_saude">
          <div class="row-header">
            <div class="entity-info">
              <span class="entity-name">Centro de Saúde</span>
              <div class="availability-indicator">
                <span class="available-slots">12</span> slots livres
              </div>
            </div>
          </div>
          <div class="timeline-slots">
            <div class="time-slot" data-week="1" data-day="monday">
              <!-- Activities will be dropped here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="timeline-analysis">
    <h3>📊 Análise do Cronograma</h3>
    <div class="analysis-panels">
      <div class="panel" data-panel="conflicts">
        <h4>⚠️ Conflitos Detectados</h4>
        <div class="conflicts-list">
          <!-- Conflicts will be populated dynamically -->
        </div>
      </div>
      <div class="panel" data-panel="optimization">
        <h4>⚡ Sugestões de Otimização</h4>
        <div class="optimization-suggestions">
          <!-- Suggestions will be populated dynamically -->
        </div>
      </div>
      <div class="panel" data-panel="metrics">
        <h4>📈 Métricas de Eficiência</h4>
        <div class="efficiency-metrics">
          <div class="metric">
            <span class="label">Utilização de Recursos</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <span class="value">0%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Conflict Detection:** Real-time validation of scheduling conflicts
- **Resource Optimization:** Visual feedback on resource utilization
- **Efficiency Scoring:** Points for optimal timeline construction
- **Auto-suggestions:** AI-powered optimization hints

#### PUZZLE 4: Comprehensive Validation & Approval System
**Normal Mode:** Simple checkboxes  
**Escape Mode Enhancement:**

```html
<!-- Advanced Validation & Approval Interface -->
<div class="validation-approval-system">
  <div class="validation-dashboard">
    <h3>✅ Central de Validação</h3>
    <div class="validation-progress">
      <div class="progress-ring">
        <svg class="progress-ring-svg" width="120" height="120">
          <circle class="progress-ring-circle-bg" cx="60" cy="60" r="50"></circle>
          <circle class="progress-ring-circle" cx="60" cy="60" r="50"></circle>
        </svg>
        <div class="progress-text">
          <span class="percentage">0%</span>
          <span class="label">Validado</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="validation-stages">
    <div class="stage" data-stage="coherence">
      <div class="stage-header">
        <div class="stage-icon">🔍</div>
        <h4>Validação de Coerência</h4>
        <div class="stage-status pending">Pendente</div>
      </div>
      
      <div class="validation-checklist">
        <div class="checklist-item" data-check="objectives">
          <div class="check-content">
            <div class="check-icon">📋</div>
            <div class="check-info">
              <h5>Objetivos Claros e Específicos</h5>
              <p>Verificar se todos os objetivos são SMART (Específicos, Mensuráveis, Atingíveis, Relevantes, Temporais)</p>
            </div>
            <div class="check-controls">
              <button class="btn-validate" onclick="validateObjectives()">
                Validar Objetivos
              </button>
            </div>
          </div>
          <div class="validation-result">
            <!-- Results will be populated after validation -->
          </div>
        </div>
      </div>
    </div>
    
    <div class="stage" data-stage="approvals">
      <div class="stage-header">
        <div class="stage-icon">📋</div>
        <h4>Aprovações das Entidades</h4>
        <div class="stage-status pending">Pendente</div>
      </div>
      
      <div class="approvals-grid">
        <div class="approval-card" data-entity="iefp">
          <div class="entity-header">
            <div class="entity-logo">🏢</div>
            <h5>IEFP Porto</h5>
            <div class="approval-status pending">Aguardando</div>
          </div>
          
          <div class="approval-details">
            <div class="programs-list">
              <div class="program-item">
                <span class="program-name">Programa Qualifica</span>
                <span class="program-status">Pré-aprovado</span>
              </div>
            </div>
            
            <div class="approval-timeline">
              <div class="timeline-step completed">
                <span class="step-label">Pedido Enviado</span>
                <span class="step-time">Há 2 min</span>
              </div>
              <div class="timeline-step active">
                <span class="step-label">Em Análise</span>
                <span class="step-time">Estimado: 3-5 dias</span>
              </div>
              <div class="timeline-step pending">
                <span class="step-label">Aprovação Final</span>
                <span class="step-time">Pendente</span>
              </div>
            </div>
          </div>
          
          <div class="approval-actions">
            <button class="btn-request-approval" onclick="requestApproval('iefp')">
              📤 Solicitar Aprovação
            </button>
            <button class="btn-follow-up" onclick="followUpApproval('iefp')" disabled>
              📞 Fazer Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="stage" data-stage="consent">
      <div class="stage-header">
        <div class="stage-icon">👤</div>
        <h4>Consentimento da Felisbina</h4>
        <div class="stage-status pending">Pendente</div>
      </div>
      
      <div class="consent-interface">
        <div class="felisbina-avatar">
          <div class="avatar-image">👤</div>
          <div class="avatar-status">
            <span class="mood-indicator">😐</span>
            <span class="comprehension-level">Compreensão: 0%</span>
          </div>
        </div>
        
        <div class="consent-dialogue">
          <div class="dialogue-bubble">
            <p>"Preciso entender melhor o que vai acontecer..."</p>
          </div>
          
          <div class="explanation-tools">
            <button class="tool-btn" onclick="explainPrograms()">
              📚 Explicar Programas
            </button>
            <button class="tool-btn" onclick="showTimeline()">
              📅 Mostrar Cronograma
            </button>
            <button class="tool-btn" onclick="addressConcerns()">
              💭 Esclarecer Dúvidas
            </button>
          </div>
        </div>
        
        <div class="consent-checklist">
          <div class="consent-item" data-item="understanding">
            <div class="item-icon">🧠</div>
            <div class="item-content">
              <h5>Compreensão do Plano</h5>
              <p>Felisbina demonstra compreender os objetivos e etapas</p>
            </div>
            <div class="item-status">❌</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Progressive Validation:** Stages unlock as previous ones complete
- **Real-time Approval Simulation:** Realistic entity response times
- **Consent Building:** Interactive dialogue to build understanding
- **Completion Scoring:** Bonus points for thorough validation

---

## 📋 PHASE 4 - ESCAPE ROOM ADAPTATION SPECIFICATION

### Target File: `fase4-escape.html`

#### PUZZLE 1: Dynamic Progress Monitoring Dashboard
**Normal Mode:** Static progress indicators  
**Escape Mode Enhancement:**

```html
<!-- Real-time Progress Monitoring Interface -->
<div class="progress-monitoring-command-center">
  <div class="monitoring-dashboard">
    <h3>📊 Centro de Monitorização</h3>
    <div class="dashboard-metrics">
      <div class="metric-card" data-metric="overall-progress">
        <div class="metric-icon">📈</div>
        <div class="metric-content">
          <h4>Progresso Geral</h4>
          <div class="metric-value">67%</div>
          <div class="metric-trend positive">+12% este mês</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="programs-monitoring-grid">
    <div class="program-monitor" data-program="psicologia">
      <div class="monitor-header">
        <div class="program-icon">🧠</div>
        <h4>Consultas de Psicologia</h4>
        <div class="status-indicator active">Ativo</div>
      </div>
      
      <div class="progress-visualization">
        <div class="progress-chart">
          <canvas id="psicologia-progress-chart" width="200" height="100"></canvas>
        </div>
        <div class="progress-details">
          <div class="detail-item">
            <span class="label">Sessões Realizadas</span>
            <span class="value">8/12</span>
          </div>
          <div class="detail-item">
            <span class="label">Progresso Terapêutico</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 70%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="monitoring-alerts">
        <div class="alert positive">
          <span class="alert-icon">✅</span>
          <span class="alert-text">Progresso consistente nas últimas 4 sessões</span>
        </div>
      </div>
      
      <div class="monitoring-actions">
        <button class="action-btn" onclick="analyzeProgress('psicologia')">
          🔍 Analisar Progresso
        </button>
        <button class="action-btn" onclick="adjustIntervention('psicologia')">
          ⚙️ Ajustar Intervenção
        </button>
      </div>
    </div>
  </div>
  
  <div class="predictive-analytics">
    <h3>🔮 Análise Preditiva</h3>
    <div class="prediction-cards">
      <div class="prediction-card" data-prediction="employment-readiness">
        <div class="prediction-header">
          <h4>Prontidão para Emprego</h4>
          <div class="confidence-score">Confiança: 78%</div>
        </div>
        <div class="prediction-timeline">
          <div class="timeline-marker" data-month="4">
            <span class="marker-label">Mês 4</span>
            <span class="probability">65% pronto</span>
          </div>
          <div class="timeline-marker" data-month="6">
            <span class="marker-label">Mês 6</span>
            <span class="probability">85% pronto</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Real-time Data Visualization:** Animated charts and graphs
- **Predictive Analytics:** AI-powered outcome predictions
- **Alert System:** Proactive notifications for attention areas
- **Decision Points:** Interactive choices based on monitoring data

#### PUZZLE 2: Crisis Management Simulation Center
**Normal Mode:** Static crisis scenarios  
**Escape Mode Enhancement:**

```html
<!-- Advanced Crisis Management Interface -->
<div class="crisis-management-center">
  <div class="crisis-alert-system">
    <div class="alert-header">
      <div class="alert-icon pulsing">🚨</div>
      <h3>Sistema de Alertas de Crise</h3>
      <div class="alert-level high">NÍVEL ALTO</div>
    </div>
    
    <div class="active-crises">
      <div class="crisis-card urgent" data-crisis="habitacional">
        <div class="crisis-header">
          <div class="crisis-icon">🏠</div>
          <h4>Crise Habitacional</h4>
          <div class="urgency-timer">
            <span class="timer-label">Tempo para ação:</span>
            <span class="timer-value" id="crisis-timer">02:45:30</span>
          </div>
        </div>
        
        <div class="crisis-details">
          <p><strong>Situação:</strong> Felisbina foi despejada da pensão por atraso no pagamento</p>
          <p><strong>Impacto:</strong> Risco de interrupção de todos os programas</p>
          <p><strong>Recursos Disponíveis:</strong> Fundo de emergência social (300€)</p>
        </div>
        
        <div class="crisis-response-options">
          <div class="response-option" data-option="emergency-housing">
            <div class="option-header">
              <h5>🏨 Alojamento de Emergência</h5>
              <div class="success-probability">Sucesso: 85%</div>
            </div>
            <div class="option-details">
              <p><strong>Ação:</strong> Contactar serviços sociais para alojamento temporário</p>
              <p><strong>Tempo:</strong> 2-4 horas</p>
              <p><strong>Custo:</strong> 0€ (serviço público)</p>
              <p><strong>Consequências:</strong> Estabilização imediata, continuidade dos programas</p>
            </div>
            <div class="option-risks">
              <span class="risk low">Risco baixo</span>
              <span class="sustainability high">Sustentabilidade alta</span>
            </div>
          </div>
          
          <div class="response-option" data-option="family-mediation">
            <div class="option-header">
              <h5>👨‍👩‍👧‍👦 Mediação Familiar</h5>
              <div class="success-probability">Sucesso: 45%</div>
            </div>
            <div class="option-details">
              <p><strong>Ação:</strong> Tentar reconciliação com o irmão</p>
              <p><strong>Tempo:</strong> 1-2 dias</p>
              <p><strong>Custo:</strong> 0€</p>
              <p><strong>Consequências:</strong> Solução a longo prazo se bem-sucedida</p>
            </div>
            <div class="option-risks">
              <span class="risk high">Risco alto</span>
              <span class="sustainability medium">Sustentabilidade média</span>
            </div>
          </div>
        </div>
        
        <div class="crisis-decision-panel">
          <div class="decision-timer">
            <span class="timer-label">Decisão em:</span>
            <span class="decision-countdown">05:00</span>
          </div>
          <button class="btn-crisis-action primary" onclick="respondToCrisis('habitacional', 'emergency-housing')">
            🚀 Executar Ação
          </button>
          <button class="btn-crisis-consult" onclick="consultSpecialist('habitacional')">
            📞 Consultar Especialista
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="crisis-impact-simulator">
    <h3>📊 Simulador de Impacto</h3>
    <div class="impact-visualization">
      <div class="scenario-comparison">
        <div class="scenario current">
          <h4>Cenário Atual</h4>
          <div class="impact-metrics">
            <div class="metric">
              <span class="label">Continuidade Programas</span>
              <div class="risk-indicator high">Alto Risco</div>
            </div>
            <div class="metric">
              <span class="label">Bem-estar Emocional</span>
              <div class="risk-indicator critical">Crítico</div>
            </div>
          </div>
        </div>
        
        <div class="scenario projected">
          <h4>Após Intervenção</h4>
          <div class="impact-metrics">
            <div class="metric">
              <span class="label">Continuidade Programas</span>
              <div class="risk-indicator low">Baixo Risco</div>
            </div>
            <div class="metric">
              <span class="label">Bem-estar Emocional</span>
              <div class="risk-indicator medium">Estável</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Real-time Crisis Simulation:** Dynamic scenarios with countdown timers
- **Impact Prediction:** Visual simulation of intervention outcomes
- **Decision Pressure:** Time-limited choices with consequences
- **Specialist Consultation:** Option to seek expert advice (with point cost)

#### PUZZLE 3: Strategic Adaptation Laboratory
**Normal Mode:** Simple strategy selection  
**Escape Mode Enhancement:**

```html
<!-- Advanced Strategy Adaptation Interface -->
<div class="strategy-adaptation-lab">
  <div class="adaptation-dashboard">
    <h3>🧪 Laboratório de Adaptação Estratégica</h3>
    <div class="current-strategy-analysis">
      <div class="strategy-effectiveness-meter">
        <h4>Eficácia da Estratégia Atual</h4>
        <div class="effectiveness-gauge">
          <canvas id="effectiveness-gauge" width="200" height="100"></canvas>
          <div class="gauge-value">67%</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="strategy-testing-environment">
    <h3>🔬 Ambiente de Teste de Estratégias</h3>
    <div class="testing-scenarios">
      <div class="scenario-card" data-scenario="employment-opportunity">
        <div class="scenario-header">
          <div class="scenario-icon">💼</div>
          <h4>Oportunidade de Emprego Inesperada</h4>
          <div class="scenario-complexity">Complexidade: Alta</div>
        </div>
        
        <div class="scenario-description">
          <p><strong>Situação:</strong> Empresa de limpeza oferece emprego part-time (20h/semana)</p>
          <p><strong>Conflito:</strong> Coincide com horário do Programa Qualifica</p>
          <p><strong>Prazo:</strong> Resposta necessária em 48h</p>
        </div>
        
        <div class="strategy-options">
          <div class="strategy-option" data-strategy="accept-employment">
            <div class="option-header">
              <h5>✅ Aceitar Emprego</h5>
              <div class="impact-preview">
                <span class="positive">+Rendimento imediato</span>
                <span class="negative">-Interrupção formação</span>
              </div>
            </div>
            
            <div class="strategy-simulation">
              <h6>Simulação de Resultados:</h6>
              <div class="simulation-metrics">
                <div class="metric">
                  <span class="label">Rendimento Mensal</span>
                  <span class="value increase">+400€</span>
                </div>
                <div class="metric">
                  <span class="label">Qualificação</span>
                  <span class="value decrease">-6 meses atraso</span>
                </div>
                <div class="metric">
                  <span class="label">Autonomia</span>
                  <span class="value increase">+25%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="strategy-option" data-strategy="negotiate-hybrid">
            <div class="option-header">
              <h5>🤝 Negociar Modelo Híbrido</h5>
              <div class="impact-preview">
                <span class="positive">+Equilibrio formação/trabalho</span>
                <span class="neutral">±Requer coordenação</span>
              </div>
            </div>
            
            <div class="strategy-simulation">
              <h6>Simulação de Resultados:</h6>
              <div class="simulation-metrics">
                <div class="metric">
                  <span class="label">Rendimento Mensal</span>
                  <span class="value increase">+200€</span>
                </div>
                <div class="metric">
                  <span class="label">Qualificação</span>
                  <span class="value maintain">Mantém cronograma</span>
                </div>
                <div class="metric">
                  <span class="label">Stress</span>
                  <span class="value increase">+Coordenação complexa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="strategy-testing-controls">
          <button class="btn-test-strategy" onclick="testStrategy('employment-opportunity', 'negotiate-hybrid')">
            🧪 Testar Estratégia
          </button>
          <button class="btn-run-simulation" onclick="runFullSimulation('employment-opportunity')">
            🎮 Simulação Completa
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div class="adaptation-results">
    <h3>📊 Resultados da Adaptação</h3>
    <div class="results-visualization">
      <div class="before-after-comparison">
        <div class="comparison-chart">
          <canvas id="adaptation-results-chart" width="400" height="200"></canvas>
        </div>
        <div class="key-insights">
          <div class="insight positive">
            <span class="insight-icon">✅</span>
            <span class="insight-text">Modelo híbrido aumenta satisfação em 35%</span>
          </div>
          <div class="insight warning">
            <span class="insight-icon">⚠️</span>
            <span class="insight-text">Requer coordenação adicional com 3 entidades</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Strategy Testing:** Virtual simulation of different approaches
- **Impact Visualization:** Real-time charts showing strategy effects
- **Scenario Complexity:** Multi-layered challenges requiring creative solutions
- **Optimization Scoring:** Points for finding optimal balance between competing priorities

#### PUZZLE 4: Autonomy Transition Orchestrator
**Normal Mode:** Simple autonomy planning  
**Escape Mode Enhancement:**

```html
<!-- Advanced Autonomy Transition Interface -->
<div class="autonomy-transition-orchestrator">
  <div class="transition-dashboard">
    <h3>🌟 Orquestrador de Transição para Autonomia</h3>
    <div class="autonomy-readiness-assessment">
      <div class="readiness-radar">
        <canvas id="autonomy-radar-chart" width="300" height="300"></canvas>
        <div class="radar-legend">
          <div class="legend-item">
            <span class="color-indicator" style="background: #4caf50"></span>
            <span class="label">Competências Profissionais</span>
            <span class="value">85%</span>
          </div>
          <div class="legend-item">
            <span class="color-indicator" style="background: #ff9800"></span>
            <span class="label">Autonomia Emocional</span>
            <span class="value">65%</span>
          </div>
          <div class="legend-item">
            <span class="color-indicator" style="background: #2196f3"></span>
            <span class="label">Gestão Financeira</span>
            <span class="value">70%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="transition-planning-workspace">
    <h3>📋 Planeamento da Transição</h3>
    <div class="transition-phases">
      <div class="phase-card" data-phase="preparation">
        <div class="phase-header">
          <div class="phase-icon">🎯</div>
          <h4>Fase 1: Preparação (Meses 1-2)</h4>
          <div class="phase-status">Em Planeamento</div>
        </div>
        
        <div class="phase-objectives">
          <h5>Objetivos desta Fase:</h5>
          <div class="objectives-list">
            <div class="objective-item" data-objective="skills-assessment">
              <div class="objective-content">
                <span class="objective-text">Avaliação completa de competências</span>
                <div class="objective-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                  </div>
                </div>
              </div>
              <button class="btn-plan-objective" onclick="planObjective('skills-assessment')">
                📋 Planear
              </button>
            </div>
          </div>
        </div>
        
        <div class="phase-milestones">
          <h5>Marcos Principais:</h5>
          <div class="milestones-timeline">
            <div class="milestone" data-milestone="skills-portfolio">
              <div class="milestone-marker"></div>
              <div class="milestone-content">
                <h6>Portfolio de Competências</h6>
                <span class="milestone-date">Semana 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="support-reduction-planner">
    <h3>📉 Planeador de Redução de Apoio</h3>
    <div class="support-timeline">
      <div class="timeline-header">
        <h4>Cronograma de Redução Gradual</h4>
        <div class="timeline-controls">
          <button class="btn-auto-generate" onclick="autoGenerateReduction()">
            🤖 Gerar Automaticamente
          </button>
          <button class="btn-customize" onclick="customizeReduction()">
            ✏️ Personalizar
          </button>
        </div>
      </div>
      
      <div class="support-categories">
        <div class="support-category" data-category="psychological">
          <div class="category-header">
            <div class="category-icon">🧠</div>
            <h5>Apoio Psicológico</h5>
            <div class="current-intensity">Intensidade: Alta</div>
          </div>
          
          <div class="reduction-timeline">
            <div class="timeline-month" data-month="1">
              <div class="month-label">Mês 1</div>
              <div class="support-level high">
                <span class="level-indicator"></span>
                <span class="level-text">2x/semana</span>
              </div>
            </div>
            <div class="timeline-month" data-month="3">
              <div class="month-label">Mês 3</div>
              <div class="support-level medium">
                <span class="level-indicator"></span>
                <span class="level-text">1x/semana</span>
              </div>
            </div>
            <div class="timeline-month" data-month="6">
              <div class="month-label">Mês 6</div>
              <div class="support-level low">
                <span class="level-indicator"></span>
                <span class="level-text">1x/mês</span>
              </div>
            </div>
          </div>
          
          <div class="reduction-controls">
            <button class="btn-adjust-timeline" onclick="adjustReductionTimeline('psychological')">
              ⚙️ Ajustar Cronograma
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="maintenance-strategy-designer">
    <h3>🔧 Designer de Estratégias de Manutenção</h3>
    <div class="strategy-builder">
      <div class="strategy-components">
        <h4>Componentes da Estratégia:</h4>
        <div class="components-grid">
          <div class="component-card" data-component="peer-support">
            <div class="component-icon">👥</div>
            <h5>Rede de Apoio Entre Pares</h5>
            <div class="component-description">
              <p>Conectar com outros beneficiários que alcançaram autonomia</p>
            </div>
            <div class="component-effectiveness">
              <span class="label">Eficácia:</span>
              <div class="effectiveness-stars">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star">★</span>
              </div>
            </div>
            <button class="btn-add-component" onclick="addMaintenanceComponent('peer-support')">
              ➕ Adicionar
            </button>
          </div>
        </div>
      </div>
      
      <div class="strategy-preview">
        <h4>Pré-visualização da Estratégia:</h4>
        <div class="strategy-timeline-preview">
          <!-- Strategy components will be visualized here -->
        </div>
      </div>
    </div>
  </div>
</div>
```

**Gamification Elements:**
- **Autonomy Assessment:** Interactive radar charts showing readiness levels
- **Transition Simulation:** Preview outcomes of different transition strategies
- **Support Reduction Planning:** Visual timeline for gradual support withdrawal
- **Maintenance Strategy Building:** Modular approach to long-term sustainability

---

## 🎮 TECHNICAL IMPLEMENTATION GUIDELINES

### 1. **File Structure**
```
public/
├── fase1-escape.html (✅ Already exists)
├── fase2-escape.html (📝 To be created)
├── fase3-escape.html (📝 To be created)
├── fase4-escape.html (📝 To be created)
└── js/
    ├── escape-room-engine.js (📝 Shared engine)
    ├── fase2-escape-engine.js (📝 Phase 2 specific)
    ├── fase3-escape-engine.js (📝 Phase 3 specific)
    └── fase4-escape-engine.js (📝 Phase 4 specific)
```

### 2. **Shared Components Pattern**
Following `fase1-escape.html` pattern:

```javascript
// Shared Toast System
function showToast(message, type = "info", duration = 5000) {
  // Implementation from fase1-escape.html
}

// Shared State Management
function changeState(newState) {
  // Hide all states, show new state, trigger animations
}

// Shared Progress Tracking
function updateProgress() {
  // Update progress bars, scores, and metrics
}

// Shared Mobile Support
function toggleMobileMode() {
  // Switch between drag-drop and touch modes
}
```

### 3. **Scoring System Integration**
```javascript
// Use existing scoring-system.js
const gameState = {
  score: 0,
  phase: 2, // or 3, 4
  puzzleScores: {
    puzzle1: 0,
    puzzle2: 0,
    puzzle3: 0,
    puzzle4: 0
  }
};

function addScore(points) {
  gameState.score = Math.min(gameState.score + points, 100);
  updateScoreDisplay();
}
```

### 4. **Data Integration**
```javascript
// Reuse existing engine data
// From phase2-engine.js
const PROBLEM_MAPPING_DATA = { /* existing data */ };

// From phase3-engine.js  
const ENHANCED_PROGRAMS_DATA = [ /* existing data */ ];

// From phase4-engine.js
const progressManagementData = { /* existing data */ };
```

### 5. **Mobile Responsiveness**
```css
/* Follow fase1-escape.html responsive patterns */
@media (max-width: 768px) {
  .puzzle-area { padding: 20px; }
  .drag-item { min-height: 60px; }
  .btn { min-height: 48px; }
}

@media (hover: none) and (pointer: coarse) {
  /* Touch-friendly enhancements */
}
```

### 6. **Animation & Visual Effects**
```css
/* Consistent with fase1-escape.html */
.fade-in { animation: fadeIn 0.5s ease-in; }
.shake { animation: shake 0.5s ease-in-out; }
.pulse { animation: pulse 2s infinite; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 🏆 SUCCESS CRITERIA

### Phase 2 Escape Room:
- **Problem Mapping:** 6 problems correctly prioritized within 8 minutes
- **Benefits Optimization:** Achieve >20% financial improvement
- **Entity Coordination:** Connect 3+ entities with logical relationships
- **Timeline Validation:** Create conflict-free 7-month schedule

### Phase 3 Escape Room:
- **Program Selection:** 85%+ adequacy score with 4+ programs
- **Entity Network:** Establish 5+ entity connections
- **Timeline Orchestration:** Optimize resource utilization >80%
- **Validation Completion:** 100% validation across all stages

### Phase 4 Escape Room:
- **Progress Monitoring:** Identify and respond to 3+ monitoring alerts
- **Crisis Management:** Resolve 3 crisis scenarios within time limits
- **Strategy Adaptation:** Test and optimize 3+ strategic adjustments
- **Autonomy Planning:** Design complete transition plan with 90%+ readiness

---

## 🎯 LEARNING OBJECTIVES PRESERVED

Each escape room adaptation maintains the original educational goals:

1. **Assessment Skills** - Enhanced with interactive evaluation tools
2. **Decision Making** - Gamified with real-time consequences
3. **Coordination Abilities** - Visualized through network interfaces
4. **Crisis Management** - Simulated with realistic scenarios
5. **Strategic Thinking** - Developed through optimization challenges

---

## 📊 SCORING & PROGRESSION

### Scoring Model (Following fase1-escape.html):
- **Base Points:** Correct actions and decisions
- **Bonus Points:** Efficiency, speed, optimization
- **Penalty Points:** Incorrect choices, timeout
- **Achievement Unlocks:** Special accomplishments

### Progression Requirements:
- **Phase 2 → 3:** 60+ points (consistent with existing)
- **Phase 3 → 4:** 65+ points (consistent with existing)  
- **Phase 4 Complete:** 70+ points for full certification

### Unlock Codes:
- **Phase 2:** "PLANEAMENTO2025" (existing)
- **Phase 3:** "INTERVENCAO2025" (existing)
- **Phase 4:** "AUTONOMIA2025" (existing)

---

This specification provides a complete blueprint for adapting ALL existing normal mode puzzles into escape room format, following the exact pattern established in `fase1-escape.html` while preserving all educational content and assessment criteria.
