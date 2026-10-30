# Evidências de qualidade e validação integrada

## Identificação

- Repositório: `thiarrull/CRUD-com-SDD`.
- Branch: `feature/sistema-agendamentos-ct-open-001`.
- Baseline: `7a6f66dc899d9475c7e8dc207087a2ceaa055faf`.
- Commit validado pela CI: `a1c6b2e839290db29281effdcc2d4ca04aa923ae`.
- Runtime local: Node.js `v24.22.2`.
- Runtime CI: Node.js `v24.22.1`, npm `11.19.1`.
- Banco local `data/appointments.db`: ausente na inspeção local; os testes de integração/composição usam SQLite em memória ou arquivo temporário isolado.

## Validações locais

Os comandos foram executados em 2026-10-29 sobre o conteúdo que foi então commitado no SHA acima. No momento da execução, o HEAD ainda era o baseline, portanto a evidência local não foi originalmente observada sob esse SHA; a validação associada diretamente ao commit é o workflow GitHub Actions abaixo.

| Timestamp (UTC−03:00) | Comando | Resultado |
|---|---|---|
| 2026-10-29T22:11:02-03:00 | `npm run lint` | PASS; ESLint sem erros. |
| 2026-10-29T22:10:56-03:00 | `npm run format:check` | PASS; todos os arquivos aplicáveis passam. |
| 2026-10-29T22:11:00-03:00 | `npm run test:coverage` | PASS; 40 testes, 0 falhas. |
| 2026-10-29T22:13:55-03:00 | `npm test` | PASS; 40 testes, 0 falhas. |
| 2026-10-29T22:07–22:09-03:00 | Inicialização com `DATABASE_PATH=:memory:` e requisições HTTP locais | Raiz respondeu 302 para `/appointments`; listagem respondeu 200; nenhum arquivo `:memory:` foi criado após corrigir o tratamento do caminho. |

## GitHub Actions

- Estado: `SUCCESS`.
- Workflow: `Appointments CI`.
- Evento: `push`.
- SHA: `a1c6b2e839290db29281effdcc2d4ca04aa923ae`.
- Run ID: `40991500490`.
- URL: https://github.com/thiarrull/CRUD-com-SDD/actions/runs/40991500490
- Horário de início: `2026-10-30T02:24:29Z`.
- Horário de conclusão: `2026-10-30T02:24:55Z`.
- Job: `quality` — sucesso.
- Etapas: checkout, setup Node.js 24, `npm ci`, lint, verificação de formato e testes com cobertura — todas aprovadas.
- Testes: 40 executados, 40 aprovados, 0 falhas.
- Cobertura reportada no CI: linhas 93,53%; branches 91,04%; funções 90,63%.

O runner reportou avisos de depreciação do runtime Node.js 20 usado internamente pelas actions `checkout@v4` e `setup-node@v4`, que foram executadas sob Node.js 24. Também informou uma futura migração do rótulo `ubuntu-latest`. Esses avisos não alteraram o resultado SUCCESS desta execução e devem ser reavaliados em manutenção futura.

## Escopo integrado verificado

A composição real `src/main/createApplication.js` foi exercitada por Supertest com SQLite `:memory:`: criação, leitura, atualização e exclusão. As suítes adicionais verificam validação e conflito, ordenação e persistência, respostas HTTP 400/404/409/500 sem detalhes internos, páginas de operação e a regra de dependências entre Domain/Application e Express/SQLite.

## Limitações e estado da evidência

O run do GitHub Actions é evidência verificável vinculada ao commit; não equivale a homologação do produto nem a aprovação acadêmica dos gates. A execução local de `npm run start` foi feita com banco em memória, não com dados de produção. O banco de desenvolvimento não foi criado nem apagado por estas validações. Métricas que dependem de exportações completas de sessões, registro de defeitos ou identificação de intervenções permanecem indisponíveis ou parciais em `metrics-m1-m8.md`.
