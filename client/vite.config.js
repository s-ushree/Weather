import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:6000'
  const base = env.GITHUB_ACTIONS === 'true' ? '/Weather/' : '/'
  const routerBase = env.GITHUB_ACTIONS === 'true' ? '/Weather/' : '/'

  return {
    base,
    define: {
      'import.meta.env.VITE_ROUTER_BASE': JSON.stringify(routerBase)
    },
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
