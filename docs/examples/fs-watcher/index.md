---
outline: false
---

# 文件系统监听器 {#fs-watcher}

通过 VSCode Watcher API 监听一组动态的文件。

<ExampleFunctions :fns="[
  'useFsWatcher',
  'useCommands',
]" />

::: code-group

<<< ./1.ts [<ReactiveVscode2 />]

<<< ./2.ts [原始 VSCode API]

:::
