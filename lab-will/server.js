'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
// const PORT = process.env.PORT || 3000;

// Random Port;
const PORT = Math.floor(Math.random() * 9999-1000);

const server = net.createServer();
const ee = new EE();

server.on('connection', function(socket) {
  var client = new Client(socket);

  socket.on('data', function(data) {
    const command = data.toString().split(' '.shift().trim());
    console.log('command:', command);
  });
});

server.listen(PORT, function() {
  console.log('server up:', PORT);
})
