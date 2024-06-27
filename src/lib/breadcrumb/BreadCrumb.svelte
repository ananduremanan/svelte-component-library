<script lang="ts">
	import { onMount } from 'svelte';

	export let textActivePathColor: string = 'text-black dark:text-white';
	export let textInactivePathColor: string = 'text-gray-500';
	export let hoverStyle: string = 'hover:underline';

	let path: string[] = [];

	onMount(() => {
		let currentPath = window.location.pathname;
		path = currentPath.split('/').filter((segment) => segment);
	});
</script>

<div>
	<ul class="flex list-none p-0">
		<li class="flex items-center">
			<a href="/" class="{textActivePathColor} {hoverStyle}">Home</a>
			<span class="mx-2 {textInactivePathColor}">&gt;</span>
		</li>
		{#each path as pathName, index}
			<li class="flex items-center">
				<a
					href={`/${path.slice(0, index + 1).join('/')}`}
					class="{index === path.length - 1
						? textActivePathColor
						: textInactivePathColor} {hoverStyle}">{pathName}</a
				>
				{#if index < path.length - 1}
					<span class="mx-2 {textInactivePathColor}">&gt;</span>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/BreadCrumb) for more information.
## Props
```javascript
let textActivePathColor: string = 'text-black dark:text-white';
let textInactivePathColor: string = 'text-gray-500';
let hoverStyle: string = 'hover:underline';
```

## Usage
```svelte
<script>
	import { BreadCrumb } from '@grampro/svelte-block';
</script>

<BreadCrumb />
```
-->
