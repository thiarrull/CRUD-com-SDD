const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const initializeDatabase = require('../../src/infrastructure/database/initializeDatabase');
const openDatabase = require('../../src/infrastructure/database/openDatabase');

function insertAppointment(database, id) {
  database
    .prepare(
      `INSERT INTO appointments (
        id, client_name, service, appointment_date, appointment_time,
        notes, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      'Maria',
      'Consulta',
      '2026-11-10',
      '14:00',
      '',
      '2026-10-29T18:00:00.000Z',
      '2026-10-29T18:00:00.000Z',
    );
}

test('initializes the SQLite schema idempotently and enforces unique times', () => {
  const database = openDatabase(':memory:');

  try {
    initializeDatabase(database);
    const columns = database
      .pragma('table_info(appointments)')
      .map(({ name }) => name);

    assert.deepEqual(columns, [
      'id',
      'client_name',
      'service',
      'appointment_date',
      'appointment_time',
      'notes',
      'created_at',
      'updated_at',
    ]);

    insertAppointment(database, '123e4567-e89b-42d3-a456-426614174000');
    assert.throws(
      () => insertAppointment(database, '123e4567-e89b-42d3-a456-426614174001'),
      /UNIQUE constraint failed/,
    );
  } finally {
    database.close();
  }
});

test('creates the database parent directory when missing', () => {
  const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'appointments-db-'),
  );
  const nestedDirectory = path.join(temporaryDirectory, 'nested');
  const databasePath = path.join(nestedDirectory, 'appointments.db');

  const database = openDatabase(databasePath);
  try {
    assert.equal(fs.existsSync(nestedDirectory), true);
    assert.equal(
      database.prepare('SELECT COUNT(*) AS count FROM appointments').get()
        .count,
      0,
    );
  } finally {
    database.close();
    fs.unlinkSync(databasePath);
    fs.rmdirSync(nestedDirectory);
    fs.rmdirSync(temporaryDirectory);
  }
});
