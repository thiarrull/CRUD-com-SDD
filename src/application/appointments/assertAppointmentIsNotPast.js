const ValidationError = require('../../domain/errors/ValidationError');

const timeFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function localMinute(date) {
  const parts = Object.fromEntries(
    timeFormatter
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

function assertAppointmentIsNotPast(appointment, now = new Date()) {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
    throw new ValidationError('now must be a valid Date', 'now');
  }

  if (
    !appointment ||
    typeof appointment.appointmentDate !== 'string' ||
    typeof appointment.appointmentTime !== 'string'
  ) {
    throw new ValidationError('appointment date and time are required');
  }

  const appointmentMinute = `${appointment.appointmentDate}T${appointment.appointmentTime}`;
  if (appointmentMinute < localMinute(now)) {
    throw new ValidationError(
      'appointment cannot be scheduled in the past',
      'appointmentDate',
    );
  }
}

module.exports = assertAppointmentIsNotPast;
