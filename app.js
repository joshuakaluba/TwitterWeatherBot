var http = require('http');
var tweetFactory = require("./tweetFactory");
var weather = require("./weather");
var registeredAccountManager = require("./registeredAccountManager");

var hostname = process.env.HOSTNAME || '127.0.0.1';
var port = process.env.PORT || 4000;

var server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    start();

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
});


var start = async function() {

    try {

        var registeredAccounts = await registeredAccountManager.getAccounts();

        if (registeredAccounts && registeredAccounts.length > 0) {

            for (var i = 0; i < registeredAccounts.length; i++) {

                var account = registeredAccounts[i];

                var tweetContent = await weather.getWeather(account.cityId, account.units);

                tweetFactory.sendTweet(account.twitterHandle, tweetContent);
            }
        }

    } catch (error) {
        console.log(error.message);
    }

};

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});