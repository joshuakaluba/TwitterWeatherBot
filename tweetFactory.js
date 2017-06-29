var TwitterPackage = require('twitter');

var Twitter = new TwitterPackage({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

var tweetFactory = {};

tweetFactory.sendTweet = function(twitterHandle, content) {
    Twitter.post('statuses/update', { status: `Hi! @${twitterHandle}, ${content}` },
        function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
};

module.exports = tweetFactory;