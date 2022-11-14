<template>
  <div class="blog-file-list-root">
    <div class="blog-file-list-header space-between">
      <div>FileList</div>
      <a-space :size="12">
        <a-button class="mini-icon-button">
          <template #icon
            ><icon-plus style="font-size: 16px; stroke-width: 4"
          /></template>
        </a-button>
      </a-space>
    </div>
    <simple-tree :treeData="defaultTreeData" />
  </div>
</template>
<script lang="ts">
import { SimpleTree } from "@/common/components";
import { useNoteContext } from "@/views/Note/context";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    SimpleTree,
  },
  setup() {
    const NoteContext = useNoteContext();
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
<style lang="less">
.arco-btn-size-medium.arco-btn-only-icon.mini-icon-button {
  width: 24px;
  height: 24px;
  background-color: transparent;
}
.arco-btn-size-medium.arco-btn-only-icon.mini-icon-button:hover {
  background-color: var(--color-fill-3);
}
.blog-file-list {
  &-root {
    background-color: var(--color-bg-1);
    height: 100%;
  }
  &-header {
    height: 32px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    padding: 0 8px;
    color: var(--color-text-1);
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
