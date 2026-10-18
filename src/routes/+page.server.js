import { db } from '#lib/server/db.js';

export async function load() {
	const result = await db.query('SELECT current_database() AS name');

	console.log('Connected to database:', result.rows[0].name);

	return {};
}