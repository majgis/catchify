'use strict';

/**
 * Create a new promise handle with these fields:
 *
 *   promise: new Promise,
 *   reject: wrapped reject function that returns promise,
 *   resolve: wrapped resolve function that returns promise
 *
 * @returns {{}}
 */
function newPromiseHandle () {
  const handle = {};
  handle.promise = new Promise((resolve, reject) => {
    handle.resolve = value => {
      resolve(value);
      return handle.promise;
    };
    handle.reject = value => {
      reject(value);
      return handle.promise;
    };
  });
  return handle;
}

module.exports = newPromiseHandle;
