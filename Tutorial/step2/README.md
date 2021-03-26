## Step 2: HTML elements

`renderNode` is skruv's way to render a vDOM to a element, it takes two arguments: the vDOM to render and the element to render to.

In skruv html and svg elements are usually made with functions imported from the `skruv/html.js` file. In the last example we used `body`, in this one we will construct a simple list of `ul` and `li` and use a `b` tag.

These functions take a first argument that is an object with their attributes (as shown with style on the `ul`) and the rest are children. You can also pass an array with multiple children instead of a single object, or just pass them in as multiple arguments after the attributes object.
