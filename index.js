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
    .then(onThen)
    .catch(onCatch);
}

catchify.resolve = catchify;

catchify.race = function catchifyRace(iterable){
  return Promise
    .race(iterable)
    .then(onThen)
    .catch(onCatch);
};

module.exports = catchify;
