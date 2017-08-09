const catchify = require('./index');

async function testCatchify(p) {
  const [err, value] = await catchify(p);
  console.log(`err: ${err}, value: ${value}\n`);
}

testCatchify(new Promise((resolve) => {
  resolve(1);
}));

testCatchify(new Promise((resolve, reject) => {
  reject('no bueno');
}));


async function testResolve(p) {
  const [err, value] = await catchify.resolve(p);
  console.log(`err: ${err}, value: ${value}\n`);
}

testResolve(new Promise((resolve) => {
  resolve(1);
}));

testResolve(new Promise((resolve, reject) => {
  reject('no bueno');
}));


async function testRace(p) {
  const [err, value] = await catchify.race(p);
  console.log(`err: ${err}, value: ${value}\n`);
}

testRace([new Promise((resolve) => {
  resolve(1);
})]);

testRace([new Promise((resolve, reject) => {
  reject('no bueno');
})]);

setTimeout(()=>{}, 500);

