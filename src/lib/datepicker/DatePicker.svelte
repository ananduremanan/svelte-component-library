<!-- This Component is under development 
and trying to implement a datepicker without any 
external dependency -->

<script lang="ts">
	import { onMount } from 'svelte';

	let showDatepicker = false;
	let selectedDate = new Date();
	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();
	let days: any[] = [];

	const toggleDatepicker = () => {
		showDatepicker = !showDatepicker;
	};

	const selectDate = (date: any) => {
		selectedDate = date;
		showDatepicker = false;
	};

	const getDaysInMonth = (year: any, month: any) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const generateCalendar = (year: any, month: any) => {
		const daysInMonth = getDaysInMonth(year, month);
		const firstDay = new Date(year, month, 1).getDay();
		const weeks = [];
		let day = 1;

		for (let i = 0; i < 6; i++) {
			const week = [];
			for (let j = 0; j < 7; j++) {
				if (i === 0 && j < firstDay) {
					week.push(null);
				} else if (day > daysInMonth) {
					week.push(null);
				} else {
					week.push(new Date(year, month, day));
					day++;
				}
			}
			weeks.push(week);
		}
		return weeks;
	};

	const prevMonth = () => {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
		days = generateCalendar(currentYear, currentMonth);
	};

	const nextMonth = () => {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
		days = generateCalendar(currentYear, currentMonth);
	};

	onMount(() => {
		days = generateCalendar(currentYear, currentMonth);
	});
</script>

<div class="relative inline-block">
	<button on:click={toggleDatepicker} class="bg-gray-300 text-gray-700 p-2 rounded">
		{selectedDate.toLocaleDateString()}
	</button>

	{#if showDatepicker}
		<div class="datepicker">
			<div class="datepicker__header">
				<button on:click={prevMonth}>&laquo;</button>
				<span
					>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}
					{currentYear}</span
				>
				<button on:click={nextMonth}>&raquo;</button>
			</div>
			<div class="datepicker__days">
				{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
					<div class="datepicker__day font-bold">{day}</div>
				{/each}
				{#each days as week}
					{#each week as day}
						{#if day}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div on:click={() => selectDate(day)} class="datepicker__day">{day.getDate()}</div>
						{:else}
							<div class="datepicker__day"></div>
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.datepicker {
		position: absolute;
		z-index: 10;
		background: white;
		border: 1px solid #ddd;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.datepicker__header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 1rem;
	}
	.datepicker__days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		padding: 0.5rem 1rem;
	}
	.datepicker__day {
		text-align: center;
		padding: 0.5rem;
		cursor: pointer;
	}
	.datepicker__day:hover {
		background-color: #f0f0f0;
	}
</style>
