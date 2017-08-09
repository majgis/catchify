const catchify = require('./index');

async function log(p) {
  const [err, value] = await catchify(p);
  console.log('err:', err);
  console.log('value:', value);
}

log(new Promise((resolve, reject) => {
  resolve(1);
}));

log(new Promise((resolve, reject) => {
  reject('no bueno');
}));
