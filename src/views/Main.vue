<script lang="tsx">
import { Layout, LayoutContent, LayoutHeader } from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Header from '../components/Header.vue';

export default defineComponent({
  components: {
    Header,
  },
  setup() {
    return () => (
      <Layout class="chessroom-root">
        <LayoutHeader class="chessroom-header-box">
          <Header></Header>
        </LayoutHeader>
        <LayoutContent class="chessroom-content">
          <RouterView></RouterView>
        </LayoutContent>
      </Layout>
    );
  },
});
</script>
<style lang="less">
.chessroom {
  &-root {
    height: 100vh;
  }
  &-header {
    &-box {
      width: 100vw;
      border-bottom: 1px solid var(--color-border-2);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  }
  &-content {
    max-height: calc(100vh - 53px);
    background-color: var(--color-fill-1);
    z-index: 1;
  }
}
[arco-theme='dark'] {
  .chessroom-content {
    background-color: var(--color-bg-1);
  }
}
</style>
