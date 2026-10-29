# Design

## Context

Consulte `proposal.md` para motivação e `specs/appointments/spec.md` para o contrato observável. O checkout contém a configuração OpenSpec e o contrato acadêmico em `openspec.md`, mas não contém a aplicação nem specifications existentes. CT-OPEN-001 define uma aplicação monolítica CommonJS, regras temporais em `America/Sao_Paulo`, SQLite e dependências permitidas; os dois cenários do TCC devem manter stack e critérios comparáveis.

## Goals / Non-Goals

**Goals:**
- Separar domínio, casos de uso, adaptadores HTTP e infraestrutura e manter a regra de dependências apontada para dentro.
- Tornar validações temporais e persistência testáveis sem afetar o banco de desenvolvimento.
- Associar entregas, testes e medições a evidências reais e ao baseline correto.

**Non-Goals:**
- Introduzir autenticação, autorização, APIs independentes, container de dependências ou infraestrutura de deploy.
- Afirmar que requisitos, testes, métricas, CI ou gates já foram executados ou aprovados.

## Decisions

1. **Aplicação monolítica com composição explícita.** Usar CommonJS no Node.js, Express para HTTP e EJS para páginas, mantendo HTML, CSS e JavaScript puro no cliente. `src/main` compõe repositórios, casos de uso, controllers e rotas. A alternativa de separar frontend e backend foi rejeitada por contrariar a comparabilidade e o modelo monolítico definidos no contrato; não será introduzido framework frontend.

2. **Dependências internas voltadas a contratos.** `src/domain` representa `Appointment` e invariantes próprias; `src/application` contém casos de uso e o contrato `AppointmentRepository`; controllers e rotas traduzem HTTP para chamadas de aplicação; `src/infrastructure` implementa persistência e detalhes de framework. A camada Application não importa Express nem o repositório SQLite concreto. A alternativa de concentrar regras em controllers ou SQL foi rejeitada por acoplar o núcleo às bordas.

3. **SQLite por adaptador isolável.** Implementar o contrato do repositório com better-sqlite3, schema `appointments` e unicidade em `(appointment_date, appointment_time)`. Usar parâmetros em toda consulta. A detecção de conflito pelo caso de uso melhora a resposta normal; a constraint do banco continua sendo a autoridade contra corridas e deve ser traduzida pelo adaptador para o mesmo erro de conflito. `data/appointments.db` é o banco de desenvolvimento e não deve ser versionado; integração usa banco isolado, preferencialmente `:memory:`, sem apagar o banco local.

4. **Tempo fornecido ao caso de uso.** Centralizar comparação de data e hora com `America/Sao_Paulo` e permitir um relógio substituível nos testes. Não usar o relógio global diretamente em testes de passado/conflito temporal. Converter os campos civis `YYYY-MM-DD` e `HH:mm` de forma explícita para comparação; não tratar horário sem zona como UTC. Timestamps de criação/atualização são ISO 8601 e a atualização conserva o timestamp original de criação.

5. **Identificadores e validação no limite correto.** Gerar identificadores UUID no fluxo de criação (com `crypto.randomUUID()` no adaptador apropriado), validar dados no núcleo antes da persistência e manter erros de validação, inexistência e conflito distintos até o adaptador HTTP. Isso evita SQL/HTTP no domínio e permite testes unitários sem banco.

6. **Contrato HTTP HTML, sem superfície adicional.** Implementar `GET /`, `GET /appointments`, `GET /appointments/new`, `POST /appointments`, `GET /appointments/:id`, `GET /appointments/:id/edit`, `POST /appointments/:id/update` e `POST /appointments/:id/delete`. Controllers chamam casos de uso; sucesso pode redirecionar à página resultante com redirecionamento documentado. Mapear validação/inexistência/conflito/erro inesperado para HTTP 400/404/409/500 e renderizar erros sem SQL, stack traces, caminhos internos ou credenciais. Usar Helmet para segurança HTTP básica sem ampliar o escopo para autenticação.

7. **Node.js 24 e dependências aprovadas.** O usuário confirmou que o Cenário A utiliza Node.js 24. Fixar essa versão em `engines`, lockfile e CI após verificar a compatibilidade das dependências; não trocar a versão para outra sem registrar a divergência com o contrato de comparabilidade. Limitar dependências funcionais a Express, EJS, better-sqlite3, dotenv e helmet; ferramentas de desenvolvimento/teste incluem nodemon, Supertest, ESLint e Prettier, usando também `node:test`, `node:assert/strict` e cobertura nativa. Não adicionar tecnologias explicitamente excluídas pelo contrato.

8. **Verificação vinculada a evidências.** Separar testes unitários de domínio/casos de uso, integração SQLite isolada, testes HTTP com Supertest e verificações arquiteturais de imports quando viáveis. Seguir RED → GREEN → REFACTOR para comportamento novo; ciclos posteriores a implementação preexistente serão caracterização/regressão. Registrar comando, ambiente, SHA e resultados, sem converter ausência de evidência em sucesso ou zero. CI prevista no GitHub Actions deve executar lint, formato e testes de cobertura contra o SHA correspondente.

## Risks / Trade-offs

- [Uma dependência aprovada pode não ser compatível com Node.js 24] → confirmar suporte antes de fixar versões; registrar qualquer incompatibilidade e solicitar decisão antes de divergir da versão do Cenário A.
- [Fuso horário e horário de verão podem causar conversões inconsistentes] → manter datas/horas funcionais como campos civis contratuais, comparar explicitamente na zona indicada e testar limites com relógio controlado.
- [Verificação de conflito isolada não evita concorrência] → manter a constraint única SQLite e converter a violação de unicidade no adaptador.
- [Uma alteração experimental pode contaminar a evidência histórica] → registrar baseline, branch, HEAD, status e arquivos antes de alterar; classificar correções/rebuilds e nunca reescrever histórico sem autorização.
- [A existência de documentos pode ser confundida com evidência de execução] → marcar resultados como pendentes/não verificados até associá-los a comandos, ambiente, timestamp e SHA.
- [Métricas de sessões ou autoria podem estar incompletas] → coletar prospectivamente, indicar completude/limitações e usar “AUTORIA NÃO DETERMINADA” quando não houver evidência suficiente.

## Migration Plan

Não há implantação ou migração de aplicação observada no checkout. Antes da implementação, identificar raiz Git, branch, HEAD, estado do worktree, histórico, arquivos não rastreados e repositórios aninhados; preservar o baseline antes de introduzir código. Criar e inicializar o SQLite sem sobrescrever dados existentes; usar banco temporário isolado para testes. Não há rollback de produção previsto; uma reversão de desenvolvimento deve preservar commits e evidências, sem operações destrutivas ou alteração de dados locais.
