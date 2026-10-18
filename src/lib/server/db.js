import pg from 'pg';
import { DATABASE_URL } from '$app/env/private';

const { Pool } = pg;

export const db = new Pool({
	connectionString: DATABASE_URL
});