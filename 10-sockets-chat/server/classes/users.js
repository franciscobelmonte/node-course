class Users {
    constructor() {
        this.users = [];
    }

    connect(id, name, channel) {
        let user = { id, name, channel };
        this.users.push(user);

        return this.users;
    }

    disconnect(id) {
        let user = this.userById(id);

        this.users = this.users.filter(user => {
            return user.id !== id;
        });

        return user;
    }

    userById(id) {
        return this.users.find(user => {
            return user.id === id
        });
    }

    connectedUsers() {
        return this.users;
    }

    connectedUsersbyChannel(channel) {
        return this.users.filter(user => {
            return user.channel === channel;
        });
    }
}

module.exports = {
    Users
};