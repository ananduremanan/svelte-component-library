<script lang="ts">
	export let min: string = '0';
	export let max: string = '11';
	export let value: any = undefined;
	export let labelledRange: boolean = false;
	export let labelledRangeValues: any[] = [];
	export let rangeClass =
		'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700';
	export let labelledRangeTextClass = 'text-sm text-gray-500 dark:text-gray-400 absolute -bottom-6';

	// Update value function
	function setValue(newValue: any) {
		value = newValue;
	}

	// Calculate the percentage position based on the value
	function calculatePosition(value: number): string {
		const minValue = parseFloat(min);
		const maxValue = parseFloat(max);
		const position = ((value - minValue) / (maxValue - minValue)) * 100;
		return `left: ${position}%; transform: translateX(-50%);`;
	}
</script>

<div>
	{#if labelledRange}
		<div class="relative mb-6">
			<input id="labels-range-input" type="range" bind:value {min} {max} class={rangeClass} />
			{#if labelledRangeValues}
				{#each labelledRangeValues as values}
					<button
						class={labelledRangeTextClass}
						style={calculatePosition(values.value)}
						on:click={() => setValue(values.value)}
					>
						{values.text}
					</button>
				{/each}
			{/if}
		</div>
	{:else}
		<input type="range" bind:value {min} {max} class="w-full" />
	{/if}
</div>

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/Range) for more information.
## Props
```javascript
let min: string = '0';
let max: string = '11';
let value: any = undefined;
let labelledRange: boolean = false;
let labelledRangeValues: any[] = [];
let rangeClass =
		'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700';
let labelledRangeTextClass = 'text-sm text-gray-500 dark:text-gray-400 absolute -bottom-6';
```

## Usage
```svelte
<script lang="ts">import { Range } from "@grampro/svelte-block";
let rangeValue = void 0;
</script>

<div class="flex flex-col gap-4">
  <Range />
  <Range
    labelledRange
    labelledRangeValues={[
      { text: "₹100", value: 100 },
      { text: "₹500", value: 500 },
      { text: "₹1000", value: 1000 },
      { text: "₹1500", value: 1500 },
    ]}
    min="100"
    max="1500"
    bind:value={rangeValue}
  />
  <div class="mt-6">
    RangeValue is: {rangeValue ? rangeValue : "Click On Range"}
  </div>
</div>

```
-->
