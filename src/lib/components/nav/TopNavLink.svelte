<script lang="ts">
	import { page } from '$app/stores';

	export let url, icon, name: string;
	let active = false;

	page.subscribe((page) => {
		active = page.url.pathname === url;
	});
</script>

<a
	href={url}
	class="font-bold navlink mx-3 hover:no-underline flex items-center hover:text-white transition-all gap-1.5 {active
		? 'text-white'
		: ''}"
>
	<i class="text-xl {icon}" />
	{name}
</a>
