import { sleep } from '$lib/scripts/utils';
import { array, pointers } from '$lib/store';

let $array: number[];

array.subscribe((val) => {
	$array = val;
});

export async function doQuickSort(delay: number) {
	async function quicksort(lo: number, hi: number) {
		if (lo >= hi || lo < 0) return;

		const p = await partition(lo, hi);

		await quicksort(lo, p - 1);
		await quicksort(p + 1, hi);
	}

	async function partition(lo: number, hi: number) {
		const pivot = $array[hi];

		let i = lo - 1;
		for (let j = lo; j <= hi - 1; ++j) {
			if ($array[j] <= pivot) {
				++i;
				[$array[i], $array[j]] = [$array[j], $array[i]];
			}

			pointers.set([pivot, i, j]);
			array.set($array);

			if (i % Math.ceil(1 / delay) == 0) {
				await sleep(Math.ceil(delay));
			}
			pointers.set([]);
		}
		++i;
		[$array[i], $array[hi]] = [$array[hi], $array[i]];

		array.set($array);

		return i;
	}

	await quicksort(0, $array.length - 1);
}
