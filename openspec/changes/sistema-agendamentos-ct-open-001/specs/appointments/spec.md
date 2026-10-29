# Spec Delta

## Purpose

Permite que pessoas gerenciem agendamentos por uma interface web simples, com validação consistente, prevenção de horários inválidos ou conflitantes e consulta confiável dos registros.

## ADDED Requirements

### Requirement: Agendamento contém dados válidos do cliente e serviço
O sistema MUST exigir nome do cliente e serviço não vazios após remover espaços nas extremidades, e MUST persistir os valores normalizados.

#### Scenario: Normalizar nome e serviço
- **WHEN** a pessoa envia nome " Maria " e serviço " Consulta "
- **THEN** o agendamento é salvo com nome "Maria" e serviço "Consulta"

#### Scenario: Rejeitar nome ou serviço vazio
- **WHEN** nome ou serviço está ausente ou contém somente espaços
- **THEN** o sistema rejeita a operação como erro de validação e não cria ou altera registros

### Requirement: Agendamento requer uma data de calendário válida
O sistema MUST exigir data no formato `YYYY-MM-DD` que corresponda a uma data existente no calendário.

#### Scenario: Aceitar data bissexta válida
- **WHEN** a data informada é `2028-02-29`
- **THEN** o sistema aceita a data se as demais regras forem atendidas

#### Scenario: Rejeitar data impossível ou formato diferente
- **WHEN** a data é `2026-02-30` ou não está no formato `YYYY-MM-DD`
- **THEN** o sistema rejeita a operação como erro de validação

### Requirement: Agendamento requer horário válido
O sistema MUST exigir horário no formato `HH:mm`, com hora entre `00` e `23` e minuto entre `00` e `59`.

#### Scenario: Aceitar horário válido
- **WHEN** o horário informado é `14:30`
- **THEN** o sistema aceita o horário se as demais regras forem atendidas

#### Scenario: Rejeitar horário fora dos limites
- **WHEN** o horário informado é `25:80` ou não corresponde ao formato `HH:mm`
- **THEN** o sistema rejeita a operação como erro de validação

### Requirement: Agendamentos não podem estar no passado
O sistema MUST rejeitar criação ou atualização para uma combinação de data e horário anterior ao minuto corrente em `America/Sao_Paulo`; o minuto corrente não é passado para esta regra.

#### Scenario: Rejeitar minuto anterior ao atual
- **WHEN** o horário corrente é 27/10/2026 às 15:00 e uma criação ou atualização solicita 14:59 do mesmo dia
- **THEN** o sistema rejeita a operação como erro de validação

#### Scenario: Permitir o minuto corrente
- **WHEN** o horário corrente é 27/10/2026 às 15:00 e uma criação ou atualização solicita 15:00 do mesmo dia
- **THEN** o sistema não rejeita a operação exclusivamente por essa regra

#### Scenario: Consultar agendamento histórico
- **WHEN** um agendamento existente está no passado e é consultado
- **THEN** o sistema mantém o registro disponível para consulta

### Requirement: Horário de agendamento é único
O sistema MUST impedir que dois agendamentos persistidos ocupem a mesma data e horário e MUST preservar os registros existentes quando uma operação conflita.

#### Scenario: Rejeitar criação de horário ocupado
- **WHEN** já existe um agendamento em 10/11/2026 às 14:00 e é solicitada outra criação para a mesma combinação
- **THEN** a operação é rejeitada como conflito e o agendamento existente permanece inalterado

### Requirement: Edição não conflita com o próprio agendamento
Ao atualizar um agendamento, o sistema MUST ignorar seu próprio identificador na verificação de horário e MUST rejeitar ocupação por outro registro sem alterar nenhum dos registros.

#### Scenario: Manter o horário do próprio registro
- **WHEN** um agendamento é atualizado mantendo sua data e horário válidos
- **THEN** o sistema não acusa conflito com o próprio agendamento

#### Scenario: Rejeitar horário de outro registro
- **WHEN** a atualização solicita a data e horário já ocupados por outro agendamento
- **THEN** a operação é rejeitada como conflito e ambos os registros permanecem inalterados

### Requirement: Observações são opcionais e limitadas
O sistema MUST aceitar observações omitidas como string vazia e MUST rejeitar observações com mais de 500 caracteres.

#### Scenario: Criar sem observações
- **WHEN** a pessoa cria um agendamento sem informar observações
- **THEN** o registro contém observações vazias

#### Scenario: Rejeitar observações acima do limite
- **WHEN** as observações excedem 500 caracteres
- **THEN** o sistema rejeita a operação como erro de validação

### Requirement: Agendamentos são listados em ordem cronológica
O sistema MUST listar os agendamentos por data crescente e, para datas iguais, por horário crescente.

#### Scenario: Ordenar registros fora de ordem de inserção
- **WHEN** existem agendamentos inseridos fora da ordem cronológica
- **THEN** a listagem apresenta primeiro a data mais antiga e ordena horários crescentes dentro da mesma data

### Requirement: Agendamento existente pode ser consultado por identificador
O sistema MUST permitir consultar um agendamento pelo seu identificador e MUST informar inexistência quando não houver registro correspondente.

#### Scenario: Consultar agendamento existente
- **WHEN** é solicitada a consulta por um identificador existente
- **THEN** o sistema apresenta os dados daquele agendamento

#### Scenario: Consultar identificador inexistente
- **WHEN** é solicitada a consulta por um identificador sem registro correspondente
- **THEN** o sistema informa que o agendamento não foi encontrado

### Requirement: Agendamento existente pode ser atualizado
O sistema MUST permitir atualizar os dados de um agendamento existente, sujeitando os novos dados às mesmas regras de validação e conflito da criação.

#### Scenario: Atualizar dados válidos
- **WHEN** são enviados dados válidos para um agendamento existente e não há conflito
- **THEN** o sistema persiste os novos dados e mantém o identificador do registro

### Requirement: Agendamento existente pode ser excluído
O sistema MUST permitir excluir um agendamento existente e, após a exclusão, tratá-lo como inexistente.

#### Scenario: Excluir e consultar
- **WHEN** um agendamento existente é excluído e depois consultado pelo mesmo identificador
- **THEN** a consulta informa que o agendamento não foi encontrado

### Requirement: Agendamento possui identificador UUID
O sistema MUST atribuir a cada agendamento um identificador único representado como string UUID.

#### Scenario: Criar agendamento com identificador
- **WHEN** um novo agendamento é persistido
- **THEN** ele recebe um identificador UUID que o distingue dos demais registros

### Requirement: Timestamps representam criação e atualização
O sistema MUST registrar `createdAt` e `updatedAt` em formato ISO 8601 na criação; em uma atualização persistida MUST preservar `createdAt` e atualizar `updatedAt`.

#### Scenario: Preservar criação ao editar
- **WHEN** um agendamento é atualizado com sucesso
- **THEN** `createdAt` mantém seu valor original e `updatedAt` reflete a atualização

### Requirement: Interface web disponibiliza operações de agendamento
O sistema MUST oferecer páginas para listagem, criação, detalhes, edição e confirmação de exclusão, com formulários e mensagens compreensíveis, rótulos associados aos campos e foco visível.

#### Scenario: Acessar páginas de gerenciamento
- **WHEN** a pessoa acessa a listagem, formulário de criação, detalhes ou edição de um agendamento
- **THEN** a interface apresenta a página correspondente e permite a operação disponível naquela página

#### Scenario: Abrir a página inicial
- **WHEN** a pessoa acessa `/`
- **THEN** o sistema redireciona para a listagem de agendamentos

### Requirement: Erros HTTP comunicam o resultado sem expor detalhes internos
O sistema MUST responder com HTTP 400 para erro de validação, 404 para agendamento inexistente, 409 para conflito e 500 para erro inesperado, sem revelar SQL, stack traces, caminhos internos, credenciais ou dados sensíveis.

#### Scenario: Mapear validação, inexistência e conflito
- **WHEN** uma operação HTTP resulta em erro de validação, agendamento inexistente ou conflito
- **THEN** a resposta usa, respectivamente, HTTP 400, 404 ou 409 e comunica o erro sem detalhes internos

#### Scenario: Tratar erro inesperado
- **WHEN** ocorre erro inesperado durante uma operação HTTP
- **THEN** a resposta usa HTTP 500 sem expor SQL, stack trace, caminhos internos, credenciais ou dados sensíveis
