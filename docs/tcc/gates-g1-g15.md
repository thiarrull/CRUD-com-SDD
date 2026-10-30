# Avaliação de evidências dos gates G1–G15

Projeto/Cenário B. Baseline: `7a6f66dc899d9475c7e8dc207087a2ceaa055faf`. Commit observado: `a1c6b2e839290db29281effdcc2d4ca04aa923ae`. A avaliação registra evidências, não concede homologação nem aprovação acadêmica.

| Gate | Critério | Estado da evidência | Referência / limitação |
|---|---|---|---|
| G1 | Baseline identificado e preservado | VERIFICADO | Baseline documentado; implementação preservada em commit descendente, sem reescrever histórico. |
| G2 | Stack conforme contrato | VERIFICADO | `package.json`, lockfile e workflow Node.js 24; `npm ci` executado localmente e no CI. |
| G3 | CRUD implementado | VERIFICADO | `tests/integration/application-composition.test.js`; 40 testes aprovados no CI. |
| G4 | RN-001 a RN-010 verificadas | EVIDÊNCIA REGISTRADA | Casos unitários/integrados listados em `requirements-traceability.md`; revisão de aceite independente ainda não registrada. |
| G5 | RF-001 a RF-004 verificadas | EVIDÊNCIA REGISTRADA | Matriz aponta testes unitários, integração e HTTP; validação funcional independente ainda não registrada. |
| G6 | Dependências arquiteturais analisadas | VERIFICADO | `tests/architecture/dependency-rule.test.js` aprovado no CI; Application e Domain não importam Express nem better-sqlite3. |
| G7 | TDD documentado | PARCIALMENTE VERIFICADO | Ciclos RED/GREEN observados em `tdd-cycles.csv`; páginas foram caracterizadas após implementação e alguns timestamps/sessões/SHAs históricos não estão disponíveis. |
| G8 | Testes executados com registros | VERIFICADO | CI run `40991500490`: 40 aprovados, 0 reprovados; evidência em `quality-checks.md`. |
| G9 | Cobertura registrada | VERIFICADO | 93,53% linhas, 91,04% branches e 90,63% funções no run; percentuais não representam qualidade por si. |
| G10 | Auditoria Python aplicável | VERIFICADO NO ESCOPO INSPECIONADO | `python-artifacts.md`; inspeção do checkout final não identificou arquivos `.py`. A conclusão limita-se ao repositório observado. |
| G11 | CI vinculada a SHA ou não verificada | VERIFICADO | Run SUCCESS `40991500490`, SHA e URL registrados em `metrics-m1-m8.md`. |
| G12 | M1–M8 medidas ou indisponíveis | VERIFICADO COMO REGISTRO | `metrics-m1-m8.md` especifica valor, unidade, fonte, período, evidência, completude e limitações; M1/M8 e parte de M2/M3 permanecem indisponíveis/parciais. |
| G13 | Matriz de rastreabilidade | VERIFICADO COMO ARTEFATO | `requirements-traceability.md` contém RN-001–RN-010 e RF-001–RF-004 com vínculos a tarefa, código, teste, resultado e commit. A matriz não é aprovação externa. |
| G14 | Reprodutibilidade avaliada | VERIFICADO COM LIMITES | `npm ci`, lint, formato e testes passaram no runner limpo do GitHub Actions; não houve homologação em outro sistema operacional ou ambiente de produção. |
| G15 | Integridade acadêmica preservada | PENDENTE DE AVALIAÇÃO ACADÊMICA | Dados ausentes são explicitados e o baseline preservado; aprovação institucional, autoria e comparação com o Cenário A não foram verificadas. |

Estados indicam apenas o nível de evidência observado. Nenhum gate fica aprovado apenas por constar nesta tabela.
