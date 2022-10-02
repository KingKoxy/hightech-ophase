<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';

	import { VIDEOS } from '$lib/constants';
</script>

<section>
	<Headline>O-Phasenvideos</Headline>
	<div class="flex flex-col items-center max-w-[800px]">
		{#each VIDEOS as video, i}
			<!--56.25% für 16:9-->
			<div class="relative overflow-hidden w-full pt-[56.25%]" class:mb-10={i < VIDEOS.length - 1}>
				<iframe
					class="absolute top-0 left-0 bottom-0 right-0 w-full h-full z-0"
					src={video.url}
					title={video.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		{/each}
	</div>
</section>
