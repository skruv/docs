import water from 'root/water.css.js'
import { a, css, div, li, menu, style, ul } from 'skruv/html.js'

import { sub } from '../state.js'

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
  display: flex;
  align-items: center;
  padding: 0.2rem 0.4rem;
}

li {
  display: flex;
  align-items: stretch;
  margin: 0.2rem 0.2rem 0 0;
  border: 1px solid currentColor;
  border-bottom: 0;
}

@media (prefers-color-scheme: light) {
  li.active {
    background: #f5f2f0;
  }
}

@media (prefers-color-scheme: dark) {
  li.active {
    background: hsl(0, 0%, 8%);
  }
}

[data-file="diff"] {
  margin-left: auto;
}
`

export default ({ area }) => div({ style: `grid-area: ${area}; display: flex;`, 'data-shadowed': true },
  water,
  menuStyle,
  menu({},
    ul({}, sub.files.map(file =>
      li({
        'data-file': file,
        class: sub.activeFile === file && 'active'
      }, a({
        href: `#${file}`,
        onclick: e => {
          e.preventDefault()
          sub.activeFile = file
        }
      }, file))
    ))
  ))
