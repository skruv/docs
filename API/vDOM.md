# vDOM.js

## renderNode

The basic interface of vDOM.js is renderNode. It takes two arguments, the vDOM to render (create this with html.js) and the node to render to (usually document.body). It returns the node it rendered to since if you change the node type it will be a new node.

```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({}, 'Hello world!'),
  document.body
)
```

Or if you will change the node type:

```js
import { div } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

let root = document.querySelector('#root')

root = renderNode(
  div({}, 'Hello world!'),
  root
)
```

## Normal events

Normal dom events can be listened for using the event name prefixed with on as an attribute. For example the click event is `onclick`.

```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({
      onclick: (e) => {
          alert('Click!')
      }
  }),
  document.body
)
```

## oncreate/onremove

The attribute `oncreate` is called directly after a node is added to the DOM and the attribute `onremove` is called just before removing an element. You can use them in combination with opaque to implement third party libraries in skruv although it is recommended to do that via web components. The element is passed as an argument to both.

```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({
      oncreate: (e) => {
          console.log(e, 'was just added to the DOM')
      }
  }, 'Hello world!'),
  document.body
)
```

## onskruverror

Skruv will dispatch an event called skruverror when it catches an error it cannot handle. This can be useful for error tracking in systems like sentry or just for showing a error message to the user. Since it is a DOM event it will bubble up the DOM tree so you can catch it and stop it where you like. This is similar to error events in normal HTML but includes some more context (like the `vDOM` object that triggered the error).


```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body(
    {
      onskruverror: (e) => {
        // Oh no, total failure!
        alert('we\'d show a failwhale if we had one :(')
      }
    },
    div(
      {
        onskruverror: (e) => {
        // Okay-ish failure, report it to the devs and move on
          e.stopPropagation()
          fetch('/error_reporting', {
            method: 'POST',
            data: JSON.stringify(e)
          })
        }
      },
      div({}, 'Hello world!')
    )
  ),
  document.body
)
```

## data-shadowed

You can isolate the CSS by setting the attribute `data-shadowed` to true. Skruv will the set the children of that element in a shadow dom, which means that any css included as a child will not leak and css included outside of it will not affect css within it. CSS variables will still go through, which can be used to have global theming but local styles.

Not all elements can have a shadow DOM, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) for more info.

```js
import { body, css, div, p } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

const globalStyle = css`
p {
  color: red;
}
`

const localStyle = css`
p {
  color: blue;
}
`

renderNode(
  body({},
    globalStyle,
    p({}, 'global'),
    div({ 'data-shadowed': true },
      localStyle,
      p({}, 'local')
    )
  ),
  document.body
)
```

## key

Keying tells skruv to save an element in its memory and reuse it even if it moves somewhere else. This can be useful for things that have focus or internal state like web-components, input fields or video/audio elements. A key can either be an object or a number or a string, skruv will use either a WeakMap or a Map for storage based on the type.

A keyed element will also never be reused, so it can be useful for integrating third party libraries.

```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body({key: 'hello'}, 'Hello world!'),
  document.body
)
```

## opaque

Opaque tells skruv that it should not do anything at all with the children of the element. This is mostly useful for integrating third party libraries that want to manage their own DOM and is then used with `key` and `oncreate` is used as a hook to boot the library. Because skruv does not touch the children of an opaque element it will also not render any children.

```js
import { body } from './node_modules/skruv/html.js'
import { renderNode } from './node_modules/skruv/vDOM.js'

renderNode(
  body(div({opaque: true}, 'This will never be rendered')),
  document.body
)
```

## Supported component types

The supported types to pass to renderNode are currently:

 * vDOM objects
 * Arrays
 * Promises
 * Generators
 * Async generators

When swapping some generators for the same generator but with different context it might be buggy, I'm looking into this. A workaround is to key the parent element and swap that instead.

Follow the getting started guide for more in depth examples of these types
