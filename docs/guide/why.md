---
outline: 'deep'
---

# 为什么选择 <ReactiveVscode /> {#why}

VSCode 扩展是增强你的开发体验的强大工具。但开发 VSCode 扩展并不容易。这个库的创建是为了帮助你使用 Vue 的响应式系统开发 VSCode 扩展。

## 存在的问题 {#the-problems}

开发 VSCode 扩展并不容易。官方 API 有点原始，存在以下几个问题：

### 状态监听困难 {#hard-to-watch-states}

官方 API 是基于事件的，这意味着你必须监听事件来观察状态。这会产生大量冗余代码，而且对 Vue 开发者来说并不熟悉。

### Disposables 的处理 {#the-disposables}

Disposables 在 VSCode 扩展中随处可见。你必须将它们全部存储在 `vscode::ExtensionContext.subscriptions` 中，或者手动处理它们的销毁。

### 初始化时机 {#when-to-initialize}

VSCode 扩展中的视图是懒加载的。如果你想要访问视图实例，你必须存储它，甚至还要监听一个在视图创建时触发的事件。

### 想要使用 Vue {#want-to-use-vue}

Vue 的响应式系统非常强大。使用 Vue 的响应式系统来监视状态和更新视图要容易得多。但 VSCode API 并不是为与 Vue 一起工作而设计的。

## 解决方案 {#the-solution}

[Vue 的响应式 API](https://vuejs.org/api/reactivity-core.html) 就是你所需要的一切。这个库将大多数 VSCode API 包装成了 [Vue 组合式函数](https://vuejs.org/guide/reusability/composables.html)。你可以像使用 Vue 响应式 API 一样使用它们，这对 Vue 开发者来说很熟悉。

在这个库的帮助下，你可以像开发 Vue 3 网页应用程序一样开发 VSCode 扩展。你可以使用 Vue 的响应式系统来监视状态，并将视图实现为 Vue 组合式函数。

### 效果 {#result}

这里有一个示例展示了这个库如何帮助你开发 VSCode 扩展。以下扩展根据配置装饰活动文本编辑器。

::: code-group

<<< ../examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ../examples/editor-decoration/2.ts [原始 VSCode API]

:::

如你所见，使用 <ReactiveVscode /> 后，代码变得更加清晰易懂。通过这个库提供的组合式函数如 `reactive::useActiveTextEditor`，你可以在开发 VSCode 扩展时顺畅地使用 Vue 的响应式 API，如 `vue::watchEffect(https://vuejs.org/api/reactivity-core.html#watcheffect)`。

更多示例[在此](../examples/){target="_blank"}。

## 常见问题 {#faq}

### 没有 DOM 和组件的 Vue？ {#vue-without-dom-and-components}

这个库基于 `npm::@vue/reactivity` 构建，并从 `npm::@vue/runtime-core` 移植了一些代码（参见 [`./packages/reactivity` 目录](https://github.com/kermanx/reactive-vscode/tree/main/packages/reactivity)）。

使用这个库构建的最小扩展大小约为 12KB。

### 在 Webview 中使用 Vue？ {#use-vue-in-webview}

这个库**不是**为在 webview 中使用 Vue 而设计的。如果你想在 webview 中使用 Vue，你可以使用 Vue 的 CDN 版本或者如 `npm::@tomjs/vite-plugin-vscode` 这样的打包器插件。
