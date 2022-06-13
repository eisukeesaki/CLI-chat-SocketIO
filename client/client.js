const { Manager } = require("socket.io-client");
const parseInput = require("./helpers/parseInput");

console.log("[activity] connecting to chat server...");

const url = "ws://127.0.0.1:4242";
const manager = new Manager(url, {
  autoConnect: true
});
const socket = manager.socket("/");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout // TODO: unnecessary?
});

let username = process.argv[2];

rl.on("line", (input) => {
  if (input[0] == "\\") { // is command
    const parsed = parseInput(input);
    console.log(parsed);

    switch (parsed.command) {
      case "leave":
        socket.emit("leave", {
          "sender": username,
          "action": "leave"
        });

        console.log("[activity] leaving chat...");
        process.exit();
        break;
      case "msgusers":
        socket.emit("multicast", {
          "sender": username,
          "receivers": parsed.receivers,
          "action": "multicast",
          "message": parsed.message
        });
        break;
      case "list":
        socket.emit("list", {
          "sender": username,
          "action": "list"
        });
        break;
      case "msgall":
        socket.emit("broadcast", {
          "sender": username,
          "action": "broadcast",
          "message": parsed.message
        });
        break;
      default:
        console.log("[activity] command not found");
    }
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

socket.on("multicast", (data) => {
  console.log("%s", data.message);
})

socket.on("list", (data) => {
  console.log("[info] chat participants:");
  for (let i = 0; i < data.usernames.length; i++) {
    console.log("- " + data.usernames[i]);
  }
});

/*

    manager.socket(namespace, options)
        instantiates
            Manager
                with given namespace
                manages Engine.IO client instance
                    establishes connections to server
                        WebSocket
                        HTTP polling
                uses event emitter provided by component-emitter library 
                    exposes subset of EventEmitter methods

    readline.createInterface(options)
        instantiates readline.Interface
            every instance is associated with
                single input Readable stream
                single ouput Writable stream
            options
                input
                    Readable stream to listen to
                output
                    Writeable stream to write to
        line event
            emitted when input stream receives end-of-line input
                \n

    process
        provides info about and control over current Node.js process

    emitter.on(eventName, listener)
        adds event listener call back function to end of listeners array
        returns reference to EventEmitter

    TODO
        learn regex and cleanup logic around command interpretation and execution
    
*/

