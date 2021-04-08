import './router.js'

import { body, css, head, html, link, meta, style, title } from 'skruv/html.js'
import { renderNode } from 'skruv/vDOM.js'

import Menu from './components/Menu.js'
import { sub } from './state.js'
import water from './water.css.js'

const iconPath = new URL('assets/icon.svg', import.meta.url)

const baseStyles = css`
*,
::before,
::after {
  box-sizing: border-box;
}

body {
  display: grid;
  grid-template:
    ". Menu ." auto
    / 1fr auto 1fr;
  grid-column-gap: 1rem;
  max-width: 100%;
  height: 100vh;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}
`

;(async () => {
  for await (const state of sub) {
    renderNode(
      html({ lang: 'en-US' },
        head({},
          title({}, state.title),
          meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
          meta({ name: 'description', content: 'Skruv - No-dependency, no-build, small JS framework' }),
          link({ rel: 'icon', href: iconPath, type: 'image/svg+xml', sizes: 'any' }),
          water,
          baseStyles
        ),
        body({},
          Menu({ area: 'Menu', items: sub.menu }),
          import(`./components/${state.pages[state.route]}`)
            .then(i => i.default(state.routeArguments))
        )
      ),
      document.querySelector('html')
    )
  }
})()
