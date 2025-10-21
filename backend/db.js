// backend/db.js
// Tiny SQLite "model" for journal entries

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// DB file path: backend/data/journal.sqlite
const dbFile = path.join(__dirname, 'data', 'journal.sqlite');
const db = new sqlite3.Database(dbFile);

// Create table on startup (if not exists)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// --- Simple model helpers ---

exports.getAll = (cb) => {
  db.all(`SELECT * FROM entries ORDER BY created_at DESC`, cb);
};

exports.getById = (id, cb) => {
  db.get(`SELECT * FROM entries WHERE id = ?`, [id], cb);
};

exports.create = (title, body, cb) => {
  db.run(
    `INSERT INTO entries (title, body) VALUES (?, ?)`,
    [title, body],
    function (err) {
      cb(err, this?.lastID);
    }
  );
};

exports.update = (id, title, body, cb) => {
  db.run(
    `UPDATE entries
     SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [title, body, id],
    function (err) {
      cb(err, this?.changes);
    }
  );
};

exports.remove = (id, cb) => {
  db.run(`DELETE FROM entries WHERE id = ?`, [id], function (err) {
    cb(err, this?.changes);
  });
};
