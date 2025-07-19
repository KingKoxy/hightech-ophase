<script setup lang="ts">
import { PAGES } from '@/constants.ts'
</script>

<template>
  <div
    class="flex sm:hidden text-black select-none items-center justify-evenly bg-grasshopper-green-500 fixed bottom-0 left-0 right-0 p-3 w-full shadow"
  >
    <RouterLink
      v-for="[url, { name, icon }] in Object.entries(PAGES)"
      :key="url"
      :to="url"
      class="navlink transform w-[25%] font-semibold flex flex-col items-center hover:text-white transition-all hover:no-underline text-center text-sm scale-90"
      active-class="scale-110 text-white"
    >
      <i class="text-xl" :class="icon"></i>
      <span class="pt-1">
        {{ name }}
      </span>
    </RouterLink>
  </div>
</template>

<style scoped></style>
