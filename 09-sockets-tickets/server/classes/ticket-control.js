const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastTickets = [];

        let data = require('../data/data.json');
        console.log(data);

        if (data.hoy === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastTickets = data.lastTickets;
        } else {
            this.reset();
        }
    }

    next() {
        this.last++;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveFile();

        return `Ticket ${this.last}`;
    }

    lastTicket() {
        return `Ticket ${this.last}`;
    }

    lastFourTickets() {
        return this.lastTickets;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No tickets';
        }

        let number = this.tickets[0].number;
        this.tickets.shift();

        let ticket = new Ticket(number, desktop);

        this.lastTickets.unshift(ticket);
        if (this.lastTickets.length > 4) {
            this.lastTickets.splice(-1, 1);
        }

        this.saveFile();
        return ticket;
    }

    reset() {
        this.last = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.saveFile();
    }

    saveFile() {
        let json = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastTickets: this.lastTickets
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(json));
    }
}

module.exports = {
    TicketControl
};