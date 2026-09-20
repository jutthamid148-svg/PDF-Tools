import { whop } from '@whop/cli/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const whopServerEntry = {
  name: 'whop-server-entry',
  async closeBundle() {
    const serverDir = join(process.cwd(), 'dist', 'server')

    try {
      await copyFile(join(serverDir, 'server.js'), join(serverDir, 'index.js'))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
    }
  },
}

export default defineConfig(({ isSsrBuild }) => ({
  resolve: { tsconfigPaths: true },
  build: isSsrBuild
    ? {
        rollupOptions: {
          output: {
            entryFileNames: 'index.js',
          },
        },
      }
    : undefined,
  plugins: [
    whopServerEntry,
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    whop({ disableTanstackDevtools: true }),
    devtools(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          outputPath: '/index.html',
        },
      },
    }),
    viteReact(),
    whopServerEntry,
  ],
}))
