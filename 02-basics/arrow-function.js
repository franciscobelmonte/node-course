// Arrow function with arguments
function add(a, b) {
    return a + b;
}

let addArrowFunction = (a, b) => a + b;

console.log(add(10, 20));
console.log(addArrowFunction(20, 20));

// Arrow function without arguments
let greet = () => 'Hello';

// Arrow function with one arguments
let greetPerson = name => `Hello ${this.name}`;

// Arrow function don't bind this inside function
let deadpool = {
    name: 'Wade',
    surnames: 'Winston',
    nick: 'Deadpool',
    getName: () => {
        return `${this.name} ${this.surnames} is ${this.nick}`
    }
};

console.log(deadpool.getName());