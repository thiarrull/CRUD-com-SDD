const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const sourceRoot = path.resolve(__dirname, '../../src');

function javascriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return javascriptFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith('.js') ? [entryPath] : [];
  });
}

test('domain and application do not depend on Express or concrete SQLite', () => {
  const innerFiles = [
    ...javascriptFiles(path.join(sourceRoot, 'domain')),
    ...javascriptFiles(path.join(sourceRoot, 'application')),
  ];
  const forbiddenImports = /\brequire\(['"](?:express|better-sqlite3)['"]\)/;

  for (const file of innerFiles) {
    assert.doesNotMatch(
      fs.readFileSync(file, 'utf8'),
      forbiddenImports,
      `${path.relative(sourceRoot, file)} must not import an HTTP framework or concrete database`,
    );
  }
});
