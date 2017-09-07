'use strict';

const subject = require('./newPromiseHandle');
const test = require('ava');

test('Handle has expected keys', t => {
  const handle = subject();
  t.truthy(handle.promise);
  t.truthy(handle.resolve);
  t.truthy(handle.reject);
});

test('Promise resolves as expected', async t => {
  const handle = subject();
  const expected = 'resolve';
  handle.resolve(expected);
  const actual = await handle.promise;
  t.is(actual, expected);
});

test('Promise rejects as expected', async t => {
  const handle = subject();
  const expected = 'reject';
  handle.reject(expected);
  try {
    await handle.promise;
  } catch (actual) {
    t.is(actual, expected);
  }
});

test('Reject returns rejected promise', async t => {
  const handle = subject();
  const expected = 'reject';
  try {
    await handle.reject(expected);
  } catch (actual) {
    t.is(actual, expected);
  }
});

test('Resolve returns resolved promise', async t => {
  const handle = subject();
  const expected = 'resolve';
  const actual = await handle.resolve(expected);
  t.is(actual, expected);
});
