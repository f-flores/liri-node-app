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
// myTweets() outputs my last twenty tweets to my terminal window.
//
function myTweets() {
  // params = {"screen_name": "nodejs"};
  params = {"screen_name": "coding_ff"};

  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (error) {
      console.log("Error. Could not process twitter request.");

      return false;
    }

    console.log(tweets);

    return true;
  });
// client.get("search/tweets", {"q": "from @coding_ff"}, (error, tweets, response) => {
//  console.log(tweets);
// });
}