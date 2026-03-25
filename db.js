const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DATA_DIR = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'infractions.sqlite');
const db = new Database(DB_PATH);

// Migrate: infractions table
db.prepare(`
CREATE TABLE IF NOT EXISTS infractions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  moderator_id TEXT NOT NULL,
  type TEXT NOT NULL,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  revoked_by TEXT,
  revoked_at TEXT
);
`).run();

// Prepared statements
const insertStmt = db.prepare(
  `INSERT INTO infractions (user_id, moderator_id, type, reason) VALUES (@user_id, @moderator_id, @type, @reason)`
);
const getByIdStmt = db.prepare(`SELECT * FROM infractions WHERE id = ?`);
const getByUserStmt = db.prepare(`SELECT * FROM infractions WHERE user_id = ? ORDER BY created_at DESC`);
const revokeStmt = db.prepare(`UPDATE infractions SET revoked_by = @revoked_by, revoked_at = datetime('now') WHERE id = @id AND revoked_at IS NULL`);

module.exports = {
  createInfraction: ({ userId, moderatorId, type, reason }) => {
    const info = insertStmt.run({ user_id: userId, moderator_id: moderatorId, type, reason });
    return getByIdStmt.get(info.lastInsertRowid);
  },
  getInfractionById: (id) => getByIdStmt.get(id),
  getInfractionsForUser: (userId) => getByUserStmt.all(userId),
  revokeInfraction: ({ id, revokedBy }) => {
    const res = revokeStmt.run({ id, revoked_by: revokedBy });
    if (res.changes === 0) return null;
    return getByIdStmt.get(id);
  },
  db, // exported if you need direct access
};
