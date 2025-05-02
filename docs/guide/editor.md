# 编辑器和文档 {#editor-and-document}

## 文档 {#document}

`reactive::useDocumentText` 组合式可以用来获取文档的文本。

```ts
import type { ExtensionContext } from 'vscode'

import { computed, defineExtension, ref, useActiveTextEditor, useDocumentText, watchEffect } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)

  // 响应式的，可能从其他地方设置
  const name = ref('John Doe')

  watchEffect(() => {
    text.value = `Hello, ${name.value}!` // [!code highlight]
  })
})
```

## 编辑器装饰 {#editor-decoration}

`reactive::useEditorDecorations` 组合式可以用来为编辑器添加装饰。

```ts {5-9}
import { defineExtension, useActiveTextEditor, useEditorDecorations } from 'reactive-vscode'

export = defineExtension(() => {
  const editor = useActiveTextEditor()
  useEditorDecorations(
    editor,
    { backgroundColor: 'red' }, // 或创建的装饰类型
    () => [/* 动态计算的范围 */] // 或 Ref/Computed
  )
})
```

查看 `vscode::TextEditor.setDecorations` 获取更多信息。要创建装饰类型，使用 `vscode::window.createTextEditorDecorationType`。

## 编辑器选择 {#editor-selections}

以下 4 个组合式可以用来**获取和设置**编辑器的选择。

- `reactive::useTextEditorSelections` - 文本编辑器中的所有选择。
- `reactive::useTextEditorSelection` - 文本编辑器中的主要选择。
- `reactive::useNotebookEditorSelections` - 笔记本编辑器中的所有选择。
- `reactive::useNotebookEditorSelection` - 笔记本编辑器中的主要选择。

查看它们的文档获取更多信息。注意 `reactive::useTextEditorSelections` 和 `reactive::useTextEditorSelection` 还支持 `acceptKind` 选项来过滤触发此事件的改变类型 (参见 `vscode::TextEditorSelectionChangeKind`)。

## 编辑器视口 {#editor-viewport}

以下 3 个组合式可以用来**获取**编辑器的视口信息。

- `reactive::useTextEditorViewColumn` - 文本编辑器的视图列。
- `reactive::useTextEditorVisibleRanges` - 文本编辑器的可见范围。
- `reactive::useNotebookEditorVisibleRanges` - 笔记本编辑器的可见范围。

查看它们的文档获取更多信息。
