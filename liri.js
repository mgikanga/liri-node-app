console.log("i'm here");
require("dotenv").config();
var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//function for twitter
 function myTweets(){
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    console.log(JSON.stringify(tweets,null,0))
  if (!error) {
    console.log(tweets);
  }
  console.log(error);
});
 };
 myTweets();

 //function that for spotify 
 spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });