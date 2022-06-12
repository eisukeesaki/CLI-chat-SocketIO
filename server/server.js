const httpServer = require("http").createServer();
const sioServer = new (require("socket.io")).Server(httpServer);
const port = 4242;

sioServer.on("connect", (socket) => {
  console.log("a client connected\n");

  socket.on("disconnect", (reason) => {
    console.log("a client disconnected. reason: %s\n", reason);
  });

  socket.on("join", (data) => {
    socket.broadcast.emit("join", data);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
  });

  socket.on("broadcast", (data) => {
    console.log("received payload on broadcast event: %o\n", data);

    socket.broadcast.emit("broadcast", data);
  });

});

httpServer.listen(port, () => {
  console.log("server is listening to port: %s\n", port);
});

