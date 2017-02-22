'use strict';

const uuid = require('node-uuid');

module.exports = function Client(socket) {
  this.socket = socket;
  this.id = uuid.v4();
  this.nickname = `user-${this.id.slice(0,4)}`;
  this.lastNickname = '';
};
