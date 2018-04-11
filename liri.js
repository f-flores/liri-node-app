// ===========================================================================================
//  File name: liri.js
//  Date: April, 2018
//  Author: Fabian Flores
//  Description: This app is a nodejs terminal app designed to process the following
//    commands: mytweets
//    mytweets returns a list of my 20 most recent tweets.
//
//
// ===========================================================================================

const TweetDateLength = 16;

var keys, spotify, client, params;
var appMethod;
var Twitter;

require("dotenv").config();

keys = require("./keys.js");
Twitter = require("twitter");

// spotify = new Spotify(keys.spotify);
client = new Twitter(keys.twitter);

appMethod = process.argv["2"];

switch (appMethod) {
  case "my-tweets":
    myTweets();
    break;
  default:
    console.log("Command not understood. Valid commands are 'my-tweets'");
    break;
}


// ---------------------------------------------------------------------------------------
// myTweets() outputs my last twenty tweets to my terminal window. This function makes
//  use of the twitter client.get() function, with the statuses/user_timeline endpoint
//
function myTweets() {
  var tweetCount = 1;

  // params = {"screen_name": "nodejs"};
  params = {
            "screen_name": "coding_ff",
            "count": 20
          };

  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (error) {
      console.log("Error. Could not process twitter request.");

      return false;
    }

    // console.log(JSON.stringify(tweets, null, 2));
    for (const msg of tweets) {
      console.log(msg.created_at.slice(0,TweetDateLength));
      console.log(tweetCount++ + ". " + msg.text);
      console.log("=======================================================================");
    }

    return true;
  });
// client.get("search/tweets", {"q": "from @coding_ff"}, (error, tweets, response) => {
//  console.log(tweets);
// });
}