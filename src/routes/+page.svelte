<script lang="ts">
	import groupAvif from '$lib/assets/images/gruppenfoto.avif';
	import groupJpg from '$lib/assets/images/gruppenfoto.jpg';
	import groupWebp from '$lib/assets/images/gruppenfoto.webp';
	import Headline from '$lib/components/Headline.svelte';

	import VideoItem from './VideoItem.svelte';
	import raveAvif from '$lib/assets/images/akkRave2022.avif';
	import raveWebp from '$lib/assets/images/akkRave2022.webp';
	import ContactCard from './ContactCard.svelte';
	import raveJpg from '$lib/assets/images/akkRave2022.jpg';

	export let data;
	$: isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;
</script>

<section class="mb-10">
	<Headline>Willkommen</Headline>
	<div class="md:flex">
		<div class="inline-block md:mr-8 text-justify md:mb-0 mb-5">
			Da du das hier liest, heißt das wohl, dass du bald anfängst, Informatik oder Mathe am KIT zu
			studieren. Bei uns in Karlsruhe beginnt das Studium immer mit einer Woche ohne Vorlesungen,
			der sog. <a href="https://o-phase.com">O-Phase</a>
			(kurz für Orientierungsphase), in der euch die Uni und Karlsruhe gezeigt werden.
			<br /><br />
			Anders als andere Fakultäten, ist die Umsetzung der O-Phase bei uns Informatikern nicht nur zentral
			von der Fachschaft organisiert, sondern von den verschiedensten O-Phasengruppen, welche alle ihr
			eigenes Programm haben und unabhängig von Studierenden organisiert sind. Was uns als Gruppe zur
			ersten Wahl macht, liest du am besten weiter unten oder in unserem
			<a href="/schedule">Wochenplan</a> für die O-Phase nach.
		</div>

		<picture class="flex-shrink-0 max-w-1/2">
			<source type="image/avif" srcset={groupAvif} />
			<source type="image/webp" srcset={groupWebp} />
			<img class="md:h-[300px] object-contain object-top" src={groupJpg} alt="Gruppenfoto" />
		</picture>
	</div>
</section>
<section class="mb-10">
	<Headline>Wer sind wir?</Headline>
	<div class="md:flex">
		<div class="md:mr-8 text-justify md:mb-0 mb-5">
			Unsere Gruppe ist seit 2014 erfolgreich dabei, die elektronische Feierkultur in die O-Phase zu
			integrieren. Dabei bieten wir euch nicht nur Freibier (solange der Vorrat reicht 😉), sondern
			auch eine Möglichkeit neue Freunde fürs Studium und fürs Leben zu finden. Wir organisieren
			Techno-Partys wie Raves, die nicht nur Raver ansprechen, sondern auch für Nicht-Raver einiges
			zu bieten haben. Aber das ist noch nicht alles! Neben dem ausgelassenen Feiern, haben wir auch
			ein vielfältiges Programm parat. Du kannst mit uns wandern, entspannt ein Bierchen im
			Uni-eigenen Biergarten AKK genießen, im Park brunchen, an lebhaften Diskussionen über Ethik
			und Philosophie teilnehmen und tatsächlich auch lernen und studieren 😄
			<br /><br />
			Besonders viel Wert legen wir auf ein harmonisches Miteinander in dem jeder so akzeptiert wird,
			wie er ist. Durch diese Philosophie hat sich mittlerweile ein großer Freundeskreis rund um unsere
			O-Phasengruppe entwickelt, welcher weit über die O-Phase hinaus geht. Mehr dazu kannst du unter
			<a href="/about">Nach der O-Phase</a> nachlesen.
		</div>
		<picture class="flex-shrink-0 max-w-1/2">
			<source type="image/avif" srcset={raveAvif} />
			<source type="image/webp" srcset={raveWebp} />
			<img class="md:h-[300px] object-contain object-top" src={raveJpg} alt="Akk Rave" />
		</picture>
	</div>
</section>
{#if isOPhase}
	<section class="mb-10">
		<Headline>Kontakt</Headline>
		Bei
		<strong>Fragen, Problemen, etc.</strong> schreibt am besten in der
		<strong>WhatsApp-Gruppe,</strong>
		per
		<strong>Direktnachricht</strong> oder sprecht einfach einen der <strong>Tutoren</strong> an. Für
		den absoluten Notfall findet ihr hier noch einmal die Nummern der
		<strong>Hauptverantwortlichen: </strong>
		{#each data.contacts as contact}
			<ContactCard {contact} />
		{/each}
	</section>
{/if}
<section>
	<Headline>O-Phasenvideos</Headline>
	<div class="flex flex-col items-center max-w-[800px]">
		{#each data.videos.sort((b, a) => {
			// Sort descending
			return a.title.localeCompare(b.title);
		}) ?? [] as video, i}
			<VideoItem class={i < data.videos.length - 1 ? 'mb-10' : ''} {video} />
		{/each}
	</div>
</section>
