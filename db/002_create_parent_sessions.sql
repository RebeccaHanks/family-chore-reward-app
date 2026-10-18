CREATE TABLE parent_sessions (
    token_hash TEXT PRIMARY KEY,
    parent_id INTEGER NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL
);