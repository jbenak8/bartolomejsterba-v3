import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'

function getEnableParallax(): boolean {
  try {
    const raw = readFileSync('./tsconfig.app.json', 'utf-8')
    // Strip JSON comments (single-line)
    const stripped = raw.replace(/\/\/.*/g, '')
    const parsed = JSON.parse(stripped)
    return parsed?.customOptions?.enableParallax ?? true
  } catch {
    return true
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __ENABLE_PARALLAX__: JSON.stringify(getEnableParallax()),
  },
})
