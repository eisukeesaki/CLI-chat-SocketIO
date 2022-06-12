# WebSocket

```text

problem
    How to achieve bidirectional communication?
        solution before WebSocket
            HTTP polling
                poll server for updates as distinct HTTP calls
                    sub-problems
                        high overhead
                            overhead
                                indirect requirement of resource to perform task
                            each message has HTTP header
                            server is forced to use multiple TCP connections for each client
                                one for incoming message
                                one for sending message
                            client is forced to maintain a mapping of incoming and outgoing connections
        a solution
            WebSocket
                alternative to HTTP polling
                    communication protocol
                        provides mechanism
                            full-duplex
                                between remote hosts
                                over single TCP connection
                        designed to work over HTTP
                            port
                                80
                                443
                            not limited to HTTP
                    API
                        WebSocket API
                    mechanism
                        handshake
                            opening
                                HTTP/1.1 header examples
                                    from client
                                        GET /chat HTTP/1.1
                                        Host: server.example.com
                                        Upgrade: websocket
                                        Connection: Upgrade
                                        Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
                                        Origin: http://example.com
                                        Sec-WebSocket-Protocol: chat, superchat
                                        Sec-WebSocket-Version: 13
                                    from server
                                        HTTP/1.1 101 Switching Protocols
                                        Upgrade: websocket
                                        Connection: Upgrade
                                        Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
                                        Sec-WebSocket-Protocol: chat
                                    Upgrade: websocket
                                    Connection: Upgrade
                            closing
                            participants
                                client
                                    HTTP upgrade request
                                server
                            automated process
                                exchange of information
                                    negotiation between participants of communication
                                    establish protocol of communication before starting full communication
                                facilitates connecting heterogeneous systems/equipments without human intervention
                            RFC usually use the term to reference TCP 3-way handshake
                                TCP 3-way handshake
                                    1. SYNchronize
                                    2. SYNchronize-ACKknowledgement
                                    3. ACKnowledgement
                            single port used by
                                HTTP clients
                                WebSocket clients
                            parameters
                                examples
                                    transfer rate
                        flow
                            open connection
                                perform opening handhake
                            perform full-duplex communication
                                channel
                                    TCP connection
                                        single
                                        open
                                        persistent
                            one side closes channel
                                close connection
                            

```

