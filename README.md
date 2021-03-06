# liri-node-app

liri-node-app

The liri-node-app is a terminal based app that processes commands like my-tweets, spotify-this-song, movie-this, and do-what-it-says. This node app leverages node npm packages such as twitter, node-spotify-api, request and fs in order to simulate a language interpretation and recognition interface. In addition to logging the data to the terminal window, liri-node-app also outputs the data to a file called log.txt.

## Usage

`node ./liri.js my-tweets` -- returns my most recent 20 tweets.

 `node ./liri.js spotify-this-song <songName>` -- takes in a song name and returns information about
    that song, including song title, artist, album and a preview link

  `node movie-this <movieName>` returns the following information about a movie: title, year,
    IMDB Rating, Rotten Tomatoes Rating, Countries where movie was produced, Plot, Actors,
    and languages

  `node do-what-it-says` reads text inside of random.txt and then processes it to call
    one of LIRI's commands.

### Installation

This app can be cloned using git.

However, in order to successfully run this app, a few programs must be already installed as prerequisites.

1. git must be installed.
  [Download git.](https://git-scm.com/downloads)

2. nodejs must also be installed.
  [Download nodejs](https://nodejs.org/en/download/)

3. Now we are ready to clone this app by running the following command.

* `git clone git@github.com:f-flores/liri-node-app.git`

4. Since this file makes use of various node modules, please run

* `npm install`

This installs all of the dependencies.

5. This app utilizes the `twitter` and `spotify` npm packages, so to sucessfully run this app, please include your twitter and spotify keys in the `.env` file you create.

``` javascript
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret

TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
TWITTER_ACCESS_TOKEN_KEY=your_twitter_access_token_key
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
```

### Comments

The liri-node-app app was added to my github portfolio:
[liri-node-app](https://github.com/f-flores/liri-node-app)
