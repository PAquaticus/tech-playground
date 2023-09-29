import { fooo } from '../../api/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		post: await fooo()
	};
};
