<script setup lang="ts">
import { isOPhase } from '@/config.ts'
import ContactCard from './ContactCard.vue'
import CustomHeadline from '@/components/CustomHeadline.vue'
import QueryState from '@/components/QueryState.vue'
import { useQuery } from '@vue/apollo-composable'
import { graphql } from '@/gql'
import { computed } from 'vue'
import { queryToContacts } from '@/gql/mappers.ts'

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
    <QueryState :loading="contactsQuery.loading.value" :error="contactsQuery.error.value">
      <ContactCard v-for="(contact, i) in contacts" :key="contact.name ?? i" :contact="contact" />
    </QueryState>
  </section>
</template>

<style scoped></style>
