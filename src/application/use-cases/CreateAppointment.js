const AppointmentConflictError = require('../errors/AppointmentConflictError');
const Appointment = require('../../domain/Appointment');
const assertAppointmentIsNotPast = require('../appointments/assertAppointmentIsNotPast');

class CreateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  execute(input) {
    const now = this.clock();
    const appointment = Appointment.create(input, { now });
    assertAppointmentIsNotPast(appointment, now);

    const occupied = this.appointmentRepository.findByDateAndTime(
      appointment.appointmentDate,
      appointment.appointmentTime,
    );
    if (occupied) {
      throw new AppointmentConflictError(
        appointment.appointmentDate,
        appointment.appointmentTime,
      );
    }

    return this.appointmentRepository.create(appointment);
  }
}

module.exports = CreateAppointment;
