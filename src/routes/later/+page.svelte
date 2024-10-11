<script lang="ts">
	import raveAvif from '$lib/assets/images/akkRave2022.avif';
	import raveWebp from '$lib/assets/images/akkRave2022.webp';
	import raveJpg from '$lib/assets/images/akkRave2022.jpg';
	import Headline from '$lib/components/Headline.svelte';
</script>

<section>
	<Headline>Die Naturfreunde am KIT</Headline>
	<div class="text-justify">
		<picture>
			<source srcset={raveAvif} type="image/avif" />
			<source srcset={raveWebp} type="image/webp" />
			<img
				src={raveJpg}
				alt="Wandern"
				class="md:float-right md:h-[250px] md:ml-4 md:mb-2 mb-5 w-full md:w-auto"
			/>
		</picture>
		Wir sind sehr stolz darauf als eine der einzigen O-Phasengruppen uns nicht nur auf die O-Phase zu
		beschränken. Die Meisten, wenn nicht sogar alle unserer Tutoren sind Mitglieder in der
		<strong>Hochschulgruppe "Die Naturfreunde am KIT"</strong>. Unsere Gruppe bietet dir einen breit
		gefächerten <strong>Freundeskreis</strong> in dem man sich <strong>hilft und unterstützt</strong>, sei es für die Uni oder
		Privates. Gemeinsam organisieren wir auch unter dem Semester regelmäßig Events, wie <strong>Partys oder
		Raves, Wanderungen und Urlaube</strong>. Dazu zählen zum Beispiel die <strong>halbjährigen Raves am AKK</strong>, bei
		denen wir das letzte Mal über 2000 Besucher hatten. Es findet sich aber auch immer eine gute
		Gruppe, um auf <strong>andere Partys oder Festivals</strong> zu gehen, nicht nur (wenn auch hauptsächlich) im
		elektronischen Bereich. Jeden Mittwoch ist außerdem <strong>Barabend in der K2 Bar</strong> und bei gutem Wetter
		sind wir <strong>regelmäßig im Fasanengarten</strong> aufzufinden und gut zu erkennen an lauten Bässen, die wir
		quer durch den Park wummern lassen.
		<br /><br />
		Wenn du also jemanden suchst, mit dem du <strong>lernen, feiern</strong> oder auch einfach nur ein (oder zehn) <strong>gemütliches
		Bier trinken</strong> kannst, dann bist du bei uns grün-richtig 😉. Tritt nach der O-Phase einfach unserer
		<strong>WhatsApp-Gruppe</strong> bei und komm am besten direkt zum nächsten Event vorbei. Wir freuen uns auf dich!
	</div>
</section>
<section>
	<Headline>Unsere Social Media</Headline>
	<ul class="ml-4 mt-2">
		<li>
			<a href="https://www.instagram.com/naturfreunde.kit">Instagram</a>
		</li>
		<li>
			<a href="https://www.youtube.com/@NaturfreundeamKIT/videos">YouTube</a>
		</li>
		<li>
			<a href="https://facebook.com/Naturfreundeamkit/">Facebook</a>
		</li>
	</ul>
</section>
<section>
	<Headline>Unsere DJs</Headline>
	<ul class="ml-4 mt-2">
		<li>
			<a href="https://soundcloud.com/luis-reissenweber">Luis Reissenweber</a>
		</li>
		<li>
			<a href="https://soundcloud.com/dj_julicorn">Julicorn</a>
		</li>
		<li>
			<a href="https://soundcloud.com/ilya_filippov">Ilya Filippov</a>
		</li>
		<li>
			<a href="https://soundcloud.com/itsnokya">Nokya</a>
		</li>
		<li>
			<a href="https://soundcloud.com/juliuspfister"> Julius Pfister </a>
		</li>
		<li>
			<a href="https://soundcloud.com/mete_mete"> METE</a>
		</li>
		<li>
			<a href="https://soundcloud.com/itsrerz"> rerz </a>
		</li>
		<li>
			<a href="https://soundcloud.com/user-601516904"> Kobaltikum </a>
		</li>
		<li>
			<a href="https://soundcloud.com/electra-twins"> Electra Twins </a>
		</li>
	</ul>
</section>
<!--<section>
	<Headline>Eindrücke von Events</Headline>
</section>-->

<style lang="postcss">
	li {
		@apply mb-1 list-[square];
	}
</style>
