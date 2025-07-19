<script setup lang="ts">
import raveAvif from '@/assets/images/akkRave2022.avif'
import raveWebp from '@/assets/images/akkRave2022.webp'
import raveJpg from '@/assets/images/akkRave2022.jpg'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import CustomHeadline from '@/components/CustomHeadline.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed } from 'vue'
import { queryToImages } from '@/utils.ts'

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
  `,
  ),
)

const images = computed(() => {
  return queryToImages(imageQuery.result.value)
})
</script>

<template>
  <section>
    <CustomHeadline>Die Naturfreunde am KIT</CustomHeadline>
    <div class="text-justify">
      <picture>
        <source :srcset="raveAvif" type="image/avif" />
        <source :srcset="raveWebp" type="image/webp" />
        <img
          :src="raveJpg"
          alt="Wandern"
          class="md:float-right md:h-[250px] md:ml-4 md:mb-2 mb-5 w-full md:w-auto"
          height="250"
          width="375"
        />
      </picture>
      Wir sind sehr stolz darauf uns als eine der einzigen O-Phasengruppen nicht nur auf die O-Phase
      zu beschränken. Die meisten unserer Tutoren sind Mitglieder in der
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
      aufzufinden und gut zu erkennen an lauten Bässen, die wir quer durch den Park wummern lassen.
      <br /><br />
      Wenn du also jemanden suchst, mit dem du <strong>lernen, feiern</strong> oder auch einfach nur
      ein (oder zehn) <strong>gemütliches Bier trinken</strong> kannst, dann bist du bei uns
      grün-richtig 😉. Tritt nach der O-Phase einfach unserer <strong>WhatsApp-Gruppe</strong> bei
      und komm am besten direkt zum nächsten Event vorbei. Wir freuen uns auf dich!
    </div>
  </section>
  <section>
    <CustomHeadline>Unsere Social Media</CustomHeadline>
    <ul class="ml-4 mt-2">
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
    <ul class="ml-4 mt-2">
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
    <div v-if="imageQuery.loading.value" class="flex w-full p-10 items-center justify-center h-full">
      <LoadingSpinner />
    </div>
    <div v-else-if="images" e class="flex flex-wrap justify-center m-[-0.75rem]">
      <div v-for="image in images" :key='image.url' class="md:w-1/3 p-3 sm:w-1/2 w-full">
        <img
          :src="`${image.url}?w=480`"
          class="object-contain w-full h-auto"
          :alt="image.fileName"
          width="480"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
li {
  margin-bottom: var(--spacing);
  list-style-type: square;
}
</style>
