## Step 10: Third party libraries

When you want to use third party libraries the easiest is if they are already packaged in ES module format which a lot of packages are. In that case you can add them to the import map and then use them as normally. In this case we also use `key`, `opaque` and `oncreate` to instantiate the library which then draws a graph.

There are tools to auto-generate import maps and you can read more about them [here.](https://github.com/WICG/import-maps)
