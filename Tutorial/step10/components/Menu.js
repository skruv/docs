import { css, div, li, menu, ul } from 'skruv/html.js'

import Link from './Link.js'

const menuStyle = css`
ul,
menu {
  display: flex;
  flex: 1;
  align-items: stretch;
  padding: 0;
  margin: 0;
}

a {
  font-weight: bold;
  color: inherit;
}

li {
  display: block;
  margin: 1rem;
}

li:first-child {
  margin-left: 0;
}
`

export default ({ area }) => div({ style: `grid-area: ${area}`, 'data-shadowed': true },
  menu({},
    menuStyle,
    ul({},
      li({}, Link({ href: '/name' }, 'Name entry')),
      li({}, Link({ href: '/graph' }, 'Graph')),
      li({}, Link({ href: '/page2' }, 'Non-existent page'))
    )
  )
)
