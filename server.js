'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./models/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();
//client pool
const pool = [];

ee.on('@dm', function(client, string){
  let nickname = string.split(' ').shift().trim(3);
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    
    if (c.nickname === nickname) {
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});
ee.on('@newname', function(client, string){
  if(string == '') {
    client.socket.write('Enter a new username\n');
    return; }
  client.nickname = string.split(' ').shift().trim();
  client.socket.write(`Your new username is ${client.nickname}\n`);
});

ee.on('@all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}:` + string);
  });
});



ee.on('default', function(client, string) {
  client.socket.write('not a command\n');
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client); //adds client each time connects
  pool.forEach( c => {
    c.socket.write(`${client.nickname} is in the chatroom now! \n There are 
    ${pool.length} users in the chat room\n`);
  });

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();
    const message = data.toString().split(' ').shift().trim();
    

    socket.on('error', function(err){
   
    });
    socket.on('close', function(){
      pool.forEach(c => {
        let bucket = pool.indexOf(c);
        if(c.id === client.id) {
          pool.splice(bucket, 1);
        }
      });
    });

    if (command.startsWith('@')) {
      
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
    //have customer user based event initiate
      return; 
    }
    
    socket.destroy(error);

    ee.emit('default', client, data.toString());
  });    
});

server.listen(PORT, function() {
  console.log('server is up cuh:', PORT);
});

