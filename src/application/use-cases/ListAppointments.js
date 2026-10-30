class ListAppointments {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute() {
    return this.appointmentRepository.findAll();
  }
}

module.exports = ListAppointments;
