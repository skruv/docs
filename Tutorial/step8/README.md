## Step 8: Generators and async

Skruv will resolve promises passed to it and iterate over async generators. This means that if your component needs to wait for async work (like a fetch or import) you can pass that to the renderer. Skruv will use a `slot` element as a placeholder in the meanwhile to ensure that it can continue rendering while you do async work, but usually you will want to yield a loader to indicate progress.

A normal usecase for generator components is for importing components or doing data fetching. In this example we have a generator called `Fetcher` which first returns a progressbar and then when the data is fetched will return a list with the data. Generators can return as many times as you like, so they can be useful for displaying streaming data from a websocket or server-sent events.

If you are unfamiliar with generators and want to find out more I recommend you read [MDN's docs.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions)
