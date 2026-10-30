class AppointmentNotFoundError extends Error {
  constructor(id) {
    super('Appointment was not found');
    this.name = 'AppointmentNotFoundError';
    this.id = id;
  }
}

module.exports = AppointmentNotFoundError;
