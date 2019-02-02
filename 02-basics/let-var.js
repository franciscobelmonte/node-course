// Redeclare variables with var

var xmen = 'Wolverine';

if (true) {
    var xmen = 'Cyclops';
}

console.log(xmen);

//Redeclare variables with let creating different scope

let avenger = 'Iron Man';

if (true) {
    let avenger = 'Captain America';
}

console.log(avenger);

// Same scope inside for using var

for (var index = 0; index < 5; index++) {
    console.log(`index: ${index}`);
}

console.log(index);

// Different scope inside for using let

let indexWithLet = 'Hello';

for (let indexWithLet = 0; indexWithLet < 5; indexWithLet++) {
    console.log(`indexWithLet: ${indexWithLet}`);
}

console.log(indexWithLet);