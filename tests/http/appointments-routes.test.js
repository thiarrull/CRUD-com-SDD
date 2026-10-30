const assert = require('node:assert/strict');
const { test } = require('node:test');
const request = require('supertest');

const createApp = require('../../src/main/app');
const createAppointmentsRouter = require('../../src/presentation/routes/appointments');

test('redirects the root to the appointment list', async () => {
  const app = createApp(createAppointmentsRouter({}));

  await request(app).get('/').expect(302).expect('Location', '/appointments');
});

test('routes appointment pages and form submissions to their controllers', async () => {
  const calls = [];
  const controller = Object.fromEntries(
    [
      'list',
      'newForm',
      'create',
      'show',
      'editForm',
      'update',
      'confirmDelete',
      'remove',
    ].map((action) => [
      action,
      (req, res) => {
        calls.push({ action, id: req.params.id });
        if (action === 'create') {
          return res.redirect(303, '/appointments/new-id');
        }
        if (action === 'update') {
          return res.redirect(303, `/appointments/${req.params.id}`);
        }
        return res.sendStatus(204);
      },
    ]),
  );
  const app = createApp(createAppointmentsRouter(controller));

  await request(app).get('/appointments').expect(204);
  await request(app).get('/appointments/new').expect(204);
  await request(app)
    .post('/appointments')
    .type('form')
    .send({ clientName: 'Maria' })
    .expect(303)
    .expect('Location', '/appointments/new-id');
  await request(app).get('/appointments/appointment-id').expect(204);
  await request(app).get('/appointments/appointment-id/edit').expect(204);
  await request(app)
    .post('/appointments/appointment-id/update')
    .type('form')
    .send({ clientName: 'Maria' })
    .expect(303)
    .expect('Location', '/appointments/appointment-id');
  await request(app).get('/appointments/appointment-id/delete').expect(204);
  await request(app).post('/appointments/appointment-id/delete').expect(204);

  assert.deepEqual(
    calls.map(({ action }) => action),
    [
      'list',
      'newForm',
      'create',
      'show',
      'editForm',
      'update',
      'confirmDelete',
      'remove',
    ],
  );
  assert.equal(
    calls.find(({ action }) => action === 'show').id,
    'appointment-id',
  );
});
