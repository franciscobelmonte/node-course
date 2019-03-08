var socket = io();

var $label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('lastTicket', function(response) {
    $label.text(response.last);
});

$('button').on('click', function() {
    socket.emit('nextTicket', function(response) {
        $label.text(response);
    });
});