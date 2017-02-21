'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer(); //events: [close connection error listening]

const ee = new EE;

const pool = [];

ee.on('@all', function(client, string){
  pool.forEach( c =>{
    c.socket.write(`${client.nickname}: ` + string);
  });
});
ee.on('@nickname', function(client, string){
  if(string == '') {
    client.socket.write('Enter a new nickname after the command to change \n');
    return; }
  client.nickname = string.split(' ').shift().trim();
  client.socket.write(`Your new nickname is ${client.nickname}\n`);
});
ee.on('@dm', function(client, string){
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();
  let foundName = false;

  pool.forEach ( c => {
    if(c.nickname == nickname){
      c.socket.write(`${client.nickname}: ${message}\n`);
      foundName = true;
    }
  });
  if(!foundName) client.socket.write('that user is not present on the server\n');
});
ee.on('@close', function(client){
  client.socket.end('Thanks for chatting, goodbye!\n');
});
ee.on('@error', function(client){
  client.socket.destroy('EHRMAGERD ERREHR');
});
ee.on('default', function(client){
  client.socket.write('not a command\n');
});


server.on('connection', socket => {
  var client = new Client(socket);
  pool.push(client);
  pool.forEach( c =>{
    c.socket.write(`${client.nickname} has joined the server\n There are ${pool.length} users online\n`);
  });

  socket.on('data', data =>{
    var command = data.toString().split(' ').shift().trim();
    console.log('command:',command);

    if(command.startsWith('@')){
      //have custom user based event fire
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }


    ee.emit('default', client, data.toString());
  });
  socket.on('close', function(){
    pool.forEach( (c, index) => {
      if(c.nickname == client.nickname){
        pool.splice(index,1);
      }
    });
    pool.forEach( c =>{
      c.socket.write(`Someone has left the server\n There are ${pool.length} users online\n`);
    });
  });
  socket.on('error', function(data){
    console.log(`There's been an error!: ${data}`);
  });
});


//start the server
server.listen(PORT, function(){
  console.log('server up on port:' , PORT);
});