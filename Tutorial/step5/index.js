
import { body, div } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

export const sub = createState({
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

;(async () => {
  import('./router.js')

  for await (const state of sub) {
    renderNode(
      body({},
        div({},
          import(`./components/${state.pages[state.route]}`).then(i => i.default(state.routeArguments))
        )
      ),
      document.body
    )
  }
})()
