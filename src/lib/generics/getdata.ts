export async function getData(apiURl: string) {
	try {
		const res = await fetch(apiURl);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('Error Fetching Data', error);
	}
}
