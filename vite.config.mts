import { defineConfig } from 'vite'
import tsConfiPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfiPaths()],
  test: {
    globals: true,
  },
})
