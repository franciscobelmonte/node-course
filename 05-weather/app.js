const argv = require('yargs').options({
    address: {
        alias: 'a',
        desc: 'Address to search the weather',
        demand: true
    }
}).argv;

const geocoding = require('./geocoding/geocoding');
const weather = require('./geocoding/weather');

// geocoding.geocoding(argv.address)
//     .then(location => {
//         console.log(location);
//     })
//     .catch(error => console.error(error));


weather.weather(39.202600, -0.310600)
    .then(temperature => {
        console.log(temperature);
    })
    .catch(error => console.error(error));