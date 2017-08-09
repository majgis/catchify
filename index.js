'use strict';

function catchify (p){
  return p
    .then(v=>[null,v])
    .catch(e=>[e]);
}

module.exports = catchify;
