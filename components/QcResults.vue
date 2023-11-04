<script lang="ts" setup>
defineProps<{
  data?: {
    pass: boolean
    label: string
    value: string
  }[]
}>()
</script>

<template lang="pug">
el-popover(v-if="data" trigger="click" placement="bottom" :width="206")
  template(#reference)
    el-tag.w-full.cursor-pointer(:type="data.every(i=>i.pass)?'success':data.every(i => !i.pass)?'danger':'warning'") نمایش
  el-tag.mb-1(v-for="(item, key) in data" :key="key", :type="item.pass ? 'success':'danger'", effect="plain")
    .flex.w-40
      .text-left(class="w-2/3") {{ item.label }}
      .flex-1.text-right.font-bold {{ item.value }}
el-tag.w-full(v-else type="info") ثبت نشده
</template>
