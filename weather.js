var requestify = require('requestify');

var apiKey = process.env.WEATHER_API_KEY;

var weather = {};

weather.getWeather = async function(cityId, units) {

    var url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;

    var res = await requestify.get(url)
        .then(getForecast)
        .catch(parseReason);

    return res;
};

var getForecast = function(response) {

    var result = response.getBody();

    if (result) {
        var cityName = result.name;
        var highTemp = result.main.temp_max;
        var lowTemp = result.main.temp_min;
        var weatherDescription = result.weather[0].description;

        var forecast = `Weather for ${ cityName }, ${ highTemp }° high, ${ lowTemp }° low, forecast - ${ weatherDescription }`;

        return forecast;
    }
};

var parseReason = function(reason) {
    console.error(reason);
    return "Unable to get weather";
};

module.exports = weather;