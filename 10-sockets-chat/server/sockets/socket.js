const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils');

const users = new Users();

io.on('connection', (client) => {

    client.on('connectToChat', (user, callback) => {
        console.log('User connected', user);
        if (!user.name || !user.channel) {
            callback({
                error: true,
                message: 'Name and channel is required'
            });
        }

        client.join(user.channel);

        let connectedUsers = users.connect(client.id, user.name, user.channel);

        client.broadcast.to(user.channel).emit('sendMessage', createMessage('Admin', user.name + ' has connected to the chat'));
        client.broadcast.to(user.channel).emit('listConnectedUsers', users.connectedUsersbyChannel(user.channel));

        callback(users.connectedUsersbyChannel(user.channel));
    });

    client.on('disconnect', () => {
        let user = users.disconnect(client.id);
        client.broadcast.to(user.channel).emit('sendMessage', createMessage('Admin', `${user.name} has disconnected from the chat`));

        client.broadcast.to(user.channel).emit('listConnectedUsers', users.connectedUsersbyChannel(user.channel));
    });

    client.on('sendMessage', (message, callback) => {
        let user = users.userById(client.id);

        client.broadcast.to(user.channel).emit('sendMessage', createMessage(user.name, message.message));

        callback(message);
    });

    client.on('sendPrivateMessage', (message) => {
        let user = users.userById(client.id);
        client.broadcast.to(message.to).emit('sendPrivateMessage', createMessage(user.name, message.message));
    });
});