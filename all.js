'use strict';

const arrayToObj = require('./lib/arrayToObj');
const objToArray = require('./lib/objToArray');

function onThenAllFactory (keys) {
  return function onThenAll (value) {
    return [null, arrayToObj(keys, value)];
  };
}

function onCatchAllFactory (keys) {
  return function onCatchAll (error) {
    return [error, keys ? {} : []];
  };
}

function all (iterable) {
  const [keys, values] = objToArray(iterable);
  return Promise
    .all(values)
    .then(onThenAllFactory(keys), onCatchAllFactory(keys));
}

module.exports = all;
