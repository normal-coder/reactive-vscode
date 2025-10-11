---
theme: default
background: https://cover.sli.dev
title: Reactive VSCode
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
mdc: true
---

# VSCode Extension Development

with reactive-vscode

---

# What can extensions do?

- **Extending the Workbench**: Add custom components & views in the UI
- **Language Extensions**/**Debugger**: Support a new programming language
- **Themes**/**Snippets**/**Keymaps**
- **AI**: Agent, Tools
- **Packs**

---

# The architecture of VSCode

![](https://code.visualstudio.com/assets/blogs/2022/11/28/process-model-after-sandboxing.png)


- https://code.visualstudio.com/blogs/2022/11/28/vscode-sandbox

---

# Runtime & RPC

- Node.js (Extension Host)

- Web Worker (Extension Host on VSCode Web)

- Browser (Webview)

---

![](https://code.visualstudio.com/assets/api/ux-guidelines/examples/architecture-containers.png){.fixed.top-0.h-full}

- https://code.visualstudio.com/api/ux-guidelines/overview

---
layout: fact
---

VSCode Extensions are UI Applications

---

# Why Reactive?

<div />

Fact: $\text{UI} = f(\text{State})$

  - If the active document is a Markdown, show the markdown toolbar, otherwise hide it.

Fact: $\text{State}' = \delta(\text{State}, \text{Event})$

- When the active document changes, update the state.

```ts
const state = {
  isMarkdown: false,
}

function f(state) {
  return {
    showToolbar: state.isMarkdown,
  }
}

onActiveDocumentChange((doc) => {
  state.isMarkdown = doc.languageId === 'markdown'
})

UI = f(state) // ?
```

---

# Vanilla Approach

```ts
const state = {
  isMarkdown: false,
}

onActiveDocumentChange((doc) => {
  const before = state.isMarkdown
  state.isMarkdown = doc.languageId === 'markdown'
  if (state.isMarkdown !== before) {
    if (state.isMarkdown) {
      UI.showToolbar()
    } else {
      UI.hideToolbar()
    }
  }
})
```

---

# Diff Approach

```ts
const state = {
  isMarkdown: false,
}

function f(state) {
  return {
    showToolbar: state.isMarkdown,
  }
}

onActiveDocumentChange((doc) => {
  state.isMarkdown = doc.languageId === 'markdown'
  diffAndUpdate()
})
```

---

# Reactive Approach

```ts
const state = reactive({
  isMarkdown: false,
})

const toolbarVisible = computed(() => state.isMarkdown)

UI.useToolbar(toolbarVisible) // <-- reactive-vscode

onActiveDocumentChange((doc) => {
  state.isMarkdown = doc.languageId === 'markdown'
})
```

---

# Reactivity Basics

The 

---

# Extension Basics

- Essentially a Node.js package
  - Node.js and NPM
  - `package.json` describes the extension
    - `main` field: the entry file
    - `activationEvents` field: when to activate the extension
    - `contributes` field: what the extension contributes

- The entry file exports:
  - `activate` function: startup
  - `deactivate` function: cleanup

- `vscode` module provides the VSCode API

  ```ts
  import { workspace, window, commands } from 'vscode'
  ```

---

# The Entry File

```ts
import { defineExtension } from 'reactive-vscode'

export const { activate, deactivate } = defineExtension(() => {
  // Runs in a effect scope
  // Which cleans up automatically on deactivate
})
```

---

# Define a "Component"

<div />

The "component" is a new effect scope, which

- Runs once when called
- Lives until the extension is deactivated

```ts
import { defineService } from 'reactive-vscode'

const useMyView = defineService(() => {
  // ...
})

const useMyCommands = defineService(() => {
  const myView = useMyView()
  // ...
})

export const { activate, deactivate } = defineExtension(() => {
  useMyView()
  useMyCommands()
})
```

---

# Example: Command Handler

```ts
import { defineService } from 'reactive-vscode'
import { window } from 'vscode'

export const useMyCommands = defineService(() => {
  const counter = ref(0)

  useCommands({
    'myExtension.increment': () => {
      counter.value++
      window.showInformationMessage(`Counter: ${counter.value}`)
    },
    'myExtension.decrement': () => {
      counter.value--
      window.showInformationMessage(`Counter: ${counter.value}`)
    },
  })
})
```

---

# Example: Configuration

---

# Example: Tree View

---

# Composable Paradigm



---

# Extra: Language Tooling

