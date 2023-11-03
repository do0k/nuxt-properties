<script lang="ts" setup>
const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  await useFetch("/api/auth/signup", {
    method: "POST",
    body: {
      mobile: formData.get("mobile"),
      code: formData.get("code"),
      otp: formData.get("otp"),
    },
    redirect: "manual",
  });
  await navigateTo("/auth/login");
};
</script>

<template lang="pug">
.flex.flex-col.items-center
  el-image.w-60.mb-5(src="/logo.png")
  el-card
    el-bar(title="ورود به سیستم" icon="teenyicons:lock-outline" icon-size="15px" )
    .max-w-md.mt-3
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
      el-input(
        ref="passwordInput"
        name="password"
        type="password"
        placeholder="رمزورود"
        clearable
        show-password,
      ).mb-2
        template(#prepend)
          icon(name="teenyicons:password-outline" size="15px" ).text-sky-600
      el-button(type="primary").w-full ورود به سیستم
        template(#loading)
          icon(name="svg-spinners:90-ring-with-bg" size="22px" ).mx-4
      el-divider یا
      el-button().w-full ورود به حساب کاربری
</template>
