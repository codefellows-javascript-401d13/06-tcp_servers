'use strict';

const net = require('net');
const EE = require('events');
const ee = new EE();
const Client = require('./model/client.js');
const PORT = process.env.port || 3000;
const server = net.createServer();

const pool = [];

//::::: EVENTS :::::/

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach(c => {
    console.log('client:', c.nickname);
    console.log('nickname:', nickname);

    if(c.nickname === nickname) {
      //trouleshoot
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});

ee.on('@nickname', function(client, string) {
  let nickname = string;
  client.nickname = nickname;
});


ee.on('@all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('default', function(client, string) {
  //if char is a space diff err message
  client.socket.write(' is not a valid command\n\r');
  //may not need \r
});
//:::::       ::::://

server.on('connection', function(socket) {
  // where is socket getting filled with?
  // where is something being passed into
  // watch vid where this is writen
  var client = new Client(socket);
  pool.push(client);
  console.log(client.nickname);
  console.log(client.id);

  socket.on('data', function(data) {
    // on data?
    // socket docs?
    const command = data.toString().split(' ').shift().trim();
    console.log('command:', command);
    if (command.startsWith('@')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });

  socket.on('error', err => {
    throw err;
  });

  socket.on('close', function() {
    let person = pool.indexOf(client.uuidv4);
    if (pool > -1) {
      pool.splice(person, 1);
    }
  });

});

server.listen(PORT, function() {
  console.log('server up:', PORT);
});
