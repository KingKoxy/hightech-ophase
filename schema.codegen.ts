import type { CodegenConfig } from '@graphql-codegen/cli'

// One-off/occasional use: `npm run schema:pull` re-introspects the live
// Contentful GraphQL API and overwrites schema.graphql, which codegen.ts
// then uses as its (offline) schema source for day-to-day type generation.
process.loadEnvFile()

const config: CodegenConfig = {
  schema: [
    {
      [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]: {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  generates: {
    'schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
}

export default config
