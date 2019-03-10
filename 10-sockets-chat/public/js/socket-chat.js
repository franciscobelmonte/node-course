var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('channel')) {
    window.location = 'index.html';
    throw new Error('Name and channel is required');
}

var user = {
    name: params.get('name'),
    channel: params.get('channel')
};

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('connectToChat', user, function(response) {
        console.log('Users connected', response);
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected to server');
});

socket.on('sendMessage', function(message) {
    console.log(message);
});

socket.on('listConnectedUsers', function(users) {
    console.log(users);
});

socket.on('sendPrivateMessage', function(message) {
    console.log('Private message', message);
});