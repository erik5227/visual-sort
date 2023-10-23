import { range, sleep } from '$lib/scripts/utils';
import { array, pointers } from '$lib/store';

let $array: number[];

array.subscribe((val) => {
	$array = val;
});

export async function shuffle(arrayLength: number, quiet = false) {
	for (let i = arrayLength - 1; i >= 0; --i) {
		const j = range(0, i);

		quiet || (await sleep(1000 / arrayLength));

		[$array[i], $array[j]] = [$array[j], $array[i]];

		quiet || pointers.set([i, j]);
		quiet || array.set($array);
	}

	quiet || pointers.set([]);
}
