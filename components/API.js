import { prismDiffHighlightStyles, prismStyles, prismTwilightStyles } from 'prism'
import { css, div, main, slot } from 'skruv/html.js'

import { sub } from '../state.js'
import Menu from './Menu.js'
const layout = css`
body {
  grid-template:
    ". Menu    ." auto
    ". SubMenu ." auto
    ". Main    ." 1fr
    / 0 auto 0;
  max-width: 80ch;
  margin: 0 auto;
}

.menu {
  margin: 0 auto;
}

main {
  grid-area: Main;
  padding-bottom: 1rem;
}
`

const prismCodeStyles = css`
@media (prefers-color-scheme: light) {
  ${prismStyles}
}

@media (prefers-color-scheme: dark) {
  ${prismTwilightStyles}

  pre[class*="language-"] {
    border: none;
    box-shadow: none;
  }
}

${prismDiffHighlightStyles}

pre[class*="language-"] {
  margin: 0;
}
`

export default ({ file } = {}) => {
  sub.title = `Skruv - API - ${file}`
  return slot({ key: 'API' },
    prismCodeStyles,
    layout,
    Menu({
      area: 'SubMenu',
      items: {
        '/API/vDOM': { title: 'vDOM' },
        '/API/state': { title: 'state' },
        '/API/html': { title: 'html' }
      }
    }),
    main({},
      import(`root/API/${file || 'index'}.md.js`).then(res => div({ id: 'vDOM' }, res.default))
    )
  )
}
