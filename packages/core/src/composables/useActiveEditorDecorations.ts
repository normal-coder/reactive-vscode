import type { MaybeRef, MaybeRefOrGetter } from '@reactive-vscode/reactivity'
import type { DecorationOptions, DecorationRenderOptions, Range, TextEditor, TextEditorDecorationType } from 'vscode'
import type { Awaitable } from '../utils'
import type { UseEditorDecorationsOptions } from './useEditorDecorations'
import { useActiveTextEditor } from './useActiveTextEditor'
import { useEditorDecorations } from './useEditorDecorations'

/**
 * 响应式地为活动编辑器设置装饰。参见 `vscode::window.activeTextEditor`。
 *
 * @category editor
 */
export function useActiveEditorDecorations(
  decorationTypeOrOptions: MaybeRefOrGetter<TextEditorDecorationType | DecorationRenderOptions>,
  decorations:
    | MaybeRef<readonly Range[] | readonly DecorationOptions[]>
    | ((editor: TextEditor) => Awaitable<readonly Range[] | readonly DecorationOptions[]>),
  options: UseEditorDecorationsOptions = {},
) {
  const activeEditor = useActiveTextEditor()

  return useEditorDecorations(activeEditor, decorationTypeOrOptions, decorations, options)
}
