import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export function lazySection<T extends Record<string, ComponentType>>(
  loader: () => Promise<T>,
  exportName: keyof T
): LazyExoticComponent<T[keyof T]> {
  return lazy(() =>
    loader().then((module) => ({
      default: module[exportName],
    }))
  );
}
