const httpServer = require("http").createServer();
const sioServer = new (require("socket.io")).Server(httpServer);
const port = 4242;

sioServer.of("/").on("connect", (socket) => {
  console.log("a client connected\n");

  socket.on("disconnect", (reason) => {
    console.log("a client disconnected. reason: %s\n", reason);
  });

  socket.on("join", (data) => {
    socket.username = data.sender;
    socket.broadcast.emit("join", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
    socket.disconnect(true);
  });

  socket.on("broadcast", (data) => {
    socket.broadcast.emit("broadcast", data);
  });

  socket.on("multicast", (data) => {
    for (const [socketId, socket] of sioServer.of("/").sockets) {
      for (receiver of data.receivers) {
        if (socket.username == receiver)
          sioServer.to(socketId).emit("multicast", data);
      }
    }
  });

  socket.on("list", (data) => {
    let usernames = [];

    for (const [socketID, socket] of sioServer.of("/").sockets) {
      usernames.push(socket.username);
    }
    socket.emit("list", {
      "sender": data.sender,
      "action": data.action,
      "usernames": usernames
    });
  });

});

httpServer.listen(port, () => {
  console.log("server is listening to port: %s\n", port);
});

