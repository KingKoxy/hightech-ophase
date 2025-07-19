<script setup lang="ts">
import { isOPhase } from '@/states.ts'
import ContactCard from '@/components/views/contacts/ContactCard.vue'
import CustomHeadline from '@/components/CustomHeadline.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed } from 'vue'
import { queryToContacts } from '@/utils.ts'

const contactsQuery = useQuery(
  graphql(`
    query GetAllContacts {
      contactCollection {
        items {
          name
          phone
        }
      }
    }
  `),
)

const contacts = computed(() => {
  return queryToContacts(contactsQuery.result.value)
})
</script>

<template>
  <section v-if="isOPhase">
    <CustomHeadline>Kontakt</CustomHeadline>
    Bei
    <strong>Fragen, Problemen, etc.</strong> schreibt am besten in der
    <strong>WhatsApp-Gruppe,</strong>
    per
    <strong>Direktnachricht</strong> oder sprecht einfach einen der <strong>Tutoren</strong> an. Für
    den absoluten Notfall findet ihr hier noch einmal die Nummern der
    <strong>Hauptverantwortlichen: </strong>
    <div
      v-if="contactsQuery.loading.value"
      class="flex w-full p-10 items-center justify-center h-full"
    >
      <LoadingSpinner />
    </div>
    <ContactCard
      v-else-if="contacts"
      v-for="(contact, i) in contacts"
      :key="contact.name ?? i"
      :contact="contact"
    />
  </section>
</template>

<style scoped></style>
