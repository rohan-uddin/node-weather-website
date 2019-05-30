const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGhlc3BhcnJvd2ZhbGwiLCJhIjoiY2p3Nm04NXhyMWI0cjRhcDkxa2RkczlleSJ9.-ucY6oCRSiIAwq7FccyPZQ&limit=1'
    request({url, json:true}, (err, res)=> {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length===0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode