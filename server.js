'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];

ee.on('default', function(client, string){
  client.socket.write('not a command\n');
});

ee.on('@dm', function(client, string){
  let message = string.split(' ').slice(1).join(' ').trim();
  let callByName = string.split(' ').shift().trim();
  pool.forEach(c => {
    console.log('nickname:', c.nickname);
    console.log('id:', c.id);
    if(c.nickname === callByName || c.id === callByName){
      c.socket.write(`${client.nickname} says: ${message}`);
    }
  });
});

ee.on('@all', function(client, string){
  pool.forEach(c => {
    c.socket.write(`${client.nickname}: ${string}`);
  });
  client.socket.write(`did you really need to put that on blast, ${client.nickname}?\n`);
});

ee.on('@nickname', function(client, string){
  let nickname = string.split(' ').shift().trim();
  console.log('new nickname:', nickname);
  client.nickname = nickname;
  pool.forEach(c => {
    console.log('nickname: ', c.nickname);
  });
});

ee.on('leftChat', function(client){
  console.log(`pool had ${pool.length} chatters`);
  console.log(client.nickname + ' has left the chat');
  pool.forEach( c => {
    if(c.nickname === client.nickname){
      let index = pool.indexOf(c.nickname);
      pool.splice(index, 1);
      console.log(`pool now has ${pool.length} chatters`);
      return;
    }
  });
});

server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    //this logs the data (part of it) to the server
    console.log(`${client.nickname}, who has user-id:(${client.id}) used the command:`, command);
    if(command.startsWith('@')){
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });

  socket.on('close', function(){
    ee.emit('leftChat', client);
  });

  socket.on('error', function(err){
    console.err(err);
  });

});

server.listen(PORT, function(){
  console.log('server is up on:', PORT);
});
