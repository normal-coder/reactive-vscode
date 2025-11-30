import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { lm } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * 一个由所有扩展使用 `vscode::lm.registerTool` 注册的可用工具列表。
 *
 * @reactive `lm.tools`
 * @category lm
 */
export const useLmTools = createSingletonComposable(() => {
  const tools = shallowRef(lm.tools)

  useDisposable(lm.onDidChangeChatModels(() => {
    tools.value = lm.tools
  }))

  return computed(() => tools.value)
})
