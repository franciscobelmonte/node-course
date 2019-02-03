let deadpool = {
    name: 'Wade',
    surnames: 'Winston',
    nick: 'Deadpool',
    getName: function() {
        return `${this.name} ${this.surnames} is ${this.nick}`
    }
};

let { name: firstname, surnames, nick } = deadpool;

console.log(firstname, surnames, nick);