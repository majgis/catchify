'use strict';

const arrayToObj = require('./lib/arrayToObj');
const objToArray = require('./lib/objToArray');
const some = require('./some');

async function limit (iterable, limit = 2, exitOnError = false) {
  const [keys, items] = objToArray(iterable);
  const allErrors = [];
  const allValues = [];
  const queue = [];
  for (let value of items) {
    queue.push(typeof value === 'function' ? value() : value);
    if (queue.length === limit) {
      const [errors, values] = await some(queue);
      allErrors.push(...errors);
      allValues.push(...values);
      queue.length = 0;
      if (exitOnError && errors.filter((err) => err).length > 0) {
        break;
      }
    }
  }
  if (queue.length > 0) {
    const [errors, values] = await some(queue);
    allErrors.push(...errors);
    allValues.push(...values);
  }
  return [
    arrayToObj(keys, allErrors),
    arrayToObj(keys, allValues)
  ];
}

module.exports = limit;
