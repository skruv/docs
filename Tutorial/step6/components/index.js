import { sub } from '../index.js'
import { li, ul } from '../node_modules/skruv/html.js'
import Link from './Link.js'

export default () => {
  sub.title = 'Index - Skruv'
  return ul({},
    li({}, Link({ href: '/name' }, 'Name entry')),
    li({}, Link({ href: '/page2' }, 'Non-existent page'))
  )
}
