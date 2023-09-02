<script lang="ts">
	import { get } from 'svelte/store';
	import lottie from 'lottie-web';
	import lightModeAnim from '$lib/assets/animations/lightMode.json';
	import Nav from './TopNav.svelte';

	import { darkMode } from '$lib/stores';

	import logo from '$lib/assets/icons/logo.svg';
	import { onMount } from 'svelte';

	let animationContainer;
	let animation;

	function toggleDarkMode() {
		if (get(darkMode)) {
			animation.stop();
			animation.playSegments([14, 28], true);
		} else {
			animation.stop();
			animation.playSegments([0, 14], true);

			animation.play();
		}
		darkMode.set(!get(darkMode));
	}

	onMount(() => {
		// Load the initial light mode animation
		animation = lottie.loadAnimation({
			container: animationContainer,
			renderer: 'svg',
			loop: false,
			animationData: lightModeAnim // Path to your light mode animation JSON file
		});
		animation.goToAndStop(get(darkMode) ? 0 : 14, true);
		animation.pause();
	});
</script>

<div class="sticky top-0 w-full flex z-50 select-none">
	<div
		class="md:block hidden bg-grasshopperGreen-700 p-2 rounded-br-xl w-[280px] h-[140px] object-cover z-20 shadow-lg shadow-black/30"
	>
		<img src={logo} class="object-contain w-full h-full" alt="HiGHtech O-Phasen Logo" />
	</div>
	<header class="flex-grow">
		<div
			class="h-[70px] lg:h-[50%] flex justify-between items-center p-2 pr-5 bg-grasshopperGreen-500 shadow-lg shadow-black/30 z-10"
		>
			<div class="h-full flex items-center">
				<div class="md:hidden h-full">
					<img src={logo} class="object-contain h-full" alt="HIGHtech O-Phasen Logo" />
				</div>
				<h1 class="sm:hidden font-bold text-lg">O-Phase 2023</h1>
				<Nav />
			</div>
			<div
				class="flex items-center relative h-[24px] w-[24px] cursor-pointer"
				on:click={toggleDarkMode}
				bind:this={animationContainer}
			/>
		</div>
	</header>
</div>
