import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.parent) {
		redirect(303, '/login');
	}

	return {
		parent: locals.parent
	};
}