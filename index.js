'use strict';

const catchify = require('./resolve');

catchify.all = require('./all');
catchify.limit = require('./limit');
catchify.race = require('./race');
catchify.reject = require('./reject');
catchify.resolve = catchify;
catchify.some = require('./some');
catchify.newPromiseHandle = require('./newPromiseHandle');

module.exports = catchify;
