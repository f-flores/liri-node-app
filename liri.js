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
var songObject = {
      "title": "The Sign",
      "artist": "Ace of Base"
    },
    appMethod, appValue;
var Twitter;

require("dotenv").config();

keys = require("./keys.js");
Twitter = require("twitter");
Spotify = require("node-spotify-api");

spotify = new Spotify(keys.spotify);
client = new Twitter(keys.twitter);

appMethod = process.argv["2"];
if (process.argv["3"]) {
  appValue = process.argv.slice(3).join(" ");
  songObject.title = appValue;
  songObject.artist = "";
}

switch (appMethod) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThis(songObject);
    break;
  default:
    console.log("Command not understood. Valid commands are the following:");
    console.log("'my-tweets', 'spotify-this-song <song>'");
    break;
}


// ---------------------------------------------------------------------------------------
// myTweets() outputs my last twenty tweets to my terminal window. This function makes
//  use of the twitter client.get() function, with the statuses/user_timeline endpoint
//
function myTweets() {
  var tweetCount = 1;

  params = {
            "screen_name": "coding_ff",
            "count": 20
          };

  client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if (error) {
      console.log("Error. Could not process twitter request.");

      return false;
    }

    for (const msg of tweets) {
      console.log(msg.created_at.slice(0,TweetDateLength));
      console.log(tweetCount++ + ". " + msg.text);
      console.log("=======================================================================");
    }

    return true;
  });
}

// -----------------------------------------------------------------------------------------
// spotifyThis() takes in song object as a parameter and uses the spotify nodejs package to
//  return information about that song.
//
function spotifyThis(obj) {
  // console.log("spotify-this-song " + song);
  spotify.search({
      "type": "track",
      "query": obj.title
    }, (err, data) => {
      if (err) {
        return console.log("Error occurred: " + err);
    }
    // console.log(JSON.stringify(data.tracks.items, null, 2));
    for (const track of data.tracks.items) {
      // console.log(msg.created_at.slice(0,TweetDateLength));
      // console.log(JSON.stringify(track.album.artists.name, null, 2));
      console.log(track.album.artists[0].name);
      console.log("=======================================================================");
    }

    return true;
  });
}