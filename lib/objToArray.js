'use strict';

function nullItemsToNull (item) {
  return item;
}

function valueFromKeyFactory (obj) {
  return function valueFromKey (key) {
    return obj[key];
  };
}

function objToArray (obj) {
  if (obj !== null && obj !== undefined && typeof obj[Symbol.iterator] === 'function') return [null, obj];
  const keys = Object.keys(obj);
  return [
    keys.filter(nullItemsToNull).length > 0 ? keys : null,
    keys.map(valueFromKeyFactory(obj))
  ];
}

module.exports = objToArray;
