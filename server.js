'use strict';

const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const Client = require(`${__dirname}/model/client.js`);
const EE = require('events');
const ee = new EE();

const pool = [];

var userCount = 0;

//192.168.0.5.

server.listen(PORT, function() {
  console.log('Port running on:', PORT);
});

function setGuestName(client) {
  client.nickName = 'New_User ' + (userCount + 1);
  userCount++;
}

server.on('connection', function(socket) {
  var client = new Client(socket);
  setGuestName(client);
  pool.push(client);
  console.log('User:', client.nickName, 'has joined the chat server!');
  console.log('Users in Room:', pool.length);
  console.log('Type: "-help", for help!');

  socket.on('close', function() {
    pool.forEach(function(c, idx) {
      if(client.id === c.id) {
        console.log(client.nickName, 'has left the chatroom.');
        pool.splice(idx, 1);
        return;
      }
    });
  });

  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    console.log(client.nickName + ': ' + data);

    if(command.startsWith('*')) {
      ee.emit('*', client, data);
      return;
    }
    if(command.startsWith('-help')) {
      ee.emit('-help', client, data);
      return;
    }
    if(command.startsWith('@all')) {
      ee.emit('@all', client, data);
      return;
    }
    if(command.startsWith('@dm')) {
      ee.emit('@dm', client, data);
      return;
    }
    ee.emit('default', client, data);
  });
});

ee.on('*', function(client, data) {
  let nickname = data.toString().split('').slice(1).join('').trim();
  console.log(nickname);
  client.nickName = nickname;
});

ee.on('@dm', function(client, data) {
  let recipient = data.toString().split(' ').slice(1, 2).join(' ').trim();
  console.log('intended recipient:', recipient);
  let message = data.toString().split(' ').slice(1).join(' ').trim();
  pool.forEach(function(c) {
    if (recipient === c.nickName) {
      c.socket.write(client.nickName + message + '\n');
    }
  });
});

ee.on('@all', function(client, data) {
  let message = data.toString().split(' ').slice(1).join(' ').trim();
  pool.forEach(function(c) {
    c.socket.write(client.nickName + message + '\n');
  });
});

ee.on('-help', function() {
  console.log('Here are the commands you may use:',
  '*[yourName] <--- use as such to change your Public displying name ||',
  '@dm [user] <--- use as such to message one user directly ||',
  '@all <--- Will write a message to all users'
  );
});

ee.on('default', function(client) {
  client.socket.write('not a command\n');
});
