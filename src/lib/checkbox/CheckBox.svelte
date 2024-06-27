<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let checked: boolean;
	export let checkboxClass = 'text-blue-400';
</script>

<input
	type="checkbox"
	{...$$restProps}
	bind:checked
	class={twMerge(checkboxClass, 'form-checkbox h-5 w-5 rounded border-gray-300 cursor-pointer')}
/>

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/CheckBox) for more information.
## Props
```javascript
let checked: boolean;
let checkboxClass = 'text-blue-400';
```

## Usage
```svelte
<script lang="ts">
	import { CheckBox } from "@grampro/svelte-block";
let checked;
</script>

<CheckBox bind:checked />
```
-->