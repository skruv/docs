import { div, h1 } from 'skruv/html.js'

import { sub } from '../state.js'
import Link from './Link.js'

export default () => {
  sub.title = '404 - Could not find page - Skruv'
  return div({},
    h1({}, '404 - Could not find page!'),
    Link({ href: '/' }, 'Back to index')
  )
}
