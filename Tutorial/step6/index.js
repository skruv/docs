import { body, css, div, head, html, script, title } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

export const sub = createState({
  title: 'Skruv',
  url: window.location.href,
  routeArguments: {},
  text: '',
  route: '^/$',
  pages: {
    '^/$': 'index.js',
    '/name': 'NameBox.js',
    '/': '404.js'
  }
})

const style = css`
@media (prefers-color-scheme: dark) {
  body { background: #202b38; }

  body,
  a { color: #dbdbdb; }
}
`

;(async () => {
  import('./router.js')

  for await (const state of sub) {
    renderNode(
      html({ lang: 'en-US' },
        head({},
          title({}, state.title),
          script({ type: 'module', src: './index.js' }),
          style
        ),
        body({},
          div({},
            import(`./components/${state.pages[state.route]}`).then(i => i.default(state.routeArguments))
          )
        )
      ),
      document.querySelector('html')
    )
  }
})()
