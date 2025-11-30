import { getCurrentScope, onScopeDispose } from '@reactive-vscode/reactivity'

/**
 * `vue::onScopeDispose(https://vuejs.org/api/reactivity-advanced.html#onscopedispose)` 的安全版本。
 *
 * @category lifecycle
 */
export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
