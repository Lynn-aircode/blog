<template>
  <router-view />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
} from 'vue';
import responsiveObserve, {
  Breakpoint,
  responsiveArray,
} from '@/utils/responsive-observe';
import { UIInjectionKey } from './context';
import { getBreakpoint } from '@/utils/ui';
import { useStore } from 'vuex';
const responsiveArrayReverse = responsiveArray.reverse();

export default defineComponent({
  setup() {
    const store = useStore();
    document.body.setAttribute('arco-theme', store.state.ui.theme);

    // 订阅响应式观察者
    const responsiveObserveToken = ref<string>('');
    const breakpoint = ref<Breakpoint>(getBreakpoint(window.innerWidth));
    onMounted(() => {
      responsiveObserveToken.value = responsiveObserve.subscribe(
        (screen, breakpointChecked) => {
          if (breakpointChecked) {
            let currentBreakpoint: Breakpoint = 'xs';
            responsiveArrayReverse.forEach(
              (item) =>
                (currentBreakpoint = screen[item] ? item : currentBreakpoint),
            );
            breakpoint.value = currentBreakpoint;
          }
        },
      );
    });
    onUnmounted(() => {
      responsiveObserve.unsubscribe(responsiveObserveToken.value);
    });
    // 提供当前响应式断点
    provide(
      UIInjectionKey,
      reactive({
        breakpoint: breakpoint,
      }),
    );
  },
});
</script>

<style lang="less">
* {
  transition: 340ms background-color ease-in-out, 340ms border ease-in-out;
}
</style>
