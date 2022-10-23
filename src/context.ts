import type { Breakpoint } from '@/utils/responsive-observe';
import { InjectionKey } from 'vue';

export interface UIContext {
  breakpoint: Breakpoint;
}

export const UIInjectionKey: InjectionKey<UIContext> = Symbol('UI');
