# Getting started with skruv

In this guide we will set up a skruv app step-by-step, similar to the app you are using to view these docs. For each step you will see the files that have changed to the top right, with a summary (diff) to furthest right. The area at the bottom right will show the result.

## Prerequisites

If running this locally you will need some sort of HTTP server, we use skruv-dev-server, a small server with automatic reload on changes and SPA routing. Any HTTP server that serves files will probably work if you want to use another.

In this example we add skruv and skruv-dev-server to package.json and a minimally valid index.html to start with. The HTML also has a small style tag to support dark mode since these docs do.

## Skruv terminology

For the most part we try to use the general JS terms for things so that you can easily look stuff up on [MDN](https://developer.mozilla.org/en-US/). The skruv specific terms used here are:

* vDOM: the specification of the HTML you want. Usually created with the included `html.js` library.
* rendering: taking a vDOM and turning into HTML in the browsers DOM. Done with the `renderNode` function from the included `vDOM.js` library.
* component: A general term for a function or generator that returns vDOM. These are what you write. Usually you have one component per file.
