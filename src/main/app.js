const express = require('express');
const helmet = require('helmet');
const path = require('node:path');
const handleHttpError = require('../presentation/http/errorHandler');

function createApp(router) {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, '../../views'));
  app.use(helmet());
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));
  app.use(express.static(path.resolve(__dirname, '../../public')));
  app.get('/', (_request, response) => response.redirect('/appointments'));
  app.use('/appointments', router);
  app.use((_request, response) =>
    response.status(404).render('errors/404', {
      message: 'O conteúdo solicitado não foi encontrado.',
    }),
  );
  app.use(handleHttpError);

  return app;
}

module.exports = createApp;
