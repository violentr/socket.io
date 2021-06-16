// Simple Websocket server
var app = require('express')();
var http = require('http').Server(app);
// var options = {path: "/my-custom-path/"}
var io = require('socket.io')(http);
const mySpace = io.of("/my-space");

app.get('/', function(req, res){
  // console.log(req)
  res.sendFile(__dirname + '/index.html');
});

// main namespace defined with "/"
io.of('/').on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(`Response from main namespace: ${msg}`)
    io.emit('chat message', msg);
  });
});

// read from custom namespace "my-space"
mySpace.on('connection' , function(socket){
  socket.on('my space', function(msg){
    console.log(`Response from my-space namespace: ${msg}`);
    mySpace.emit('my space', msg);
  })
})

http.listen(5000, function(){
  console.log('listening on *:5000');
});
