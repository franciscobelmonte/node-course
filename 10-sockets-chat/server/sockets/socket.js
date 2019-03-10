const { io } = require('../server');

io.on('connection', (client) => {
    console.log('User connected');

    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome this application!'
    });

    client.on('disconnect', (client) => {
        console.log('User disconnected');
    });

    // Listen event from client
    client.on('sendMessage', (message, callback) => {
        console.log(message);

        client.broadcast.emit('sendMessage', message);
        // if (message.user) {
        //     callback({
        //         error: false
        //     });
        // } else {
        //     callback({
        //         error: true
        //     });
        // }
    });
});