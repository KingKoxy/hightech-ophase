<script lang="ts">
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';
	import { onMount } from 'svelte';
	import 'virtual:windi-devtools';
	import 'virtual:windi.css';

	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import Header from '$lib/components/nav/Header.svelte';

	import { darkMode } from '$lib/stores';

	Sentry.init({
		dsn: 'https://450ead7479fe4705a95e722ff5cf292a@o1414799.ingest.sentry.io/4503930613465088',
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	});

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
	<div class="w-full flex justify-center dark:text-white p-7 md:p-10 pt-7 xl:pt-0 ">
		<div class="xl:w-[55%] w-full mb-[80px]">
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
