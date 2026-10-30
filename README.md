# Sistema de Agendamentos

Aplicação web acadêmica do Cenário B, desenvolvida com Spec-Driven Development via OpenSpec e uma versão simplificada de Clean Architecture. O contrato funcional está descrito em `openspec.md`; as especificações de implementação ficam em `openspec/changes/sistema-agendamentos-ct-open-001/`.

## Requisitos

- Node.js 24.x e npm.
- Dependências disponíveis no registro npm para executar `npm ci`.

## Instalação e configuração

```sh
npm ci
cp .env.example .env
```

Edite `.env` se necessário. `PORT` define a porta HTTP e `DATABASE_PATH` define o arquivo SQLite; os valores padrão estão em `.env.example`. O diretório do banco é criado automaticamente. O arquivo de banco local não deve ser versionado.

## Inicialização

```sh
npm start
```

Acesse `http://localhost:3000`. Para desenvolvimento com reinicialização automática:

```sh
npm run dev
```

A aplicação permite listar, criar, consultar, editar e excluir agendamentos em `/appointments`. A raiz `/` redireciona para a listagem.

## Testes e qualidade

```sh
npm test
npm run test:coverage
npm run lint
npm run format:check
```

Os testes usam `node:test` e Supertest. Os testes de persistência e composição usam banco SQLite isolado em memória; não apagam nem substituem o banco de desenvolvimento.

## Organização

- `src/domain`: entidade e validações próprias do domínio.
- `src/application`: casos de uso, erros e contrato do repositório.
- `src/presentation`: controllers, rotas HTTP e tratamento de erros.
- `src/infrastructure`: adaptador SQLite e inicialização do schema.
- `src/main`: composição das dependências e inicialização do servidor.
- `views` e `public`: páginas EJS e estilos.
- `tests`: suítes unitárias, integração, HTTP e arquitetura.

## Limites

O escopo é um CRUD de agenda única sem autenticação, autorização, usuários, pagamentos, notificações, integrações de calendário ou implantação de produção. A existência desta documentação não declara homologação nem comprova resultados fora das execuções de teste registradas.
