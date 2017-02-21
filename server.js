'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./models/client.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const pool = [];



ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join().trim();

  pool.forEach( c => {
    if(c.nickname === nickname){
      c.socket.write(`${client.nickname}: ${message}`);
    }
  });
});


ee.on('@all', function(client, string){
  pool.forEach(c => {
    c.socket.write(`${client.nickname}:` + string);
  });
});


ee.on('default', function(client, string){
  client.socket.write('not a command');
});

server.on('connection', function(socket){
  var client = new Client(socket);
  pool.push(client);

  socket.on('error', (err) =>{
    console.log('there was an error');
  });

  socket.on('data', function(data){
    const command = data.toString().split(' ').shift().trim();
    const message = data.toString().split(' ');
    // console.log('command:', command);

    if (command.startsWith('@')){
      console.log('it worked!');
      ee.emit(command, client, data.toString().split(' ').slice(1).join());
      return;
    }
    ee.emit('default', client, data.toString());
  });



  socket.on('close', function(){
    pool.forEach(c => {
      let index = indexOf(c);
      if(c.id === client.id){
        pool.splice(index, 1);
      }
    });
  });
});

  server.listen(PORT, function(){
    console.log('server is up and running:', PORT);
  });
