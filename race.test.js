'use strict';

const subject = require('./race');
const test = require('ava');

/// ////////////
// catchify.race
test('catchify.race - two values', async t => {
  const [error, value] = await subject([1, 2]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two resolved promises', async t => {
  const [error, value] = await subject([Promise.resolve(1), Promise.resolve(2)]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two promises, one rejected and one resolved', async t => {
  const [error, value] = await subject([
    Promise.reject(new Error('1')),
    Promise.resolve(2)
  ]);
  t.is(error.message, '1');
  t.is(value, null);
});

test('catchify.race - two promises, both resolve, fastest wins', async t => {
  const [error, value] = await subject([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 100))
  ]);
  t.is(error, null);
  t.is(value, 1);
});

test('catchify.race - two promises, reject finishes first', async t => {
  const [error, value] = await subject([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 10)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 100))
  ]);
  t.deepEqual(error, new Error('1'));
  t.is(value, null);
});

test('catchify.race - two promises, resolve finishes first', async t => {
  const [error, value] = await subject([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('1')), 100)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 10))
  ]);
  t.is(error, null);
  t.is(value, 2);
});
