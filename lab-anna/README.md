*TCP Chat Server*

Welcome to the TCP Chat Server! This server app allows you to chat with your all of your classmates openly and through direct messaging! It uses simple protocol running over TCP sockets. The server listens on port 3000 that the client can connect to.

To run server:

- in the app directory run ```node server.js```. It will print out ```server up: 3000```.
- in another terminal enter ```telnet``` and your ```IP address``` followed by port number, which is ```3000```.

To chat:

- precede your message by ```@all``` to reach all users.
- precede your message by ```@dm``` to direct message one particular user.
- to change your nickname enter ```@nickname``` followed by the new nickname.
