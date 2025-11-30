import type { Awaitable } from './types'

type OnDeactivateCb = () => Awaitable<void>

/**
 * @internal
 */
export const deactivateCbs: OnDeactivateCb[] = []

/**
 * 注册一个在扩展被停用时调用的回调函数。
 *
 * @category lifecycle
 */
export function onDeactivate(fn: OnDeactivateCb) {
  deactivateCbs.push(fn)
}
