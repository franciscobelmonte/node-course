const argv = require('yargs').options({
    address: {
        alias: 'a',
        desc: 'Address to search the weather',
        demand: true
    }
}).argv;

console.log(argv);