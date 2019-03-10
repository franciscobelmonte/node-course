class Users {
    constructor() {
        this.users = [];
    }

    connect(id, name) {
        let user = { id, name };
        this.user.push(user);

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
        return this.users.filter(user => {
            return user.id === id
        }).pop();
    }

    users() {
        return this.users;
    }

    userByChannel() {

    }
}

module.exports = {
    Users
};