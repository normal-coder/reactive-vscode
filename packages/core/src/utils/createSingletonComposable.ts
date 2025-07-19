import { effectScope } from '@reactive-vscode/reactivity'

/**
 * Creates a composable that should only be called once.
 *
 * @category utilities
 */
export function createSingletonComposable<T>(fn: () => T): () => T {
  let ran = false
  let result: T | undefined
  return () => {
    if (!ran) {
      const scope = effectScope(true)
      result = scope.run(fn)!
      ran = true
    }
    return result!
  }
}
