# catchify
An async/await utility to eliminate try/catch in favor of error values.

Inspired by this [article][0].

## Example

```
const catchify = require('catchify');

async function example(promise){
  const [error, value] = await catchify(promise);
  if (error) {
    // Handle error here
  }
  // Process value here
}

```

## API

* **catchify(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * Returns: \[error, value]
  
  ```const [error, value] = await catchify(promise)```
  
* **catchify.resolve(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * Returns: \[error, value]
  
  ```const [error, value] = await catchify.resolve(promise)```
  
* **catchify.race(iterable)**
  * Equivalent to [Promise.race(iterable)][2]
  * Returns: \[error, value]
  
  ```const [error, value] = await catchify.race([promise1, promise2])```
  
* **catchify.all(iterable)**
  * Equivalent to [Promise.all(iterable)][3]
  * Returns: \[error, values]
  
  ```const [error, value] = await catchify.all([promise1, promise2])```
  
* **catchify.reject(reason)**
  * Equivalent to [Promise.reject(reason)][4]
  * Returns: \[error]
  
  ```const [error] = await catchify.reject('this is a test of error path')```
  
* **catchify.some(iterable)**
  * Like `catchify.all(iterable)` but an error does not prevent resolution of the rest
  * Within the errors array, an error will be null if there was no error
  * Within the values array, the value will be null if there was an error
  * Returns: \[errors, values]
  
  ```const [[error1, error2], [value1, value2]] = catchify.some([promise1, promise2])```
  
* **catchify.limit(iterable, limit=2, exitOnError=false)**
  * Like `catchify.some(iterable)` but it allows limiting concurrent asynchronous tasks
  * Promises have no way to delay start, so any function in iterable will be called on its turn
  * Values returned from called functions can be a Promise, which would provide the actual limiting 
    functionality, or any other value for convenience, as it will be passed to `Promise.resolve()`
    before proceeding
  * If exitOnError=true, each subset is still executed like `catchify.some(iterable)` but execution
    will halt if there is an error
  * Returns: \[errors, values]
  
  ```
  // The promises returned by fn1 and fn2 will execute concurrently. 
  // The promise from fn3 will start after the promises from fn1 and fn2 have resolved
  const [[error1, error2, error3], [value1, value2, value3]] = catchify.limit([fn1, fn2, fn3])
  ```

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
