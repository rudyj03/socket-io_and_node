//browserify allows us to use this require() style here.
//if new dependencies are added here, run 'browserify main.js > scripts/bundle.js'
//this will create a new bundle.js file that makes the require magic work.
var socket = require('socket.io-client')('http://localhost:4200');
var $ = require('jquery');

socket.on('connect', function(data) {
  socket.emit('join', 'Hello World from client');
});
socket.on('broad', function(data) {
  $('#future').append(data+ "<br/>");
});

$('form').submit(function(e){
  e.preventDefault();
  var message = $('#chat_input').val();
  socket.emit('messages', message);
});
