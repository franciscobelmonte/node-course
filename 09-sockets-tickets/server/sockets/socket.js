const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('User connected');

    client.on('disconnect', (client) => {
        console.log('User disconnected');
    });

    // Listen event from client
    client.on('nextTicket', (callback) => {
        callback(ticketControl.next());
    });

    client.emit('lastTicket', {
        last: ticketControl.lastTicket()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                error: true,
                message: 'Desktop is required'
            });
        }

        let ticket = ticketControl.attendTicket(data.desktop);

        callback(ticket);
    });
});