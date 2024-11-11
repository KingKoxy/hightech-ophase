<script lang="ts">
	import ical from 'ical-generator';

	import Headline from '$lib/components/Headline.svelte';
	import DayItem from './DayItem.svelte';
	import { onMount } from 'svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let data;

	async function exportCalendar() {
		const calendar = ical({ name: 'Wochenplan O-Phase' });
		for (let calendarEvent of await data.eventsPromise) {
			calendar.createEvent(calendarEvent);
		}
		const calendarText = calendar.toString();
		const blob = new Blob([calendarText], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'Wochenplan.ics';
		link.click();
		URL.revokeObjectURL(url);
	}

	let currentDate = new Date();

	onMount(() => {
		// Update the current date every 10s
		const interval = setInterval(() => {
			currentDate = new Date();
		}, 10000);
		return () => clearInterval(interval);
	});
</script>

<section>
	<Headline>
		<button class="text-3xl font-semibold flex gap-2" on:click={exportCalendar}>
			Wochenplan
			<i class="icon-export" />
		</button>
	</Headline>
	<!-- <div class="text-xl">CUMMING SOON 💦</div> -->
	<div class="md:mx-10 mt-5">
		{#await data.schedulePromise}
			<div class="flex w-full p-10 items-center justify-center h-full">
				<LoadingSpinner />
			</div>
		{:then schedule}
			{#each schedule.sort((a, b) => {
				return a.date.toISOString().localeCompare(b.date.toISOString());
			}) as day, i}
				<div class:mb-10={i < schedule.length - 1}>
					<DayItem {day} {currentDate} />
				</div>
			{/each}
		{/await}
	</div>
</section>
