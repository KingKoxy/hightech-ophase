<script lang="ts">
	import Headline from '$lib/components/Headline.svelte';

	import raveAvif from '$lib/assets/images/akkRave2022.avif';
	import raveJpg from '$lib/assets/images/akkRave2022.jpg';
	import raveWebp from '$lib/assets/images/akkRave2022.webp';
	import hikingAvif from '$lib/assets/images/wandern.avif';
	import hikingJpg from '$lib/assets/images/wandern.jpg';
	import hikingWebp from '$lib/assets/images/wandern.webp';
</script>

<section class="mb-10">
	<Headline>In der O-Phase</Headline>
	<div class="lg:flex">
		<div class="lg:inline lg:mr-8 text-justify lg:mb-0 mb-5">
			Neben Freibier ;) (Nur solange der Vorrat reicht) bringt unsere Gruppe seit acht Jahren
			erfolgreich die elektronische Feierkultur in die O-Phase. Dazu gehören Techno-Partys wie
			Raves. Aber auch für Nicht-Raver haben wir ein ausgefeiltes Programm im Angebot. Mit uns kann
			man nämlich nicht nur Feiern, sondern auch Wandern, einfach mal ein Bierchen am AKK (dem
			Uni-eigenen Biergarten ;)) trinken, im Park brunchen, über Ethik und Philosphie diskutieren
			und tatsächlich auch lernen und studieren :D
			<br /><br />
			Besonders viel Wert legen wir auf ein harmonisches Miteinander in dem jeder so akzeptiert wird,
			wie er ist. Durch diese Philosphie hat sich mittlerweile ein großer Freundeskreis rund um unsere
			O-Phasengruppe entwickelt, welcher weit über die O-Phase hinaus geht. Das führt uns zu:
		</div>
		<img
			class="lg:h-[300px]"
			src={raveJpg}
			alt="Akk Rave"
			srcset="{raveAvif}, {raveWebp}, {raveJpg}"
		/>
	</div>
</section>
<section>
	<Headline>Nach der O-Phase</Headline>
	<div class="text-justify">
		<img
			src={hikingJpg}
			alt="Wandern"
			class="md:float-right md:h-[250px] md:ml-4 md:mb-2 mb-5 w-full md:w-auto"
			srcset="{hikingAvif}, {hikingWebp}, {hikingJpg}"
		/>
		Wir sind sehr stolz darauf als eine der einzigen O-Phasengruppen uns nicht nur auf die O-Phase zu
		beschränken. Unsere Gruppe bietet dir einen breit gefächerten Freundeskreis in dem man sich hilft
		und unterstützt, sei es für die Uni oder Privates. Gemeinsam organisieren wir auch unter dem Semester
		regelmäßig Events, wie Partys oder Raves, Wanderungen und Urlaube. Wer sich hier besonders engagieren
		möchte, kann das auch in unserer Hochschulgruppe, welche zum Beispiel den halbjährigen Rave (Glühwein-
		oder Frühlingsrave) am AKK organisiert, bei dem wir das letze Mal über 2000 Besucher hatten. Es findet
		sich aber auch immer eine gute Gruppe, um auf andere Partys oder Festivals zu gehen, nicht nur (wenn
		auch hauptsächlich) im elektronischen Bereich. Zusätzlich dazu gibt es viele Teilgruppen unserer
		Gemeinschaft die regelmäßig Zusammenkünfte organisieren, wie den Lesekreis, in dem Texte aller Art
		gelesen und anschließlich diskutiert werden, oder den Utopia-Brunch, bei dem wir für einige Stunden
		der Welt entkommen, unser Essen teilen und einfach wir selbst sind. Jeden Mittwoch ist außerdem Barabend
		in der K2 Bar und bei gutem Wetter sind wir regelmäßig im Fasanengarten aufzufinden und gut zu erkennen
		an lauten Bässen, die wir quer durch den Park wummern lassen.
		<br /><br />
		Wenn du also jemanden suchst, mit dem du lernen, feiern oder auch einfach nur ein (oder zehn) gemütliche(s)
		Bier trinken kannst, dann bist du bei uns gold-(oder besser grün-)richtig ;)
		<br /><br />
		Und nicht vergessen: Wir sind HiGH! ... tech...
	</div>
</section>
