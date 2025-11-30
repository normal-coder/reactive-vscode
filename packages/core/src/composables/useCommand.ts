import type { Commands } from '../utils'
import { commands } from 'vscode'
import { useDisposable } from './useDisposable'

/**
 * 注册一个命令。参见 `vscode::commands.registerCommand`。
 *
 * @category commands
 */
export function useCommand<K extends Extract<keyof Commands, string>>(command: K, callback: Commands[K]) {
  useDisposable(commands.registerCommand(command, callback))
}
