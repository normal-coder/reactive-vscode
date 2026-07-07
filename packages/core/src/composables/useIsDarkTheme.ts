import type { ColorTheme } from 'vscode'
import { computed } from '@reactive-vscode/reactivity'
import { ColorThemeKind } from 'vscode'
import { defineService } from '../utils'
import { useActiveColorTheme } from './useActiveColorTheme'

/**
 * 判断当前颜色主题是否为深色主题。
 *
 * @see {@linkcode ColorTheme.kind}
 * @category window
 */
export const useIsDarkTheme = defineService(() => {
  const theme = useActiveColorTheme()

  return computed(() => theme.value.kind === ColorThemeKind.Dark || theme.value.kind === ColorThemeKind.HighContrast)
})
