<script lang="ts">
	import { page } from '$app/stores';

	export let url: string;

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
