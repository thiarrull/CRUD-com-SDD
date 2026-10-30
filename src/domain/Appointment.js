const { randomUUID } = require('node:crypto');
const ValidationError = require('./errors/ValidationError');
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function requiredText(value, field) {
  if (typeof value !== 'string') {
    throw new ValidationError(`${field} is required`, field);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new ValidationError(`${field} is required`, field);
  }

  return normalized;
}

function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function requiredTimestamp(value, field) {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) {
    throw new ValidationError(`${field} must be an ISO 8601 timestamp`, field);
  }

  return value;
}

class Appointment {
  constructor({
    id,
    clientName,
    service,
    appointmentDate,
    appointmentTime,
    notes = '',
    createdAt,
    updatedAt,
  }) {
    if (typeof id !== 'string' || !UUID_PATTERN.test(id)) {
      throw new ValidationError('id must be a UUID', 'id');
    }

    this.id = id;
    this.clientName = requiredText(clientName, 'clientName');
    this.service = requiredText(service, 'service');

    if (!validDate(appointmentDate)) {
      throw new ValidationError(
        'appointmentDate must be a real date in YYYY-MM-DD format',
        'appointmentDate',
      );
    }

    if (
      typeof appointmentTime !== 'string' ||
      !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(appointmentTime)
    ) {
      throw new ValidationError(
        'appointmentTime must be a valid HH:mm time',
        'appointmentTime',
      );
    }

    if (typeof notes !== 'string' || notes.length > 500) {
      throw new ValidationError(
        'notes must be a string of at most 500 characters',
        'notes',
      );
    }

    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.notes = notes;
    this.createdAt = requiredTimestamp(createdAt, 'createdAt');
    this.updatedAt = requiredTimestamp(updatedAt, 'updatedAt');
  }

  static create(input, options = {}) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new ValidationError(
        'appointment data must be an object',
        'appointment',
      );
    }

    const { id = randomUUID(), now = new Date() } = options;
    if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
      throw new ValidationError('now must be a valid Date', 'now');
    }

    const timestamp = now.toISOString();
    return new Appointment({
      ...input,
      id,
      notes: input.notes === undefined ? '' : input.notes,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}

module.exports = Appointment;
