# real-time chat app

## Usage

1. clone repository
2. run `npm install`
3. run `node server/server.js`
4. run `node client/client.js <username>`
5. repeat step 4 as many times as you like in a new shell

## List of available client commands

### `\leave`

leave chat room

```text
\leave
```

### `\list`

list participants of the chat room you are in

```text
\list
```

### `\msgall <message>`

send message to everyone in the chat room you are in  

```text
\msgall Hello everyone!
```

### `\msgusers @username @username ... <message>`

send a message to specified users in the chat room you are in

```text
\msgusers @bob @alice @john Hello Bob, Alice, and John!
```

## Features to add

- add '{user} is typing...' functionality
