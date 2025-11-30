---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Reactive VSCode # '<span class="p1">Reactive</span> <span class="p2">VSCode</span>'
  text: "Extension API"
  tagline: |
    使用 <span class="i-vscode-icons:file-type-vue text-2xl"></span> <span class="text-reactive">组合式</span> API 开发 <span class="i-vscode-icons:file-type-vscode text-2xl"></span> <span class="text-vscode">扩展</span>
  image: /logo.svg
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 我们的初心
      link: /guide/why
    - theme: alt
      text: 可用方法
      link: /functions
    - theme: alt
      text: 示例代码
      link: /examples/

features:
  - icon: 🚀
    title: 简单易用
    details: 熟悉的 Vue 响应式 API
  - icon: 🦾
    title: 功能丰富
    details: 包含大多数 VSCode API 支持
  - icon: ⚡
    title: 完全可摇树优化
    details: 按需引入你想要的功能
  - icon: <span class="i-logos-vueuse"></span>
    title: VueUse 集成
    details: Vue 组合式工具集合
    link: /guide/vueuse
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="relative">

::: code-group

<<< ./examples/editor-decoration/1.ts [<ReactiveVscode2 />]

<<< ./examples/editor-decoration/2.ts [原始 VSCode API]

:::

<div class="absolute top-4 text-sm right-6 op-80 hidden sm:block">
<a :href="withBase('examples/index.html')" style="text-decoration: none">
<span class="i-carbon-launch mb-.5"></span> 更多示例
</a>
</div>

</div>
