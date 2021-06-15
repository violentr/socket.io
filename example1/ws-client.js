const io = require("socket.io-client");
const socket = io("ws://localhost:5000");

// Read from web socket
socket.on("chat message", data => {
  console.log(`Message: ${data}`);
});
