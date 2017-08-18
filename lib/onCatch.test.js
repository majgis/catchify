'use strict';

const subject = require('./onCatch');
const test = require('ava');

test('onCatch - error returned in array', t => {
  const [error, value] = subject(1);
  t.is(error, 1);
  t.is(value, null);
});
