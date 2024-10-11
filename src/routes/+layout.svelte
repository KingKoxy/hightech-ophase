<script lang="ts">
	import '../app.css';
	import '../icons.css';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import Header from '$lib/components/nav/Header.svelte';
	import { darkMode } from '$lib/stores';

	onMount(() => {
		if (localStorage.getItem('theme') === 'dark') darkMode.set(true);
		else darkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);

		darkMode.subscribe((value) => {
			if (value) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		});
	});
</script>

<svelte:head>
	<title>O-Phase HiGHtech</title>
	<meta name="description" content="Die offizielle Seite der Gruppe HiGH-tech zur O-Phase am KIT" />
	<meta name="theme-color" content="#4ab93d" />
	<link href="/fonts/fonts.css" rel="stylesheet" />
	<script>
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<main class="dark:bg-backgroundDark-500 w-full min-h-screen transition-all duration-200">
	<Header />
	<div
		in:fade={{ duration: 200, delay: 200 }}
		out:fade={{ duration: 200 }}
		class="w-full flex justify-center dark:text-white"
	>
		<div class="xl:w-[55%] h-full w-full mb-0 m-7 md:mb-0 xl:mt-0 md:m-10 flex gap-10 flex-col">
			<slot />
		</div>
	</div>
	{#if $page.route.id !== '/imprint'}
		<footer class="p-3 mt-2 flex justify-center">
			<a href="/imprint">Impressum</a>
		</footer>
	{/if}
	<div class="h-[80px] sm:h-0"></div>
	<BottomNav />
</main>

<style lang="postcss">
	:global(a:not(.navlink)) {
		@apply relative text-grasshopperGreen-500 font-bold;
	}

	:global(a:not(.navlink)::after) {
		content: '';
		@apply bg-grasshopperGreen-500 absolute transition-all duration-300 h-px w-0 left-0 bottom-0;
	}

	:global(a:not(.navlink):hover::after) {
		@apply w-full;
	}
</style>
