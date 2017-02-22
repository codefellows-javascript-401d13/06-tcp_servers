'use strict';

const uuid = require('uuid');

const Client = module.exports = function(socket) {
  this.socket = socket;
  this.nickname = `newperson_${Math.floor((Math.random() * 500) + 1)}`;
  this.id = uuid.v4();
};
