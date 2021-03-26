import { sub } from '../index.js'
import { div, input, label } from '../node_modules/skruv/html.js'

export default () => {
  sub.title = 'Name entry - Skruv'
  return div({},
    label({},
      'Enter some text ',
      input({ value: sub.text, oninput: e => { sub.text = e.target.value } })
    ),
    div({}, sub.text)
  )
}
