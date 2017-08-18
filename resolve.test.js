'use strict';

const subject = require('./resolve');
const test = require('ava');

test('catchify.resolve - promise with success', async t => {
  const [error, value] = await subject(Promise.resolve(1));
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.resolve - promise with error', async t => {
  const [error, value] = await subject(Promise.reject(new Error('1')));
  t.is(error.message, '1');
  t.is(value, null);
});

test('catchify.resolve - value', async t => {
  const [error, value] = await subject(1);
  t.is(error, null);
  t.is(value, 1);
});
