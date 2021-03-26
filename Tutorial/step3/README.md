## Step 3: State management

You can use anything you like for state (just call the `renderNode` function when it changes) but skruv ships with a library if you'd like to use it. This is the `createState` function from the state.js file and it has a few tricks.

In this example we set the name on each keystroke in the input field and because we wrap the renderNode function call in `for await state of sub` we will rerender when it changes.

Modifying the state is just reassigning to it, it will notice changes and notify the render loop.

<details>
    <summary>Limitations</summary>
    <p>The createState objects can not see changes to objects that are not plain objects or arrays. If you store things like URL, Date or similar objects in it you will want to either reassign them or trigger a state update with <code>skruv_promise_resolve</code>. For normal array methods like push/splice or delete you will not need to do anything special.</p>
</details>
