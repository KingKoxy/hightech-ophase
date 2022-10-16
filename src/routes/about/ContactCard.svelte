<script lang="ts">
	import type { IContact } from '../../lib/types';

	export let contact: IContact;
</script>

<div class="bg-[#00000016] dark:bg-[#ffffff16] mt-5 p-5 shadow-lg">
	<h2 class="text-lg font-bold">{contact.name}</h2>
	<a href="tel:{contact.phone}" class="font-semibold">{contact.phone}</a>
</div>
