const { test } = require('node:test');
const request = require('supertest');

const AppointmentConflictError = require('../../src/application/errors/AppointmentConflictError');
const AppointmentNotFoundError = require('../../src/application/errors/AppointmentNotFoundError');
const ValidationError = require('../../src/domain/errors/ValidationError');
const AppointmentsController = require('../../src/presentation/controllers/AppointmentsController');
const createApp = require('../../src/main/app');
const createAppointmentsRouter = require('../../src/presentation/routes/appointments');

function createFailingApp(error) {
  const failingUseCase = {
    execute: () => {
      throw error;
    },
  };
  const controller = new AppointmentsController({
    createAppointment: failingUseCase,
    getAppointment: failingUseCase,
    listAppointments: failingUseCase,
    updateAppointment: failingUseCase,
    deleteAppointment: failingUseCase,
  });

  return createApp(createAppointmentsRouter(controller));
}

test('renders a safe 404 page for an unknown route', async () => {
  await request(createFailingApp(new Error('unused')))
    .get('/missing-page')
    .expect(404)
    .expect(/Página não encontrada/)
    .expect((response) => {
      if (response.text.includes('unused')) {
        throw new Error('Unexpected internal error text in 404 response');
      }
    });
});

test('maps validation, not-found, and conflict errors to safe HTTP responses', async () => {
  await request(
    createFailingApp(
      new ValidationError('clientName is required', 'clientName'),
    ),
  )
    .post('/appointments')
    .type('form')
    .send({})
    .expect(400)
    .expect(/Verifique os dados informados/)
    .expect((response) => {
      if (response.text.includes('clientName is required')) {
        throw new Error('Unexpected validation detail in response');
      }
    });

  await request(createFailingApp(new AppointmentNotFoundError('private-id')))
    .get('/appointments/private-id')
    .expect(404)
    .expect(/Agendamento não encontrado/)
    .expect((response) => {
      if (response.text.includes('private-id')) {
        throw new Error('Unexpected identifier in response');
      }
    });

  await request(
    createFailingApp(new AppointmentConflictError('2030-11-10', '14:30')),
  )
    .post('/appointments')
    .type('form')
    .send({})
    .expect(409)
    .expect(/horário já está ocupado/);
});

test('renders a generic 500 page without leaking unexpected error details', async () => {
  await request(
    createFailingApp(
      new Error('SELECT * FROM appointments at /private/database'),
    ),
  )
    .post('/appointments')
    .type('form')
    .send({})
    .expect(500)
    .expect(/erro inesperado/)
    .expect((response) => {
      if (/SELECT \*|appointments at|\/private\/database/.test(response.text)) {
        throw new Error('Unexpected internal error details in response');
      }
    });
});
