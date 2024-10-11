<script lang="ts">
	import { page } from '$app/stores';

	export let url, name, icon: string;
	let active = false;

	page.subscribe((page) => {
		active = page.route.id === url;
	});
</script>

<a
	href={url}
	class="navlink transform w-[25%] font-semibold {active
		? 'scale-110 text-white'
		: 'scale-90'} flex flex-col items-center hover:text-white transition-all hover:no-underline text-center text-sm"
>
	<i class="{icon} text-xl" />
	<span class="pt-1">
		{name}
	</span>
</a>
