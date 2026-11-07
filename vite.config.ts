import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxy = env.VITE_DEV_API_PROXY

  return {
    plugins: [react()],
    server: apiProxy
      ? { proxy: { '/api': { target: apiProxy, changeOrigin: true } } }
      : undefined,
  }
})
