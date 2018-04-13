// =============================================================================================
//  File name: liri.js
//  Date: April, 2018
//  Author: Fabian Flores
//  Description: This app is a nodejs terminal app designed to process the following
//    commands: mytweets, spotify-this-song <songName>, movie-this <movieName>, do-what-it-says
//    mytweets returns a list of my 20 most recent tweets.
//    spotify-this-song takes in a song name and returns information about that song,
//      including song title, artist, album and a preview link
//    movie-this <movieName> returns the following information about a movie: title, year,
//      IMDB Rating, Rotten Tomatoes Rating, Countries where movie was produced, Plot, Actors,
//      and languages
//    do-what-it-says
//
// =============================================================================================

const TweetDateLength = 16;
const DefaultMovie = "Mr. Nobody";
const DefaultSongTitle = "The Sign";
const DefaultSongArtist = "Ace of Base";
const OMDBRottenTomatoesIndex = 1;

var keys, spotify, client, params, fs;
var songObject = {
      "title": DefaultSongTitle,
      "artist": DefaultSongArtist
    },
    movieName = "",
    appMethod, appValue;
var Twitter, request;

require("dotenv").config();

keys = require("./keys.js");
Twitter = require("twitter");
Spotify = require("node-spotify-api");
request = require("request");
fs = require("fs");

spotify = new Spotify(keys.spotify);
client = new Twitter(keys.twitter);

appMethod = process.argv["2"];

switch (appMethod) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    if (process.argv["3"]) {
      appValue = process.argv.slice(3).join(" ");
      songObject.title = appValue;
      songObject.artist = "";
    }
    spotifyThis(songObject);
    break;
  case "movie-this":
    if (process.argv["3"]) {
      appValue = process.argv.slice(3).join(" ");
      movieName = appValue;
    } else {
      // default movie value
      movieName = DefaultMovie;
    }
    movieThis(movieName);
    break;
  case "do-what-it-says":
    doWhatSays();
    break;
  default:
    console.log("Command not understood. Valid commands are the following:");
    console.log("'my-tweets', 'spotify-this-song <song>', 'movie-this <movie-name>");
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
    for (const track of data.tracks.items) {
      if (obj.artist === "" && track.name.toUpperCase() === obj.title.toUpperCase()) {
        console.log("Artist: " + track.album.artists[0].name);
        console.log("Song: " + track.name);
        console.log("Spotify Preview Link: " + track.preview_url);
        console.log("Album: " + track.album.name);
        console.log("=======================================================================");
      } else if (track.album.artists[0].name === obj.artist && track.name === obj.title) {
        console.log("No song selected. Default song: ");
        console.log("Artist: " + track.album.artists[0].name);
        console.log("Song: " + track.name);
        console.log("Spotify Preview Link: " + track.preview_url);
        console.log("Album: " + track.album.name);
        console.log("=======================================================================");
      }
    }

    return true;
  });
}

// -----------------------------------------------------------------------------------------
// movieThis() takes in a movie name as a parameter and uses the omdb api, combined with
//  the request package to return infomration about that movie
//
function movieThis(movie) {
  console.log("movieThis");
  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", (error, response, body) => {
        if (error) {
          console.log("Error: " + JSON.stringify(error));

          return false;
        }

        // If the request is successful (i.e. if the response status code is 200)
        if (response.statusCode === 200) {
          // Parse the body of the site
          // console.log(JSON.parse(body, null, 2));
          console.log("* Title: " + JSON.parse(body).Title);
          console.log("* Year: " + JSON.parse(body).Year);
          console.log("* IMDB Rating: " + JSON.parse(body).imdbRating);
          // If Rotten Tomatoes Rating for movie exists then return info, otherwise display 'not available'.
          if (JSON.parse(body).Ratings[OMDBRottenTomatoesIndex]) {
          console.log("* " + JSON.parse(body).Ratings[OMDBRottenTomatoesIndex].Source + " Rating: " +
                             JSON.parse(body).Ratings[OMDBRottenTomatoesIndex].Value);
          } else {
            console.log("* Rotten Tomatoes Rating: Not Available");
          }
          console.log("* Country or Countries where movie produced: " + JSON.parse(body).Country);
          console.log("* Language(s): " + JSON.parse(body).Language);
          console.log("* Plot: " + JSON.parse(body).Plot);
          console.log("* Actors: " + JSON.parse(body).Actors);
        } else {
          console.log("Movie Request Unsuccessful. Something went wrong.");
        }

        return true;
      });
}

// -----------------------------------------------------------------------------------------
// doWhatSays() reads in a file <random.txt> and executes the command in that file
//
function doWhatSays() {
  console.log("Do what it says");
}