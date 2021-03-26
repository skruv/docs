import { div, h1 } from '../node_modules/skruv/html.js'
import Link from './Link.js'

export default () => div({},
  h1({}, '404 - Could not find page!'),
  Link({ href: '/' }, 'Back to index')
)
