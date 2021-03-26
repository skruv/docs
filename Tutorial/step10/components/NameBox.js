import { button, div, input, label, li, ul } from 'skruv/html.js'

import { sub } from '../state.js'

export default () => {
  sub.title = 'Name entry - Skruv'
  return div({},
    label({},
      'Enter some text ',
      input({ value: sub.text, oninput: e => { sub.text = e.target.value } }),
      sub.text && button({ onclick: () => { sub.texts.push(sub.text); sub.text = '' } }, `Add "${sub.text}"`)
    ),
    ul({}, sub.texts.map(text => li({}, text)))
  )
}
