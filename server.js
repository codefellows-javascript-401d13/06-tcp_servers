'use strict';

const net = require('net');
const server = net.createServer();
const PORT = process.env.PORT || 3000;
const Client = require(`${__dirname}/model/client.js`);
const EE = require('events');
const ee = new EE();

const chatGroup = [];

///+++++ socket events ++++++\\\

ee.on('login', function(socket) {
  const client = new Client(socket);
  chatGroup.push(client);
  ee.emit('message', socket, client);
  socket.on('error', function(error) {
    ee.emit('socketError', error);
  });
  socket.on('close', function(socket) {
    ee.emit('logout', socket, client);
  });
});

ee.on('socketError', function(error) {
  if (error) console.log(error);
});

ee.on('logout', function(socket, client) {
  chatGroup.forEach(ele => {
    if (ele.id === client.id) {
      let removeUser = chatGroup.indexOf(client);
      chatGroup.splice(removeUser, 1);
    }
  });
});

///+++++ Message from client pool sockets handling +++++\\\

ee.on('message', function(socket, client) {//client = msg sender obj
  socket.on('data', function(data) {
    let userTarget;
    let directMsg;
    if (data.toString().split(' ').length > 2) {
      userTarget = data.toString().split(' ').slice(1).shift().trim();
      directMsg = data.toString().split(' ').slice(2).join(' ');
    }
    const command = data.toString().split(' ').shift().trim();
    const msg = data.toString().split(' ').slice(1).join(' ');

    if(command.includes('@all')) {
      ee.emit(command, client, msg);
      return;
    }

    if(command.includes('@dm')) {
      ee.emit(command, userTarget, client, directMsg);
      return;
    }

    if(command.includes('@not')) {
      ee.emit(command, userTarget, client, directMsg);
      return;
    }

    if(command.includes('@nickname')) {
      ee.emit(command, client, msg);
      return;
    }

    if(command.includes('destroy')) {
      socket[command]('Something went horribly wrong');
      return;
    }

    ee.emit('default', client, data.toString());
  });
});

///+++++  custom command helpers +++++ \\\

ee.on('@all', function(client, message) {
  chatGroup.forEach(ele => {
    ele.socket.write(`${client.nickname} ${message}`);
  });
});

ee.on('@dm', function(targetUser, client, msg) {
  chatGroup.forEach(ele => {
    if (ele.nickname === targetUser || ele.id === targetUser) {
      ele.socket.write(`${client.nickname} ${msg}`);
    }
  });
});

ee.on('@not', function(targetUser, client, msg) {
  chatGroup.forEach(ele => {
    if (ele.nickname != targetUser && ele.id != targetUser) {
      ele.socket.write(`${client.nickname} ${msg}`);
    }
  });
});

ee.on('@nickname', function(client, newName) {
  let message = newName.split(' ').shift().trim();
  chatGroup.forEach(ele => {
    if (ele.id === client.id) {
      ele.nickname = message;
    }
  });
});

ee.on('default', function(client, message) {
  client.socket.write(`${message} not sent. Incorrect or no command given.\n`);
});

///+++++  server events +++++\\\

server.on('connection', function(socket) {
  ee.emit('login', socket);
});

server.on('close', function(socket) {
  ee.emit('logout', socket);
});

server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
