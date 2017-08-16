'use strict';

const subject = require('./objToArray');
const test = require('ava');

test('objToArray - iterable is returned', t => {
  const expected = [];
  const [keys, actual] = subject(expected);
  t.is(keys, null);
  t.deepEqual(actual, expected);
});

test('objToArray - obj is split into keys and values', t => {
  const obj = {a: 1, b: 2, c: 3, d: 4};
  const [keys, values] = subject(obj);
  t.deepEqual(keys, Object.keys(obj));
  t.deepEqual(values, Object.values(obj));
});
