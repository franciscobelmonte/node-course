const fs = require('fs');

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');
        console.log(data);

        if (data.hoy === this.today) {
            this.last = data.last;
        } else {
            this.reset();
        }
    }

    next() {
        this.last++;
        this.saveFile();

        return `Ticket ${this.last}`;
    }

    lastTicket() {
        return `Ticket ${this.last}`;
    }

    reset() {
        let json = {
            last: this.last,
            today: this.today
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(json));
    }

    saveFile() {
        let json = {
            last: this.last,
            today: this.today
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(json));
    }
}

module.exports = {
    TicketControl
};