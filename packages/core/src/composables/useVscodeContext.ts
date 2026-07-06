import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref, WritableComputedRef } from '@reactive-vscode/reactivity'
import { computed, isRef, ref, watch } from '@reactive-vscode/reactivity'
import { commands } from 'vscode'

/**
 * 响应式地设置一个 VS Code 上下文。参见 [自定义 when 子句上下文](https://code.visualstudio.com/api/references/when-clause-contexts#add-a-custom-when-clause-context)。
 *
 * @category lifecycle
 */
export function useVscodeContext<T>(
  name: string,
  value: WritableComputedRef<T>,
): WritableComputedRef<T>
export function useVscodeContext<T>(
  name: string,
  value: ComputedRef<T> | (() => T),
): ComputedRef<T>
export function useVscodeContext<T>(
  name: string,
  value: MaybeRef<T>,
): Ref<T>
export function useVscodeContext<T>(
  name: string,
  value: MaybeRefOrGetter<T>,
) {
  const normalized = isRef(value) ? value : typeof value === 'function' ? computed(value as () => T) : ref(value)
  watch(normalized, (value) => {
    commands.executeCommand('setContext', name, value)
  }, { immediate: true })
  return normalized
}
