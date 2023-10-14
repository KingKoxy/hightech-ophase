<script lang="ts">
	import NavLink from '$lib/components/nav/TopNavLink.svelte';
	import { PAGES } from '$lib/constants';
</script>

<div class="text-lg sm:block hidden">
	{#each Object.entries(PAGES) as [url, name], i}
		<NavLink {url}>
			{name}
		</NavLink>
		{#if i !== Object.keys(PAGES).length - 1}
			<span class="mx-1">|</span>
		{/if}
	{/each}
</div>
