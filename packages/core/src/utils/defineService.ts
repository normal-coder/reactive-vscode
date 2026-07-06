import { extensionScope } from './defineExtension'

/**
 * 定义一个只应被实例化一次的服务。
 *
 * @category lifecycle
 */
export function defineService<T>(fn: () => T): () => T {
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
        result = extensionScope.run(fn)!
      }
      finally {
        running = false
        ran = true
      }
    }
    return result!
  }
}
