import {
  inject,
  InjectionKey,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
} from "vue";
import responsiveObserve, {
  Breakpoint,
  responsiveArray,
} from "@/common/utils/responsive-observe";
import { getBreakpoint } from "@/utils/ui";
export interface UIContext {
  breakpoint: Breakpoint;
}

export const UIInjectionKey: InjectionKey<UIContext> = Symbol("UI");

const responsiveArrayReverse = responsiveArray.reverse();
export const createUIContext = () => {
  // 订阅响应式观察者
  const responsiveObserveToken = ref<string>("");
  const breakpoint = ref<Breakpoint>(getBreakpoint(window.innerWidth));
  onMounted(() => {
    responsiveObserveToken.value = responsiveObserve.subscribe(
      (screen, breakpointChecked) => {
        if (breakpointChecked) {
          let currentBreakpoint: Breakpoint = "xs";
          responsiveArrayReverse.forEach(
            (item) =>
              (currentBreakpoint = screen[item] ? item : currentBreakpoint)
          );
          breakpoint.value = currentBreakpoint;
        }
      }
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
    })
  );
};

export const useUIContext = () => {
  return inject(UIInjectionKey);
};
