const io = require("socket.io-client");
// let options = {path: "/my-custom-path/"}
// let url = "ws://localhost:5000"
let token ="454249497962414a306671726c4347786e4e3966334f44434e5249556d656i07"
let iproovUrl = `wss://eu.rp.secure.iproov.me/socket.io/v2/${token}`
let url = `ws://localhost:5000`
const socket = io(url);

//socket.onmessage = function(event) {
//  alert(`[message] Data received from server: ${event}`);
//};


socket.emit("message", "External: debug!")
socket.on("chat message", function(data) {
  console.log(`Message from main namespace: ${data}`);
});

// doesn't work
var WebSocket = require('websocket').client;
const ws = new WebSocket(url);
ws.on('connect', function(connection) {
  debugger
  console.log('WebSocket Client Connected');
  connection.on('message', function(message) {
    console.log(`Received: ${message}`);
  })
})


// Read data from main namespace
socket.on("chat message", (data) => {
  console.log(`Message from main namespace: ${data}`);
});

// Connect and read data from custom namespace
// For some reason const mySpace = socket.connect('/my-space');
// Does not work, should do work around

let spaceUrl = `${url}/my-space`
const mySpace = io(spaceUrl) ;

mySpace.on("my space", function(data) {
  console.log(`Message from my-space namespace: ${data}`);
});

let loopIt = function(socket, channel, times, msg){
  let i = 1;
  console.log(`Socket url: ${socket.nsp}`)
  while (i <= parseInt(times)) {
    socket.emit(channel, msg)
    console.log(`Debug message sent: ${msg}`)
    i++
  }
  return i
}

const iproovSDK = io(iproovUrl);
let channel = "client_log"
iproovSDK.emit(channel, "External: Hello there")
loopIt(iproovSDK, "client_log", 10, "External message!");

console.log(`[+] App started successfully`)
console.log(`[+] Reading data from Websocket ${url}`)
