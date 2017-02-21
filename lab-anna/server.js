'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach(c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}` + '\n');
    }
  });
});

ee.on('@all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}:` + string + '\n');
  });
});

ee.on('@nickname', function(client, string) {
  let oldNickname = client.nickname;
  client.nickname = string.split(' ').shift().trim();
  pool.forEach( c => {
    c.socket.write(oldNickname + ' is now ' + client.nickname + '\n');
  });
});

ee.on('default', function(client, string) {
  client.socket.write('not a command\n');
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    };

    ee.emit('default', client, data.toString());
  });

  socket.on('close', function() {
    pool.splice(pool.indexOf(client), 1);
    console.log('client removed! left in pool:', pool.length);
  });

  socket.on('error', function(error) {
    console.log('socket error:', error.message);
  });

});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
