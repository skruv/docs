/* global fetch */
import { css, slot } from 'skruv/html.js'

import { sub } from '../state.js'
import Code from './Code.js'
import FilesMenu from './FilesMenu.js'
import Link from './Link.js'
import Result from './Result.js'
import Sidebar from './Sidebar.js'

const layout = css`
body {
  grid-template:
    ". Menu    Menu    FilesMenu" auto
    ". Sidebar Sidebar Code" 1fr
    ". Sidebar Sidebar Result" 1fr
    ". Prev    Next    Result" auto
    / 0 30ch 30ch 1fr;
}

.nav {
  display: block;
  margin: 1rem;
  font-size: 1.5rem;
}

a.nav {
  text-decoration: underline;
}

.nav.prev {
  text-align: left;
}

.nav.next {
  text-align: right;
}
`

export default async (args) => {
  if (sub.activeStep !== args.step) {
    sub.activeStep = args.step
    sub.title = `Skruv - Tutorial - ${sub.steps[sub.activeStep]}`
    sub.files = [...await fetch('./files.json').then(res => res.json()), 'diff']
    sub.activeFile = sub.files[sub.files.length - 1]
  }

  return async function * componentWithLoader () {
    sub.steps = await fetch('../steps.json').then(res => res.json())

    for await (const state of sub) {
      const stepKeys = Object.keys(state.steps)
      const previousStep = stepKeys[stepKeys.indexOf(state.activeStep) - 1]
      const nextStep = stepKeys[stepKeys.indexOf(state.activeStep) + 1]
      yield slot({ key: 'GettingStarted' },
        layout,
        FilesMenu({ area: 'FilesMenu' }),
        Code({ area: 'Code' }),
        Sidebar({ area: 'Sidebar' }),
        Result({ area: 'Result' }),
        !!previousStep && Link({
          class: 'nav prev',
          href: `../${previousStep}/`,
          style: 'grid-area: Prev'
        }, '< Previous step'),
        !!nextStep && Link({
          class: 'nav next',
          href: `../${nextStep}/`,
          style: 'grid-area: Next'
        }, 'Next step >')
      )
    }
  }
}
