## Step 11: Third party libraries (with build)

If the library you want to use does not have a built ES module you can use esbuild to build one. In this example we pull in marked.js which does not have a ES module, create a small file for esbuild to build and then use it to render markdown on a separate page.

If you prefer you can of course setup your whole skruv app in snowpack/webpack or similar.
