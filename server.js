'use strict';

const net = require('net');
const server = net.createServer();
const PORT = process.env.PORT || 3000;
const Client = require(`${__dirname}/model/client.js`);
const EE = require('events');
const ee = new EE();

const chatGroup = [];

ee.on('login', function(socket) {
  const client = new Client(socket);
  chatGroup.push(client);
  ee.emit('message', socket, client);
});

ee.on('message', function(socket, client) {
  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();
    const userTarget = data.toString().split(' ').slice(1).shift().trim();
    const msg = data.toString().split(' ').slice(1).join(' ');
    const directMsg = data.toString().split(' ').slice(2).join(' ');

    if(command.includes('@all')) {
      ee.emit(command, client, msg);
      return;
    }

    if(command.includes('@nickname')) {
      //create event and emitter for changing nickname
      return;
    }

    if(command.includes('@dm')) {
      //create event and emitter for messaging just one user
      return;
    }

    if(command.includes('@not')) {
      //create event and emitter for messaging all but a specific user
      return;
    }

    ee.emit('default', client, data.toString());
  });
});

ee.on('@all', function(client, message) {
  chatGroup.forEach(ele => {
    ele.socket.write(`${client.nickname} ${message}`);
  });
});


ee.on('default', function(client, message) {
  console.log('client:', client);
  console.log('message', message);
  client.socket.write(`${message} not sent. No command given.\n`);
});

server.on('connection', function(socket) {
  ee.emit('login', socket);
});

server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
