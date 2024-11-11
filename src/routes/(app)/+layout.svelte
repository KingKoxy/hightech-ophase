<script lang="ts">
	import '../../app.css';
	import '../../icons.css';
	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import Header from '$lib/components/nav/Header.svelte';
</script>

<Header />
<main
	in:fade={{ duration: 200, delay: 200 }}
	out:fade={{ duration: 200 }}
	class="flex justify-center flex-grow"
>
	<div class="xl:w-[55%] h-full w-full mb-0 m-7 md:mb-0 xl:mt-0 md:m-10 flex gap-10 flex-col">
		<slot />
	</div>
</main>
{#if $page.route.id !== '/imprint'}
	<footer class="p-3 mt-2 flex justify-center">
		<a href="/imprint">Impressum</a>
	</footer>
{/if}
<div class="h-[80px] sm:h-0" />
<BottomNav />
