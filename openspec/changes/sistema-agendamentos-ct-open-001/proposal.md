# Proposal

## Why

O Cenário B do TCC precisa de um sistema de agendamentos com comportamentos explícitos e verificáveis, de forma que sua implementação possa ser conduzida por especificações OpenSpec e comparada metodologicamente ao Cenário A. O contrato CT-OPEN-001 v1.0 propõe esses requisitos, mas o checkout contém apenas o contrato e a configuração OpenSpec, sem uma aplicação ou capabilities existentes; portanto, esta mudança estabelece a base funcional e técnica para uma nova implementação, sem afirmar conformidade ou resultados já verificados.

## What Changes

- Definir o CRUD HTML de agendamentos e as regras RN-001 a RN-010 e RF-001 a RF-004, incluindo validação, datas passadas, conflitos, ordenação e timestamps.
- Estabelecer a stack CommonJS/Node.js, Express, EJS, SQLite com better-sqlite3 e interface HTML/CSS/JavaScript puro, respeitando as exclusões tecnológicas do contrato.
- Orientar a aplicação monolítica pela Clean Architecture simplificada, com domínio e casos de uso independentes de HTTP e SQLite e dependências montadas no composition root.
- Especificar persistência SQLite, rotas e respostas HTTP, interface acessível e testes unitários, de integração e HTTP.
- Planejar evidências e validações do Cenário B — incluindo TDD, rastreabilidade, cobertura, CI, métricas M1–M8, preservação do baseline e auditoria de artefatos Python — sem presumir execução, métricas ou aprovação.
- Manter fora do escopo autenticação, autorização, usuários, múltiplas agendas, pagamentos, notificações, integrações de calendário, dashboards, microservices e publicação em produção.

## Capabilities

### New Capabilities

- `appointments`: CRUD de agendamentos, regras de negócio, consulta/listagem, interface HTTP renderizada e persistência conforme CT-OPEN-001.

### Modified Capabilities

Nenhuma. O inventário OpenSpec não contém capabilities existentes.

## Impact

A aplicação ainda não está presente no checkout; os caminhos e componentes previstos pelo contrato incluem `src/domain`, `src/application`, `src/presentation`, `src/infrastructure`, `src/main`, `tests`, `views`, `public`, `data` e `.github/workflows`. A implementação futura introduzirá os pacotes da stack aprovada, configuração e lockfile, schema SQLite, rotas HTML e testes. Os artefatos OpenSpec desta mudança registrarão requisitos e decisões; evidências acadêmicas e estados de validação deverão ser coletados durante a execução, não inferidos deste planejamento.
