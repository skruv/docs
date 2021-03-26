import { a } from 'skruv/html.js'

import { sub } from '../state.js'

export default (attributes, ...children) => a({
  ...attributes,
  onclick: (e) => {
    if (!(e.ctrlKey || e.shiftKey)) {
      e.preventDefault()
      sub.url = new URL(e.currentTarget.href).toString()
      window.history.pushState({}, '', sub.url)
    }
  }
}, children)
