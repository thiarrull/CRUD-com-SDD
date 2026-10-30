class AppointmentRepository {
  create() {
    throw new Error('AppointmentRepository.create must be implemented');
  }

  findById() {
    throw new Error('AppointmentRepository.findById must be implemented');
  }

  findAll() {
    throw new Error('AppointmentRepository.findAll must be implemented');
  }

  findByDateAndTime() {
    throw new Error(
      'AppointmentRepository.findByDateAndTime must be implemented',
    );
  }

  update() {
    throw new Error('AppointmentRepository.update must be implemented');
  }

  deleteById() {
    throw new Error('AppointmentRepository.deleteById must be implemented');
  }
}

module.exports = AppointmentRepository;
