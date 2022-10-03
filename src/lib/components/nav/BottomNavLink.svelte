<script lang="ts">
	import { page } from '$app/stores';

	import NavIcon from '../ColoredIcon.svelte';

	import calendar from '$lib/assets/icons/calendar.svg';
	import home from '$lib/assets/icons/home.svg';
	import link from '$lib/assets/icons/link.svg';
	import user from '$lib/assets/icons/user.svg';

	export let url, name: string;
	let active = false;

	page.subscribe((page) => {
		active = '/' + page.routeId === url;
	});
</script>

<a
	href={url}
	class="navlink mx-1 pb-2 hover:no-underline hover:text-white transition-all {active
		? 'text-white font-semibold'
		: ''}"
>
	<slot />
</a>

<a
	href={url}
	class="navlink transform w-[25%] font-semibold {active
		? 'scale-110 text-white'
		: 'scale-90'} flex flex-col items-center hover:text-white transition-all hover:no-underline text-center text-sm"
>
	{#if url === '/'}
		<NavIcon class="{active ? 'bg-white' : 'bg-black'} hover:bg-white" src={home} />
	{:else if url === '/schedule'}
		<NavIcon class="{active ? 'bg-white' : 'bg-black'} hover:bg-white" src={calendar} />
	{:else if url === '/about'}
		<NavIcon class="{active ? 'bg-white' : 'bg-black'} hover:bg-white" src={user} />
	{:else}
		<NavIcon class="{active ? 'bg-white' : 'bg-black'} hover:bg-white" src={link} />
	{/if}
	<span class="pt-1">
		{name}
	</span>
</a>

<style></style>
