const assert = require('node:assert/strict');
const { test } = require('node:test');

const Appointment = require('../../src/domain/Appointment');

const validInput = {
  clientName: 'Maria',
  service: 'Consulta',
  appointmentDate: '2028-02-29',
  appointmentTime: '14:30',
};

const fixedNow = new Date('2026-10-29T18:00:00.000Z');

test('creates an appointment with normalized required fields and UUID', () => {
  const appointment = Appointment.create(
    {
      ...validInput,
      clientName: ' Maria ',
      service: ' Consulta ',
    },
    { now: fixedNow },
  );

  assert.equal(appointment.clientName, 'Maria');
  assert.equal(appointment.service, 'Consulta');
  assert.match(
    appointment.id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
  assert.equal(appointment.notes, '');
  assert.equal(appointment.createdAt, fixedNow.toISOString());
  assert.equal(appointment.updatedAt, fixedNow.toISOString());
});

test('rejects invalid UUIDs and non-object input', () => {
  assert.throws(
    () => Appointment.create(validInput, { id: 'not-a-uuid', now: fixedNow }),
    { name: 'ValidationError' },
  );
  assert.throws(() => Appointment.create(null, { now: fixedNow }), {
    name: 'ValidationError',
  });
});

test('rejects a missing or blank client name or service', () => {
  for (const patch of [
    { clientName: '' },
    { clientName: '   ' },
    { clientName: undefined },
    { service: '' },
    { service: '   ' },
    { service: undefined },
  ]) {
    assert.throws(
      () => Appointment.create({ ...validInput, ...patch }, { now: fixedNow }),
      { name: 'ValidationError' },
    );
  }
});

test('accepts a real leap day and rejects impossible or non-ISO dates', () => {
  assert.equal(
    Appointment.create(validInput, { now: fixedNow }).appointmentDate,
    '2028-02-29',
  );

  for (const appointmentDate of ['2026-02-30', '30/10/2026', '2028-2-29']) {
    assert.throws(
      () =>
        Appointment.create(
          { ...validInput, appointmentDate },
          { now: fixedNow },
        ),
      { name: 'ValidationError' },
    );
  }
});

test('accepts valid HH:mm and rejects malformed or out-of-range times', () => {
  assert.equal(
    Appointment.create(validInput, { now: fixedNow }).appointmentTime,
    '14:30',
  );

  for (const appointmentTime of ['25:80', '9:00', '14:60', '']) {
    assert.throws(
      () =>
        Appointment.create(
          { ...validInput, appointmentTime },
          { now: fixedNow },
        ),
      { name: 'ValidationError' },
    );
  }
});

test('defaults notes to an empty string and enforces the 500-character limit', () => {
  assert.equal(Appointment.create(validInput, { now: fixedNow }).notes, '');
  assert.equal(
    Appointment.create(
      { ...validInput, notes: 'a'.repeat(500) },
      { now: fixedNow },
    ).notes.length,
    500,
  );
  assert.throws(
    () =>
      Appointment.create(
        { ...validInput, notes: 'a'.repeat(501) },
        { now: fixedNow },
      ),
    { name: 'ValidationError' },
  );
});
