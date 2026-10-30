class AppointmentConflictError extends Error {
  constructor(appointmentDate, appointmentTime) {
    super('An appointment already exists at this date and time');
    this.name = 'AppointmentConflictError';
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
  }
}

module.exports = AppointmentConflictError;
