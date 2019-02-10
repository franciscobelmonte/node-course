const axios = require('axios');

const geocoding = async(address) => {
    let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=API_KEY`)

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Address not found');
    }

    let result = response.data.results[0];

    return {
        address: result.formatted_address,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
    }
}

module.exports = {
    geocoding
};