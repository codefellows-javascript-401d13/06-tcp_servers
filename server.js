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
});


server.on('connection', function(socket) {
  ee.emit('login', socket);
});

server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
