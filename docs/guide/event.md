# 事件 {#events}

虽然大多数 VSCode API 已被 <ReactiveVscode /> 覆盖，但有时你仍然需要创建或监听原始的 [VSCode 事件](https://code.visualstudio.com/api/references/vscode-api#events)。

`reactive::useEvent` 将原始事件转换为自动销毁的事件：

```ts
import { defineExtension, useEvent } from 'reactive-vscode'
import { workspace } from 'vscode'

const onDidCreateFiles = useEvent(workspace.onDidCreateFiles)

export = defineExtension(() => {
  // 无需手动销毁事件
  onDidCreateFiles((e) => {
    console.log('创建的文件：', e.files)
  })
})
```

`reactive::useEventEmitter` 创建一个友好的事件发射器，它仍然继承自 `vscode::EventEmitter`：

<!-- eslint-disable import/first -->
```ts
import type { Event } from 'vscode'

declare function someVscodeApi(options: { onSomeEvent: Event<string> }): void
// ---cut---
import { defineExtension, useEventEmitter } from 'reactive-vscode'

export = defineExtension(() => {
  const myEvent = useEventEmitter<string>([/* 可选的监听器 */])

  myEvent.addListener((msg) => {
    console.log(`收到消息：${msg}`)
  })

  myEvent.fire('Hello, World!')

  someVscodeApi({
    onSomeEvent: myEvent.event,
  })
})
```

你也可以将原始事件转换为友好的事件发射器：

```ts {6}
import { defineExtension, useEventEmitter } from 'reactive-vscode'
import { EventEmitter } from 'vscode'

export = defineExtension(() => {
  const rawEvent = new EventEmitter<string>()
  const myEvent = useEventEmitter(rawEvent, [/* 可选的监听器 */])
})
```
