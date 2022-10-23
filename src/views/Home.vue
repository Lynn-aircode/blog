<script lang="tsx">
import LogoVue from "@/components/Logo.vue";
import PolishingCardVue from "@/components/PolishingCard.vue";
import { Col, Row } from "@arco-design/web-vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

interface gameInfo {
  gameName: string;
  path: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    return () => <div class="chessroom-home-root"></div>;
  },
});
</script>

<style lang="less">
.chessroom-home {
  &-root {
    overflow: scroll;
    display: flex;
    width: 100vw;
    height: calc(100vh - 53px);
    flex-direction: column;
    align-items: center;
  }
  &-card {
    height: 334px;
    width: 222px;
    background-color: var(--color-fill-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-1);
    &-text {
      font-weight: 500;
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
  &-row {
    width: 100%;
    max-width: 1000px;
  }
  &-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;
  }
}
</style>
