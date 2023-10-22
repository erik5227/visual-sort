<script lang="ts">
	import Toolbar from '$lib/Toolbar.svelte';
	import Visualizer from '$lib/Visualizer.svelte';
	import RandomUtils from '$lib/random';
	import type { algorithm } from '$lib/types';
	import Config from '$lib/config';

	let arrayLength: number;
	let array: Array<number> = [];
	let pointers: Array<number> = [];
	let arrayLock = false;
	let delay: number = 0;

	$: stepTimeout = 1000 / arrayLength;

	$: {
		if (array.length !== arrayLength && !arrayLock) {
			arrayLock = true;

			array = [];
			for (let i = 1; i <= arrayLength; ++i) {
				array.push(i);
			}

			arrayLock = false;
		}
	}

	async function sleep(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	function isSorted(): boolean {
		for (let i = 0; i < array.length - 1; ++i) {
			if (array[i] > array[i + 1]) {
				return false;
			}
		}
		return true;
	}

	async function handleSortRequest(event: CustomEvent) {
		if (arrayLock) return;
		if (isSorted()) return;
		const algorithmExecutors = {
			bubblesort: doBubbleSort,
			quicksort: doQuickSort
		};

		const algorithm: algorithm = event.detail.algorithm;
		if (algorithm) {
			delay = Config[algorithm].stepDelay;
			algorithmExecutors[algorithm]();
		}
	}

	/**
	 * Perofrms Fisher-Yates shuffle on the array
	 */
	async function handleShuffleRequest() {
		if (arrayLock) return;
		arrayLock = true;

		for (let i = arrayLength - 1; i >= 0; --i) {
			const j = RandomUtils.range(0, i);

			pointers = [i, j];
			await sleep(stepTimeout);

			[array[i], array[j]] = [array[j], array[i]];
		}

		pointers = [];
		arrayLock = false;
	}

	async function doBubbleSort() {
		arrayLock = true;

		let n = array.length;
		do {
			let newn = 0;
			for (let i = 1; i <= n - 1; ++i) {
				pointers = [i, i - 1];
				if (array[i - 1] > array[i]) {
					[array[i - 1], array[i]] = [array[i], array[i - 1]];
					newn = i;
				}
				if (i % Math.ceil(1 / delay) == 0) {
					await sleep(Math.ceil(delay));
				}
			}
			n = newn;
		} while (n > 1);

		pointers = [];
		arrayLock = false;
	}

	async function doQuickSort() {
		arrayLock = true;

		async function quicksort(lo: number, hi: number) {
			if (lo >= hi || lo < 0) return;

			let p = await partition(lo, hi);

			quicksort(lo, p - 1);
			quicksort(p + 1, hi);
		}

		async function partition(lo: number, hi: number) {
			let pivot = array[hi];

			let i = lo - 1;
			for (let j = lo; j <= hi - 1; ++j) {
				pointers = [pivot, i, j];
				arrayLock = true;

				if (array[j] <= pivot) {
					++i;
					[array[i], array[j]] = [array[j], array[i]];
				}

				if (i % Math.ceil(1 / delay) == 0) {
					await sleep(Math.ceil(delay));
				}
				arrayLock = false;
				pointers = [];
			}
			++i;
			[array[i], array[hi]] = [array[hi], array[i]];
			return i;
		}

		quicksort(0, array.length - 1);
	}
</script>

<div class="wrapper">
	<Toolbar on:sort={handleSortRequest} on:shuffle={handleShuffleRequest} bind:arrayLength />
	<span>Delay: {delay}ms</span>
	<Visualizer bind:array bind:pointers />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	span {
		color: white;
		padding-right: 1rem;
		text-align: end;
	}
</style>
