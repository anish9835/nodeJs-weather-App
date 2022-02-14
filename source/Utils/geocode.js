const request = require('request')
const geocode = (address, callback) => {
    const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiMTE1MDAzMTkwNjgiLCJhIjoiY2t5eTFpcTRuMGFuaTJ3bzI0bmo1eWlmZiJ9.V3RpQ0PtV2s_40B0Wx1lNg&limit=1`
    request({ url: url_mapbox, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to loaction services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location. Try another search', undefined)
        } else {
            const data = {
                cityName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            callback(undefined, data)
        }
    })
}
module.exports = geocode