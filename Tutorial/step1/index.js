import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({}, 'Hello world!'),
  document.body
)
