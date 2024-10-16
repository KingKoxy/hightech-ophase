<script lang="ts">
	import groupAvif from '$lib/assets/images/gruppenfoto.avif';
	import groupJpg from '$lib/assets/images/gruppenfoto.jpg';
	import groupWebp from '$lib/assets/images/gruppenfoto.webp';
	import Headline from '$lib/components/Headline.svelte';

	import VideoItem from './VideoItem.svelte';
	import ContactCard from './ContactCard.svelte';
	import { PAGES } from '$lib/constants';
	import hikingAvif from '$lib/assets/images/wandern.avif';
	import hikingWebp from '$lib/assets/images/wandern.webp';
	import hikingJpg from '$lib/assets/images/wandern.jpg';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	export let data;
	$: isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;
</script>

<section>
	<Headline>Willkommen</Headline>
	<div class="md:flex">
		<div class="inline-block md:mr-8 text-justify md:mb-0 mb-5">
			Da du das hier liest, heißt das wohl, dass du bald anfängst <strong
				>Informatik oder Mathe am KIT</strong
			>
			zu studieren. Bei uns in Karlsruhe beginnt das Studium immer mit einer Woche ohne Vorlesungen,
			der sog. <a href="https://o-phase.com">O-Phase</a>
			(kurz für Orientierungsphase), in der euch die Uni und Karlsruhe gezeigt werden.
			<br /><br />
			Anders als bei anderen Fakultäten ist die Umsetzung der O-Phase bei uns Informatikern nicht nur
			zentral von der Fachschaft organisiert, sondern vor allem von den
			<strong>verschiedenen O-Phasengruppen</strong>, welche alle ihr eigenes Programm haben und
			unabhängig von Studierenden organisiert sind. Was uns als Gruppe zur
			<strong>ersten Wahl</strong> macht, liest du am besten weiter unten oder in unserem
			<a href="/schedule">Wochenplan</a> für die O-Phase nach.
		</div>

		<picture class="flex-shrink-0 max-w-1/2">
			<source type="image/avif" srcset={groupAvif} />
			<source type="image/webp" srcset={groupWebp} />
			<img class="md:h-[300px] object-contain object-top" src={groupJpg} alt="Gruppenfoto" height="300" width="450"/>
		</picture>
	</div>
</section>
<section>
	<Headline>Wer sind wir?</Headline>
	<div class="md:flex">
		<div class="md:mr-8 text-justify md:mb-0 mb-5">
			Unsere Gruppe ist <strong>seit 2014</strong> (also schon {new Date().getFullYear() - 2014} Jahre!)
			erfolgreich dabei, die <strong>elektronische Feierkultur</strong> in die O-Phase zu
			integrieren. Dabei bieten wir euch nicht nur <strong>Freibier</strong> (solange der Vorrat
			reicht 😉), sondern auch eine Möglichkeit <strong>neue Freunde</strong> fürs Studium und fürs
			Leben zu finden. Wir organisieren verschiedene <strong>Techno-Partys</strong> und
			<strong>Raves</strong>, haben aber auch für Nicht-Raver einiges zu bieten. So gibt es zum
			Beispiel eine <strong>Kneipentour</strong>, bei der wir euch die wichtigsten Kneipen und Bars
			Karlsruhes zeigen. Aber das ist noch nicht alles!
			<br />
			Neben den ausgelassenen Feiern, haben wir auch ein <strong>vielfältiges Programm</strong>
			parat. Du kannst mit uns <strong>wandern</strong>, entspannt ein Bierchen im
			<strong>Campusbiergarten AKK</strong>
			genießen, im Park <strong>brunchen</strong>, an <strong>lebhaften Diskussionen</strong> über
			Ethik und Philosophie teilnehmen und tatsächlich auch <strong>lernen und studieren</strong>
			😄.
			<br /><br />
			Besonders viel Wert legen wir auf ein <strong>harmonisches Miteinander</strong> in dem jeder
			so akzeptiert wird, wie er ist. Durch diese Philosophie hat sich mittlerweile ein
			<strong>großer Freundeskreis</strong>
			rund um unsere O-Phasengruppe entwickelt, welcher
			<strong>weit über die O-Phase hinaus</strong>
			geht. Mehr dazu kannst du unter
			<a href="/later">{PAGES['/later'].name}</a> nachlesen.
			<br /><br />
			Und nicht vergessen: Wir sind <strong class="text-2xl">HiGH!</strong> ...<span class="text-xs"
				>tech</span
			>
		</div>
		<picture class="flex-shrink-0 max-w-1/2">
			<source type="image/avif" srcset={hikingAvif} />
			<source type="image/webp" srcset={hikingWebp} />
			<img class="md:h-[300px] object-contain object-top" src={hikingJpg} alt="Akk Rave" height="300" width="400"/>
		</picture>
	</div>
</section>
{#if isOPhase}
	<section>
		<Headline>Kontakt</Headline>
		Bei
		<strong>Fragen, Problemen, etc.</strong> schreibt am besten in der
		<strong>WhatsApp-Gruppe,</strong>
		per
		<strong>Direktnachricht</strong> oder sprecht einfach einen der <strong>Tutoren</strong> an. Für
		den absoluten Notfall findet ihr hier noch einmal die Nummern der
		<strong>Hauptverantwortlichen: </strong>
		{#await data.contactsPromise}
			<div class="flex w-full p-10 items-center justify-center h-full">
				<LoadingSpinner />
			</div>
		{:then contacts}
			{#each contacts as contact}
				<ContactCard {contact} />
			{/each}
		{/await}
	</section>
{/if}
<section>
	<Headline>O-Phasenvideos</Headline>
	{#await data.videosPromise}
		<div class="flex w-full p-10 items-center justify-center h-full">
			<LoadingSpinner />
		</div>
	{:then videos}
		<div class="flex flex-col items-center max-w-[800px]">
			{#each videos.sort((b, a) => {
				// Sort descending
				return a.title.localeCompare(b.title);
			}) ?? [] as video, i}
				<VideoItem class={i < videos.length - 1 ? 'mb-10' : ''} {video} />
			{/each}
		</div>
	{/await}
</section>
