import { a } from 'skruv/html.js'

import { sub } from '../state.js'

export default (attributes, ...children) => a({
  ...attributes,
  onclick: (e) => {
    const newUrl = e.currentTarget.href
    if (!(e.ctrlKey || e.shiftKey) && (new URL(newUrl)).host === (new URL(sub.url)).host) {
      e.preventDefault()
      if (newUrl !== sub.url) {
        sub.url = newUrl
        window.history.pushState({}, '', sub.url)
      }
    }
  }
}, children)
