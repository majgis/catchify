# catchify
An async/await utility to eliminate try/catch in favor of error values.

Inspired by this [article][0].

Also see [default values for array destructuring][5].

[Change Log][6]

## Example

```
const catchify = require('catchify');

async function example(promise){
  const [error, value={message:'Hello'}] = await catchify(promise);
  if (error) console.log(error);
  return value;
}

```

## API

* **catchify(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * `catchify(value)` is an alias for `catchify.resolve(value)`
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify(promise)
  ```
  
* **catchify.resolve(value)**
  * Equivalent to [Promise.resolve(value)][1]
  * `catchify.resolve(value)` is an alias for `catchify(value)`
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify.resolve('Quickly test the success path')
  ```
  
* **catchify.race(iterable)**
  * Equivalent to [Promise.race(iterable)][2]
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify.race([promise1, promise2])
  ```
  
* **catchify.all(iterable||object)**
  * Similar to [Promise.all(iterable)][3] with the following difference:
    * If there is an error, values will be an empty array so it is safe to use array destructuring
    * The input parameter may also be an object, in which case values will also be an object
  * Returns: \[error, values]
  
  ```
  const [error, [value1, value2]] 
    = await catchify.all([promise1, promise2])
  ```
  
* **catchify.reject(reason)**
  * Equivalent to [Promise.reject(reason)][4]
  * Returns: \[error]
  
  ```
  const [error, value] 
    = await catchify.reject('Quickly test the error path')
  ```
  
* **catchify.some(iterable||object)**
  * Like `catchify.all(iterable)` but an error does not prevent resolution of the rest
  * Within errors, an error will be null if there was no error
  * Within values, the value will be null if there was an error
  * Returns: \[errors, values]
  
  ```
  const [[error1, error2], [value1, value2]] 
    = catchify.some([promise1, promise2])
  ```
  
* **catchify.limit(iterable||object, limit=2, exitOnError=false)**
  * Like `catchify.some(iterable)` but it allows limiting concurrent asynchronous tasks
  * Promises have no way to delay start, so any function in iterable||object will be called on its turn
  * Values returned from called functions can be a Promise, which would provide the actual limiting 
    functionality, or any other value for convenience, as it will be passed to `Promise.resolve()`
    before proceeding
  * If exitOnError=true, each subset is still executed like `catchify.some(iterable)` but execution
    will halt if there is an error
  * Returns: \[errors, values]
  
  ```
  // The promises from fn1 and fn2 execute concurrently
  // fn3 is called after promises from fn1 and fn2 resolve
  const [
    [error1, error2, error3], 
    [value1, value2, value3]
  ] = catchify.limit([fn1, fn2, fn3])
  ```

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Default_values
[6]: https://github.com/majgis/catchify/blob/master/CHANGELOG.md
