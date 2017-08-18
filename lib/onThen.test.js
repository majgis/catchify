'use strict';

const subject = require('./onThen');
const test = require('ava');

test('onThen - return array with value', t => {
  const [error, value] = subject(1);
  t.is(error, null);
  t.is(value, 1);
});
