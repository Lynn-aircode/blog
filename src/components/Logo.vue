<template>
  <svg
    @click="handleClick"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="logo"
  >
    <path
      d="M9.32715 15.7027L16.2489 19.699V28.7848L23.7431 33.104L23.7431 41.1013L9.32715 32.6979L9.32715 15.7027Z"
      fill="currentColor"
      style="fill: rgb(var(--primary-5))"
    />
    <path
      d="M9.6 15.1298L24.0148 6.79199L30.9361 10.79L16.5213 19.128L9.6 15.1298Z"
      fill="currentColor"
      style="fill: rgb(var(--primary-6))"
    />
    <path
      d="M24.4902 24.03L31.3707 20.0576L38.2512 24.03L31.3707 28.0025L24.4902 24.03Z"
      fill="currentColor"
      style="fill: rgb(var(--primary-6))"
    />
    <path
      d="M38.7311 24.7191L24.3152 33.1038L24.3152 41.0964L38.7311 32.7119L38.7311 24.7191Z"
      fill="currentColor"
      style="fill: rgb(var(--primary-4))"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Logo",
  setup() {
    const router = useRouter();
    const handleClick = () => router.push("/");

    return {
      handleClick,
    };
  },
});
</script>

<style lang="less">
.logo {
  cursor: pointer;
}
</style>
