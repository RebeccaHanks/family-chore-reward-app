import { randomBytes, createHash } from 'node:crypto';
import { db } from '#lib/server/db.js';

export function createSessionToken() {
	return randomBytes(32).toString('hex');
}
/** @param {string} token */
export function hashSessionToken(token) {
	return createHash('sha256').update(token).digest('hex');
}
/** @param {string} token */
export async function getSessionParent(token) {
	const tokenHash = hashSessionToken(token);

	const result = await db.query(
		`SELECT parents.id, parents.name, parents.email
		 FROM parent_sessions
		 JOIN parents ON parents.id = parent_sessions.parent_id
		 WHERE parent_sessions.token_hash = $1
		   AND parent_sessions.expires_at > CURRENT_TIMESTAMP`,
		[tokenHash]
	);

	return result.rows[0] ?? null;
}