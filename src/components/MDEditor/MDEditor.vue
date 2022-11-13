<script setup lang="ts">
import { ref } from "vue";
import { Editor } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import "bytemd/dist/index.css";
let content = ref("aaaa");
const plugins = [gfm()];
const handleChange = (v: string) => {
  content.value = v;
};
</script>

<template>
  <Editor :value="content" :plugins="plugins" @change="handleChange" />
</template>

<style lang="less">
.bytemd {
  border: none;
  height: calc(100vh - 53px);
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
}
.bytemd-toolbar {
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-fill-1);
}
.bytemd .CodeMirror-scroll {
  background-color: var(--color-bg-1);
  color: var(--color-text-1);
}
.bytemd-split .bytemd-preview {
  border-left: 1px solid var(--color-border);
}
.bytemd-status {
  border-top: 1px solid var(--color-border);
}
.CodeMirror-cursor {
  border-left: 1px solid var(--color-text-1);
}
</style>
