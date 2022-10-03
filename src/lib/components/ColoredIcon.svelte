<script lang="ts">
	export let src: string;
</script>

<div
	class="w-full h-[30px] transition-all {$$props.class}"
	style="-webkit-mask: url('{src}') no-repeat center; mask: url('{src}') no-repeat center"
/>
