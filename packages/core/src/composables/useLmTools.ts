import { computed, shallowRef } from '@reactive-vscode/reactivity'
import { lm } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * A list of all available tools that were registered by all extensions using `vscode::lm.registerTool`.
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
