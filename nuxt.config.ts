import {resolve} from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/style.sass'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon'
  ],
  tailwindcss: {
    viewer: false
  },
  elementPlus: {
    icon: false,
    importStyle: 'scss',
    themes: ['dark']
  },
  postcss: {
    plugins: {
      rtlcss: {
        autoRename: true
      }
    }
  },
})
