# real-time chat app

```text

real-time chat app
    UI
        command-line
    communication protocol
        WebSocket
            JavaScript library
                Socket.io
    functions
        client
            connect to server
                maintain connection
            messages
                send
                    read command-line input
                        Node.js
                            ?readline
                receive
                    print on commnad-line
                        console.log()
        server
            act as intermediary between connected clients
                listen to a port for connection requests
                receive messages
                broadcast message to connected clients
            
features to add
    Broadcast a message to connected users when someone connects or disconnects.
    Add support for nicknames.
    Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
    Add “{user} is typing” functionality.
    Show who’s online.
    Add private messaging.

```

