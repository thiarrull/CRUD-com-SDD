# Tasks

## 1. Baseline e compatibilidade

- [ ] 1.1 Inspecionar raiz Git, branch, HEAD, estado do worktree, histórico, arquivos não rastreados, gitlinks e repositórios aninhados; preservar e registrar o baseline antes de alterações, verificando SHA e estado final da inspeção.
- [ ] 1.2 Confirmar Node.js 24 e compatibilidade das dependências aprovadas; registrar versões em `engines` e lockfile somente após a verificação, validando a instalação reproduzível com `npm ci`.
- [ ] 1.3 Auditar arquivos `.py`, referências, scripts, dependências e workflows existentes sem executar Python desconhecido; registrar classificação, decisão e limitações em `docs/tcc/python-artifacts.md` e conferir que a aplicação não depende funcionalmente de Python.

## 2. Inicialização da aplicação

- [ ] 2.1 Criar a estrutura monolítica CommonJS, scripts e dependências permitidas para Express, EJS, better-sqlite3, dotenv, helmet, nodemon, Supertest, ESLint e Prettier; verificar `npm ci` e os comandos declarados no `package.json`.
- [ ] 2.2 Configurar ambiente e proteção HTTP básica sem autenticação, mantendo banco local fora do versionamento; verificar configuração por inspeção e confirmar que o arquivo do banco não é rastreado.

## 3. Domínio e validação

- [ ] 3.1 Implementar a entidade `Appointment` com UUID string, normalização de nome/serviço, validação calendárica, horário `HH:mm`, observações opcionais até 500 caracteres e timestamps ISO 8601; escrever testes unitários antes do comportamento e registrar RED/GREEN/REFACTOR em `docs/tcc/tdd-cycles.csv`.
- [ ] 3.2 Implementar validação temporal em `America/Sao_Paulo` com relógio controlável, cobrindo minuto anterior, minuto corrente e consulta de registro histórico; comprovar os limites com testes determinísticos e registrar os ciclos TDD.

## 4. Persistência SQLite

- [ ] 4.1 Definir inicialização idempotente do diretório e tabela `appointments`, colunas contratuais e unicidade de data/horário; testar criação repetida e constraint em SQLite isolado (`:memory:`), sem acessar ou apagar o banco de desenvolvimento.
- [ ] 4.2 Implementar `SQLiteAppointmentRepository` conforme o contrato de repositório, usando parâmetros em consultas, ordenação cronológica, timestamps preservados e tradução de violação de unicidade para conflito; verificar create/find/list/update/delete e conflitos com testes de integração isolados.

## 5. Casos de uso

- [ ] 5.1 Implementar criação e atualização sobre abstração de repositório, verificando validação, horário passado, conflitos e exclusão do próprio ID na edição; cobrir RN-001 a RN-010 com testes unitários, incluindo que falhas não alteram registros existentes, e registrar os ciclos TDD.
- [ ] 5.2 Implementar consulta, listagem ordenada e exclusão por identificador; verificar registros existentes/inexistentes, ordenação e exclusão com testes unitários e registrar evidências TDD pertinentes.

## 6. Interface HTTP e páginas

- [ ] 6.1 Implementar as rotas HTML contratuais para listagem, criação, detalhes, edição e exclusão, mantendo controllers sem SQL ou regras de negócio; verificar rotas e redirecionamentos documentados com Supertest.
- [ ] 6.2 Criar páginas EJS e estilos responsivos para as operações, confirmação de exclusão, 404 e erro, com labels, foco visível e mensagens compreensíveis; verificar os fluxos de navegação e os requisitos acessíveis por testes HTTP e inspeção das páginas.
- [ ] 6.3 Mapear validação/inexistência/conflito/erro inesperado para HTTP 400/404/409/500 sem expor SQL, stack traces, caminhos internos ou credenciais; comprovar cada status e ausência de detalhes internos com Supertest.

## 7. Arquitetura e documentação de uso

- [ ] 7.1 Compor dependências em `src/main` e verificar a Dependency Rule por testes ou inspeção automatizada de imports proibidos, confirmando que Application e Domain não dependem de Express ou SQLite concreto.
- [ ] 7.2 Documentar instalação, configuração, inicialização, testes, cobertura e limites funcionais no README; executar os comandos documentados em ambiente limpo e confirmar que o banco de desenvolvimento permanece preservado.

## 8. Qualidade, CI e cobertura

- [ ] 8.1 Configurar ESLint, Prettier e cobertura nativa do Node.js para unitários, integração e HTTP; executar `npm run lint`, `npm run format:check` e `npm run test:coverage`, registrando versão Node, comando, SHA, escopo e linhas/branches/funções reais.
- [ ] 8.2 Criar workflow GitHub Actions com Node.js 24, `npm ci`, lint, formato e testes de cobertura; verificar sintaxe/configuração e associar o resultado executado ao SHA e run ID, sem considerar YAML isolado como CI aprovada.
- [ ] 8.3 Executar a validação integrada em banco isolado e confirmar RN-001–RN-010, RF-001–RF-004, rotas HTTP, arquitetura e preservação do banco local; registrar falhas, resultados e limitações com comando, ambiente, timestamp e SHA.

## 9. Rastreabilidade e evidências acadêmicas

- [ ] 9.1 Criar `docs/tcc/requirements-traceability.md` com uma linha para cada RN e RF e vínculos verificáveis entre specification, tarefa, implementação, teste, commit e resultado; manter referências ausentes como A DEFINIR ou NÃO VERIFICADO.
- [ ] 9.2 Manter `docs/tcc/tdd-cycles.csv` e os registros de eventos coerentes com a cronologia observada, distinguindo TDD de caracterização/regressão e sem inventar prompts, horários, autoria, commits ou resultados.
- [ ] 9.3 Registrar métricas M1–M8 com valor, unidade, fonte, período, evidência, completude e limitações; usar estados NÃO DISPONÍVEL/NÃO EXECUTADO quando aplicável e verificar que dados ausentes não foram convertidos em zero.
- [ ] 9.4 Avaliar os gates G1–G15 com evidências vinculadas ao baseline e ao SHA final; registrar como pendentes ou não verificados os critérios sem comprovação e revisar a reprodutibilidade sem presumir aprovação.
