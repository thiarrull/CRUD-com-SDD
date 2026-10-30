const { test } = require('node:test');
const request = require('supertest');

const AppointmentsController = require('../../src/presentation/controllers/AppointmentsController');
const createApp = require('../../src/main/app');
const createAppointmentsRouter = require('../../src/presentation/routes/appointments');

const appointment = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  clientName: 'Maria Silva',
  service: 'Consulta',
  appointmentDate: '2030-11-10',
  appointmentTime: '14:30',
  notes: 'Levar exames',
};

function createTestApp(appointments = [appointment]) {
  const controller = new AppointmentsController({
    createAppointment: { execute: () => appointment },
    getAppointment: { execute: () => appointment },
    listAppointments: { execute: () => appointments },
    updateAppointment: { execute: () => appointment },
    deleteAppointment: { execute: () => undefined },
  });

  return createApp(createAppointmentsRouter(controller));
}

test('renders appointment list, including its empty state', async () => {
  const app = createTestApp();

  await request(app)
    .get('/appointments')
    .expect(200)
    .expect(/Maria Silva/)
    .expect(/Criar agendamento/);

  await request(createTestApp([]))
    .get('/appointments')
    .expect(200)
    .expect(/Nenhum agendamento cadastrado/);
});

test('renders create, details, edit, and delete confirmation pages', async () => {
  const app = createTestApp();

  await request(app)
    .get('/appointments/new')
    .expect(200)
    .expect(/for="clientName"/)
    .expect(/action="\/appointments"/);

  await request(app)
    .get(`/appointments/${appointment.id}`)
    .expect(200)
    .expect(/Maria Silva/)
    .expect(/Levar exames/);

  await request(app)
    .get(`/appointments/${appointment.id}/edit`)
    .expect(200)
    .expect(/for="appointmentDate"/)
    .expect(new RegExp(`action="/appointments/${appointment.id}/update"`));

  await request(app)
    .get(`/appointments/${appointment.id}/delete`)
    .expect(200)
    .expect(/Confirmar exclusão/)
    .expect(new RegExp(`action="/appointments/${appointment.id}/delete"`));
});

test('serves responsive styles with a visible keyboard focus indicator', async () => {
  await request(createTestApp())
    .get('/styles.css')
    .expect(200)
    .expect('Content-Type', /text\/css/)
    .expect(/:focus-visible/)
    .expect(/@media \(max-width: 640px\)/);
});
