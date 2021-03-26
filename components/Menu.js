import water from 'root/water.css.js'
import { css, div, li, menu, style, ul } from 'skruv/html.js'

import icon from '../assets/icon.js'
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
  display: block;
  padding: 0.5rem 0.5rem;
}

li {
  display: inline-block;
  margin: 0.4rem 0.4rem 0 0;
}

svg {
  width: auto;
  height: 1.5rem;
  margin: 0 auto;
  fill: currentColor;
}

.active a {
  color: currentColor;
  text-decoration: underline;
}
`

export default ({ area, items }) => div(
  {
    class: 'menu',
    style: `grid-area: ${area}`,
    'data-shadowed': true
  },
  style({}, water),
  menuStyle,
  menu({},
    ul({}, Object.keys(items).map(item => {
      const active = (item !== '/' && window.location.pathname.includes(item)) || window.location.pathname === item
      return li({
        class: active && 'active'
      }, Link({ href: item },
        items[item].icon ? icon({ title: items[item].title }) : items[item].title
      ))
    }))
  )
)
