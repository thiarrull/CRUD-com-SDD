# Evidências de qualidade

## Contexto da execução

- Runtime: Node.js `v24.22.2`.
- Branch: `main`.
- `HEAD` observado: `7a6f66dc899d9475c7e8dc207087a2ceaa055faf` (commit de baseline).
- Estado do worktree: alterações de implementação não commitadas.
- SHA da implementação testada: NÃO DISPONÍVEL. O SHA de `HEAD` não representa as alterações presentes no worktree e não é atribuído como SHA dos resultados.
- Banco de desenvolvimento `data/appointments.db`: ausente durante a verificação.

## Comandos

| Timestamp (UTC−03:00) | Comando | Resultado |
|---|---|---|
| 2026-10-29T22:11:02-03:00 | `npm run lint` | PASS; ESLint sem erros. |
| 2026-10-29T22:10:56-03:00 | `npm run format:check` | PASS; todos os arquivos suportados e não ignorados seguem Prettier. |
| 2026-10-29T22:11:00-03:00 | `npm run test:coverage` | PASS; 40 testes, 0 falhas. |
| 2026-10-29T22:13:55-03:00 | `npm test` | PASS; 40 testes, 0 falhas. |

## Cobertura observada

Saída do `node --test --experimental-test-coverage` no escopo de `src`:

| Linhas | Branches | Funções |
|---:|---:|---:|
| 93,53% | 91,04% | 90,63% |

Escopo: testes unitários, integração SQLite, HTTP e arquitetura. Os percentuais descrevem a saída desta execução local; não são limiares de aprovação nem resultado de CI.

## Limitações

Os comandos foram executados localmente sobre um worktree com alterações ainda não commitadas. Portanto, estes resultados não estão vinculados a um commit da implementação nem comprovam execução de CI, homologação ou aprovação dos gates acadêmicos. O teste de inicialização foi feito com `DATABASE_PATH=:memory:`; não houve criação nem modificação do banco local.
