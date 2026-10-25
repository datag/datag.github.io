import { readdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const root = import.meta.dirname

// Multi-page setup: every HTML file in the repository root becomes its own
// entry point, so `dist/` contains `index.html` and `privacy.html` side by
// side. The entry key determines the output file name.
const input = Object.fromEntries(
  readdirSync(root)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [basename(file, '.html'), resolve(root, file)]),
)

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input,
    },
  },
})
