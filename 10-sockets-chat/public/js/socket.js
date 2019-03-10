var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

// Emit event to server   
socket.emit('sendMessage', {
    user: 'Francisco',
    message: 'Hello world!'
}, function(response) {
    console.log('Server response:', response);
});

// Listen event from server
socket.on('sendMessage', function(message) {
    console.log('Server', message);
});