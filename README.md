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
    - \[error, value]


- **catchify.resolve(value)**

    - Equivalent to [Promise.resolve(value)][1]
    - \[error, value]


- **catchify.race(iterable)**

    - Equivalent to [Promise.race(iterable)][2]
    - \[error, value]


- **catchify.all(iterable)**

    - Equivalent to [Promise.all(iterable)][3]
    - \[error, values]


- **catchify.reject(reason)**

    - Equivalent to [Promise.reject(reason)][4]
    - \[error]

- **catchify.some(iterable)**

    - Like `catchify.all(iterable)` but an error does not prevent resolution of the rest
    - Within the errors array, an error will be null if there was no error
    - Within the values array, the value will be null if there was an error
    - \[errors, values]

- **catchify.limit(iterable, limit=2)**

    - Like `catchify.some(iterable)` but allows limiting concurrent asynchronous tasks
    - Promises have no way to delay start, so any function in iterable will be called on its turn
    - Other than functions, which are called, all other values behave like you'd expect with 
    - Values returned from called functions can be a Promise, which would provide actually limiting 
    functionality, or any other value for convenience, as it will be passed to `Promse.resolve()`
    before proceeding
    - \[errors, values]

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
