<script lang="ts">
	import ical from 'ical-generator';

	import exportBlack from '$lib/assets/icons/exportBlack.svg';
	import exportWhite from '$lib/assets/icons/exportWhite.svg';
	import Headline from '$lib/components/Headline.svelte';
	import { darkMode } from '$lib/stores.js';
	import { queryToEvents, queryToSchedule } from '$lib/utils';

	import type { PageData } from './$houdini';
	import DayItem from './DayItem.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	$: queryData = data?.GetAllEvents;
	$: schedule = $queryData?.data ? queryToSchedule($queryData.data) : [];

	function exportCalendar() {
		const calendar = ical({ name: 'Wochenplan O-Phase' });
		for (let calendarEvent of $queryData?.data ? queryToEvents($queryData.data) : []) {
			calendar.createEvent(calendarEvent);
		}
		const calendarText = calendar.toString();
		const blob = new Blob([calendarText], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url
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

<Headline>
	<button class="text-3xl font-semibold flex" on:click={exportCalendar}>
		Wochenplan
		<img
			class="ml-1"
			height="30"
			width="30"
			src={$darkMode ? exportWhite : exportBlack}
			alt="Download"
		/>
	</button>
</Headline>
<!-- <div class="text-xl">CUMMING SOON 💦</div> -->
<div class="md:mx-10 mt-5">
	{#each schedule.sort((a, b) => {
		return a.date.toISOString().localeCompare(b.date.toISOString());
	}) as day, i}
		<div class:mb-10={i < schedule.length - 1}>
			<DayItem {day} {currentDate} />
		</div>
	{/each}
</div>
