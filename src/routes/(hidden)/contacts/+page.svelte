<script>
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import Headline from '$lib/components/Headline.svelte';
	import ContactCard from './ContactCard.svelte';
	export let data;

</script>

{#if data.isOPhase}
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
