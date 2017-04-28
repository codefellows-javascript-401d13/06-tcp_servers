'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.port || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => { // c is representing client
    console.log('client:', c.nickname);
    console.log('nickname:', nickname);

    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@all', function(client, string) {
  pool.forEach(c => {
    c.socket.write(`${client.nickname}:` + string);
  });
});

ee.on('default', function(client) {
  client.socket.write('Ayoooo join the party and say a lil something!');
});

ee.on('@nickname', function(client, message){
  client.nickname = message[0];
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('@')) {
      ee.emit (command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
  });

  socket.on('close', function(){
    console.log(`${client.nickname}: has bounced`);
    pool.forEach((c,index) => {
      if(c.nickname === client.nickname){
        pool.splice(index, 1);
      }
    });
    return;
  });

  socket.on('error', function(error){
    throw error;
  });

  ee.emit('default', client);
});

server.listen(PORT, function() {
  console.log('ayooooo the party\'s over here!', PORT);
});
