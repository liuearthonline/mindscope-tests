import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: (globalThis as { process?: { env?: { GITHUB_ACTIONS?: string } } }).process?.env?.GITHUB_ACTIONS ? '/mindscope-tests/' : '/',
  build: { sourcemap: true }
})
