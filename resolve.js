'use strict';

const onCatch = require('./lib/onCatch');
const onThen = require('./lib/onThen');

function resolve (p) {
  return Promise
    .resolve(p)
    .then(onThen, onCatch);
}

module.exports = resolve;
