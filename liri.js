const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const keys = require('./keys.js');
const fs = require('fs');

//Twitter stuff
let tweets = ()=> {
  let client = new Twitter(keys.twitterKeys);

  let params = {screen_name: 'NickMoo04536604'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log('-------------------------------');
      }
    }
  });
}

//Spotify stuff
let artistName = (artist)=>{
  return artist.name
}

let spotifyIt = (song)=> {
  let spotify = new Spotify({
    id: '72b3793912a7428fb97b678fc46ce66f',
    secret: 'd26fa170e6e94ba788647eef677c6ad1',
  });

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items[1]);
    let songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      // console.log(data.tracks.items[0]);
      // console.log(data.tracks.item[0].artists);
      console.log('Artist(s): ' + songs[i].artists.map(artistName));
      console.log('Song Name: ' + songs[i].name);
      console.log('Link: ' + songs[i].preview_url);
      console.log('Album: ' + songs[i].album.name);
      console.log('-----------------------------');
    }
  });
}

//Request stuff
let rottenTomatoes = (rating)=>{
  return Ratings.Rotten_Tomatoes.value
}

let omdb = (movie)=>{
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      // console.log(body);
      // console.log("Title: " + JSON.parse(body).Title);
      // console.log("Released: " + JSON.parse(body).Released);
      // console.log("IMDB rating: " + JSON.parse(body).imdbRating);
      // // console.log("Rotten Tomatoes Rating: " + body.Ratings.map(rottenTomatoes));
      // console.log("Produced: " + JSON.parse(body).Country);
      // console.log("Language: " + JSON.parse(body).Language);
      // console.log("Plot: " + JSON.parse(body).Plot);
      // console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

//What it says stuff
let doWhatItSays = ()=> {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let array = data.split(',');
    command(array[0], array[1]);
  });
}

//switch statment for getting my-tweets, spotify-this, movie-this to run functions.
let command = (caseData, functionData)=> {
  switch (caseData) {
    case 'my-tweets':
        tweets();
      break;
    case 'spotify-this-song':
        spotifyIt(functionData);
      break;
    case 'movie-this':
        omdb(functionData);
      break;
    case 'do-what-it-says':
        doWhatItSays();
      break;
    default:
      console.log('error 418');
  }
}

let run = (argOne, argTwo)=> {
  command(argOne, argTwo);
};

run(process.argv[2], process.argv[3]);
