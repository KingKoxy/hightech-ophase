<script lang="ts">
	import BottomNavLink from '$lib/components/nav/BottomNavLink.svelte';
	import { PAGES } from '$lib/constants';
</script>

<div
	class="flex sm:hidden select-none items-center justify-evenly bg-grasshopperGreen-500 fixed bottom-0 left-0 right-0 p-3 w-full shadow"
>
	{#each Object.entries(PAGES) as [url, name]}
		<BottomNavLink {url} {name} />
	{/each}
</div>
