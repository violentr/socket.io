const io = require("socket.io-client");
// let options = {path: "/my-custom-path/"}
let url = "ws://localhost:5000"
const socket = io(url);

// Read data from main namespace
socket.on("chat message", function(data) {
  console.log(`Message from main namespace: ${data}`);
});

// Connect and read data from custom namespace
// For some reason const mySpace = socket.connect('/my-space');
// Does not work, should do work around

let spaceUrl = "ws://localhost:5000/my-space"
const mySpace = io(spaceUrl) ;

mySpace.on("my space", function(data) {
  console.log(`Message from my-space namespace: ${data}`);
});

console.log(`[+] App started successfully`)
console.log(`[+] Reading data from Websocket ${url}`)
