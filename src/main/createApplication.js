const CreateAppointment = require('../application/use-cases/CreateAppointment');
const DeleteAppointment = require('../application/use-cases/DeleteAppointment');
const GetAppointment = require('../application/use-cases/GetAppointment');
const ListAppointments = require('../application/use-cases/ListAppointments');
const UpdateAppointment = require('../application/use-cases/UpdateAppointment');
const openDatabase = require('../infrastructure/database/openDatabase');
const SQLiteAppointmentRepository = require('../infrastructure/repositories/SQLiteAppointmentRepository');
const AppointmentsController = require('../presentation/controllers/AppointmentsController');
const createAppointmentsRouter = require('../presentation/routes/appointments');
const config = require('./config');
const createApp = require('./app');

function createApplication({ databasePath = config.databasePath } = {}) {
  const database = openDatabase(databasePath);
  const appointmentRepository = new SQLiteAppointmentRepository(database);
  const controller = new AppointmentsController({
    createAppointment: new CreateAppointment({ appointmentRepository }),
    getAppointment: new GetAppointment({ appointmentRepository }),
    listAppointments: new ListAppointments({ appointmentRepository }),
    updateAppointment: new UpdateAppointment({ appointmentRepository }),
    deleteAppointment: new DeleteAppointment({ appointmentRepository }),
  });
  const app = createApp(createAppointmentsRouter(controller));

  return { app, database };
}

module.exports = createApplication;
