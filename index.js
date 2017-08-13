'use strict';

function onThen(value) {
  return [null, value];
}

function onCatch(error) {
  return [error, null];
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

  return Promise
    .all(iterable)
    .then(onThen, onCatch);
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

function onValueOrError(value) {
  return Promise
    .resolve(value)
    .then(onValue)
    .catch(onError);
}

function extractValue(result) {
  return result.value || null;
}

function extractError(result) {
  return result.error || null;
}

function onThenWithErrors(results) {
  return [
    results.map(extractError),
    results.map(extractValue)
  ];
}

catchify.some = function catchifySome(iterable) {
  return Promise
    .all(iterable.map(onValueOrError))
    .then(onThenWithErrors);
};

catchify.limit = async function catchifyLimit(iterable, limit = 2) {
  const allErrors = [];
  const allValues = [];
  const queue = [];
  for (let value of iterable) {
    queue.push(typeof value === 'function' ? value() : value);
    if (queue.length === limit) {
      const [errors, values] = await catchify.some(queue);
      allErrors.push(...errors);
      allValues.push(...values);
      queue.length = 0;
    }
  }
  if (queue.length > 0) {
    const [errors, values] = await catchify.some(queue);
    allErrors.push(...errors);
    allValues.push(...values);
  }
  return [allErrors, allValues];
};

module.exports = catchify;
