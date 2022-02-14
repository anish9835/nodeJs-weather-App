const request = require('request')
const forecast = (lat, long, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&units=metric&appid=8cc90171bb8bbb6bed28dbbda9bdda5b`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to loaction services', undefined)
        } else if (body.cod == '400') {
            callback('Unable to find Location. Try another search', undefined)
        } else {
            const { temp, weather } = body.daily[0];
            const data = {
                temp,
                weather
            }
            callback(undefined, data)
        }
    })
}
module.exports = forecast