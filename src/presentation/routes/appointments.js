const express = require('express');

function createAppointmentsRouter(controller) {
  const router = express.Router();

  router.get('/', (request, response, next) =>
    controller.list(request, response, next),
  );
  router.get('/new', (request, response, next) =>
    controller.newForm(request, response, next),
  );
  router.post('/', (request, response, next) =>
    controller.create(request, response, next),
  );
  router.get('/:id/edit', (request, response, next) =>
    controller.editForm(request, response, next),
  );
  router.get('/:id/delete', (request, response, next) =>
    controller.confirmDelete(request, response, next),
  );
  router.get('/:id', (request, response, next) =>
    controller.show(request, response, next),
  );
  router.post('/:id/update', (request, response, next) =>
    controller.update(request, response, next),
  );
  router.post('/:id/delete', (request, response, next) =>
    controller.remove(request, response, next),
  );

  return router;
}

module.exports = createAppointmentsRouter;
