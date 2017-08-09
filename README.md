# catchify
An async/await utility to eliminate try/catch in favor of error values.

Inspired by this [article][0].

## Quick Usage Example

```
const catchify = require('catchify');

async function example(promise){

  const [err, value] = await catchify(promise);
  
  if (err){
    // Respond to error here
  }
  // Process value here
}

```

## API

- **catchify(value)**

    - Equivalent to [Promise.resolve(value)][1]
    - \[err, resolvedValue]


- **catchify.resolve(value)**

    - Equivalent to [Promise.resolve(value)][1]
    - \[err, resolvedValue]


- **catchify.race(iterable)**

    - Equivalent to [Promise.race(iterable)][2]
    - \[err, resolvedValue]


- **catchify.all(iterable)**

    - Equivalent to [Promise.all(iterable)][3]
    - The resolved values are spread after error value
    - \[err, ...resolvedValues]


- **catchify.reject(reason)**

    - Equivalent to [Promise.reject(reason)][4]
    - \[err]
  
[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
