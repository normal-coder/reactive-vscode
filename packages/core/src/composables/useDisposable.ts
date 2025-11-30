import type { Disposable } from 'vscode'
import { getCurrentScope } from '@reactive-vscode/reactivity'
import { extensionScope } from '../utils'

/**
 * 当当前作用域被销毁时，销毁该 `disposable` 对象。参见 `vscode::Disposable`。
 *
 * @category lifecycle
 */
export function useDisposable<T extends Disposable>(disposable: T): T {
  const scope = getCurrentScope() ?? extensionScope

  // @ts-expect-error internal property
  scope.cleanups.push(disposable.dispose.bind(disposable))

  return disposable
}
