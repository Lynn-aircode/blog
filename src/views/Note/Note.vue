<template>
  <a-split
    v-if="hideFileList"
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
  <MDEditor v-else />
</template>

<script lang="ts">
import FileList from "@/components/FileList";
import MDEditor from "@/components/MDEditor";
import { useUIContext } from "@/context";
import { over } from "@/utils/ui";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  components: { FileList, MDEditor },
  setup() {
    const size = ref<number>(0.2);
    const UIContext = useUIContext();
    if (!UIContext?.breakpoint) return {};
    const hideFileList = computed(() => over(UIContext.breakpoint, "sm"));
    return {
      size,
      hideFileList,
    };
  },
});
</script>
