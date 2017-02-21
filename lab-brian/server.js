'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');
const server = net.createServer();
const PORT = process.env.PORT || 3000;
const ee = new EE();

let pool = [];

ee.on('@all', function(client, msgArr){
  pool.forEach(c =>{
    c.socket.write(`${c.nickname}: ${msgArr.join(' ')}`);
  });
});

ee.on('@dm', function(client, msgArr){
  pool.forEach(c => {
    if(msgArr[0] === c.nickname) {
      msgArr = msgArr.splice(1);
      console.log(msgArr);
      c.socket.write(`${client.nickname}: ${msgArr.join(' ')}`);
    }
  });
});

ee.on('@nickname', function(client, msgArr){
  client.nickname = msgArr[0];
});

ee.on('@table', function(){
  pool.forEach(c =>{
    c.socket.write('(╯°□°)╯︵ ┻━┻');
  });
  console.log('(╯°□°)╯︵ ┻━┻');
});

ee.on('@calm', function(){
  pool.forEach(c =>{
    c.socket.write('┬──┬ ノ( ゜-゜ノ)');
  });
  console.log('┬──┬ ノ( ゜-゜ノ)');
});

ee.on('@rage', function(){
  pool.forEach(c =>{
    c.socket.write('(┛◉Д◉)┛彡┻━┻');
  });
  console.log('(┛◉Д◉)┛彡┻━┻');
});

ee.on('@herc', function(){
  pool.forEach(c =>{
    c.socket.write('┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻');
  });
  console.log('┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻');
});

ee.on('@bear', function(){
  pool.forEach(c =>{
    c.socket.write('ʕノ•ᴥ•ʔノ ︵ ┻━┻');
  });
  console.log('ʕノ•ᴥ•ʔノ ︵ ┻━┻');
});

ee.on('default', function(client){
  client.socket.write('Please begin with a command!');
});

server.on('connection', function(socket){
  let client = new Client(socket);
  pool.push(client);

  socket.on('data', function(data){
    const command = data.toString().split(' ');
    command[command.length-1] = command[command.length-1].trim();
    if(command[0].startsWith('@')) {
      ee.emit(command[0], client, command.splice(1));
      return;
    }
  });

  socket.on('close', function(){
    console.log(`${client.nickname}: has left`);
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

server.listen(PORT, function(){
  console.log('Server is up for all your needs on port ', PORT);
});
