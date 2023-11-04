import {defineConfig, presetUno, presetIcons} from 'unocss'
import extractorPug from '@unocss/extractor-pug'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons()
  ],
  extractors: [
    extractorPug()
  ],
  theme: {
    fontFamily: {
      yekan: 'yekan'
    }
  }
})