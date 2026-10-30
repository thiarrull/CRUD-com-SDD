const AppointmentConflictError = require('../../application/errors/AppointmentConflictError');
const AppointmentRepository = require('../../application/repositories/AppointmentRepository');
const Appointment = require('../../domain/Appointment');

function toAppointment(row) {
  if (!row) {
    return null;
  }

  return new Appointment({
    id: row.id,
    clientName: row.client_name,
    service: row.service,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

function appointmentParameters(appointment) {
  return {
    id: appointment.id,
    clientName: appointment.clientName,
    service: appointment.service,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    notes: appointment.notes,
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
  };
}

class SQLiteAppointmentRepository extends AppointmentRepository {
  constructor(database) {
    super();
    this.database = database;
    this.insertStatement = database.prepare(`
      INSERT INTO appointments (
        id, client_name, service, appointment_date, appointment_time,
        notes, created_at, updated_at
      ) VALUES (
        @id, @clientName, @service, @appointmentDate, @appointmentTime,
        @notes, @createdAt, @updatedAt
      )
    `);
    this.findByIdStatement = database.prepare(
      'SELECT * FROM appointments WHERE id = ?',
    );
    this.findAllStatement = database.prepare(`
      SELECT * FROM appointments
      ORDER BY appointment_date ASC, appointment_time ASC
    `);
    this.findByDateAndTimeStatement = database.prepare(`
      SELECT * FROM appointments
      WHERE appointment_date = ? AND appointment_time = ?
    `);
    this.updateStatement = database.prepare(`
      UPDATE appointments
      SET client_name = @clientName,
          service = @service,
          appointment_date = @appointmentDate,
          appointment_time = @appointmentTime,
          notes = @notes,
          updated_at = @updatedAt
      WHERE id = @id
    `);
    this.deleteStatement = database.prepare(
      'DELETE FROM appointments WHERE id = ?',
    );
  }

  create(appointment) {
    try {
      this.insertStatement.run(appointmentParameters(appointment));
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new AppointmentConflictError(
          appointment.appointmentDate,
          appointment.appointmentTime,
        );
      }

      throw error;
    }

    return this.findById(appointment.id);
  }

  findById(id) {
    return toAppointment(this.findByIdStatement.get(id));
  }

  findAll() {
    return this.findAllStatement.all().map(toAppointment);
  }

  findByDateAndTime(appointmentDate, appointmentTime) {
    return toAppointment(
      this.findByDateAndTimeStatement.get(appointmentDate, appointmentTime),
    );
  }

  update(appointment) {
    try {
      const result = this.updateStatement.run(
        appointmentParameters(appointment),
      );
      return result.changes === 0 ? null : this.findById(appointment.id);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new AppointmentConflictError(
          appointment.appointmentDate,
          appointment.appointmentTime,
        );
      }

      throw error;
    }
  }

  deleteById(id) {
    return this.deleteStatement.run(id).changes > 0;
  }
}

module.exports = SQLiteAppointmentRepository;
