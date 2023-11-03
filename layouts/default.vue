<script lang="ts" setup>
import type { Ref } from 'vue'
import locale from '~/locales/fa/element-plus-locale.mjs'
useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  },
  titleTemplate: title => `فارکو :: ${title}`
})
const collapse = ref(false)
const connected:Ref<boolean> = ref(false)
const loading:Ref<boolean> = ref(true)

</script>

<template lang="pug">
el-config-provider(:locale="locale")
  el-container.h-screen
    el-container
      NuxtLoadingIndicator(direction="right")
      el-header(height="40px").flex.items-center.bg-white.gap-2
        el-button(text circle @click="collapse = !collapse").mr-2
          template(#icon)
            icon(:name="collapse?'teenyicons:left-outline':'teenyicons:right-outline'" size="15px" )
        //- app-breadcrumb
        el-space
      el-main
        .bg-white.rounded-xl.h-full
          slot
</template>
