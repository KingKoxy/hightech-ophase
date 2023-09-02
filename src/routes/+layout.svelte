<script lang="ts">
	import { onMount } from 'svelte';
	import 'virtual:windi-devtools';
	import 'virtual:windi.css';

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
	<div class="w-full flex justify-center dark:text-white pb-[80px] sm:pb-0">
		<div class="xl:w-[55%] h-full w-full m-7 xl:mt-0 md:m-10">
			<slot />
		</div>
	</div>
	<BottomNav />
</main>

<style global>
	a:not(.navlink) {
		@apply relative hover:no-underline text-grasshopperGreen-500;
	}

	a:not(.navlink)::after {
		content: '';
		@apply bg-grasshopperGreen-500 absolute transition-all duration-300 h-px w-0 left-0 bottom-0;
	}

	a:not(.navlink):hover::after {
		@apply w-full;
	}
</style>
