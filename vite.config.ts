import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
    proxy: { '/api': `http://127.0.0.1:${process.env.VITE_API_PORT ?? '3001'}` },
  },
  preview: { host: true, port: 4173 },
})
