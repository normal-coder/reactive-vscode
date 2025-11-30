import type { ExtensionContext } from 'vscode'
import { extensionContext } from './defineExtension'

type OnActivateCb = (context: ExtensionContext) => void

/**
 * @internal
 */
export const activateCbs: OnActivateCb[] = []

/**
 * 注册一个在扩展被激活后调用的回调函数。
 *
 * @category lifecycle
 */
export function onActivate(fn: OnActivateCb) {
  if (extensionContext.value)
    fn(extensionContext.value)
  else
    activateCbs.push(fn)
}
