'use strict';

const subject = require('./reject');
const test = require('ava');

test('catchify.reject - value', async t => {
  const [error, value] = await subject(1);
  t.is(error, 1);
  t.is(value, null);
});
