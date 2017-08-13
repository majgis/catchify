'use strict';

function onThen(v) {
  return [null, v];
}

function onCatch(err) {
  return [err];
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
