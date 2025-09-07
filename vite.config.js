import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Desi/',           // repo path (case-sensitive)
  plugins: [tailwindcss(), react()],
})
