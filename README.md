# 🎯 SAASI Escape Room

**Sistema de Formação Interativa para Técnicos SAASI**

Uma experiência de formação imersiva que simula situações reais do atendimento e acompanhamento de desempregados de longa duração através de puzzles e desafios interativos.

## 📋 Visão Geral

O SAASI Escape Room é um jogo sério desenvolvido para formar técnicos do Serviço de Atendimento e Acompanhamento Social Integrado. O sistema guia os utilizadores através de três fases progressivas, cada uma focada numa etapa específica do processo DLD (Desemprego de Longa Duração).

### 🎮 Funcionalidades Principais

**🕐 Timeline Interativa** ✅
- Visualização completa do fluxo SAASI do início ao fim
- Mostra evolução da Felisbina através de todas as fases
- Decisões críticas e pontos de viragem
- Resultados esperados e outcomes de cada fase

**📱 Mobile-Responsive** ✅
- Sistema drag & drop adaptado para touch
- Modo toque para dispositivos móveis
- Interface otimizada para tablets e smartphones

### 🎮 Fases Disponíveis

1. **Fase 1 - Acolhimento e Avaliação Inicial** ✅
   - Primeira consulta com Felisbina Santos
   - Avaliação de disponibilidade e capacidade para trabalhar
   - Sistema de diálogo interativo baseado no caso real
   - Duração: 15-20 minutos

2. **Fase 2 - Identificação de Necessidades** ✅
   - Mapeamento e priorização de problemas específicos da Felisbina
   - Análise e otimização de benefícios sociais (RSI + PSI)
   - Articulação com entidades competentes
   - Duração: 15-20 minutos

3. **Fase 3 - Implementação e Acompanhamento** 🚧
   - Em desenvolvimento
   - Gestão de casos complexos e situações imprevistas
   - Duração estimada: 20-25 minutos

## 🚀 Como Executar

### Método 1: Servidor Local Simples
```bash
cd public
python3 -m http.server 8000
```
Depois aceda a: http://localhost:8000

### Método 2: Com Node.js
```bash
npm install
npm start
```

### Método 3: Firebase Hosting (Produção)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📁 Estrutura do Projeto

```
rita/
├── public/                     # Ficheiros estáticos para deployment
│   ├── index.html             # Portal principal de navegação
│   ├── fase1.html             # Fase 1 - Acolhimento
│   ├── fase2.html             # Fase 2 - Identificação de Necessidades
│   ├── css/
│   │   └── main.css           # Estilos principais
│   └── js/
│       └── shared.js          # Utilities partilhadas
├── package.json               # Configuração NPM
├── firebase.json              # Configuração Firebase
└── README.md                  # Este ficheiro
```

## 🎯 Objetivos Pedagógicos

### Fase 1
- **Empatia e Comunicação (33%)**: Estabelecer rapport com utentes
- **Recolha de Informação (33%)**: Identificar fatores relevantes
- **Avaliação DLD (34%)**: Aplicar critérios de elegibilidade

### Fase 2
- **Análise Sistemática (30%)**: Mapear e priorizar problemas
- **Planeamento Integrado (35%)**: Coordenação multidisciplinar
- **Comunicação Profissional (35%)**: Articular com entidades

## 🏆 Sistema de Pontuação

- **Pontuação máxima por fase**: 100 pontos
- **Desbloqueio de fases**: Requer 70+ pontos na fase anterior
- **Níveis de performance**:
  - 95-100: Mestre SAASI
  - 85-94: Técnico Especialista
  - 70-84: Técnico Proficiente
  - 50-69: Técnico Competente
  - 0-49: Técnico Iniciante

## 💾 Dados e Progresso

O progresso é guardado automaticamente no `localStorage` do navegador:
- `saasi_phase1_results`: Resultados da Fase 1
- `saasi_phase2_results`: Resultados da Fase 2
- `saasi_phase3_results`: Resultados da Fase 3 (futuro)

## 🎨 Características Técnicas

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Styling moderno com CSS Grid e Flexbox
- **JavaScript ES6+**: Lógica do jogo (Vanilla JS, sem frameworks)
- **localStorage**: Persistência de dados local
- **Firebase Hosting**: Deployment em produção

### Compatibilidade
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Dispositivos móveis (responsive design)

### Performance
- 🚀 Carregamento instantâneo (ficheiros estáticos)
- 📱 Responsive design para todos os dispositivos
- ♿ Acessibilidade (WCAG 2.1 AA)
- 🎯 Zero dependências externas

## 🔧 Desenvolvimento

### Estrutura de Código
- **Modular**: Cada fase é auto-contida
- **Extensível**: Preparado para Fase 3 e futuras expansões
- **Manutenível**: Código bem documentado e organizado
- **Testável**: Lógica separada da apresentação

### Adicionar Nova Fase
1. Criar `faseX.html` baseado no template existente
2. Atualizar `index.html` para incluir a nova fase
3. Adicionar lógica de desbloqueio no `shared.js`
4. Atualizar `firebase.json` com nova rota

## 📊 Analytics e Métricas

O sistema recolhe métricas de performance para melhoria contínua:
- Tempo de conclusão por fase
- Pontuações e padrões de erro
- Utilização de dicas e ajudas
- Caminhos de navegação

## 🚀 Deployment para Firebase

### Preparação
1. Instalar Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicializar projeto: `firebase init hosting`

### Deploy
```bash
firebase deploy
```

### Configuração de Domínio Personalizado
1. No Firebase Console, aceder a Hosting
2. Adicionar domínio personalizado
3. Seguir instruções de verificação DNS

## 📈 Roadmap Futuro

### Versão 1.1
- [ ] Fase 3 - Implementação e Acompanhamento
- [ ] Sistema de conquistas expandido
- [ ] Relatórios de progresso para formadores

### Versão 1.2
- [ ] Modo multiplayer colaborativo
- [ ] Dashboard de administração
- [ ] Analytics avançados

### Versão 2.0
- [ ] Elementos 3D com Three.js
- [ ] Casos adicionais além da Felisbina
- [ ] Módulos especializados por área

## 🤝 Contribuições

Este projeto está em desenvolvimento ativo. Para contribuir:

1. Fazer fork do repositório
2. Criar branch para feature (`git checkout -b feature/nova-funcionalidade`)
3. Fazer commit das alterações (`git commit -am 'Adicionar nova funcionalidade'`)
4. Push para o branch (`git push origin feature/nova-funcionalidade`)
5. Criar Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - ver ficheiro [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para questões técnicas ou sugestões:
- Email: suporte@saasi.pt
- Issues: [GitHub Issues](https://github.com/saasi/escape-room/issues)

---

**Desenvolvido com ❤️ para a formação de técnicos SAASI**

*"Cada pessoa é única e merece ser tratada com dignidade e respeito. O seu trabalho pode mudar uma vida."*
