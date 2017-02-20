'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(socket) {
  this.socket = socket;
  this.nickname = `user_${Math.ceil(Math.random()*100)}`;
  this.id = uuid.v4();
};
