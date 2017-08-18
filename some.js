'use strict';

const arrayToObj = require('./lib/arrayToObj');
const objToArray = require('./lib/objToArray');

function onValue (value) {
  return {
    error: null,
    value: value
  };
}

function onError (error) {
  return {
    error: error,
    value: null
  };
}

function extractValue (result) {
  return result.value || null;
}

function extractError (result) {
  return result.error || null;
}

function onThenWithErrorsFactory (keys) {
  return function onThenWithErrors (results) {
    return [
      arrayToObj(keys, results.map(extractError)),
      arrayToObj(keys, results.map(extractValue))
    ];
  };
}

function some (iterable) {
  const [keys, items] = objToArray(iterable);
  const promises = [];
  for (let value of items) {
    promises.push(Promise
      .resolve(value)
      .then(onValue, onError)
    );
  }
  return Promise
    .all(promises)
    .then(onThenWithErrorsFactory(keys));
}

module.exports = some;
