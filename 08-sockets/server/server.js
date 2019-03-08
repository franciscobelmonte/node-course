const path = require('path');

const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
const app = express();

let server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));

module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);

    console.log(`Server running in port ${port}`);
});