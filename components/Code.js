import { prismDiffHighlightStyles, prismStyles, prismTwilightStyles } from 'prism'
import { code, css, div, pre, slot } from 'skruv/html.js'

import { sub } from '../state.js'

const codeStyles = css`
.code {
  display: grid;
  overflow: auto;
  border-bottom: 1px solid;
  border-left: 1px solid;
}
`

const prismCodeStyles = css`
@media (prefers-color-scheme: light) {
  ${prismStyles}
}

@media (prefers-color-scheme: dark) {
  ${prismTwilightStyles}

  pre[class*="language-"] {
    border: none;
    box-shadow: none;
  }
}

${prismDiffHighlightStyles}

pre[class*="language-"] {
  padding: 0 1em;
  margin: 0;
}

.token.deleted,
.token.inserted.prefix {
  -webkit-user-select: none;
  user-select: none;
}
`

export default ({ area }) => {
  if (!sub.activeFile) {
    return false
  }

  const fileType = sub.activeFile.match(/[^./]*$/)[0]
  const type = fileType === 'diff' ? 'diff-js' : fileType
  return slot({},
    codeStyles,
    import(`/Tutorial/${sub.activeStep}/${sub.activeFile}.js`).then(res => div(
      {
        class: 'code',
        'data-shadowed': true,
        style: `grid-area: ${area}`
      },
      prismCodeStyles,
      pre({ class: `language-${type}` }, code({ class: `language-${type} diff-highlight` }, res.default))
    ))
  )
}
