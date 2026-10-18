import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { db } from '#lib/server/db.js';
import {
	createSessionToken,
	hashSessionToken
} from '#lib/server/session.js';

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();

		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');

		if (!email || !password) {
			return fail(400, {
				error: 'Please enter your email and password.'
			});
		}

        const result = await db.query(
            'SELECT id, password_hash FROM parents WHERE email = $1',
            [email]
        );

        const parent = result.rows[0];

        if (!parent || !(await verify(parent.password_hash, password))) {
            return fail(400, {
                error: 'Invalid email or password.'
            });
        }

        const token = createSessionToken();
        const tokenHash = hashSessionToken(token);
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

        await db.query(
            'INSERT INTO parent_sessions (token_hash, parent_id, expires_at) VALUES ($1, $2, $3)',
            [tokenHash, parent.id, expiresAt]
        );
        cookies.set('parent_session', token, {
            path: '/',
            httpOnly: true,
            secure: url.protocol === 'https:',
            sameSite: 'lax',
            expires: expiresAt
        });
        redirect(303, '/dashboard');
	}
};