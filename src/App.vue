<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch } from 'vue'
import { darkMode } from '@/states.ts'
import BottomNavigation from '@/components/nav/BottomNavigation.vue'
import HeaderBar from '@/components/nav/HeaderBar.vue'

if (localStorage.getItem('theme') === 'dark') {
  darkMode.value = true
} else if (localStorage.getItem('theme') === 'light') {
  darkMode.value = false
} else {
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}

watch(darkMode, (newValue: boolean) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

const resizeObserver = new ResizeObserver(() => {
  const height = document.documentElement.scrollHeight;
  parent.postMessage({ type: 'iframe-resize', height }, '*');
});

resizeObserver.observe(document.body);
</script>

<template>
  <div
    class="dark:bg-background-dark-500 dark:text-white w-full min-h-screen transition-all duration-200 flex flex-col"
  >
    <template v-if="!$route.meta.onlyContent">
      <HeaderBar />
      <main class="flex justify-center flex-grow">
        <div class="xl:w-[55%] h-full w-full mb-0 m-7 md:mb-0 xl:mt-0 md:m-10 flex gap-10 flex-col">
          <RouterView />
        </div>
      </main>

      <footer v-if="$route.name !== 'imprint'" class="p-3 mt-2 flex justify-center">
        <a href="/imprint">Impressum</a>
      </footer>
      <div class="h-[80px] sm:h-0"></div>
      <BottomNavigation />
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>
