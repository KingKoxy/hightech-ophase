<script lang="ts">
	import { page } from '$app/stores';

	export let url: string;

	let active = false;

	page.subscribe((page) => {
		active = page.route.id === url;
	});
</script>

<a
	href={url}
	class="font-bold navlink mx-3 mb-2 hover:no-underline hover:text-white transition-all {active
		? 'text-white'
		: ''}"
>
	<slot />
</a>
