var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

var desktop = params.get('desktop');

$('h1').text('Desktop ' + desktop);

var label = $('small');
$('button').on('click', function() {
    socket.emit('attendTicket', { desktop: desktop }, function(response) {
        console.log(response);
        if (response === 'No tickets') {
            alert(response);
            return;
        }
        label.text('Ticket ' + response.number);
    });
});