import type { TextEditor, TextEditorEdit } from 'vscode'
import { commands } from 'vscode'
import { useDisposable } from './useDisposable'

export type TextEditorCommandCallback = (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) => void

/**
 * 注册一个文本编辑器命令。参见 `vscode::commands.registerTextEditorCommand`。
 *
 * @category commands
 */
export function useTextEditorCommand(command: string, callback: TextEditorCommandCallback) {
  useDisposable(commands.registerTextEditorCommand(command, callback))
}
