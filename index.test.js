const catchify = require('./index');

async function testCatchify(p) {
  const [err, value] = await catchify(p);
  console.log(`err: ${err}, value: ${value}`);
}

testCatchify(new Promise((resolve) => {
  resolve(1);
}));

testCatchify(new Promise((resolve, reject) => {
  reject(true);
}));


async function testResolve(p) {
  const [err, value] = await catchify.resolve(p);
  console.log(`err: ${err}, value: ${value}`);
}

testResolve(new Promise((resolve) => {
  resolve(1);
}));

testResolve(new Promise((resolve, reject) => {
  reject(true);
}));


async function testRace(iterable) {
  const [err, value] = await catchify.race(iterable);
  console.log(`err: ${err}, value: ${value}`);
}

testRace([new Promise((resolve) => {
  resolve(1);
})]);

testRace([new Promise((resolve, reject) => {
  reject(true);
})]);


async function testAll(iterable) {
  const [error, values] = await catchify.all(iterable);
  console.log(`err: ${error}, values: ${JSON.stringify(values)}`);
}

testAll([new Promise((resolve) => {
  resolve(1);
}), 2]);

testAll([new Promise((resolve, reject) => {
  reject(true);
}), 2]);


async function testReject(reason) {
  const [err] = await catchify.reject(reason);
  console.log(`err: ${err}`);
}

testReject('test');

setTimeout(() => {
}, 500);
