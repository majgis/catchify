'use strict';

const onCatch = require('./lib/onCatch');
const onThen = require('./lib/onThen');

function race (iterable) {
  return Promise
    .race(iterable)
    .then(onThen, onCatch);
}

module.exports = race;
