import { css, div } from 'skruv/html.js'

import icon from '../assets/icon.js'

const loaderStyle = css`
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loader svg {
  grid-area: Loader;
  width: 100px;
  height: 100px;
  transform-origin: 50% 50%;
  animation: spin 1s infinite ease-in-out;
}
`
export default div({ class: 'loader' }, loaderStyle, icon)
