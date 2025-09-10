import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // Adiciona uma regra de middleware para redirecionar /payment_checkout
    // para o arquivo HTML estático. Isso é crucial para o desenvolvimento.
    middlewareMode: 'html',
    // Essa configuração garante que o arquivo seja servido como uma rota.
    // Opcional, mas útil para simular um servidor de produção.
    fs: {
      strict: true,
    },
    // Adiciona o middleware de reescrita da rota
    rewrite: {
      '/payment_checkout': '/payment_checkout.html',
    },
  },
  build: {
    // Isso garante que o arquivo .html seja copiado para a pasta de build
    copyPublicDir: true,
  }
})
