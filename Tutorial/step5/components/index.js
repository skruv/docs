import { li, ul } from '../node_modules/skruv/html.js'
import Link from './Link.js'

export default () => ul({},
  li({}, Link({ href: '/name' }, 'Name entry')),
  li({}, Link({ href: '/page2' }, 'Non-existent page'))
)
