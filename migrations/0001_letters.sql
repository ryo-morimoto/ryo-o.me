CREATE TABLE IF NOT EXISTS letters (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  stamp TEXT NOT NULL,
  created_at TEXT NOT NULL,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_letters_post ON letters(post_id);
CREATE INDEX IF NOT EXISTS idx_letters_created ON letters(created_at);
