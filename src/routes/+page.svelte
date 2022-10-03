<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';
	import VideoItem from './VideoItem.svelte';

	import { VIDEOS } from '$lib/constants';

	import groupAvif from '$lib/assets/images/gruppenfoto.avif';
	import groupJpg from '$lib/assets/images/gruppenfoto.jpg';
	import groupWebp from '$lib/assets/images/gruppenfoto.webp';

	let VideoSection;
</script>

<section class="mb-10">
	<Headline>Willkommen</Headline>
	<div class="md:flex ">
		<div class="inline-block md:mr-8 text-justify lg:mb-0 mb-5">
			Da du das hier liest, heißt das wohl, dass du bald anfängst, Informatik oder Mathe am KIT zu
			studieren. Bei uns in Karlsruhe beginnt das Studium immer mit einer Woche ohne Vorlesungen,
			der sog. <a class="text-grasshopperGreen-500" href="https://o-phase.com">O-Phase</a>
			(kurz für Orientierungsphase), in der euch die Uni und Karlsruhe gezeigt werden.
			<br /><br />
			Anders als andere Fakultäten, ist die Umsetzung der O-Phase bei uns Informatikern nicht nur zentral
			von der Fachschaft organisiert, sondern von den verschiedensten O-Phasengruppen, welche alle ihr
			eigenes Programm haben und unabhängig von Studierenden organisiert sind. Was uns als Gruppe zur
			ersten Wahl macht, liest du am besten unter "Über uns" oder in unserem Wochenplan für die O-Phase
			nach =)
		</div>
		<img
			src={groupJpg}
			alt="Gruppenfoto"
			class="inline-block md:h-[300px]"
			srcset="{groupAvif},
							{groupWebp},
							{groupJpg}
							"
		/>
	</div>
</section>
<section>
	<Headline>O-Phasenvideos</Headline>
	<div class="flex flex-col items-center max-w-[800px]">
		{#each VIDEOS as video, i}
			<VideoItem class={i < VIDEOS.length - 1 ? 'mb-10' : ''} {video} />
		{/each}
	</div>
</section>
<svelte:component this={VideoSection} />
