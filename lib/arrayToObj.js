'use strict';

function arrayToObj (keys, values) {
  if (!keys) return values;
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

module.exports = arrayToObj;
