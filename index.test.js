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
  const [err, value1, value2] = await catchify.all(iterable);
  console.log(`err: ${err}, value1: ${value1}, value2: ${value2}`);
}

testAll([new Promise((resolve) => {
  resolve(1);
}),2]);

testAll([new Promise((resolve, reject) => {
  reject(true);
}),2]);


setTimeout(()=>{}, 500);

