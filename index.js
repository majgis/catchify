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

catchify.reject = function catchifyReject(reason){
  return Promise
    .reject(reason)
    .catch(onCatch)
};

module.exports = catchify;
