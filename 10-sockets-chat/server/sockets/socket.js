const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('connectToChat', (user, callback) => {
        console.log('User connected', user);
        if (!user.name) {
            callback({
                error: true,
                message: 'Name is required'
            });
        }

        let connectedUsers = users.connect(client.id, user.name);

        client.broadcast.emit('listConnectedUsers', users.connectedUsers());

        callback(connectedUsers);
    });

    client.on('disconnect', () => {
        let user = users.disconnect(client.id);
        client.broadcast.emit('sendMessage', createMessage('Admin', `${user.name} has disconnected from the chat`));

        client.broadcast.emit('listConnectedUsers', users.connectedUsers());
    });

    client.on('sendMessage', (message) => {
        let user = users.userById(client.id);

        client.broadcast.emit('sendMessage', createMessage(user.name, message.message));
    })
});