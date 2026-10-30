const AppointmentNotFoundError = require('../errors/AppointmentNotFoundError');

class DeleteAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id) {
    const appointment = this.appointmentRepository.findById(id);
    if (!appointment || !this.appointmentRepository.deleteById(id)) {
      throw new AppointmentNotFoundError(id);
    }

    return appointment;
  }
}

module.exports = DeleteAppointment;
