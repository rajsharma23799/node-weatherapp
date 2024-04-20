const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?place=${encodeURIComponent(
    address
  )}&limit=1&access_token=pk.eyJ1Ijoic3RyaWtlci0yMyIsImEiOiJjbHV5ZThma2cweTg0Mmtud2QzeGN4Yjg1In0.X4Rx4Pkw0vjXjDWPD1W78g`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!!!", undefined);
    } else if (body.features.length == 0) {
      callback("Invalid Address. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
};

module.exports = geocode;
