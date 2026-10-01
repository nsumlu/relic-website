import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Base path
 *  - local dev / custom domain at the root:  VITE_BASE unset  -> "/"
 *  - GitHub Pages project site:              VITE_BASE=/relic/ (set by the deploy workflow)
 *
 * VITE_SITE_URL (optional) is the public origin + path used for absolute Open Graph URLs,
 * e.g. https://your-name.github.io/relic   (no trailing slash).
 */
function normaliseBase(input: string): string {
  let b = input.trim() || '/'
  if (!b.startsWith('/')) b = '/' + b
  if (!b.endsWith('/')) b += '/'
  return b
}

function siteUrlPlugin(siteRoot: string): Plugin {
  return {
    name: 'relic-site-url',
    transformIndexHtml(html) {
      return html.split('%SITE_URL%').join(siteRoot)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const base = normaliseBase(process.env.VITE_BASE ?? env.VITE_BASE ?? '/')
  const site = (process.env.VITE_SITE_URL ?? env.VITE_SITE_URL ?? '').replace(/\/+$/, '')
  const siteRoot = site || base.replace(/\/+$/, '')

  return {
    base,
    plugins: [react(), siteUrlPlugin(siteRoot)],
    build: { target: 'es2020', sourcemap: false },
  }
})
