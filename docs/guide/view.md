# 视图 {#views}

视图是 VSCode 扩展的重要组成部分。VSCode 中有两种类型的视图：[树视图](https://code.visualstudio.com/api/extension-guides/tree-view)和[Webview](https://code.visualstudio.com/api/extension-guides/webview)。请阅读[官方用户体验指南](https://code.visualstudio.com/api/ux-guidelines/views)以获得基本了解。

## 在 Manifest 清单中定义 {#define-in-manifest}

如[官方文档](https://code.visualstudio.com/api/references/contribution-points#contributes.viewsContainers)所述，首先，你需要在 `package.json` 的 `contributes.viewsContainers.[viewContainerType]` 部分定义视图容器。然后你可以在 `contributes.views.[viewContainerId]` 部分定义你的视图。

```json [package.json]
{
  "contributes": {
    "viewsContainers": {
      "activitybar": [
        {
          "id": "package-explorer",
          "title": "Package Explorer",
          "icon": "resources/package-explorer.svg"
        }
      ]
    },
    "views": {
      "package-explorer": [
        {
          "id": "package-dependencies",
          "name": "Dependencies"
        },
        {
          "id": "package-outline",
          "name": "Outline"
        }
      ]
    }
  }
}
```

![自定义视图容器](https://code.visualstudio.com/assets/api/references/contribution-points/custom-views-container.png)

## 注册树视图（TreeView） {#register-tree-view}

[树视图（TreeView）](https://code.visualstudio.com/api/extension-guides/tree-view)用于显示层级数据。你可以使用 `reactive::useTreeView` 函数定义树视图。

这里是一个树视图 (TreeView) 的示例：

<<< @/snippets/treeView.ts {35-41}

然后你可以在任何地方调用 `useDemoTreeView` 函数来注册树视图并获取返回值：

```ts {2,5}
import { defineExtension } from 'reactive-vscode'
import { useDemoTreeView } from './treeView'

export = defineExtension(() => {
  const demoTreeView = useDemoTreeView()
  // ...
})
```

节点中的 `children` 属性用于定义节点的子节点。`treeItem` 属性是必需的，用于定义节点的树项。它应该是一个 `vscode::TreeItem` 对象，或者是一个解析为 `vscode::TreeItem` 对象的 Promise。

如果你想基于一些在 `treeData` 中未跟踪的响应式值触发更新，你可以将它们传递给 `watchSource` 选项。

::: details 关于 `reactive::createSingletonComposable`
`reactive::createSingletonComposable` 是一个用于创建单例组合式的辅助函数。它只会创建一次组合式，并在每次调用时返回相同的实例。
:::

::: warning
对于上面的示例，不应该在模块的顶层调用 `useDemoTreeView`，因为此时扩展上下文不可用。相反，你应该**始终**在 `setup` 函数中调用它。
:::

## 注册 Webview {#register-webview}

[Webview](https://code.visualstudio.com/api/extension-guides/webview)用于在编辑器中显示 Web 内容。你可以使用 `reactive::useWebviewView` 函数定义一个 webview。

这里是一个 webview 的示例：

<<< @/snippets/webviewView.ts

调用 `useDemoWebviewView` 的时机与上一节中的树视图相同。

还有 `reactive::useWebviewPanel` 组合式用于创建 webview 面板。其用法与 `reactive::useWebviewView` 类似。
