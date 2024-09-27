<script lang="ts">
	import type { IVideo } from '$lib/types';

	export let video: IVideo;
</script>

<!--56.25% für 16:9-->
<div class="relative overflow-hidden w-full pt-[56.25%] {$$props.class}">
	<iframe
		class="absolute top-0 left-0 bottom-0 right-0 w-full h-full z-0"
		src={video.url}
		title={video.title}
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
</div>
