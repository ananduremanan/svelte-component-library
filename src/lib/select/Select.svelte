<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { tick } from 'svelte';
	import ChevronsUpDown from '$lib/assets/icons/ChevronsUpDown.svelte';
	import X from '$lib/assets/icons/X.svelte';
	import SearchOutline from '$lib/assets/icons/SearchOutline.svelte';
	import Check from '$lib/assets/icons/Check.svelte';
	import { twMerge } from 'tailwind-merge';
	import { fade } from 'svelte/transition';

	export let name: string = '';
	export let placeholder = 'Select a Value...';
	export let items: { value: string; label: string }[];
	export let selected: string | undefined = undefined;
	export let lazy: boolean = false;
	export let showSearch: boolean = true;
	export let searchboxClass: string = 'p-1 flex rounded-md bg-transparent text-sm outline-none';
	export let popUpClass: string =
		'w-[200px] h-auto border px-2 rounded-lg mt-[1px] scrollbar bg-white z-50';
	export let itemClass: string = 'text-left hover:bg-blue-100 gap-2 rounded-lg mt-1 text-sm';

	let showPopover = false;
	let popoverTrigger: HTMLDivElement;
	let searchRef: HTMLInputElement;
	let selectElement: HTMLSelectElement;
	let fullDataSource = [...items];
	let filteredItems = [...items];
	let selectedDisplay: string = '';
	let popoverPosition: string = 'bottom';

	$: selectedDisplay = items.find((item) => item.value === selected)?.label || '';

	onMount(() => {
		if (selected) {
			selectElement.value = selected;
		}
	});

	function inputSearchHandler(event: Event) {
		const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
		if (!lazy) {
			filteredItems = fullDataSource.filter((item) =>
				item.label.toLowerCase().includes(searchValue)
			);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (popoverTrigger && !popoverTrigger.contains(event.target as Node)) {
			showPopover = false;
		}
	}

	async function togglePopover(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		showPopover = !showPopover;
		filteredItems = fullDataSource;
		if (showPopover) {
			await tick();
			searchRef?.focus();
			setPopoverPosition();
		}
	}

	function setPopoverPosition() {
		if (popoverTrigger) {
			const rect = popoverTrigger.getBoundingClientRect();
			const spaceAbove = rect.top;
			const spaceBelow = window.innerHeight - rect.bottom;
			popoverPosition = spaceBelow < 200 && spaceAbove > spaceBelow ? 'top' : 'bottom';
		}
	}

	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selected = target.value;
		selectedDisplay = items.find((item) => item.value === selected)?.label || '';
	}

	function clearSelection(event: MouseEvent) {
		event.stopPropagation();
		selected = undefined;
		selectedDisplay = '';
		selectElement.value = '';
	}
</script>

<div class="relative" bind:this={popoverTrigger}>
	<div class="relative w-[200px]">
		<button
			type="button"
			class="flex items-center border px-4 py-2 w-[200px] justify-between rounded-lg font-medium text-sm"
			on:click={togglePopover}
		>
			{selectedDisplay || placeholder}
			<ChevronsUpDown class="ml-2 h-4 w-4 opacity-50" />
		</button>
		{#if selectedDisplay}
			<button
				type="button"
				class="absolute right-8 top-0 h-full flex items-center px-2"
				on:click={clearSelection}
			>
				<X class="h-4 w-4 opacity-50" />
			</button>
		{/if}
	</div>

	<select
		{...$$restProps}
		{name}
		bind:this={selectElement}
		on:change={handleSelectChange}
		class="absolute opacity-0 -z-10"
	>
		<option value="" disabled selected={!selected}>{placeholder}</option>
		{#each items as item}
			<option value={item.value} selected={item.value === selected}>
				{item.label}
			</option>
		{/each}
	</select>

	{#if showPopover}
		<div
			class={twMerge(
				`absolute overflow-y-auto ${popoverPosition === 'top' ? 'top-auto bottom-[100%]' : ''}`,
				popUpClass
			)}
			transition:fade={{ duration: 100 }}
		>
			{#if showSearch}
				<div class="flex p-2 gap-1 items-center sticky top-0 bg-white border-b">
					<SearchOutline size="sm" class="text-gray-400" />
					<input
						autocomplete="off"
						on:input={inputSearchHandler}
						bind:this={searchRef}
						type="text"
						name="search"
						id="search"
						placeholder="Search a value"
						class={twMerge(searchboxClass, 'w-full')}
					/>
				</div>
			{/if}

			{#if filteredItems.length > 0}
				{#each filteredItems as { value, label }}
					<button
						type="button"
						class={twMerge('flex items-center w-full px-2 py-1', itemClass)}
						on:click={() => {
							selected = value;
							selectedDisplay = label;
							selectElement.value = value;
							showPopover = false;
						}}
					>
						<Check class={twMerge('mr-2 h-4 w-4')} color={selected === value ? 'black' : ''} />
						{label}
					</button>
				{/each}
			{:else}
				<div class="text-sm text-center">No Data Found</div>
			{/if}
		</div>
	{/if}
</div>

<svelte:window on:click={handleClickOutside} />

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/Select) for more information.
## Props
```javascript
let placeholder = 'Select a Value...';
let items: any[];
let selected: any = '';
let lazy: boolean = false;
let showSearch: boolean = true;
let searchboxClass: string = 'p-1 flex rounded-md bg-transparent text-sm outline-none';
let popUpClass: string =
		'w-[200px] h-[200px] border px-2 rounded-lg mt-[1px] scrollbar bg-white z-50';
let itemClass: string = 'text-left hover:bg-blue-100 gap-2 rounded-lg mt-1 text-sm ';
```

## Usage
```svelte
<script lang="ts">
	import { countries } from "$lib/countries";
	import { Select } from "@grampro/svelte-block";
	let selected = void 0;
</script>

<div>
	<Select items={countries} bind:selected={selected} />
</div>
```
-->

<style>
	.scrollbar::-webkit-scrollbar {
		margin-top: 20px;
		width: 5px;
		height: 10px;
	}

	.scrollbar::-webkit-scrollbar-track {
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background: #dbeafe;
		border-radius: 100vh;
	}

	.scrollbar::-webkit-scrollbar-thumb:hover {
		background: #c0a0b9;
	}
</style>
