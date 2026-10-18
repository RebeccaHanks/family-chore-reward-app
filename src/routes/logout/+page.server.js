import { redirect } from '@sveltejs/kit';
import { db } from '#lib/server/db.js';
import { hashSessionToken } from '#lib/server/session.js';

export const actions = {
	default: async ({ cookies }) => {
		const token = cookies.get('parent_session');

		if (token) {
			await db.query(
				'DELETE FROM parent_sessions WHERE token_hash = $1',
				[hashSessionToken(token)]
			);
		}

		cookies.delete('parent_session', { path: '/' });

		redirect(303, '/login');
	}
};