import * as contentful from 'contentful'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
})

export const apolloClient =  new ApolloClient({
  link: createHttpLink({
    headers: {
      Authorization: `Bearer ${import.meta.env.CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    uri: `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.CONTENTFUL_SPACE_ID}`,
  }),
  cache: new InMemoryCache(),
})

export function setupApolloClient() {
  provideApolloClient(apolloClient)
}
