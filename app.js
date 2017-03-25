// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Tell express to use node_modules directory as the web root
app.use(express.static(__dirname + '/node_modules'));
//Route all calls to '/' (root) to return index.html
app.get('/', function(req, res,next) {
  res.sendFile(__dirname + '/index.html');
});

//Listen on port 4200
server.listen(4200);

//Socket io stuff
//When a client connects, log a message
io.on('connection', function(client) {
  console.log('Client connected...');

  //Listen for a 'join' event and log the contents of the data
  client.on('join', function(data) {
      console.log(data);
  });

  //Listen for a 'messages' event and send a broad event with the data to the client
  //that sent the 'messages', as well as to all other clients listening
  client.on('messages', function(data){
      //Send 'broad' event to the client that initially sent the 'messages' event
      client.emit('broad', data);
      //Broadcast the 'broad' event to any other clients
      client.broadcast.emit('broad', data);
  });
});
