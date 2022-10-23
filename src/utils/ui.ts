import { Breakpoint } from './responsive-observe';

export const getBreakpoint = (screenWidth: number): Breakpoint => {
  if (screenWidth < 576) return 'xs';
  else if (screenWidth < 768) return 'sm';
  else if (screenWidth < 992) return 'md';
  else if (screenWidth < 1200) return 'lg';
  else if (screenWidth < 1600) return 'xl';
  else return 'xxl';
};

export enum ResponsiveBrekpoint {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}

export const over = (curr: Breakpoint, target: Breakpoint): boolean => {
  return ResponsiveBrekpoint[curr] > ResponsiveBrekpoint[target];
};

export const below = (curr: Breakpoint, target: Breakpoint): boolean => {
  return ResponsiveBrekpoint[curr] < ResponsiveBrekpoint[target];
};
