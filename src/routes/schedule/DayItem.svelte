<script lang="ts">
	import { DAY_MAP } from '$lib/constants';
	import type { IDay } from '$lib/types';
	import EventItem from './EventItem.svelte';

	export let day: IDay;
	export let currentDate: Date;

	const events = day.events.sort((a, b) => {
		return a.date.toISOString().localeCompare(b.date.toISOString());
	});

	let activeIndex = -1;
	// If the current date is the same as the day's date, highlight the event that is currently happening
	// The day should change at 03:00
	const todayMinus3 = new Date();
	todayMinus3.setTime(currentDate.getTime() - 3 * 60 * 60 * 1000);

	if (day.date.toISOString().split('T')[0] === todayMinus3.toISOString().split('T')[0]) {
		for (let i = 0; i < events.length - 1; i++) {
			if (currentDate < events[i+1].date) {
				activeIndex = i;
				break;
			}
		}
		if (activeIndex == -1) activeIndex = events.length - 1;
	}
</script>

<div class="text-lg mb-3 font-semibold">{DAY_MAP[day.weekdayIndex]}</div>
<div class="border-gray-500 border-2 border-b-0">
	{#each events as event, i}
		<EventItem {event} active={i === activeIndex} />
	{/each}
</div>
