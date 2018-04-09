var keys, spotify, client;

require("dotenv").config();

keys = require("./keys.js");

spotify = new Spotify(keys.spotify);
client = new Twitter(keys.twitter);