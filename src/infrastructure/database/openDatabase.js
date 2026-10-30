const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');
const initializeDatabase = require('./initializeDatabase');

function openDatabase(databasePath) {
  if (typeof databasePath !== 'string' || databasePath.length === 0) {
    throw new TypeError('databasePath must be a non-empty string');
  }

  const resolvedPath =
    databasePath === ':memory:' ? databasePath : path.resolve(databasePath);

  if (resolvedPath !== ':memory:') {
    fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  }

  const database = new Database(resolvedPath);
  try {
    initializeDatabase(database);
    return database;
  } catch (error) {
    database.close();
    throw error;
  }
}

module.exports = openDatabase;
