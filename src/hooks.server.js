import { getSessionParent } from '#lib/server/session.js';

export async function handle({ event, resolve }) {
	const token = event.cookies.get('parent_session');

	event.locals.parent = token
		? await getSessionParent(token)
		: null;

	return resolve(event);
}