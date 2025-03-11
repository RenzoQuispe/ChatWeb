import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // estilos :D

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  
})
