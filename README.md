TCP Chat Server
======

This is a basic TCP chat server built with Node.js. All logic is built into the main file while user data is abstracted into a separate model. It relies on node's native uuid module to create user ids as well as node's native net module to create and run the server.

## To get it started:
  Clone the repo and import Node's uuid module by using ```npm i node-uuid```
  Then open the application using 'node server'
  Anyone wishing to communicate with others using this app should first identify their IP address and then, in a separate command line window from the server, input 'telnet 000.000.0.0 3000'
  where '000.000.0.0' should be the desired IP and '3000' should be whatever port you wish to use.
  From there the app will run and you can reference the custom commands below to create a personalized experience.

## Custom commands
 `@all` will trigger a broadcast event
 `@nickname` will allow a user change their nickname
 `@dm` will allow a user to send a message directly to another user by their nickname or by their guest id _(unique client id)_
  when a user sends a message, their nickname will be printed
   **i.e.** `chattyCathy: sup chatterz`
