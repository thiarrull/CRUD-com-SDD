const config = require('./config');
const createApplication = require('./createApplication');

function startServer() {
  const { app, database } = createApplication();
  const server = app.listen(config.port, () => {
    console.log(`Agendamentos listening on port ${config.port}`);
  });

  const closeServer = () => {
    server.close(() => database.close());
  };

  process.once('SIGINT', closeServer);
  process.once('SIGTERM', closeServer);
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;
