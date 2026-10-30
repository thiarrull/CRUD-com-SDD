const assert = require('node:assert/strict');
const { test } = require('node:test');
const request = require('supertest');

const createApplication = require('../../src/main/createApplication');

function futureDate(daysAhead) {
  const date = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 10);
}

test('composes the real CRUD flow with an isolated in-memory database', async () => {
  const { app, database } = createApplication({ databasePath: ':memory:' });

  try {
    const created = await request(app)
      .post('/appointments')
      .type('form')
      .send({
        clientName: 'Maria Silva',
        service: 'Consulta',
        appointmentDate: futureDate(30),
        appointmentTime: '11:00',
        notes: '',
      })
      .expect(303);

    const detailPath = created.headers.location;
    assert.match(detailPath, /^\/appointments\/[0-9a-f-]+$/i);
    await request(app)
      .get(detailPath)
      .expect(200)
      .expect(/Maria Silva/);

    await request(app)
      .post(`${detailPath}/update`)
      .type('form')
      .send({
        clientName: 'Maria Silva',
        service: 'Retorno',
        appointmentDate: futureDate(31),
        appointmentTime: '11:30',
        notes: '',
      })
      .expect(303);
    await request(app)
      .get(detailPath)
      .expect(200)
      .expect(/Retorno/);

    await request(app)
      .post(`${detailPath}/delete`)
      .expect(303)
      .expect('Location', '/appointments');
    await request(app)
      .get('/appointments')
      .expect(200)
      .expect(/Nenhum agendamento cadastrado/);
  } finally {
    database.close();
  }
});
