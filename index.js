'use strict';

function onThenSpread(iterable) {
  return [null, ...iterable];
}

function onThen(v) {
  return [null, v];
}

function onCatch(err) {
  return [err];
}

function catchify(p) {
  return Promise
    .resolve(p)
    .then(onThen)
    .catch(onCatch);
}

catchify.resolve = catchify;

catchify.race = function catchifyRace(iterable) {
  return Promise
    .race(iterable)
    .then(onThen)
    .catch(onCatch);
};

catchify.all = function catchifyAll(iterable) {
  return Promise
    .all(iterable)
    .then(onThenSpread)
    .catch(onCatch)
};

module.exports = catchify;
