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

* **catchify(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * Returns: \[error, value]
* **catchify.resolve(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * Returns: \[error, value]
* **catchify.race(iterable)**
  * Equivalent to [Promise.race(iterable)][2]
  * Returns: \[error, value]
* **catchify.all(iterable)**
  * Equivalent to [Promise.all(iterable)][3]
  * Returns: \[error, values]
* **catchify.reject(reason)**
  * Equivalent to [Promise.reject(reason)][4]
  * Returns: \[error]
* **catchify.some(iterable)**
  * Like `catchify.all(iterable)` but an error does not prevent resolution of the rest
  * Within the errors array, an error will be null if there was no error
  * Within the values array, the value will be null if there was an error
  * Returns: \[errors, values]
* **catchify.limit(iterable, limit=2)**
  * Like `catchify.some(iterable)` but it allows limiting concurrent asynchronous tasks
  * Promises have no way to delay start, so any function in iterable will be called on its turn
  * Values returned from called functions can be a Promise, which would provide the actual limiting 
    functionality, or any other value for convenience, as it will be passed to `Promise.resolve()`
    before proceeding
  * Returns: \[errors, values]

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
