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

issues
    features
        client
            connection
                ✓connect to server
                ✓programmatically disconnect from server
            informational
                list other clients
                    ✓connected to same server
                notification
                    ✓connection
                    ✓disconnection
            conversation
                chat message
                    unicast
                        to client specified by username
                    broadcast
                        ✓to clients connected to save server
                    multicast
            
                
features to add
    Add “{user} is typing” functionality.

```

