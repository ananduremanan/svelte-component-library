<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let showModal: boolean = false;
	export let modalTitle: string = 'Modal Title';
	export let autoclose: boolean = false;
	export let modalClass: string =
		'fixed z-10 overflow-y-auto inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity';
	export let modalContentClass: string = 'bg-white m-10 md:w-[80vh] rounded-xl';
	export let classModalContent: string = '';
	export let modalTitleClass: string =
		'p-4 text-lg leading-6 font-medium text-gray-900 flex justify-between';
	export let classModalTitle: string = '';

	function autoCloseHandler() {
		if (autoclose) {
			showModal = false;
		}
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class={modalClass}
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		on:click={autoCloseHandler}
	>
		<div
			class={twMerge(modalContentClass, classModalContent)}
			on:click|stopPropagation
			role="dialog"
		>
			<div class={twMerge(modalTitleClass, classModalTitle)}>
				{modalTitle}
			</div>
			<hr />
			<div class="p-4"><slot /></div>
		</div>
	</div>
{/if}

<!--
## Usage Guide
@component
[Go to docs](https://gbs-svelte-bblock.netlify.app/components/Modal) for more information.
## Props
```javascript
let showModal: boolean = false;
let modalTitle: string = 'Modal Title';
let autoclose: boolean = false;
let modalClass: string =
	'fixed z-10 overflow-y-auto inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity';
let modalContentClass: string = 'bg-white m-10 md:w-[80vh] rounded-xl';
let classModalContent: string = '';
let modalTitleClass: string =
	'p-4 text-lg leading-6 font-medium text-gray-900 flex justify-between';
let classModalTitle: string = '';
```

## Usage
```svelte
<script lang="ts">import { Button } from "@grampro/svelte-block";
import { Modal } from "@grampro/svelte-block";
let showModal = false;
</script>

<div>
	<Button
		on:click={() => {
			showModal = !showModal;
		}}>Show Modal</Button
	>

	<Modal bind:showModal autoclose modalTitle="Disclaimer">
		<p class="text-xs">
			The information provided on this website is for general informational purposes only.
		</p>
		<div>
			<Button class="mt-2">Accept</Button>
		</div>
	</Modal>
</div>

```
-->
