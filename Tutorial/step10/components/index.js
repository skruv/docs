/* global fetch */
import { b, div, li, progress, ul } from 'skruv/html.js'

import { sub } from '../state.js'

async function * Fetcher () {
  yield progress()
  const week = await fetch('/example.json').then(res => res.json())
  yield ul({}, week.map(day => li({}, day)))
}

export default () => {
  sub.title = 'Index - Skruv'
  return div({},
    b({}, 'Select from menu above'),
    Fetcher
  )
}
