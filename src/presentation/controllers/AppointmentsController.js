class AppointmentsController {
  constructor({
    createAppointment,
    getAppointment,
    listAppointments,
    updateAppointment,
    deleteAppointment,
  }) {
    this.createAppointment = createAppointment;
    this.getAppointment = getAppointment;
    this.listAppointments = listAppointments;
    this.updateAppointment = updateAppointment;
    this.deleteAppointment = deleteAppointment;
  }

  list(_request, response) {
    const appointments = this.listAppointments.execute();
    return response.render('appointments/index', { appointments });
  }

  newForm(_request, response) {
    return response.render('appointments/new', { appointment: null });
  }

  create(request, response) {
    const appointment = this.createAppointment.execute(request.body);
    return response.redirect(303, `/appointments/${appointment.id}`);
  }

  show(request, response) {
    const appointment = this.getAppointment.execute(request.params.id);
    return response.render('appointments/show', { appointment });
  }

  editForm(request, response) {
    const appointment = this.getAppointment.execute(request.params.id);
    return response.render('appointments/edit', { appointment });
  }

  confirmDelete(request, response) {
    const appointment = this.getAppointment.execute(request.params.id);
    return response.render('appointments/delete', { appointment });
  }

  update(request, response) {
    const appointment = this.updateAppointment.execute(
      request.params.id,
      request.body,
    );
    return response.redirect(303, `/appointments/${appointment.id}`);
  }

  remove(request, response) {
    this.deleteAppointment.execute(request.params.id);
    return response.redirect(303, '/appointments');
  }
}

module.exports = AppointmentsController;
