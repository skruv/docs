# state.js

## createState

The basic interface of state.js is createState. This takes in an object and returns a state object. All properties on the object are accessible as normal on the state object and it will behave as a normal object when used. It does however do two more things as explained below:

## generator

The state object is a async generator that resolves each time the state changes. What this means in practice is that you can use it as an iterator over time (instead of an iterator over values as normal iterators/arrays are). The idea is that you have a literal render loop, and each time you change the state it runs.

```js
import { createState } from './node_modules/skruv/state.js'

const sub = createState({
  count: 0
})

setInterval(() => { sub.count++ }, 1000)

;(async () => {
  for await (const state of sub) {
    console.log('State changed!', state)
  }
})()
```

You can also subscribe on sub-objects if you only want to react to some part of the state. In the next example since `other` is part of the whole state the listener on the root will trigger each time, but the listener on `other` will only trigger when `thatOtherCount` changes.


```js
import { createState } from './node_modules/skruv/state.js'

const sub = createState({
  count: 0,
  other: {
      thatOtherCount: 0
  }
})

setInterval(() => { sub.count++ }, 1000)
setInterval(() => { sub.other.thatOtherCount++ }, 3000)

;(async () => {
  for await (const state of sub) {
    console.log('State changed!', state)
  }
})()

;(async () => {
  for await (const state of sub.other) {
    console.log('Other changed!', state)
  }
})()
```

## proxy

As you saw in the example above the state object acts like a normal object in that you can get values from it and if you assign to it that will also resolve the await loop.

This works for normal objects and arrays and their associated methods like `push`, `splice`, `delete` and so on. It will not work for mutating non-normal objects like calling `append` on a `URLSearchParams` object or `setDate` on a `Date` object. For these you can either reassign the object or use `skruv_resolve` like described below.

## skruv_resolve

Sometimes (as described above) you need to manually trigger a state change. In that case simply access the property `skruv_resolve` on any normal object or array within the state and it will act as if it was changed.

## skruv_unwrap_proxy

If you want to get back the non-proxied object from a state you can call the property `skruv_unwrap_proxy` on it and it will return the object without a proxy. And children will still be wrapped though, since it is not recursive.
