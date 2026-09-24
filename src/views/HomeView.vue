<script setup lang="ts">
import { graphql } from '@/gql'
import { useQuery } from '@vue/apollo-composable'
import CustomHeadline from '@/components/CustomHeadline.vue'
import { PAGES } from '@/constants.ts'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'
import { isOPhase } from '@/states.ts'
import VideoItem from '@/components/views/home/VideoItem.vue'
import { queryToVideos } from '@/utils.ts'
import { contentfulClient } from '@/client.ts'

const videoQuery = useQuery(
  graphql(`
    query GetAllVideos {
      videoCollection {
        items {
          title
          url
        }
      }
    }
  `),
)

const videos = computed(() => {
  return queryToVideos(videoQuery.result.value)
})

const iframe = ref<HTMLIFrameElement | null>(null)

function resizeIFrame() {
  if (iframe.value && iframe.value.contentWindow) {
    iframe.value.style.height = iframe.value.contentWindow.document.body.scrollHeight + 'px'
  }
}

function handleIFrameResize(event: MessageEvent) {
  if (event.data?.type === 'iframe-resize') {
    resizeIFrame()
  }
}

onMounted(() => {
  resizeIFrame()
  window.addEventListener('message', handleIFrameResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleIFrameResize)
})

const groupJpg = ref<string>()
const hikingJpg = ref<string>()

contentfulClient.getAsset('3dibY0EyuefvgRJGFXsYGM').then((asset) => {
  if (!asset.fields.file) return
  groupJpg.value = asset.fields.file.url
})

contentfulClient.getAsset('5uyAVTaEaz979dlNBFYBBb').then((asset) => {
  if (!asset.fields.file) return
  hikingJpg.value = asset.fields.file.url
})
</script>

<template>
  <section>
    <CustomHeadline>Willkommen</CustomHeadline>
    <div class="md:flex">
      <div class="inline-block md:mr-8 text-justify md:mb-0 mb-5">
        Da du das hier liest, heißt das wohl, dass du bald anfängst
        <strong>Informatik oder Mathe am KIT</strong> zu studieren. Bei uns in Karlsruhe beginnt das
        Studium immer mit einer Woche ohne Vorlesungen, der sog.
        <a href="https://o-phase.com">O-Phase</a>
        (kurz für Orientierungsphase), in der euch die Uni und Karlsruhe gezeigt werden.
        <br /><br />
        Anders als bei anderen Fakultäten ist die Umsetzung der O-Phase bei uns Informatikern nicht
        nur zentral von der Fachschaft organisiert, sondern vor allem von den
        <strong>verschiedenen O-Phasengruppen</strong>, welche alle ihr eigenes Programm haben und
        unabhängig von Studierenden organisiert sind. Was uns als Gruppe zur
        <strong>ersten Wahl</strong> macht, liest du am besten weiter unten oder in unserem
        <a href="/schedule">Wochenplan</a> für die O-Phase nach.
      </div>

      <picture class="flex-shrink-0 max-w-1/2">
        <img
          class="md:h-[300px] object-contain object-top"
          :src="groupJpg"
          alt="Gruppenfoto"
          height="300"
          width="450"
        />
      </picture>
    </div>
  </section>
  <section>
    <CustomHeadline>Wer sind wir?</CustomHeadline>
    <div class="md:flex">
      <div class="md:mr-8 text-justify md:mb-0 mb-5">
        Unsere Gruppe ist <strong>seit 2014</strong> (also schon
        {{ new Date().getFullYear() - 2014 }} Jahre!) erfolgreich dabei, die
        <strong>elektronische Feierkultur</strong> in die O-Phase zu integrieren. Dabei bieten wir
        euch nicht nur <strong>Freibier</strong> (solange der Vorrat reicht 😉), sondern auch eine
        Möglichkeit <strong>neue Freunde</strong> fürs Studium und fürs Leben zu finden. Wir
        organisieren verschiedene <strong>Techno-Partys</strong> und <strong>Raves</strong>, haben
        aber auch für Nicht-Raver einiges zu bieten. So gibt es zum Beispiel eine
        <strong>Kneipentour</strong>, bei der wir euch die wichtigsten Kneipen und Bars Karlsruhes
        zeigen. Aber das ist noch nicht alles!
        <br />
        Neben den ausgelassenen Feiern, haben wir auch ein
        <strong>vielfältiges Programm</strong> parat. Du kannst mit uns <strong>wandern</strong>,
        entspannt ein Bierchen im
        <strong>Campusbiergarten AKK</strong>
        genießen, im Park <strong>brunchen</strong>, an <strong>lebhaften Diskussionen</strong> über
        Ethik und Philosophie teilnehmen und tatsächlich auch <strong>lernen und studieren</strong>
        😄.
        <br /><br />
        Besonders viel Wert legen wir auf ein <strong>harmonisches Miteinander</strong> in dem jeder
        so akzeptiert wird, wie er ist. Durch diese Philosophie hat sich mittlerweile ein
        <strong>großer Freundeskreis</strong>
        rund um unsere O-Phasengruppe entwickelt, welcher
        <strong>weit über die O-Phase hinaus</strong>
        geht. Mehr dazu kannst du unter
        <RouterLink to="/later">{{ PAGES['/later'].name }}</RouterLink>
        nachlesen. Oder du schaust auf unserem
        <a href="https://www.instagram.com/hightech_kit">Instagram-Account</a> vorbei. Dort kannst
        du ein Paar Eindrücke von den letzten O-Phasen finden. <br /><br />
        Und nicht vergessen: Wir sind <strong class="text-2xl">HiGH!</strong> ...<span
          class="text-xs"
          >tech</span
        >
      </div>
      <picture class="flex-shrink-0 max-w-1/2">
        <img
          class="md:h-[300px] object-contain object-top"
          :src="hikingJpg"
          alt="Wanderung"
          height="300"
          width="400"
        />
      </picture>
    </div>
  </section>

  <iframe
    v-if="isOPhase"
    ref="iframe"
    src="contacts"
    title="contacts"
    @load="resizeIFrame"
  ></iframe>

  <section>
    <CustomHeadline>O-Phasenvideos</CustomHeadline>
    <div
      v-if="videoQuery.loading.value"
      class="flex w-full p-10 items-center justify-center h-full"
    >
      <LoadingSpinner />
    </div>
    <div v-else-if="videos" class="flex flex-col items-center max-w-[800px]">
      <template
        v-for="(video, i) in [...videos].sort((b, a) => {
          return a?.title?.localeCompare(b?.title ?? '') ?? 0
        })"
        :key="video.title"
      >
        <VideoItem :class="i < (videos.length ?? 0) - 1 ? 'mb-10' : ''" :video="video" />
      </template>
    </div>
  </section>
</template>
