<script lang="ts">
	import ical from 'ical-generator';

	import exportBlack from '$lib/assets/icons/exportBlack.svg';
	import exportWhite from '$lib/assets/icons/exportWhite.svg';
	import Headline from '$lib/components/Headline.svelte';
	import { darkMode } from '$lib/stores.js';
	import { queryToEvents,queryToSchedule } from '$lib/utils';

	import type { PageData } from './$houdini';
	import DayItem from './DayItem.svelte';

	export let data: PageData;

	$: queryData = data?.GetAllEvents;
	$: schedule = queryToSchedule($queryData?.data) ?? [];

	function exportCalendar() {
		const calendar = ical({ name: 'Wochenplan O-Phase' });
		for (let calendarEvent of queryToEvents($queryData?.data)) {
			calendar.createEvent(calendarEvent);
		}
		const blob = calendar.toBlob();
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'Wochenplan.ics';
		link.click();

	}
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
		return a.index - b.index;
	}) as day, i}
		<div class:mb-10={i < schedule.length - 1}>
			<DayItem {day} />
		</div>
	{/each}
</div>
