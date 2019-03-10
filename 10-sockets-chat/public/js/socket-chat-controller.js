var params = new URLSearchParams(window.location.search);

var $divUsers = $('#divUsuarios');

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

    $divUsers.html(html);
}