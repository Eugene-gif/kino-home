import { defineConfig } from 'orval';

export default defineConfig({
  tmdb: {
    input: {
      target: 'https://developer.themoviedb.org/openapi/tmdb-api.json',
    },
    output: {
      mode: 'single',
      headers: true,
      target: './src/api/endpoints.ts',
      schemas: './src/api/types',
      client: 'fetch',
      baseUrl: 'https://api.themoviedb.org',
      override: {
        mutator: {
          path: './src/api/app-fetch.ts',
          name: 'appFetch',
        },
      },
      tsconfig: './tsconfig.app.json',
    },
    hooks: {
      afterAllFilesWrite: 'eslint src/api --ext .ts --fix',
    },
  },
});
