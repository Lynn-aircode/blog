<template>
  <a-split
    :style="{
      height: '100%',
      width: '100%',
    }"
    v-model:size="size"
    min="80px"
  >
    <template #first>
      <file-list />
    </template>
    <template #second>
      <MDEditor />
    </template>
  </a-split>
</template>

<script lang="ts">
import FileList from "@/components/FileList";
import MDEditor from "@/components/MDEditor";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { FileList, MDEditor },
  setup() {
    const size = ref<number>(0.2);
    return {
      size,
    };
  },
});
</script>
