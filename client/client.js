const { Manager } = require("socket.io-client");

console.log("connecting to chat server...\n");

const url = "ws://127.0.0.1:4242";
const manager = new Manager(url);
const socket = manager.socket("/");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nickname = process.argv[2];

socket.on("connect", () => {
  console.log("welcome, %s\n", nickname);
});

socket.on("disconnect", (reason) => {
  console.log("a client disconnected. reason: %s\n", reason);
});

socket.on("broadcast", (data) => {
  console.log("%s\n", data.message);
});

rl.on("line", (input) => {
  socket.emit("broadcast", {
    "sender": nickname,
    "action": "broadcast",
    "message": input
  });
});

