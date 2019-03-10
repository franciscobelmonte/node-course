class Users {
    constructor() {
        this.users = [];
    }

    connect(id, name) {
        let user = { id, name };
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

    userByChannel() {

    }
}

module.exports = {
    Users
};