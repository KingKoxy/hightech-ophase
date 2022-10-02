<script lang="ts">
	import { page } from '$app/stores';
	import { CalendarIcon, HomeIcon, LinkIcon, UserIcon } from 'svelte-feather-icons';

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
		: 'scale-90'} flex flex-col items-center hover:text-white transition-all hover:no-underline text-center text-sm "
>
	{#if url === '/'}
		<HomeIcon />
	{:else if url === '/schedule'}
		<CalendarIcon />
	{:else if url === '/about'}
		<UserIcon />
	{:else}
		<LinkIcon />
	{/if}
	<span class="pt-1">
		{name}
	</span>
</a>
