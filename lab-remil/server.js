'use strict';

const net = require('net');
const server = net.createServer();
const PORT = process.env.PORT || 7777;
const EE = require('events');
const ee = new EE();
const Client = require('./model/client.js');
const command = require('./lib/command-helper.js');

let pool = [];
ee.on('@all', command.msgAll);
ee.on('@dm', command.msgDirect);
ee.on('@nickname', command.changeNickname);
ee.on('#help', command.help);
ee.on('default', command.default);
server.on('connection', onConnection);
server.listen(PORT, () => console.log('The AYO chatroom loaded on: ', PORT));

function onConnection(socket){
  let client = new Client(socket);
  pool.push(client);
  clientConnect(client);
  socket.on('data', handleClientData);
  socket.on('close', removeClient);
  // socket.on('error', );

  function handleClientData(data) {
    console.log();
    let entry = data.toString().trim();
    console.log(`${client.nickname}: ${entry}`);

    if (entry.startsWith('@') || entry.startsWith('#')) {
      let command = data.toString().split(' ').shift().trim();
      let string = data.toString().split(' ').slice(1).join(' ');
      return ee.emit(command, client, string, pool);
    }
    ee.emit('default',client);
  }

  function removeClient() {
    pool.splice(pool.map(c => c.socket).indexOf[this], 1);
    console.log(`User has closed connection, pool size is now ${pool.length}`);
  }

  function clientConnect(client) {
    let message =
`What's up? Welcome to the ayoPLAYA chatroom!
Your nickname is currently ${client.nickname}
Enter command #help for command descriptions\n`;

    client.socket.write(message);
    console.log(`${client.nickname} has joined`);
  }
}
