const AppointmentConflictError = require('../errors/AppointmentConflictError');
const AppointmentNotFoundError = require('../errors/AppointmentNotFoundError');
const ValidationError = require('../../domain/errors/ValidationError');
const Appointment = require('../../domain/Appointment');
const assertAppointmentIsNotPast = require('../appointments/assertAppointmentIsNotPast');

class UpdateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  execute(id, input) {
    const existing = this.appointmentRepository.findById(id);
    if (!existing) {
      throw new AppointmentNotFoundError(id);
    }

    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new ValidationError(
        'appointment data must be an object',
        'appointment',
      );
    }

    const now = this.clock();
    const appointment = new Appointment({
      ...existing,
      ...input,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: now.toISOString(),
    });
    assertAppointmentIsNotPast(appointment, now);

    const occupied = this.appointmentRepository.findByDateAndTime(
      appointment.appointmentDate,
      appointment.appointmentTime,
    );
    if (occupied && occupied.id !== existing.id) {
      throw new AppointmentConflictError(
        appointment.appointmentDate,
        appointment.appointmentTime,
      );
    }

    const updated = this.appointmentRepository.update(appointment);
    if (!updated) {
      throw new AppointmentNotFoundError(id);
    }

    return updated;
  }
}

module.exports = UpdateAppointment;
