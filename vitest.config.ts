import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['functions/**/*.test.ts'],
    environment: 'node',
    passWithNoTests: true,
  },
});
