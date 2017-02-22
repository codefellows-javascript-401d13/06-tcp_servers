# TCP Chat Server
This TCP chat server allows you broadcast messages to all connected users as well send direct message to individual users.

### Running the Chat Server
  - Run the file **server.js** located in the directory named **/lab-remil/**
```sh
node server
```
- Note the **PORT** provided like this:
```sh
The AYO chatroom loaded on: <PORT>
```

### Connecting to the Chat Server
- Users can connect to the chat server by running the telnet command using the **Host IP address** and **PORT**
```sh
telnet <IP address> <PORT>
```

### User Commands
```sh
#help                   #lists all commands
@all <message>          #sends message to all users
@dm <user> <message>    #sends direct message to user
@nickname <name>        #change user nickname
```

test for git auth
