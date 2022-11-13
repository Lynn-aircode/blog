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
      <a-typography-paragraph>Left</a-typography-paragraph>
    </template>
    <template #second>
      <a-typography-paragraph>Right</a-typography-paragraph>
    </template>
  </a-split>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const size = ref<number>(0.5);
    return {
      size,
    };
  },
});
</script>
