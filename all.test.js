'use strict';

const subject = require('./all');
const test = require('ava');

test('catchify.all - two values resolved', async t => {
  const [error, [value1, value2]] = await subject([1, 2]);
  t.is(error, null);
  t.is(value1, 1);
  t.is(value2, 2);
});

test('catchify.all - one of three promises rejected', async t => {
  const [error, [value1, value2, value3]] = await subject([
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
  const [error, {a, b}] = await subject({a: 1, b: 2});
  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises that both resolve', async t => {
  const [error, {a, b}] = await subject({
    a: Promise.resolve(1),
    b: Promise.resolve(2)
  });
  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises and one rejects', async t => {
  const [error, values] = await subject({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2'))
  });
  t.is(error.message, '2');
  t.deepEqual(values, {});
});
