<script lang="ts">
	import { page } from '$app/stores';

	import calendarBlack from '$lib/assets/icons/nav/black/calendar.svg';
	import homeBlack from '$lib/assets/icons/nav/black/home.svg';
	import linkBlack from '$lib/assets/icons/nav/black/link.svg';
	import userBlack from '$lib/assets/icons/nav/black/user.svg';
	import calendarWhite from '$lib/assets/icons/nav/white/calendar.svg';
	import homeWhite from '$lib/assets/icons/nav/white/home.svg';
	import linkWhite from '$lib/assets/icons/nav/white/link.svg';
	import userWhite from '$lib/assets/icons/nav/white/user.svg';

	export let url, name: string;
	let active = false;

	page.subscribe((page) => {
		active = page.route.id === url;
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
		<img src={active ? homeWhite : homeBlack} alt="Home" />
	{:else if url === '/schedule'}
		<img src={active ? calendarWhite : calendarBlack} alt="Schedule" />
	{:else if url === '/about'}
		<img src={active ? userWhite : userBlack} alt="About" />
	{:else}
		<img src={active ? linkWhite : linkBlack} alt="Link" />
	{/if}
	<span class="pt-1">
		{name}
	</span>
</a>
