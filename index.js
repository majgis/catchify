'use strict';

function onThen (v){
  return [null, v];
}

function onCatch (err){
  return [err]
}

function catchify (p){
  return p
    .then(onThen)
    .catch(onCatch);
}

module.exports = catchify;
