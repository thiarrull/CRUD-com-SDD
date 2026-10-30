const AppointmentConflictError = require('../../application/errors/AppointmentConflictError');
const AppointmentNotFoundError = require('../../application/errors/AppointmentNotFoundError');
const ValidationError = require('../../domain/errors/ValidationError');

function handleHttpError(error, _request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ValidationError) {
    return response.status(400).render('errors/request', {
      message:
        'Não foi possível salvar. Verifique os dados informados e tente novamente.',
      title: 'Dados inválidos',
    });
  }

  if (error instanceof AppointmentNotFoundError) {
    return response.status(404).render('errors/404', {
      message: 'Agendamento não encontrado.',
    });
  }

  if (error instanceof AppointmentConflictError) {
    return response.status(409).render('errors/request', {
      message: 'Esse horário já está ocupado. Escolha outra data ou horário.',
      title: 'Horário indisponível',
    });
  }

  console.error(error);
  return response.status(500).render('errors/500', {
    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
  });
}

module.exports = handleHttpError;
