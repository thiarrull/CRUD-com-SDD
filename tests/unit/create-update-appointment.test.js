const assert = require('node:assert/strict');
const { test } = require('node:test');

const AppointmentConflictError = require('../../src/application/errors/AppointmentConflictError');
const AppointmentNotFoundError = require('../../src/application/errors/AppointmentNotFoundError');
const CreateAppointment = require('../../src/application/use-cases/CreateAppointment');
const UpdateAppointment = require('../../src/application/use-cases/UpdateAppointment');

const now = new Date('2026-10-27T18:00:00.000Z');
const validInput = {
  clientName: 'Maria',
  service: 'Consulta',
  appointmentDate: '2026-10-28',
  appointmentTime: '14:30',
  notes: '',
};

class MemoryAppointmentRepository {
  appointments = new Map();
  createCount = 0;
  updateCount = 0;

  create(appointment) {
    this.createCount += 1;
    this.appointments.set(appointment.id, appointment);
    return appointment;
  }

  findById(id) {
    return this.appointments.get(id) ?? null;
  }

  findByDateAndTime(date, time) {
    return (
      [...this.appointments.values()].find(
        (appointment) =>
          appointment.appointmentDate === date &&
          appointment.appointmentTime === time,
      ) ?? null
    );
  }

  update(appointment) {
    this.updateCount += 1;
    if (!this.appointments.has(appointment.id)) {
      return null;
    }

    this.appointments.set(appointment.id, appointment);
    return appointment;
  }
}

function createExistingAppointment(repository, id, input = validInput) {
  const appointment = require('../../src/domain/Appointment').create(input, {
    id,
    now: new Date('2026-10-26T18:00:00.000Z'),
  });
  repository.appointments.set(id, appointment);
  return appointment;
}

test('creates a normalized appointment after validation and conflict checks', () => {
  const repository = new MemoryAppointmentRepository();
  const useCase = new CreateAppointment({
    appointmentRepository: repository,
    clock: () => now,
  });

  const appointment = useCase.execute({
    ...validInput,
    clientName: ' Maria ',
    service: ' Consulta ',
  });

  assert.equal(appointment.clientName, 'Maria');
  assert.equal(appointment.service, 'Consulta');
  assert.equal(repository.createCount, 1);
  assert.equal(repository.findById(appointment.id), appointment);
});

test('rejects a past appointment without persisting it', () => {
  const repository = new MemoryAppointmentRepository();
  const useCase = new CreateAppointment({
    appointmentRepository: repository,
    clock: () => now,
  });

  assert.throws(
    () =>
      useCase.execute({
        ...validInput,
        appointmentDate: '2026-10-27',
        appointmentTime: '14:59',
      }),
    { name: 'ValidationError' },
  );
  assert.equal(repository.createCount, 0);
});

test('rejects an occupied time and leaves the existing appointment unchanged', () => {
  const repository = new MemoryAppointmentRepository();
  const existing = createExistingAppointment(
    repository,
    '123e4567-e89b-42d3-a456-426614174000',
  );
  const useCase = new CreateAppointment({
    appointmentRepository: repository,
    clock: () => now,
  });

  assert.throws(() => useCase.execute(validInput), AppointmentConflictError);
  assert.equal(repository.createCount, 0);
  assert.equal(repository.findById(existing.id), existing);
});

test('updates the same appointment without a false self-conflict', () => {
  const repository = new MemoryAppointmentRepository();
  const existing = createExistingAppointment(
    repository,
    '123e4567-e89b-42d3-a456-426614174001',
  );
  const updateTime = new Date('2026-10-27T18:01:00.000Z');
  const useCase = new UpdateAppointment({
    appointmentRepository: repository,
    clock: () => updateTime,
  });

  const updated = useCase.execute(existing.id, {
    ...validInput,
    clientName: ' Maria Atualizada ',
  });

  assert.equal(updated.id, existing.id);
  assert.equal(updated.clientName, 'Maria Atualizada');
  assert.equal(updated.createdAt, existing.createdAt);
  assert.equal(updated.updatedAt, updateTime.toISOString());
  assert.equal(repository.updateCount, 1);
});

test('rejects an update to another appointment time without changing either record', () => {
  const repository = new MemoryAppointmentRepository();
  const first = createExistingAppointment(
    repository,
    '123e4567-e89b-42d3-a456-426614174002',
    { ...validInput, appointmentTime: '14:00' },
  );
  const second = createExistingAppointment(
    repository,
    '123e4567-e89b-42d3-a456-426614174003',
    { ...validInput, appointmentTime: '15:00' },
  );
  const useCase = new UpdateAppointment({
    appointmentRepository: repository,
    clock: () => now,
  });

  assert.throws(
    () =>
      useCase.execute(first.id, {
        ...validInput,
        appointmentTime: '15:00',
      }),
    AppointmentConflictError,
  );
  assert.equal(repository.updateCount, 0);
  assert.equal(repository.findById(first.id), first);
  assert.equal(repository.findById(second.id), second);
});

test('rejects updating a missing appointment', () => {
  const useCase = new UpdateAppointment({
    appointmentRepository: new MemoryAppointmentRepository(),
    clock: () => now,
  });

  assert.throws(
    () => useCase.execute('123e4567-e89b-42d3-a456-426614174099', validInput),
    AppointmentNotFoundError,
  );
});
