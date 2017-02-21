'use strict';

const uuid = require('node-uuid');

const Client = module.exports = function(socket){
  this.socket = socket;
  this.username = `user_4${Math.random()}`;
  this.id = uuid.v4();
};
