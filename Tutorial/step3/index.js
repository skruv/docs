import { body, div, input, label } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

const sub = createState({
  text: ''
})

;(async () => {
  for await (const state of sub) {
    renderNode(
      body({},
        label({},
          'Enter your name ',
          input({ value: state.text, oninput: e => { state.text = e.target.value } })
        ),
        div({}, state.text)
      ),
      document.body
    )
  }
})()
