export function unauthorizedError() {
	return {
		type: 'unauthorized',
		message: `To access, you must be authenticated!`
	};
};