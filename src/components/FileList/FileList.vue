<template>
  <simple-tree :treeData="defaultTreeData" />
</template>
<script lang="ts">
import { SimpleTree } from "@/common/components";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    SimpleTree,
  },
  setup() {
    return { defaultTreeData: ref(defaultTreeData) };
  },
});

const defaultTreeData = [
  {
    title: "Trunk 0-0",
    key: "0-0",
    children: [
      {
        title: "Leaf 0-0-1",
        key: "0-0-1",
      },
      {
        title: "Branch 0-0-2",
        key: "0-0-2",
        children: [
          {
            draggable: false,
            title: "Leaf 0-0-2-1 (Drag disabled)",
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
  {
    title: "Trunk 0-1",
    key: "0-1",
    children: [
      {
        title: "Branch 0-1-1",
        key: "0-1-1",
        checkable: false,
        children: [
          {
            title: "Leaf 0-1-1-1",
            key: "0-1-1-1",
          },
          {
            title: "Leaf 0-1-1-2",
            key: "0-1-1-2",
          },
        ],
      },
      {
        title: "Leaf 0-1-2",
        key: "0-1-2",
      },
    ],
  },
];
</script>
