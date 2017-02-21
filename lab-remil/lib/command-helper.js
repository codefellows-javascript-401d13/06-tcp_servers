'use strict';

module.exports = exports = {};

exports.help = function(client) {
  let message =
  `Current commands
  @all: send message to all users
  @dm [user]: sends private message to [user]
  @nickname: change your nickname\n`;

  client.socket.write(message);
};

exports.default = function(client) {
  client.socket.write('Sorry yo, that\'s not a command, enter #help for all the valid commands\n');
};

exports.msgAll = function(client, string, pool) {
  pool.forEach(c => c.socket.write(`${client.nickname}: ${string}`));
};

exports.msgDirect = function(client, string, pool) {
  let userDirect = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ');
  let poolNicknames = pool.map(c => c.nickname);

  if (poolNicknames.includes(userDirect)) {
    pool[poolNicknames.indexOf(userDirect)].socket.write(`${client.nickname}: ${message}`);
  }
};

exports.changeNickname = function(client, string, pool) {
  let newNickname = string.split(' ').shift().trim();
  client.lastNickname = client.nickname;
  client.nickname = newNickname;
  let message = `${client.lastNickname} has changed to ${client.nickname}\n`;
  exports.msgAll(client, message, pool);
};

exports.badCommand = function(client, command) {
  client.socket.write(`Sorry, ${command} is not a valid command\n`);
};
