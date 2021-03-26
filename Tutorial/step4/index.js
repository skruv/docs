import NameBox from './components/NameBox.js'
import { body } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

export const sub = createState({
  text: ''
})

;(async () => {
  for await (const state of sub) {
    renderNode(
      body({},
        NameBox
      ),
      document.body
    )
  }
})()
