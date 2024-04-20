const request = require("postman-request");

const forecast = (lat, long, callback) => {
  //const [lat, long] = coordinates;
  const url = `http://api.weatherapi.com/v1/current.json?key=5cb14c0a0aa44a20bc0182958240104&q=${lat},${long}&aqi=no`;
  request({ url, json: true }, (err, { body }) => {
    if (body.error) {
      callback("Unable to get weather service");
    } else if (lat == undefined || long == undefined) {
      callback("Unable to fetch Latitude and Longitude");
    } else {
      //console.log(res);
      callback(
        undefined,
        `${body.current.condition.text} throughout the day. It is currenlty ${body.current.temp_c} degress out.There is ${body.current.precip_in}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
