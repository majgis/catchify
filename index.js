'use strict';

const arrayToObj = require('./lib/arrayToObj');
const objToArray = require('./lib/objToArray');

function onThenAllFactory(keys){
  return function onThenAll(value){
    return [null, arrayToObj(keys,value)]
  }
}

function onThen(value) {
  return [null, value];
}

function onCatch(error) {
  return [error, null];
}

function onCatchAllFactory(keys) {
  return function onCatchAll(error) {
    return [error, keys ? {} : []];
  }
}

function catchify(p) {
  return Promise
    .resolve(p)
    .then(onThen, onCatch);
}

catchify.resolve = catchify;

catchify.race = function catchifyRace(iterable) {
  return Promise
    .race(iterable)
    .then(onThen, onCatch);
};

catchify.all = function catchifyAll(iterable) {
  const [keys, values] = objToArray(iterable);
  return Promise
    .all(values)
    .then(onThenAllFactory(keys), onCatchAllFactory(keys));
};

catchify.reject = function catchifyReject(reason) {
  return Promise
    .reject(reason)
    .catch(onCatch)
};

function onValue(value) {
  return {
    error: null,
    value: value
  };
}

function onError(error) {
  return {
    error: error,
    value: null
  };
}

function extractValue(result) {
  return result.value || null;
}

function extractError(result) {
  return result.error || null;
}

function onThenWithErrorsFactory(keys) {
  return function onThenWithErrors(results) {
    return [
      arrayToObj(keys, results.map(extractError)),
      arrayToObj(keys, results.map(extractValue))
    ];
  }
}

catchify.some = function catchifySome(iterable) {
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
};

catchify.limit = async function catchifyLimit(iterable, limit = 2, exitOnError = false) {
  const [keys, items] = objToArray(iterable);
  const allErrors = [];
  const allValues = [];
  const queue = [];
  for (let value of items) {
    queue.push(typeof value === 'function' ? value() : value);
    if (queue.length === limit) {
      const [errors, values] = await catchify.some(queue);
      allErrors.push(...errors);
      allValues.push(...values);
      queue.length = 0;
      if (exitOnError && errors.filter((err) => err).length > 0) {
        break;
      }
    }
  }
  if (queue.length > 0) {
    const [errors, values] = await catchify.some(queue);
    allErrors.push(...errors);
    allValues.push(...values);
  }
  return [
    arrayToObj(keys, allErrors),
    arrayToObj(keys, allValues)
  ];
};

module.exports = catchify;
