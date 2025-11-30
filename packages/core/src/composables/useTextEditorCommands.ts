import type { TextEditorCommandCallback } from './useTextEditorCommand'
import { useTextEditorCommand } from './useTextEditorCommand'

/**
 * 注册多个文本编辑器命令。参见 `vscode::commands.registerTextEditorCommand`。
 *
 * @category commands
 */
export function useTextEditorCommands(commands: Record<string, TextEditorCommandCallback>) {
  for (const [command, callback] of Object.entries(commands))
    useTextEditorCommand(command, callback)
}
