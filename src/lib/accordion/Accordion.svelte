<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { fade } from 'svelte/transition';
	import { AngleUpOutline, AngleDownOutline } from 'flowbite-svelte-icons';

	export let accordionItems: any[] = [];
	export let accordionParentClass: string = 'w-full p-4 text-left border-b-2';
	export let accordionChildClass: string = 'block p-1 text-blue-500 hover:underline';
	export let childComponentClass: string = '';

	let openSections = new Set();

	function toggleSection(index: number) {
		if (openSections.has(index)) {
			openSections.delete(index);
		} else {
			openSections.add(index);
		}
		openSections = new Set(openSections);
	}
</script>

<div>
	{#each accordionItems as item, index}
		<button
			class={twMerge(accordionParentClass, 'cursor-pointer flex justify-between items-center')}
			on:click={() => toggleSection(index)}
		>
			{item.title}
			{#if openSections.has(index)}
				<AngleUpOutline size="md" />
			{:else}
				<AngleDownOutline size="md" />
			{/if}
		</button>
		{#if openSections.has(index)}
			<div class="p-4" transition:fade={{ duration: 100 }}>
				{#each item.children as child}
					{#if child.children}
						<svelte:self
							accordionItems={child.children}
							{accordionParentClass}
							{accordionChildClass}
							{childComponentClass}
						/>
					{:else if child.component}
						<svelte:component this={child.component} class={childComponentClass} />
					{:else}
						<a href={child.link} class={accordionChildClass}>{child.title}</a>
					{/if}
				{/each}
			</div>
		{/if}
	{/each}
</div>