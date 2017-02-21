'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(socket){ //eslint-disable-line
  this.socket = socket;
  this.nickname = `user_${Math.random()}`;
  this.userId = uuid.v4();
};
