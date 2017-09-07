# catchify
An set of async/await utilities:

- Eliminate try/catch in favor of error values
    - Inspired by this [article][0]
- Create a promise handle to imperatively resolve and reject a promise
    - Useful for returning a single instance of a promise

Also see [array destructuring with default values][5] for handling returned arrays.

[Change Log][6]

## Require

### Require an Object With All Functions

    const catchify = require('catchify');

### Require Functions Individually

    const all = require('catchify/all');

## Examples

### Resolve Promise to \[error, value]

    const catchify = require('catchify');
    
    async function example(promise) {
      const [error, value] = await catchify(promise);
      if (error) console.log(error);
    }

### Array Destructuring with a Default Value

    const catchify = require('catchify');
    
    async function example(promise) {
      const [error, value={message:'Hello'}] 
        = await catchify(promise);
      if (error) console.log(error);
      return value;
    }

### Wait for all promises to resolve, regardless of error

    const some = require('catchify/some');
    
    async function example() {
      const [ [error1, error2], [value1, value2] ] = await some([
        Promise.resolve(1),
        Promise.reject(2)
      ]);
      if (error2) console.error('error2');
      if (value1) console.log('value1');
    }

### Use a promise handle to return a single promise instance

    const catchify = require('catchify');
    
    let pending = null;
    
    async function example() {
      if (pending) return pending;
      
      const handle = catchify.newPromiseHandle();
      pending = handle.promise;
      
      const [error, value] = await catchify.resolve('example');
      pending = null;
      
      if (error) return handle.reject('rejected');
      return handle.resolve('resolved');
    }


## API

### catchify(value)
  * Equivalent to [Promise.resolve(value)][1]
  * `catchify(value)` is an alias for `catchify.resolve(value)`
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify(promise)
  ```
  
### catchify.resolve(value)
  * Equivalent to [Promise.resolve(value)][1]
  * `catchify.resolve(value)` is an alias for `catchify(value)`
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify.resolve('Quickly test the success path')
  ```

### catchify.reject(reason)
  * Equivalent to [Promise.reject(reason)][4]
  * Returns: \[error]
  
  ```
  const [error, value] 
    = await catchify.reject('Quickly test the error path')
  ```

### catchify.race(iterable)
  * Equivalent to [Promise.race(iterable)][2]
  * Returns: \[error, value]
  
  ```
  const [error, value] 
    = await catchify.race([promise1, promise2])
  ```

### catchify.all(iterable||object)
  * Similar to [Promise.all(iterable)][3] with the following differences:
    * Accepts either an object or an iterable
    * If there is an error, values will be an empty array||object so it is safe to use array||object destructuring
  * Returns: \[error, values]
  
  ```
  const [error, [value1, value2]] 
    = await catchify.all([promise1, promise2])

  const [error, {a: value1, b: value2}]
    = await catchify.all({a: promise1, b: promise2})
  ```

### catchify.some(iterable||object)
  * Like `catchify.all(iterable||object)` but an error does not prevent resolution of the rest
  * Within errors, an error will be null if there was no error
  * Within values, the value will be null if there was an error
  * Returns: \[errors, values]
  
  ```
  const [[error1, error2], [value1, value2]] 
    = await catchify.some([promise1, promise2])

  const [{a: error1, b: error2}, {a: value1, b: value2}] 
    = await catchify.some({a: promise1, b: promise2})
  ```
  
### catchify.limit(iterable||object, limit=2, exitOnError=false)
  * Like `catchify.some(iterable||object)` but it allows limiting concurrent asynchronous tasks
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
  ] = await catchify.limit([fn1, fn2, fn3])

  const [
    {a: error1, b: error2, c: error3}, 
    {a: value1, b: value2, c: value3}
  ] = await catchify.limit({a: fn1, b: fn2, c: fn3})
  ```
  
    
### catchify.newPromiseHandle()
  * Like new Promise((resolve, reject)=>{}) except you have a handle to call 
    resolve and reject outside the function
  * The resolve and reject methods will return instances of the promise
  * The promise has NOT been wrapped with a call to catchify.resolve()
  * Returns {promise, resolve, reject}

  ```
  // Access the promise
  let pending;
  const handle = catchify.newPromiseHandle();
  pending = handle.promise;
  
  // Reject the promise
  const handle = catchify.newPromiseHandle();
  handle.reject('rejected');
  
  // Resolve the promise
  const handle = catchify.newPromiseHandle();
  handle.resolve('resolved');

  ```

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Default_values
[6]: https://github.com/majgis/catchify/blob/master/CHANGELOG.md
