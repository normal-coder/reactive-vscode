# 命令 {#commands}

命令（Commands）将触发具体的动作（Actions）。命令可以将具体功能暴露给用户、绑定到 VS Code 的 UI 上，并实现内部逻辑。

VSCode 有一些[内置命令](https://code.visualstudio.com/api/references/commands),你也可以定义自己的命令。

## 在 Manifest 清单中定义 {#define-in-manifest}

如[官方文档](https://code.visualstudio.com/api/references/contribution-points#contributes.commands)所述，你需要在 `package.json` 的 `contributes.commands` 字段中定义命令。

```json [package.json]
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World",
        "category": "Hello",
        "icon": {
          "light": "path/to/light/icon.svg",
          "dark": "path/to/dark/icon.svg"
        }
      }
    ]
  }
}
```

## 注册命令 {#register-commands}

你可以使用 `reactive::useCommand` 或 `reactive::useCommands` 函数在你的扩展中注册命令。

```ts {6-9}
import { defineExtension, ref, useCommand, watchEffect } from 'reactive-vscode'
import { window } from 'vscode'

export = defineExtension(() => {
  const helloCounter = ref(0)
  useCommand('extension.sayHello', () => {
    window.showInformationMessage('Hello World')
    helloCounter.value++
  })

  watchEffect(() => {
    if (helloCounter.value > 99)
      window.showWarningMessage('你已经说太多次 hello 了！')
  })
})
```

## 注意事项 {#caveats}

### 命令面板可见性 {#command-palette-visibility}

命令可以用作视图操作，或被其他扩展调用。在这种情况下，命令可能会有参数而不应该通过[命令面板](https://code.visualstudio.com/api/ux-guidelines/command-palette)调用。我们应该通过设置 `contributes.menus[*].when` 属性为 `false` 来从命令面板中隐藏这些命令：

```json
{
  "contributes": {
    "commands": [
      {
        "command": "extension.doSomething",
        "title": "This requires params"
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "command": "extension.doSomething",
          "when": "false"
        }
      ]
    }
  }
}
```

查看[官方文档](https://code.visualstudio.com/api/references/contribution-points#Context-specific-visibility-of-Command-Palette-menu-items)获取更多信息。
