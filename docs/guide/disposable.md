# Disposables {#disposables}

尽管 <ReactiveVscode /> 已经覆盖了大多数 VSCode API，但有时你仍然需要使用 `vscode::Disposable`，这在 [VSCode API 模式](https://code.visualstudio.com/api/references/vscode-api#disposables)中也有描述。

`reactive::useDisposable` 接受一个可释放对象，并在当前作用域被释放时自动释放它（例如，当扩展被禁用时，如果 `vscode::useDisposable` 在扩展的 setup 函数中调用）。`reactive::useDisposable` 会原样返回该可释放对象。

```ts
import type { TextDocument } from 'vscode'
import { defineExtension, useDisposable } from 'reactive-vscode'
import { languages } from 'vscode'

export = defineExtension(() => {
  useDisposable(languages.registerFoldingRangeProvider(
    { language: 'markdown' },
    {
      provideFoldingRanges(document: TextDocument) {
        return []
      },
    },
  ))
})
```

注意，对于由任何 <ReactiveVscode /> 函数创建的可释放对象，你不需要使用 `reactive::useDisposable`。它们会在当前作用域被释放时自动释放。
