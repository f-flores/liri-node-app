# liri-node-app

liri-node-app

The liri-node-app is a terminal based app that processes commands like my-tweets.

## Usage

`node ./liri.js my-tweets` -- returns my most recent 20 tweets.

 `node ./liri.js spotify-this-song <songName>` -- takes in a song name and returns information about
    that song, including song title, artist, album and a preview link

  `node movie-this <movieName>` returns the following information about a movie: title, year,
    IMDB Rating, Rotten Tomatoes Rating, Countries where movie was produced, Plot, Actors,
    and languages

  `node do-what-it-says`

### Installation

This app can be cloned with the following command from a terminal.

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

5. This app utilizes the `twitter` and `spotify` npm packages, so to sucessfully run this app, please include your twitter and spotify keys in an `.env` file.

``` javascript
SPOTIFY_ID=your_spotify_id
SPOTIFY_SECRET=your_spotify_secret

TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret
TWITTER_ACCESS_TOKEN_KEY=your_twitter_access_token_key
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
```

### Comments

The Multi-RPS app was added to my github profile's portfolio:
