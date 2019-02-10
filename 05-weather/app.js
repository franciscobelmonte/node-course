const argv = require('yargs').options({
    address: {
        alias: 'a',
        desc: 'Address to search the weather',
        demand: true
    }
}).argv;

const geocoding = require('./geocoding/geocoding');
const weather = require('./geocoding/weather');

getInfo = async(address) => {
    try {
        let location = await geocoding.geocoding(address);
        let temperature = await weather.weather(location.latitude, location.longitude);

        return `Weather in ${location.address} is ${temperature}`;
    } catch (error) {
        return `Weather not found in ${address}`;
    }
}

getInfo(argv.address)
    .then(message => console.log(message))
    .catch(error => console.error(error));