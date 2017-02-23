# TCP Chat_Server

This app was built to host a small "chat room" using "TelNet." The host will first need to initialize the server. Upon doing so, the host may share their IP address to any users wishing to join the room.

#### Getting Started:
In order to begin using the app, navigate to the app's main directory in your terminal. Then run the following command:
```
node server.js
```
This will initiate the server for the chat room.

Then you must share your current IP address (found in your network settings) with any users wishing to join the chat server. Any user may join by typing this command into their terminal:

```
telnet [Host IP] 3000
```
In the case that the host has a specified PORT, let the command '3000' above be changed to the host's specified PORT number. [Host IP] is the IP address found in host's network settings.

#### Commands:
A user is able to make the following commands:
- '@all' (will message every user currently in the room).
- '@dm' [username] (will directly message a user where [username] is someone currently in the chat room.
- '*[nickname]' (will allow any user to change their publicly displaying nick name.
- '-help' (will print out all available commands).

**Note that when using @dm there is a space between [username] and the command. whereas with *[username]

#### Features:
-'help' command to print a list of viable commands to the user.
-The ability for each user to change their publicly displaying nickname.
-A dynamically updating 'pool' of users, which also displays the current amount.

#### Built Using:
-"Net" (node module)
-"Events" (node module)
-"Node-UUID" (npm)

#### Possible Future Features:
-A command to display every user currently in the pool (in order to message them directly).
-Have funny emotes print to the screen, i.e. shorthand commands.
