const { Manager } = require("socket.io-client");

console.log("[activity] connecting to chat server...");

const url = "ws://127.0.0.1:4242";
const manager = new Manager(url);
const socket = manager.socket("/");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let username = process.argv[2];

rl.on("line", (input) => {
  if (input[0] == "\\") { // is command
    const command = input.slice(1);

    switch (command) {
      case "leave":
        socket.emit("leave", {
          "sender": username,
          "action": "leave"
        });

        console.log("[activity] leaving chat...");
        process.exit();
        break;
      case "list":
        socket.emit("list", {
          "sender": username,
          "action": "list"
        });
      default:
        console.log("[activity] command not found");
    }
  } else { // is chat message
    socket.emit("broadcast", {
      "sender": username,
      "action": "broadcast",
      "message": input
    });
  }
});

socket.on("connect", () => {
  console.log("[activity] welcome, %s", username);

  socket.emit("join", {
    "sender": username,
    "action": "join",
  });
});

socket.on("disconnect", (reason) => {
  console.log("[activity] chat client disconnected. reason: %s", reason);
});

socket.on("join", (data) => {
  console.log("[activity] %s has joined the chat", data.sender);
});

socket.on("leave", (data) => {
  console.log("[activity] %s has left the chat", data.sender);
});

socket.on("broadcast", (data) => {
  console.log("%s", data.message);
});

socket.on("list", (data) => {
  console.log("[info] chat participants:");
  for (let i = 0; i < data.usernames.length; i++) {
    console.log("- " + data.usernames[i]);
  }
});

