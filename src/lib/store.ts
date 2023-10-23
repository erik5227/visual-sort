import { writable } from 'svelte/store';

export const array = writable<number[]>([]);
export const pointers = writable<number[]>([]);
