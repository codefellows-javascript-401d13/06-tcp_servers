'use strict';

const net = require('net');
const server = net.createServer();
const PORT = process.env.PORT || 3000;
const Client = require(`${__dirname}/model/client.js`);
const EE = require('events');
const ee = new EE();


server.on('connection', function(socket) {
  const client = new Client(socket);
  console.log(client);
});


server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
});
