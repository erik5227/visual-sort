<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let algorithm: string;
	let enteredArrayLength: number = 40;
	export let arrayLength: number = 40;
	export let arrayLock: boolean;

	$: !arrayLock ? (enteredArrayLength = arrayLength) : (arrayLength = enteredArrayLength);

	const dispatch = createEventDispatcher();

	function dispatchSortRequest() {
		dispatch('sort', {
			algorithm: algorithm
		});
	}

	function dispatchShuffleRequest() {
		dispatch('shuffle');
	}
</script>

<div class="wrapper">
	<div class="group">
		<span><i>n</i> of elements: </span>
		<input type="range" min="20" max="200" step="5" bind:value={arrayLength} />
		<span>{arrayLength}</span>
	</div>

	<div class="group">
		<select bind:value={algorithm}>
			<option value="">Sorting algorithm</option>
			<option value="bubblesort">Bubble sort</option>
			<option value="quicksort">Quicksort</option>
		</select>
		{#if !algorithm}
			<button disabled>Sort</button>
		{:else}
			<button on:click={dispatchSortRequest}>Sort</button>
		{/if}
		<button on:click={dispatchShuffleRequest}>Shuffle</button>
	</div>
</div>

<style>
	.wrapper {
		background-color: gainsboro;

		padding: 0.75rem;
		border-radius: 5px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.group {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	@media screen and (max-width: 649px) {
		.wrapper {
			flex-direction: column;
			gap: 1rem;
		}
	}

	@media screen and (max-width: 419px) {
		.group {
			flex-direction: column;
		}
	}
</style>
