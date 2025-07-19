# 扩展 {#extension}

使用 <ReactiveVscode /> 创建 VSCode 扩展非常简单。你只需要在 `reactive::defineExtension` 函数内定义你的扩展代码，并导出返回的 `activate` 和 `deactivate` 函数。

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // 在此设置你的扩展
})
```

::: details TypeScript 配置 <span class="i-vscode-icons:file-type-typescript-official text-2xl mt--1 ml-1"></span>
VSCode 扩展应该是 CommonJS 模块。由于 `export =` 语句在 ESM 中不允许使用，如果你使用如 `tsup` 或 `tsdown` 这样的打包器，你需要在你的 `tsconfig.json` 中添加以下内容来使 TypeScript 满意。

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "Preserve"
  }
}
```

或者你可以通过这种方式避免使用 `export =` 语句：

```ts
import { defineExtension } from 'reactive-vscode'
const { activate, deactivate } = defineExtension(() => {
  // 你的扩展代码
})
export { activate, deactivate }
```
:::

## Setup 函数 {#the-setup-function}

就像 Vue 3 中的 `setup` 函数一样，<ReactiveVscode /> 中的 setup 函数定义了你的扩展应该如何工作。当扩展被激活时，这个函数将被调用一次。

你可以在 setup 函数中做这些事情：

- 注册命令（通过 `reactive::useCommand` 或 `reactive::useCommands`）
- 注册视图（在[下一节](./view.md)中介绍）
- 定义其他（响应式）逻辑（通过 `vue::watchEffect` 或 `vue::watch` 等）
- 使用其他组合式函数（如 `reactive::useActiveTextEditor`）

这里是一个示例：

<!-- eslint-disable import/first -->
```ts
import type { Ref } from 'reactive-vscode'
/**
 * 通过 `defineConfigs` 定义
 */
declare const message: Ref<string>
// ---cut---
import { defineExtension, useCommand, useIsDarkTheme, useLogger, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'
import { useDemoTreeView } from './treeView'

export = defineExtension(() => {
  const logger = useLogger('Reactive VSCode')
  logger.info('扩展已激活')
  logger.show()

  useCommand('reactive-vscode-demo.helloWorld', () => {
    window.showInformationMessage(message.value)
  })

  const isDark = useIsDarkTheme()
  watchEffect(() => {
    logger.info('是深色主题：', isDark.value)
  })

  useDemoTreeView()
})
```

## 扩展上下文 {#the-extension-context}

[扩展上下文](https://code.visualstudio.com/api/references/vscode-api#ExtensionContext)可以从 `reactive-vscode` 导入。它是一个全局的 `shallowRef`，包含了 `vscode::ExtensionContext` 对象。

```ts
import { extensionContext } from 'reactive-vscode'

extensionContext.value?.extensionPath
//                 ^?
```

<div mt-8 />

一个常见的用例是获取扩展中某些资源的绝对路径。在这种情况下，你可以使用 `reactive::useAbsolutePath` 作为快捷方式。
