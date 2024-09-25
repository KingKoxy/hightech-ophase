<script lang="ts">
	import type { IEvent } from '$lib/types';

	export let event: IEvent;
	export let active: boolean;
</script>

<div
	class="grid  border-b-2 grid-cols-[64px,1fr] border-gray-500 {active ? 'bg-grasshopperGreen-500 text-white' : ''}"
>
	<div
		class="flex justify-center items-center p-3 border-gray-500 border-r-2"
		class:bg-grasshopperGreen-500={active}
	>
		{event.startTime}
	</div>
	<div class="flex-grow p-3 text-sm">
		<div class="text-base">{event.title}</div>
		{#if event.locationLink}
			<div class="text-grasshopperGreen-500">
				<a href={event.locationLink} class="">{event.location}</a>
			</div>
		{:else}
			<p>{event.location}</p>
		{/if}
	</div>
</div>
