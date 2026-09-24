<script setup lang="ts">
import type { Contact } from '@/types.ts'

const { contact } = defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="mt-5 bg-[#00000016] p-5 shadow-lg dark:bg-[#ffffff16]">
    <h2 class="text-lg font-bold">{{ contact.name }}</h2>
    <a :href="`tel:${contact.phone}`" class="font-semibold">{{ contact.phone }}</a>
  </div>
</template>

<style scoped></style>
