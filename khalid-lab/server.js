'use strict';

const net = require('net');
const EE = require('events');
const ee = new EE();
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const clientsArray = [];

server.on('connection', function(socket){
  var client = new Client(socket);
  client.socket.write('++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
  client.socket.write('+            WELCOME TO KHALIDLAND                     +\n');
  client.socket.write('++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
  clientsArray.push(client);
  console.log('USER CONNECTED!!!');
  // socket.on('error', function(err){
  //   if(err) throw err;
  // });
  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    console.log('command: ', command);
    if(command.startsWith('@')){
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });
});

ee.on('default', function(client, string){
  // console.log('working!');
  client.socket.write('not a comand\n');
});

ee.on('@all', function(client, string){
  // console.log('inside @all');
  clientsArray.forEach( c => c.socket.write(`${client.username}: `+ string));
});

ee.on('@dm', function(client, string){
  let username = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();
  console.log('INSIDE DM');
  console.log('username :',username+'00');
  console.log('message :', message);
  clientsArray.forEach( c => {
    console.log('Users: ', client.username+ '00');
    if (c.username === username){
      console.log('WE MADE IT!!!');
      c.socket.write(`${client.username}: ${message}\n`);
      return;
    }
  });
});

ee.on('@nickname', function(client, string){
  // console.log('Inside the @nickname');
  let newUsername = string.trim();
  // console.log(newUsername);
  client.username = newUsername;
  // console.log('client nickname: ', client);
  client.socket.write(`Username: ${client.username}\n`);
});

server.listen(PORT, function(){
  console.log('Server is up at: ', PORT);
});
