const argv = require('yargs').options({
    address: {
        alias: 'a',
        desc: 'Address to search the weather',
        demand: true
    }
}).argv;

const geocoding = require('./geocoding/geocoding');

geocoding.geocoding(argv.address)
    .then(response => {
        console.log(response);
    })
    .catch(error => console.error(error));