var params = new URLSearchParams(window.location.search);
var name = params.get('name');
var channel = params.get('channel');

var $users = $('#divUsuarios');
var $messages = $('#divChatbox');
var $form = $('#formSend');
var $message = $('#message');

function renderConnectedUsers(users) {

    var html = `<li><a href="javascript:void(0)" class="active">Chat <span>${params.get('channel')}</span></a></li>`;

    for (let index = 0; index < users.length; index++) {
        html += `
            <li>
                <a data-id="${users[index].id}" href="javascript:void(0)">
                    <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${users[index].name} <small class="text-success">online</small></span>
                </a>
            </li>`;
    }

    $users.html(html);
}

function renderMessage(message, me) {

    var date = new Date(message.date);
    var time = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';
    if (message.name === 'Admin') {
        adminClass = 'danger';
    }

    var html = (!me) ? `
        <li class="animated fadeIn">
            ${message.name !== 'Admin' ? '<div class="chat-img"><img src="assets/images/users/3.jpg" alt="user" /></div>' : '' }
            <div class="chat-content">
                <h5>${message.name}</h5>
                <div class="box bg-light-${adminClass}">${message.message}</div>
            </div>
            <div class="chat-time">${time}</div>
        </li>` :
        `<li class="reverse">
            <div class="chat-content">
                <h5>${message.name}</h5>
                <div class="box bg-light-inverse">${message.message}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />
            </div>
            <div class="chat-time">${time}</div>
        </li>`;

    $messages.append(html);

    scrollBottom();
}

$users.on('click', 'a', function() {
    var id = $(this).data('id');
});

$form.on('submit', function(event) {
    event.preventDefault();

    var message = $message.val();

    if (message.trim().length === 0) {
        return;
    }

    socket.emit('sendMessage', {
        name: name,
        message: message
    }, function(message) {
        $message.val('').focus();
        renderMessage(message, true);
    });

});

function scrollBottom() {
    // selectors
    var newMessage = $messages.children('li:last-child');

    // heights
    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $messages.scrollTop(scrollHeight);
    }
}