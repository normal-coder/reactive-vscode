import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Reactive VSCode',
  description: '使用 Vue 响应式 API 开发 VSCode 扩展',
  base: '/reactive-vscode/',
  lang: 'en-US',
  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide/' },
      { text: '函数', link: '/functions' },
      { text: '示例', link: '/examples/' },
    ],

    sidebar: {
      '/guide': [
        {
          text: '指南',
          items: [
            { text: '为什么选择 reactive-vscode', link: '/guide/why' },
            { text: '开始使用', link: '/guide/' },
            { text: '扩展', link: '/guide/extension' },
            { text: '命令', link: '/guide/command' },
            { text: '视图', link: '/guide/view' },
            { text: '配置', link: '/guide/config' },
            { text: '编辑器和文档', link: '/guide/editor' },
            { text: '窗口和工作区', link: '/guide/window' },
            { text: '终端', link: '/guide/terminal' },
            { text: '自定义上下文', link: '/guide/context' },
            { text: 'Disposables', link: '/guide/disposable' },
            { text: '事件', link: '/guide/event' },
            { text: 'VueUse 集成', link: '/guide/vueuse' },
          ],
        },
        {
          items: [
            { text: '示例', link: '/examples/' },
          ],
        },
      ],
      '/examples': [
        {
          text: '示例',
          items: [
            { text: '索引', link: '/examples/' },
            { text: 'Hello Counter', link: '/examples/hello-counter/' },
            { text: '编辑器装饰', link: '/examples/editor-decoration/' },
            { text: '主题检测器', link: '/examples/theme-detector/' },
            { text: '文件系统监听器', link: '/examples/fs-watcher/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kermanx/reactive-vscode' },
      { icon: 'discord', link: 'https://discord.gg/8YNDMA5Hcq' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/kermanx/reactive-vscode/edit/main/docs/:path',
    },
  },
  head: [['link', { rel: 'icon', href: '/reactive-vscode/favicon.ico' }]],
  lastUpdated: true,

  vite: {
    plugins: [
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: resolve(__dirname, 'components.d.ts'),
        transformer: 'vue3',
      }) as any,
      UnoCSS({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            extraProperties: {
              'display': 'inline-block',
              'vertical-align': 'middle',
            },
            collections: {
              'reactive-vscode': {
                logo: () => readFile(resolve(__dirname, '../public/logo.svg'), 'utf-8'),
              },
            },
          }),
        ],
        theme: {
          colors: {
            'primary': '#1F9CF0',
            'reactive': '#229863',
            'vscode': '#1F9CF0',
            'vscode-darker': '#007ACC',
          },
          fontFamily: {
            mono: 'var(--vp-font-family-mono)',
          },
        },
        shortcuts: {
          'border-main': 'border-$vp-c-divider',
          'bg-main': 'bg-gray-400',
          'bg-base': 'bg-white dark:bg-hex-1a1a1a',
        },
        transformers: [
          transformerDirectives(),
          transformerVariantGroup(),
        ],
      }),
      {
        name: 'api-link',
        enforce: 'pre',
        transform(code, id) {
          if (!id.endsWith('.md'))
            return
          return code.replace(/`(\w+)::([^(`]+)(\(\S+?\))?`/g, (_, scope, name, link) => {
            return `<ApiLink scope="${scope}" name="${name}" ${link ? `link="${link.slice(1, -1)}"` : ''}/>`
          })
        },
      },
    ],
  },

  markdown: {
    codeTransformers: [
      transformerTwoslash({
        explicitTrigger: false,
        twoslashOptions: {
          compilerOptions: {
            module: 200, // ModuleKind.Preserve,
            paths: {
              'reactive-vscode': [
                resolve(__dirname, '../node_modules/reactive-vscode/dist/index.d.ts'),
              ],
            },
          },
          vfsRoot: resolve(__dirname, '../snippets'),
        },
      }),
    ],
  },
})
