const io = require("socket.io-client");
// let options = {path: "/my-custom-path/"}
const url = "ws://localhost:5000"
const socket = io(url);

// Read data from main namespace
socket.on("chat message", data => {
  console.log(`Message: ${data}`);
});

// Connect and read data from custom namespace
socket.connect('/my-space').on("my space", data => {
  console.log(`Message from custom namespace: ${data}`);
});

console.log(`[+] App started successfully`)
console.log(`[+] Reading data from Websocket ${url}`)
