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

function onValueOrError(promise) {
  return promise
    .then(onValue)
    .catch(onError);
}

function extractValue (result) {
  return result.value || null;
}

function extractError (result) {
  return result.error || null;
}

function onThenWithErrors (results) {
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

module.exports = catchify;
