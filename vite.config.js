import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<username>.github.io/majestic-designer/
export default defineConfig({
  base: '/majestic-designer/',
  plugins: [react()],
})
