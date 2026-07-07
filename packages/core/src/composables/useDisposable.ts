import type { Disposable } from 'vscode'
import { getCurrentScope } from '@reactive-vscode/reactivity'
import { extensionScope } from '../utils'

/**
 * 当当前作用域被释放时，释放传入的可释放对象。
 *
 * @see {@linkcode Disposable}
 * @category lifecycle
 */
export function useDisposable<T extends Disposable>(disposable: T): T {
  const scope = getCurrentScope() ?? extensionScope

  // @ts-expect-error internal property
  scope.cleanups.push(disposable.dispose.bind(disposable))

  return disposable
}
