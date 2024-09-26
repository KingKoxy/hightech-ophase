<script lang="ts">
	import raveAvif from '$lib/assets/images/akkRave2022.avif';
	import raveJpg from '$lib/assets/images/akkRave2022.jpg';
	import raveWebp from '$lib/assets/images/akkRave2022.webp';
	import hikingAvif from '$lib/assets/images/wandern.avif';
	import hikingJpg from '$lib/assets/images/wandern.jpg';
	import hikingWebp from '$lib/assets/images/wandern.webp';
	import Headline from '$lib/components/Headline.svelte';

	import type { PageData } from './$houdini';
	import ContactCard from './ContactCard.svelte';

	export let data: PageData;

	$: queryData = data?.GetAllContacts;

	$: contacts = $queryData?.data?.contactCollection.items ?? [];

	$: isOPhase = new Date().getMonth() === 8 || new Date().getMonth() === 9;
</script>

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
		{#each contacts as contact}
			<ContactCard {contact} />
		{/each}
	</section>
{/if}
<section class="mb-10">
	<Headline>In der O-Phase</Headline>
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
			O-Phasengruppe entwickelt, welcher weit über die O-Phase hinaus geht. Das führt uns zu:
		</div>
		<picture class="flex-shrink-0 max-w-1/2">
			<source type="image/avif" srcset={raveAvif} />
			<source type="image/webp" srcset={raveWebp} />
			<img class="md:h-[300px] object-contain object-top" src={raveJpg} alt="Akk Rave" />
		</picture>
	</div>
</section>
<section>
	<Headline>Nach der O-Phase</Headline>
	<div class="text-justify">
		<picture>
			<source srcset={hikingAvif} type="image/avif" />
			<source srcset={hikingWebp} type="image/webp" />
			<img
				src={hikingJpg}
				alt="Wandern"
				class="md:float-right md:h-[250px] md:ml-4 md:mb-2 mb-5 w-full md:w-auto"
			/></picture
		>
		Wir sind sehr stolz darauf als eine der einzigen O-Phasengruppen uns nicht nur auf die O-Phase zu
		beschränken. Unsere Gruppe bietet dir einen breit gefächerten Freundeskreis in dem man sich hilft
		und unterstützt, sei es für die Uni oder Privates. Gemeinsam organisieren wir auch unter dem Semester
		regelmäßig Events, wie Partys oder Raves, Wanderungen und Urlaube. Wer sich hier besonders engagieren
		möchte, kann das auch in unserer Hochschulgruppe. Diese organisiert zum Beispiel die halbjährigen
		Raves am AKK, bei denen wir das letzte Mal über 2000 Besucher hatten. Es findet sich aber auch immer
		eine gute Gruppe, um auf andere Partys oder Festivals zu gehen, nicht nur (wenn auch hauptsächlich)
		im elektronischen Bereich. Jeden Mittwoch ist außerdem Barabend in der K2 Bar und bei gutem Wetter
		sind wir regelmäßig im Fasanengarten aufzufinden und gut zu erkennen an lauten Bässen, die wir quer
		durch den Park wummern lassen.
		<br /><br />
		Wenn du also jemanden suchst, mit dem du lernen, feiern oder auch einfach nur ein (oder zehn) gemütliches
		Bier trinken kannst, dann bist du bei uns grün-richtig 😉
		<br /><br />
		Und nicht vergessen: Wir sind HiGH! ... tech...
	</div>
</section>
