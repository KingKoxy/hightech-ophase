<script setup lang="ts">
import { PAGES } from '@/constants.ts'
</script>

<template>
  <div
    class="bg-grasshopper-green-500 fixed right-0 bottom-0 left-0 flex w-full items-center justify-evenly p-3 text-black shadow select-none sm:hidden"
  >
    <RouterLink
      v-for="[url, { name, icon }] in Object.entries(PAGES)"
      :key="url"
      :to="url"
      class="navlink flex w-[25%] scale-90 transform flex-col items-center text-center text-sm font-semibold transition-all hover:text-white hover:no-underline"
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
