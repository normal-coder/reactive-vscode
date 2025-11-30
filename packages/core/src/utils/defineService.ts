import { createSingletonComposable } from './createSingletonComposable'

/**
 * 定义一个只应被实例化一次的服务。
 *
 * @category lifecycle
 */
export const defineService = createSingletonComposable
