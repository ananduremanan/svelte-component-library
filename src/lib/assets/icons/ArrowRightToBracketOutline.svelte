<script lang="ts">
	import { getContext } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const ctx: any = getContext('iconCtx') ?? {};
	const sizes: any = {
		xs: 'w-3 h-3',
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6',
		xl: 'w-8 h-8'
	};
	export let size = ctx.size || 'md';
	export let role = ctx.role || 'img';
	export let color = ctx.color || 'currentColor';
	export let withEvents = ctx.withEvents || false;
	export let title: any = {};
	export let strokeWidth = ctx.strokeWidth || '2';
	export let desc: any = {};
	let ariaDescribedby = `${title.id || ''} ${desc.id || ''}`;
	let hasDescription = false;
	$: if (title.id || desc.id) {
		hasDescription = true;
	} else {
		hasDescription = false;
	}
	export let ariaLabel = 'arrow right to bracket outline';
</script>

{#if withEvents}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		{color}
		{...$$restProps}
		class={twMerge('shrink-0', sizes[size ?? 'md'], $$props.class)}
		{role}
		aria-label={ariaLabel}
		aria-describedby={hasDescription ? ariaDescribedby : undefined}
		viewBox="0 0 24 24"
		on:click
		on:keydown
		on:keyup
		on:focus
		on:blur
		on:mouseenter
		on:mouseleave
		on:mouseover
		on:mouseout
	>
		{#if title.id && title.title}
			<title id={title.id}>{title.title}</title>
		{/if}
		{#if desc.id && desc.desc}
			<desc id={desc.id}>{desc.desc}</desc>
		{/if}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width={strokeWidth}
			d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
		/>
	</svg>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		{color}
		{...$$restProps}
		class={twMerge('shrink-0', sizes[size ?? 'md'], $$props.class)}
		{role}
		aria-label={ariaLabel}
		aria-describedby={hasDescription ? ariaDescribedby : undefined}
		viewBox="0 0 24 24"
	>
		{#if title.id && title.title}
			<title id={title.id}>{title.title}</title>
		{/if}
		{#if desc.id && desc.desc}
			<desc id={desc.id}>{desc.desc}</desc>
		{/if}
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width={strokeWidth}
			d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
		/>
	</svg>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte-icons.codewithshin.com/)
## Props
@prop export let size: Props['size'] = ctx.size || 'md';
@prop export let role: Props['role'] = ctx.role || 'img';
@prop export let color: Props['color'] = ctx.color || 'currentColor';
@prop export let withEvents: Props['withEvents'] = ctx.withEvents || false;
@prop export let title: TitleType = {};
@prop export let strokeWidth: Props['strokeWidth'] = ctx.strokeWidth || '2';
@prop export let desc: DescType = {};
@prop export let ariaLabel = 'arrow right to bracket outline';
-->
