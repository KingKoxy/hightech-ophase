<script lang="ts">
	import { get } from 'svelte/store';

	import Nav from './TopNav.svelte';

	import { darkMode } from '$lib/stores';
</script>

<div class="sticky top-0 w-full flex z-50 select-none">
	<div
		class="md:block hidden bg-grasshopperGreen-700 p-2 rounded-br-xl w-[280px] h-[140px] object-cover z-20 shadow-lg shadow-black/30"
	>
		<img src="images/logo.svg" class="object-contain w-full h-full" alt="HiGHtech O-Phasen Logo" />
	</div>
	<header class="flex-grow">
		<div
			class="h-[70px] lg:h-[50%] flex justify-between items-center p-2 pr-5 bg-grasshopperGreen-500 shadow-lg shadow-black/30 z-10"
		>
			<div class="h-full flex items-center">
				<div class="md:hidden h-full mr-3">
					<img src="images/logo.svg" class="object-contain h-full" alt="HIGHtech O-Phasen Logo" />
				</div>
				<Nav />
			</div>

			<div
				class="flex items-center relative h-[24px] w-[24px] cursor-pointer"
				on:click={() => {
					darkMode.set(!get(darkMode));
				}}
			>
				{#if $darkMode}
					<img
						class="absolute left-0 top-0 bottom-0 right-0"
						draggable={false}
						src="/images/moon.svg"
						alt="Dark mode Icon"
					/>
				{:else}
					<img
						class="absolute left-0 top-0 bottom-0 right-0"
						draggable={false}
						src="/images/sun.svg"
						alt="Light mode Icon"
					/>
				{/if}
			</div>
		</div>
	</header>
</div>
