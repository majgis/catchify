const catchify = require('./index');

async function testCatchify(p) {
  const [err, value] = await catchify(p);
  console.log(`catchify - err: ${err}, value: ${value}`);
}

testCatchify(Promise.resolve(1));
testCatchify(Promise.reject(true));


async function testResolve(p) {
  const [err, value] = await catchify.resolve(p);
  console.log(`resolve - err: ${err}, value: ${value}`);
}

testResolve(Promise.resolve(1));
testResolve(Promise.reject(true));


async function testRace(iterable) {
  const [err, value] = await catchify.race(iterable);
  console.log(`race - err: ${err}, value: ${value}`);
}

testRace([Promise.resolve(1)]);
testRace([Promise.reject(true)]);


async function testAll(iterable) {
  const [error, values] = await catchify.all(iterable);
  console.log(`all - err: ${error}, values: ${JSON.stringify(values)}`);
}

testAll([Promise.resolve(1), 2]);
testAll([Promise.reject(true), 2]);


async function testReject(reason) {
  const [err] = await catchify.reject(reason);
  console.log(`reject - err: ${err}`);
}

testReject('test');

async function testSome (iterable){
  const [errors, values] = await catchify.some(iterable);
  console.log(`some - err: ${JSON.stringify(errors)}, values: ${JSON.stringify(values)}`)
}

testSome([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(true)
]);

setTimeout(() => {
}, 500);
