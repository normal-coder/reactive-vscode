# VueUse 集成 {#vueuse-integration}

<ReactiveVscode /> 为 VSCode 扩展开发提供了一个可选的 [VueUse](https://vueuse.org/) 集成。

这个包包含了一部分与 Node.js 环境兼容的 VueUse 函数。这意味着依赖浏览器环境的函数已被移除。

另外，这个包使用 `npm::@reactive-vscode/reactivity` 替代了 `npm::vue-demi` 包来提供 Vue 响应式 API。这意味着依赖 Vue 渲染 API 的函数已被移除。

## 使用方法 {#usage}

::: code-group

```bash [pnpm]
pnpm install -D @reactive-vscode/vueuse
```

```bash [npm]
npm install -D @reactive-vscode/vueuse
```

```bash [yarn]
yarn add -D @reactive-vscode/vueuse
```

:::

```ts
import { useIntervalFn } from '@reactive-vscode/vueuse'
import { defineExtension } from 'reactive-vscode'

export = defineExtension(() => {
  useIntervalFn(() => {
    console.log('Hello World')
  }, 1000)
})
```

## 可用函数 {#available-functions}

所有与 Node.js 环境兼容且不需要 Vue 渲染 API 的 VueUse 函数都可在此包中使用。查看 [`packages/vueuse/src/index.ts`](https://github.com/kermanx/reactive-vscode/blob/main/packages/vueuse/src/index.ts) 获取完整列表。
