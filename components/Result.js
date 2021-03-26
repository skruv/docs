import { css, iframe } from 'skruv/html.js'

import { sub } from '../state.js'

const style = css`
iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-left: 1px solid;
}
`

export default ({ area }) => [
  style,
  iframe({ style: `grid-area: ${area}`, src: `https://${sub.activeStep}.skruv.io` })
]
