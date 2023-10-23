export async function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export function range(min: number, max: number): number {
	return min + Math.floor(Math.random() * (max - min));
}
