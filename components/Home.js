import { css, div, slot } from 'skruv/html.js'

import icon from '../assets/icon.js'
import { sub } from '../state.js'

const layout = css`
body {
  grid-template:
    ". Logo   ." auto
    ". Menu   ." auto
    ". Main   ." 1fr
    / 0 auto 0;
  max-width: 80ch;
  margin: 0 auto;
}

.logo {
  display: grid;
  grid-area: Logo;
  align-items: center;
  justify-items: center;
  margin: 1rem;
}

.logo svg {
  fill: currentColor;
}

.menu {
  margin: 0 auto;
}
`

export default () => {
  sub.title = 'Skruv - No-dependency, no-build, small JS framework.'
  return slot({ key: 'Home' },
    layout,
    div({ class: 'logo' }, icon({ title: 'Skruv' })),
    import('root/index.md.js').then(res => div({ style: 'grid-area: Main' }, res.default))
  )
}
