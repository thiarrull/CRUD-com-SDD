const assert = require('node:assert/strict');
const { test } = require('node:test');

const Appointment = require('../../src/domain/Appointment');
const AppointmentConflictError = require('../../src/application/errors/AppointmentConflictError');
const openDatabase = require('../../src/infrastructure/database/openDatabase');
const SQLiteAppointmentRepository = require('../../src/infrastructure/repositories/SQLiteAppointmentRepository');

const createdAt = new Date('2026-10-29T18:00:00.000Z');

function createAppointment(id, appointmentDate, appointmentTime, patch = {}) {
  return Appointment.create(
    {
      clientName: "O'Connor",
      service: 'Consulta',
      appointmentDate,
      appointmentTime,
      ...patch,
    },
    { id, now: createdAt },
  );
}

function createRepository(t) {
  const database = openDatabase(':memory:');
  t.after(() => database.close());
  return new SQLiteAppointmentRepository(database);
}

test('creates and finds appointments using parameterized values', (t) => {
  const repository = createRepository(t);
  const appointment = createAppointment(
    '123e4567-e89b-42d3-a456-426614174000',
    '2026-11-10',
    '14:00',
  );

  repository.create(appointment);

  assert.deepEqual(repository.findById(appointment.id), appointment);
  assert.equal(
    repository.findById('123e4567-e89b-42d3-a456-426614174099'),
    null,
  );
});

test('lists appointments in chronological date and time order', (t) => {
  const repository = createRepository(t);
  const later = createAppointment(
    '123e4567-e89b-42d3-a456-426614174001',
    '2026-11-11',
    '09:00',
  );
  const sameDateLater = createAppointment(
    '123e4567-e89b-42d3-a456-426614174002',
    '2026-11-10',
    '15:00',
  );
  const earlier = createAppointment(
    '123e4567-e89b-42d3-a456-426614174003',
    '2026-11-10',
    '09:00',
  );

  repository.create(later);
  repository.create(sameDateLater);
  repository.create(earlier);

  assert.deepEqual(
    repository.findAll().map(({ id }) => id),
    [earlier.id, sameDateLater.id, later.id],
  );
});

test('finds an occupied date and time', (t) => {
  const repository = createRepository(t);
  const appointment = createAppointment(
    '123e4567-e89b-42d3-a456-426614174004',
    '2026-11-10',
    '14:00',
  );

  repository.create(appointment);

  assert.deepEqual(
    repository.findByDateAndTime('2026-11-10', '14:00'),
    appointment,
  );
  assert.equal(repository.findByDateAndTime('2026-11-10', '15:00'), null);
});

test('updates fields without changing the original creation timestamp', (t) => {
  const repository = createRepository(t);
  const appointment = createAppointment(
    '123e4567-e89b-42d3-a456-426614174005',
    '2026-11-10',
    '14:00',
  );
  repository.create(appointment);
  const updatedAt = new Date('2026-10-29T19:00:00.000Z').toISOString();
  const updated = new Appointment({
    ...appointment,
    clientName: 'Maria',
    createdAt: appointment.createdAt,
    updatedAt,
  });

  repository.update(updated);

  assert.deepEqual(repository.findById(appointment.id), updated);
});

test('translates SQLite unique-slot failures into appointment conflicts', (t) => {
  const repository = createRepository(t);
  repository.create(
    createAppointment(
      '123e4567-e89b-42d3-a456-426614174006',
      '2026-11-10',
      '14:00',
    ),
  );

  assert.throws(
    () =>
      repository.create(
        createAppointment(
          '123e4567-e89b-42d3-a456-426614174007',
          '2026-11-10',
          '14:00',
        ),
      ),
    AppointmentConflictError,
  );
});

test('deletes an appointment by ID', (t) => {
  const repository = createRepository(t);
  const appointment = createAppointment(
    '123e4567-e89b-42d3-a456-426614174008',
    '2026-11-10',
    '14:00',
  );
  repository.create(appointment);

  assert.equal(repository.deleteById(appointment.id), true);
  assert.equal(repository.deleteById(appointment.id), false);
  assert.equal(repository.findById(appointment.id), null);
});
