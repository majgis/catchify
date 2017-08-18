'use strict';

const subject = require('./limit');
const test = require('ava');

test('catchify.limit - three promises, last one rejects', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('3')), 5))
  ]);
  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.limit - three promises, second one rejects', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ]);
  t.deepEqual(errors, [new Error('1'), null, null]);
  t.deepEqual(values, [null, 2, 3]);
});

test('catchify.limit - three promises, first one rejects, limit=1, exitOnError=true', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ], 1, true);
  t.deepEqual(errors, [new Error('1')]);
  t.deepEqual(values, [null]);
});

test('catchify.limit - three promises, second one rejects, limit=1, exitOnError=true', async t => {
  const [errors, values] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 5)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('2')), 5)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 5))
  ], 1, true);
  t.deepEqual(errors, [null, new Error('2')]);
  t.deepEqual(values, [1, null]);
});

test('catchify.limit - object with three resolved values', async t => {
  const [errors, values] = await subject({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3)
  });
  t.deepEqual(errors, {a: null, b: null, c: null});
  t.deepEqual(values, {a: 1, b: 2, c: 3});
});

test('catchify.limit - object with two resolved values and one rejected value', async t => {
  const [errors, values] = await subject({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2')),
    c: Promise.resolve(3)
  });
  t.deepEqual(errors, {a: null, b: new Error('2'), c: null});
  t.deepEqual(values, {a: 1, b: null, c: 3});
});
