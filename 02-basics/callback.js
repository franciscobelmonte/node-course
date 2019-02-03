// Basic callback example
setTimeout(function() {
    console.log('Hello world');
}, 3000);

// Example callback with error
let getUserById = (id, callback) => {
    let user = {
        id,
        name: 'Francisco'
    };

    if (id === 20) {
        callback('User not found', undefined);
        return;
    }

    callback(undefined, user);
}

getUserById(20, (err, user) => {
    if (err) {
        return console.error(err);
    }
    console.log('User', user);
})