<script lang="ts">
	const iconNode: any[] = [
		['path', { d: 'm7 15 5 5 5-5' }],
		['path', { d: 'm7 9 5-5 5 5' }]
	];

	export let size = 15;
	export let color = 'black';
	export let absoluteStrokeWidth = false;
	export let strokeWidth = 2;

	const defaultAttributes: any = {
		xmlns: 'http://www.w3.org/2000/svg',
		width: 24,
		height: 24,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		'stroke-width': 2,
		'stroke-linecap': 'round',
		'stroke-linejoin': 'round'
	};
</script>

<svg
	{...$$restProps}
	{...defaultAttributes}
	width={size}
	height={size}
	stroke={color}
	stroke-width={absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth}
>
	{#each iconNode as [tag, attrs]}
		<svelte:element this={tag} {...attrs} />
	{/each}
	<slot />
</svg>
