## Step 5: Routing

There is no built in router, but a simple one can be constructed as in this step. The routes are defined as an object in the state with regex keys and it allows for named matchers to be passed to the imported components. The component `Link.js` creates an `a` tag that sets new urls on navigation. it also has a loose 404 matcher that will match on all routes but will get the lowest priority since it is shortest.

Because the routes are defined in the state we can easily add to them when the app runs or fetch routes from the network.
