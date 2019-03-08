const path = require('path');

const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
const app = express();

let server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

let io = socketIO(server);

io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', (client) => {
        console.log('User disconnected');
    });

    // Listen event from client
    client.on('sendMessage', (message) => {
        console.log(message);
    });
});


server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Server running in port ${port}`);
});