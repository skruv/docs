# html.js

## HTML & SVG

html.js is the helper library to create vDOM nodes. You can import HTML elements from it as functions and each of them takes a object of attributes as their first argument and children (or arrays of children) after that.

```js
import { div, h1, p } from './node_modules/skruv/html.js'

div({style: 'color: red', class: 'wrapper'},
  h1({class: 'large'}, 'Headline!'),
  p({}, 'paragraph here')
)
```

The output of any of these functions is an object like this: `{nodeName: 'div', attributes: {}, childNodes: []}`, so if you want to write that directly or use other libraries for it you can. The code and markdown on these docs are pre-processed into that format for example.

## CSS

html.js also has a helper function for css. It is a tagged template function and using it for styling will make many IDEs and tooling automatically work with your css. VScode syntax highlighting can be has with [es6-string-css](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css) and stylelint supports it out of the box.


```js
import { css, div, p } from './node_modules/skruv/html.js'

const styling = css`
  p {
      font-size: 2rem;
  }
`

div({},
  p({}, 'Larger text'),
  styling
)
```

## Other elements & textNodes

Other elements (like web-components) can be constructed using the generic `h` function. This is the base that all the other HTML & SVG elements rely on. It takes an additional first argument that is the name of the element but otherwise behave the same.

```js
import { div, h } from './node_modules/skruv/html.js'

div({},
  h('my-web-component', {}, 'children here'),
)
```

Textnodes can be made with the textNode function which takes a single argument, the text, Usually you don't need this since when using any other element it is handled for you.

```js
import { div, textNode } from './node_modules/skruv/html.js'

div({},
  textNode('children here'),
)
```
