import { effectScope } from '@reactive-vscode/reactivity'
import { onDeactivate } from './onDeactivate'

/**
 * Creates a composable that should only be called once.
 *
 * @category lifecycle
 */
export function createSingletonComposable<T>(fn: () => T): () => T {
  let running = false
  let ran = false
  let result: T | undefined
  return () => {
    if (!ran) {
      if (running) {
        throw new Error('Cannot call a singleton composable recursively.')
      }
      try {
        running = true
        const scope = effectScope(true)
        onDeactivate(() => scope.stop())
        result = scope.run(fn)!
        ran = true
      }
      finally {
        running = false
      }
    }
    return result!
  }
}
