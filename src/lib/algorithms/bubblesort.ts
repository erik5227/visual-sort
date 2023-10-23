import { sleep } from '$lib/scripts/utils';
import { array, pointers } from '$lib/store';

let $array: number[];

array.subscribe((val) => {
	$array = val;
});

export async function doBubbleSort(delay: number) {
	let n = $array.length;
	do {
		let newn = 0;
		for (let i = 1; i <= n - 1; ++i) {
			pointers.set([i, i - 1]);
			array.set($array);

			if ($array[i - 1] > $array[i]) {
				[$array[i - 1], $array[i]] = [$array[i], $array[i - 1]];
				newn = i;
			}
			if (i % Math.ceil(1 / delay) == 0) {
				await sleep(Math.ceil(delay));
			}
		}
		n = newn;
	} while (n > 1);

	pointers.set([]);
}
