export function conflictError(entity: string) {
	return {
		type: 'conflict',
		message: entity ? `A conflict has been generated with the ${entity}, please try again!` : `A conflict has been generated, please try again!`
	};
};