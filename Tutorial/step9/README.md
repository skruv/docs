## Step 9: Import maps

To be able to use nicer paths for our imports and to prepare for the next step (third party dependencies) we can use import maps to change paths like `../node_modules/skruv/html.js` to `skruv/html.js`. Because browser support is still not quite good enough we import a small shim and include it in our index.html.
