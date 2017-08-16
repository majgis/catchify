'use strict';
const subject = require('./arrayToObj');
const test = require('ava');

test('arrayToObj - object created from keys and values', t=>{
  const actual = subject(['a', 'b'], [1,2]);
  const expected = {a:1, b:2};
  t.deepEqual(actual, expected);
});