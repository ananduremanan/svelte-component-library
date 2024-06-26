<script lang="ts">
	import Siema from 'siema';
	import { onMount, createEventDispatcher } from 'svelte';

	export let perPage = 1;
	export let loop = true;
	export let autoplay: number = 0;
	export let duration = 200;
	export let easing = 'ease-out';
	export let startIndex = 0;
	export let draggable = true;
	export let multipleDrag = true;
	export let threshold = 20;
	export let rtl = false;
	export let dots = false;

	let currentIndex = startIndex;
	let siema: any;
	let controller: any;
	let timer: any;
	const dispatch = createEventDispatcher();
	let totalDots: any;

	$: pips = controller ? controller.innerElements : [];
	$: currentPerPage = controller ? controller.perPage : perPage;
	$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : [];

	onMount(() => {
		controller = new Siema({
			selector: siema,
			perPage: typeof perPage === 'object' ? perPage : Number(perPage),
			loop,
			duration,
			easing,
			startIndex,
			draggable,
			multipleDrag,
			threshold,
			rtl,
			onChange: handleChange
		});

		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
		return () => {
			autoplay && clearInterval(timer);
			controller.destroy();
		};
	});

	export function isDotActive(currentIndex: any, dotIndex: any) {
		if (currentIndex < 0) currentIndex = pips.length + currentIndex;
		return (
			currentIndex >= dotIndex * currentPerPage &&
			currentIndex < dotIndex * currentPerPage + currentPerPage
		);
	}

	export function left() {
		controller.prev();
	}

	export function right() {
		controller.next();
	}

	export function go(index: any) {
		controller.goTo(index);
	}

	export function pause() {
		clearInterval(timer);
	}

	export function resume() {
		if (autoplay) {
			timer = setInterval(right, autoplay);
		}
	}

	function handleChange() {
		let currentIndex;
		currentIndex = controller.currentSlide;
		dispatch('change', {
			currentSlide: controller.currentSlide,
			slideCount: controller.innerElements.length
		});
	}
</script>

<div class="carousel relative w-full flex justify-center items-center overflow-hidden">
	<div class="w-full" bind:this={siema}>
		<slot />
	</div>
	{#if dots}
		<ul class="absolute flex justify-center z-50 gap-4 bottom-6">
			{#each { length: totalDots } as _, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					on:click={() => go(i * currentPerPage)}
					class={isDotActive(currentIndex, i)
						? 'bg-white w-2 h-2 rounded-full'
						: 'bg-gray-200 w-2 h-2 rounded-full'}
				></li>
			{/each}
		</ul>
	{/if}
</div>

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/Experimental) for more information.
## Props
```javascript
let perPage = 1;
let loop = true;
let autoplay: number = 0;
let duration = 200;
let easing = 'ease-out';
let startIndex = 0;
let draggable = true;
let multipleDrag = true;
let threshold = 20;
let rtl = false;
let dots = false;
```

## Usage
```svelte
<script lang="ts">import Carousal from "@grampro/svelte-block/Carousal.svelte";
</script>
	<Carousal perPage={1} autoplay={3000}>
		<div class="w-full flex rounded-lg h-auto md:h-50 px-2">
			<img
				src="https://www.sony.net/Products/di_photo-gallery/images/extralarge/1634.JPG"
				alt=""
				class="w-full object-cover rounded-lg"
			/>
		</div>
		<div class="w-full flex rounded-lg h-auto md:h-50 px-2">
			<img
				src="https://www.sony.net/Products/di_photo-gallery/images/extralarge/1631.JPG"
				alt=""
				class="w-full object-cover rounded-lg"
			/>
		</div>
	</Carousal>
```
-->
