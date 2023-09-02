<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import DayItem from './DayItem.svelte';

	import { queryToSchedule } from '$lib/utils';

	import { graphql } from '$houdini';
	export let data;

	$: ({ GetAllEvents } = data);
	$: schedule = queryToSchedule($GetAllEvents?.data) ?? [];
</script>

<Headline>Zeitplan</Headline>
<!-- <div class="text-xl">CUMMING SOON 💦</div> -->
<div class="md:mx-10 mt-5">
	<!--	TODO: Loading indicator?-->
	{#each schedule.sort((a, b) => {
		return a.index - b.index;
	}) as day, i}
		<div class:mb-10={i < schedule.length - 1}>
			<DayItem {day} />
		</div>
	{/each}
</div>
