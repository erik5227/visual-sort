<script lang="ts">
	import { array, pointers } from '$lib/store';

	function enumerate(arr: Array<number>): Array<Array<number>> {
		let enumerated_array = [];
		for (let i = 0; i < arr.length; ++i) {
			enumerated_array.push([i, arr[i]]);
		}
		return enumerated_array;
	}
</script>

<div class="wrapper">
	{#each enumerate($array) as [i, column]}
		<div
			class={$pointers.indexOf(i) != -1 ? 'column pointer' : 'column'}
			style="height: {column * 3}px;"
		/>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		height: fit-content;
		padding: 1rem;
		align-items: end;
		margin: 1rem;
	}

	.column {
		background-color: white;
		width: 40px;
	}

	.pointer {
		background-color: red;
	}

	@media screen and (min-height: 770px) and (min-width: 649px) {
		.wrapper {
			height: 600px;
		}
	}

	@media screen and (min-height: 940px) and (max-width: 649px) {
		.wrapper {
			height: 600px;
		}
	}
</style>
