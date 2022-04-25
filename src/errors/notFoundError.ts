export function notFoundError(entity: string) {
	return {
		type: 'not_found',
		message: `could not find specified ${entity}!`
	};
};