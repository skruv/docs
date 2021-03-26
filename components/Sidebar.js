import { div } from 'skruv/html.js'

import { sub } from '../state.js'

export default ({ area }) => div({ style: `grid-area: ${area}` }, import(`/Tutorial/${sub.activeStep}/README.md.js`).then(res => div({}, res.default)))
