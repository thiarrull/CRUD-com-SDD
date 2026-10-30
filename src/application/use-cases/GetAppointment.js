const AppointmentNotFoundError = require('../errors/AppointmentNotFoundError');

class GetAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id) {
    const appointment = this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    return appointment;
  }
}

module.exports = GetAppointment;
