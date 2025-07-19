<script setup lang="ts">
import lightModeAnim from '@/assets/animations/lightMode.json'
import TopNavigationLinks from '@/components/nav/TopNavigationLinks.vue'
import { onMounted, ref } from 'vue'
import { darkMode } from '@/states.ts'
import lottie from 'lottie-web/build/player/lottie_light'
import { contentfulClient } from '@/client.ts'

const logo = ref<string>()
const animationContainer = ref<Element>()

let toggleDarkMode: () => void = () => {}

onMounted(() => {
  if (!animationContainer.value) return
  const animation = lottie.loadAnimation({
    container: animationContainer.value,
    renderer: 'svg',
    loop: false,
    animationData: lightModeAnim,
  })
  animation.goToAndStop(darkMode.value ? 14 : 0, true)
  animation.pause()

  toggleDarkMode = () => {
    animation.stop()
    if (darkMode.value) {
      animation.playSegments([14, 28], true)
    } else {
      animation.playSegments([0, 14], true)
    }
    darkMode.value = !darkMode.value
  }
})

contentfulClient.getAsset('7dtuCnKBcp0Qw62DjPCW5F').then((asset) => {
  if (!asset.fields.file) return
  logo.value = asset.fields.file.url
})
</script>

<template>
  <div class="sticky top-0 w-full flex z-50 select-none text-black">
    <div
      class="md:block hidden bg-grasshopper-green-700 p-2 rounded-br-xl w-[280px] h-[140px] object-cover z-20 shadow-lg shadow-black/30"
    >
      <img
        v-if="logo"
        :src="logo"
        class="object-contain w-full h-full"
        alt="HiGHtech O-Phasen Logo"
      />
    </div>
    <header class="flex-grow">
      <div
        class="h-[70px] lg:h-[50%] flex justify-between items-center p-2 pr-5 bg-grasshopper-green-500 shadow-lg shadow-black/30 z-10"
      >
        <div class="h-full flex items-center">
          <div class="md:hidden h-full">
            <img
              v-if="logo"
              :src="logo"
              class="object-contain h-full"
              alt="HIGHtech O-Phasen Logo"
            />
          </div>
          <h1 class="sm:hidden font-bold text-lg">O-Phase {{ new Date().getFullYear() }}</h1>
          <TopNavigationLinks />
        </div>
        <button
          aria-label="Toggle Dark Mode"
          class="flex items-center relative h-[24px] w-[24px] cursor-pointer"
          @click="toggleDarkMode"
          ref="animationContainer"
        ></button>
      </div>
    </header>
  </div>
</template>

<style scoped></style>
