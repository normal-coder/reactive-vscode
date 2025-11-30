import type { MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import { toValue, watchEffect } from '@reactive-vscode/reactivity'

/**
 * 在一个目标对象上设置多个响应式选项。
 * @category utilities
 */
export function useReactiveOptions<T extends object>(
  target: T,
  options: {
    [K in keyof T]?: MaybeRefOrGetter<T[K]>;
  },
  keys: (keyof T)[],
) {
  for (const key of keys) {
    const value = options[key]
    if (value !== undefined) {
      watchEffect(() => {
        target[key] = toValue(value) as any
      })
    }
  }
}
