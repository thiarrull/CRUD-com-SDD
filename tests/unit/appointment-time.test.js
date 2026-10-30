const assert = require('node:assert/strict');
const { test } = require('node:test');

const assertAppointmentIsNotPast = require('../../src/application/appointments/assertAppointmentIsNotPast');

test('rejects a minute before the current time in Sao Paulo', () => {
  const now = new Date('2026-10-27T18:00:00.000Z');

  assert.throws(
    () =>
      assertAppointmentIsNotPast(
        { appointmentDate: '2026-10-27', appointmentTime: '14:59' },
        now,
      ),
    { name: 'ValidationError' },
  );
});

test('allows the current minute and a later appointment', () => {
  const now = new Date('2026-10-27T18:00:00.000Z');

  assert.doesNotThrow(() =>
    assertAppointmentIsNotPast(
      { appointmentDate: '2026-10-27', appointmentTime: '15:00' },
      now,
    ),
  );
  assert.doesNotThrow(() =>
    assertAppointmentIsNotPast(
      { appointmentDate: '2026-10-27', appointmentTime: '15:01' },
      now,
    ),
  );
});

test('compares dates and times across the Sao Paulo local day boundary', () => {
  const now = new Date('2026-10-28T02:59:00.000Z');

  assert.doesNotThrow(() =>
    assertAppointmentIsNotPast(
      { appointmentDate: '2026-10-27', appointmentTime: '23:59' },
      now,
    ),
  );
  assert.doesNotThrow(() =>
    assertAppointmentIsNotPast(
      { appointmentDate: '2026-10-28', appointmentTime: '00:00' },
      now,
    ),
  );
  assert.throws(
    () =>
      assertAppointmentIsNotPast(
        { appointmentDate: '2026-10-27', appointmentTime: '23:58' },
        now,
      ),
    { name: 'ValidationError' },
  );
});

test('rejects an appointment on a previous local date', () => {
  assert.throws(
    () =>
      assertAppointmentIsNotPast(
        { appointmentDate: '2026-10-26', appointmentTime: '23:59' },
        new Date('2026-10-27T18:00:00.000Z'),
      ),
    { name: 'ValidationError' },
  );
});
