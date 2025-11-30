<h1>{{ $params.name }}</h1>

<FunctionInfo :name="$params.name" />

<script setup>
import { metadata } from '@reactive-vscode/metadata'
import { withBase, useData } from 'vitepress'

const { params, title } = useData()

const fn = metadata.functions.find(fn => fn.name === params.value.name)

// A workaround for https://github.com/vuejs/vitepress/issues/3758
if(!import.meta.env.SSR)
  document.title = `${fn.name} | Reactive VSCode`

const sourcePath = `packages/core/src/${fn.isComposable ? 'composables' : 'utils'}/${fn.name}.ts`
</script>

## 使用方法

<!-- @content -->

## 源代码

<a :href="`https://github.com/kermanx/reactive-vscode/blob/main/${sourcePath}`" target="_blank"><i i-carbon-logo-github text-black dark:text-white mb-1 text-lg />在 GitHub 上查看源代码</a>
