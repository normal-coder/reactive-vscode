import { computed } from '@reactive-vscode/reactivity'
import { ColorThemeKind } from 'vscode'
import { createSingletonComposable } from '../utils'
import { useActiveColorTheme } from './useActiveColorTheme'

/**
 * 判断当前颜色主题是否为深色。参见 `vscode::ColorTheme.kind`。
 *
 * @category window
 */
export const useIsDarkTheme = createSingletonComposable(() => {
  const theme = useActiveColorTheme()

  return computed(() => theme.value.kind === ColorThemeKind.Dark || theme.value.kind === ColorThemeKind.HighContrast)
})
