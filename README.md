# chatsburg v0.1.0

This is a simple TCP Chat Server built using native Node modules.

  - Start up your server.
  - Establish a TCP connection.
  - Chat away at your heart's content!

# The Process

> I enjoyed this project quite a bit. It was a good excercise in working through
> a problem domain piece by piece. I started by scaffolding out the file structure
> and initating npm in the root directory to establish a package.json object. After that
> I created a Client object constructor to keep track of unique connections to the
> server. After that it was a matter of architeching the listeners and emitters to
> account for each of the different possible commands. Last, but certainly not least,
> accounting for a socket error and allowing the user to close the connection with a
> command proved to be the most difficult part of the process.

### Tech

chatsburgh uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [node-uuid] - unique id generator

And of course chatsburgh itself is open source with a [repository](https://github.com/dkulp23/06-tcp_servers)
 on GitHub.

### Installation

chatsburgh requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and start the server.

```sh
$ cd lab-dana
$ npm i
$ node server
```

To test the capabilities of chatsburgh for yourself, split your terminal window horizontally and then two or three times vertically:

First, determine your IP address by opening your network preferences.
Then, in each of the bottom split screens run:
```sh
$ telnet <IP Adress Goes Here> 3000
```

Then to communicate between the screens, and other users on the server, pick from one of the following commands and off you go:
```sh
@all <some cool message for all your pals>
    -broadcasts to everyone logged in

@dm <nickname OR user_name> <some super secret message>
    -now you can keep it on the dl with just one user

@not <nickname OR user_name> <some other ultra secret message>
    -or plan that surprise party without one person finding out

@nickname <chesterfield or some other really cool name>
    -ditch that randomly generated user_name for one as unique as you are
```

And, when you're ready to leave the chat:
```sh
destroy
    -smell ya later
```

License
----

MIT

[Following sematic versioning rules established here.](http://semver.org/)

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [node-uuid]: <https://www.npmjs.com/package/node-uuid>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
