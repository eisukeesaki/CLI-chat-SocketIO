const { Manager } = require("socket.io-client");

console.log("[ft_chat] connecting to chat server...\n");

const url = "ws://127.0.0.1:4242";
const manager = new Manager(url);
const socket = manager.socket("/");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let nickname = process.argv[2];

rl.on("line", (input) => {
  if (input[0] == "\\") { // is command
    const command = input.slice(1);

    switch (command) {
      case "exit":
        socket.emit("leave", {
          "sender": nickname
        });

        console.log("[ft_chat] leaving chat...");
        process.exit();
        break;
      default:
        console.log("[ft_chat] command not found\n");
    }
  } else { // is chat message
    socket.emit("broadcast", {
      "sender": nickname,
      "action": "broadcast",
      "message": input
    });
  }
});

socket.on("connect", () => {
  console.log("[ft_chat] welcome, %s\n", nickname);

  socket.emit("join", {
    "sender": nickname
  });
});

socket.on("disconnect", (reason) => {
  console.log("[ft_chat] chat client disconnected. reason: %s\n", reason);
});

socket.on("join", (data) => {
  console.log("[ft_chat] %s has joined the chat", data.sender);
});

socket.on("leave", (data) => {
  console.log("[ft_chat] %s has left the chat", data.sender);
});

socket.on("broadcast", (data) => {
  console.log("%s\n", data.message);
});

