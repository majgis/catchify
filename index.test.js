const catchify = require('./index');
const test = require('ava');

test('catchify - promise with success', async t => {
  const [error, value] = await catchify(Promise.resolve(1));
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.resolve - promise with success', async t => {
  const [error, value] = await catchify.resolve(Promise.resolve(1));
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.reject - value', async t => {
  const [error, value] = await catchify.reject(1);
  t.is(error, 1);
  t.is(value, null);
});

test('catchify.race - two values', async t => {
  const [error, value] = await catchify.race([1, 2]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.all - two values resolved', async t => {
  const [error, [value1, value2]] = await catchify.all([1, 2]);
  t.is(error, null);
  t.is(value1, 1);
  t.is(value2, 2);
});

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

test('catchify.limit - three promises, last one rejects', async t => {
  const [errors, values] = await catchify.limit([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('3')), 5))
  ]);
  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.newPromiseHandle returns a promise handle object', t => {
  const handle = catchify.newPromiseHandle();
  t.truthy(handle.promise);
  t.truthy(handle.resolve);
  t.truthy(handle.reject);
});
