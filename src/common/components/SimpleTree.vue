<template>
  <a-tree
    class="tree-demo"
    draggable
    blockNode
    :data="treeData"
    @drop="onDrop"
  />
</template>
<script lang="ts">
import { PropType } from "vue";
import { TreeNodeData } from "@arco-design/web-vue";
export default {
  props: {
    treeData: {
      type: Object as PropType<TreeNodeData[]>,
    },
  },
  setup(props: any) {
    const { treeData } = props;

    return {
      treeData,
      onDrop: ({ dragNode, dropNode, dropPosition }: any) => {
        const data = treeData;
        if (!data) return;
        const loop = (
          data: TreeNodeData[],
          key: string,
          callback: (
            item: TreeNodeData,
            index: number,
            arr: TreeNodeData[]
          ) => void
        ) => {
          data.some((item, index, arr) => {
            if (item.key === key) {
              callback(item, index, arr);
              return true;
            }
            if (item.children) {
              return loop(item.children, key, callback);
            }
            return false;
          });
        };

        loop(data, dragNode.key, (_, index, arr) => {
          arr.splice(index, 1);
        });

        if (dropPosition === 0) {
          loop(data, dropNode.key, (item: any) => {
            item.children = item.children || [];
            item.children.push(dragNode);
          });
        } else {
          loop(data, dropNode.key, (_, index, arr) => {
            arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
          });
        }
      },
    };
  },
};
</script>
<style lang="less">
.tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title),
.tree-demo :deep(.tree-node-dropover) > :deep(.arco-tree-node-title):hover {
  animation: blinkBg 0.4s 2;
}

@keyframes blinkBg {
  0% {
    background-color: transparent;
  }

  100% {
    background-color: var(--color-primary-light-1);
  }
}
</style>
