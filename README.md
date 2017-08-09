# catchify
An async/await utility to eliminate try/catch in favor of error values.

Inspired by this [article][0].

## Usage

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

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/