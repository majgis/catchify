'use strict';

function onThen(v) {
  return [null, v];
}

function onCatch(err) {
  return [err]
}

function catchify(p) {
  return Promise
    .resolve(p)
    .then(onThen)
    .catch(onCatch);
}

catchify.resolve = catchify;

module.exports = catchify;
