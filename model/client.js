'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(socket) {
  this.id = uuid.v4();
  this.nickName = `user_${Math.random()}`;
  this.socket = socket;
};
