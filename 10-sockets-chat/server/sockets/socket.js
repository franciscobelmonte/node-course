const { io } = require('../server');
const { Users } = require('../classes/users');

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
        callback(connectedUsers);
    })
});