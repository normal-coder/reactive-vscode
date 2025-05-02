# 窗口和工作区 {#window-and-workspace}

## 主题 {#theme}

你可能希望根据当前主题为你的扩展程序应用不同的样式。虽然许多 API (例如 `vscode::TreeItem.iconPath`) 内置支持双主题，但有些 API 不支持。你可能还希望在你的 webview 中同步主题。

`reactive::useActiveColorTheme` 和 `reactive::useIsDrakTheme` 组合式可以用来获取当前主题以及判断是否为深色主题。

```ts {5,6}
import { defineExtension, useActiveColorTheme, useIsDarkTheme, watchEffect } from 'reactive-vscode'
import { useDemoWebviewView } from './webviewView'

export = defineExtension(() => {
  const theme = useActiveColorTheme()
  const isDark = useIsDarkTheme()

  const webviewView = useDemoWebviewView()

  watchEffect(() => {
    webviewView.postMessage({
      type: 'updateTheme',
      isDark: isDark.value,
      //         ^?
    })
  })
})
```

## 窗口状态 {#window-state}

`reactive::useWindowState` 组合式可以用来获取当前窗口状态：

- `vscode::WindowState.active` - 窗口最近是否被交互。这会在活动时立即改变，或者在用户短暂无活动后改变。
- `vscode::WindowState.focused` - 当前窗口是否被聚焦。

```ts {4}
import { defineExtension, useWindowState, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const { active: isWindowActive, focused: isWindowFocused } = useWindowState()

  watchEffect(() => {
    console.log('Window is active:', isWindowActive.value)
    console.log('Window is focused:', isWindowFocused.value)
  })
})
```

## 工作区文件夹 {#workspace-folders}

`reactive::useWorkspaceFolders` 组合式可以用来获取工作区文件夹：

```ts {4}
import { defineExtension, useWorkspaceFolders, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const workspaceFolders = useWorkspaceFolders()

  watchEffect(() => {
    console.log('There are', workspaceFolders.value?.length, 'workspace folders')
    //                         ^?
  })
})
```

## 监听文件系统变化 {#watch-file-system-changes}

`reactive::useFsWatcher` 组合式可以用来监听文件系统变化：

```ts {4}
import { computed, defineExtension, useFsWatcher, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const filesToWatch = computed(() => ['**/*.md', '**/*.txt'])
  const watcher = useFsWatcher(filesToWatch)
  watcher.onDidChange((uri) => {
    console.log('File changed:', uri)
  })
})
```

注意，你可以传递一个模式数组来监听文件系统中的变化。每个模式都会创建一个 VSCode 监听器。
