<script lang="ts" setup>
import type { CargoConfirm, User, Profile } from '@prisma/client'

const props = defineProps<{
  confirms:(CargoConfirm & {user:(User & {profile: Profile})})[],
  confirmed?: boolean,
  reason?:string
}>()
const accepts = computed(() => [
  'تایید بخش بازرگانی',
  'تایید بخش QC',
  'تایید بخش تولید',
  'تایید بخش انبار'
].map(_as => props.confirms.filter(con => con.as === _as)[0]?.isConfirmed))
const overall = computed(() => {
  if (props.confirmed !== undefined) {
    return props.confirmed ? 1 : -1
  }
  if (props.confirms.length !== 4) { return 0 }
  if (props.confirms.every(c => c.isConfirmed)) { return 1 } else { return -1 }
})
</script>

<template lang="pug">
el-popover(v-if="confirms.length > 0 || confirmed" placement="bottom" trigger="click" :width="300")
  template(#reference)
    .flex.gap-1.cursor-pointer.items-center
      .flex.gap-1.pb-1.relative.border-b.angle-border(:class="`${overall > 0 ? 'border-emerald-500' : overall < 0 ? 'border-rose-500' : 'border-slate-500'}`")
        template(v-for="(accept, key) in accepts" :key="key")
          icon(v-if="accept" name="teenyicons:tick-circle-solid" size="15px").text-emerald-500
          icon(v-else-if="accept === undefined" name="teenyicons:minus-circle-solid" size="15px").text-slate-500
          icon(v-else name="teenyicons:x-circle-solid" size="15px").text-rose-500
      icon(v-if="overall > 0" name="teenyicons:tick-circle-outline" size="21px").text-emerald-500
      icon(v-else-if="overall < 0" name="teenyicons:x-circle-outline" size="21px").text-rose-500
      icon(v-else name="teenyicons:minus-circle-outline" size="21px").text-slate-500
  .py-1(v-if="confirmed !== undefined")
    el-alert(:type="confirmed ? 'success':'error'" :closable="false")
      template(#title)
        .fort-bold {{ confirmed ? 'تایید نهایی' : 'عودت محموله' }} توسط مدیر عامل
      .pl-2(v-if="reason && reason !== ''" ) {{ reason }}
  .py-1(v-for="confirm in confirms" :key="confirm.id")
    el-alert(:type="confirm.isConfirmed ? 'success':'error'" :closable="false")
      template(#title)
        .fort-bold {{ confirm.isConfirmed ? confirm.as : confirm.as.replace('تایید','عودت از ') }} توسط {{ confirm.user.profile.name }} {{ confirm.user.profile.family }}
      .pl-2(v-if="confirm.reason && confirm.reason !== 'null'" ) {{ confirm.reason }}
.flex.gap-1.items-center(v-else)
  .flex.gap-1.pb-1.relative.border-b.angle-border(:class="`${overall > 0 ? 'border-emerald-500' : overall < 0 ? 'border-rose-500' : 'border-slate-500'}`")
    template(v-for="(_, key) in accepts" :key="key")
      icon(name="teenyicons:minus-circle-solid" size="15px").text-slate-500
  icon(v-if="overall > 0" name="teenyicons:tick-circle-outline" size="21px").text-emerald-500
  icon(v-else-if="overall < 0" name="teenyicons:x-circle-outline" size="21px").text-rose-500
  icon(v-else name="teenyicons:minus-circle-outline" size="21px").text-slate-500
</template>
