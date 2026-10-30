const path = require('node:path');
require('dotenv').config();

const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const databaseSetting = process.env.DATABASE_PATH ?? 'data/appointments.db';
const databasePath =
  databaseSetting === ':memory:'
    ? databaseSetting
    : path.resolve(process.cwd(), databaseSetting);

module.exports = {
  databasePath,
  port,
};
