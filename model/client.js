'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(sokcet) { // module.exports to import it somewhere else
  this.socket = socket;
  this.nickname = `user_${Math.random()}`;
  this.id = uuid.v4();
};
