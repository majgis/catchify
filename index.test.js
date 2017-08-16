const catchify = require('./index');
const test = require('ava');

/// ///////
// catchify
test('catchify - promise with success', async t => {
  const [error, value] = await catchify(Promise.resolve(1));
  t.is(error, null);
  t.is(value, 1);
});

test('catchify - promise with error', async t => {
  const [error, value] = await catchify(Promise.reject(new Error('3')));
  t.is(error.message, '3');
  t.is(value, null);
});

test('catchify - value', async t => {
  const [error, value] = await catchify(1);
  t.is(error, null);
  t.is(value, 1);
});

/// ///////////////
// catchify.resolve
test('catchify.resolve - promise with success', async t => {
  const [error, value] = await catchify.resolve(Promise.resolve(1));
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.resolve - promise with error', async t => {
  const [error, value] = await catchify.resolve(Promise.reject(new Error('1')));
  t.is(error.message, '1');
  t.is(value, null);
});

test('catchify.resolve - value', async t => {
  const [error, value] = await catchify.resolve(1);
  t.is(error, null);
  t.is(value, 1);
});

/// ////////////
// catchify.race
test('catchify.race - two values', async t => {
  const [error, value] = await catchify.race([1, 2]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two resolved promises', async t => {
  const [error, value] = await catchify.race([Promise.resolve(1), Promise.resolve(2)]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two promises, one rejected and one resolved', async t => {
  const [error, value] = await catchify.race([
    Promise.reject(new Error('1')),
    Promise.resolve(2)
  ]);
  t.is(error.message, '1');
  t.is(value, null);
});

test('catchify.race - two promises, both resolve, fastest wins', async t => {
  const [error, value] = await catchify.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 100))
  ]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two promises, reject finishes first', async t => {
  const [error, value] = await catchify.race([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 100))
  ]);
  t.deepEqual(error, new Error('1'));
  t.is(value, null);
});

test('catchify.race - two promises, resolve finishes first', async t => {
  const [error, value] = await catchify.race([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 100)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 10))
  ]);
  t.is(error, null);
  t.is(value, 2);
});

/// ///////////
// catchify.all
test('catchify.all - two values resolved', async t => {
  const [error, [value1, value2]] = await catchify.all([1, 2]);
  t.is(error, null);
  t.is(value1, 1);
  t.is(value2, 2);
});

test('catchify.all - one of three promises rejected', async t => {
  const [error, [value1, value2, value3]] = await catchify.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(new Error('3'))
  ]);
  t.is(error.message, '3');
  t.is(value1, undefined);
  t.is(value2, undefined);
  t.is(value3, undefined);
});

test('catchify.all - object with values', async t => {
  const [error, {a, b}] = await catchify.all({a: 1, b: 2});
  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises that both resolve', async t => {
  const [error, {a, b}] = await catchify.all({
    a: Promise.resolve(1),
    b: Promise.resolve(2)
  });
  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises and one rejects', async t => {
  const [error, values] = await catchify.all({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2'))
  });
  t.is(error.message, '2');
  t.deepEqual(values, {});
});

/// //////////////
// catchify.reject
test('catchify.reject - value', async t => {
  const [error, value] = await catchify.reject(1);
  t.is(error, 1);
  t.is(value, null);
});

/// ////////////
// catchify.some
test('catchify.some - resolve and reject', async t => {
  const [[error1, error2], [value1, value2]] = await catchify.some([
    Promise.resolve(1),
    Promise.reject(new Error('2'))
  ]);

  t.is(error1, null);
  t.is(error2.message, '2');
  t.is(value1, 1);
  t.is(value2, null);
});

test('catchify.some - resolve and resolve', async t => {
  const [errors, values] = await catchify.some([
    Promise.resolve(1),
    Promise.resolve(2)
  ]);

  t.deepEqual(errors, [null, null]);
  t.deepEqual(values, [1, 2]);
});

test('catchify.some - three promises one rejects', async t => {
  const [errors, values] = await catchify.some([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 15)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('3')), 5))
  ]);

  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.some - object with three resolved values', async t => {
  const [errors, values] = await catchify.some({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3)
  });

  t.deepEqual(errors, {a: null, b: null, c: null});
  t.deepEqual(values, {a: 1, b: 2, c: 3});
});

test('catchify.some - object with two resolved and one rejected', async t => {
  const [errors, values] = await catchify.some({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2')),
    c: Promise.resolve(3)
  });

  t.deepEqual(errors, {a: null, b: new Error('2'), c: null});
  t.deepEqual(values, {a: 1, b: null, c: 3});
});

/// /////////////
// catchify.limit
test('catchify.limit - three promises, last one rejects', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('3')), 5))
  ]);
  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.limit - three promises, second one rejects', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [new Error('1'), null, null]);
  t.deepEqual(values, [null, 2, 3]);
});

test('catchify.limit - three promises, first one rejects, limit=1, exitOnError=true', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ], 1, true);
  t.deepEqual(errors, [new Error('1')]);
  t.deepEqual(values, [null]);
});

test('catchify.limit - three promises, second one rejects, limit=1, exitOnError=true', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ], 1, true);
  t.deepEqual(errors, [null, new Error('2')]);
  t.deepEqual(values, [1, null]);
});

test('catchify.limit - object with three resolved values', async t => {
  const [errors, values] = await catchify.limit({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3)
  });
  t.deepEqual(errors, {a: null, b: null, c: null});
  t.deepEqual(values, {a: 1, b: 2, c: 3});
});

test('catchify.limit - object with two resolved values and one rejected value', async t => {
  const [errors, values] = await catchify.limit({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2')),
    c: Promise.resolve(3)
  });
  t.deepEqual(errors, {a: null, b: new Error('2'), c: null});
  t.deepEqual(values, {a: 1, b: null, c: 3});
});
