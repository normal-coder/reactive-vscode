---
outline: [2,3]
---

# 开始使用 {#get-started}

Reactive VSCode 是一个帮助你使用 [Vue 的响应式 API](https://vuejs.org/api/reactivity-core.html) 开发 Visual Studio Code 扩展的库。我们假设你已经熟悉了 [Vue 响应式 API](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) 的基本概念。

阅读[为什么选择 reactive-vscode](./why.md) 了解更多关于创建 <ReactiveVscode /> 的原因。

## 创建新项目 {#create-a-new-project}

::: code-group

```bash [pnpm]
pnpm create reactive-vscode
```

```bash [npm]
npm init reactive-vscode@latest
```

```bash [yarn]
yarn create reactive-vscode
```

:::

或者你可以通过安装 `reactive-vscode` 包将其添加到现有项目中。

## 包导出 {#package-exports}

该包导出以下内容：

- 实用工具函数和类型，如 `reactive::defineExtension`
- 将 VSCode API 包装为组合式函数，如 `reactive::useActiveTextEditor`
- 来自 `npm::@vue/reactivity` 的所有导出，如 `vue::ref(https://vuejs.org/api/reactivity-core.html#ref)`
- 来自 `npm::@vue/runtime-core` 的对 VSCode 扩展有用的导出，如 `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)`

你可以在[这里](../functions/index.md)找到所有已实现的组合式函数。它们将在未来得到详细文档。

## 扩展基础 {#extension-basics}

### 扩展清单 <NonProprietary /> {#extension-manifest}

每个 VS Code 扩展都必须有一个作为[扩展清单](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest)的 `package.json`。请访问[官方文档](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-manifest)了解更多信息。

### 扩展入口文件 {#extension-entry-file}

通常，[扩展入口文件](https://code.visualstudio.com/api/get-started/extension-anatomy#extension-entry-file)是 `src/extension.ts`。你可以使用 `reactive::defineExtension` 函数定义你的扩展：

```ts
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  // 在此设置你的扩展
})
```

我们将在[下一节](./extension.md)介绍如何编写扩展的主体部分。

## 开发扩展 {#developing-the-extension}

1. 打开一个新终端并运行以下命令：

::: code-group

```bash [pnpm]
pnpm dev
```

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::

2. <NonProprietary /> 在编辑器中，按下 <kbd>F5</kbd> 或从命令面板 (<kbd>Ctrl+Shift+P</kbd>) 运行命令 **Debug: Start Debugging**。这将在新窗口中运行扩展。

> 访问 [VSCode 文档](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension)了解更多关于调试扩展的信息。

<div h-4 />

---

::: info [Twoslash](https://twoslash.netlify.app/) 驱动的文档！

你可以悬停在代码块中的标记上以检查它们的类型。这对于文档中未涵盖的细节特别有用。

:::
