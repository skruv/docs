import { body, css, div, head, html, script, title } from 'skruv/html.js'
import { renderNode } from 'skruv/vDOM.js'

import Menu from './components/Menu.js'
import { sub } from './state.js'

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
          Menu({ area: 'Menu' }),
          div({},
            import(`./components/${state.pages[state.route]}`).then(i => i.default(state.routeArguments))
          )
        )
      ),
      document.querySelector('html')
    )
  }
})()
