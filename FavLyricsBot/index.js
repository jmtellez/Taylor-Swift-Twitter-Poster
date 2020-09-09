
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./props.ini');
const twit = require('twit');


const T = new twit(properties.getAllProperties());

function tweet(message) {
    T.post('statuses/update', { status: message }, function (err, data, response) {
        console.log(data)
    })
}

tweet("1234");