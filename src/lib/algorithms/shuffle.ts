import { range, sleep } from '$lib/scripts/utils';
import { array, pointers } from '$lib/store';

let $array: number[];

array.subscribe((val) => {
	$array = val;
});

export async function shuffle(arrayLength: number) {
	for (let i = arrayLength - 1; i >= 0; --i) {
		const j = range(0, i);

		await sleep(1000 / arrayLength);

		[$array[i], $array[j]] = [$array[j], $array[i]];

		pointers.set([i, j]);
		array.set($array);
	}

	pointers.set([]);
}
