'use strict';

const net = require('net');
const server = net.createServer();
const PORT = process.env.PORT || 3000;





server.listen(PORT, function() {
  console.log(`Server started on port: ${PORT}`);
})
