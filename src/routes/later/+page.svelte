<script lang="ts">
	import hikingAvif from '$lib/assets/images/wandern.avif';
	import hikingJpg from '$lib/assets/images/wandern.jpg';
	import hikingWebp from '$lib/assets/images/wandern.webp';
	import Headline from '$lib/components/Headline.svelte';
</script>


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
