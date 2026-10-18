import { fail } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { db } from '#lib/server/db.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');

		if (!name || !email || !password) {
			return fail(400, { error: 'Please fill in all fields.' });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.' });
		}

		if (password.length < 8) {
			return fail(400, {
				error: 'Your password must have at least 8 characters.'
			});
		}

        const passwordHash = await hash(password);

        try {
            await db.query(
                'INSERT INTO parents (name, email, password_hash) VALUES ($1, $2, $3)',
                [name, email, passwordHash]
            );
        } catch (error) {
            if (error.code === '23505') {
                return fail(400, {
                    error: 'An account with that email already exists.'
                });
            }

            console.error('Registration database operation failed');
            return fail(500, {
                error: 'Unable to create your account. Please try again.'
            });
        }

        return { success: true };
	}
};