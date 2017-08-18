'use strict';

const subject = require('./some');
const test = require('ava');

test('catchify.some - resolve and reject', async t => {
  const [[error1, error2], [value1, value2]] = await subject([
    Promise.resolve(1),
    Promise.reject(new Error('2'))
  ]);

  t.is(error1, null);
  t.is(error2.message, '2');
  t.is(value1, 1);
  t.is(value2, null);
});

test('catchify.some - resolve and resolve', async t => {
  const [errors, values] = await subject([
    Promise.resolve(1),
    Promise.resolve(2)
  ]);

  t.deepEqual(errors, [null, null]);
  t.deepEqual(values, [1, 2]);
});

test('catchify.some - three promises one rejects', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 15)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('3')), 5))
  ]);

  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.some - object with three resolved values', async t => {
  const [errors, values] = await subject({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3)
  });

  t.deepEqual(errors, {a: null, b: null, c: null});
  t.deepEqual(values, {a: 1, b: 2, c: 3});
});

test('catchify.some - object with two resolved and one rejected', async t => {
  const [errors, values] = await subject({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2')),
    c: Promise.resolve(3)
  });

  t.deepEqual(errors, {a: null, b: new Error('2'), c: null});
  t.deepEqual(values, {a: 1, b: null, c: 3});
});
