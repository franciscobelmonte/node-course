var socket = io();

var labels = [
    $('#lblTicket1'),
    $('#lblTicket2'),
    $('#lblTicket3'),
    $('#lblTicket4')
];

var desktops = [
    $('#lblEscritorio1'),
    $('#lblEscritorio2'),
    $('#lblEscritorio3'),
    $('#lblEscritorio4')
]

socket.on('lastTicket', function(response) {
    var tickets = response.lasts;

    for (var index = 0; index < tickets.length; index++) {
        labels[index].text('Ticket ' + tickets[index].number);
        desktops[index].text('Desktop ' + tickets[index].desktop);
    }
});