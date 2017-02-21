
## TCP Chat Server

Using node.js, this app allows users to chat in real time. They have the option of sending messages to the entire chatroom, which are seen by all users in the chat at the time, or to individual users. A user can also change their nickname (the default being a randomly generated number), and look at a list of users (by nickname) that are currently in the chat. Built in user input validation gives feedback to the user when they use commands incorrectly, and errors are logged on the server console.

### How to set up the chat server

* open a terminal window clone the Chat Server
    ```
    $ git clone https://github.com/radenska/06-tcp_servers.git
    ```
* navigate to the lab-yana directory
* run
    ```
    $ npm i
    ```
* run
    ```
    $ node server
    ```
This should start the server.

### How to connect to the chat server
In order for users to join the chat, they need to open a terminal window and run telnet <IP address port>. This is information that the person running the server should provide to users.

### User commands

```
@quit to exit the chat
```
```
@users to get a list of users (by nickname) currently in the chat
```
```
@dm <nickname> to send a message to a specific user
```
```
@all <message> to send a message to everyone currently in the chat
```
```
@nickname <nickname> to change your nickname
```

_created by_ Yana Radenska
