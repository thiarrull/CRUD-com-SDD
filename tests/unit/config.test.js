const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { test } = require('node:test');

test('preserves the SQLite in-memory database setting', () => {
  const configPath = path.resolve(__dirname, '../../src/main/config.js');
  const output = execFileSync(
    process.execPath,
    [
      '-e',
      `process.env.DATABASE_PATH = ':memory:'; console.log(require(${JSON.stringify(configPath)}).databasePath)`,
    ],
    { encoding: 'utf8' },
  );

  assert.equal(output.trim(), ':memory:');
});
