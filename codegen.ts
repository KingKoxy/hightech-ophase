
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "src/**/*.vue",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    }
  },
  config: {
    useTypeImports: true,
    scalars: {
      DateTime: 'string',
      Dimension: 'number',
      HexColor: 'string',
      JSON: 'Record<string, unknown>',
      Quality: 'number',
    },
  }
};

export default config;
