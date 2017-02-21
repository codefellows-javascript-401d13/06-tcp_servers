'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(socket) {
  this.socket = socket;
  this.nickname = `user_${Math.ceil(Math.random()*10000)}`;
  this.id = uuid.v4();
};

console.log(Client);
