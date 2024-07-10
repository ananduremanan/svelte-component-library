export async function setData(apiURL: string, data: any) {
	try {
		const res = await fetch(apiURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!res.ok) {
			throw new Error(`Error: ${res.status} ${res.statusText}`);
		}

		const responseData = await res.json();
		return responseData;
	} catch (error) {
		console.error('Error Sending Data', error);
		throw error;
	}
}
