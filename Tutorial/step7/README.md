## Step 7: Styling & CSS scoping

The way I use CSS in skruv is to include it in the components and there is a template helper to create style tags called `css` exported from `html.js`. This helper means that a lot of IDE's will syntax highlight the CSS automatically and linters like stylelint will work.

You can isolate the styling by setting the attribute `data-shadowed` to true on a element. Skruv will the set the children of that element in a shadow dom, which means that any css included as a child will not leak and css included outside of it will not affect css within it. CSS variables will still go through, which can be used to have global theming but local styles.

Not all elements can have a shadow DOM, see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) for more info.

In this example we style the `ul` within the Menu, but do not want that to leak out the rest of the page (for example the `ul` added under "Name entry").
