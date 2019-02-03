// Basic example with async wrapping value in a promise
let getName = async() => {
    return 'Francisco';
}

getName().then(name => {
    console.log(name);
}).catch(error => {
    console.error(error);
});

// Example returning a promise
let getSurnames = async() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Belmonte');
        }, 3000);
    })
}

getSurnames().then(surname => {
    console.log(surname);
}).catch(error => {
    console.error(error);
});

// Example using await
let greet = async() => {
    let name = await getName();
    return `Hello ${name}`;
}

greet().then(message => {
    console.log(message);
})