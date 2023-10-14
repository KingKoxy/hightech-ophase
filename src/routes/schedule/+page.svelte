<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import { queryToSchedule } from '$lib/utils';

	import type { PageData } from './$houdini';
	import DayItem from './DayItem.svelte';

	export let data: PageData;

	$: queryData = data?.GetAllEvents;
	$: schedule = queryToSchedule($queryData?.data) ?? [];
</script>

<Headline>Wochenplan</Headline>
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
