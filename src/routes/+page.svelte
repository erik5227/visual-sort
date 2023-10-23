<script lang="ts">
	import Toolbar from '$lib/components/Toolbar.svelte';
	import Visualizer from '$lib/components/Visualizer.svelte';
	import type { algorithm } from '$lib/types';
	import { doBubbleSort } from '$lib/algorithms/bubblesort';
	import { doQuickSort } from '$lib/algorithms/quicksort';
	import { array } from '$lib/store';
	import config from '$lib/config';
	import { shuffle } from '$lib/algorithms/shuffle';

	const algorithmExecutors = {
		bubblesort: doBubbleSort,
		quicksort: doQuickSort
	};

	let arrayLength: number;
	let arrayLock = false;
	let delay: number = 0;

	$: {
		if ($array.length !== arrayLength && !arrayLock) {
			arrayLock = true;

			let wasArraySorted = isSorted();

			$array = [];
			for (let i = 1; i <= arrayLength; ++i) {
				$array.push(i);
			}

			wasArraySorted || shuffle(arrayLength, true);

			arrayLock = false;
		}
	}

	function isSorted(): boolean {
		for (let i = 0; i < $array.length - 1; ++i) {
			if ($array[i] > $array[i + 1]) {
				return false;
			}
		}
		return true;
	}

	async function handleSortRequest(event: CustomEvent) {
		if (arrayLock) return;

		const algorithm: algorithm = event.detail.algorithm;

		if (algorithm) {
			arrayLock = true;
			delay = !isSorted() ? config[algorithm].stepDelay : 0.25;
			await algorithmExecutors[algorithm](delay);
			arrayLock = false;
		}
	}

	async function handleShuffleRequest() {
		if (arrayLock) return;
		arrayLock = true;
		await shuffle(arrayLength);
		arrayLock = false;
	}
</script>

<div class="wrapper">
	<Toolbar
		on:sort={handleSortRequest}
		on:shuffle={handleShuffleRequest}
		bind:arrayLength
		bind:arrayLock
	/>
	<span>Delay: {delay}ms</span>
	<Visualizer />
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
