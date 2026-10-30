const assert = require('node:assert/strict');
const { test } = require('node:test');

const Appointment = require('../../src/domain/Appointment');
const AppointmentNotFoundError = require('../../src/application/errors/AppointmentNotFoundError');
const GetAppointment = require('../../src/application/use-cases/GetAppointment');
const ListAppointments = require('../../src/application/use-cases/ListAppointments');
const DeleteAppointment = require('../../src/application/use-cases/DeleteAppointment');

class MemoryAppointmentRepository {
  constructor(appointments = []) {
    this.appointments = new Map(
      appointments.map((appointment) => [appointment.id, appointment]),
    );
  }

  findById(id) {
    return this.appointments.get(id) ?? null;
  }

  findAll() {
    return [...this.appointments.values()];
  }

  deleteById(id) {
    return this.appointments.delete(id);
  }
}

function appointment(id, appointmentDate) {
  return Appointment.create(
    {
      clientName: 'Maria',
      service: 'Consulta',
      appointmentDate,
      appointmentTime: '10:00',
    },
    { id, now: new Date('2026-10-29T18:00:00.000Z') },
  );
}

test('retrieves a historical appointment by ID', () => {
  const historical = appointment(
    '123e4567-e89b-42d3-a456-426614174000',
    '2020-01-01',
  );
  const useCase = new GetAppointment({
    appointmentRepository: new MemoryAppointmentRepository([historical]),
  });

  assert.deepEqual(useCase.execute(historical.id), historical);
});

test('reports an unknown appointment ID', () => {
  const useCase = new GetAppointment({
    appointmentRepository: new MemoryAppointmentRepository(),
  });

  assert.throws(
    () => useCase.execute('123e4567-e89b-42d3-a456-426614174099'),
    AppointmentNotFoundError,
  );
});

test('lists all appointments, including historical records', () => {
  const historical = appointment(
    '123e4567-e89b-42d3-a456-426614174001',
    '2020-01-01',
  );
  const future = appointment(
    '123e4567-e89b-42d3-a456-426614174002',
    '2028-01-01',
  );
  const useCase = new ListAppointments({
    appointmentRepository: new MemoryAppointmentRepository([
      historical,
      future,
    ]),
  });

  assert.deepEqual(useCase.execute(), [historical, future]);
});

test('deletes an existing appointment and reports it as missing afterward', () => {
  const existing = appointment(
    '123e4567-e89b-42d3-a456-426614174003',
    '2028-01-01',
  );
  const repository = new MemoryAppointmentRepository([existing]);
  const useCase = new DeleteAppointment({
    appointmentRepository: repository,
  });

  assert.deepEqual(useCase.execute(existing.id), existing);
  assert.equal(repository.findById(existing.id), null);
});

test('does not silently delete a missing appointment', () => {
  const useCase = new DeleteAppointment({
    appointmentRepository: new MemoryAppointmentRepository(),
  });

  assert.throws(
    () => useCase.execute('123e4567-e89b-42d3-a456-426614174099'),
    AppointmentNotFoundError,
  );
});
