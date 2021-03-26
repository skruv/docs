import { b, body, li, ul } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({},
    ul({},
      li({}, 'Using HTML'),
      li({},
        b({}, 'In skruv HTML is just normal JS functions')
      )
    )
  ),
  document.body
)
