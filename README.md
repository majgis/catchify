# catchify
An async/await utility to eliminate try/catch in favor of error values.

Inspired by this [article][0].

## Usage

```
const catchify = require('catchify');

async function log(p){
  const [err, value] = await catchify(p);
  console.log(`err: ${err}, value: ${value}`);
}

log(new Promise((resolve, reject) =>{
  resolve(1);
}));

log(new Promise((resolve, reject) =>{
  reject('no bueno');
}));

```

[0]: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/