<script setup lang="ts">
import QueryState from '@/components/QueryState.vue'
import CustomHeadline from '@/components/CustomHeadline.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed } from 'vue'
import { queryToImages } from '@/gql/mappers.ts'
import { useSiteAssets } from '@/composables/useSiteAssets.ts'

const { ravePhoto: raveJpg } = useSiteAssets()

const imageQuery = useQuery(
  graphql(`
    query GetAllImages {
      imageCollection {
        items {
          asset {
            url
            fileName
          }
        }
      }
    }
  `),
)

const images = computed(() => {
  return queryToImages(imageQuery.result.value)
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <section>
      <CustomHeadline>Die Naturfreunde am KIT</CustomHeadline>
      <div class="text-justify">
        <picture>
          <img
            :src="raveJpg"
            alt="Rave am AKK"
            class="mb-5 w-full md:float-right md:mb-2 md:ml-4 md:h-[250px] md:w-auto"
            height="250"
            width="375"
          />
        </picture>
        Wir sind sehr stolz darauf uns als eine der einzigen O-Phasengruppen nicht nur auf die
        O-Phase zu beschränken. Die meisten unserer Tutoren sind Mitglieder in der
        <strong>Hochschulgruppe "Die Naturfreunde am KIT"</strong>. Unsere Gruppe bietet dir einen
        breit gefächerten <strong>Freundeskreis</strong> in dem man sich
        <strong>hilft und unterstützt</strong>, sei es für die Uni oder Privates. Gemeinsam
        organisieren wir auch unter dem Semester regelmäßig Events, wie
        <strong
          >Partys oder Raves, Wanderungen, Müllsammelaktionen, Glühweinverkäufe und Urlaube</strong
        >. Zu den größten unserer Veranstaltungen zählen zum Beispiel die
        <strong>halbjährigen Raves am AKK</strong>, bei denen wir das letzte Mal über 2000 Besucher
        hatten. Es findet sich aber auch immer eine gute Gruppe, um auf
        <strong>andere Partys oder Festivals</strong>
        zu gehen, nicht nur (wenn auch hauptsächlich) im elektronischen Bereich. Jeden Mittwoch ist
        außerdem
        <strong>Barabend in der K2 Bar</strong>
        und bei gutem Wetter sind wir
        <strong>regelmäßig im Fasanengarten</strong>
        aufzufinden und gut zu erkennen an lauten Bässen, die wir quer durch den Park wummern
        lassen.
        <br /><br />
        Wenn du also jemanden suchst, mit dem du <strong>lernen, feiern</strong> oder auch einfach
        nur ein (oder zehn) <strong>gemütliches Bier trinken</strong> kannst, dann bist du bei uns
        grün-richtig 😉. Tritt nach der O-Phase einfach unserer <strong>WhatsApp-Gruppe</strong> bei
        und komm am besten direkt zum nächsten Event vorbei. Wir freuen uns auf dich!
      </div>
    </section>
    <section>
      <CustomHeadline>Unsere Social Media</CustomHeadline>
      <ul class="mt-2 ml-4">
        <li>
          <a href="https://www.instagram.com/naturfreunde.kit">Instagram</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@NaturfreundeamKIT/videos">YouTube</a>
        </li>
        <li>
          <a href="https://facebook.com/Naturfreundeamkit/">Facebook</a>
        </li>
      </ul>
    </section>
    <section>
      <CustomHeadline>Unsere DJs</CustomHeadline>
      <ul class="mt-2 ml-4">
        <li>
          <a href="https://soundcloud.com/luis-reissenweber">Luis Reissenweber</a>
        </li>
        <li>
          <a href="https://soundcloud.com/dj_julicorn">Julicorn</a>
        </li>
        <li>
          <a href="https://soundcloud.com/ilya_filippov">Ilya Filippov</a>
        </li>
        <li>
          <a href="https://soundcloud.com/itsnokya">Nokya</a>
        </li>
        <li>
          <a href="https://soundcloud.com/juliuspfister"> Julius Pfister </a>
        </li>
        <li>
          <a href="https://soundcloud.com/mete_mete"> METE</a>
        </li>
        <li>
          <a href="https://soundcloud.com/itsrerz"> rerz </a>
        </li>
        <li>
          <a href="https://soundcloud.com/user-601516904"> Kobaltikum </a>
        </li>
        <li>
          <a href="https://soundcloud.com/electra-twins"> Electra Twins </a>
        </li>
      </ul>
    </section>
    <section>
      <CustomHeadline>Eindrücke von Events</CustomHeadline>
      <QueryState :loading="imageQuery.loading.value" :error="imageQuery.error.value">
        <div class="m-[-0.75rem] flex flex-wrap justify-center">
          <div v-for="image in images" :key="image.url" class="w-full p-3 sm:w-1/2 md:w-1/3">
            <img
              :src="`${image.url}?w=480`"
              class="h-auto w-full object-contain"
              alt="Impression von einer O-Phase-Veranstaltung"
              width="480"
            />
          </div>
        </div>
      </QueryState>
    </section>
  </div>
</template>

<style scoped>
li {
  margin-bottom: var(--spacing);
  list-style-type: square;
}
</style>
