# CONTRATO TÉCNICO-FUNCIONAL DO SISTEMA DE AGENDAMENTOS
## Cenário Experimental B — Spec-Driven Development com OpenSpec e Clean Architecture

Identificador: CT-OPEN-001
Versão: 1.0 — Proposta
Data: 27 de outubro de 2026
Status: Proposto para validação
Natureza: Contrato técnico-funcional acadêmico
Projeto: Sistema de Agendamento Full Stack
Metodologia: Spec-Driven Development com OpenSpec
Arquitetura: Clean Architecture simplificada
Instituição: [Preencher]
Autores: [Preencher]
Orientador: [Preencher]

## CONTROLE DOCUMENTAL

Código: CT-OPEN-001.
Versão: 1.0 — Proposta.
Classificação: Contrato técnico-funcional.
Cenário: B — OpenSpec.
Data: 27/10/2026.
Aprovação: Não registrada.
Implementação: Não verificada.
Fonte editável: contrato-openspec-agendamentos.md.
Versão de leitura: contrato-tecnico-funcional-openspec-tcc.pdf.

A existência deste contrato não comprova implementação, testes, homologação ou aderência arquitetural.

# 1. APRESENTAÇÃO E OBJETIVO

Este contrato estabelece os requisitos técnicos, funcionais, arquiteturais e de verificação para um sistema de gerenciamento de agendamentos desenvolvido no Cenário B de um Trabalho de Conclusão de Curso.

O cenário utiliza Spec-Driven Development (SDD) com OpenSpec e adota Clean Architecture como referência de organização do código.

O contrato define antecipadamente comportamentos verificáveis, decisões tecnológicas, responsabilidades arquiteturais e critérios de aceitação.

Os objetivos são definir o CRUD; estabelecer restrições de stack; formalizar regras de negócio; documentar interfaces e responsabilidades; orientar as especificações OpenSpec; permitir implementação testável; estabelecer aceite; preservar rastreabilidade; e possibilitar a coleta padronizada de métricas experimentais.

O projeto deverá manter escopo pequeno e adequado a uma investigação acadêmica, sem pretender constituir plataforma empresarial completa.

# 2. CONTEXTO ACADÊMICO E COMPARABILIDADE

O TCC investiga diferenças observáveis entre duas estratégias de desenvolvimento assistido por IA generativa.

Cenário A — Vibe Coding: desenvolvimento autônomo com instruções centralizadas em linguagem natural.

Cenário B — OpenSpec: desenvolvimento orientado por especificações estruturadas, decisões arquiteturais e tarefas verificáveis.

Os dois cenários deverão compartilhar domínio, requisitos funcionais, regras de negócio, stack, princípios arquiteturais, critérios de aceitação, convenções de testes e protocolo de métricas.

A principal distinção será a organização das instruções fornecidas ao agente. Este contrato será utilizado operacionalmente somente no Cenário B.

Não deverão ser utilizados resultados, correções ou código de outra execução para melhorar artificialmente o Cenário B. A adoção de OpenSpec não garante qualidade nem superioridade metodológica.

# 3. GOVERNANÇA DOCUMENTAL

## 3.1 Prompt Mestre

O arquivo prompt-openspec-metricas-tcc.md estabelece governança metodológica: comportamento do agente, rastreabilidade de sessões, preservação histórica, métricas M1–M8, intervenções humanas, TDD, Git, CI e separação dos cenários.

## 3.2 Contrato técnico-funcional

Este contrato estabelece o comportamento esperado do sistema, entradas e saídas, regras, stack, dependências permitidas, testes e condições de conformidade.

## 3.3 Artefatos OpenSpec

O conteúdo deverá ser traduzido para openspec/config.yaml, proposal.md, specs/appointments/spec.md, design.md e tasks.md.

O PDF é uma representação estável para consulta. O Markdown permanece editável e versionável. O PDF não substitui as specifications operacionais do OpenSpec.

# 4. INTEGRIDADE CIENTÍFICA

Distinguir quatro categorias:

Evidência histórica: commits, prompts, documentos e relatórios preservados durante o experimento original.

Implementação observada: código e dependências realmente encontrados no repositório analisado.

Contrato corrigido: requisitos aprovados para nova implementação ou estabilização.

Resultado verificado: execução comprovada e associada a comandos, ambiente, horários e commits.

Obrigações: não reconstruir dados perdidos; não reescrever histórico para melhorar aparência; não apresentar alterações posteriores como históricas; não inventar métricas; não afirmar testes sem evidência; documentar divergências entre contrato e código; separar implementação original, correção, refatoração, rebuild e extensão.

Estados documentais: IMPLEMENTADO, TESTADO, VERIFICADO, NÃO VERIFICADO, NÃO DISPONÍVEL e PENDENTE.

# 5. LINGUAGEM NORMATIVA

DEVE indica requisito obrigatório.
NÃO DEVE indica proibição.
PODE indica alternativa permitida.
CRITÉRIO DE ACEITAÇÃO indica condição observável que determina conformidade.

Requisitos de negócio são identificados por RN. Requisitos funcionais complementares são identificados por RF.

Declarações documentais, isoladamente, não constituem evidência suficiente de conformidade.

# 6. ESCOPO DO SOFTWARE

O sistema DEVE permitir criar, listar, visualizar, editar e excluir agendamentos.

Fora do escopo: autenticação, autorização, usuários, perfis role, funcionários, múltiplas agendas, pagamentos, notificações, e-mails, WhatsApp, calendário externo, dashboards empresariais, microservices e relatórios analíticos complexos.

Essas exclusões delimitam o experimento e não constituem recomendações gerais para sistemas de produção.

# 7. CONTRATO TECNOLÓGICO

Linguagem: JavaScript CommonJS.
Runtime: Node.js.
Backend: Express.
Renderização: EJS.
Interface: HTML, CSS e JavaScript puro.
Banco: SQLite.
Driver: better-sqlite3.
Configuração: dotenv.
Segurança HTTP básica: helmet.
Desenvolvimento: nodemon.
Testes: node:test e node:assert/strict.
Testes HTTP: Supertest.
Cobertura: mecanismo nativo do Node.js.
Qualidade: ESLint e Prettier.
Especificações: OpenSpec.
Versionamento: Git e GitHub.
CI: GitHub Actions.

A versão principal do Node.js deverá ser equivalente à utilizada no Cenário A. Node.js 24 poderá ser adotado mediante compatibilidade. As versões efetivas e o package-lock.json deverão ser registrados.

O sistema NÃO DEVE introduzir TypeScript, React, Vue, Angular, Vite, Next.js, Prisma, Sequelize, PostgreSQL, MySQL, MongoDB, Python como componente funcional, Flask, Django, FastAPI, Docker, Kubernetes ou microservices.

As restrições visam comparabilidade experimental; não significam inadequação geral das tecnologias excluídas.

# 8. MODELO DA APLICAÇÃO

Aplicação monolítica, com um repositório Git principal, um package.json, um servidor Express, um banco SQLite, páginas EJS e arquivos estáticos no diretório public/.

Não criar frontend e backend como aplicações independentes.

Fluxo de execução:
Browser -> Express Route -> Controller -> Use Case -> Repository Contract -> SQLiteAppointmentRepository -> SQLite.

Esse fluxo representa chamadas funcionais. A direção das dependências de código deverá ser avaliada separadamente pela Dependency Rule. O caso de uso depende de abstração, não da implementação SQLite.

# 9. ENTIDADE APPOINTMENT

id: UUID em string, obrigatório.
clientName: String, obrigatório.
service: String, obrigatório.
appointmentDate: YYYY-MM-DD, obrigatório.
appointmentTime: HH:mm, obrigatório.
notes: String opcional, máximo de 500 caracteres.
createdAt: Timestamp ISO 8601, obrigatório.
updatedAt: Timestamp ISO 8601, obrigatório.

A criação do ID deverá utilizar crypto.randomUUID().

O domínio protege invariantes próprias da entidade sem depender de Express, SQL ou SQLite. Regras dependentes do relógio atual ou de outros registros são coordenadas pelos casos de uso.

# 10. CONVENÇÃO TEMPORAL

Zona: America/Sao_Paulo.
Data: YYYY-MM-DD.
Horário: HH:mm.
Precisão funcional: minutos.

Na verificação de passado, minutos anteriores ao minuto atual serão considerados passados. O minuto corrente não será rejeitado exclusivamente por essa regra.

Agendamentos históricos permanecerão disponíveis para consulta. Testes temporais deverão utilizar relógio controlável.

Se essa convenção diferir do contrato original, a divergência deverá ser registrada como revisão para nova execução, não como requisito histórico presumido.

# 11. REGRAS DE NEGÓCIO

## RN-001 — Nome obrigatório

Requisito: clientName DEVE ser informado e normalizado por trim().

Cenário positivo:
GIVEN uma solicitação com nome " Maria ";
WHEN a criação for processada;
THEN o nome persistido será "Maria".

Cenário negativo:
GIVEN nome vazio ou composto apenas por espaços;
WHEN a operação for processada;
THEN ocorrerá erro de validação;
AND nenhum agendamento será criado.

Teste prioritário: unitário.

## RN-002 — Serviço obrigatório

Requisito: service DEVE ser informado e normalizado por trim().

Cenário positivo:
GIVEN serviço " Consulta ";
WHEN os dados forem processados;
THEN o valor armazenado será "Consulta".

Cenário negativo:
GIVEN serviço ausente, vazio ou composto de espaços;
WHEN o cadastro for solicitado;
THEN a operação será rejeitada.

Teste prioritário: unitário.

## RN-003 — Data obrigatória

Requisito: appointmentDate DEVE ser informado.

Cenário negativo:
GIVEN solicitação sem appointmentDate;
WHEN a criação for solicitada;
THEN ocorrerá erro de validação;
AND nenhum registro será persistido.

Teste prioritário: unitário.

## RN-004 — Horário obrigatório

Requisito: appointmentTime DEVE ser informado.

Cenário negativo:
GIVEN solicitação sem appointmentTime;
WHEN a criação for solicitada;
THEN ocorrerá erro de validação.

Teste prioritário: unitário.

## RN-005 — Data real de calendário

Requisito: appointmentDate DEVE possuir formato YYYY-MM-DD e representar data existente.

Cenário positivo:
GIVEN "2028-02-29";
WHEN a validade calendárica for verificada;
THEN formato e data serão válidos.

Cenário negativo:
GIVEN "2026-02-30";
WHEN o campo for validado;
THEN ocorrerá erro de validação.

Cenário de formato:
GIVEN "30/10/2026";
WHEN o campo for validado;
THEN ocorrerá erro de validação.

A validade calendárica não dispensa a RN-007.
Teste prioritário: unitário.

## RN-006 — Horário válido

Requisito: appointmentTime DEVE possuir formato HH:mm, com horas entre 00 e 23 e minutos entre 00 e 59.

Cenário positivo:
GIVEN "14:30";
WHEN ocorrer a validação;
THEN o horário será aceito.

Cenário negativo:
GIVEN "25:80";
WHEN ocorrer a validação;
THEN a operação será rejeitada.

Teste prioritário: unitário.

## RN-007 — Impedimento de agendamentos no passado

Requisito: impedir criação ou atualização para minutos anteriores ao minuto atual.

Cenário negativo:
GIVEN relógio de teste fixado em 27/10/2026 às 15:00 na zona contratada;
WHEN for solicitado agendamento às 14:59 do mesmo dia;
THEN a operação será rejeitada.

Cenário do minuto corrente:
GIVEN o mesmo relógio;
WHEN for solicitado agendamento às 15:00;
THEN não haverá rejeição exclusivamente por estar no passado.

Cenário histórico:
GIVEN registro existente no passado;
WHEN houver consulta;
THEN o registro continuará disponível.

Teste prioritário: caso de uso com relógio controlado.

## RN-008 — Conflito de agendamento

Requisito: impedir dois registros com a mesma data e horário.

O caso de uso verificará conflitos; o SQLite deverá impor unicidade para a combinação.

Cenário negativo:
GIVEN registro existente em 10/11/2026 às 14:00;
WHEN outro registro for solicitado para essa combinação;
THEN a criação será rejeitada como conflito;
AND o registro existente permanecerá inalterado.

Conflitos detectados diretamente pelo banco deverão ser convertidos pelo adaptador em resultado coerente com a regra de aplicação.

Testes prioritários: caso de uso e integração.

## RN-009 — Edição sem falso conflito

Requisito: durante edição, a verificação de conflitos DEVE ignorar o próprio id.

Cenário positivo:
GIVEN agendamento existente;
WHEN for editado mantendo seu horário válido;
THEN não haverá conflito consigo mesmo.

Cenário negativo:
GIVEN dois registros em horários diferentes;
WHEN o primeiro for alterado para o horário ocupado pelo segundo;
THEN a atualização será rejeitada;
AND os dois registros permanecerão inalterados.

Teste prioritário: caso de uso.

## RN-010 — Limite das observações

Requisito: notes DEVE ser opcional, assumir string vazia por padrão e permitir no máximo 500 caracteres.

Cenário de omissão:
GIVEN solicitação sem notes;
WHEN o agendamento for criado;
THEN notes será armazenado como string vazia.

Cenário negativo:
GIVEN observações acima de 500 caracteres;
WHEN os dados forem validados;
THEN a operação será rejeitada.

Teste prioritário: unitário.

# 12. REQUISITOS FUNCIONAIS COMPLEMENTARES

## RF-001 — Listagem ordenada

O sistema DEVE listar por appointmentDate crescente e, para datas iguais, appointmentTime crescente.

Aceitação: registros incluídos fora da ordem cronológica aparecerão corretamente ordenados.

## RF-002 — Consulta por identificador

O sistema DEVE consultar agendamento existente por id.

Aceitação: identificador inexistente produzirá AppointmentNotFoundError, tratado pela interface HTTP.

## RF-003 — Exclusão

O sistema DEVE permitir excluir registro existente.

Aceitação: após a exclusão, consulta pelo mesmo identificador informará inexistência.

## RF-004 — Integridade dos timestamps

O sistema DEVE preservar createdAt e atualizar updatedAt em edições persistidas.

Aceitação: createdAt conserva o valor original e updatedAt reflete a modificação.

# 13. CASOS DE USO

CreateAppointment: validar, verificar conflitos e persistir.
GetAppointment: consultar por identificador.
ListAppointments: recuperar lista ordenada.
UpdateAppointment: localizar, validar, verificar conflito e atualizar.
DeleteAppointment: localizar e excluir.

Os casos de uso deverão receber dados adequados ao núcleo da aplicação. Não deverão depender diretamente de req, res, HTML ou implementação SQLite concreta.

Entradas, saídas e erros deverão corresponder às regras RN e RF.

# 14. ARQUITETURA E DEPENDÊNCIAS

## 14.1 Domain

Caminho: src/domain/Appointment.js.

Responsabilidade: representar a entidade e proteger invariantes intrínsecas.

NÃO DEVE importar Express, EJS, better-sqlite3, controllers ou infraestrutura.

## 14.2 Application

Caminho: src/application/.

Responsabilidade: casos de uso e contrato AppointmentRepository.

Operações do contrato:
create(), findById(), findAll(), findByDateAndTime(), update(), deleteById().

A Application NÃO DEVE importar o repositório SQLite concreto.

## 14.3 Interface Adapters

Caminhos: src/presentation/controllers/, routes/ e middlewares/, além dos adaptadores necessários.

Responsabilidades: receber HTTP, converter dados, invocar casos de uso, interpretar erros e produzir respostas.

Controllers NÃO DEVEM executar SQL ou concentrar regras de negócio.

## 14.4 Frameworks and Drivers

Caminhos: src/infrastructure/ e src/main/.

Responsabilidades: persistência SQLite, Express, configurações, inicialização e composição de dependências.

O composition root realizará a montagem da aplicação. Não será exigido container de injeção de dependências.

## 14.5 Dependency Rule

Importações deverão preservar dependências orientadas para abstrações internas. A avaliação considerará importações reais e responsabilidades, não apenas diretórios.

Quando viável, deverão existir testes automatizados para detectar imports proibidos.

# 15. PERSISTÊNCIA SQLITE

Utilizar better-sqlite3.

Banco de desenvolvimento: data/appointments.db.
Tabela: appointments.

Colunas:
id TEXT PRIMARY KEY.
client_name TEXT NOT NULL.
service TEXT NOT NULL.
appointment_date TEXT NOT NULL.
appointment_time TEXT NOT NULL.
notes TEXT.
created_at TEXT NOT NULL.
updated_at TEXT NOT NULL.

Restrição: UNIQUE(appointment_date, appointment_time).

O schema deverá usar CREATE TABLE IF NOT EXISTS. A inicialização deverá preparar diretório e tabela quando necessário.

Consultas deverão utilizar parâmetros, sem concatenar entrada do usuário diretamente em SQL.

O banco local NÃO DEVE ser versionado. Testes de integração utilizarão SQLite isolado, preferencialmente :memory:. Nenhum teste poderá apagar dados de desenvolvimento.

# 16. CONTRATO HTTP

GET /: redirecionar para listagem.
GET /appointments: exibir listagem.
GET /appointments/new: exibir formulário.
POST /appointments: criar agendamento.
GET /appointments/:id: exibir detalhes.
GET /appointments/:id/edit: exibir edição.
POST /appointments/:id/update: atualizar.
POST /appointments/:id/delete: excluir.

Mapeamento:
ValidationError -> HTTP 400.
AppointmentNotFoundError -> HTTP 404.
AppointmentConflictError -> HTTP 409.
Erro inesperado -> HTTP 500.

Operações HTML bem-sucedidas poderão utilizar redirecionamentos documentados.

NÃO DEVE apresentar SQL, stack traces, caminhos internos, credenciais ou dados sensíveis.

# 17. INTERFACE E ACESSIBILIDADE

Interface renderizada por EJS.

Páginas previstas: listagem, criação, detalhes, edição, confirmação de exclusão, página 404 e página de erro.

Prioridades: HTML semântico, labels, mensagens claras, foco visível, responsividade, CSS puro e JavaScript mínimo.

Não utilizar React, outros frameworks frontend ou design system complexo.

# 18. PROCESSO OPENSPEC

Fluxo:
AUDIT -> SPEC -> ARCHITECTURE -> TASKS -> IMPLEMENTATION -> TESTS -> VALIDATION.

Artefatos:
openspec/config.yaml: contexto e regras globais.
proposal.md: motivação, escopo e mudança.
specs/appointments/spec.md: requisitos e cenários verificáveis.
design.md: decisões técnicas.
tasks.md: plano verificável.
requirements-traceability.md: ligação entre requisitos e evidências.

As specifications conterão requisitos normativos e cenários de aceitação. Os comandos precisarão corresponder à versão do OpenSpec instalada.

Não presumir comandos nem execuções inexistentes. Em nova execução SDD, definir requisitos antes de implementar os comportamentos correspondentes.

# 19. TEST-DRIVEN DEVELOPMENT

O desenvolvimento de novos comportamentos deverá seguir RED -> GREEN -> REFACTOR.

## 19.1 RED

Criar teste antes do comportamento, executar, confirmar falha pertinente e registrar evidências e horário disponível.

## 19.2 GREEN

Implementar o menor comportamento suficiente, executar novamente, confirmar resultado e registrar evidência.

## 19.3 REFACTOR

Melhorar a estrutura quando necessário, preservando comportamento, executando os testes e registrando resultados.

TDD deverá ser demonstrado cronologicamente. Testes posteriores a uma implementação preexistente são caracterização ou regressão, não prova retroativa de TDD.

Falhas RED esperadas não constituem automaticamente defeitos. Registros: docs/tcc/tdd-cycles.csv.

# 20. ESTRATÉGIA DE TESTES

Testes unitários: Appointment, CreateAppointment, GetAppointment, ListAppointments, UpdateAppointment e DeleteAppointment; RN-001 a RN-010; datas impossíveis, relógio controlado e conflitos.

Testes de integração: criação, busca, listagem, atualização, exclusão, unicidade SQLite, timestamps; sempre em banco isolado.

Testes HTTP: Supertest; rotas, redirecionamentos, HTTP 400, 404, 409 e 500.

Testes arquiteturais: quando implementados, verificação da Dependency Rule e imports proibidos.

Não criar diretórios artificiais apenas para satisfazer testes.

# 21. COBERTURA DE CÓDIGO

Utilizar cobertura nativa do Node.js com comando equivalente a:
node --test --experimental-test-coverage

Registrar versão do Node.js, comando, commit testado, cobertura de linhas, branches e funções, arquivos incluídos/excluídos e resultado.

Os critérios de inclusão devem ser equivalentes nos dois cenários. Não exigir artificialmente 100% de cobertura. Cobertura isolada não comprova qualidade dos testes nem TDD.

# 22. MÉTRICAS EXPERIMENTAIS M1 A M8

As métricas serão coletadas prospectivamente e com definições equivalentes.

## M1 — Quantidade de prompts

Definição: mensagens explicitamente enviadas pelo pesquisador ao agente.
Unidade: quantidade de mensagens.
Fonte: exportações de sessões e log de interação.

Incluir instrução inicial e comandos OpenSpec de chat enviados manualmente. Não contar respostas da IA nem chamadas internas automáticas. Registros incompletos serão indicados como parciais.

## M2 — Tempo de desenvolvimento

Definição: intervalo entre primeira atividade experimental registrada e conclusão da validação final.
Unidade: minutos.
Fonte: timestamps e registro de pausas.

No OpenSpec, incluir elaboração e revisão de proposal, specifications, design e tasks. Tempo decorrido não equivale automaticamente a tempo ativo. Pausas somente serão descontadas quando documentadas.

## M3 — Correções realizadas

Definição: problemas distintos identificados e corrigidos.
Unidade: quantidade de problemas corrigidos.
Fonte: registro de defeitos, commits e validações.

Cada problema terá correction_id. Vários commits de um mesmo defeito não aumentam a contagem. Refatorações, melhorias e falhas RED esperadas devem ser distinguidas.

## M4 — Arquivos modificados

Definição: arquivos únicos adicionados, alterados, removidos ou renomeados entre baseline e versão final.
Unidade: quantidade por categoria.
Fonte: Git diff entre SHAs conhecidos.

Separar aplicação, testes, configuração, documentação e OpenSpec. Dependências instaladas não são arquivos desenvolvidos. Quantidade de arquivos não mede diretamente qualidade arquitetural.

## M5 — Testes executados

Definição: casos executados pelo runner.
Unidade: quantidade por estado e execução.
Fonte: relatórios de node:test.

Registrar executados, aprovados, reprovados, ignorados, duração, comando e SHA. Distinguir execuções intermediárias da validação final.

## M6 — Cobertura de código

Definição: linhas, branches e funções exercitados pelos testes.
Unidade: percentual por dimensão.
Fonte: relatório nativo do Node.js.

Registrar escopo e arquivos analisados. Não inventar percentuais nem comparar denominadores distintos.

## M7 — Resultado da CI

Definição: estado verificável de workflow associado a commit.
Unidade: estado por execução.
Fonte: GitHub Actions.

Registrar repositório, SHA, workflow, run ID, URL, data, jobs e reexecuções.

Estados: SUCCESS, FAILURE, CANCELLED, SKIPPED, NOT_EXECUTED e UNKNOWN.

O arquivo YAML isolado não comprova aprovação.

## M8 — Intervenções humanas

Definição: intervenções humanas identificáveis e classificadas.
Unidade: eventos documentados.
Fonte: logs, diffs e sessões.

Distinguir edição manual de código, testes, configuração, documentos OpenSpec, prompts e aprovações. O autor do commit não determina sozinho a autoria do código. Usar AUTORIA NÃO DETERMINADA quando necessário.

## 22.1 Tratamento dos dados

Cada métrica indicará valor, unidade, fonte, período, evidência, completude e limitação.

Estados: MEDIDO, PARCIALMENTE MEDIDO, NÃO DISPONÍVEL, NÃO EXECUTADO, NÃO APLICÁVEL.

Dados desconhecidos não serão convertidos em zero.

# 23. REGISTRO DE EVENTOS E EVIDÊNCIAS

Campos recomendados:
event_id; run_id; scenario_id; session_id; timestamp; event_type; actor; description; prompt_ref; requirement_ref; openspec_task_ref; baseline_sha; resulting_sha; evidence_ref; status.

Tipos de evento:
PROMPT; SPEC_CREATION; SPEC_REVISION; IMPLEMENTATION; TEST_RUN; DEFECT_FOUND; CORRECTION; HUMAN_EDIT; COMMIT; CI_RUN; PAUSE; RESUME; VALIDATION.

Não criar eventos fictícios nem registrar segredos em repositórios públicos. Exportações completas poderão ser preservadas em local seguro com referências e hashes, quando apropriado.

# 24. GIT E PRESERVAÇÃO HISTÓRICA

Antes de alterações: identificar raiz Git, branch, HEAD, git status, histórico relevante, arquivos não rastreados, gitlinks e repositórios aninhados.

Operações destrutivas exigem autorização: git reset --hard, git push --force, exclusão de .git, rebase destrutivo e sobrescrita de commits históricos.

Preservar baseline. Classificar alterações como implementação original, correção, refatoração, rebuild, extensão ou estabilização pós-experimental.

Git hooks poderão registrar metadados futuros, mas não substituem exportação de sessões da IA.

# 25. INTEGRAÇÃO CONTÍNUA E ENTREGA

## 25.1 Continuous Integration

Utilizar GitHub Actions.

Verificações previstas:
1. Checkout.
2. Versão aprovada do Node.js.
3. npm ci.
4. npm run lint.
5. npm run format:check.
6. npm run test:coverage.
7. Testes arquiteturais, quando disponíveis.
8. Registro dos resultados.

Testes utilizarão SQLite isolado. Associar resultados ao SHA exato. Preservar relatórios como artifacts quando apropriado.

## 25.2 Continuous Delivery

Não exigir publicação em produção.

Entrega poderá incluir código versionado, release, relatórios, cobertura, CI e documentação.

Integração contínua e entrega contínua não são conceitos equivalentes; execução de testes não equivale à distribuição de software.

# 26. AUDITORIA DE PYTHON — EXCLUSIVA DO PROJETO B

A presença eventual de Python será examinada sem presumir ocorrência no checkout atual.

Auditar arquivos .py, referências textuais, package.json, scripts, workflows de CI, OpenSpec, Git, imports e chamadas externas.

Arquivos Python desconhecidos não serão executados durante inspeção.

Classificações:
1. Artefato histórico.
2. Script auxiliar.
3. Código residual.
4. Dependência funcional.
5. Referência documental.
6. Finalidade indeterminada.

Se residual: possível remoção na versão corrigida, preservando histórico.
Se auxiliar: finalidade e isolamento documentados.
Se funcional: divergência de stack que exige decisão e validação.
Se indeterminado: manter incerteza registrada.

Não atribuir autoria à IA sem evidência. Python não comprova automaticamente violação da Clean Architecture.

Relatório: docs/tcc/python-artifacts.md.

A aplicação alinhada não deverá depender funcionalmente de Python.

# 27. MATRIZ DE RASTREABILIDADE

Fluxo:
Requisito -> Specification -> Task -> Código -> Teste -> Commit -> Resultado.

Colunas: identificador, requisito, cenário de aceitação, artefato OpenSpec, tarefa, implementação, teste, resultado, commit e status.

Utilizar RN-001 a RN-010 e RF-001 a RF-004. Referências inexistentes permanecerão A DEFINIR ou NÃO VERIFICADO.

# 28. ESTRUTURA DE ARQUIVOS

appointment-system/
  prompts/
  docs/
    contracts/
    tcc/
  openspec/
    config.yaml
    specs/
    changes/
  src/
    domain/
    application/
      errors/
      repositories/
      use-cases/
    infrastructure/
      database/
      repositories/
    presentation/
      controllers/
      routes/
      middlewares/
    main/
  tests/
    doubles/
    unit/
    integration/
    http/
  views/
    partials/
    appointments/
  public/
    css/
    js/
  data/
  .github/
    workflows/
  package.json
  package-lock.json
  README.md

Diretórios só deverão ser criados quando necessários. Quantidade de pastas não comprova qualidade arquitetural.

# 29. CRITÉRIOS DE ACEITE

G1: Baseline identificado e preservado.
G2: Stack conforme contrato aprovado.
G3: CRUD implementado.
G4: RN-001 a RN-010 verificadas.
G5: RF-001 a RF-004 verificadas.
G6: Dependências arquiteturais analisadas.
G7: Evidências TDD para ciclos praticados.
G8: Testes executados com registros.
G9: Cobertura real ou indisponibilidade registrada.
G10: Auditoria Python aplicável.
G11: CI vinculada a SHA ou não verificada.
G12: M1–M8 medidas ou indisponíveis.
G13: Matriz de rastreabilidade.
G14: Reprodutibilidade avaliada.
G15: Integridade acadêmica preservada.

Documentos, isoladamente, não aprovam gates.

# 30. CONTROLE DE ALTERAÇÕES

Toda mudança contratual relevante deverá identificar versão de origem, requisitos afetados, motivação, impacto funcional e arquitetural; atualizar specifications, design, tasks e testes quando necessário; registrar commit; preservar versão anterior.

Não alterar requisitos silenciosamente para acomodar código divergente. Não reescrever histórico original.

# 31. RISCOS E LIMITAÇÕES

Riscos reconhecidos:
- Perda do histórico de interações com IA.
- Ausência de versões intermediárias.
- Dificuldade de determinar autoria humana ou automática.
- Divergência entre specification e código.
- Diferenças de familiaridade dos participantes.
- Efeito de aprendizado.
- Limitações da cobertura.
- Escala reduzida do CRUD.
- Diferenças entre documentação e execução.
- Dependências não previstas.
- Retenção limitada de artifacts.
- Contaminação entre cenários.
- Impossibilidade de inferir causalidade apenas a partir de diferenças observadas.

Coleta de métricas melhora observabilidade, mas não elimina automaticamente os vieses.

# 32. ENTREGÁVEIS DA IMPLEMENTAÇÃO

Entregáveis previstos: código versionado; package.json e lockfile; README; OpenSpec; testes unitários, integração e HTTP; cobertura; registros TDD; Git; rastreabilidade; M1–M8; auditoria Python; CI; limitações; contrato versionado.

Nenhum item será presumido como concluído apenas pela existência deste contrato.

# 33. REFERÊNCIAS E FUNDAMENTAÇÃO

A fundamentação deverá considerar Robert C. Martin e Clean Architecture; Kent Beck e Test-Driven Development; Martin Fowler e refatoração; e documentações oficiais de Node.js, Git, GitHub Actions e OpenSpec.

Consultar fontes antes de afirmar recursos dependentes de versão. Não inventar páginas, DOI, referências completas ou resultados.

As decisões deste contrato são propostas técnicas da pesquisa e não conclusões empíricas.

# 34. DISPOSIÇÕES FINAIS

O Contrato CT-OPEN-001 estabelece condições propostas para o desenvolvimento e a validação do Cenário B.

A aprovação depende de adoção explícita no projeto. A conformidade depende de inspeção de código, dependências, testes e evidências.

Não se presume superioridade de OpenSpec ou Clean Architecture apenas por sua adoção declarada.

O objetivo é produzir requisitos claros, verificáveis, rastreáveis e comparáveis.

# ANEXO A — MATRIZ INICIAL DE REQUISITOS

RN-001 | Nome obrigatório | Teste unitário.
RN-002 | Serviço obrigatório | Teste unitário.
RN-003 | Data obrigatória | Teste unitário.
RN-004 | Horário obrigatório | Teste unitário.
RN-005 | Data válida | Teste unitário.
RN-006 | Horário válido | Teste unitário.
RN-007 | Não agendar no passado | Caso de uso.
RN-008 | Prevenir conflitos | Caso de uso e integração.
RN-009 | Ignorar próprio ID na edição | Caso de uso.
RN-010 | Limitar observações | Teste unitário.
RF-001 | Listagem ordenada | Unitário e integração.
RF-002 | Consulta por ID | Unitário e HTTP.
RF-003 | Exclusão | Unitário e HTTP.
RF-004 | Timestamps | Unitário e integração.

# ANEXO B — MATRIZ DE RASTREABILIDADE

A matriz operacional manterá uma linha para cada identificador RN ou RF.

ID do requisito: RN-001 a RN-010; RF-001 a RF-004.
Specification: A definir.
Task: A definir.
Código: A definir.
Teste: A definir.
Commit: Não verificado.
Resultado: Não verificado.
Status: Pendente.

Arquivo: docs/tcc/requirements-traceability.md.

# ANEXO C — PROTOCOLO DAS MÉTRICAS

M1 | Prompts humanos | Quantidade | Sessões exportadas.
M2 | Tempo | Minutos | Timestamps.
M3 | Correções | Defeitos corrigidos | Logs e Git.
M4 | Arquivos | Arquivos únicos | Git diff.
M5 | Testes | Casos por estado | node:test.
M6 | Cobertura | Percentual | Node.js.
M7 | CI | Estado por SHA | GitHub Actions.
M8 | Intervenções | Eventos identificáveis | Logs e diffs.

Quadro comparativo:
M1: Cenário A — A medir; Cenário B — A medir.
M2: Cenário A — A medir; Cenário B — A medir.
M3: Cenário A — A medir; Cenário B — A medir.
M4: Cenário A — A medir; Cenário B — A medir.
M5: Cenário A — A medir; Cenário B — A medir.
M6: Cenário A — A medir; Cenário B — A medir.
M7: Cenário A — A verificar; Cenário B — A verificar.
M8: Cenário A — A medir; Cenário B — A medir.

Não preencher resultados ausentes com estimativas.

# ANEXO D — MODELO DE EVIDÊNCIA TDD

Arquivo: docs/tcc/tdd-cycles.csv.

Campos:
cycle_id; requirement_id; openspec_task_id; session_id; test_file; implementation_file; red_timestamp; red_result; green_timestamp; green_result; refactor_result; evidence_ref; commit_sha; status.

Exemplo meramente ilustrativo:
RN-008 — Conflito de agendamento.
RED: teste de conflito falha pelo motivo esperado.
GREEN: verificação de conflito implementada, teste aprovado.
REFACTOR: revisão da estrutura e nova execução.

Resultados, horários e commits serão obtidos durante execução real.

# ANEXO E — PROTOCOLO DE AUDITORIA PYTHON

Arquivo: docs/tcc/python-artifacts.md.

Campos:
1. Repositório.
2. SHA.
3. Data.
4. Caminho.
5. Histórico conhecido.
6. Finalidade.
7. Dependências.
8. Classificação.
9. Risco arquitetural.
10. Decisão.
11. Correção posterior.
12. Teste.
13. Resultado.
14. Limitações.

Nenhuma ocorrência será considerada comprovada sem inspeção do checkout ou evidência histórica correspondente.

# ANEXO F — CORRESPONDÊNCIA COM OPENSPEC

Prompt Mestre: governança do agente e métricas.
Contrato CT-OPEN-001: requisitos técnicos e funcionais.
openspec/config.yaml: contexto e regras permanentes.
proposal.md: motivação e escopo da mudança.
specs/appointments/spec.md: comportamentos verificáveis.
design.md: decisões arquiteturais.
tasks.md: sequência de implementação.
requirements-traceability.md: vínculo entre requisitos e evidências.

Divergências deverão ser identificadas e versionadas. A hierarquia documental não autoriza mudanças silenciosas em contrato aprovado.

# ANEXO G — CHECKLIST DOS GATES

[ ] G1 — Baseline preservado.
[ ] G2 — Stack validada.
[ ] G3 — CRUD implementado.
[ ] G4 — RN-001 a RN-010 verificadas.
[ ] G5 — RF-001 a RF-004 verificadas.
[ ] G6 — Arquitetura inspecionada.
[ ] G7 — TDD documentado.
[ ] G8 — Testes executados.
[ ] G9 — Cobertura registrada.
[ ] G10 — Auditoria Python realizada.
[ ] G11 — CI verificada.
[ ] G12 — Métricas documentadas.
[ ] G13 — Rastreabilidade demonstrada.
[ ] G14 — Reprodutibilidade avaliada.
[ ] G15 — Integridade acadêmica confirmada.

Nenhuma caixa será marcada apenas pela existência deste contrato.

# ANEXO H — HISTÓRICO DE REVISÕES

Versão: 1.0.
Data: 27/10/2026.
Descrição: Proposta consolidada do contrato OpenSpec.
Status: Proposto.

FIM DO CONTRATO TÉCNICO-FUNCIONAL CT-OPEN-001.