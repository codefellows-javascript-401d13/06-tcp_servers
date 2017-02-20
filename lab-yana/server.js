'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./models/client.js');
const PORT = process.env.port || 3000;
const server = net.createServer();
const ee = new EE();
const pool = []; //array to store all clients/users

//telnet 172.16.13.51 3000 to connect to server on Yana's computer

ee.on('default', function(client, string) {
  client.socket.write('Not a valid command. Try again!\n');
});

ee.on('@all', function(client, string) {
  pool.forEach (c => { c.socket.write(`${client.nickname}: ${string}`) });
});

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();
  let i = pool.indexOf(nickname);
  if (i !== -1) pool[i].socket.write(`${client.nickname}: ${message}`); //when you find the right client, log the name of the user sending the message and the message
  if (i === -1) client.socket.write(`user does not exist\n`);
})


function parseInput(data, client) {
  const command = data.toString().split(' ').shift().trim();
  console.log('command:', command);
  if (command.startsWith('@')) {
    ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
    return;
  }
  ee.emit('default', client, data.ToString());
}

server.on('connection', function(socket) {
  var client = new Client(socket); //instantiate new client object
  pool.push(client);  //push client into pool;
  socket.on('data', function(data) {
    parseInput(data, client);
  });
});

server.listen(PORT, function() {
  console.log(`server up: ${PORT}`);
});
