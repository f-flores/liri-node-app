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
//    do-what-it-says reads text inside of random.txt and then processes it to call
//      one of LIRI's commands.
//
// =============================================================================================

const TweetDateLength = 16;
const DefaultMovie = "Mr. Nobody";
const DefaultSongTitle = "The Sign";
const DefaultSongArtist = "Ace of Base";
const OMDBRottenTomatoesIndex = 1;
const LiriCommandFileName = "random.txt";
const LiriOutputFile = "log.txt";

var keys, spotify, client, params, fs;
var songObject = {
      "title": DefaultSongTitle,
      "artist": DefaultSongArtist
    },
    movieName = "",
    appMethod = "",
    appValue = "";
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
if (process.argv["3"]) {
  appValue = process.argv.slice(3).join(" ");
} else {
  appValue = "";
}

// ---------------------------------------------------------------------------------------
// processLiriCmd()
//
function processLiriCmd(action, value) {
  switch (action) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      if (value !== "") {
        songObject.title = value;
        songObject.artist = "";
      }
      spotifyThis(songObject);
      break;
    case "movie-this":
      if (value === "") {
        // default movie value
        movieName = DefaultMovie;
      } else {
        movieName = appValue;
      }
      movieThis(movieName);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Command not understood. Valid commands are the following:");
      console.log("'my-tweets', 'spotify-this-song <song>', 'movie-this <movie-name>, do-what-it-says");
      break;
  }
}


// ---------------------------------------------------------------------------------------
// myTweets() outputs my last twenty tweets to my terminal window. This function makes
//  use of the twitter client.get() function, with the statuses/user_timeline endpoint
//
function myTweets() {
  var tweetCount = 1,
      tweetOutput = [];

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
      tweetOutput.push(msg.created_at.slice(0, TweetDateLength));
      tweetOutput.push(tweetCount++ + ". " + msg.text);
      tweetOutput.push("=======================================================================");
    }
    // print to console and add tweeter output to liri output file
    processLiriOutputToFile(tweetOutput);

    return true;
  });
}

// -----------------------------------------------------------------------------------------
// spotifyThis() takes in song object as a parameter and uses the spotify nodejs package to
//  return information about that song.
//
function spotifyThis(obj) {
  var spotifyOutput = [];

  spotify.search({
      "type": "track",
      "query": obj.title
    }, (err, data) => {
      if (err) {
        return console.log("Error occurred: " + err);
    }
    for (const track of data.tracks.items) {
      if (obj.artist === "" && track.name.toUpperCase() === obj.title.toUpperCase()) {
        spotifyOutput.push("Artist: " + track.album.artists[0].name);
        spotifyOutput.push("Song: " + track.name);
        spotifyOutput.push("Spotify Preview Link: " + track.preview_url);
        spotifyOutput.push("Album: " + track.album.name);
        spotifyOutput.push("=======================================================================");
      } else if (track.album.artists[0].name === obj.artist && track.name === obj.title) {
        spotifyOutput.push("No song selected. Default song: ");
        spotifyOutput.push("Artist: " + track.album.artists[0].name);
        spotifyOutput.push("Song: " + track.name);
        spotifyOutput.push("Spotify Preview Link: " + track.preview_url);
        spotifyOutput.push("Album: " + track.album.name);
        spotifyOutput.push("=======================================================================");
      }
    }
    // print to console and add movie output to liri output file
    processLiriOutputToFile(spotifyOutput);

    return true;
  });
}

// -----------------------------------------------------------------------------------------
// movieThis() takes in a movie name as a parameter and uses the omdb api, combined with
//  the request package to return infomration about that movie
//
function movieThis(movie) {
  var movieOutput = [];

  // run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", (error, response, body) => {
        if (error) {
          console.log("Error: " + JSON.stringify(error));

          return false;
        }

        // If the request is successful (i.e. if the response status code is 200)
        if (response.statusCode === 200) {
          // Parse the body of the site
          // console.log(JSON.parse(body, null, 2));
          movieOutput.push("* Title: " + JSON.parse(body).Title);
          movieOutput.push("* Year: " + JSON.parse(body).Year);
          movieOutput.push("* IMDB Rating: " + JSON.parse(body).imdbRating);
          // If Rotten Tomatoes Rating for movie exists then return info, otherwise display 'not available'.
          if (JSON.parse(body).Ratings[OMDBRottenTomatoesIndex]) {
            movieOutput.push("* " + JSON.parse(body).Ratings[OMDBRottenTomatoesIndex].Source + " Rating: " +
                             JSON.parse(body).Ratings[OMDBRottenTomatoesIndex].Value);
          } else {
            movieOutput.push("* Rotten Tomatoes Rating: Not Available");
          }
          movieOutput.push("* Country or Countries where movie produced: " + JSON.parse(body).Country);
          movieOutput.push("* Language(s): " + JSON.parse(body).Language);
          movieOutput.push("* Plot: " + JSON.parse(body).Plot);
          movieOutput.push("* Actors: " + JSON.parse(body).Actors);
        } else {
          movieOutput.push("Movie Request Unsuccessful. Something went wrong.");
        }
        movieOutput.push("=======================================================================");

        // print to console and add movie output to liri output file
        processLiriOutputToFile(movieOutput);

        return true;
      });
}

// -----------------------------------------------------------------------------------------
// doWhatItSays() reads in a file <random.txt> and executes the command in that file
//
function doWhatItSays() {
  var processesInFile = [];

  console.log("Do what it says");
  // We will read the existing bank file
  fs.readFile(LiriCommandFileName, "utf8", (err, data) => {
    if (err) {
      console.log("Error: " + err);

      return false;
    }

    // separate file content into action and value
    processesInFile = data.split(",");

    appMethod = processesInFile["0"];

    if (processesInFile["1"]) {
      appValue = processesInFile["1"];
    } else {
      appValue = "";
    }

    processLiriCmd(appMethod, JSON.parse(appValue));

    return true;
  });
}

// -----------------------------------------------------------------------------------------------
// addLiriOuputToFile() takes in a formatted array and appends its content to the
// LiriOutputFile
//
function processLiriOutputToFile(arr) {
  var formattedOutput = arr.slice(",").join("\n");

  console.log(formattedOutput);
  fs.appendFile(LiriOutputFile, "\n" + formattedOutput, (err) => {
    if (err) {
      return console.log(err);
    }

    return true;
  });
}

// ====================================================================================
//  calls main function
processLiriCmd(appMethod, appValue);