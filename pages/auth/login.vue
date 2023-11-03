<script lang="ts" setup>
definePageMeta({
  layout: 'auth'
})
useHead({
  title: 'ورود به سیستم'
})
const handleSubmit = async (e: Event) => {
  if(!(e.target instanceof HTMLFormElement)) return
  const formData = new FormData(e.target)
  await useFetch('/api/auth/login', {
    method: 'POST',
    body: {
      username: formData.get('username'),
      password: formData.get('password')
    },
    redirect: 'manual'
  })
  await navigateTo('/')
}
</script>

<template lang="pug">
.flex.flex-col.items-center
  el-card
    //- el-bar(title="ورود به سیستم" icon="teenyicons:lock-outline" icon-size="15px" )
    .max-w-md.mt-3
      form(method="post" action="/api/auth/login")
        el-input(
          ref="usernameInput"
          name="username"
          type="text"
          placeholder="نام‌کاربری"
          clearable
          autofocus,
        ).mb-2
          template(#prepend)
            icon(name="teenyicons:user-outline" size="15px" ).text-sky-600
            //- .i-teenyicons-user-outline.text-sky-600
        el-input(
          ref="passwordInput"
          type="password"
          name="password"
          placeholder="رمزورود"
          clearable
          show-password,
        ).mb-2
          template(#prepend)
            icon(name="teenyicons:password-outline" size="15px" ).text-sky-600
        el-button(type="primary").w-full ورود به سیستم
          template(#loading)
            icon(name="svg-spinners:90-ring-with-bg" size="22px" ).mx-4
            //- .i-90-ring-with-bg
      el-divider یا
      el-button().w-full بازیابی رمزورود
</template>