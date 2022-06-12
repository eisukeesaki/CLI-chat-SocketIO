const port = 4242;
const sioServer = require("socket.io")(port);

console.log("server is listening to port: %s\n", port);

sioServer.on("connect", (socket) => {
  console.log("a client connected\n");

  socket.on("broadcast", (data) => {
    socket.broadcast.emit("broadcast", data);
  });

  socket.on("disconnect", (reason) => {
    console.log("a client disconnected. reason: %s\n", reason);
  });
});

