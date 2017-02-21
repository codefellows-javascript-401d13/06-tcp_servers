![cf](https://i.imgur.com/7v5ASc8.png) Lab 06: TCP Chat Server
======

This app is a telnet chatroom that uses sockets vis server.js powered by node.

  -Many users allowed to chat.
  -Each user is assigned unique user name.
  -Local Server
  
### Tech

The TCP chat server uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Server.js] 
* [node modules]

And of course TCP Chat Server itself is open source with a [public repository][TCP]
 on GitHub.

### Installation

TCP Chat Server requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm i -d
$ node app
$ npm init -y
$ npm i -S uuid
```
## How to connect

* Clone the Repo in terminal
* Open you network Preferences and grab your IP address 
* In your terminal run the "node server.js" command and you will recieve a message saying that you are connected
* Split pane from your Shell menu in terminal
* In the new pane run this command telnet -your IP address- -port- then hit enter
for ex. "telnet 10.0.0.178 3000" and you will see "Escape character is '^]'." and that means you are connected.

## Description

* When sockets connect to the server, a new `Client` instance is made.
* All clients have a unique `id` property - this will come from the use of `node-uuid`
* When sockets are connected with the client pool they will be given event listeners for `data`, `error`, and `close` events
 * When a socket emits the `close` event, the socket will be removed from the client pool
 * When a socket emits the `error` event, the error will be logged on the server
 * When a socket emits the `data` event, the data will be logged on the server and the commands below will be implemented

### Chat Features
@all triggers a broadcast event
@nickname allows a user change their nickname
@dm allows a user to send a message directly to another user by nick name or by their guest id (unique client id)
when a user sends a message, their nickname will be printed
i.e. cupid: sup lover
