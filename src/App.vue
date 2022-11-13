<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { createUIContext } from "./context";
export default defineComponent({
  setup() {
    const store = useStore();
    document.body.setAttribute("arco-theme", store.state.ui.theme);
    // 发布 UI 上下文
    createUIContext();
  },
});
</script>

<style lang="less">
* {
  transition: 340ms background-color ease-in-out, 340ms border ease-in-out;
}
</style>
