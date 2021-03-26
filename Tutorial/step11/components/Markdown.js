import marked from 'marked'
import { div } from 'skruv/html.js'

import { sub } from '../state.js'

const markdown = `
# Rendered via marked.js

Hello!
`

export default () => {
  sub.title = 'Marked.js - Skruv'
  return div({
    key: 'marked',
    opaque: true,
    oncreate: (elem) => { elem.innerHTML = marked(markdown) }
  })
}
