export async function sort(sort_array: any[], sort_condition: string) {
	if (!Array.isArray(sort_array) || typeof sort_condition !== 'string') {
		throw new Error(
			'Invalid input: sort_array must be an array and sort_condition must be a string'
		);
	}

	if (sort_array.length > 0 && !sort_array[0].hasOwnProperty(sort_condition)) {
		throw new Error(`Invalid sort_condition: ${sort_condition} is not a valid property`);
	}

	let sorted_array = sort_array.sort((a, b) => {
		const aValue = a[sort_condition] !== undefined ? a[sort_condition] : 0;
		const bValue = b[sort_condition] !== undefined ? b[sort_condition] : 0;

		if (aValue < bValue) return -1;
		if (aValue > bValue) return 1;
		return 0;
	});

	return sorted_array;
}
