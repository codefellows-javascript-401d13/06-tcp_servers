'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./models/client.js');
const PORT = process.env.port || 3000;
const server = net.createServer();
const ee = new EE();
const pool = []; //array to store all clients/users

//telnet 172.16.13.51 3000 to connect to server on Yana's computer

ee.on('default', function(client) {
  client.socket.write('Not a valid command. Try again!\n');
});

ee.on('@all', function(client, string) {
  pool.forEach (c => { c.socket.write(`${client.nickname}: ${string}\n`) });
  if (pool.length === 1 && client.socket.destroyed === false) client.socket.write('You\'e by yourself in here! :-(\n');
});

ee.on('@dm', function(client, string) {
  console.log('client id', client.id);
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();
  var inArray = false;
  pool.forEach (c => {
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}\n`);
      inArray = true;
    }
  });
  if (!inArray) client.socket.write(`User does not exist.\n`);
});

ee.on('@quit', function(client, string) {
  client.socket.destroy();
});

ee.on('@nickname', function(client, string) {
  let tempNickname = string.split(' ').shift().trim();
  let inArray = false;
  pool.forEach(c => {
    if (c.nickname === tempNickname) {
      if (c.nickname === client.nickname) {
        c.socket.write(`${client.nickname} is already your nickname, stupid!\n`);
        return;
      }
      client.socket.write('Bummer! That nickname is already taken!\n');
    }
  });
  if (!inArray) client.nickname = tempNickname;
  client.socket.write(`${tempNickname} is your new nickname.`);
});

ee.on('@users', function (client, string) {
  pool.forEach(c => {
    client.socket.write(`${c.nickname}\n`);
  });
});

function parseInput(data, client) {
  const command = data.toString().split(' ').shift().trim();
  console.log(`user input: ${data}`);
  console.log('command:', command);
  if (command === '@all' || command === '@dm' || command === '@nickname' || command === '@quit' || command === '@users') {
    ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
    return;
  }
  ee.emit('default', client);
}

function greeting(client) {
  client.socket.write('Wecome to chat!\n You can use the following commands: \n @all <message> to send a message to everyone \n @dm <username> to send a message to a single person\n @nickname to change your nickname\n @users to list the nicknames of users currently in chat\n @quit to exit the chat\n');
}

server.on('connection', function(socket) {
  var client = new Client(socket); //instantiate new client object
  pool.push(client);  //push client into pool;
  greeting(client);
  socket.on('close', function() {
    pool.forEach(c => {
      let index = pool.indexOf(client);
      console.log(`client ${pool[index].id} disconnected`);
      ee.emit('@all', client, 'has left the chat');
      pool.slice(index, 1);
    });
  });
  socket.on('data', function(data) {
    parseInput(data, client);
  });
  socket.on('error', function(err) {
    console.error(err);
  });
});


server.listen(PORT, function() {
  console.log(`server up: ${PORT}`);
});
