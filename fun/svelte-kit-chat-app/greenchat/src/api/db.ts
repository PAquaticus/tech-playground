import db from 'better-sqlite3';
const d = db('foobar.db');

export const fooo = () => {
	const row = d.prepare('SELECT * FROM users WHERE id = ?').get(1);
	console.log(row);
};
