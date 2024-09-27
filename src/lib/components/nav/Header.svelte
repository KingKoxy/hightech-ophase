<script lang="ts">
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import lightModeAnim from '$lib/assets/animations/lightMode.json';
	import { darkMode } from '$lib/stores';

	import Nav from './TopNav.svelte';
	import { contentfulClient } from '$lib/client';

	let animationContainer: HTMLElement;
	let animation; //Type is AnimationItem from lottie-web but if the type is imported lottie tries to manipulate the document which fails because its ssr

	function toggleDarkMode() {
		animation.stop();
		if (get(darkMode)) {
			animation.playSegments([14, 28], true);
		} else {
			animation.playSegments([0, 14], true);
		}
		darkMode.set(!get(darkMode));
	}

	onMount(async () => {
		const lottie = (await import('lottie-web')).default;
		// Load the initial light mode animation
		animation = lottie.loadAnimation({
			container: animationContainer,
			renderer: 'svg',
			loop: false,
			animationData: lightModeAnim
		});
		animation.goToAndStop(get(darkMode) ? 14 : 0, true);
		animation.pause();
	});

	const logo = writable<string>();

	contentfulClient.getAsset('7dtuCnKBcp0Qw62DjPCW5F').then((asset) => {
		if (!asset.fields.file) return;
		logo.set(asset.fields.file.url);
	});
</script>

<div class="sticky top-0 w-full flex z-50 select-none">
	<div
		class="md:block hidden bg-grasshopperGreen-700 p-2 rounded-br-xl w-[280px] h-[140px] object-cover z-20 shadow-lg shadow-black/30"
	>
		{#if $logo}
			<img src={$logo} class="object-contain w-full h-full" alt="HiGHtech O-Phasen Logo" />
		{/if}
	</div>
	<header class="flex-grow">
		<div
			class="h-[70px] lg:h-[50%] flex justify-between items-center p-2 pr-5 bg-grasshopperGreen-500 shadow-lg shadow-black/30 z-10"
		>
			<div class="h-full flex items-center">
				<div class="md:hidden h-full">
					{#if $logo}
						<img src={$logo} class="object-contain h-full" alt="HIGHtech O-Phasen Logo" />
					{/if}
				</div>
				<h1 class="sm:hidden font-bold text-lg">O-Phase {new Date().getFullYear()}</h1>
				<Nav />
			</div>
			<button
				class="flex items-center relative h-[24px] w-[24px] cursor-pointer"
				on:click={toggleDarkMode}
				bind:this={animationContainer}
			/>
		</div>
	</header>
</div>
